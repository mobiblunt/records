<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReturnVisit;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ReturnVisitController extends Controller
{
    public function index() {
        $returnVisits = ReturnVisit::where('user_id', Auth::id())->get();
        return Inertia::render('ReturnVisits/index', [
            'returnVisits' => $returnVisits
        ]);
    }

    public function create() {
        return Inertia::render('ReturnVisits/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'mobile' => 'nullable|string',
            'placement' => 'nullable|string',
            'last_visit_date' => 'nullable|date',
            'notes' => 'nullable|string',
            'is_active' => 'boolean',
            'next_visit_date' => 'nullable|date',
            'visit_count' => 'nullable|integer',
            'preferred_days' => 'nullable|string',
            'status' => 'nullable|string',
        ]);
        $validated['user_id'] = Auth::id();
        ReturnVisit::create($validated);
        return redirect()->route('return-visits.index')->with('success', 'Return visit created successfully.');
    }

    public function edit($id) {
        $returnVisit = ReturnVisit::where('user_id', Auth::id())->findOrFail($id);
        return Inertia::render('ReturnVisits/edit', [
            'returnVisit' => $returnVisit
        ]);
    }

    public function update(Request $request, $id) {
        $returnVisit = ReturnVisit::where('user_id', Auth::id())->findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string',
            'address' => 'nullable|string',
            'mobile' => 'nullable|string',
            'placement' => 'nullable|string',
            'last_visit_date' => 'nullable|date',
            'notes' => 'nullable|string',
            'is_active' => 'boolean',
            'next_visit_date' => 'nullable|date',
            'visit_count' => 'nullable|integer',
            'preferred_days' => 'nullable|string',
            'status' => 'nullable|string',
        ]);
        $returnVisit->update($validated);
        return redirect()->route('return-visits.index')->with('success', 'Return visit updated successfully.');
    }

    public function destroy($id) {
        $returnVisit = ReturnVisit::where('user_id', Auth::id())->findOrFail($id);
        $returnVisit->delete();
        return redirect()->route('return-visits.index')->with('success', 'Return visit deleted successfully.');
    }
}
