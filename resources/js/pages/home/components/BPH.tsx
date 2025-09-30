'use client';

import Particles from '@/components/ui/particle';
import SplashCursor from '@/components/ui/splashcursor';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Meteors from './Meteor';
import Navbar from './Navbar';

const BPH: React.FC = () => {
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

        handleScroll(); // trigger once on load
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const bphMembers = [
        {
            name: 'Muhammad Ariv Rivandi',
            role: 'Ketua Umum',
            image: '/foto_bph/1.png',
            bio: 'Tech leader with a passion for digital innovation and web development.',
        },
        {
            name: 'Fattatunida Amalia Rahma',
            role: 'Sekretaris 1',
            image: '/foto_bph/2.png',
            bio: 'Manages internal operations and strategy.',
        },
        {
            name: 'Zivana Rodian Saputri',
            role: 'Sekretaris 2',
            image: '/foto_bph/3.png',
            bio: 'Handles administration and documentation.',
        },
        {
            name: 'Leni Alia Wati',
            role: 'Bendahara 1',
            image: '/foto_bph/4.png',
            bio: 'Manages financial planning and records.',
        },
        {
            name: 'Salma Qoulan Wyadidah',
            role: 'Bendahara 2',
            image: '/foto_bph/5.png',
            bio: 'Manages financial planning and records.',
        },
    ];

    const ketuaUmum = bphMembers.slice(0, 1);
    const wakilDanSekre = bphMembers.slice(1, 3);
    const bendahara = bphMembers.slice(3, 5);

    const renderMemberCard = (member: any, idx: number) => (
        <div
            key={idx}
            className="reveal group hover:shadow-star-light/10 relative flex translate-y-8 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-center opacity-0 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
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
            <section id="bph-team" className="bg-star-dark relative min-h-screen overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-28 text-center">
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                            Badan Pengurus Harian <span className="text-gradient">(BPH)</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-gray-400">Core leadership responsible for guiding STARLABS.</p>
                    </div>

                    <div className="flex flex-col items-center space-y-24">
                        <div className="w-full max-w-xs sm:max-w-sm">{ketuaUmum.map(renderMemberCard)}</div>
                        <div className="grid w-full max-w-4xl grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2">{wakilDanSekre.map(renderMemberCard)}</div>
                        <div className="grid w-full max-w-4xl grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2">{bendahara.map(renderMemberCard)}</div>
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

export default BPH;
