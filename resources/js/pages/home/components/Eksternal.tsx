'use client';

import React, { useEffect } from 'react';
import Particles from '@/components/ui/particle';
import SplashCursor from '@/components/ui/splashcursor';
import Footer from './Footer';
import Meteors from './Meteor';
import Navbar from './Navbar';

const Eksternal: React.FC = () => {
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

    const eksternalMembers = [
        {
            name: 'Ghani Arif Baehaqi',
            role: 'Kadiv Eksternal',
            image: '/foto_eksternal/1.png',
            bio: "Leads external relations and forges strategic partnerships to elevate the organization's presence.",
        },
        {
            name: 'Ian Alfian Fadhillah',
            role: 'Anggota',
            image: '/foto_eksternal/2.png',
            bio: 'Manages relationships with key stakeholders and industry partners.',
        },
        {
            name: 'Aditya Deva Pradita',
            role: 'Anggota',
            image: '/foto_eksternal/3.png',
            bio: 'Specializes in outreach programs and seeks new collaboration opportunities.',
        },
        {
            name: 'Iskandar Rafi Sugiarto',
            role: 'Anggota',
            image: '/foto_eksternal/4.png',
            bio: 'Acts as a liaison for external events, sponsorships, and guest lectures.',
        },
        {
            name: 'Haza Ayu Nurragil',
            role: 'Anggota',
            image: '/foto_eksternal/5.png',
            bio: 'Develops communication strategies to bridge the gap with the outside world.',
        },
        {
            name: 'Hasna Kamalia Hakim',
            role: 'Anggota',
            image: '/foto_eksternal/6.png',
            bio: 'Handles public relations and media inquiries to build a positive public image.',
        },
        {
            name: 'Muhammad Farid Donovant',
            role: 'Anggota',
            image: '/foto_eksternal/7.png',
            bio: 'Coordinates collaborative projects with other organizations and communities.',
        },
        {
            name: 'Trio Putra Kusuma',
            role: 'Anggota',
            image: '/foto_eksternal/8.png',
            bio: 'Researches potential partners and maintains a network of external contacts.',
        },
    ];

    const renderMemberCard = (member: any, idx: number) => (
        <div
            key={idx}
            className="reveal group hover:shadow-star-light/10 relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-0 translate-y-8"
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
            <section
                id="eksternal-team"
                className="bg-star-dark relative min-h-screen overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-28 text-center">
                        <h2 className="reveal mb-4 text-3xl font-bold sm:text-4xl">
                            DEPARTEMEN <span className="text-gradient">EKSTERNAL</span>
                        </h2>
                        <p className="reveal mx-auto max-w-2xl text-gray-400">
                            Building bridges, fostering partnerships, and connecting our organization to the world.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-24 md:grid-cols-2">
                            {eksternalMembers.map(renderMemberCard)}
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

export default Eksternal;
