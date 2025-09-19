<?php

namespace App\Http\Controllers;

use App\Models\Academy;
use App\Models\Division; // 1. Impor model Division
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademyController extends Controller
{
    /**
     * Menampilkan daftar semua akademi.
     */
    public function index()
    {
        return Inertia::render('Academies/Index', [
            'academies' => Academy::withCount('syllabuses')->latest()->get(),
        ]);
    }

    /**
     * --- PERBAIKAN DI SINI ---
     * Menampilkan halaman detail akademi yang berisi daftar semua divisi.
     */
    public function show(Academy $academy)
    {
        return Inertia::render('Academies/Show', [
            'academy' => $academy,
            'divisions' => Division::all(), // Ambil semua data divisi secara global
        ]);
    }

    /**
     * Menyimpan akademi baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:academies,name',
            'is_active' => 'boolean',
            'registration_link' => 'nullable|url',
        ]);
        
        if ($request->input('is_active')) {
            Academy::where('is_active', true)->update(['is_active' => false]);
        }

        Academy::create($validated);
        return redirect()->route('academies.index')->with('success', 'Akademi berhasil dibuat.');
    }

    /**
     * Memperbarui akademi.
     */
    public function update(Request $request, Academy $academy)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:academies,name,' . $academy->id,
            'is_active' => 'boolean',
            'registration_link' => 'nullable|url',
        ]);
        
        if ($request->input('is_active')) {
            Academy::where('id', '!=', $academy->id)->update(['is_active' => false]);
        }
        
        $academy->update($validated);
        return redirect()->route('academies.index')->with('success', 'Akademi berhasil diperbarui.');
    }

    /**
     * Menghapus akademi.
     */
    public function destroy(Academy $academy)
    {
        $academy->delete();
        return redirect()->route('academies.index')->with('success', 'Akademi berhasil dihapus.');
    }
}

