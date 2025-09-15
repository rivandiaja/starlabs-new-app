<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PushSubscriptionController extends Controller
{
    /**
     * Menyimpan atau memperbarui "alamat" push notification milik pengguna.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'endpoint' => 'required|url',
            'keys.auth' => 'required|string',
            'keys.p256dh' => 'required|string',
        ]);
        
        try {
            $user = $request->user();
            
            // --- PERBAIKAN DI SINI: Gunakan updateOrCreate ---
            // Metode ini akan mencari subscription berdasarkan 'endpoint'.
            // Jika ditemukan, ia akan memperbaruinya. Jika tidak, ia akan membuat yang baru.
            // Ini mencegah error "UNIQUE constraint failed" saat halaman di-refresh.
            $user->pushSubscriptions()->updateOrCreate(
                [
                    'endpoint' => $validated['endpoint'],
                ],
                [
                    'public_key' => $validated['keys']['p256dh'],
                    'auth_token' => $validated['keys']['auth'],
                ]
            );
            
            return response()->json(['success' => true], 200);

        } catch (\Exception $e) {
            // Catat error yang sebenarnya ke dalam log untuk debug di masa depan
            Log::error('Gagal menyimpan push subscription: ' . $e->getMessage());
            return response()->json(['error' => 'Gagal menyimpan subscription.'], 500);
        }
    }

    /**
     * (Opsional) Menghapus "alamat" push notification saat pengguna logout.
     */
    public function destroy(Request $request)
    {
        $this->validate($request, ['endpoint' => 'required']);
        
        $request->user()->deletePushSubscription($request->endpoint);
        
        return response()->json(['success' => true], 200);
    }
}

