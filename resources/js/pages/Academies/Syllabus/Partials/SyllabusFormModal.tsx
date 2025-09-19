import { useForm } from '@inertiajs/react';
import { type Syllabus } from '../../../../types'; // Perbaikan path
import { FormEventHandler, useEffect } from 'react';
import { X, LoaderCircle } from 'lucide-react';
import InputError from '../../../../components/input-error'; // Perbaikan path

interface Props {
    isOpen: boolean;
    onClose: () => void;
    syllabus?: Syllabus | null;
    academyId: number;
    divisionId: number;
}

export default function SyllabusFormModal({ isOpen, onClose, syllabus, academyId, divisionId }: Props) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        pertemuan: 1,
        pemateri: '',
        materi_utama: '',
        sub_materi: '',
        studi_kasus: '',
        tujuan: '',
        division_id: divisionId,
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            setData({
                pertemuan: syllabus?.pertemuan || 1,
                pemateri: syllabus?.pemateri || '',
                materi_utama: syllabus?.materi_utama || '',
                sub_materi: syllabus?.sub_materi?.join('\n') || '',
                studi_kasus: syllabus?.studi_kasus || '',
                tujuan: syllabus?.tujuan || '',
                division_id: divisionId,
            });
        }
    }, [isOpen, syllabus, divisionId]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = { 
            onSuccess: () => onClose(),
            preserveScroll: true,
            onError: () => {
                // Mencegah modal tertutup otomatis saat validasi gagal
            },
        };

        if (syllabus) {
            patch(route('syllabuses.update', syllabus.id), options);
        } else {
            post(route('academies.syllabuses.store', { academy: academyId }), options);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="w-full max-w-2xl glass-card rounded-2xl shadow-lg z-10 border border-white/10">
                <form onSubmit={submit}>
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <h3 className="font-bold text-white">{syllabus ? 'Edit' : 'Tambah'} Materi Silabus</h3>
                        <button type="button" onClick={onClose} className="p-1 rounded-full text-white/70 hover:bg-white/10"><X /></button>
                    </div>
                    <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-white/80 block mb-1">Pertemuan Ke-</label>
                                <input type="number" value={data.pertemuan} onChange={e => setData('pertemuan', parseInt(e.target.value))} className="text-white input-glass w-full" required/>
                                <InputError message={errors.pertemuan} className="mt-1" />
                            </div>
                            <div>
                                <label className="text-sm text-white/80 block mb-1">Nama Pemateri</label>
                                <input type="text" value={data.pemateri} onChange={e => setData('pemateri', e.target.value)} className="text-white input-glass w-full" required/>
                                <InputError message={errors.pemateri} className="mt-1" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-white/80 block mb-1">Materi Utama</label>
                            <input type="text" value={data.materi_utama} onChange={e => setData('materi_utama', e.target.value)} className="text-white input-glass w-full" required/>
                             <InputError message={errors.materi_utama} className="mt-1" />
                        </div>
                        <div>
                            <label className="text-sm text-white/80 block mb-1">Sub Materi (satu per baris)</label>
                            <textarea value={data.sub_materi} onChange={e => setData('sub_materi', e.target.value)} className="text-white input-glass w-full min-h-[100px]"/>
                            <InputError message={errors.sub_materi} className="mt-1" />
                        </div>
                        <div>
                            <label className="text-sm text-white/80 block mb-1">Studi Kasus / Output</label>
                            <input type="text" value={data.studi_kasus} onChange={e => setData('studi_kasus', e.target.value)} className="text-white input-glass w-full"/>
                             <InputError message={errors.studi_kasus} className="mt-1" />
                        </div>
                        <div>
                            <label className="text-sm text-white/80 block mb-1">Tujuan</label>
                            <input type="text" value={data.tujuan} onChange={e => setData('tujuan', e.target.value)} className="text-white input-glass w-full"/>
                            <InputError message={errors.tujuan} className="mt-1" />
                        </div>
                    </div>
                    <div className="p-4 bg-black/20 flex justify-end gap-2">
                        <button type="button" className="px-4 py-2 rounded-md font-semibold text-white/80 hover:bg-white/10" onClick={onClose}>Batal</button>
                        <button type="submit" disabled={processing} className="px-6 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2">
                            {processing && <LoaderCircle size={16} className="animate-spin" />}
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

