import { Link } from '@inertiajs/react';
import { type Schedule } from '@/types';
import { Clock, History, AlertCircle, Calendar, MapPin, X } from 'lucide-react';
import { useMemo, useState } from 'react';

// Helper Functions
const formatTime = (time?: string | null) => (time ? time.slice(0, 5) : '');

// --- Komponen Modal Detail Jadwal ---
const ScheduleDetailModal = ({ schedule, onClose }: { schedule: Schedule | null, onClose: () => void }) => {
    if (!schedule) return null;

    const formattedDate = new Date(schedule.date).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg text-white fade-in">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-blue-400">{schedule.title}</h3>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3 text-white/80">
                        <Calendar size={16} className="text-purple-400 flex-shrink-0" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                        <Clock size={16} className="text-purple-400 flex-shrink-0" />
                        <span>{formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                        <MapPin size={16} className="text-purple-400 flex-shrink-0" />
                        <span>{schedule.location || 'Lokasi belum diatur'}</span>
                    </div>
                    
                    {/* --- PERBAIKAN: Deskripsi sekarang bisa di-scroll --- */}
                    <div className="pt-2 text-white/70 max-h-40 overflow-y-auto pr-2">
                        <p className="whitespace-pre-wrap">{schedule.description || 'Tidak ada deskripsi.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


interface Props {
    schedules: Schedule[];
}

export default function SchedulePanel({ schedules }: Props) {
    const [viewingSchedule, setViewingSchedule] = useState<Schedule | null>(null);

    const { upcomingSchedules, pastSchedules } = useMemo<{ upcomingSchedules: Schedule[]; pastSchedules: Schedule[] }>(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = schedules.filter(s => new Date(s.date) >= today).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const past = schedules.filter(s => new Date(s.date) < today).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return { upcomingSchedules: upcoming, pastSchedules: past };
    }, [schedules]);

    return (
        <>
            <div className="lg:col-span-2 glass-card p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Jadwal Kegiatan</h2>
                    <Link href={route('schedules.index')} className="text-sm px-4 py-2 rounded-full bg-blue-500/80 text-white hover:bg-blue-600 font-semibold transition">
                        Detail Jadwal
                    </Link>
                </div>
                <div className="flex-grow overflow-y-auto max-h-[70vh] pr-2 hide-scrollbar">
                    {/* Akan Datang */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3"><Clock size={18} className="text-green-400" /><h3 className="font-semibold text-green-400">Akan Datang</h3></div>
                        <div className="space-y-3">
                            {upcomingSchedules.length > 0 ? (
                                upcomingSchedules.map((schedule) => (
                                    <button key={schedule.id} onClick={() => setViewingSchedule(schedule)} className="w-full text-left p-3 rounded-lg bg-black/20 hover:bg-black/40 transition">
                                        <div className="flex justify-between items-start text-sm">
                                            <div>
                                                <p className="font-bold text-white">{schedule.title}</p>
                                                <p className="text-white/60">{schedule.location || 'Lokasi belum diatur'}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-semibold text-purple-300">{new Date(schedule.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}</p>
                                                <p className="text-white/60">{formatTime(schedule.start_time)}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="flex items-center gap-2 text-sm text-white/60 py-4"><AlertCircle size={16} /><p>Belum ada jadwal akan datang.</p></div>
                            )}
                        </div>
                    </div>
                    {/* Telah Selesai */}
                    <div>
                        <div className="flex items-center gap-2 mb-3"><History size={18} className="text-gray-400" /><h3 className="font-semibold text-gray-400">Telah Selesai (5 Terakhir)</h3></div>
                        <div className="space-y-3">
                            {pastSchedules.length > 0 ? (
                                pastSchedules.slice(0, 5).map((schedule) => (
                                    <button key={schedule.id} onClick={() => setViewingSchedule(schedule)} className="w-full text-left p-3 rounded-lg bg-black/20 opacity-70 hover:opacity-100 transition">
                                        <div className="flex justify-between items-start text-sm text-white/70">
                                            <div className="line-through"><p className="font-bold">{schedule.title}</p><p className="text-white/40">{schedule.location || ''}</p></div>
                                            <div className="text-right flex-shrink-0"><p className="font-semibold">{new Date(schedule.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}</p><p className="text-white/40">{formatTime(schedule.start_time)}</p></div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p className="text-sm text-white/60 text-center py-4">Tidak ada riwayat jadwal.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ScheduleDetailModal schedule={viewingSchedule} onClose={() => setViewingSchedule(null)} />
        </>
    );
}