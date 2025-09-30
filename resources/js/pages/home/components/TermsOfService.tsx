'use client';

import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './Navbar';
import Footer from './Footer';
import Particles from '@/components/ui/particle';
import Meteors from './Meteor';
import SplashCursor from '@/components/ui/splashcursor';
import { FileText } from 'lucide-react';

const TermsOfService: React.FC = () => {
    return (
        <>
            <Head title="Terms of Service" />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 pt-24 pb-20 text-white sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="text-center mb-12">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                        <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
                            Terms of Service
                        </h1>
                        <p className="mt-4 text-lg text-white/70">Last updated: September 20, 2025</p>
                    </div>

                    <div className="glass-card p-8 md:p-10 rounded-2xl border border-white/10 prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
                        <h2>1. Agreement to Terms</h2>
                        <p>
                            By using our services, you agree to be bound by these terms. If you do not agree to these terms, do not use the services. We may modify the terms at any time, and such modifications shall be effective immediately upon posting of the modified terms.
                        </p>
                        
                        <h2>2. Use of Services</h2>
                        <p>
                            You agree to use our services for lawful purposes only. You agree not to use the service for any illegal purpose or in any way that could damage our name or reputation.
                        </p>

                        <h2>3. Intellectual Property</h2>
                        <p>
                           The Service and its original content, features and functionality are and will remain the exclusive property of Starlabs and its licensors.
                        </p>
                        {/* Tambahkan bagian lain sesuai kebutuhan */}
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

export default TermsOfService;
