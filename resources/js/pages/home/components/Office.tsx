'use client';

import React, { useEffect } from 'react';
import Particles from '@/components/ui/particle';
import SplashCursor from '@/components/ui/splashcursor';
import Footer from './Footer';
import Meteors from './Meteor';
import Navbar from './Navbar';

const Office: React.FC = () => {
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
    const officeMembers = [
        {
            name: 'Rafli Khalifah Rahman',
            role: 'Kadiv Office',
            image: '/foto_office/1.png',
            bio: 'Coordinates all projects, specializing in advanced data reporting with Excel and project timelines in PowerPoint.',
        },
        {
            name: 'Ela Feriana',
            role: 'Anggota',
            image: '/foto_office/2.png',
            bio: 'Expert in crafting professional documents, proposals, and reports using Microsoft Word.',
        },
        {
            name: 'Jihan Galuh Putri',
            role: 'Anggota',
            image: '/foto_office/3.png',
            bio: 'Designs compelling and visually engaging presentations with Microsoft PowerPoint.',
        },
        {
            name: 'Nurul Qona`ah Salsabilla',
            role: 'Anggota',
            image: '/foto_office/4.png',
            bio: 'Focuses on data analysis and visualization using complex formulas and pivot tables in Excel.',
        },
        {
            name: 'Fina Nazilatul Falah',
            role: 'Anggota',
            image: '/foto_office/5.png',
            bio: 'Handles document formatting, mail merge operations, and template creation in Word.',
        },
        {
            name: 'Dina Nuril Azkiya',
            role: 'Anggota',
            image: '/foto_office/6.png',
            bio: 'Creates dynamic dashboards and financial models using Microsoft Excel.',
        },
        {
            name: 'Alia Novi Safitri',
            role: 'Anggota',
            image: '/foto_office/7.png',
            bio: 'Develops informative and persuasive slide decks for seminars and workshops.',
        },
        {
            name: 'Grachika Ajwa Marganezha Caesar Setyo Budi',
            role: 'Anggota',
            image: '/foto_office/8.png',
            bio: 'Manages administrative data and ensures accuracy across all Office suite documents.',
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
            <section id="office-team" className="bg-star-dark relative min-h-screen overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-28 text-center">
                        <h2 className="reveal mb-4 text-3xl font-bold sm:text-4xl">
                            DIVISI <span className="text-gradient">OFFICE</span>
                        </h2>
                        <p className="reveal mx-auto max-w-2xl text-gray-400">Masters of productivity, ensuring professional documentation and presentation.</p>
                    </div>

                    <div className="flex justify-center">
                        <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-24 md:grid-cols-2">
                            {officeMembers.map(renderMemberCard)}
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

export default Office;