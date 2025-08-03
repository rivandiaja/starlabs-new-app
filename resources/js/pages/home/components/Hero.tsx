import React from 'react';
import Meteors from './Meteor';
import Particles from '@/components/ui/particle';

const Hero: React.FC = () => {
    return (
        <>
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-b from-star-dark to-star-blue overflow-hidden text-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center overflow-visible">
                <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 md:w-1/2 md:h-1/2 bg-gradient-to-br from-blue-500 to-star-light rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
                
                <div className="relative z-10 w-full md:w-1/2 text-center md:text-left animate-fade-in ">
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

                {/* --- BLOK ANIMASI DENGAN PERBAIKAN --- */}
                {/* Ditambahkan 'hidden md:block' untuk menyembunyikannya di mobile */}
                <div className="hidden md:block md:w-1/2 mt-12 md:mt-0 relative animate-fade-in overflow-visible" style={{ animationDelay: '0.6s' }}>
                    <div className="relative w-[400px] h-[400px] mx-auto overflow-visible">
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute w-6 h-6 bg-blue-500 rounded-full orbit shadow-lg shadow-blue-500/40" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute w-4 h-4 bg-star-light rounded-full orbit shadow-md shadow-star-light/40" style={{ animationDelay: '-5s' }}></div>
                            <div className="absolute w-3 h-3 bg-purple-500 rounded-full orbit shadow-md shadow-purple-500/40" style={{ animationDelay: '-10s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Partikel dan Meteor tetap di sini */}
            <div className="absolute inset-0 h-[500px] w-full max-w-[350px]">
                <Meteors />
            </div>
            <Particles className="absolute inset-x-0 top-0 h-full w-full" />
        </section>
        </>
    );
};

export default Hero;