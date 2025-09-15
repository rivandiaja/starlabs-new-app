<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\User;
use App\Notifications\NewActivityNotification;
use App\Notifications\ActivityDeletedNotification;
use Illuminate\Support\Facades\Notification;
use App\Events\NotificationDeleted;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Events/Index', [
            'events' => Event::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Events/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string|max:255',
            'tag' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5000',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('events', 'public');
        }

        // Tampung event yang baru dibuat ke dalam variabel
        $event = Event::create($validated);

        // Kirim notifikasi ke semua pengguna
        Notification::send(User::all(), new NewActivityNotification($event));

        return redirect()->route('events.index')->with('success', 'Event created successfully.');
    }
    
    public function edit(Event $event)
    {
        return Inertia::render('Events/Edit', ['event' => $event]);
    }

    public function show(Event $event)
    {
        return Inertia::render('Events/Show', ['event' => $event]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string|max:255',
            'tag' => 'nullable|string|max:50',
        ]);

        if ($request->hasFile('image')) {
            $request->validate(['image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048']);
            if ($event->image) {
                Storage::disk('public')->delete($event->image);
            }
            $validated['image'] = $request->file('image')->store('events', 'public');
        }
        
        $event->update($validated);
        return redirect()->route('events.index')->with('success', 'Event updated successfully.');
    }
    
    public function archive()
    {
        return Inertia::render('Events/Archive', [
            'events' => Event::latest()->get(),
        ]);
    }

    public function destroy(Event $event)
    {
        // Cari notifikasi yang pesannya mengandung judul event ini
        $notification = \Illuminate\Notifications\DatabaseNotification::where('data->message', 'like', "%{$event->title}%")->first();
        
        if ($notification) {
            // 2. Siarkan event penghapusan secara langsung
            broadcast(new NotificationDeleted($notification->id));
            // Hapus notifikasi dari database
            $notification->delete();
        }

        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }
        $event->delete();

        return redirect()->route('events.index')->with('success', 'Event deleted successfully.');
    }
}

