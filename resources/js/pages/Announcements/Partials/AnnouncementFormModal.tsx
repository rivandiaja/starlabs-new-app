import { useForm } from '@inertiajs/react';
import { type Announcement } from '@/types';
import { FormEventHandler, useEffect } from 'react';
import { X } from 'lucide-react';
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
            <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
            <div className="w-full max-w-lg glass-card rounded-2xl shadow-lg z-10">
                <form onSubmit={submit}>
                    <div className="p-4 border-b border-white/10 flex justify-between items-center"><h3 className="font-bold text-white">{announcement ? 'Edit' : 'Tambah'} Pengumuman</h3><button type="button" onClick={onClose}><X/></button></div>
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="text-sm text-white/80">Judul</label>
                            <input value={data.title} onChange={e => setData('title', e.target.value)} type="text" className="input-glass w-full" required />
                            <InputError message={errors.title} className="mt-1" />
                        </div>
                        <div>
                            <label className="text-sm text-white/80">Konten</label>
                            <textarea value={data.content} onChange={e => setData('content', e.target.value)} className="input-glass w-full min-h-[120px]" required />
                            <InputError message={errors.content} className="mt-1" />
                        </div>
                        <div>
                            <label className="text-sm text-white/80">Level</label>
                            <select value={data.level} onChange={e => setData('level', e.target.value)} className="input-glass w-full">
                                <option value="info">Info (Biru)</option>
                                <option value="success">Success (Hijau)</option>
                                <option value="warning">Warning (Kuning)</option>
                                <option value="danger">Danger (Merah)</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-black/20 flex justify-end gap-2"><button type="button" onClick={onClose}>Batal</button><button type="submit" disabled={processing}>Simpan</button></div>
                </form>
            </div>
        </div>
    );
}