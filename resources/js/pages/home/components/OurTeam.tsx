import { Link } from '@inertiajs/react';
import React from 'react';

// Anda tidak perlu mengimpor komponen BPH di sini,
// karena routing Inertia yang akan menanganinya.
// import BPH from './components/BPH';

const OurTeam: React.FC = () => {
    const teamMembers = [
        {
            name: 'Muhammad Arif Rivandi',
            role: 'Ketua Umum',
            image: '/foto_bph/1.png',
            bio: 'Tech leader with a passion for digital innovation and web development.',
            profileUrl: '/bph',
        },
        {
            name: 'Zainul Mutawakkil',
            role: 'Kadiv Pemprogaman',
            image: '/foto_pemrograman/1.png',
            bio: 'Specializes in Web Dev, IoT, Electrical Enginering.',
            profileUrl: '/pemrograman',
        },
        {
            name: 'Muhammad Azfa Eka Satria',
            role: 'Kadiv Multimedia',
            image: '/foto_multimedia/1.png',
            bio: 'Focuses on intuitive design and accessibility.',
            profileUrl: '/multimedia',
        },
        {
            name: 'Faizal Sejati',
            role: 'Kadiv Jaringan',
            image: '/foto_jaringan/1.png',
            bio: 'Leads the network division and manages system infrastructure.',
            profileUrl: '/jaringan',
        },
        {
            name: 'Rafli Khalifah Rahman',
            role: 'Kadiv Office',
            image: '/foto_office/1.png',
            bio: 'Handles office systems and supports team productivity.',
            profileUrl: '/office',
        },
        {
            name: 'Ghani Arif Baehaqi',
            role: 'Kadep Eksternal',
            image: '/foto_eksternal/1.png',
            bio: 'Builds external partnerships and represents the organization.',
            profileUrl: '/eksternal',
        },
    ];

    return (
        <section id="team" className="bg-star-dark px-4 py-20 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="reveal mb-28 text-center">
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                        Meet <span className="text-gradient">Our Team</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-400">The minds behind STARLABS — passionate, innovative, and dedicated.</p>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className="group hover:shadow-star-light/10 reveal relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="absolute -top-20 left-1/2 h-40 w-auto -translate-x-1/2 [filter:drop-shadow(0_10px_8px_rgba(56,189,248,0.2))] transition-all duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_20px_15px_rgba(56,189,248,0.3))]"
                            />

                            <div className="mt-16 flex-grow">
                                <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                                <p className="text-star-light mb-2 font-medium">{member.role}</p>
                                <p className="text-sm text-gray-400">{member.bio}</p>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={member.profileUrl} className="text-star-light text-sm transition-colors duration-200 hover:text-white">
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
