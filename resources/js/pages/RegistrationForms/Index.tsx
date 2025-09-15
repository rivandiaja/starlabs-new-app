import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type RegistrationForm, type SharedData } from '@/types';
import FormModal from './Partials/FormModal';
import { FileText, Edit, Trash2, CheckCircle, XCircle, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Formulir Pendaftaran', href: route('registration-forms.index') },
];

export default function RegistrationFormsIndex({ forms }: { forms: RegistrationForm[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingForm, setEditingForm] = useState<RegistrationForm | null>(null);
    
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role?.name;
    const canManage = userRole === 'Admin' || userRole === 'Dev' || userRole === 'BPH';

    const openCreateModal = () => {
        setEditingForm(null);
        setIsModalOpen(true);
    };

    const openEditModal = (form: RegistrationForm) => {
        setEditingForm(form);
        setIsModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Formulir" />
            <div className="p-4 sm:p-6">
                <div className="glass-card p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3 text-white">
                            <FileText size={24} />
                            <h3 className="text-xl font-semibold">Manajemen Formulir Pendaftaran</h3>
                        </div>
                        {canManage && (
                            <button onClick={openCreateModal} className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold transition text-sm">+ Buat Formulir Baru</button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/80">
                            <thead className="text-gray-400 border-b border-white/20">
                                <tr>
                                    <th className="py-3 px-4">Judul Formulir</th>
                                    <th className="py-3 px-4">Periode Aktif</th>
                                    <th className="py-3 px-4">Status Iklan</th>
                                    <th className="py-3 px-4">Pendaftar</th>
                                    {canManage && <th className="py-3 px-4 text-right">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {forms.map(form => (
                                    <tr key={form.id} className="hover:bg-white/5">
                                        <td className="py-3 px-4 font-medium">
                                            <Link href={route('registration-forms.submissions.index', form.id)} className="hover:underline">
                                                {form.title}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4">{new Date(form.start_date).toLocaleDateString('id-ID')} - {new Date(form.end_date).toLocaleDateString('id-ID')}</td>
                                        <td className="py-3 px-4">
                                            {form.is_active ? (
                                                <span className="flex items-center gap-2 text-green-400 font-semibold"><CheckCircle size={16} /> Aktif</span>
                                            ) : (
                                                <span className="flex items-center gap-2 text-gray-400"><XCircle size={16} /> Tidak Aktif</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            <Link href={route('registration-forms.submissions.index', form.id)} className="flex items-center gap-2 hover:underline">
                                                <Users size={16} />
                                                {form.submissions_count || 0}
                                            </Link>
                                        </td>
                                        {canManage && (
                                            <td className="py-3 px-4 text-right space-x-2">
                                                <button onClick={() => openEditModal(form)} className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition"><Edit size={16} /></button>
                                                <Link href={route('registration-forms.destroy', form.id)} method="delete" as="button" onBefore={() => confirm('Yakin ingin menghapus formulir ini?')} className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-red-400 transition"><Trash2 size={16} /></Link>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {canManage && <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} form={editingForm} />}
        </AppLayout>
    );
}

