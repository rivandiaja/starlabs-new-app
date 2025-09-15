import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { type Event, type RegistrationForm } from '../../types';

// Import semua komponen section Anda
import SplashCursor from '../../components/ui/splashcursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import OurTeam from './components/OurTeam';
import Services from './components/Services';
import EventSection from './components/EventSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdPopupModal from '@/components/AdPopupModal'; // Import modal pop-up

// Definisikan props yang diterima dari HomeController
interface Props {
    events: Event[];
    activeForm: RegistrationForm | null; // Menerima data form yang aktif
}

const Home: React.FC<Props> = ({ events, activeForm }) => {
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        // Iklan akan muncul setiap kali halaman dimuat jika ada form aktif
        if (activeForm) {
            setShowAd(true);
        }

        const handleScroll = () => {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                } else {
                    reveals[i].classList.remove('active');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Panggil sekali saat load

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeForm]);

    return (
        <>
            <Head title="Welcome to Starlabs" />
            
            {/* Render modal pop-up iklan secara kondisional */}
            {showAd && activeForm && <AdPopupModal form={activeForm} onClose={() => setShowAd(false)} />}
            
            <div className="z-0 flex min-h-screen flex-col bg-star-dark text-white">
                <SplashCursor />
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

