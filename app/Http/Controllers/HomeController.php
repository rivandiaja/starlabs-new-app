<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\RegistrationForm;
use App\Models\Academy;
use App\Models\Division;

class HomeController extends Controller
{
    /**
     * Menampilkan halaman utama.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $today = now()->toDateString();
        
        // Cari satu formulir yang aktif DAN periodenya masih berlaku
        $activeForm = RegistrationForm::where('is_active', true)
            ->where('start_date', '<=', $today)
            ->where('end_date', '>=', $today)
            ->first();

        return Inertia::render('home/Home', [
            'events' => Event::latest()->take(6)->get(),
            'activeForm' => $activeForm, // Kirim data form yang aktif (atau null)
        ]);
    }
    public function academy()
{
    return Inertia::render('home/components/Academy', [
        'activeAcademy' => Academy::where('is_active', true)->first(),
        'divisions' => Division::all(),
    ]);
}
}


