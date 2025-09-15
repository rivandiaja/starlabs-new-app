'use client';

import React, { useEffect } from 'react';
import Particles from '@/components/ui/particle';
import SplashCursor from '@/components/ui/splashcursor';
import Footer from './Footer';
import Meteors from './Meteor';
import Navbar from './Navbar';

const Pemrograman: React.FC = () => {
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
    const pemrogramanMembers = [
        {
            name: 'Zainul Mutawakil',
            role: 'Kadiv Pemprograman',
            image: '/foto_pemrograman/1.png',
            bio: 'Leads the division with expertise in full-stack development and system architecture.',
        },
        {
            name: 'Muhammad Robit Zainul Haq',
            role: 'Anggota',
            image: '/foto_pemrograman/2.png',
            bio: 'Specializes in front-end development, creating intuitive and responsive user interfaces.',
        },
        {
            name: 'Ahmad Faqih',
            role: 'Anggota',
            image: '/foto_pemrograman/3.png',
            bio: 'Focuses on back-end logic, database management, and API development.',
        },
        {
            name: 'Haji Sobri Iqbal Sutiyono',
            role: 'Anggota',
            image: '/foto_pemrograman/4.png',
            bio: 'Passionate about problem-solving through competitive programming and algorithms.',
        },
        {
            name: 'Dhiane Isya Naa`imah',
            role: 'Anggota',
            image: '/foto_pemrograman/5.png',
            bio: 'A versatile developer skilled in both web and mobile application development.',
        },
        {
            name: 'Zulfa Angelita Huwaida',
            role: 'Anggota',
            image: '/foto_pemrograman/6.png',
            bio: 'Drives innovation by exploring new technologies and software development methodologies.',
        },
    ];

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

    return (
        <>
            <Navbar />
            <section id="pemrograman-team" className="bg-star-dark relative min-h-screen overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-28 text-center">
                        <h2 className="reveal mb-4 text-3xl font-bold sm:text-4xl">
                            DIVISI <span className="text-gradient">PEMROGRAMAN</span>
                        </h2>
                        <p className="reveal mx-auto max-w-2xl text-gray-400">The brilliant minds building the future, one line of code at a time.</p>
                    </div>

                    {/* Pembungkus flex untuk menengahkan grid */}
                    <div className="flex justify-center">
                        {/* Grid diubah untuk menampilkan 2 kolom di layar medium ke atas */}
                        <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-24 md:grid-cols-2">
                            {pemrogramanMembers.map(renderMemberCard)}
                        </div>
                    </div>
                </div>

                <Meteors />
                <Particles className="absolute inset-x-0 top-0 h-full w-full" />
                <SplashCursor />
            </section>
            <Footer />
        </>
    );
};

export default Pemrograman;