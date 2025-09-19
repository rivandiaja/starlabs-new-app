'use client';

import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Particles from '../../../components/ui/particle'; // Perbaikan path
import SplashCursor from '../../../components/ui/splashcursor'; // Perbaikan path
import { type Academy, type Division } from '../../../types'; // Perbaikan path
import Footer from './Footer';
import Meteors from './Meteor';
import Navbar from './Navbar';

// Definisikan props yang diterima dari HomeController
interface Props {
    activeAcademy: Academy | null; // Bisa jadi null jika tidak ada akademi yang aktif
    divisions: Division[];
}

const Academy: React.FC<Props> = ({ activeAcademy, divisions }) => {
    // Efek untuk animasi saat scroll
    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach((element) => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Starlabs Academy" />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 text-white sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="container mx-auto grid grid-cols-1 items-center gap-8 pt-24 pb-12 md:grid-cols-2">
                    <div className="reveal text-center md:text-left">
                        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                            Welcome to <br />
                            {activeAcademy?.name ?activeAcademy.name:"Our Academy"} !
                        </h1>
                        <p className="mt-4 text-lg text-white/80 sm:text-xl">
                            Where Innovation Meets Technology. Explore, Learn, and Create in the World of Science Technology and Computer
                            Laboratories!
                        </p>
                    </div>
                    <div className="reveal flex justify-center">
                        <img src="/robot.png" alt="Starlabs Robot Mascot" className="h-auto w-64 md:w-96" />
                    </div>
                </div>

                {/* Kontainer Bergerak */}
                <div className="relative flex w-full items-center justify-center gap-5 overflow-hidden">
                    {[...Array(10)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="h-[40px] w-[800px] rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                            initial={{ x: '-100vw', opacity: 0 }}
                            animate={{ x: '100vw', opacity: [0, 0.5, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: index * 0.5,
                            }}
                        />
                    ))}
                </div>

                {/* About Section */}
                <div className="reveal py-20 text-center">
                    <div className="glass-card relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 py-20">
                        <div className="absolute inset-0 bg-[url('/starboy.png')] bg-contain bg-center bg-no-repeat opacity-10"></div>
                        <div className="relative z-10">
                            <h3 className="mb-4 text-3xl font-bold">Briefly About Starlabs</h3>
                            <p className="mx-auto max-w-3xl text-lg text-white/80">
                                UKM Starlabs di Universitas Nahdlatul Ulama Al Ghazali (UNUGHA) merupakan salah satu Unit Kegiatan Mahasiswa yang
                                berfokus pada pengembangan teknologi dan inovasi di kalangan mahasiswa. UKM ini berfungsi sebagai wadah bagi para
                                mahasiswa yang memiliki minat dan bakat di bidang teknologi informasi, pemrograman, dan pengembangan aplikasi.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divisions Section */}
                <div className="reveal container mx-auto py-20 text-center">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-white">STARLABS Divisions</h2>
                        <p className="mt-2 text-lg text-white/70">
                            Memiliki empat Divisi Pembelajaran untuk meningkatkan keterampilan dan pengalaman di dunia IT.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {divisions.map((div) => (
                            <div
                                key={div.id}
                                className="glass-card flex flex-col items-center rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-2"
                            >
                                <img
                                    src={div.image_path}
                                    alt={`Divisi ${div.name}`}
                                    className="mb-4 h-24 w-24 rounded-none border-none object-cover"
                                />
                                <h3 className="text-xl font-semibold text-white">
                                    Divisi <br /> {div.name}
                                </h3>

                                {activeAcademy ? (
                                    <Link
                                        href={route('academy.division.show', { academy: activeAcademy.id, division: div.slug })}
                                        className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                                    >
                                        Lihat Kelas
                                    </Link>
                                ) : (
                                    <span className="mt-4 cursor-not-allowed rounded-full bg-gray-600 px-5 py-2 text-sm font-bold text-white/50">
                                        Kelas Belum Tersedia
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="reveal py-20 text-center">
                    <h2 className="mb-4 text-3xl font-bold">What Are You Waiting For?</h2>
                    <p className="mb-8 text-lg text-white/70">Jadilah bagian dari komunitas teknologi kami.</p>

                    {/* --- PERBAIKAN: Tombol sekarang dinamis --- */}
                    {activeAcademy && activeAcademy.registration_link ? (
                        <Link
                            href={activeAcademy.registration_link}
                            className="from-star-light text-star-dark rounded-full bg-gradient-to-r to-blue-500 px-8 py-3 font-bold transition hover:scale-105"
                        >
                            Join Now
                        </Link>
                    ) : (
                        <span className="cursor-not-allowed rounded-full bg-gray-600 px-8 py-3 font-bold text-white/50">
                            Pendaftaran Belum Dibuka
                        </span>
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

export default Academy;
