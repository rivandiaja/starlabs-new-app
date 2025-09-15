<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Menampilkan halaman manajemen pesan kontak untuk admin.
     */
    public function index()
    {
        return Inertia::render('ContactMessages/Index', [
            'messages' => ContactMessage::latest()->get(),
        ]);
    }

    /**
     * Menyimpan pesan baru dari formulir kontak publik.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Pesan Anda telah berhasil terkirim!');
    }

    /**
     * Menghapus pesan kontak.
     */
    public function destroy(ContactMessage $message)
    {
        $message->delete();
        return redirect()->route('contact.messages.index')->with('success', 'Pesan berhasil dihapus.');
    }
}
