<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FieldRecord;
use App\Models\ReturnVisit;
use App\Models\BibleStudent;
use App\Models\BibleStudy;
use App\Models\MonthlyReport;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashController extends Controller
{
    public function field() {
        $fieldRecords = FieldRecord::where('user_id', Auth::id())->get();
        return Inertia::render('FieldRecords/Index', [
            'fieldRecords' => $fieldRecords
        ]);
    }

    public function create() {
        return Inertia::render('FieldRecords/Create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'date' => 'required|date',
            'hours' => 'required|integer',
            'bible_studies' => 'nullable|integer',
            'placements' => 'nullable|string',
        ]);
        $validated['user_id'] = Auth::id();
        FieldRecord::create($validated);
        return redirect()->route('field-records')->with('success', 'Field record created successfully.');
    }

    public function edit($id) {
        $fieldRecord = FieldRecord::where('user_id', Auth::id())->findOrFail($id);
        return Inertia::render('FieldRecords/Edit', [
            'fieldRecord' => $fieldRecord
        ]);
    }

    public function update(Request $request, $id) {
        $fieldRecord = FieldRecord::where('user_id', Auth::id())->findOrFail($id);
        $validated = $request->validate([
            'date' => 'required|date',
            'hours' => 'required|integer',
            'bible_studies' => 'nullable|integer',
            'placements' => 'nullable|string',
        ]);
        $fieldRecord->update($validated);
        return redirect()->route('field-records')->with('success', 'Field record updated successfully.');
    }

    public function destroy($id) {
        $fieldRecord = FieldRecord::where('user_id', Auth::id())->findOrFail($id);
        $fieldRecord->delete();
        return redirect()->route('field-records')->with('success', 'Field record deleted successfully.');
    }

    public function index()
    {
        $user = auth()->user();
        $now = Carbon::now();
        $monthStart = $now->copy()->startOfMonth();
        $monthEnd = $now->copy()->endOfMonth();

        $fieldRecords = FieldRecord::where('user_id', $user->id)
            ->whereBetween('date', [$monthStart->toDateString(), $monthEnd->toDateString()])
            ->get();
        $returnVisits = ReturnVisit::where('user_id', $user->id)
            ->where(function($q) use ($monthStart, $monthEnd) {
                $q->whereNull('last_visit_date')
                  ->orWhereBetween('last_visit_date', [$monthStart->toDateString(), $monthEnd->toDateString()]);
            })
            ->get();
        $bibleStudents = BibleStudent::where('user_id', $user->id)->get();
        $bibleStudies = BibleStudy::where('user_id', $user->id)
            ->whereBetween('date', [$monthStart->toDateString(), $monthEnd->toDateString()])
            ->get();

        $analytics = [
            'fieldRecords' => [
                'count' => $fieldRecords->count(),
                'hours' => $fieldRecords->sum('hours'),
            ],
            'returnVisits' => [
                'count' => $returnVisits->count(),
                'active' => $returnVisits->where('is_active', true)->count(),
            ],
            'bibleStudents' => [
                'count' => $bibleStudents->count(),
                'active' => $bibleStudents->where('is_active', true)->count(),
            ],
            'bibleStudies' => [
                'count' => $bibleStudies->count(),
            ],
            'monthName' => $now->format('F Y'),
        ];

        $monthlyReports = MonthlyReport::where('user_id', $user->id)
            ->orderBy('month', 'desc')
            ->get(['month', 'field_hours', 'return_visits', 'bible_studies', 'bible_students', 'notes']);

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'analytics' => $analytics,
            'monthlyReports' => $monthlyReports,
        ]);
    }
}
