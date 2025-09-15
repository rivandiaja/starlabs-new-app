'use client';

import React, { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Send } from 'lucide-react';

// -- Komponen Kartu Info Kontak --
const ContactInfoCard = () => (
    <div className="glass-card rounded-2xl p-8 space-y-6 h-full">
        <h3 className="text-2xl font-bold">Contact Information</h3>
        {[
            {
                title: 'Address',
                value: 'Jl. Kemerdekaan Barat 53274 Kecamatan Kesugihan Jawa Tengah',
                icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
            },
            {
                title: 'Email',
                value: 'starlalbs@unugha.id',
                icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            },
            {
                title: 'Phone',
                value: '+62895324455581',
                icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
            },
        ].map((item, idx) => (
            <div key={idx} className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-star-light to-blue-500 flex items-center justify-center mr-4 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-star-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                </div>
                <div>
                    <h4 className="text-lg font-medium text-star-light mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.value}</p>
                </div>
            </div>
        ))}
    </div>
);

// --- Komponen Kartu Formulir ---
const ContactFormCard = () => {
    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="glass-card rounded-2xl p-8 h-full">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

            {wasSuccessful && (
                <div className="mb-4 p-3 rounded-md bg-green-500/20 text-green-300 text-sm">
                    Pesan Anda telah berhasil terkirim. Terima kasih!
                </div>
            )}
            
            <form className="space-y-6" onSubmit={submit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="input-glass w-full" 
                        placeholder="Your Name" 
                        required
                    />
                    {errors.name && <div className="text-red-400 text-xs mt-1">{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="input-glass w-full" 
                        placeholder="your@email.com" 
                        required
                    />
                    {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea 
                        id="message" 
                        rows={4} 
                        value={data.message}
                        onChange={e => setData('message', e.target.value)}
                        className="input-glass w-full" 
                        placeholder="Your message..."
                        required
                    ></textarea>
                    {errors.message && <div className="text-red-400 text-xs mt-1">{errors.message}</div>}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-6 py-3 bg-gradient-to-r from-star-light to-blue-500 text-star-dark font-medium rounded-lg hover:shadow-lg hover:scale-105 hover:text-white transition-all duration-300 ease-in-out disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                >
                    <Send size={18} />
                    {processing ? 'Mengirim...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-blue to-star-dark text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in <span className="text-gradient">Touch</span></h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-star-light to-blue-500 mx-auto"></div>
                    <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
                        Have questions or interested in collaborating with us? Reach out to our team.
                    </p>
                </div>

                <div className="hidden md:grid md:grid-cols-2 gap-12">
                    <ContactInfoCard />
                    <ContactFormCard />
                </div>

                <div className="md:hidden">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="pb-10"
                    >
                        <SwiperSlide><ContactInfoCard /></SwiperSlide>
                        <SwiperSlide><ContactFormCard /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Contact;