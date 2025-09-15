import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Video, ArrowRight } from 'lucide-react';

// --- Anda bisa mengedit nama dan link rapat di sini ---
const meetRooms = [
    {
        id: 1,
        name: 'Ruang Rapat Utama Seluruh Pengurus',
        description: 'Gunakan ruang ini untuk diskusi formal.',
        link: 'https://meet.google.com/thf-kcge-smo', // <-- Ganti dengan link Anda
    },
    {
        id: 2,
        name: 'Ruang Rapat BPH',
        description: 'Untuk rapat koordinasi Badan Pengurus Harian.',
        link: 'http://meet.google.com/pep-jvgj-uct', // <-- Ganti dengan link Anda
    },
    {
        id: 3,
        name: 'Ruang Divisi Pemrograman',
        description: 'Diskusi proker dan kegiatan divisi pemrograman.',
        link: 'http://meet.google.com/zxa-ymyz-vmg', // <-- Ganti dengan link Anda
    },
    {
        id: 4,
        name: 'Ruang Divisi Jaringan',
        description: 'Diskusi proker dan kegiatan divisi jaringan.',
        link: 'http://meet.google.com/dqc-gnxq-how', // <-- Ganti dengan link Anda
    },
    {
        id: 5,
        name: 'Ruang Divisi Multimedia',
        description: 'Diskusi proker dan kegiatan divisi multimedia.',
        link: 'http://meet.google.com/dnc-gqnd-vyb', // <-- Ganti dengan link Anda
    },
    {
        id: 6,
        name: 'Ruang Divisi Office',
        description: 'Diskusi proker dan kegiatan divisi office.',
        link: 'http://meet.google.com/wmm-jpbj-crk', // <-- Ganti dengan link Anda
    },
    {
        id: 7,
        name: 'Ruang Rapat Eksternal',
        description: 'Untuk rapat tentang pihak luar atau kolaborasi.',
        link: 'http://meet.google.com/ibu-hwrr-xae', // <-- Ganti dengan link Anda
    },
    {
        id: 8,
        name: 'Ruang Santai / Diskusi Bebas',
        description: 'Gunakan ruang ini untuk diskusi informal.',
        link: 'http://meet.google.com/vjm-ejvb-ffa', // <-- Ganti dengan link Anda
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Google Meet', href: route('meet.index') },
];

// Komponen untuk satu kartu ruangan
const RoomCard = ({ name, description, link }: { name: string, description: string, link: string }) => {
    return (
        <div className="glass-card p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between border border-white/10 transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-500/10">
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                        <Video size={20} />
                    </div>
                    <h3 className="text-lg font-bold">{name}</h3>
                </div>
                <p className="text-sm text-white/60 min-h-[40px]">{description}</p>
            </div>
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition"
            >
                <span>Masuk Ruangan</span>
                <ArrowRight size={16} />
            </a>
        </div>
    );
};

export default function MeetIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ruang Rapat Virtual" />
            <div className="p-4 sm:p-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ruang Rapat Virtual</h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Pilih ruang rapat yang tersedia untuk memulai diskusi atau koordinasi dengan tim Anda.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {meetRooms.map(room => (
                        <RoomCard 
                            key={room.id}
                            name={room.name}
                            description={room.description}
                            link={room.link}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}