import AppLayout from '@/layouts/app-layout';
import { type Academy, type BreadcrumbItem, type Division } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    academy: Academy;
    divisions: Division[];
}

export default function AcademyShow({ academy, divisions }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Akademi', href: route('academies.index') },
        { title: academy.name, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Divisi: ${academy.name}`} />
            <div className="p-4 sm:p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Divisi Pembelajaran</h2>
                    <p className="text-white/70">Pilih divisi untuk mengelola silabus untuk <span className="font-bold">{academy.name}</span>.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {divisions.map((division) => (
                        <Link 
                            key={division.id} 
                            href={route('academies.syllabuses.index', { academy: academy.id, division: division.id })}
                            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 border-2 border-transparent"
                        >
                            <img src={division.image_path} alt={`Divisi ${division.name}`} className="mb-4 h-24 w-24 rounded-none object-cover" />
                            <h3 className="text-xl font-semibold text-white">Divisi <br/> {division.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
