import React from 'react';
import { Link } from '@inertiajs/react';

// Anda tidak perlu mengimpor komponen BPH di sini,
// karena routing Inertia yang akan menanganinya.
// import BPH from './components/BPH'; 

const OurTeam: React.FC = () => {
    const teamMembers = [
        {
            name: 'Mas lukluk israel asli pantai tel aviv',
            role: 'Big Boss asli mujur',
            image: '/foto_bph/1.png',
            bio: 'itu tolong diapain',
            // Perbaikan: Ubah 'BPH' menjadi '/bph' agar menjadi URL yang valid
            profileUrl: '/bph', 
        },
        {
            name: 'Zainul Mutawakkil',
            role: 'Kadiv Pemprogaman',
            image: '/foto_pemrograman/1.png',
            bio: 'Specializes in Web Dev, IoT, Electrical Enginering.',
            profileUrl: '/pemrograman',
            
        },
        // ... anggota lainnya tetap sama
        {
            name: 'Muhammad Azfa E S',
            role: 'Kadiv Multimedia',
            image: '/foto_multimedia/1.png',
            bio: 'Focuses on intuitive design and accessibility.',
            profileUrl: '/multimedia',
        },
        {
            name: 'Faizal',
            role: 'Kadiv Jaringan',
            image: '/foto_jaringan/1.png',
            bio: 'Pioneering research in artificial general intelligence.',
            profileUrl: '/jaringan',
        },
        {
            name: 'Rafli K R',
            role: 'Kadiv Office',
            image: '/foto_office/1.png',
            bio: 'Expert in artificial intelligence and machine learning.',
            profileUrl: '/office',
        },
        {
            name: 'gani mulet jablay',
            role: 'Kadep Eksternal dan Pembangunan Ekonomi',
            image: '/foto_eksternal/1.png',
            bio: 'Expert in artificial intelligence and machine learning.',
            profileUrl: '/eksternal',
        },
    ];

    return (
        <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-star-dark text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-28 reveal">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Meet <span className="text-gradient">Our Team</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        The minds behind STARLABS — passionate, innovative, and dedicated.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-star-light/10 reveal"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-auto transition-all duration-300 [filter:drop-shadow(0_10px_8px_rgba(56,189,248,0.2))] group-hover:scale-110 group-hover:[filter:drop-shadow(0_20px_15px_rgba(56,189,248,0.3))]"
                            />
                            
                            <div className="flex-grow mt-16">
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-star-light font-medium mb-2">{member.role}</p>
                                <p className="text-gray-400 text-sm">{member.bio}</p>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={member.profileUrl} className="text-sm text-star-light hover:text-white transition-colors duration-200">
                                    See More &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeam;