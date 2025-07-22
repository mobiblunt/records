<?php

use App\Http\Controllers\MonthlyReportController;
use App\Models\MonthlyReport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/monthly-report-summary', function (Request $request) {
    $userId = Auth::id();
    $lastMonth = Carbon::now()->subMonth()->format('Y-m');
    $report = MonthlyReport::where('user_id', $userId)
        ->where('month', $lastMonth)
        ->first();
    if (!$report) {
        return [
            'month' => $lastMonth,
            'field_hours' => 0,
            'return_visits' => 0,
            'bible_studies' => 0,
            'bible_students' => 0,
        ];
    }
    return [
        'month' => $report->month,
        'field_hours' => $report->field_hours,
        'return_visits' => $report->return_visits,
        'bible_studies' => $report->bible_studies,
        'bible_students' => $report->bible_students,
    ];
});
Route::middleware('auth')->get('/monthly-report-history', [MonthlyReportController::class, 'history']);
