// @ts-nocheck
import { Head, Link, useForm } from '@inertiajs/react';
import { type RegistrationForm } from '@/types';
import React, { FormEventHandler, useEffect } from 'react';
import Navbar from '@/Pages/home/components/Navbar';
import Footer from '@/Pages/home/components/Footer';
import SplashCursor from '@/components/ui/splashcursor';
import Meteors from '@/Pages/home/components/Meteor';

// Komponen Alert
const Alert: React.FC<{ type: 'success' | 'danger'; message: string; }> = ({ type, message }) => {
    if (!message) return null;
    const typeClasses = type === 'success' ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700";
    return (
        <div className={`p-4 mb-4 rounded-lg flex justify-between items-center border ${typeClasses}`} role="alert">
            <span>{message}</span>
        </div>
    );
};

// Tipe data untuk state formulir dinamis
type FormData = {
    [key: string]: string | boolean;
    agreement: boolean;
};

// Helper function untuk format tanggal
const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

export default function PublicRegistrationForm({ form, success }: { form: RegistrationForm, success: string | null }) {
    
    const generateInitialData = (): FormData => {
        const initialData: FormData = { agreement: false };
        form.fields.forEach(field => {
            initialData[field] = '';
        });
        return initialData;
    };

    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm<FormData>(generateInitialData());

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register.store', form.id), {
             onSuccess: () => reset(),
             preserveScroll: true,
        });
    };

    // Fungsi helper untuk merender input form secara dinamis
    const renderField = (field: string) => {
        let label = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        if (field === 'major') { label = 'Prodi'; }
        if (field === 'nim') { label = 'NIM'; }
        if (field === 'gender') { label = 'Jenis Kelamin'; }
        if (field === 'division') { label = 'Pilihan Divisi'; }
        if (field === 'name') { label = 'Nama Lengkap'; }

        if (field === 'gender') {
            return (
                <div key={field}>
                    <label htmlFor={field} className="block text-white font-medium mb-2">{label}</label>
                    <select id={field} value={data[field] as string} onChange={e => setData(field, e.target.value)} className={`w-full p-3 bg-gray-700 text-white rounded-lg border ${errors[field] ? 'border-red-500' : 'border-gray-600'}`}>
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                    {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
                </div>
            );
        }
        
        if (field === 'division') {
             return (
                <div key={field}>
                    <label htmlFor={field} className="block text-white font-medium mb-2">{label}</label>
                    <select id={field} value={data[field] as string} onChange={e => setData(field, e.target.value)} className={`w-full p-3 bg-gray-700 text-white rounded-lg border ${errors[field] ? 'border-red-500' : 'border-gray-600'}`}>
                        <option value="">Pilih Divisi</option>
                        <option value="Pemrograman">Pemrograman</option>
                        <option value="Jaringan">Jaringan</option>
                        <option value="Office">Office</option>
                        <option value="Multimedia">Multimedia</option>
                    </select>
                    {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
                </div>
            );
        }

        return (
            <div key={field} className={field === 'whatsapp' ? 'md:col-span-2' : ''}>
                <label htmlFor={field} className="block text-white font-medium mb-2">{label}</label>
                <input 
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    placeholder={`Masukkan ${label.toLowerCase()}`}
                    value={data[field] as string}
                    onChange={(e) => setData(field, e.target.value)}
                    className={`w-full p-3 bg-gray-700 text-white rounded-lg border ${errors[field] ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
            </div>
        );
    };

    const benefitIcons = {
        SKILL: '/images/icons/skill.png',
        TRAIN: '/images/icons/training.png',
        ACADEMIC: '/images/icons/academic.png',
        NETWORK: '/images/icons/network.png',
    };

    return (
        <>
            <Head title={form.title} />
            <Navbar />
            <div className="bg-star-dark font-sans relative text-white">
                <div className="container mx-auto px-4 md:px-8">
                    <header className="flex flex-col md:flex-row justify-between items-center pt-24 pb-12">
                        <div className="md:w-3/5 text-center md:text-left mb-8 md:mb-0">
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight whitespace-pre-wrap">
                                {form.title.replace(/<br\s*\/?>/gi, '\n')}
                            </h1>
                            <p className="mt-4 text-xl text-gray-300 font-semibold">
                                {formatDate(form.start_date)} - {formatDate(form.end_date)}
                            </p>
                            <p className="mt-6 text-lg text-gray-400 whitespace-pre-wrap">{form.description}</p>
                        </div>
                        <div className="md:w-2/5 flex justify-center p-4">
                            <img src={form.image_url || "/images/orang.png"} alt="STARLABS Logo" className="w-64 md:w-80" />
                        </div>
                    </header>

                    {form.show_benefits && (
                        <section className="benefits-section py-12">
                            <h2 className="text-3xl font-bold text-white mb-12 text-center">Benefit yang kamu dapatkan dari STARLABS</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { icon: 'SKILL', text: 'Pengembangan Skill di Bidang Teknologi' },
                                    { icon: 'TRAIN', text: 'Akses ke Pelatihan & Proyek Nyata' },
                                    { icon: 'ACADEMIC', text: 'Dukungan Akademik dan Belajar Bersama' },
                                    { icon: 'NETWORK', text: 'Menambah Relasi di Kampus' }
                                ].map((benefit, index) => (
                                    <div key={index} className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 rounded-xl shadow-lg text-center text-white transform hover:-translate-y-2 transition-transform duration-300">
                                        <img src={benefitIcons[benefit.icon]} alt={`${benefit.icon} Icon`} className="w-16 h-16 mx-auto mb-4" />
                                        <p className="font-semibold">{benefit.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <section id="registration-page" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="relative max-w-4xl mx-auto rounded-2xl bg-cover bg-center overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gray-900 bg-opacity-80 z-0"></div>
                            <div className="relative z-10 p-6 sm:p-10">
                                <div className="text-center mb-8">
                                    <h1 className="text-white text-3xl md:text-4xl font-bold">Formulir Pendaftaran</h1>
                                </div>

                                {wasSuccessful && <Alert type="success" message="Pendaftaran berhasil! Terima kasih telah bergabung." />}
                                
                                <form onSubmit={submit} noValidate>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {form.fields.map(field => renderField(field))}
                                        <div className="md:col-span-2 flex items-start space-x-3">
                                            <input type="checkbox" id="agreement" checked={data.agreement} onChange={(e) => setData('agreement', e.target.checked)} className={`mt-1 h-5 w-5 rounded border-gray-500 bg-gray-700 text-blue-500 focus:ring-blue-500 ${errors.agreement ? 'border-red-500' : 'border-gray-600'}`}/>
                                            <div>
                                                <label htmlFor="agreement" className="text-gray-300 text-sm">Dengan mendaftar, Saya bersedia mengikuti seluruh kegiatan, aturan, dan ketentuan yang berlaku.</label>
                                                {errors.agreement && <p className="text-red-400 text-xs mt-1">{errors.agreement}</p>}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 text-center mt-4">
                                            <button type="submit" disabled={processing} className="w-full md:w-auto inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-12 rounded-lg hover:opacity-90 transition disabled:opacity-50">
                                                {processing ? 'Mengirim...' : 'Kirim Pendaftaran'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <Meteors /> */}
                <SplashCursor />
            </div>
            <Footer />
        </>
    );
}

