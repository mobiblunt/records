<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FieldRecord;
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
}
