<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\MonthlyReport;

class MonthlyReportController extends Controller
{
    public function history(Request $request)
    {
        $userId = Auth::id();
        $reports = MonthlyReport::where('user_id', $userId)
            ->orderBy('month', 'desc')
            ->get(['month', 'field_hours', 'return_visits', 'bible_studies', 'placements', 'notes']);
        return $reports;
    }
}
