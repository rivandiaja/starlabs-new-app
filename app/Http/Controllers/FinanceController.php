<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use App\Models\Dues;
use App\Models\User; // Import model User
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class FinanceController extends Controller
{
    /**
     * Menampilkan halaman utama manajemen keuangan.
     */
    public function index()
    {
        // Ambil data dengan relasi yang dibutuhkan
        $finances = Finance::latest()->get();
        $dues = Dues::with('user')->latest('period')->get(); // Eager load relasi 'user'
        $users = User::orderBy('name')->get(['id', 'name']); // Ambil semua user untuk form

        // Kalkulasi Pemasukan
        $generalIncome = $finances->where('type', 'income')->sum('amount');
        $paidDuesTotal = $dues->where('status', 'paid')->sum('amount');
        $totalIncome = $generalIncome + $paidDuesTotal;
        
        // Kalkulasi Pengeluaran & Saldo
        $totalExpense = $finances->where('type', 'expense')->sum('amount');
        $balance = $totalIncome - $totalExpense;

        // Siapkan data kumulasi kas
        $paidDues = $dues->where('status', 'paid');
        $duesSummary = [
            'totalPaid' => $paidDues->sum('amount'),
            'paidCount' => $paidDues->count(),
            'totalCount' => $dues->count(),
        ];
        
        return Inertia::render('Finances/Index', [
            'finances' => $finances,
            'dues' => $dues,
            'users' => $users, // Kirim data user untuk dropdown
            'summary' => [
                'income' => $totalIncome,
                'expense' => $totalExpense,
                'balance' => $balance,
            ],
            'duesSummary' => $duesSummary,
        ]);
    }

    /**
     * Menyimpan data transaksi baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0',
        ]);

        Finance::create($request->all());

        return redirect()->route('finances.index')->with('success', 'Transaksi berhasil ditambahkan.');
    }

    /**
     * Memperbarui data transaksi.
     */
    public function update(Request $request, Finance $finance)
    {
        $request->validate([
            'date' => 'required|date',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0',
        ]);

        $finance->update($request->all());

        return redirect()->route('finances.index')->with('success', 'Transaksi berhasil diperbarui.');
    }

    /**
     * Menghapus data transaksi.
     */
    public function destroy(Finance $finance)
    {
        $finance->delete();

        return redirect()->route('finances.index')->with('success', 'Transaksi berhasil dihapus.');
    }

public function distribution()
{
    // Ambil data pemasukan umum & kas lunas
    $generalIncome = Finance::where('type', 'income')->sum('amount');
    $paidDuesTotal = Dues::where('status', 'paid')->sum('amount');
    $totalIncome = $generalIncome + $paidDuesTotal;

    // Ambil data pengeluaran & hitung saldo
    $totalExpense = Finance::where('type', 'expense')->sum('amount');
    $balance = $totalIncome - $totalExpense;

    // Siapkan data untuk chart
    $incomeByCategory = Finance::where('type', 'income')
        ->select('category', \DB::raw('SUM(amount) as total'))
        ->groupBy('category')
        ->pluck('total', 'category');
    
    if ($paidDuesTotal > 0) {
        $incomeByCategory['Kas'] = $paidDuesTotal;
    }
    
    return Inertia::render('Finances/Distribution', [
        // Kirim semua data yang dibutuhkan
        'summary' => [
            'income' => $totalIncome,
            'expense' => $totalExpense,
            'balance' => $balance,
        ],
        'incomeByCategory' => $incomeByCategory,
    ]);
}
}