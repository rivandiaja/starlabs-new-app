import SplashCursor from '@/components/ui/splashcursor';
import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import OurTeam from './components/OurTeam';
import Services from './components/Services';

const Home: React.FC = () => {
    useEffect(() => {
        if (window.location.hash) {
  const el = document.querySelector(window.location.hash);
  if (el) {
    const yOffset = -100; // Ganti angka ini sesuai jarak yang kamu mau
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }
}
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementBottom = reveals[i].getBoundingClientRect().bottom;
        const elementVisible = 50;

        if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active'); // 🔁 Remove when out of view
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
            <Head title="Home" />{' '}
            <div className="z-0 flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <SplashCursor />{' '}
                <main className="font-poppins z-1 animate-slide-up animate-once">
                    <Navbar />
                    <Hero />
                    <About />
                    <OurTeam />
                    <Services />
                    <Contact />
                    <Footer />{' '}
                </main>{' '}
            </div>{' '}
        </>
    );
};

export default Home;
