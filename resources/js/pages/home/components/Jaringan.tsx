'use client';

import React, { useEffect, useState } from 'react';
import Particles from '@/components/ui/particle';
import SplashCursor from '@/components/ui/splashcursor';
import Footer from './Footer';
import Meteors from './Meteor';
import Navbar from './Navbar';
import { c } from 'node_modules/framer-motion/dist/types.d-Cjd591yU';

const Jaringan: React.FC = () => {
    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll('.reveal');

            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementBottom = reveals[i].getBoundingClientRect().bottom;
                const elementVisible = 50;

                if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
                    reveals[i].classList.add('active');
                } else {
                    reveals[i].classList.remove('active');
                }
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const jaringanMembers = [
        {
            name: 'Faizal Sejati',
            role: 'Kadiv Jaringan',
            image: '/foto_jaringan/1.png',
            bio: 'Manages network infrastructure and cybersecurity strategies.',
        },
        {
            name: 'Mohammad Alwan Abbas Abdillah',
            role: 'Anggota',
            image: '/foto_jaringan/2.png',
            bio: 'Specializes in server administration and cloud infrastructure.',
        },
        {
            name: 'Ersa Kinanti Aprillia',
            role: 'Anggota',
            image: '/foto_jaringan/3.png',
            bio: 'Focuses on network protocol analysis and troubleshooting.',
        },
        {
            name: 'Nia Amelia',
            role: 'Anggota',
            image: '/foto_jaringan/4.png',
            bio: 'Expert in configuring routers, switches, and firewalls.',
        },
        {
            name: 'Emalia Nurhayati',
            role: 'Anggota',
            image: '/foto_jaringan/5.png',
            bio: 'Monitors network performance and ensures system uptime.',
        },
    ];

    // 1. Logika pembagian data disesuaikan untuk 5 anggota (1-2-2)
    const kadiv = jaringanMembers.slice(0, 1);
    const barisDua = jaringanMembers.slice(1, 3);
    const barisTiga = jaringanMembers.slice(3, 5);

    // Fungsi untuk me-render kartu anggota, agar tidak mengulang kode
    const renderMemberCard = (member: any, idx: number) => (
        <div
            key={idx}
            className="reveal group hover:shadow-star-light/10 relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
            <img
                src={member.image}
                alt={member.name}
                className="absolute -top-20 left-1/2 h-40 w-auto -translate-x-1/2 [filter:drop-shadow(0_10px_8px_rgba(56,189,248,0.2))] transition-all duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_20px_15px_rgba(56,189,248,0.3))]"
            />
            <div className="mt-16 flex-grow">
                <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                <p className="text-star-light mb-2 font-medium">{member.role}</p>
                <p className="text-sm text-gray-400">{member.bio}</p>
            </div>
        </div>
    );

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            <Navbar />
            <section id="jaringan-team" className="bg-star-dark relative min-h-screen overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-28 text-center">
                        <h2 className="reveal mb-4 text-3xl font-bold sm:text-4xl">
                            DIVISI <span className="text-gradient">JARINGAN</span>
                        </h2>
                        <p className="reveal mx-auto max-w-2xl text-gray-400">Connecting the world, ensuring stable and secure network infrastructure.</p>
                    </div>

                    <div className="flex flex-col items-center space-y-24">
                        {/* Baris Pertama: 1 Anggota (Kadiv) */}
                        <div className="w-full max-w-xs sm:max-w-sm">
                            {kadiv.map(renderMemberCard)}
                        </div>

                        {/* Baris Kedua: 2 Anggota */}
                        <div className="grid w-full max-w-4xl grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2">
                            {barisDua.map(renderMemberCard)}
                        </div>

                        {/* Baris Ketiga: 2 Anggota */}
                        <div className="grid w-full max-w-4xl grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2">
                            {barisTiga.map(renderMemberCard)}
                        </div>
                    </div>
                </div>
                <>
                    <Meteors />
                    <Particles className="absolute inset-x-0 top-0 h-full w-full" />
                </>
                {isDesktop && (
                    <>
                        <SplashCursor />
                    </>
                )}
            </section>
            <Footer />
        </>
    );
};

export default Jaringan;