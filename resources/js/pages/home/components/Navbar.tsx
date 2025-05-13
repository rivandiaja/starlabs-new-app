// src/components/Navbar.tsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

const Navbar: React.FC = () => {
    const { auth } = usePage<SharedData>().props;

    return (
        <nav className="glass fixed w-full z-50 px-4 sm:px-6 lg:px-8 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img
                    src="/starlabs-logo.png"
                    alt="STARLABS Logo"
                    className="w-35"
                    />
                </div>
                    <div className="hidden md:flex space-x-8" id="mobile-menu">
                    <a href="#home" className="hover:text-star-light transition-colors">Home</a>
                    <a href="#about" className="hover:text-star-light transition-colors">About</a>
                    <a href="#services" className="hover:text-star-light transition-colors">Services</a>
                    <a href="#research" className="hover:text-star-light transition-colors">Research</a>
                    <a href="#contact" className="hover:text-star-light transition-colors">Contact</a>
                </div>
                <button id="menu-toggle" className="md:hidden text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="flex justify-end gap-4">
                    {auth.user ? (
                    <Link
                    href={route('dashboard')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                    >
                        Dashboard
                    </Link>
                    ) : (
                    <>
                        <Link
                        href={route('login')}
                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm hover:border-[#19140035] dark:hover:border-[#3E3E3A]"
                        >
                        Log in
                        </Link>
                        <Link
                        href={route('register')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                        >
                        Register
                        </Link>
                    </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
