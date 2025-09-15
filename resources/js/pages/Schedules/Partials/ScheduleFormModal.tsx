import React, { FormEventHandler, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { type Schedule } from '@/types';
import { X, Calendar, Clock } from 'lucide-react';

// Komponen kecil untuk menyuntikkan style CSS khusus
// Ini untuk menyembunyikan ikon kalender & jam bawaan browser
const CustomInputStyles = () => (
    <style>{`
        .hide-native-icon::-webkit-calendar-picker-indicator {
            display: none;
            -webkit-appearance: none;
        }
        /* Menambahkan style untuk input-glass agar teks berwarna putih */
        .input-glass {
            color-scheme: dark; /* Memastikan UI picker (kalender, jam) berwarna gelap */
            color: white;      /* Mengatur warna teks input menjadi putih */
        }
    `}</style>
);

interface Props {
    isOpen: boolean;
    onClose: () => void;
    schedule?: Schedule | null;
}

export default function ScheduleFormModal({ isOpen, onClose, schedule }: Props) {
    const { data, setData, post, patch, processing, reset, clearErrors } = useForm({
        title: '', description: '',
        date: new Date().toISOString().slice(0, 10),
        start_time: '09:00', end_time: '10:00', location: ''
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            setData({
                title: schedule?.title || '',
                description: schedule?.description || '',
                date: schedule?.date ? new Date(schedule.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
                start_time: schedule?.start_time?.slice(0, 5) || '09:00',
                end_time: schedule?.end_time?.slice(0, 5) || '10:00',
                location: schedule?.location || '',
            });
        }
    }, [isOpen, schedule]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => onClose() };
        if (schedule) {
            patch(route('schedules.update', schedule.id), options);
        } else {
            post(route('schedules.store'), options);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <CustomInputStyles />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="w-full max-w-lg glass-card rounded-2xl shadow-lg overflow-hidden z-10 border border-white/10">
                <form onSubmit={submit}>
                    <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">{schedule ? 'Edit' : 'Tambah'} Jadwal</h3>
                        <button type="button" className="p-1 rounded-full text-white/70 hover:bg-white/10" onClick={onClose}><X size={20} /></button>
                    </div>
                    <div className="p-5 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-1">Judul Kegiatan</label>
                            <input value={data.title} onChange={e => setData('title', e.target.value)} type="text" className="input-glass w-full" required />
                        </div>
                        
                        <div className="relative">
                            <label className="block text-sm font-semibold text-white/80 mb-1">Tanggal</label>
                            <input value={data.date} onChange={e => setData('date', e.target.value)} type="date" className="input-glass w-full pr-10 hide-native-icon" required />
                            <Calendar size={18} className="absolute right-3 top-1/2 mt-[0.375rem] text-white/50 pointer-events-none" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-sm font-semibold text-white/80 mb-1">Waktu Mulai</label>
                                <input value={data.start_time} onChange={e => setData('start_time', e.target.value)} type="time" className="input-glass w-full pr-10 hide-native-icon" required />
                                <Clock size={18} className="absolute right-3 top-1/2 mt-[0.375rem] text-white/50 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-semibold text-white/80 mb-1">Waktu Selesai</label>
                                <input value={data.end_time} onChange={e => setData('end_time', e.target.value)} type="time" className="input-glass w-full pr-10 hide-native-icon" required />
                                <Clock size={18} className="absolute right-3 top-1/2 mt-[0.375rem] text-white/50 pointer-events-none" />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-1">Lokasi (Opsional)</label>
                            <input value={data.location || ''} onChange={e => setData('location', e.target.value)} type="text" className="input-glass w-full" />
                        </div>
                         <div>
                            <label className="block text-sm font-semibold text-white/80 mb-1">Deskripsi (Opsional)</label>
                            <textarea value={data.description || ''} onChange={e => setData('description', e.target.value)} className="input-glass w-full min-h-[80px]" />
                        </div>
                    </div>
                    <div className="px-5 py-4 bg-black/30 border-t border-white/10 flex justify-end gap-2">
                        <button type="button" className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-white/10" onClick={onClose}>Batal</button>
                        <button type="submit" disabled={processing} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">{processing ? 'Menyimpan...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

