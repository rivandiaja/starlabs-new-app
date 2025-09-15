'use client';

import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Particles from '@/components/ui/particle';
import Meteors from '../Meteor';
import SplashCursor from '@/components/ui/splashcursor';
import { BookOpen, User, Target, Wrench } from 'lucide-react';

// Data silabus yang sudah distrukturkan
const syllabusData = [
    {
        pertemuan: 1,
        pemateri: 'Faizal Sejati',
        materiUtama: 'Fundamental Network: Perkenalan Jaringan.',
        subMateri: ['Pengertian dan Manfaat jaringan komputer', 'Komponen dasar jaringan (NIC, kabel, switch, router)', 'Jenis-jenis jaringan (LAN, WAN, MAN)'],
        studiKasus: 'Mengidentifikasi perangkat jaringan secara langsung',
        tujuan: 'Memahami konsep dasar jaringan komputer.'
    },
    {
        pertemuan: 2,
        pemateri: 'Nia Amelia',
        materiUtama: 'Fundamental Network: Topologi Jaringan.',
        subMateri: ['Pengertian topologi jaringan', 'Jenis topologi (Bus, star, ring, mesh)', 'Kelebihan dan kekurangan masing-masing topologi'],
        studiKasus: 'Menggambar skema topologi jaringan',
        tujuan: 'Menjelaskan dan mengenal bentuk-bentuk topologi jaringan.'
    },
    {
        pertemuan: 3,
        pemateri: 'Ersa Kinanti',
        materiUtama: 'Fundamental Network: Krimping Kabel LAN.',
        subMateri: ['Perbedaan kabel straight dan crossover', 'Urutan warna standar T568A dan T568B'],
        studiKasus: 'Krimping kabel UTP menggunakan tang crimping dan konektor RJ45, serta pengujian koneksi dengan LAN tester',
        tujuan: 'Melatih ketrampilan dalam menyusun kabel jaringan.'
    },
    {
        pertemuan: 4,
        pemateri: 'Lia',
        materiUtama: 'Fundamental Network: Setting Router.',
        subMateri: ['Mengenal antarmuka router', 'Pengaturan IP Address, DHCP, dan SSID'],
        studiKasus: 'Setting router untuk LAN (SSID, password, IP lokal)',
        tujuan: 'Dapat mengkonfigurasi router untuk koneksi internet dasar.'
    },
    {
        pertemuan: 5,
        pemateri: 'Alwan Abbas',
        materiUtama: 'Fundamental Network: Praktik Setup Router.',
        subMateri: ['Dasar sistem voucer dan hotspot', 'Software pendukung (MikroTik)'],
        studiKasus: 'Membuat dan mengelola voucer WiFi',
        tujuan: 'Mengkonfigurasi router dengan fitur hotspot dan voucer.'
    },
];

const Jaringan: React.FC = () => {
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

    const SyllabusCardContent = ({ item }: { item: typeof syllabusData[0] }) => (
        <>
            <p className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2 md:justify-start"><User size={16} />{item.pemateri}</p>
            <h3 className="mb-3 font-bold text-white text-xl">{item.materiUtama}</h3>
            <div className="space-y-4 text-sm text-white/80 text-left">
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 md:justify-start"><BookOpen size={16} /> Sub Materi:</h4>
                    <ul className="list-disc list-inside pl-2 space-y-1">
                        {item.subMateri.map((sub, i) => <li key={i}>{sub}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 md:justify-start"><Wrench size={16} /> Studi Kasus:</h4>
                    <p>{item.studiKasus}</p>
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
            <Head title="Divisi Jaringan" />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 text-white sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="container mx-auto text-center pt-24 pb-16">
                    <img src="/jaringan.png" alt="Divisi Jaringan" className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-blue-500/50" />
                    <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
                        Divisi Jaringan
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
                        Mempelajari dasar-dasar jaringan komputer, mulai dari konsep fundamental, topologi, hingga konfigurasi perangkat secara praktis.
                    </p>
                </div>

                {/* Syllabus Timeline Section */}
                <div className="container mx-auto max-w-5xl pb-20">
                    <div className="relative">
                        {/* Garis Vertikal */}
                        <div className="absolute left-6 md:left-1/2 w-0.5 h-full bg-gray-700/50 -translate-x-1/2"></div>
                        
                        <div className="relative flex flex-col gap-12">
                            {syllabusData.map((item, index) => (
                                <div key={item.pertemuan} className="flex md:justify-between items-center w-full">
                                    {/* Sisi Kiri (Desktop) / Kosong (Mobile) */}
                                    <div className={`hidden md:flex w-5/12 ${index % 2 === 0 ? 'order-3' : 'order-1'}`}></div>

                                    {/* Titik Tengah (Dot) */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                                        <h1 className="mx-auto font-bold text-lg text-white">{item.pertemuan}</h1>
                                    </div>
                                    
                                    {/* Kontainer Kartu */}
                                    <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${index % 2 === 0 ? 'order-1 md:pr-8' : 'order-3 md:pl-8'}`}>
                                        <div className="glass-card rounded-2xl shadow-xl p-6 reveal">
                                            <SyllabusCardContent item={item} />
                                        </div>
                                    </div>
                                </div>
                            ))}
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

export default Jaringan;

