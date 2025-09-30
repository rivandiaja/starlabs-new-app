'use client';

import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './Navbar';
import Footer from './Footer';
import Particles from '@/components/ui/particle';
import Meteors from './Meteor';
import SplashCursor from '@/components/ui/splashcursor';
import { Briefcase } from 'lucide-react';

const Careers: React.FC = () => {
    return (
        <>
            <Head title="Careers" />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 pt-24 pb-20 text-white sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="text-center mb-12">
                        <Briefcase className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                        <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
                            Careers at Starlabs
                        </h1>
                        <p className="mt-4 text-lg text-white/70">Join our team and build the future of technology.</p>
                    </div>

                    <div className="glass-card p-8 md:p-10 rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
                        <div className="space-y-8">
                            {/* Contoh Posisi 1 */}
                            <div className="border-b border-white/10 pb-6">
                                <h3 className="text-xl font-semibold text-blue-300">Frontend Developer Intern</h3>
                                <p className="text-white/70 mt-2">We are looking for a passionate Frontend Developer Intern to join our team. You will work on exciting projects and learn from experienced mentors.</p>
                                <a href="mailto:starlalbs@unugha.id" className="inline-block mt-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition">Apply Now</a>
                            </div>

                             {/* Contoh Posisi 2 */}
                            <div className="border-b border-white/10 pb-6">
                                <h3 className="text-xl font-semibold text-blue-300">Network Engineer Intern</h3>
                                <p className="text-white/70 mt-2">Passionate about network infrastructure and security? Join us to gain hands-on experience in a dynamic environment.</p>
                                <a href="mailto:starlalbs@unugha.id" className="inline-block mt-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition">Apply Now</a>
                            </div>

                             <div className="text-center text-white/60 pt-4">
                                <p>No other open positions at the moment. Follow us on social media for future opportunities!</p>
                            </div>
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

export default Careers;
