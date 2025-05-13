import React from 'react';

const OurTeam: React.FC = () => {
    const teamMembers = [
    {
        name: 'Muhammad Ariv Rifandi',
        role: 'Ketua Umum',
        image: '/images/team/alice.jpg',
        bio: 'Expert in Web Progamming.',
    },
    {
        name: 'Zainul Mutawakkil',
        role: 'Kadiv Pemprogaman',
        image: '/images/team/marcus.jpg',
        bio: 'Specializes in Web Dev, IoT, Electrical Enginering.',
    },
    {
        name: 'Azfa Eka Saputra',
        role: 'Kadiv Multimedia',
        image: '/images/team/nina.jpg',
        bio: 'Focuses on intuitive design and accessibility.',
    },
    {
        name: 'Faizal',
        role: 'Kadiv Jaringan',
        image: '/images/team/surya.jpg',
        bio: 'Pioneering research in artificial general intelligence.',
    },
    {
        name: 'Kipli',
        role: 'Kadiv Office',
        image: '/images/team/adam.jpg',
        bio: 'Expert in artificial intelligence and machine learning.',
    },
];

    return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-dark to-star-dark text-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Meet <span className="text-gradient">Our Team</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
                The minds behind STARLABS — passionate, innovative, and dedicated.
            </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl text-center reveal">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-star-light"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-star-light font-medium mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
            ))}
            </div>
        </div>
    </section>
    );
};

export default OurTeam;