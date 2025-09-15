<?php

namespace App\Http\Controllers;

use App\Models\RegistrationForm;
use App\Models\RegistrationSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PublicRegistrationController extends Controller
{
    /**
     * Menampilkan halaman formulir pendaftaran publik yang spesifik.
     *
     * @param  \App\Models\RegistrationForm  $form
     * @return \Inertia\Response
     */
    public function show(RegistrationForm $form)
    {
        // Periksa apakah formulir aktif dan dalam periode pendaftaran
        $today = now()->toDateString();
        if (!$form->is_active || !($today >= $form->start_date && $today <= $form->end_date)) {
            // Jika tidak, tampilkan halaman error atau redirect ke home
            // Untuk sekarang, kita akan redirect ke home dengan pesan error
            return redirect()->route('home')->with('error', 'Pendaftaran untuk formulir ini tidak tersedia saat ini.');
        }

        return Inertia::render('Public/RegistrationForm', [
            'form' => $form
        ]);
    }

    /**
     * Menyimpan data pendaftaran baru dari formulir publik.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RegistrationForm  $form
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, RegistrationForm $form)
    {
        // Membuat aturan validasi secara dinamis berdasarkan kolom yang dipilih admin
        $rules = [];
        foreach ($form->fields as $field) {
            $rules[$field] = 'required|string|max:255';
            if (Str::contains($field, 'email')) {
                $rules[$field] .= '|email';
            }
            if (Str::contains($field, 'nim')) {
                $rules[$field] .= '|string';
            }
        }
        $rules['agreement'] = 'accepted';

        $validatedData = $request->validate($rules);

        // Simpan data pendaftaran ke tabel 'registration_submissions'
        RegistrationSubmission::create([
            'registration_form_id' => $form->id,
            'data' => $validatedData,
        ]);

        return back()->with('success', 'Pendaftaran Anda telah berhasil dikirim! Terima kasih.');
    }
}

