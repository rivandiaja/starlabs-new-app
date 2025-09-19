import { useForm } from '@inertiajs/react';
import { type Announcement } from '@/types';
import { FormEventHandler, useEffect } from 'react';
import { X, LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    announcement?: Announcement | null;
}

export default function AnnouncementFormModal({ isOpen, onClose, announcement }: Props) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: '',
        content: '',
        level: 'info',
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            setData({
                title: announcement?.title || '',
                content: announcement?.content || '',
                level: announcement?.level || 'info',
            });
        }
    }, [isOpen, announcement]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => onClose() };
        if (announcement) {
            patch(route('announcements.update', announcement.id), options);
        } else {
            post(route('announcements.store'), options);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="w-full max-w-lg glass-card rounded-2xl shadow-lg z-10 border border-white/10">
                <form onSubmit={submit}>
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <h3 className="font-bold text-white">{announcement ? 'Edit' : 'Tambah'} Pengumuman</h3>
                        <button type="button" onClick={onClose} className="p-1 rounded-full text-white/70 hover:bg-white/10">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-sm text-white/80 block mb-1">Judul</label>
                            <input value={data.title} onChange={e => setData('title', e.target.value)} type="text" className="text-white input-glass w-full" required />
                            <InputError message={errors.title} className="mt-1" />
                        </div>
                        <div>
                            <label className="text-sm text-white/80 block mb-1">Konten</label>
                            <textarea value={data.content} onChange={e => setData('content', e.target.value)} className="text-white input-glass w-full min-h-[120px]" required />
                            <InputError message={errors.content} className="mt-1" />
                        </div>
                        <div>
                            <label className="text-sm text-white/80 block mb-1">Level</label>
                            <select value={data.level} onChange={e => setData('level', e.target.value)} className="text-white input-glass w-full">
                                <option value="info">Info (Biru)</option>
                                <option value="success">Success (Hijau)</option>
                                <option value="warning">Warning (Kuning)</option>
                                <option value="danger">Danger (Merah)</option>
                            </select>
                        </div>
                    </div>
                    {/* --- PERBAIKAN: Menambahkan gaya pada tombol --- */}
                    <div className="p-4 bg-black/20 flex justify-end gap-2">
                        <button type="button" className="px-4 py-2 rounded-md font-semibold text-white/80 hover:bg-white/10 transition" onClick={onClose}>Batal</button>
                        <button type="submit" disabled={processing} className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2">
                            {processing && <LoaderCircle size={16} className="animate-spin" />}
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
