import InputError from '@/components/input-error';
import { type Academy } from '@/types';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    academy?: Academy | null;
}

type FormData = {
    name: string;
    is_active: boolean;
    registration_link: string;
};

export default function AcademyFormModal({ isOpen, onClose, academy }: Props) {
    const { data, setData, post, patch, processing, errors, reset } = useForm<FormData>({
        name: '',
        is_active: false,
        registration_link: '',
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            setData({
                name: academy?.name || '',
                is_active: academy?.is_active || false,
                registration_link: academy?.registration_link || '',
            });
        }
    }, [isOpen, academy]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => onClose() };
        if (academy) {
            patch(route('academies.update', academy.id), options);
        } else {
            post(route('academies.store'), options);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
            <div className="glass-card z-10 w-full max-w-lg rounded-2xl shadow-lg">
                <form onSubmit={submit}>
                    <div className="flex items-center justify-between border-b border-white/10 p-4">
                        <h3 className="font-bold text-white">{academy ? 'Edit' : 'Buat'} Akademi Baru</h3>
                        <button type="button" onClick={onClose}>
                            <X className="text-white/70" />
                        </button>
                    </div>
                    <div className="space-y-4 p-6">
                        <div>
                            <label className="mb-1 block text-sm text-white/80">Nama Akademi</label>
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                type="text"
                                className="text-white input-glass w-full"
                                placeholder="Contoh: Starlabs Academy 3"
                                required
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm text-white/80">Link Pendaftaran</label>
                            <input
                                value={data.registration_link}
                                onChange={(e) => setData('registration_link', e.target.value)}
                                type="url"
                                className="text-white input-glass w-full"
                                placeholder="https://starlabs.com/register"
                            />
                            <InputError message={errors.registration_link} className="mt-1" />
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/10"
                            />
                            <label htmlFor="is_active" className="text-sm text-white/80">
                                Jadikan akademi ini aktif (akan tampil di halaman utama)
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 bg-black/20 p-4">
                        <button type="button" className="rounded-md px-4 py-2 font-semibold text-white/80 hover:bg-white/10" onClick={onClose}>
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
