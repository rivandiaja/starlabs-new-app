import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Event, type SharedData } from '@/types';
import { CalendarDays, MapPin, Tag, X } from 'lucide-react';

// --- Komponen Modal Detail Event ---
const EventDetailModal = ({ event, onClose }: { event: Event | null, onClose: () => void }) => {
    if (!event) return null;

    const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className="bg-gray-900 rounded-lg shadow-xl w-full max-w-3xl text-white flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/2 flex-shrink-0">
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover"/>
                </div>
                <div className="p-6 flex flex-col">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">{event.title}</h3>
                    <div className="space-y-3 text-sm border-t border-white/10 pt-4 mb-4">
                        <div className="flex items-center gap-3 text-white/80"><CalendarDays size={16} className="text-purple-400 flex-shrink-0" /><span>{formattedDate}</span></div>
                        <div className="flex items-center gap-3 text-white/80"><MapPin size={16} className="text-purple-400 flex-shrink-0" /><span>{event.location}</span></div>
                        <div className="flex items-center gap-3 text-white/80"><Tag size={16} className="text-purple-400 flex-shrink-0" /><span>{event.tag || 'Umum'}</span></div>
                    </div>
                    <div className="text-white/70 max-h-40 overflow-y-auto pr-2 text-sm">
                        <p className="whitespace-pre-wrap">{event.description}</p>
                    </div>
                    <div className="mt-auto pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 font-semibold text-sm">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


interface Props {
    events: Event[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Events', href: route('events.index') },
];

const EventsIndex: React.FC<Props> = ({ events }) => {
    // --- AMBIL DATA PENGGUNA YANG LOGIN ---
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role?.name;

    // --- LOGIKA UNTUK MENENTUKAN HAK AKSES ---
    const canManage = userRole === 'Admin' || userRole === 'Dev' || userRole === 'Kadiv' || userRole === 'BPH';

    const [viewingEvent, setViewingEvent] = useState<Event | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Event Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="glass-card p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">All Events</h3>
                        {/* --- TAMPILKAN TOMBOL JIKA PUNYA AKSES --- */}
                        {canManage && (
                            <Link
                                href={route('events.create')}
                                className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                            >
                                + Add Event
                            </Link>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/80">
                            <thead className="text-gray-400 border-b border-white/20">
                                <tr>
                                    <th className="py-3 px-4">Poster</th>
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Location</th>
                                    {/* --- TAMPILKAN KOLOM AKSI JIKA PUNYA AKSES --- */}
                                    {canManage && <th className="py-3 px-4 text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {events.map(event => (
                                    <tr key={event.id} onClick={() => setViewingEvent(event)} className="hover:bg-white/5 transition border-b border-white/10 cursor-pointer">
                                        <td className="py-3 px-4">
                                            <div className="w-16 aspect-[3/4] rounded-md overflow-hidden bg-white/10">
                                                <img 
                                                    src={event.image_url} 
                                                    alt={event.title} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 font-medium">{event.title}</td>
                                        <td className="py-3 px-4">
                                            {new Date(event.date).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'long', year: 'numeric',
                                            })}
                                        </td>
                                        <td className="py-3 px-4">{event.location}</td>
                                        {/* --- TAMPILKAN TOMBOL AKSI JIKA PUNYA AKSES --- */}
                                        {canManage && (
                                            <td className="py-3 px-4 text-right space-x-2" onClick={e => e.stopPropagation()}>
                                                <Link
                                                    href={route('events.edit', event.id)}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500 text-white hover:bg-gray-600 transition"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route('events.destroy', event.id)}
                                                    method="delete"
                                                    as="button"
                                                    onBefore={() => confirm('Are you sure you want to delete this event?')}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
                                                >
                                                    Delete
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
            <EventDetailModal event={viewingEvent} onClose={() => setViewingEvent(null)} />
        </AppLayout>
    );
};

export default EventsIndex;

