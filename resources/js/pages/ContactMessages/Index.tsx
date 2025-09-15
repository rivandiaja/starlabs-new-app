import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ContactMessage, type SharedData } from '@/types';
import { Trash2, Mail } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Pesan Masuk', href: route('contact.messages.index') },
];

export default function ContactMessagesIndex({ messages }: { messages: ContactMessage[] }) {
    const { auth } = usePage<SharedData>().props;
    const canManage = auth.user?.role?.name === 'Admin' || auth.user?.role?.name === 'Dev';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesan Masuk" />
            <div className="p-4 sm:p-6">
                <div className="glass-card p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 text-white mb-6">
                        <Mail size={24}/>
                        <h3 className="text-xl font-semibold">Pesan Masuk</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/80">
                            <thead className="text-gray-400 border-b border-white/20">
                                <tr>
                                    <th className="py-3 px-4">Pengirim</th>
                                    <th className="py-3 px-4">Pesan</th>
                                    <th className="py-3 px-4">Tanggal</th>
                                    {canManage && <th className="py-3 px-4 text-right">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {messages.map(message => (
                                    <tr key={message.id} className="hover:bg-white/5">
                                        <td className="py-3 px-4 align-top">
                                            <div className="font-medium">{message.name}</div>
                                            <div className="text-white/60">{message.email}</div>
                                        </td>
                                        <td className="py-3 px-4 max-w-md whitespace-pre-wrap">{message.message}</td>
                                        <td className="py-3 px-4 align-top">{new Date(message.created_at).toLocaleString('id-ID')}</td>
                                        {canManage && (
                                            <td className="py-3 px-4 text-right align-top">
                                                <Link 
                                                    href={route('contact.messages.destroy', message.id)} 
                                                    method="delete" 
                                                    as="button" 
                                                    onBefore={() => confirm('Yakin ingin menghapus pesan ini?')}
                                                    className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-red-400 transition"
                                                >
                                                    <Trash2 size={16} />
                                                </Link>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
