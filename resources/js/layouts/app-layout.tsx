import AppLayoutTemplate from './app/app-sidebar-layout';
import { type BreadcrumbItem, type SharedData } from '../types';
import { type ReactNode, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import PushNotificationHandler from '../components/PushNotificationHandler';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    // Ambil data pengguna yang sedang login
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    // useEffect untuk mendengarkan notifikasi secara global
    useEffect(() => {
        if (!user || typeof window.Echo === 'undefined') return;

        // Dengarkan channel privat milik pengguna
        window.Echo.private(`users.${user.id}`)
            .notification((notification: any) => {
                // Tampilkan pop-up toast saat notifikasi baru masuk
                toast.success(notification.data.message || 'Anda memiliki notifikasi baru!', {
                    icon: '🔔',
                    position: 'bottom-right',
                });
                // Kirim event kustom agar komponen lain (seperti lonceng) bisa ikut merespons
                document.dispatchEvent(new CustomEvent('new-notification', { detail: notification }));
            });

        return () => {
            if (window.Echo) {
                window.Echo.leave(`users.${user.id}`);
            }
        };
    }, [user]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Toaster position="top-right" reverseOrder={false} />
            <PushNotificationHandler />
            {children}
        </AppLayoutTemplate>
    );
};

