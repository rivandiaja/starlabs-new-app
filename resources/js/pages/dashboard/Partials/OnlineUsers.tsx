import { useEffect, useState } from 'react';
import { type User } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Tipe data untuk pengguna online (lebih sederhana dari tipe User penuh)
type OnlineUser = Pick<User, 'id' | 'name' | 'avatar_url'>;

// Fungsi untuk mendapatkan inisial nama
const getInitials = (name: string) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
};

export default function OnlineUsers() {
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

    useEffect(() => {
        if (typeof window.Echo === 'undefined') return;

        // Bergabung dengan presence channel 'online-users'
        window.Echo.join('online-users')
            .here((users: OnlineUser[]) => {
                // Saat pertama kali bergabung, dapatkan daftar semua user yang sudah ada
                setOnlineUsers(users);
            })
            .joining((user: OnlineUser) => {
                // Saat ada user baru bergabung
                setOnlineUsers((prevUsers) => [...prevUsers, user]);
            })
            .leaving((user: OnlineUser) => {
                // Saat ada user yang keluar
                setOnlineUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
            })
            .error((error: any) => {
                console.error('Koneksi Echo error:', error);
            });
        
        // Hentikan listener saat komponen dilepas
        return () => {
            if (window.Echo) {
                window.Echo.leaveChannel('online-users');
            }
        };
    }, []);

    return (
        <div className="glass-card p-4 rounded-2xl shadow-lg border border-white/10">
            <h3 className="text-sm font-semibold text-white/90 mb-3">Pengurus Online ({onlineUsers.length})</h3>
            <div className="flex items-center -space-x-2">
                {onlineUsers.slice(0, 7).map(user => (
                    <TooltipProvider key={user.id}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className="h-9 w-9 border-2 border-gray-800">
                                    <AvatarImage src={user.avatar_url} alt={user.name} />
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{user.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
                 {onlineUsers.length > 7 && (
                    <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white border-2 border-gray-800">
                        +{onlineUsers.length - 7}
                    </div>
                )}
            </div>
        </div>
    );
}

