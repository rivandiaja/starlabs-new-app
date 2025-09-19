<?php

namespace App\Http\Controllers;

use App\Models\Academy;
use App\Models\Division;
use App\Models\Syllabus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SyllabusController extends Controller
{
    /**
     * Menampilkan halaman manajemen silabus (untuk admin).
     */
    public function index(Academy $academy, Division $division)
    {
        return Inertia::render('Academies/Syllabus/Index', [
            'academy' => $academy,
            'division' => $division,
            'syllabuses' => $academy->syllabuses()->where('division_id', $division->id)->orderBy('pertemuan')->get(),
        ]);
    }

    /**
     * --- PERBAIKAN DI SINI ---
     * Menampilkan halaman detail silabus untuk publik.
     */
    public function showPublic(Academy $academy, string $divisionSlug)
    {
        // Cari divisi secara manual berdasarkan slug-nya
        $division = Division::where('slug', $divisionSlug)->firstOrFail();

        return Inertia::render('home/components/DivisionSyllabus', [
            'academy' => $academy,
            'division' => $division,
            'syllabuses' => $academy->syllabuses()->where('division_id', $division->id)->orderBy('pertemuan')->get(),
        ]);
    }

    /**
     * Menyimpan materi silabus baru.
     */
    public function store(Request $request, Academy $academy)
    {
        $validated = $this->validateSyllabus($request);
        $academy->syllabuses()->create($validated);
        return back()->with('success', 'Materi silabus berhasil ditambahkan.');
    }

    /**
     * Memperbarui materi silabus yang ada.
     */
    public function update(Request $request, Syllabus $syllabus)
    {
        $validated = $this->validateSyllabus($request, true);
        $syllabus->update($validated);
        return back()->with('success', 'Materi silabus berhasil diperbarui.');
    }

    /**
     * Menghapus materi silabus.
     */
    public function destroy(Syllabus $syllabus)
    {
        $syllabus->delete();
        return back()->with('success', 'Materi silabus berhasil dihapus.');
    }
    
    private function validateSyllabus(Request $request, bool $isUpdate = false)
    {
        $rules = [
            'pertemuan' => 'required|integer|min:1',
            'pemateri' => 'required|string|max:255',
            'materi_utama' => 'required|string|max:255',
            'sub_materi' => 'nullable|string',
            'studi_kasus' => 'nullable|string',
            'tujuan' => 'nullable|string',
        ];
        if (!$isUpdate) {
            $rules['division_id'] = 'required|exists:divisions,id';
        }
        $validated = $request->validate($rules);
        if (isset($validated['sub_materi'])) {
            $validated['sub_materi'] = array_filter(array_map('trim', explode("\n", $validated['sub_materi'])));
        }
        return $validated;
    }
}

