<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/field_reports', [DashController::class, 'field'])->name('field_reports');
    Route::get('/field-records', [DashController::class, 'field'])->name('field-records');
    Route::get('/field_reports/create', [DashController::class, 'create'])->name('field-records.create');
    Route::post('/field-records', [DashController::class, 'store'])->name('field-records.store');
    
    Route::get('/bible_studies', [DashController::class, 'bibleStudies'])->name('bible_studies');
    Route::get('/bible_students', [DashController::class, 'bibleStudents'])->name('bible_students');
    Route::get('/return_visits', [DashController::class, 'returnVisits'])->name('return_visits');
    Route::get('/reports', [DashController::class, 'reports'])->name('reports');
});

require __DIR__.'/auth.php';
