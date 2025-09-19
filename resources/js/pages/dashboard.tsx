import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Dues, type Event, type Schedule, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

// Import komponen-komponen partial
import SchedulePanel from './dashboard/Partials/SchedulePanel';
import BillingPanel from './dashboard/Partials/BillingPanel';
import CalendarPanel from './dashboard/Partials/CalendarPanel';
import WelcomeBanner from './dashboard/Partials/WelcomeBanner';
// import OnlineUsers from './dashboard/Partials/OnlineUsers';

interface Props {
    billingSummary: {
        totalBill: number;
        totalPaid: number;
        overallTotal: number;
        unpaidDetails: Dues[];
        paidDetails: Dues[];
    };
    events: Event[];
    schedules: Schedule[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: route('dashboard') }];

export default function Dashboard({ billingSummary, events, schedules = [] }: Props) {
    // Ambil data pengguna yang sedang login untuk sapaan
    const { auth } = usePage<SharedData>().props;
    const userName = auth.user?.name || 'Pengurus';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                
                {/* Komponen sapaan selamat datang */}
                <WelcomeBanner userName={userName} />
                {/* <OnlineUsers /> */}

                {/* Konten dashboard utama */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* --- KIRI: JADWAL KEGIATAN --- */}
                    <SchedulePanel schedules={schedules} />

                    {/* --- KANAN: TAGIHAN & KALENDER --- */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <BillingPanel billingSummary={billingSummary} />
                        <CalendarPanel events={events} schedules={schedules} />
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
