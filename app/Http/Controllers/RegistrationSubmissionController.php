<?php

namespace App\Http\Controllers;

use App\Models\RegistrationForm;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
}

