<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Notifications\NewActivityNotification;
use App\Notifications\ActivityDeletedNotification;
use Illuminate\Support\Facades\Notification;
use App\Events\NotificationDeleted;

class ScheduleController extends Controller
{
    public function index()
    {
        return Inertia::render('Schedules/Index', [
            'schedules' => Schedule::orderBy('date', 'desc')->orderBy('start_time', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'location' => 'nullable|string|max:255',
        ]);

        // Tampung jadwal baru ke variabel
        $schedule = Schedule::create($validated);

        // Kirim notifikasi ke semua pengguna
        Notification::send(User::all(), new NewActivityNotification($schedule));
        
        return redirect()->route('schedules.index')->with('success', 'Jadwal berhasil dibuat.');
    }
    
    public function update(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'location' => 'nullable|string|max:255',
        ]);
        $schedule->update($validated);
        return redirect()->route('schedules.index')->with('success', 'Jadwal berhasil diperbarui.');
    }

    public function destroy(Schedule $schedule)
    {
        // Cari notifikasi yang pesannya mengandung judul jadwal ini
        $notification = \Illuminate\Notifications\DatabaseNotification::where('data->message', 'like', "%{$schedule->title}%")->first();
        
        if ($notification) {
            // 2. Siarkan event penghapusan secara langsung
            broadcast(new NotificationDeleted($notification->id));
            // Hapus notifikasi dari database
            $notification->delete();
        }

        $schedule->delete();
        return redirect()->route('schedules.index')->with('success', 'Jadwal berhasil dihapus.');
    }
}

