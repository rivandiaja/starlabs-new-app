'use client';

import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { type Event } from '@/types';
import { Link } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';

// Interface untuk props yang diterima EventCard
interface EventCardProps {
  id: number;
  image: string;
  tag: string;
  title: string;
  date: string;
}

// Komponen untuk satu kartu event
const EventCard: React.FC<EventCardProps> = ({ id, image, tag, title, date }) => {
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      <div className="bg-gray-900 p-6 flex flex-col flex-grow">
        <span className="text-sm text-neutral-400">{tag || 'EVENT'}</span>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
        <div className="flex items-center text-sm text-neutral-300 mt-2 mb-4">
            <CalendarDays className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formattedDate}</span>
        </div>
        <Link 
          href={route('events.show', id)} 
          className="mt-auto self-end bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300"
        >
          Selengkapnya
        </Link>
      </div>
    </div>
  );
};

// Komponen utama yang menampilkan semua event
const EventSection: React.FC<{ events: Event[] }> = ({ events }) => {
  const [showAll, setShowAll] = useState(false);

  const eventsToShow = useMemo(() => {
    if (showAll) {
      return events; // Tampilkan semua jika showAll true
    }
    return events.slice(0, 6); // Tampilkan 6 pertama jika showAll false
  }, [events, showAll]);

  // Tampilan jika tidak ada event sama sekali
  if (!events || events.length === 0) {
    return (
        <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-blue to-star-blue text-white">
             <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Recent Events</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-star-light to-blue-500 mx-auto mb-6"></div>
                <p className="text-white/70 text-lg">Saat ini belum ada event yang tersedia.</p>
            </div>
        </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-star-blue to-star-blue text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Recent Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-star-light to-blue-500 mx-auto"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive range of scientific and technological services to meet the diverse needs of our clients and partners.
          </p>
        </div>
        
        {/* Mobile View (Swiper) */}
        <div className="md:hidden">
          <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1.2} centeredSlides={true} pagination={{ clickable: true }} className="pb-10">
            {eventsToShow.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard id={event.id} image={event.image_url} tag={event.tag} title={event.title} date={event.date} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsToShow.map((event) => (
              <EventCard key={event.id} id={event.id} image={event.image_url} tag={event.tag} title={event.title} date={event.date} />
            ))}
        </div>

        {/* Tombol "More Events" */}
        {events.length > 6 && (
            <div className="text-center mt-16">
                <Link 
                    href={route('events.archive')}
                    className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition font-semibold"
                >
                    View All Events
                </Link>
            </div>
        )}
      </div>
    </section>
  );
};

export default EventSection;

