import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { type Event, type RegistrationForm } from '../../types';

import SplashCursor from '@/components/ui/splashcursor';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import OurTeam from './components/OurTeam';
import Services from './components/Services';
import EventSection from './components/EventSection';
import AdPopupModal from '@/components/AdPopupModal';

interface Props {
  events: Event[];
  activeForm: RegistrationForm | null;
}

const Home: React.FC<Props> = ({ events, activeForm }) => {
  const [showAd, setShowAd] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Tampilkan popup setelah delay
  useEffect(() => {
    if (activeForm) {
      const timer = setTimeout(() => setShowAd(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeForm]);

  // Deteksi ukuran layar
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Scroll + reveal handler
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: 'smooth',
        });
      }
    }

    let ticking = false;

    const revealOnScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const reveals = document.querySelectorAll('.reveal');
          for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementBottom = reveals[i].getBoundingClientRect().bottom;
            const elementVisible = 50;
            if (
              elementTop < windowHeight - elementVisible &&
              elementBottom > 0
            ) {
              reveals[i].classList.add('active');
            } else {
              reveals[i].classList.remove('active');
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Toggle menu di mobile
    const menuButton = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const handleClick = () => {
      menu?.classList.toggle('hidden');
    };
    menuButton?.addEventListener('click', handleClick);

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      menuButton?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <Head title="Home" />
      {showAd && activeForm && (
        <AdPopupModal form={activeForm} onClose={() => setShowAd(false)} />
      )}
      <div className="z-0 flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
        {/* SplashCursor hanya untuk desktop */}
        {isDesktop && <SplashCursor />}

        <main className="font-poppins animate-slide-up animate-once z-1">
          <Navbar />
          <Hero />
          <About />
          <OurTeam />
          <Services />
          <EventSection events={events} />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Home;
