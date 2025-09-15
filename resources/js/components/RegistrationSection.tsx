'use client';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { type RegistrationForm } from '@/types';

// Tipe data untuk state form
type FormData = {
    name: string;
    email: string;
    gender: string;
    division: string;
    nim: string;
    major: string;
    whatsapp: string;
    agreement: boolean;
};

// Komponen untuk menampilkan notifikasi
const Alert: React.FC<{ type: 'success' | 'danger'; message: string; onClose: () => void }> = ({ type, message, onClose }) => {
    if (!message) return null;
    const typeClasses = type === 'success' ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700";
    return (
        <div className={`p-4 mb-4 rounded-lg flex justify-between items-center border ${typeClasses}`} role="alert">
            <span>{message}</span>
            <button type="button" className="ml-4 font-bold" aria-label="Close" onClick={onClose}>&times;</button>
        </div>
    );
};

export default function RegistrationSection({ form }: { form: RegistrationForm }) {
    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm<FormData>({
        name: '', email: '', gender: '', division: '', nim: '', major: '', whatsapp: '', agreement: false,
    });
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // TODO: Ganti dengan rute backend yang sesuai untuk menyimpan pendaftaran
        // post(route('registrations.store'), { ... }); 
        console.log("Data Pendaftaran:", data);
        // Simulasi sukses untuk demo
        if (!processing) {
            reset();
        }
    };

    // Fungsi helper untuk menangani perubahan input
    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setData(field, value as never);
    };

    return (
        <section id="registration-form" className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <div 
                    className="relative max-w-4xl mx-auto rounded-2xl bg-cover bg-center overflow-hidden shadow-2xl"
                    style={{ backgroundImage: `url('https://placehold.co/900x600/021334/FFFFFF?text=Background')` }}
                >
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-80 z-0"></div>
                    <div className="relative z-10 p-6 sm:p-10">
                        <div className="text-center mb-8">
                            <h1 className="text-white text-3xl md:text-4xl font-bold">{form.title}</h1>
                            <p className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                Pendaftaran Telah Dibuka!
                            </p>
                        </div>
                        
                        {wasSuccessful && <Alert type="success" message="Pendaftaran berhasil!" onClose={() => {}} />}

                        <form onSubmit={submit} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {form.fields.map(field => (
                                    <div key={field} className={field === 'whatsapp' ? 'md:col-span-2' : ''}>
                                        <label htmlFor={field} className="block text-white font-medium mb-2 capitalize">{field.replace('_', ' ')}</label>
                                        <input 
                                            type="text" id={field}
                                            value={data[field as keyof FormData] as string}
                                            onChange={e => handleInputChange(field as keyof FormData, e.target.value)}
                                            className={`w-full p-3 bg-gray-700 text-white rounded-lg border ${errors[field as keyof FormData] ? 'border-red-500' : 'border-gray-600'}`}
                                        />
                                    </div>
                                ))}

                                <div className="md:col-span-2 flex items-start space-x-3">
                                    <input type="checkbox" id="agreement" checked={data.agreement} onChange={(e) => handleInputChange('agreement', e.target.checked)} className={`mt-1 h-5 w-5 rounded border-gray-500 bg-gray-700`}/>
                                    <div>
                                        <label htmlFor="agreement" className="text-gray-300 text-sm">
                                            Dengan mendaftar, Saya bersedia mengikuti seluruh kegiatan, aturan, dan ketentuan yang berlaku.
                                        </label>
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
    );
}

