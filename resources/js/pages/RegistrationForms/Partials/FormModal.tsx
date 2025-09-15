import { useForm, router } from '@inertiajs/react';
import { type RegistrationForm } from '@/types';
import { FormEventHandler, useEffect } from 'react';
import { X, Calendar, Image as ImageIcon } from 'lucide-react';
import InputError from '@/components/input-error';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    form?: RegistrationForm | null;
}

// Daftar semua kolom yang bisa dipilih untuk formulir
const availableFields = [
    { id: 'name', label: 'Nama Lengkap' }, { id: 'email', label: 'Email' },
    { id: 'gender', label: 'Jenis Kelamin' }, { id: 'division', label: 'Pilihan Divisi' },
    { id: 'nim', label: 'NIM' }, { id: 'prodi', label: 'Program Studi' },
    { id: 'whatsapp', label: 'No. WhatsApp' }
];

// --- PERBAIKAN: Ubah 'interface' menjadi 'type' untuk kompatibilitas dengan useForm ---
type FormData = {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    image: File | null;
    is_active: boolean;
    show_benefits: boolean;
    fields: string[];
    _method: 'POST' | 'PATCH';
};

export default function FormModal({ isOpen, onClose, form }: Props) {
    const { data, setData, errors, processing, reset } = useForm<FormData>({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        image: null,
        is_active: false,
        show_benefits: true,
        fields: ['name', 'email'],
        _method: 'POST',
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            setData({
                title: form?.title || '',
                description: form?.description || '',
                start_date: form?.start_date ? new Date(form.start_date).toISOString().slice(0,10) : '',
                end_date: form?.end_date ? new Date(form.end_date).toISOString().slice(0,10) : '',
                image: null,
                is_active: form?.is_active || false,
                show_benefits: form?.show_benefits !== undefined ? form.show_benefits : true,
                fields: form?.fields || ['name', 'email'],
                _method: form ? 'PATCH' : 'POST',
            });
        }
    }, [isOpen, form]);
    
    const handleFieldChange = (fieldId: string) => {
        const currentFields = data.fields;
        if (currentFields.includes(fieldId)) {
            setData('fields', currentFields.filter(id => id !== fieldId));
        } else {
            setData('fields', [...currentFields, fieldId]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const url = form ? route('registration-forms.update', form.id) : route('registration-forms.store');
        router.post(url, data, {
            onSuccess: () => onClose(),
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="w-full max-w-2xl glass-card rounded-2xl shadow-lg z-10 border border-white/10">
                <form onSubmit={submit}>
                    <div className="p-4 border-b border-white/10 flex justify-between items-center"><h3 className="font-bold text-white">{form ? 'Edit' : 'Buat'} Formulir</h3><button type="button" onClick={onClose} className="p-1 rounded-full text-white/70 hover:bg-white/10"><X /></button></div>
                    <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                        <input type="text" placeholder="Judul Formulir" value={data.title} onChange={e => setData('title', e.target.value)} className="input-glass w-full text-xl font-bold" required />
                        <textarea placeholder="Deskripsi Singkat" value={data.description} onChange={e => setData('description', e.target.value)} className="input-glass w-full min-h-[100px]" required />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="text-sm text-white/80 block mb-1">Tanggal Buka</label><input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} className="input-glass w-full" required/></div>
                            <div><label className="text-sm text-white/80 block mb-1">Tanggal Tutup</label><input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} className="input-glass w-full" required/></div>
                        </div>
                        
                        <div>
                            <label className="text-sm text-white/80 flex items-center gap-2 mb-1"><ImageIcon size={16}/> Gambar Iklan (Pop-up)</label>
                            <input type="file" onChange={e => setData('image', e.target.files?.[0] || null)} className="w-full text-xs text-white file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-500/10 file:text-blue-300 hover:file:bg-blue-500/20"/>
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="border-y border-white/10 py-4 space-y-3">
                            <label className="text-sm font-semibold text-white/90">Opsi Tampilan</label>
                            <div className="flex items-center gap-3"><input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="h-4 w-4 rounded bg-white/10 border-white/20" /><span className="text-sm text-white/80">Tampilkan Pop-up Iklan di Halaman Utama</span></div>
                            <div className="flex items-center gap-3"><input type="checkbox" checked={data.show_benefits} onChange={e => setData('show_benefits', e.target.checked)} className="h-4 w-4 rounded bg-white/10 border-white/20" /><span className="text-sm text-white/80">Tampilkan Bagian Benefit</span></div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-white/90">Kolom Formulir Kustom</label>
                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {availableFields.map(field => (
                                    <div key={field.id} className="flex items-center gap-2">
                                        <input type="checkbox" id={field.id} checked={data.fields.includes(field.id)} onChange={() => handleFieldChange(field.id)} className="h-4 w-4 rounded bg-white/10 border-white/20" />
                                        <label htmlFor={field.id} className="text-sm text-white/80">{field.label}</label>
                                    </div>
                                ))}
                            </div>
                            <InputError message={errors.fields} className="mt-2" />
                        </div>
                    </div>
                    <div className="p-4 bg-black/20 flex justify-end gap-2"><button type="button" className="px-4 py-2 rounded-md font-semibold text-white/80 hover:bg-white/10" onClick={onClose}>Batal</button><button type="submit" disabled={processing} className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700">{processing ? 'Menyimpan...' : 'Simpan'}</button></div>
                </form>
            </div>
        </div>
    );
}

