import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import NotificationBell from '@/components/NotificationBell';
import { NavUser } from './nav-user'; // Pastikan NavUser juga diimpor

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        // 1. Tambahkan `justify-between` untuk mendorong item ke sisi berlawanan
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            
            {/* Bagian Kiri: Pemicu Sidebar & Breadcrumbs */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Bagian Kanan: Notifikasi & Profil Pengguna */}
            <div className="flex items-center gap-4">
                <NotificationBell />
                <NavUser />
            </div>
            
        </header>
    );
}

