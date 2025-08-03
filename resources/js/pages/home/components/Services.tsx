// src/components/Services.tsx
import React from 'react';

// 1. Impor komponen dan CSS dari Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Komponen Card yang bisa digunakan kembali
const ServiceCard = ({ service }: { service: any }) => (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-star-light to-blue-500 flex items-center justify-center mb-6 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-star-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
        </div>
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{service.description}</p>
        <ul className="space-y-2 text-gray-400 text-left">
            {service.points.map((point: string, i: number) => (
                <li key={i} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-star-light mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                </li>
            ))}
        </ul>
    </div>
);

const Services: React.FC = () => {
    const servicesData = [
        {
            title: 'Pemrograman',
            description: 'A focused program on software development for various applications.',
            points: ['Web Development', 'Mobile Apps', 'Cloud Solutions'],
        },
        {
            title: 'Multimedia',
            description: 'Innovative multimedia solutions for engaging content creation.',
            points: ['Video Production', 'Graphic Design', 'Interactive Media'],
        },
        {
            title: 'Jaringan',
            description: 'Comprehensive networking solutions for seamless connectivity.',
            points: ['Network Design', 'Security Solutions', 'Cloud Networking'],
        },
        {
            title: 'Office',
            description: 'Office solutions to enhance productivity and collaboration.',
            points: ['Document Management', 'Collaboration Tools', 'Data Analysis'],
        },
    ];

    return (
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-dark to-star-blue text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Our <span className="text-gradient">Program</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-star-light to-blue-500 mx-auto"></div>
                    <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
                        We offer a comprehensive range of scientific and technological services to meet the diverse needs of our clients and partners.
                    </p>
                </div>

                {/* 2. Tampilan Grid untuk Desktop (2 Kolom) */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 reveal">
                    {servicesData.map((service, idx) => (
                        <ServiceCard key={idx} service={service} />
                    ))}
                </div>

                {/* 3. Tampilan Slider untuk Mobile (Android) */}
                <div className="md:hidden reveal p-3">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="pb-10" // Beri padding bottom untuk ruang pagination
                    >
                        {servicesData.map((service, idx) => (
                            <SwiperSlide key={idx}>
                                <ServiceCard service={service} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Services;