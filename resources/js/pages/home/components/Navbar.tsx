import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

const Navbar: React.FC = () => {
  const { auth } = usePage<SharedData>().props;
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll ke anchor setelah halaman dimuat
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          const offset = 80; // Sesuaikan dengan tinggi navbar
          const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <nav className="glass fixed w-full z-50 px-4 sm:px-6 lg:px-8 py-4 text-white bg-[#00000090] backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="/starlabs-logo.png" alt="STARLABS Logo" className="h-8 w-auto" />
        </div>

        {/* Toggle Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/#" className="hover:text-star-light transition-colors">Home</a>
          <a href="/#about" className="hover:text-star-light transition-colors">About</a>
          <a href="/#team" className="hover:text-star-light transition-colors">Our Team</a>
          <a href="/#services" className="hover:text-star-light transition-colors">Service</a>
          <a href="/#research" className="hover:text-star-light transition-colors">Academy</a>
          <a href="/#contact" className="hover:text-star-light transition-colors">Contact</a>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {auth.user ? (
            <Link href={route('dashboard')} className="border border-white/30 px-4 py-1 rounded-sm text-sm hover:border-white/50">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href={route('login')} className="px-4 py-1 text-sm hover:underline">Login</Link>
              <Link href={route('register')} className="border border-white/30 px-4 py-1 rounded-sm text-sm hover:border-white/50">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3 text-sm">
          <a href="/#" onClick={() => setMenuOpen(false)} className="block hover:text-star-light">Home</a>
          <a href="/#about" onClick={() => setMenuOpen(false)} className="block hover:text-star-light">About</a>
          <a href="/#team" onClick={() => setMenuOpen(false)} className="block hover:text-star-light">Our Team</a>
          <a href="/#services" onClick={() => setMenuOpen(false)} className="block hover:text-star-light">Research</a>
          <a href="/#research" onClick={() => setMenuOpen(false)} className="block hover:text-star-light">Academy</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)} className="block hover:text-star-light">Contact</a>
          <div className="pt-2 border-t border-white/20">
            {auth.user ? (
              <Link href={route('dashboard')} onClick={() => setMenuOpen(false)} className="block hover:underline">Dashboard</Link>
            ) : (
              <>
                <Link href={route('login')} onClick={() => setMenuOpen(false)} className="block hover:underline">Login</Link>
                <Link href={route('register')} onClick={() => setMenuOpen(false)} className="block hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
