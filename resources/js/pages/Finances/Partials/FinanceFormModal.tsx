import { useForm } from '@inertiajs/react';
import { type Finance } from '@/types';
import { FormEventHandler, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    finance?: Finance | null; // Data untuk mode edit, null untuk mode create
}

export default function FinanceFormModal({ isOpen, onClose, finance }: Props) {
    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        date: new Date().toISOString().slice(0, 10),
        category: '',
        description: '',
        type: 'income',
        amount: 0,
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            setData({
                date: finance?.date || new Date().toISOString().slice(0, 10),
                category: finance?.category || '',
                description: finance?.description || '',
                type: finance?.type || 'income',
                amount: finance?.amount || 0,
            });
        }
    }, [isOpen, finance]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => onClose() };
        if (finance) {
            patch(route('finances.update', finance.id), options);
        } else {
            post(route('finances.store'), options);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/50" onClick={onClose}></div>
            <div className="w-full max-w-lg bg-black/60 rounded-2xl shadow-soft overflow-hidden z-10 fade-in">
                <form onSubmit={submit}>
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">{finance ? 'Edit' : 'Tambah'} Transaksi</h3>
                        <button type="button" className="p-2 rounded-lg hover:bg-slate-50" onClick={onClose} aria-label="Tutup">
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>
                    <div className="p-5 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1">Tipe</label>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setData('type', 'income')} className={`flex-1 px-3 py-2 rounded-lg border font-semibold ${data.type === 'income' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white hover:bg-emerald-50 text-slate-600'}`}>Pemasukan</button>
                                <button type="button" onClick={() => setData('type', 'expense')} className={`flex-1 px-3 py-2 rounded-lg border font-semibold ${data.type === 'expense' ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-white hover:bg-rose-50 text-slate-600'}`}>Pengeluaran</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Tanggal</label>
                                <input value={data.date} onChange={e => setData('date', e.target.value)} type="date" className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Kategori</label>
                                <input value={data.category} onChange={e => setData('category', e.target.value)} type="text" placeholder="Contoh: DKM" className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1">Deskripsi</label>
                            <input value={data.description} onChange={e => setData('description', e.target.value)} type="text" placeholder="Keterangan singkat" className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring" required/>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1">Jumlah (Rp)</label>
                            <input value={data.amount} onChange={e => setData('amount', parseFloat(e.target.value) || 0)} type="number" min="0" placeholder="0" className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring" required/>
                        </div>
                    </div>
                    <div className="px-5 py-4 bg-black/60 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button type="button" className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-white " onClick={onClose}>Batal</button>
                        <button type="submit" disabled={processing} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">{processing ? 'Menyimpan...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}