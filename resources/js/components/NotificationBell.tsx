import { useEffect, useState, useRef } from 'react';
import { Bell, X, Calendar, User, Info, MapPin, Clock } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { type SharedData, type Notification, type Event, type Schedule, type Announcement } from '../types';

// Fungsi untuk mengambil token CSRF dari meta tag
const getCsrfToken = () => {
    return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
}

// Helper untuk format waktu relatif
const formatRelativeTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} dtk yang lalu`;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} mnt yang lalu`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.round(hours / 24);
    return `${days} hari yang lalu`;
};

// --- Komponen Modal Detail Notifikasi (digabungkan di sini) ---
const isEvent = (activity: any): activity is Event => 'location' in activity && 'tag' in activity;
const isSchedule = (activity: any): activity is Schedule => 'start_time' in activity;
const isAnnouncement = (activity: any): activity is Announcement => 'content' in activity;
const formatDate = (dateString: string) => new Date(dateString).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
const formatTime = (time?: string | null) => (time ? time.slice(0, 5) : '');

const NotificationDetailModal = ({ notification, onClose }: { notification: Notification | null, onClose: () => void }) => {
    if (!notification || !notification.activity) return null;
    const { activity } = notification;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg text-white fade-in">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-blue-400">{activity.title}</h3>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-white/10"><X size={20} /></button>
                </div>
                <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                    {isAnnouncement(activity) && (
                        <>
                            <div className="flex items-start gap-3 text-white/80"><Info size={16} className="text-purple-400 flex-shrink-0 mt-1" /><p className="whitespace-pre-wrap">{activity.content}</p></div>
                            <div className="flex items-center gap-3 text-white/80"><User size={16} className="text-purple-400 flex-shrink-0" /><span>Dibuat oleh: {activity.user?.name || 'Admin'}</span></div>
                        </>
                    )}
                    {(isEvent(activity) || isSchedule(activity)) && (
                         <>
                            <div className="flex items-start gap-3 text-white/80"><Info size={16} className="text-purple-400 flex-shrink-0 mt-1" /><p className="whitespace-pre-wrap">{activity.description}</p></div>
                            <div className="flex items-center gap-3 text-white/80"><Calendar size={16} className="text-purple-400 flex-shrink-0" /><span>{formatDate(activity.date)}</span></div>
                         </>
                    )}
                    {isSchedule(activity) && (
                        <>
                            <div className="flex items-center gap-3 text-white/80"><Clock size={16} className="text-purple-400 flex-shrink-0" /><span>{formatTime(activity.start_time)} - {formatTime(activity.end_time)}</span></div>
                            <div className="flex items-center gap-3 text-white/80"><MapPin size={16} className="text-purple-400 flex-shrink-0" /><span>{activity.location || 'Lokasi belum diatur'}</span></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


export default function NotificationBell() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [viewingNotification, setViewingNotification] = useState<Notification | null>(null);

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

        const handleNavigate = () => {
            setIsOpen(false);
            setViewingNotification(null);
        };
        router.on('navigate', handleNavigate);
        
        const handleNewNotification = (event: CustomEvent) => {
            const notification = event.detail;
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
        };
        const handleNotificationDeleted = (event: { notification_id: string }) => {
            setNotifications(prev => prev.filter(n => n.id !== event.notification_id));
            fetchNotifications();
        };

        document.addEventListener('new-notification', handleNewNotification as EventListener);
        if (window.Echo) {
            window.Echo.channel('public-activity-deletions').listen('ActivityDeleted', handleNotificationDeleted);
        }
        
        return () => {
            // Remove the 'navigate' event listener manually if router supports it, otherwise do nothing
            // If router.on returns an unsubscribe function, call it here
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
        <>
            <div className="relative" ref={dropdownRef}>
                <button onClick={handleBellClick} className="relative p-2 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors">
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
                                <button 
                                    key={notif.id} 
                                    onClick={() => {
                                        setViewingNotification(notif);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left p-3 border-b border-white/10 text-sm hover:bg-white/10"
                                >
                                    <p className="font-semibold text-blue-300">{notif.data.type}</p>
                                    <p className="text-white my-1">{notif.data.title}</p>
                                    <p className="text-xs text-white/50">{formatRelativeTime(notif.created_at)}</p>
                                </button>
                            )) : (
                                <p className="p-4 text-sm text-white/60">Tidak ada notifikasi.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <NotificationDetailModal notification={viewingNotification} onClose={() => setViewingNotification(null)} />
        </>
    );
}

