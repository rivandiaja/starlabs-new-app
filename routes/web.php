<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\DuesController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\GoogleDriveController;
use App\Http\Controllers\MeetController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PushSubscriptionController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\RegistrationFormController;
use App\Http\Controllers\PublicRegistrationController;
use App\Http\Controllers\RegistrationSubmissionController;
use App\Http\Controllers\AcademyController;
use App\Http\Controllers\SyllabusController;

/*
|--------------------------------------------------------------------------
| Rute Publik (Bisa Diakses Siapapun)
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/auth/google/redirect', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');

Route::get('/register/{form}', [PublicRegistrationController::class, 'show'])->name('register.show');
Route::post('/register/{form}', [PublicRegistrationController::class, 'store'])->name('register.store');

Route::get('/academy', [HomeController::class, 'academy'])->name('academy.index');
Route::get('/academy/{academy}/{division:slug}', [SyllabusController::class, 'showPublic'])->name('academy.division.show');

// Rute statis
Route::get('/contact', function () {return redirect('/#contact');})->name('contact');
Route::get('/bph', fn() => Inertia::render('home/components/BPH'))->name('bph');
Route::get('/jaringan', fn() => Inertia::render('home/components/Jaringan'))->name('jaringan');
Route::get('/pemrograman', fn() => Inertia::render('home/components/Pemrograman'))->name('pemrograman');
Route::get('/multimedia', fn() => Inertia::render('home/components/Multimedia'))->name('multimedia');
Route::get('/office', fn() => Inertia::render('home/components/Office'))->name('office');
Route::get('/eksternal', fn() => Inertia::render('home/components/Eksternal'))->name('eksternal');
Route::get('/privacy-policy', fn() => Inertia::render('home/components/PrivacyPolicy'))->name('privacy.policy');
Route::get('/terms-of-service', fn() => Inertia::render('home/components/TermsOfService'))->name('terms.service');
Route::get('/careers', fn() => Inertia::render('home/components/Careers'))->name('careers');


/*
|--------------------------------------------------------------------------
| Rute Terproteksi (Wajib Login)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    
    // --- Rute Halaman Admin ---
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/drive-library', fn() => Inertia::render('DriveLibrary'))->name('drive.library');
    Route::get('/finances/distribution', [FinanceController::class, 'distribution'])->name('finances.distribution');
    Route::get('/meet', fn() => Inertia::render('Meet/Index'))->name('meet.index');
    Route::get('/contact-messages', [ContactController::class, 'index'])->name('contact.messages.index');
    Route::delete('/contact-messages/{message}', [ContactController::class, 'destroy'])->name('contact.messages.destroy');
    Route::get('/registration-forms/{form}/submissions', [RegistrationSubmissionController::class, 'index'])->name('registration-forms.submissions.index');
    Route::get('/registration-forms/{form}/submissions/export', [RegistrationSubmissionController::class, 'export'])->name('registration-forms.submissions.export');
    Route::delete('/submissions/{submission}', [RegistrationSubmissionController::class, 'destroy'])->name('submissions.destroy');

    // --- Rute Notifikasi ---
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markasread');
    Route::post('/push-subscriptions', [PushSubscriptionController::class, 'store'])->name('push.store');
    Route::delete('/push-subscriptions', [PushSubscriptionController::class, 'destroy'])->name('push.destroy');

    // --- Rute Resource untuk CRUD ---
    Route::resource('events', EventController::class)->except(['show']);
    Route::resource('users', UserController::class);
    Route::resource('finances', FinanceController::class)->except(['show']);
    Route::resource('dues', DuesController::class);
    Route::resource('schedules', ScheduleController::class);
    Route::resource('announcements', AnnouncementController::class)->except(['create', 'edit', 'show']);
    Route::resource('registration-forms', RegistrationFormController::class)->except(['create', 'edit', 'show']);
    Route::resource('academies', AcademyController::class);
    
    // --- PERBAIKAN: Rute untuk Manajemen Silabus ---
    Route::get('/academies/{academy}/divisions/{division}/syllabuses', [SyllabusController::class, 'index'])->name('academies.syllabuses.index');
    Route::post('/academies/{academy}/syllabuses', [SyllabusController::class, 'store'])->name('academies.syllabuses.store');
    Route::patch('/syllabuses/{syllabus}', [SyllabusController::class, 'update'])->name('syllabuses.update');
    Route::delete('/syllabuses/{syllabus}', [SyllabusController::class, 'destroy'])->name('syllabuses.destroy');

    // --- Rute API untuk Google Drive (diproteksi) ---
    Route::post('/api/drive-library/upload', [GoogleDriveController::class, 'uploadFile']);
    Route::get('/api/drive-library', [GoogleDriveController::class, 'listFiles']);
    Route::delete('/api/drive-library/delete/{fileId}', [GoogleDriveController::class, 'deleteFile']);
    Route::patch('/api/drive-library/rename/{fileId}', [GoogleDriveController::class, 'renameFile']);
    Route::get('/drive-library/download/{fileId}', [GoogleDriveController::class, 'downloadFile'])->name('drive.download');

});

/*
|--------------------------------------------------------------------------
| Rute Publik dengan Parameter (Diletakkan di Bawah)
|--------------------------------------------------------------------------
*/
Route::get('/events/archive', [EventController::class, 'archive'])->name('events.archive');
Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';