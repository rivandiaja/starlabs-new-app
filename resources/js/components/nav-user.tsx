import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { UserMenuContent } from '@/components/user-menu-content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Fungsi untuk mendapatkan inisial nama
const getInitials = (name: string) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
};

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    
    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            {/* Pemicu dropdown hanya menampilkan Avatar */}
            <DropdownMenuTrigger asChild>
                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-full">
                    <Avatar className="h-9 w-9 overflow-hidden rounded-full">
                        {/* Menggunakan avatar_url untuk menampilkan gambar */}
                        <AvatarImage src={user.avatar_url} alt={user.name} />
                        <AvatarFallback className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            
            {/* Konten dropdown saat avatar diklik */}
            <DropdownMenuContent align="end" className="w-64 p-2">
                <UserMenuContent user={user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

