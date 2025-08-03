import React from 'react';

const About: React.FC = () => {
    return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-blue to-star-dark text-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                About <span className="text-gradient">STARLABS</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-star-light to-blue-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal text-center md:text-left">
            <div>
                <p className="text-base md:text-lg mb-6">
                STARLABS was founded with a vision to push the boundaries of scientific discovery and technological innovation. Our interdisciplinary team of scientists, engineers, and researchers work collaboratively to solve some of the world's most pressing challenges.
                </p>
                <p className="text-base md:text-lg mb-6">
                With state-of-the-art facilities and a commitment to excellence, we're dedicated to transforming theoretical concepts into practical applications that benefit humanity and advance our understanding of the universe.
                </p>
                <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                <div className="px-4 py-2 bg-blue-500/20 rounded-full text-star-light">Advanced Research</div>
                <div className="px-4 py-2 bg-blue-500/20 rounded-full text-star-light">Innovation</div>
                <div className="px-4 py-2 bg-blue-500/20 rounded-full text-star-light">Collaboration</div>
                <div className="px-4 py-2 bg-blue-500/20 rounded-full text-star-light">Excellence</div>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-star-light/20 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full"></div>

                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="mb-6">
                To advance scientific knowledge and develop innovative technologies that address global challenges and improve quality of life.
                </p>

                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="mb-6">
                To be a world-leading research institution that pioneers breakthrough discoveries and fosters technological advancement for a sustainable future.
                </p>

                <div className="flex items-center space-x-6 mt-8">
                <div className="text-center">
                    <div className="text-3xl font-bold text-star-light">15+</div>
                    <div className="text-sm">Years of Excellence</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-star-light">200+</div>
                    <div className="text-sm">Research Projects</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-star-light">50+</div>
                    <div className="text-sm">Global Partners</div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
    );
};

export default About;
