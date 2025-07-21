<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BibleStudy;
use App\Models\BibleStudent;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BibleStudyController extends Controller
{
    public function index() {
        $bibleStudies = BibleStudy::where('user_id', Auth::id())->get();
        return Inertia::render('BibleStudies/index', [
            'bibleStudies' => $bibleStudies
        ]);
    }

    public function create() {
        $bibleStudents = BibleStudent::where('user_id', Auth::id())->get();
        return Inertia::render('BibleStudies/create', [
            'bibleStudents' => $bibleStudents
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'user_id' => 'nullable|integer',
            'bible_student_id' => 'nullable|integer',
            'name' => 'required|string',
            'date' => 'required|date',
            'publication' => 'required|string',
            'notes' => 'nullable|string',
        ]);
        $validated['user_id'] = Auth::id();
        BibleStudy::create($validated);
        return redirect()->route('bible-studies.index')->with('success', 'Bible study created successfully.');
    }

    public function edit($id) {
        $bibleStudy = BibleStudy::where('user_id', Auth::id())->findOrFail($id);
        $bibleStudents = BibleStudent::where('user_id', Auth::id())->get();
        return Inertia::render('BibleStudies/edit', [
            'bibleStudy' => $bibleStudy,
            'bibleStudents' => $bibleStudents
        ]);
    }

    public function update(Request $request, $id) {
        $bibleStudy = BibleStudy::where('user_id', Auth::id())->findOrFail($id);
        $validated = $request->validate([
            'bible_student_id' => 'nullable|integer',
            'name' => 'required|string',
            'date' => 'required|date',
            'publication' => 'required|string',
            'notes' => 'nullable|string',
        ]);
        $bibleStudy->update($validated);
        return redirect()->route('bible-studies.index')->with('success', 'Bible study updated successfully.');
    }

    public function destroy($id) {
        $bibleStudy = BibleStudy::where('user_id', Auth::id())->findOrFail($id);
        $bibleStudy->delete();
        return redirect()->route('bible-studies.index')->with('success', 'Bible study deleted successfully.');
    }
}
