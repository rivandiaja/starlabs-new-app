import { useState } from 'react';
import { type Dues } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);
const formatPeriod = (period?: string | null) => {
    if (!period || !period.includes('-')) return period ?? '';
    const [year, month] = period.split('-');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
};

interface Props {
    billingSummary: {
        totalBill: number;
        totalPaid: number;
        overallTotal: number;
        unpaidDetails: Dues[];
        paidDetails: Dues[];
    };
}

export default function BillingPanel({ billingSummary }: Props) {
    const [showBillDetails, setShowBillDetails] = useState(false);
    const paymentProgress = billingSummary.overallTotal > 0 ? Math.min(100, (billingSummary.totalPaid / billingSummary.overallTotal) * 100) : 0;

    return (
        <div>
            <h3 className="font-semibold text-xl mb-3">Total Tagihan</h3>
            <div className="glass-card p-6 rounded-2xl shadow-lg border border-white/10">
                <p className="text-3xl font-bold text-blue-400 my-2">{formatCurrency(billingSummary.totalBill)}</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 my-2"><div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${paymentProgress}%` }} /></div>
                <p className="text-xs text-white/70">Kamu sudah membayar {formatCurrency(billingSummary.totalPaid)} dari {formatCurrency(billingSummary.overallTotal)}</p>
                <button onClick={() => setShowBillDetails((v) => !v)} className="w-full mt-4 flex justify-between items-center text-left p-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition">
                    <span className="font-semibold">Lihat Rincian</span>
                    {showBillDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {showBillDetails && (
                    <div className="mt-3 border-t border-white/10 pt-3 space-y-2 fade-in max-h-48 overflow-y-auto pr-2">
                        {billingSummary.unpaidDetails.map((kas) => ( <div key={kas.id} className="flex justify-between items-center text-sm"><span className="text-white/80">Kas {formatPeriod(kas.period)}</span><span className="font-semibold text-white">{formatCurrency(kas.amount)}</span></div> ))}
                        {billingSummary.paidDetails.map((kas) => ( <div key={kas.id} className="flex justify-between items-center text-sm text-white/50"><span className="line-through">Kas {formatPeriod(kas.period)}</span><span className="font-semibold line-through">{formatCurrency(kas.amount)}</span></div> ))}
                    </div>
                )}
            </div>
        </div>
    );
}