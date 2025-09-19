import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Academy, type Division, type Syllabus, type SharedData } from '@/types';
import { BookOpen, User, Target, Wrench, Edit, Trash2 } from 'lucide-react';
import SyllabusFormModal from './Partials/SyllabusFormModal';

// Komponen untuk isi kartu silabus (agar tidak duplikat kode)
const SyllabusCardContent = ({ item, canManage, onEdit, onDelete }: { item: Syllabus, canManage: boolean, onEdit: () => void, onDelete: () => void }) => (
    <>
        {canManage && (
            <div className="absolute top-2 right-2 space-x-1">
                <button onClick={onEdit} className="p-1.5 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition"><Edit size={14} /></button>
                <Link href={route('syllabuses.destroy', item.id)} method="delete" as="button" onBefore={onDelete} className="p-1.5 rounded-full text-white/70 hover:bg-white/10 hover:text-red-400 transition"><Trash2 size={14} /></Link>
            </div>
        )}
        <p className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2"><User size={16} />{item.pemateri}</p>
        <h3 className="mb-3 font-bold text-white text-xl">{item.materi_utama}</h3>
        <div className="space-y-4 text-sm text-white/80 text-left">
            <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><BookOpen size={16} /> Sub Materi:</h4>
                <ul className="list-disc list-inside pl-2 space-y-1">
                    {item.sub_materi.map((sub, i) => <li key={i}>{sub}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Wrench size={16} /> Studi Kasus:</h4>
                <p>{item.studi_kasus}</p>
            </div>
            <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Target size={16} /> Tujuan:</h4>
                <p>{item.tujuan}</p>
            </div>
        </div>
    </>
);

export default function SyllabusIndex({ academy, division, syllabuses }: { academy: Academy, division: Division, syllabuses: Syllabus[] }) {
    const { auth } = usePage<SharedData>().props;
    const canManage = auth.user?.role?.name === 'Admin' || auth.user?.role?.name === 'Dev';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSyllabus, setEditingSyllabus] = useState<Syllabus | null>(null);

    const openCreateModal = () => {
        setEditingSyllabus(null);
        setIsModalOpen(true);
    };

    const openEditModal = (syllabus: Syllabus) => {
        setEditingSyllabus(syllabus);
        setIsModalOpen(true);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Akademi', href: route('academies.index') },
        { title: academy.name, href: route('academies.show', academy.id) },
        { title: division.name, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Silabus: ${division.name}`} />
            <div className="p-4 sm:p-6">
                <div className="glass-card p-6 rounded-2xl shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 text-center sm:text-left">
                        <div>
                            <h3 className="text-xl font-semibold text-white">Silabus Divisi {division.name}</h3>
                            <p className="text-white/70 text-sm">Akademi: {academy.name}</p>
                        </div>
                        {canManage && (
                            <button onClick={openCreateModal} className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold transition text-sm shrink-0">+ Tambah Pertemuan</button>
                        )}
                    </div>

                    {/* --- PERBAIKAN: Linimasa Responsif --- */}
                    <div className="container mx-auto max-w-5xl">
                        <div className="relative">
                            {/* Garis Vertikal */}
                            <div className="absolute left-6 md:left-1/2 w-0.5 h-full bg-gray-700/50 -translate-x-1/2"></div>
                            
                            <div className="relative flex flex-col gap-12">
                                {syllabuses.map((item, index) => (
                                    <div key={item.id} className="flex md:justify-between items-center w-full">
                                        {/* Sisi Kiri (Desktop) / Kosong (Mobile) */}
                                        <div className={`hidden md:flex w-5/12 ${index % 2 === 0 ? 'order-3' : 'order-1'}`}></div>

                                        {/* Titik Tengah (Dot) */}
                                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                                            <h1 className="mx-auto font-bold text-lg text-white">{item.pertemuan}</h1>
                                        </div>
                                        
                                        {/* Kontainer Kartu */}
                                        <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${index % 2 === 0 ? 'order-1 md:pr-8' : 'order-3 md:pl-8'}`}>
                                            <div className="glass-card rounded-2xl shadow-xl p-6 relative">
                                                <SyllabusCardContent 
                                                    item={item} 
                                                    canManage={canManage} 
                                                    onEdit={() => openEditModal(item)} 
                                                    onDelete={() => confirm('Yakin ingin menghapus materi ini?')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {syllabuses.length === 0 && (
                        <p className="text-center text-white/60 py-10">Belum ada silabus untuk divisi ini.</p>
                    )}

                </div>
            </div>
            {canManage && <SyllabusFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} syllabus={editingSyllabus} academyId={academy.id} divisionId={division.id} />}
        </AppLayout>
    );
}

