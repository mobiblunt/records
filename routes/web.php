<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashController;
use App\Http\Controllers\ReturnVisitController;
use App\Http\Controllers\BibleStudentController;
use App\Http\Controllers\BibleStudyController;

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

Route::get('/dashboard', [DashController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    
    Route::get('/field-records', [DashController::class, 'field'])->name('field-records');
    Route::get('/field_reports/create', [DashController::class, 'create'])->name('field-records.create');
    Route::post('/field-records', [DashController::class, 'store'])->name('field-records.store');
    Route::get('/field-records/{id}/edit', [DashController::class, 'edit'])->name('field-records.edit');
    Route::put('/field-records/{id}', [DashController::class, 'update'])->name('field-records.update');
    Route::delete('/field-records/{id}', [DashController::class, 'destroy'])->name('field-records.destroy');
    
    Route::get('/bible_studies', [DashController::class, 'bibleStudies'])->name('bible_studies');
    Route::get('/bible_students', [DashController::class, 'bibleStudents'])->name('bible_students');
    Route::get('/return_visits', [DashController::class, 'returnVisits'])->name('return_visits');
    Route::get('/reports', [DashController::class, 'reports'])->name('reports');

    Route::get('/return-visits', [ReturnVisitController::class, 'index'])->name('return-visits.index');
    Route::get('/return-visits/create', [ReturnVisitController::class, 'create'])->name('return-visits.create');
    Route::post('/return-visits', [ReturnVisitController::class, 'store'])->name('return-visits.store');
    Route::get('/return-visits/{id}/edit', [ReturnVisitController::class, 'edit'])->name('return-visits.edit');
    Route::put('/return-visits/{id}', [ReturnVisitController::class, 'update'])->name('return-visits.update');
    Route::delete('/return-visits/{id}', [ReturnVisitController::class, 'destroy'])->name('return-visits.destroy');

    Route::get('/bible-students', [BibleStudentController::class, 'index'])->name('bible-students.index');
    Route::get('/bible-students/create', [BibleStudentController::class, 'create'])->name('bible-students.create');
    Route::post('/bible-students', [BibleStudentController::class, 'store'])->name('bible-students.store');
    Route::get('/bible-students/{id}/edit', [BibleStudentController::class, 'edit'])->name('bible-students.edit');
    Route::put('/bible-students/{id}', [BibleStudentController::class, 'update'])->name('bible-students.update');
    Route::delete('/bible-students/{id}', [BibleStudentController::class, 'destroy'])->name('bible-students.destroy');

    Route::get('/bible-studies', [BibleStudyController::class, 'index'])->name('bible-studies.index');
    Route::get('/bible-studies/create', [BibleStudyController::class, 'create'])->name('bible-studies.create');
    Route::post('/bible-studies', [BibleStudyController::class, 'store'])->name('bible-studies.store');
    Route::get('/bible-studies/{id}/edit', [BibleStudyController::class, 'edit'])->name('bible-studies.edit');
    Route::put('/bible-studies/{id}', [BibleStudyController::class, 'update'])->name('bible-studies.update');
    Route::delete('/bible-studies/{id}', [BibleStudyController::class, 'destroy'])->name('bible-studies.destroy');
});

require __DIR__.'/auth.php';
