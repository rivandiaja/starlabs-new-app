'use client';

import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './Navbar';
import Footer from './Footer';
import Particles from '../../../components/ui/particle';
import Meteors from './Meteor';
import SplashCursor from '../../../components/ui/splashcursor';
import { motion } from 'framer-motion';

const Academy: React.FC = () => {
    // Efek untuk animasi saat scroll
    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(element => {
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

    const divisions = [
        { name: 'Jaringan', image: '/images/academy/jaringan.png', link: '/academy-jaringan' },
        { name: 'Pemrograman', image: '/images/academy/pemrograman.png', link: '/pemrograman' },
        { name: 'Office', image: '/images/academy/office.png', link: '/office' },
        { name: 'Multimedia', image: '/images/academy/multimedia.png', link: '/multimedia' },
    ];

    return (
        <>
            <Head title="Starlabs Academy" />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 text-white sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24 pb-12">
                    <div className="text-center md:text-left reveal">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                            Welcome to Starlabs Academy!
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-white/80">
                            Where Innovation Meets Technology. Explore, Learn, and Create in the World of Science Technology and Computer Laboratories!
                        </p>
                    </div>
                    <div className="flex justify-center reveal">
                        <img
                            src="/robot.png"
                            alt="Starlabs Robot Mascot"
                            className="w-64 h-auto md:w-96"
                        />
                    </div>
                </div>
                
                {/* Kontainer Bergerak */}
                <div className="flex justify-center items-center gap-5 w-full overflow-hidden relative">
                    {[...Array(10)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="w-[800px] h-[40px] rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                            initial={{ x: "-100vw", opacity: 0 }}
                            animate={{ x: "100vw", opacity: [0, 0.5, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: index * 0.5,
                            }}
                        />
                    ))}
                </div>

                {/* About Section */}
                <div className="py-20 text-center reveal">
                    <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden py-20 border border-white/10 glass-card">
                         <div className="absolute inset-0 bg-[url('/starboy.png')] bg-no-repeat bg-center bg-contain opacity-10"></div>
                         <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-4">Briefly About Starlabs</h3>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto">
                                UKM Starlabs di Universitas Nahdlatul Ulama Al Ghazali (UNUGHA) merupakan salah satu Unit Kegiatan Mahasiswa yang berfokus pada pengembangan teknologi dan inovasi di kalangan mahasiswa. UKM ini berfungsi sebagai wadah bagi para mahasiswa yang memiliki minat dan bakat di bidang teknologi informasi, pemrograman, dan pengembangan aplikasi.
                            </p>
                         </div>
                    </div>
                </div>

                {/* Divisions Section */}
                <div className="py-20 container mx-auto text-center reveal">
                     <div className="mb-12">
                        <h2 className="text-3xl font-bold text-white">STARLABS Divisions</h2>
                        <p className="text-white/70 text-lg mt-2">
                            Memiliki empat Divisi Pembelajaran untuk meningkatkan keterampilan dan pengalaman di dunia IT.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {divisions.map((div, idx) => (
                            <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
                                <img src={div.image} alt={`Divisi ${div.name}`} className="mb-4 h-24 w-24 rounded-none object-cover border-none" />
                                <h3 className="text-xl font-semibold text-white">Divisi <br/> {div.name}</h3>
                                <Link href={div.link} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition-colors text-sm">
                                    Lihat Kelas
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* CTA Section */}
                <div className="text-center py-20 reveal">
                    <h2 className="text-3xl font-bold mb-4">What Are You Waiting For?</h2>
                    <p className="text-lg text-white/70 mb-8">Jadilah bagian dari komunitas teknologi kami.</p>
                    <Link href="#contact" className="bg-gradient-to-r from-star-light to-blue-500 text-star-dark font-bold py-3 px-8 rounded-full transition hover:scale-105">
                        Join Now
                    </Link>
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

