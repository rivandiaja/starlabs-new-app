import { useState, useMemo } from 'react';
import { type Event, type Schedule } from '@/types';
import ReactCalendar, { TileContentFunc } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Clock } from 'lucide-react';

const isSameDate = (a: Date, b: Date) => a.toDateString() === b.toDateString();
const formatTime = (time?: string | null) => (time ? time.slice(0, 5) : '');

interface Props {
    events: Event[];
    schedules: Schedule[];
}

export default function CalendarPanel({ events, schedules }: Props) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const schedulesForSelectedDate = useMemo(
        () => schedules.filter((s) => isSameDate(new Date(s.date), selectedDate)),
        [schedules, selectedDate]
    );

    // Fungsi untuk menambahkan penanda (titik merah) di bawah tanggal
    const tileContent: TileContentFunc = ({ date, view }) => {
        if (view === 'month') {
            const hasScheduleOrEvent = schedules.some((s) => isSameDate(new Date(s.date), date)) ||
                                     events.some((e) => isSameDate(new Date(e.date), date));
            
            if (hasScheduleOrEvent) {
                return <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />;
            }
        }
        return null;
    };

    return (
        <div>
            <h3 className="font-semibold text-xl mb-3">Kalender Kegiatan</h3>
            <div className="glass-card p-4 rounded-2xl shadow-lg border border-white/10">
                <div className="calendar-container dashboard-calendar">
                    <ReactCalendar
                        onChange={(value) => setSelectedDate(value as Date)}
                        value={selectedDate}
                        tileContent={tileContent}
                        view="month"
                        next2Label={null}
                        prev2Label={null}
                    />
                </div>
                <div className="mt-4 border-t border-white/10 pt-3">
                    <h4 className="font-semibold text-white/90 text-sm mb-2">Jadwal untuk {selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}:</h4>
                    <ul className="space-y-2 text-sm max-h-32 overflow-y-auto pr-2">
                        {schedulesForSelectedDate.length > 0 ? (
                            schedulesForSelectedDate.map((schedule) => (
                                <li key={schedule.id} className="flex items-center justify-between text-white/80">
                                    <span className="truncate">{schedule.title}</span>
                                    <span className="ml-2 flex items-center gap-1 font-medium text-purple-300"><Clock size={14} /> {formatTime(schedule.start_time)}</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-white/60 text-xs">Tidak ada jadwal pada tanggal ini.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
