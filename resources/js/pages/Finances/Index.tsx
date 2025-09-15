import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Finance, type Dues, type User } from '@/types';
import FinanceFormModal from './Partials/FinanceFormModal';
import DuesFormModal from './Partials/DuesFormModal';

// Tipe untuk props yang diterima dari controller
interface Props {
    finances: Finance[];
    dues: Dues[];
    users: User[];
    summary: {
        income: number;
        expense: number;
        balance: number;
    };
    duesSummary: {
        totalPaid: number;
        paidCount: number;
        totalCount: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Finance', href: route('finances.index') },
];

// Helper untuk format mata uang
const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);

// --- FUNGSI BARU UNTUK FORMAT PERIODE ---
const formatPeriod = (period: string) => {
    if (!period || !period.includes('-')) return period;
    const [year, month] = period.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
    });
};

export default function FinanceIndex({ finances = [], dues = [], users, summary, duesSummary }: Props) {
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState('keuangan');
    const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
    const [editingFinance, setEditingFinance] = useState<Finance | null>(null);
    const [isDuesModalOpen, setIsDuesModalOpen] = useState(false);
    const [editingDues, setEditingDues] = useState<Dues | null>(null);

    // --- MODAL HANDLERS ---
    const openCreateFinanceModal = () => {
        setEditingFinance(null);
        setIsFinanceModalOpen(true);
    };
    const openEditFinanceModal = (finance: Finance) => {
        setEditingFinance(finance);
        setIsFinanceModalOpen(true);
    };
    const openCreateDuesModal = () => {
        setEditingDues(null);
        setIsDuesModalOpen(true);
    };
    const openEditDuesModal = (duesItem: Dues) => {
        setEditingDues(duesItem);
        setIsDuesModalOpen(true);
    };

    // Mengurutkan data untuk ditampilkan di tabel
    const sortedFinances = useMemo(() => 
        [...finances].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [finances]);
    
    const sortedDues = useMemo(() => 
        [...dues].sort((a, b) => {
            const periodCompare = b.period.localeCompare(a.period);
            if (periodCompare !== 0) return periodCompare;
            return (a.user?.name || '').localeCompare(b.user?.name || '');
        }),
    [dues]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Finance Management" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="glass-card p-6 rounded-xl shadow-lg text-white">
                    {/* Header */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-white/10">
                               <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7a2 2 0 0 0-2-2H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h13a2 2 0 0 0 2-2v-5m0 0h-4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4m0-5V9" /></svg>
                            </div>
                            <div>
                               <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Manajemen Keuangan</h1>
                               <p className="text-white/70 text-sm">Ringkasan & Daftar Transaksi</p>
                            </div>
                        </div>
                    </header>

                    {/* Ringkasan */}
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="rounded-xl p-4 bg-emerald-900/40 border border-emerald-500/30">
                            <span className="text-emerald-400 font-semibold text-sm">Total Pemasukan</span>
                            <div className="text-2xl font-extrabold text-white mt-1">{formatCurrency(summary.income)}</div>
                        </div>
                        <div className="rounded-xl p-4 bg-rose-900/40 border border-rose-500/30">
                            <span className="text-rose-400 font-semibold text-sm">Total Pengeluaran</span>
                            <div className="text-2xl font-extrabold text-white mt-1">{formatCurrency(summary.expense)}</div>
                        </div>
                        <div className="rounded-xl p-4 bg-sky-900/40 border border-sky-500/30">
                            <span className="text-sky-400 font-semibold text-sm">Saldo Akhir</span>
                            <div className="text-2xl font-extrabold text-white mt-1">{formatCurrency(summary.balance)}</div>
                        </div>
                    </section>

                    {/* Menu Tab */}
                    <div className="mb-6">
                      <div className="w-full sm:w-auto inline-flex rounded-xl bg-black/20 p-1 gap-1">
                        <button onClick={() => setActiveTab('keuangan')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'keuangan' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}>
                            Keuangan Umum
                        </button>
                        <button onClick={() => setActiveTab('kas')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'kas' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}>
                            Kas Anggota
                        </button>
                      </div>
                    </div>

                    {/* Konten Berdasarkan Tab */}
                    {activeTab === 'keuangan' && (
                       <section className="fade-in">
                           <div className="flex justify-end mb-4">
                               <button onClick={openCreateFinanceModal} className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition text-sm font-semibold">+ Tambah Transaksi</button>
                           </div>
                           <div className="overflow-x-auto">
                               <table className="w-full text-left text-sm text-white/80">
                                   <thead className="text-gray-400 border-b border-white/20">
                                        <tr>
                                            <th className="py-3 px-4">Tanggal</th>
                                            <th className="py-3 px-4">Kategori</th>
                                            <th className="py-3 px-4">Deskripsi</th>
                                            <th className="py-3 px-4">Tipe</th>
                                            <th className="py-3 px-4 text-right">Jumlah</th>
                                            <th className="py-3 px-4 text-right">Aksi</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-white/10">
                                       {sortedFinances.length > 0 ? sortedFinances.map(tx => (
                                           <tr key={tx.id} className="hover:bg-white/5">
                                               <td className="py-3 px-4">{new Date(tx.date).toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'})}</td>
                                               <td className="py-3 px-4">{tx.category}</td>
                                               <td className="py-3 px-4">{tx.description}</td>
                                               <td className="py-3 px-4"><span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${tx.type === 'income' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-rose-900/50 text-rose-300'}`}>{tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span></td>
                                               <td className={`py-3 px-4 text-right font-semibold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>{formatCurrency(tx.amount)}</td>
                                               <td className="py-3 px-4 text-right">
                                                   <div className="inline-flex gap-2">
                                                       <button onClick={() => openEditFinanceModal(tx)} className="text-xs px-2.5 py-1 rounded-full bg-gray-500 hover:bg-gray-600 text-white font-medium">Edit</button>
                                                       <Link href={route('finances.destroy', tx.id)} method="delete" as="button" onBefore={() => confirm('Yakin ingin menghapus?')} className="text-xs px-2.5 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium">Hapus</Link>
                                                   </div>
                                               </td>
                                           </tr>
                                       )) : (
                                           <tr><td colSpan={6} className="text-center py-8 text-white/50">Belum ada data transaksi.</td></tr>
                                       )}
                                   </tbody>
                               </table>
                           </div>
                       </section>
                    )}

                    {activeTab === 'kas' && (
                       <section className="fade-in">
                           <div className="mb-6 p-4 rounded-xl bg-indigo-900/40 border border-indigo-500/30">
                               <div className="flex items-center justify-between">
                                   <div>
                                       <h4 className="font-bold text-indigo-300">Kumulasi Kas Lunas</h4>
                                       <p className="text-sm text-indigo-400">Total kas yang sudah terkumpul dari anggota.</p>
                                   </div>
                                   <div className="text-right">
                                       <div className="text-2xl font-extrabold text-white">{formatCurrency(duesSummary.totalPaid)}</div>
                                       <div className="text-sm text-white/70">
                                           <span>{duesSummary.paidCount}</span> dari <span>{duesSummary.totalCount}</span> tagihan lunas
                                       </div>
                                   </div>
                               </div>
                           </div>
                           
                           <div className="flex justify-end mb-4">
                               <button onClick={openCreateDuesModal} className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition text-sm font-semibold">+ Tambah Tagihan Kas</button>
                           </div>
                           <div className="overflow-x-auto">
                               <table className="w-full text-left text-sm text-white/80">
                                   <thead className="text-gray-400 border-b border-white/20">
                                       <tr>
                                           <th className="py-3 px-4">Nama</th>
                                           <th className="py-3 px-4">Periode</th>
                                           <th className="py-3 px-4 text-right">Jumlah</th>
                                           <th className="py-3 px-4">Status</th>
                                           <th className="py-3 px-4 text-right">Aksi</th>
                                       </tr>
                                   </thead>
                                   <tbody className="divide-y divide-white/10">
                                       {sortedDues.length > 0 ? sortedDues.map(kas => (
                                           <tr key={kas.id} className="hover:bg-white/5">
                                               <td className="py-3 px-4">{kas.user?.name}</td>
                                               <td className="py-3 px-4">{formatPeriod(kas.period)}</td>
                                               <td className="py-3 px-4 text-right font-semibold">{formatCurrency(kas.amount)}</td>
                                               <td className="py-3 px-4"><span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${kas.status === 'paid' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'}`}>{kas.status === 'paid' ? 'Lunas' : 'Belum Lunas'}</span></td>
                                               <td className="py-3 px-4 text-right">
                                                    <div className="inline-flex gap-2">
                                                       <button onClick={() => openEditDuesModal(kas)} className="text-xs px-2.5 py-1 rounded-full bg-gray-500 hover:bg-gray-600 text-white font-medium">Edit</button>
                                                       <Link href={route('dues.destroy', kas.id)} method="delete" as="button" onBefore={() => confirm('Yakin ingin menghapus?')} className="text-xs px-2.5 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium">Hapus</Link>
                                                   </div>
                                               </td>
                                           </tr>
                                       )) : (
                                           <tr><td colSpan={5} className="text-center py-8 text-white/50">Belum ada data kas.</td></tr>
                                       )}
                                   </tbody>
                               </table>
                           </div>
                       </section>
                    )}
                </div>
            </div>
            
            {/* Render Modal */}
            <FinanceFormModal isOpen={isFinanceModalOpen} onClose={() => setIsFinanceModalOpen(false)} finance={editingFinance} />
            <DuesFormModal isOpen={isDuesModalOpen} onClose={() => setIsDuesModalOpen(false)} dues={editingDues} users={users} />
        </AppLayout>
    );
}