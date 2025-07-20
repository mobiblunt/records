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
}
