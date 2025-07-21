<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BibleStudent;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BibleStudentController extends Controller
{
    public function index() {
        $bibleStudents = BibleStudent::where('user_id', Auth::id())->get();
        return Inertia::render('BibleStudents/index', [
            'bibleStudents' => $bibleStudents
        ]);
    }

    public function create() {
        return Inertia::render('BibleStudents/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'address' => 'nullable|string',
            'mobile' => 'nullable|string',
            'preferred_days' => 'nullable|string',
            'last_study_date' => 'nullable|date',
            'next_study_date' => 'nullable|date',
            'notes' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $validated['user_id'] = Auth::id();
        BibleStudent::create($validated);
        return redirect()->route('bible-students.index')->with('success', 'Bible student created successfully.');
    }

    public function edit($id) {
        $bibleStudent = BibleStudent::where('user_id', Auth::id())->findOrFail($id);
        return Inertia::render('BibleStudents/edit', [
            'bibleStudent' => $bibleStudent
        ]);
    }

    public function update(Request $request, $id) {
        $bibleStudent = BibleStudent::where('user_id', Auth::id())->findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string',
            'address' => 'nullable|string',
            'mobile' => 'nullable|string',
            'preferred_days' => 'nullable|string',
            'last_study_date' => 'nullable|date',
            'next_study_date' => 'nullable|date',
            'notes' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $bibleStudent->update($validated);
        return redirect()->route('bible-students.index')->with('success', 'Bible student updated successfully.');
    }

    public function destroy($id) {
        $bibleStudent = BibleStudent::where('user_id', Auth::id())->findOrFail($id);
        $bibleStudent->delete();
        return redirect()->route('bible-students.index')->with('success', 'Bible student deleted successfully.');
    }
}
