// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-star-dark">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-6">
                <img
                    src="/starlabs-logo.png"
                    alt="STARLABS Logo"
                    className="w-35"
                    />
                </div>
                <p className="text-gray-400 mb-6">
                Pioneering the future through innovative research and cutting-edge technology solutions.
                </p>
            </div>

            <div>
                <h4 className="text-lg font-medium text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Research', 'Contact'].map((label, i) => (
                    <li key={i}>
                    <a href={`#${label.toLowerCase().replace(/ /g, '')}`} className="text-gray-400 hover:text-star-light transition-colors">
                        {label}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-medium text-white mb-6">Research Areas</h4>
                <ul className="space-y-3">
                {['Renewable Energy', 'Biotechnology', 'Quantum Computing', 'Artificial Intelligence', 'Materials Science'].map((area, i) => (
                    <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-star-light transition-colors">{area}</a>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-medium text-white mb-6">Newsletter</h4>
                <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates on research and innovations.</p>
                <form className="flex">
                <input type="email" className="px-4 py-2 bg-star-blue/50 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-star-light text-white w-full" placeholder="Your email" />
                <button type="button" className="px-4 py-2 bg-gradient-to-r from-star-light to-blue-500 text-star-dark font-medium rounded-r-lg hover:shadow-lg transition-all">
                    Subscribe
                </button>
                </form>
            </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} STARLABS. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                {['Privacy Policy', 'Terms of Service', 'Careers'].map((item, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-star-light transition-colors">
                    {item}
                </a>
                ))}
            </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
