import { Link } from '@inertiajs/react';
import React from 'react';

const Footer: React.FC = () => {
    const legalLinks = [
        { title: 'Privacy Policy', routeName: 'privacy.policy' },
        { title: 'Terms of Service', routeName: 'terms.service' },
        { title: 'Careers', routeName: 'careers' },
    ];

    return (
        <footer className="bg-star-dark px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="md:col-span-1">
                        <div className="mb-6 flex items-center space-x-2">
                            <img src="/starlabs-logo.png" alt="STARLABS Logo" className="w-35" />
                        </div>
                        <p className="mb-6 text-gray-400">Pioneering the future through innovative research and cutting-edge technology solutions.</p>
                    </div>

                    <div>
                        <h4 className="mb-6 text-lg font-medium text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Services', 'Research', 'Contact'].map((label, i) => (
                                <li key={i}>
                                    <a
                                        href={`#${label.toLowerCase().replace(/ /g, '')}`}
                                        className="hover:text-star-light text-gray-400 transition-colors"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-lg font-medium text-white">Research Areas</h4>
                        <ul className="space-y-3">
                            {['Renewable Energy', 'Biotechnology', 'Quantum Computing', 'Artificial Intelligence', 'Materials Science'].map(
                                (area, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-star-light text-gray-400 transition-colors">
                                            {area}
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-lg font-medium text-white">Newsletter</h4>
                        <p className="mb-4 text-gray-400">Subscribe to our newsletter for the latest updates on research and innovations.</p>
                        <form className="flex">
                            <input
                                type="email"
                                className="bg-star-blue/50 focus:ring-star-light w-full rounded-l-lg border border-gray-700 px-4 py-2 text-white focus:ring-2"
                                placeholder="Your email"
                            />
                            <button
                                type="button"
                                className="from-star-light text-star-dark rounded-r-lg bg-gradient-to-r to-blue-500 px-4 py-2 font-medium transition-all hover:shadow-lg"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
                    <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} STARLABS. All rights reserved.</p>
                    <div className="flex space-x-6">
                        {legalLinks.map((item, i) => (
                            <Link
                                key={i}
                                href={route(item.routeName)} // Menggunakan route() untuk URL dinamis
                                className="hover:text-star-light transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
