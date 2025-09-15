import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type RegistrationForm, type RegistrationSubmission } from '@/types';
import { Head } from '@inertiajs/react';
import { Users, Download } from 'lucide-react';

export default function SubmissionsIndex({ form, submissions }: { form: RegistrationForm, submissions: RegistrationSubmission[] }) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Formulir', href: route('registration-forms.index') },
        { title: `Pendaftar: ${form.title}`, href: '#' },
    ];

    // Ambil header tabel dari kolom yang Anda pilih di formulir
    const headers = form.fields;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pendaftar: ${form.title}`} />
            <div className="p-4 sm:p-6">
                <div className="glass-card p-6 rounded-2xl shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                        <div>
                            <h3 className="text-xl font-semibold text-white">{form.title}</h3>
                            <p className="text-white/70 text-sm mt-1 flex items-center gap-2">
                                <Users size={16} />
                                Total {submissions.length} Pendaftar
                            </p>
                        </div>
                        {/* Tombol untuk mengekspor data */}
                        <a 
                            href={route('registration-forms.submissions.export', form.id)}
                            className="px-4 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 font-semibold transition text-sm inline-flex items-center gap-2"
                        >
                            <Download size={16} />
                            Export ke Excel
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/80">
                            <thead className="text-gray-400 border-b border-white/20">
                                <tr>
                                    {/* Membuat header tabel secara dinamis */}
                                    {headers.map(header => (
                                        <th key={header} className="py-3 px-4 capitalize">
                                            {header.replace(/_/g, ' ')}
                                        </th>
                                    ))}
                                    <th className="py-3 px-4">Waktu Mendaftar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {submissions.map(submission => (
                                    <tr key={submission.id} className="hover:bg-white/5">
                                        {/* Membuat sel tabel secara dinamis */}
                                        {headers.map(header => (
                                            <td key={`${submission.id}-${header}`} className="py-3 px-4">
                                                {submission.data[header] || '-'}
                                            </td>
                                        ))}
                                        <td className="py-3 px-4">
                                            {new Date(submission.created_at).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                                {submissions.length === 0 && (
                                    <tr>
                                        <td colSpan={headers.length + 1} className="text-center py-8 text-white/50">
                                            Belum ada pendaftar untuk formulir ini.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

