import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurTeam from './components/OurTeam';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashCursor from '@/components/ui/splashcursor';


const Home: React.FC = () => {

    useEffect(() => {
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
        }
    };

    const menuButton = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    menuButton?.addEventListener('click', () => {
        menu?.classList.toggle('hidden');
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    return () => {
        window.removeEventListener('scroll', revealOnScroll);
    };
    }, []);

    return (
    <>
        <Head title="Home"/>
        <div className="flex z-0 min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
        <SplashCursor />
        <main className="font-poppins smooth-scroll z-1">
            <Navbar />
            <Hero />
            <About />
            <OurTeam />
            <Services />
            <Contact />
            <Footer />
        </main>
        </div>
    </>
    );
};

export default Home;
