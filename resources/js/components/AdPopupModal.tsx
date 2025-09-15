import { type RegistrationForm } from '@/types';
import { X, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Props {
    form: RegistrationForm;
    onClose: () => void;
}

// Helper function untuk format tanggal
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

export default function AdPopupModal({ form, onClose }: Props) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent  p-4 fade-in">
            <div className="relative max-w-4xl w-full bg-black/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 overflow-hidden flex flex-col md:flex-row">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white/70 hover:bg-black/60 transition z-10"
                    aria-label="Tutup Iklan"
                >
                    <X size={20} />
                </button>
                
                {/* --- Kolom Kiri: Teks dan Tombol --- */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-1">
                    <h3 className="text-3xl font-bold text-white">{form.title}</h3>
                    
                    <div className="flex items-center gap-2 mt-3 text-sm font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                        <Calendar size={14} />
                        <span>{formatDate(form.start_date)} - {formatDate(form.end_date)}</span>
                    </div>

                    <p className="text-white/70 mt-4 mb-6">{form.description}</p>
                    
                    <Link 
                        href={route('register.show', form.id)} 
                        className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-semibold transition"
                    >
                        Daftar Sekarang
                    </Link>
                </div>

                {/* --- Kolom Kanan: Gambar --- */}
                {form.image_url && (
                    <div className="w-full md:w-1/2 aspect-square md:aspect-auto order-1 md:order-2">
                        <img src={form.image_url} alt={form.title} className="w-full h-full object-cover"/>
                    </div>
                )}
            </div>
        </div>
    );
}

