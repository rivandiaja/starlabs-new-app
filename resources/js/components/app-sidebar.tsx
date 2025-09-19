import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, PieChart, Wallet, CircleUser, BookImage, UserRoundCog, CalendarPlus, Library, Video, Megaphone, MessageSquare, ClipboardList, BookCopy} from 'lucide-react';
import AppLogo from './app-logo';

// Tipe NavItem dengan properti roles opsional
type RoleBasedNavItem = NavItem & {
    roles?: string[];
};

const mainNavItems: RoleBasedNavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'User Management', href: '/users', icon: UserRoundCog, roles: ['Admin', 'Dev'] },
    { title: 'Events', href: route('events.index'), icon: BookImage },
    { title: 'Schedule', href: route('schedules.index'), icon: CalendarPlus },
    { title: 'Finance Management', href: route('finances.index'), icon: Wallet, roles: ['Admin', 'BPH'] },
    { title: 'Finance Distribution', href: route('finances.distribution'), icon: PieChart },
    { title: 'File Library', href: route('drive.library'), icon: Library },
    { title: 'Google Meet', href: route('meet.index'), icon: Video },
    { title: 'Announcements', href: route('announcements.index'), icon: Megaphone },
    { title: 'Contact Messages', href: route('contact.messages.index'), icon: MessageSquare },
    { title: 'Formulir Pendaftaran', href: route('registration-forms.index'), icon: ClipboardList, roles: ['Admin', 'BPH', 'Dev', 'Pengurus'] },
    { title: 'Academy Management', href: route('academies.index'), icon: BookCopy, roles: ['Admin', 'BPH', 'Dev'] },
];

const footerNavItems: NavItem[] = [
    { title: 'Repository', href: '#', icon: Folder },
    { title: 'Documentation', href: '#', icon: BookOpen },
];

export function AppSidebar() {
    const { auth, url } = usePage<SharedData>().props;
    const userRole = auth.user?.role?.name;
    const currentUrl = typeof url === 'string' ? url : '';

    const filteredNavItems = mainNavItems
        .filter((item) => {
            if (item.roles && item.roles.length > 0) {
                return userRole ? item.roles.includes(userRole) : false;
            }
            return true;
        })
        .map((item) => ({
            ...item,
            isActive: item.href ? currentUrl.startsWith(item.href) : false,
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

