'use client';

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { type Event } from '@/types';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import Particles from '@/components/ui/particle';
import Meteors from '../home/components/Meteor';
import SplashCursor from '@/components/ui/splashcursor';
import { CalendarDays } from 'lucide-react';

// --- Komponen Kartu Event (dapat digunakan kembali) ---
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group text-left">
            <div className="aspect-[3/4] w-full overflow-hidden">
                <img src={event.image_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm text-neutral-400">{event.tag || 'EVENT'}</span>
                <h3 className="text-xl font-semibold mt-2">{event.title}</h3>
                <div className="flex items-center text-sm text-neutral-300 mt-2 mb-4">
                    <CalendarDays className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{formattedDate}</span>
                </div>
                <Link href={route('events.show', event.id)} className="mt-auto self-start bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300">
                    Selengkapnya
                </Link>
            </div>
        </div>
    );
};


// --- Komponen Halaman Utama Arsip Event ---
const EventsArchive: React.FC<{ events: Event[] }> = ({ events }) => {
    return (
        <>
            <Head title="All Events" />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 py-24 sm:py-32 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                            All Events
                        </h2>
                        <p className="mx-auto max-w-2xl text-gray-400">Jelajahi semua kegiatan dan event menarik dari kami.</p>
                    </div>

                    {events.length > 0 ? (
                        // Menggunakan flexbox untuk membuat item rata tengah saat wrapping
                        <div className="flex flex-wrap justify-center -mx-4">
                            {events.map(event => (
                                <div key={event.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-12">
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">Belum ada event untuk ditampilkan.</p>
                    )}
                </div>

                <Meteors />
                <Particles className="absolute inset-x-0 top-0 h-full w-full" />
                <SplashCursor />
            </section>
            <Footer />
        </>
    );
};

export default EventsArchive;

