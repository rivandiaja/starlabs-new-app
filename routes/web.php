<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;



Route::get('/', function () {
    return Inertia::render('home/Home');
})->name('home');

Route::get('/bph', function () {
    return Inertia::render('home/components/BPH'); 
});
Route::get('/jaringan', function () {
    return Inertia::render('home/components/Jaringan'); 
});
Route::get('/pemrograman', function () {
    return Inertia::render('home/components/Pemrograman'); 
});
Route::get('/multimedia', function () {
    return Inertia::render('home/components/Multimedia'); 
});
Route::get('/office', function () {
    return Inertia::render('home/components/Office'); 
});
Route::get('/eksternal', function () {
    return Inertia::render('home/components/Eksternal'); 
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // User Management Routes
    Route::resource('users', UserController::class);


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
