import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

// --- TIPE DASAR PENGGUNA & OTENTIKASI ---

export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    avatar_url?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    gender?: string;
    role_id?: number;
    role?: Role; // Relasi ke Role
}

export interface Auth {
    user: User;
}

// --- TIPE UNTUK NAVIGASI & LAYOUT ---

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    adminOnly?: boolean; // Properti untuk menu khusus admin
}

// --- TIPE UNTUK MODEL DATA ---

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    tag: string;
    image_url: string;
}

export interface Finance {
    id: number;
    date: string;
    category: string;
    description: string;
    type: 'income' | 'expense';
    amount: number;
}

export interface Dues {
    id: number;
    user_id: number; // Menggunakan user_id, bukan 'name'
    period: string; // Format YYYY-MM
    amount: number;
    status: 'paid' | 'unpaid';
    payment_date: string | null;
    user?: User; // Untuk menampung data relasi user (nama, dll.)
}

// --- TIPE GLOBAL UNTUK INERTIA ---

// Tipe untuk data yang dibagikan ke semua halaman
export interface SharedData {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

// Tipe untuk props halaman
export interface PageProps<T = Record<string, unknown>> {
    auth: Auth;
    ziggy: Config & { location: string };
    children?: React.ReactNode;
    [key: string]: unknown;
    data?: T;
}

export interface Schedule {
    id: number;
    title: string;
    description: string | null;
    date: string;
    start_time: string;
    end_time: string;
    location: string | null;
}
export interface Announcement {
    id: number;
    user_id: number;
    title: string;
    content: string;
    level: 'info' | 'success' | 'warning' | 'danger';
    created_at: string;
    updated_at: string;
    user: {
        // Untuk menampung data relasi
        id: number;
        name: string;
    };
}
export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
}
export interface RegistrationSubmission {
    id: number;
    registration_form_id: number;
    data: { [key: string]: string }; // Data pendaftar yang dinamis
    created_at: string;
}

export interface RegistrationForm {
    id: number;
    title: string;
    description: string;
    image: string | null;
    image_url: string | null;
    start_date: string;
    end_date: string;
    is_active: boolean;
    show_benefits: boolean;
    fields: string[];
    submissions_count?: number; 
}

export interface Notification {
    id: string;
    data: {
        type: string;       
        title: string
        activity_type: string;
        activity_id: number;
        created_at_human: string; 
    };
    created_at: string;
    read_at: string | null;
}