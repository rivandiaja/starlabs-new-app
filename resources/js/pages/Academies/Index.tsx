import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../layouts/app-layout'; // Perbaikan path
import { type BreadcrumbItem, type Academy, type SharedData } from '../../types'; // Perbaikan path
import AcademyFormModal from './Partials/AcademyFormModal';
import { BookCopy, Edit, Trash2, CheckCircle, XCircle, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Manajemen Akademi', href: route('academies.index') },
];

export default function AcademiesIndex({ academies }: { academies: Academy[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAcademy, setEditingAcademy] = useState<Academy | null>(null);
    
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role?.name;
    const canManage = userRole === 'Admin' || userRole === 'Dev';

    const openCreateModal = () => {
        setEditingAcademy(null);
        setIsModalOpen(true);
    };

    const openEditModal = (academy: Academy) => {
        setEditingAcademy(academy);
        setIsModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Akademi" />
            <div className="p-4 sm:p-6">
                <div className="glass-card p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3 text-white">
                            <BookCopy size={24} />
                            <h3 className="text-xl font-semibold">Manajemen Akademi</h3>
                        </div>
                        {canManage && (
                            <button onClick={openCreateModal} className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold transition text-sm">+ Buat Akademi Baru</button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/80">
                            <thead className="text-gray-400 border-b border-white/20">
                                <tr>
                                    <th className="py-3 px-4">Nama Akademi</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Total Materi Silabus</th>
                                    {canManage && <th className="py-3 px-4 text-right">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {academies.map(academy => (
                                    <tr key={academy.id} className="hover:bg-white/5">
                                        <td className="py-3 px-4 font-medium">
                                            <Link href={route('academies.show', academy.id)} className="hover:underline">
                                                {academy.name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4">
                                            {academy.is_active ? (
                                                <span className="flex items-center gap-2 text-green-400 font-semibold"><CheckCircle size={16} /> Aktif</span>
                                            ) : (
                                                <span className="flex items-center gap-2 text-gray-400"><XCircle size={16} /> Tidak Aktif</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">{academy.syllabuses_count} materi</td>
                                        {canManage && (
                                            <td className="py-3 px-4 text-right space-x-2">
                                                <button onClick={() => openEditModal(academy)} className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition"><Edit size={16} /></button>
                                                <Link href={route('academies.destroy', academy.id)} method="delete" as="button" onBefore={() => confirm('Yakin ingin menghapus akademi ini? Semua silabus di dalamnya akan ikut terhapus.')} className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-red-400 transition"><Trash2 size={16} /></Link>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {canManage && <AcademyFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} academy={editingAcademy} />}
        </AppLayout>
    );
}

