import { type RegistrationForm } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, X } from 'lucide-react';

interface Props {
    form: RegistrationForm;
    onClose: () => void;
}

// Helper function untuk format tanggal
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export default function AdPopupModal({ form, onClose }: Props) {
    return (
        <div className="fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
            <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-lg backdrop-blur-lg md:flex-row">
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 rounded-full bg-black/50 p-1.5 text-white/80 transition hover:bg-black/70"
                    aria-label="Tutup Iklan"
                >
                    <X size={20} />
                </button>

                {/* --- Kolom Kiri: Teks dan Tombol --- */}
                <div className="order-2 flex w-full flex-col items-center justify-center p-5 text-center sm:p-6 md:order-1 md:w-1/2 md:items-start md:p-8 md:text-left">
                    <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">{form.title}</h3>

                    <div className="mt-3 flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 sm:text-sm">
                        <Calendar size={14} />
                        <span>
                            {formatDate(form.start_date)} - {formatDate(form.end_date)}
                        </span>
                    </div>

                    <p className="mt-4 mb-6 text-sm text-white/70 sm:text-base">{form.description}</p>

                    <Link
                        href={route('register.show', form.id)}
                        className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-8 sm:py-3 sm:text-base"
                    >
                        Daftar Sekarang
                    </Link>
                </div>

                {/* --- Kolom Kanan: Gambar --- */}
                {form.image_url && (
                    <div className="order-1 flex w-full md:order-2 md:w-1/2">
                        <img src={form.image_url} alt={form.title} className="h-full w-full object-cover object-center" />
                    </div>
                )}
            </div>
        </div>
    );
}
