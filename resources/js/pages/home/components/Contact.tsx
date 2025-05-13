// src/components/Contact.tsx
import React from 'react';

const Contact: React.FC = () => {
    return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-blue to-star-dark">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in <span className="text-gradient">Touch</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-star-light to-blue-500 mx-auto"></div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
                Have questions or interested in collaborating with us? Reach out to our team.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
            {/* Contact Info */}
            <div className="glass-card rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                {[
                {
                    title: 'Address',
                    value: '123 Innovation Way, Tech City, TC 12345',
                    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                },
                {
                    title: 'Email',
                    value: 'info@starlabs.com',
                    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                },
                {
                    title: 'Phone',
                    value: '+1 (555) 123-4567',
                    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                },
                {
                    title: 'Working Hours',
                    value: 'Mon - Fri: 9:00 AM - 6:00 PM',
                    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                }
                ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-star-light to-blue-500 flex items-center justify-center mr-4 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-star-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    </div>
                    <div>
                    <h4 className="text-lg font-medium text-star-light mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.value}</p>
                    </div>
                </div>
                ))}

                <div>
                <h4 className="text-lg font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                    {['twitter', 'linkedin', 'instagram'].map((platform, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/40 transition-colors">
                        <span className="text-white capitalize">{platform.charAt(0).toUpperCase()}</span>
                    </a>
                    ))}
                </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent! (demo)'); e.currentTarget.reset(); }}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 bg-star-blue/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-star-light text-white" placeholder="Your Name" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-3 bg-star-blue/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-star-light text-white" placeholder="your@email.com" />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                    <input type="text" id="subject" className="w-full px-4 py-3 bg-star-blue/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-star-light text-white" placeholder="How can we help?" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea id="message" rows={4} className="w-full px-4 py-3 bg-star-blue/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-star-light text-white" placeholder="Your message..."></textarea>
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-star-light to-blue-500 text-star-dark font-medium rounded-lg hover:shadow-lg transition-all">
                    Send Message
                </button>
                </form>
            </div>
            </div>
        </div>
    </section>
    );
};

export default Contact;
