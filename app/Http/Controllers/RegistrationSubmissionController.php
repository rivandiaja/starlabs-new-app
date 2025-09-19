<?php

namespace App\Http\Controllers;

use App\Models\RegistrationForm;
use App\Models\RegistrationSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Exports\SubmissionsExport;
use Maatwebsite\Excel\Facades\Excel;

class RegistrationSubmissionController extends Controller
{
    /**
     * Menampilkan daftar pendaftar untuk formulir tertentu.
     */
    public function index(RegistrationForm $form)
    {
        $submissions = $form->submissions()->latest()->get();

        return Inertia::render('RegistrationForms/Submissions', [
            'form' => $form,
            'submissions' => $submissions,
        ]);
    }

    /**
     * Mengekspor data pendaftar ke dalam file Excel (.xlsx).
     */
    public function export(RegistrationForm $form)
    {
        $fileName = 'pendaftar-' . \Illuminate\Support\Str::slug($form->title) . '.xlsx';
        
        return Excel::download(new SubmissionsExport($form), $fileName);
    }

    public function destroy(RegistrationSubmission $submission)
    {
        // Otorisasi sederhana: pastikan hanya admin yang bisa menghapus (opsional)
        // abort_if(!auth()->user()->isAdmin(), 403);

        $submission->delete();

        return back()->with('success', 'Data pendaftar berhasil dihapus.');
    }
}

