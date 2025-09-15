<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role; // 1. Import model Role
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str; // Import Str untuk random string

class GoogleController extends Controller
{
    // Method redirect() tetap sama
    public function redirect()
    {
        return Socialite::driver('google')
            ->scopes(['https://www.googleapis.com/auth/drive.readonly'])
            ->redirect();
    }

    // Menerima respons dari Google setelah pengguna login
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Cari pengguna berdasarkan email
            $user = User::firstOrNew(['email' => $googleUser->getEmail()]);

            // Cek apakah pengguna ini BARU (belum ada di database)
            if (!$user->exists) {
                $user->name = $googleUser->getName();
                $user->google_id = $googleUser->getId();
                $user->password = Hash::make(Str::random(24)); // Buat password acak

                // --- BAGIAN TERPENTING ---
                // Cari role 'Anggota' dan atur sebagai role default
                $defaultRole = Role::where('name', 'Anggota')->first();
                if ($defaultRole) {
                    $user->role_id = $defaultRole->id;
                }
            }
            
            // Selalu perbarui token setiap kali login
            $user->google_token = $googleUser->token;
            // Jika belum punya google_id (pengguna lama), tambahkan
            if (!$user->google_id) {
                $user->google_id = $googleUser->getId();
            }

            $user->save();
            
            // Login-kan pengguna ke aplikasi kita
            Auth::login($user);

            // Arahkan ke dashboard
            return redirect()->route('dashboard');

        } catch (\Exception $e) {
            // Jika ada error, kembalikan ke halaman login
            return redirect()->route('login')->with('error', 'Gagal login dengan Google.');
        }
    }
}