import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Schedule, type SharedData } from '@/types';
import ScheduleFormModal from './Partials/ScheduleFormModal';
import { Calendar, Clock, MapPin, X } from 'lucide-react';

// --- Komponen Modal Detail Jadwal ---
const ScheduleDetailModal = ({ schedule, onClose }: { schedule: Schedule | null, onClose: () => void }) => {
    if (!schedule) return null;

    const formattedDate = new Date(schedule.date).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    const formatTime = (time?: string | null) => (time ? time.slice(0, 5) : '');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg text-white">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-blue-400">{schedule.title}</h3>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-white/10"><X size={20} /></button>
                </div>
                <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3 text-white/80"><Calendar size={16} className="text-purple-400 flex-shrink-0" /><span>{formattedDate}</span></div>
                    <div className="flex items-center gap-3 text-white/80"><Clock size={16} className="text-purple-400 flex-shrink-0" /><span>{formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}</span></div>
                    <div className="flex items-center gap-3 text-white/80"><MapPin size={16} className="text-purple-400 flex-shrink-0" /><span>{schedule.location || 'Lokasi belum diatur'}</span></div>
                    <div className="pt-2 text-white/70 max-h-40 overflow-y-auto pr-2"><p className="whitespace-pre-wrap">{schedule.description || 'Tidak ada deskripsi.'}</p></div>
                </div>
            </div>
        </div>
    );
};

interface Props {
    schedules: Schedule[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Schedules', href: route('schedules.index') },
];

const formatTime = (time: string) => time.slice(0, 5);

export default function ScheduleIndex({ schedules }: Props) {
    // --- 1. AMBIL DATA PENGGUNA YANG LOGIN ---
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role?.name;

    // --- 2. LOGIKA UNTUK MENENTUKAN HAK AKSES ---
    const canManage = userRole === 'Admin' || userRole === 'Dev';

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
    const [viewingSchedule, setViewingSchedule] = useState<Schedule | null>(null);

    const openCreateModal = () => {
        setEditingSchedule(null);
        setIsFormModalOpen(true);
    };

    const openEditModal = (schedule: Schedule) => {
        setEditingSchedule(schedule);
        setIsFormModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedule Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="glass-card p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">All Schedules</h3>
                        {/* --- 3. TAMPILKAN TOMBOL JIKA PUNYA AKSES --- */}
                        {canManage && (
                            <button onClick={openCreateModal} className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition">
                                + Add Schedule
                            </button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/80">
                            <thead className="text-gray-400 border-b border-white/20">
                                <tr>
                                    <th className="py-3 px-4">Judul Kegiatan</th>
                                    <th className="py-3 px-4">Tanggal</th>
                                    <th className="py-3 px-4">Waktu</th>
                                    <th className="py-3 px-4">Lokasi</th>
                                    {/* --- 3. TAMPILKAN KOLOM AKSI JIKA PUNYA AKSES --- */}
                                    {canManage && <th className="py-3 px-4 text-right">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {schedules.length > 0 ? schedules.map(schedule => (
                                    <tr key={schedule.id} onClick={() => setViewingSchedule(schedule)} className="hover:bg-white/5 transition cursor-pointer">
                                        <td className="py-3 px-4 font-medium">{schedule.title}</td>
                                        <td className="py-3 px-4">{new Date(schedule.date).toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'})}</td>
                                        <td className="py-3 px-4">{formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}</td>
                                        <td className="py-3 px-4">{schedule.location || '-'}</td>
                                        {/* --- 3. TAMPILKAN TOMBOL AKSI JIKA PUNYA AKSES --- */}
                                        {canManage && (
                                            <td className="py-3 px-4 text-right space-x-2" onClick={e => e.stopPropagation()}>
                                                <button onClick={() => openEditModal(schedule)} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500 text-white hover:bg-gray-600 transition">Edit</button>
                                                <Link href={route('schedules.destroy', schedule.id)} method="delete" as="button" onBefore={() => confirm('Yakin ingin menghapus jadwal ini?')} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition">Delete</Link>
                                            </td>
                                        )}
                                    </tr>
                                )) : (
                                    <tr><td colSpan={canManage ? 5 : 4} className="text-center py-8 text-white/50">Belum ada jadwal.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {canManage && <ScheduleFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} schedule={editingSchedule} />}
            <ScheduleDetailModal schedule={viewingSchedule} onClose={() => setViewingSchedule(null)} />
        </AppLayout>
    );
}

