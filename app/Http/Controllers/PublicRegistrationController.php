<?php

namespace App\Http\Controllers;

use App\Models\RegistrationForm;
use App\Models\RegistrationSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule; // 1. Impor Rule

class PublicRegistrationController extends Controller
{
    /**
     * Menampilkan halaman formulir pendaftaran publik yang spesifik.
     */
    public function show(RegistrationForm $form)
    {
        $today = now()->toDateString();
        if (!$form->is_active || !($today >= $form->start_date && $today <= $form->end_date)) {
            return redirect()->route('home')->with('error', 'Pendaftaran untuk formulir ini tidak tersedia saat ini.');
        }

        return Inertia::render('Public/RegistrationForm', [
            'form' => $form
        ]);
    }

    /**
     * Menyimpan data pendaftaran baru dari formulir publik.
     */
    public function store(Request $request, RegistrationForm $form)
    {
        // Membuat aturan validasi secara dinamis
        $rules = [];
        foreach ($form->fields as $field) {
            $rules[$field] = 'required|string|max:255';
            
            // --- PERBAIKAN DI SINI: Aturan khusus untuk email ---
            if (Str::contains($field, 'email')) {
                $rules[$field] .= '|email';

                // Tambahkan aturan custom untuk memeriksa keunikan email di dalam JSON
                $rules[$field] = [
                    'required',
                    'email',
                    'max:255',
                    function ($attribute, $value, $fail) use ($form) {
                        $exists = RegistrationSubmission::where('registration_form_id', $form->id)
                            ->whereJsonContains('data->email', $value)
                            ->exists();
                        
                        if ($exists) {
                            $fail('Email ini sudah pernah digunakan untuk mendaftar pada formulir ini.');
                        }
                    },
                ];
            }
        }
        $rules['agreement'] = 'accepted';

        $validatedData = $request->validate($rules);

        // Simpan data pendaftaran ke database
        RegistrationSubmission::create([
            'registration_form_id' => $form->id,
            'data' => $validatedData,
        ]);

        return back()->with('success', 'Pendaftaran Anda telah berhasil dikirim! Terima kasih.');
    }
}

