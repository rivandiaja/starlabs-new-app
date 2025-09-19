'use client';

import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/pages/home/components/Navbar';
import Footer from '@/pages/home/components/Footer';
import Particles from '@/components/ui/particle';
import Meteors from '@/pages/home/components/Meteor';
import SplashCursor from '@/components/ui/splashcursor';
import { BookOpen, User, Target, Wrench } from 'lucide-react';
import { type Academy, type Division, type Syllabus } from '@/types';

interface Props {
    academy: Academy;
    division: Division;
    syllabuses: Syllabus[];
}

const DivisionSyllabus: React.FC<Props> = ({ academy, division, syllabuses }) => {
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

    const SyllabusCardContent = ({ item }: { item: Syllabus }) => (
        <>
            <p className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2 md:justify-start"><User size={16} />{item.pemateri}</p>
            <h3 className="mb-3 font-bold text-white text-xl">{item.materi_utama}</h3>
            <div className="space-y-4 text-sm text-white/80 text-left">
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 md:justify-start"><BookOpen size={16} /> Sub Materi:</h4>
                    <ul className="list-disc list-inside pl-2 space-y-1">
                        {item.sub_materi.map((sub, i) => <li key={i}>{sub}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 md:justify-start"><Wrench size={16} /> Studi Kasus:</h4>
                    <p>{item.studi_kasus}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 md:justify-start"><Target size={16} /> Tujuan:</h4>
                    <p>{item.tujuan}</p>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Head title={`Silabus: ${division.name}`} />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 text-white sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="container mx-auto text-center pt-24 pb-16">
                    <img src={division.image_path} alt={`Divisi ${division.name}`} className="w-32 h-32 mx-auto mb-4 rounded-none border-none" />
                    <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
                        Divisi {division.name}
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
                        Silabus Pembelajaran untuk {academy.name}
                    </p>
                    <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
                        {division.description}
                    </p>
                </div>

                {/* Syllabus Timeline Section */}
                <div className="container mx-auto max-w-5xl pb-20">
                    <div className="relative">
                        {/* Garis Vertikal */}
                        <div className="absolute left-6 md:left-1/2 w-0.5 h-full bg-gray-700/50 -translate-x-1/2"></div>
                        
                        <div className="relative flex flex-col gap-12">
                            {syllabuses.length > 0 ? syllabuses.map((item, index) => (
                                <div key={item.id} className="flex md:justify-between items-center w-full">
                                    <div className={`hidden md:flex w-5/12 ${index % 2 === 0 ? 'order-3' : 'order-1'}`}></div>
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                                        <h1 className="mx-auto font-bold text-lg text-white">{item.pertemuan}</h1>
                                    </div>
                                    <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${index % 2 === 0 ? 'order-1 md:pr-8' : 'order-3 md:pl-8'}`}>
                                        <div className="glass-card rounded-2xl shadow-xl p-6 reveal">
                                            <SyllabusCardContent item={item} />
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center text-white/70">
                                    <p>Silabus untuk divisi ini belum tersedia.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <Meteors />
                <Particles className="absolute inset-x-0 top-0 h-full w-full -z-10" />
                <SplashCursor />
            </section>
            <Footer />
        </>
    );
};

export default DivisionSyllabus;

