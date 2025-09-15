import { cn } from '@/lib/utils';
import React from 'react';

// Komponen logo SVG sebelumnya tidak lagi diperlukan.

// Tipe props untuk komponen AppLogo.
interface AppLogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AppLogo({ className, ...props }: AppLogoProps) {
    return (
        <div
            className={cn('inline-flex items-center gap-x-2 text-lg font-bold text-foreground', className)}
            {...props}
        >
            {/* --- PERBAIKAN: Mengganti SVG dengan tag <img> --- */}
            <img
                src="/starboy.png" // Path ke file gambar di dalam folder 'public'
                alt="Starlabs Logo"
                className="h-8 w-8" // Menjaga ukuran tetap sama dengan logo sebelumnya
            />

        </div>
    );
}

