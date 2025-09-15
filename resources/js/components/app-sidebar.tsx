import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookImage, CalendarPlus, LayoutGrid, Library, Megaphone, MessageSquare, PieChart, UserRoundCog, Video, Wallet, ClipboardList} from 'lucide-react';
import AppLogo from './app-logo';

// 🔹 Update tipe NavItem agar bisa punya roles
type RoleBasedNavItem = NavItem & {
    roles?: string[]; // daftar role yang bisa akses menu ini
};

const mainNavItems: RoleBasedNavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    // {
    //   title: 'Profile',
    //   href: '/settings/profile',
    //   icon: CircleUser,
    // },
    {
        title: 'User Management',
        href: '/users',
        icon: UserRoundCog,
        roles: ['Admin', 'Dev'], // hanya Admin & Dev yang bisa lihat
    },
    {
        title: 'Events',
        href: route('events.index'),
        icon: BookImage,
        // roles: ['Admin', 'Kadiv','BPH','Dev'],
    },
    {
        title: 'Schedule',
        href: route('schedules.index'),
        icon: CalendarPlus,
    },
    {
        title: 'Finance Management',
        href: route('finances.index'),
        icon: Wallet,
        roles: ['Admin', 'BPH'], // hanya Admin & Bendahara
    },
    {
        title: 'Finance Distribution',
        href: route('finances.distribution'),
        icon: PieChart,
    },
    {
        title: 'File Library',
        href: route('drive.library'),
        icon: Library,
    },
    {
        title: 'Google Meet',
        href: route('meet.index'),
        icon: Video,
    },
    {
        title: 'Announcements',
        href: route('announcements.index'),
        icon: Megaphone,
    },
    {
        title: 'Contact Messages',
        href: route('contact.messages.index'),
        icon: MessageSquare,
    },
    {
        title: 'Formulir Pendaftaran',
        href: route('registration-forms.index'),
        icon: ClipboardList,
        roles: ['Admin', 'BPH', 'Dev', 'Pengurus'],
    },
];

export function AppSidebar() {
    const { auth, url } = usePage<SharedData>().props;
    const userRole = auth.user?.role?.name;

    // Pastikan url bertipe string
    const currentUrl = typeof url === 'string' ? url : '';

    const filteredNavItems = mainNavItems
        .filter((item) => {
            if (item.roles && item.roles.length > 0) {
                return userRole ? item.roles.includes(userRole) : false;
            }
            return true;
        })
        // Tambahkan properti isActive ke setiap item
        .map((item) => ({
            ...item,
            isActive: currentUrl.startsWith(item.href),
        }));

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className='pt-3.5' asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
