import { useForm } from '@inertiajs/react';
import { type Dues, type User } from '@/types';
import { FormEventHandler, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    dues?: Dues | null;
    users: User[];
}

export default function DuesFormModal({ isOpen, onClose, dues, users }: Props) {
    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        user_id: '',
        period: new Date().toISOString().slice(0, 7),
        amount: 50000,
        status: 'unpaid',
        payment_date: '',
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            setData({
                // --- PERBAIKAN DI SINI ---
                // Convert 'user_id' (number) menjadi string agar cocok dengan tipe form
                user_id: dues?.user_id.toString() || '',
                
                period: dues?.period || new Date().toISOString().slice(0, 7),
                amount: dues?.amount || 5000,
                status: dues?.status || 'unpaid',
                payment_date: dues?.payment_date ? new Date(dues.payment_date).toISOString().slice(0, 10) : '',
            });
        }
    }, [isOpen, dues]);
    
    useEffect(() => {
        if (data.status === 'paid' && !data.payment_date) {
            setData('payment_date', new Date().toISOString().slice(0, 10));
        } else if (data.status === 'unpaid') {
            setData('payment_date', '');
        }
    }, [data.status]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => onClose() };
        if (dues) {
            patch(route('dues.update', dues.id), options);
        } else {
            post(route('dues.store'), options);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/50" onClick={onClose}></div>
            <div className="w-full max-w-lg bg-black/60 rounded-2xl shadow-soft overflow-hidden z-10 fade-in">
                <form onSubmit={submit}>
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">{dues ? 'Edit' : 'Tambah'} Tagihan Kas</h3>
                        <button type="button" className="p-2 rounded-lg hover:bg-slate-50" onClick={onClose} aria-label="Tutup">
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Nama Anggota</label>
                                <select 
                                    value={data.user_id} 
                                    onChange={e => setData('user_id', e.target.value)} 
                                    className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring" 
                                    required
                                >
                                    <option value="" className="text-black" disabled>Pilih Anggota</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id} className="text-black">
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Periode</label>
                                <input value={data.period} onChange={e => setData('period', e.target.value)} type="month" className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Jumlah (Rp)</label>
                                <input value={data.amount} onChange={e => setData('amount', parseFloat(e.target.value) || 0)} type="number" min="0" placeholder="0" className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Status</label>
                                <select value={data.status} onChange={e => setData('status', e.target.value as 'paid' | 'unpaid')} className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring">
                                    <option value="unpaid" className="text-black">Belum Lunas</option>
                                    <option value="paid" className="text-black">Lunas</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1">Tanggal Bayar</label>
                            <input value={data.payment_date} onChange={e => setData('payment_date', e.target.value)} type="date" className="text-white w-full px-3 py-2 rounded-lg border border-slate-300 focus-ring" disabled={data.status === 'unpaid'} />
                        </div>
                    </div>
                    <div className="px-5 py-4 bg-black/60 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button type="button" className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-white" onClick={onClose}>Batal</button>
                        <button type="submit" disabled={processing} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">{processing ? 'Menyimpan...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}