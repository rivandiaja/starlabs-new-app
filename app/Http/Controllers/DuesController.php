<?php

namespace App\Http\Controllers;

use App\Models\Dues;
use Illuminate\Http\Request;

class DuesController extends Controller
{
    /**
     * Menyimpan tagihan kas baru ke database.
     */
    public function store(Request $request)
    {
        // Validasi data yang masuk dari form
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'period' => 'required|date_format:Y-m',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:paid,unpaid',
            'payment_date' => 'nullable|date',
        ]);

        // Buat record baru di tabel 'dues'
        Dues::create($validatedData);

        // Arahkan kembali ke halaman finance index
        return redirect()->route('finances.index')->with('success', 'Tagihan kas berhasil ditambahkan.');
    }

    /**
     * Memperbarui tagihan kas yang sudah ada di database.
     */
    public function update(Request $request, Dues $due)
    {
        // Validasi data yang masuk dari form
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'period' => 'required|date_format:Y-m',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:paid,unpaid',
            'payment_date' => 'nullable|date',
        ]);

        // Perbarui record yang dipilih
        $due->update($validatedData);
        
        // Arahkan kembali ke halaman finance index
        return redirect()->route('finances.index')->with('success', 'Tagihan kas berhasil diperbarui.');
    }

    /**
     * Menghapus tagihan kas dari database.
     */
    public function destroy(Dues $due)
    {
        $due->delete();

        return redirect()->route('finances.index')->with('success', 'Tagihan kas berhasil dihapus.');
    }
}