import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../layouts/app-layout'; // Perbaikan path
import { type BreadcrumbItem, type Announcement, type SharedData } from '../../types'; // Perbaikan path
import AnnouncementFormModal from './Partials/AnnouncementFormModal';
import { Megaphone, MessageSquare, AlertTriangle, ShieldAlert, Edit, Trash2, CheckCircle, User, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Pengumuman', href: route('announcements.index') },
];

type LevelInfo = {
    icon: React.ElementType;
    color: string;
    label: string;
};

const levelMap: Record<string, LevelInfo> = {
    info: { icon: MessageSquare, color: 'text-blue-400', label: 'Info' },
    success: { icon: CheckCircle, color: 'text-green-400', label: 'Success' },
    warning: { icon: AlertTriangle, color: 'text-yellow-400', label: 'Warning' },
    danger: { icon: ShieldAlert, color: 'text-red-400', label: 'Danger' },
};

const LevelIndicator = ({ level }: { level: string }) => {
    const { icon: Icon, color, label } = levelMap[level] || levelMap.info;
    return <span className={`flex items-center gap-2 font-semibold ${color}`}><Icon size={16} />{label}</span>;
};

// --- KOMPONEN BARU: Modal untuk Detail Pengumuman ---
const AnnouncementDetailModal = ({ announcement, onClose }: { announcement: Announcement | null; onClose: () => void; }) => {
    if (!announcement) return null;

    const formattedDate = new Date(announcement.created_at).toLocaleString('id-ID', {
        dateStyle: 'full',
        timeStyle: 'short'
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg text-white fade-in">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-blue-400">{announcement.title}</h3>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-4 text-sm border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3 text-white/80">
                        <LevelIndicator level={announcement.level} />
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                        <User size={16} className="text-purple-400 flex-shrink-0" />
                        <span>Dibuat oleh: {announcement.user.name} pada {formattedDate}</span>
                    </div>
                    <div className="pt-2 text-white/70 max-h-60 overflow-y-auto pr-2">
                        <p className="whitespace-pre-wrap">{announcement.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function AnnouncementIndex({ announcements }: { announcements: Announcement[] }) {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null);
    
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role?.name;
    const canManage = userRole === 'Admin' || userRole === 'Dev' || userRole === 'BPH';

    const openCreateModal = () => {
        setEditingAnnouncement(null);
        setIsFormModalOpen(true);
    };

    const openEditModal = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setIsFormModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Pengumuman" />
            <div className="p-4 sm:p-6">
                <div className="glass-card p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3 text-white">
                            <Megaphone size={24} />
                            <h3 className="text-xl font-semibold">Semua Pengumuman</h3>
                        </div>
                        {canManage && (
                            <button onClick={openCreateModal} className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold transition text-sm">+ Tambah Pengumuman</button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/80">
                            <thead className="text-gray-400 border-b border-white/20">
                                <tr>
                                    <th className="py-3 px-4">Judul</th>
                                    <th className="py-3 px-4">Level</th>
                                    <th className="py-3 px-4">Dibuat Oleh</th>
                                    <th className="py-3 px-4">Tanggal</th>
                                    {canManage && <th className="py-3 px-4 text-right">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {announcements.map(announcement => (
                                    <tr key={announcement.id} onClick={() => setViewingAnnouncement(announcement)} className="hover:bg-white/5 transition cursor-pointer">
                                        <td className="py-3 px-4 font-medium">{announcement.title}</td>
                                        <td className="py-3 px-4"><LevelIndicator level={announcement.level} /></td>
                                        <td className="py-3 px-4">{announcement.user.name}</td>
                                        <td className="py-3 px-4">{new Date(announcement.created_at).toLocaleDateString('id-ID', {day: '2-digit', month: 'short'})}</td>
                                        {canManage && (
                                            <td className="py-3 px-4 text-right space-x-2" onClick={e => e.stopPropagation()}>
                                                <button onClick={() => openEditModal(announcement)} className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition"><Edit size={16} /></button>
                                                <Link href={route('announcements.destroy', announcement.id)} method="delete" as="button" onBefore={() => confirm('Yakin ingin menghapus pengumuman ini?')} className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-red-400 transition"><Trash2 size={16} /></Link>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {canManage && <AnnouncementFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} announcement={editingAnnouncement} />}
            <AnnouncementDetailModal announcement={viewingAnnouncement} onClose={() => setViewingAnnouncement(null)} />
        </AppLayout>
    );
}

