import { useEffect, useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { type SharedData, type Notification } from '../types';

const getCsrfToken = () => {
    return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
}

// Fungsi untuk format waktu relatif
const formatRelativeTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} detik yang lalu`;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} menit yang lalu`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.round(hours / 24);
    return `${days} hari yang lalu`;
};

export default function NotificationBell() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const response = await fetch(route('notifications.index'));
            const data = await response.json();
            setNotifications(data.notifications);
            setUnreadCount(data.unread_count);
        } catch (error) {
            console.error('Gagal mengambil notifikasi:', error);
        }
    };

    useEffect(() => {
        if (!user) return;

        fetchNotifications();

        const handleNewNotification = (event: CustomEvent) => {
            const notification = event.detail;
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
        };

        const handleNotificationDeleted = (event: { notification_id: string }) => {
            setNotifications(prev => prev.filter(n => n.id !== event.notification_id));
            fetchNotifications(); // Sinkronisasi ulang hitungan
        };

        document.addEventListener('new-notification', handleNewNotification as EventListener);
        
        if (window.Echo) {
            window.Echo.channel('public-activity-deletions')
                .listen('ActivityDeleted', handleNotificationDeleted);
        }
        
        return () => {
            document.removeEventListener('new-notification', handleNewNotification as EventListener);
            if (window.Echo) {
                window.Echo.leaveChannel('public-activity-deletions');
            }
        };
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleBellClick = () => {
        const newIsOpenState = !isOpen;
        setIsOpen(newIsOpenState);
        if (newIsOpenState && unreadCount > 0) {
            setUnreadCount(0);
            fetch(route('notifications.markasread'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() }
            });
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={handleBellClick} 
                className="relative p-2 rounded-full text-black bg-white l hover:bg-white/10 hover:text-white transition-colors"
            >
                <Bell />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
            </button>
            
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-white/10 rounded-md shadow-lg z-20">
                    <div className="p-3 font-bold border-b border-white/10 text-white">Notifikasi</div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? notifications.map(notif => (
                            <div key={notif.id} className={`p-3 border-b border-white/10 text-sm ${!notif.read_at ? 'bg-blue-500/10' : ''}`}>
                                <p className="font-semibold text-blue-300">{notif.data.type}</p>
                                <p className="text-white my-1">{notif.data.title}</p>
                                <p className="text-xs text-white/50">{formatRelativeTime(notif.created_at)}</p>
                            </div>
                        )) : (
                            <p className="p-4 text-sm text-white/60">Tidak ada notifikasi.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

