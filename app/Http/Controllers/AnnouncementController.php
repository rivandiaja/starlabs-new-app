<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User; // 1. Import User
use App\Notifications\NewActivityNotification; // 2. Import Notifikasi
use Illuminate\Support\Facades\Notification; // 3. Import Notifikasi
use App\Events\NotificationDeleted; // 4. Import Event Hapus

class AnnouncementController extends Controller
{
    public function index()
    {
        return Inertia::render('Announcements/Index', [
            'announcements' => Announcement::with('user:id,name')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'level' => 'required|in:info,success,warning,danger',
        ]);

        // Tampung pengumuman yang baru dibuat ke dalam variabel
        $announcement = $request->user()->announcements()->create($validated);

        // --- 5. TAMBAHKAN LOGIKA PENGIRIMAN NOTIFIKASI ---
        // Kirim notifikasi ke semua pengguna
        Notification::send(User::all(), new NewActivityNotification($announcement));

        return redirect()->route('announcements.index')->with('success', 'Pengumuman berhasil dibuat.');
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'level' => 'required|in:info,success,warning,danger',
        ]);

        $announcement->update($validated);

        return redirect()->route('announcements.index')->with('success', 'Pengumuman berhasil diperbarui.');
    }

    public function destroy(Announcement $announcement)
    {
        // --- 6. TAMBAHKAN LOGIKA PENGHAPUSAN NOTIFIKASI ---
        // Cari SEMUA notifikasi yang terkait dengan pengumuman ini
        $notifications = \Illuminate\Notifications\DatabaseNotification::where('data->activity_type', \App\Models\Announcement::class)
            ->where('data->activity_id', $announcement->id)
            ->get();
        
        // Ulangi dan siarkan penghapusan untuk setiap notifikasi
        foreach ($notifications as $notification) {
            broadcast(new NotificationDeleted($notification->id));
            $notification->delete();
        }

        $announcement->delete();
        return redirect()->route('announcements.index')->with('success', 'Pengumuman berhasil dihapus.');
    }
}
