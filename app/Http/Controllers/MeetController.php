<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule; // Import model Schedule
use Google_Client;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Carbon\Carbon;
use Inertia\Inertia;

class MeetController extends Controller
{
    /**
     * Menampilkan halaman manajemen Google Meet.
     */
    public function index()
    {
        // Ambil semua jadwal yang memiliki link meet, urutkan dari yang terbaru
        $schedules = Schedule::whereNotNull('meet_link')
                            ->latest('date')
                            ->get();

        return Inertia::render('Meet/Index', [
            'schedules' => $schedules,
        ]);
    }

    /**
     * Membuat rapat Google Meet baru dan menyimpannya sebagai jadwal.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        try {
            $client = $this->getGoogleClient();
            $calendarService = new Google_Service_Calendar($client);
            $calendarId = 'primary';

            // Gabungkan tanggal dan waktu
            $startDateTime = Carbon::parse($validated['date'] . ' ' . $validated['start_time']);
            $endDateTime = Carbon::parse($validated['date'] . ' ' . $validated['end_time']);

            $event = new Google_Service_Calendar_Event([
                'summary' => $validated['title'],
                'description' => $validated['description'],
                'start' => ['dateTime' => $startDateTime->toRfc3339String()],
                'end' => ['dateTime' => $endDateTime->toRfc3339String()],
                'conferenceData' => [
                    'createRequest' => [
                        'requestId' => uniqid(),
                        'conferenceSolutionKey' => ['type' => 'hangoutsMeet'],
                    ],
                ],
            ]);

            $createdEvent = $calendarService->events->insert($calendarId, $event, ['conferenceDataVersion' => 1]);
            
            // Simpan jadwal ke database kita
            Schedule::create(array_merge($validated, [
                'meet_link' => $createdEvent->hangoutLink,
            ]));
            
            return redirect()->route('meet.index')->with('success', 'Rapat berhasil dibuat.');

        } catch (\Exception $e) {
            return back()->withErrors(['google' => 'Gagal membuat rapat: ' . $e->getMessage()]);
        }
    }

    /**
     * Helper untuk inisialisasi Google Client.
     */
    private function getGoogleClient()
    {
        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $client->setAccessType('offline');

        $refreshToken = env('GOOGLE_DRIVE_REFRESH_TOKEN');
        if (!$refreshToken) {
            throw new \Exception('Refresh token Google tidak ditemukan di file .env');
        }
        
        $client->fetchAccessTokenWithRefreshToken($refreshToken);
        return $client;
    }
}

