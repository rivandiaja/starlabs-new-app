import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { type Event } from '@/types';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import Particles from '@/components/ui/particle';
import Meteors from '../home/components/Meteor';
import SplashCursor from '@/components/ui/splashcursor';
import { CalendarDays, MapPin, Tag } from 'lucide-react';

const ShowEvent: React.FC<{ event: Event }> = ({ event }) => {

    const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <>
            <Head title={event.title} />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 py-24 sm:py-32 text-white">
                
                {/* 1. Kontainer diperlebar menjadi max-w-7xl */}
                <div className="relative z-10 mx-auto max-w-7xl rounded-2xl bg-white/5 p-6 sm:p-8 md:p-12 backdrop-blur-md border border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* --- Kolom Kiri: Gambar Poster --- */}
                        {/* 2. 'aspect-[3/4]' dihapus agar tinggi bisa fleksibel */}
                        <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                            <img 
                                src={event.image_url} 
                                alt={event.title} 
                                className="w-full h-full object-cover" 
                            />
                        </div>

                        {/* --- Kolom Kanan: Detail Informasi --- */}
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gradient mb-4">{event.title}</h1>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center flex-wrap gap-4 sm:gap-6 text-white/70 my-6 py-4 border-y border-white/10">
                                <div className="flex items-center">
                                    <CalendarDays className="w-5 h-5 mr-3 text-star-light flex-shrink-0"/>
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-3 text-star-light flex-shrink-0"/>
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <Tag className="w-5 h-5 mr-3 text-star-light flex-shrink-0"/>
                                    <span>{event.tag || 'Umum'}</span>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none text-white/90">
                                <p>{event.description}</p>
                            </div>

                            <div className="mt-auto pt-8">
                                <Link href="/" className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                                    &larr; Kembali ke Home
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Efek Latar Belakang & Kursor */}
                <Meteors />
                <Particles className="absolute inset-x-0 top-0 h-full w-full" />
                <SplashCursor />

            </section>
            <Footer />
        </>
    );
};

export default ShowEvent;