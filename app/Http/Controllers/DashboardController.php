<?php

namespace App\Http\Controllers;

use App\Models\Dues;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Schedule; // 1. Import model Schedule
use Carbon\Carbon; // Import Carbon untuk tanggal

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $allUserDues = Dues::where('user_id', $userId)->orderBy('period', 'asc')->get();
        
        // Ambil SEMUA tagihan yang belum lunas
        $unpaidDues = $allUserDues->where('status', 'unpaid');
        // Ambil SEMUA tagihan yang sudah lunas
        $paidDues = $allUserDues->where('status', 'paid');

        $billingSummary = [
            'totalBill' => $unpaidDues->sum('amount'),
            'totalPaid' => $paidDues->sum('amount'),
            'overallTotal' => $allUserDues->sum('amount'),
            'unpaidDetails' => $unpaidDues->values(), // Daftar belum lunas
            'paidDetails' => $paidDues->values(),   // Daftar sudah lunas
        ];
        
        $events = Event::orderBy('date', 'asc')->get(['id', 'title', 'date']);
        // Ambil jadwal kegiatan HANYA untuk hari ini
        // Ambil jadwal yang akan datang (dari hari ini dan seterusnya)
        // Ambil jadwal yang akan datang (dari hari ini dan seterusnya)
        $schedules = Schedule::orderBy('date', 'asc')->get();
        $upcomingSchedules = Schedule::whereDate('date', '>=', Carbon::today())
                                     ->orderBy('date', 'asc')
                                     ->orderBy('start_time', 'asc')
                                     ->get();

        // Ambil 5 jadwal terakhir yang sudah selesai
        $pastSchedules = Schedule::whereDate('date', '<', Carbon::today())
                                 ->orderBy('date', 'desc')
                                 ->orderBy('start_time', 'desc')
                                 ->take(5)
                                 ->get();
        return Inertia::render('dashboard', [
            'billingSummary' => $billingSummary,
            'events' => $events,
            'upcomingSchedules' => $upcomingSchedules, // Kirim jadwal akan datang
            'pastSchedules' => $pastSchedules,       // Kirim jadwal selesai
            'schedules' => $schedules,
        ]);
    }
}