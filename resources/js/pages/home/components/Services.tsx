// src/components/Services.tsx
import React from 'react';

const Services: React.FC = () => {
    return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-dark to-star-blue">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Our <span className="text-gradient">Services</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-star-light to-blue-500 mx-auto"></div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
                We offer a comprehensive range of scientific and technological services to meet the diverse needs of our clients and partners.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {[
                {
                title: 'Research & Development',
                description: 'Cutting-edge R&D services from concept to testing.',
                points: ['Applied Research', 'Prototype Development', 'Technology Transfer'],
                },
                {
                title: 'Advanced Computing',
                description: 'High-performance computing for simulations, AI, and analytics.',
                points: ['AI & Machine Learning', 'Big Data Analytics', 'Quantum Computing'],
                },
                {
                title: 'Laboratory Services',
                description: 'World-class facilities for analysis and experimentation.',
                points: ['Material Analysis', 'Biological Testing', 'Chemical Synthesis'],
                },
            ].map((service, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-6 h-full">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-star-light to-blue-500 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-star-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2 text-gray-400">
                    {service.points.map((point, i) => (
                    <li key={i} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-star-light mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {point}
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>
        </div>
    </section>
    );
};

export default Services;
