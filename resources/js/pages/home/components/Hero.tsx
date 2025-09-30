import React, { useEffect, useState } from 'react';
import Meteors from './Meteor';
import Particles from '../../../components/ui/particle';

// --- Komponen Animasi Orbit (Dioptimalkan) ---
const OrbitingCirclesAnimation = () => {
    return (
        <>
            <style>
                {`
                    @keyframes orbit {
                        0% {
                            transform: rotate(0deg) translateX(180px) rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg) translateX(180px) rotate(-360deg);
                        }
                    }
                    .orbit-element {
                        animation: orbit 15s linear infinite;
                    }
                `}
            </style>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                 <div className="relative w-1 h-1">
                    {/* --- PERBAIKAN: Efek shadow dihapus untuk performa lebih baik --- */}
                    <div 
                        className="absolute w-6 h-6 bg-blue-500 rounded-full orbit-element" 
                        style={{ animationDelay: '0s' }}>
                    </div>
                    <div 
                        className="absolute w-4 h-4 bg-star-light rounded-full orbit-element" 
                        style={{ animationDelay: '-5s', animationDuration: '20s' }}> 
                    </div>
                    <div 
                        className="absolute w-3 h-3 bg-purple-500 rounded-full orbit-element" 
                        style={{ animationDelay: '-10s', animationDuration: '25s' }}>
                    </div>
                 </div>
            </div>
        </>
    );
};


const Hero: React.FC = () => {
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
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-b from-star-dark to-star-blue overflow-hidden text-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 md:w-1/2 md:h-1/2 bg-gradient-to-br from-blue-500 to-star-light rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
                
                <div className="relative z-10 w-full text-center md:text-left animate-fade-in ">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="text-white">Welcome to </span>
                        <span className="text-gradient">STARLABS</span>
                    </h1>
                    <div className="overflow-hidden">
                        <p className="text-lg sm:text-xl mb-6 animate-slide-up">
                            <span className="text-star-light">S</span>cience,
                            <span> </span>
                            <span className="text-star-light">T</span>echnology
                            <span> </span>
                            <span className="text-star-light">A</span>nd
                            <span> </span>
                            <span className="text-star-light">C</span>omputer
                            <span> </span>
                            <span className="text-star-light">L</span>aboratories
                        </p>
                    </div>
                    <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Pioneering the future through innovative research and <br />cutting-edge technology solutions for a better tomorrow.
                    </p>
                    
                    <div className="flex justify-center md:justify-start space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <a href="#about" className="px-6 py-3 bg-gradient-to-r from-star-light to-blue-500 text-star-dark font-medium rounded-full hover:shadow-lg hover:shadow-star-light/20 transition-all">
                            Discover More
                        </a>
                        <a href="#contact" className="px-6 py-3 border border-star-light text-star-light rounded-full hover:bg-star-light/10 transition-all">
                            Get in Touch
                        </a>
                    </div>
                </div>

                <div className="hidden md:block md:w-1/2 mt-12 md:mt-0 relative h-[400px]">
                    {isDesktop && <OrbitingCirclesAnimation />}
                </div>
            </div>
                <>
                    <Meteors />
                    <Particles className="absolute inset-x-0 top-0 h-full w-full" />
                </>
        </section>
    );
};

export default Hero;

