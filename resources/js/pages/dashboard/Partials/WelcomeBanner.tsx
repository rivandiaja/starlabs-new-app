import React from 'react';

interface Props {
    userName: string;
}

export default function WelcomeBanner({ userName }: Props) {
    // Fungsi untuk mendapatkan ucapan selamat berdasarkan waktu
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat Pagi';
        if (hour < 15) return 'Selamat Siang';
        if (hour < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    return (
        <div className="glass-card p-6 rounded-2xl shadow-lg border border-white/10 flex items-center justify-between">
            {/* Bagian Kiri: Teks Sapaan */}
            <div className="flex-grow">
                <h2 className="text-xl sm:text-3xl font-bold text-white">
                    {getGreeting()}, <br /><span className="text-blue-400">{userName}!</span>
                </h2>
                <p className="text-sm sm:text-lg text-white/70 mt-1">
                    Selamat datang di Website Manajemen Pengurus. Mari kita lihat ringkasan hari ini.
                </p>
            </div>

            {/* Bagian Kanan: Gambar Maskot */}
            <div className="flex-shrink-0 ml-4 hidden sm:block">
                {/* ANDA BISA MENGATUR UKURAN GAMBAR DI BAWAH INI */}
                {/* w-24 h-24: ukuran di layar kecil */}
                {/* sm:w-32 sm:h-32: ukuran di layar lebih besar */}
                <img
                    src="/images/mascot.png" // Pastikan path gambar ini benar
                    alt="Mascot"
                    className="w-24 h-24 sm:w-70 sm:h-70 object-contain"
                />
            </div>
        </div>
    );
}