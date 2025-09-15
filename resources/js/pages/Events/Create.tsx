import React, { useRef, FormEventHandler } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CameraIcon, Calendar, LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

// Komponen CSS untuk input form sederhana (border hitam saja)
const CustomInputStyles = () => (
    <style>{`
        .hide-native-icon::-webkit-calendar-picker-indicator {
            display: none;
            -webkit-appearance: none;
        }
        .input-form {
            border: 1px solid black; /* Border hitam */
            background: white;       /* Background putih */
            color: black;            /* Teks hitam */
            padding: 0.5rem 0.75rem;
            border-radius: 0.5rem; /* Rounded corners */
            width: 100%;
        }
        .input-form:focus {
            outline: none;
            border-color: black; /* Tetap border hitam saat fokus */
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4); /* Efek glow biru saat fokus */
        }
    `}</style>
);

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Events', href: route('events.index') },
    { title: 'Add Event', href: route('events.create') },
];

const CreateEvent: React.FC = () => {
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        description: '',
        date: '',
        location: '',
        tag: '',
        image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);
    
    const imagePreview = data.image 
        ? URL.createObjectURL(data.image) 
        : "https://placehold.co/600x800/E5E7EB/4B5563?text=Poster+3:4";

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setData('image', e.target.files[0]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('events.store'));
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Event" />
            <CustomInputStyles />
            <div className="p-4 sm:p-6">
                {/* --- PERBAIKAN: Kontainer utama kembali menggunakan glass-card --- */}
                <form onSubmit={submit} className="glass-card max-w-6xl mx-auto p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-8">Tambah Event Baru</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        
                        {/* --- Kolom Kiri: Form Input --- */}
                        <div className="flex flex-col space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-white/80 mb-1">Judul Event</label>
                                <input id="title" type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="input-form" required />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-white/80 mb-1">Deskripsi</label>
                                <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className="input-form min-h-[120px]" required />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-semibold text-white/80 mb-1">Tanggal</label>
                                    <div className="relative">
                                        <input 
                                            id="date" 
                                            ref={dateInputRef}
                                            type="date" 
                                            value={data.date} 
                                            onChange={e => setData('date', e.target.value)} 
                                            className="input-form pr-10 hide-native-icon" 
                                            required
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => dateInputRef.current?.showPicker()}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            <Calendar size={18} />
                                        </button>
                                    </div>
                                    <InputError message={errors.date} className="mt-2" />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-semibold text-white/80 mb-1">Lokasi</label>
                                    <input id="location" type="text" value={data.location} onChange={e => setData('location', e.target.value)} className="input-form" required/>
                                    <InputError message={errors.location} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="tag" className="block text-sm font-semibold text-white/80 mb-1">Tag (Contoh: Webinar, Workshop)</label>
                                <input id="tag" type="text" value={data.tag} onChange={e => setData('tag', e.target.value)} className="input-form"/>
                                <InputError message={errors.tag} className="mt-2" />
                            </div>
                        </div>

                        {/* --- Kolom Kanan: Pratinjau Poster --- */}
                        <div className="flex flex-col">
                            <label className="block text-sm font-semibold text-white/80 mb-1">Poster Event</label>
                            <div className="relative w-full aspect-[3/4] rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden bg-black/20">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg z-10 transition">
                                    <CameraIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                            <InputError message={errors.image} className="mt-2" />
                        </div>
                    </div>
                    
                    <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-end gap-4">
                        <Link href={route('events.index')} className="font-semibold text-white/80 transition hover:text-white">
                            Batal
                        </Link>
                        <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2">
                            {processing && <LoaderCircle size={16} className="animate-spin" />}
                            {processing ? 'Menyimpan...' : 'Buat Event'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default CreateEvent;

