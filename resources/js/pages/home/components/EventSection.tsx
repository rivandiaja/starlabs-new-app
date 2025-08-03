'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Pastikan CSS pagination diimpor
import { Pagination } from 'swiper/modules';

const eventData = [
  {
    image: 'https://placehold.co/426x242/1E293B/FFFFFF?text=Event+1',
    tag: 'LOREM IPSUM',
    title: 'Lorem Ipsum Event',
    description:
      'Dolor sit amet consectetur Adipiscing elit Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
  },
  {
    image: 'https://placehold.co/426x242/1E293B/FFFFFF?text=Event+2',
    tag: 'LOREM IPSUM',
    title: 'Event Dua',
    description:
      'Deskripsi event dua dengan panjang yang serupa. Penyesuaian teks agar konsisten dengan kartu pertama dan terlihat menarik.',
  },
  {
    image: 'https://placehold.co/426x242/1E293B/FFFFFF?text=Event+3',
    tag: 'LOREM IPSUM',
    title: 'Event Tiga',
    description:
      'Penjelasan tentang event ketiga. Tampil menarik dan singkat sesuai desain yang telah dirancang.',
  },
   // Anda bisa menambahkan lebih banyak data event di sini
];

interface EventCardProps {
  image: string;
  tag: string;
  title: string;
  description: string;
}

// Komponen EventCard tidak perlu diubah, sudah bagus.
const EventCard: React.FC<EventCardProps> = ({ image, tag, title, description }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm text-neutral-400">{tag}</span>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
        <p className="text-sm text-neutral-300 mt-2 mb-4">{description}</p>
        
        <a
          href="#"
          className="mt-auto self-start bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300"
        >
          Selengkapnya
        </a>
      </div>
    </div>
  );
};


const EventSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-blue to-star-blue text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Upcoming <span className="text-gradient">Event</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-star-light to-blue-500 mx-auto"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive range of scientific and technological services to meet the diverse needs of our clients and partners.
          </p>
        </div>
        
        {/* --- MOBILE VIEW (SWIPER) --- */}
        {/* Tampil di layar kecil, hilang di layar 'md' ke atas */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="pb-10" // Beri padding bottom untuk ruang pagination
          >
            {eventData.map((event, idx) => (
              <SwiperSlide key={idx}>
                <EventCard
                  image={event.image}
                  tag={event.tag}
                  title={event.title}
                  description={event.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- DESKTOP VIEW (GRID) --- */}
        {/* Hilang di layar kecil, tampil sebagai grid di layar 'md' ke atas */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventData.map((event, idx) => (
            <EventCard
              key={idx}
              image={event.image}
              tag={event.tag}
              title={event.title}
              description={event.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventSection;