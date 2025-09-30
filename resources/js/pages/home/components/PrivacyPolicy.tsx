'use client';

import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './Navbar';
import Footer from './Footer';
import Particles from '@/components/ui/particle';
import Meteors from './Meteor';
import SplashCursor from '@/components/ui/splashcursor';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <Head title="Privacy Policy" />
            <Navbar />
            <section className="bg-star-dark relative min-h-screen overflow-hidden px-4 pt-24 pb-20 text-white sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="text-center mb-12">
                        <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                        <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-lg text-white/70">Last updated: September 20, 2025</p>
                    </div>

                    <div className="glass-card p-8 md:p-10 rounded-2xl border border-white/10 prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to Starlabs. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                        </p>
                        
                        <h2>2. Information We Collect</h2>
                        <p>
                            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
                        </p>
                        <p>
                            The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Email Address, Phone Number, etc.
                        </p>
                        
                        <h2>3. How We Use Your Information</h2>
                        <p>
                            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                        
                        <h2>4. Will Your Information Be Shared With Anyone?</h2>
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
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

export default PrivacyPolicy;
