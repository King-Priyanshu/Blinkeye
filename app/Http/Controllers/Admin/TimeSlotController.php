<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\TimeSlot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimeSlotController extends Controller
{
    /**
     * List all time slots with filters.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $isManager = $user->role === 'hospital_manager' && $user->hospital_id;

        $query = TimeSlot::with('hospital', 'doctor')
            ->orderBy('hospital_id')
            ->orderBy('doctor_id')
            ->orderBy('day_of_week')
            ->orderBy('start_time');

        if ($isManager) {
            $query->where('hospital_id', $user->hospital_id);
        }

        if ($request->filled('hospital_id')) {
            $query->where('hospital_id', $request->hospital_id);
        }

        if ($request->filled('doctor_id')) {
            $query->where('doctor_id', $request->doctor_id);
        }

        if ($request->filled('day_of_week') && $request->day_of_week !== 'all') {
            $query->where('day_of_week', $request->day_of_week);
        }

        $timeSlots = $query->paginate(20)->withQueryString();

        // Get hospitals for filter
        $hospitals = Hospital::where('is_active', true)
            ->when($isManager, fn ($q) => $q->where('id', $user->hospital_id))
            ->get(['id', 'name']);

        return Inertia::render('Admin/TimeSlots/Index', [
            'timeSlots' => $timeSlots,
            'hospitals' => $hospitals,
            'filters' => [
                'hospital_id' => $request->hospital_id ?? '',
                'doctor_id' => $request->doctor_id ?? '',
                'day_of_week' => $request->day_of_week ?? 'all',
            ],
        ]);
    }

    /**
     * Show create form.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        $isManager = $user->role === 'hospital_manager' && $user->hospital_id;

        $hospitals = Hospital::where('is_active', true)
            ->when($isManager, fn ($q) => $q->where('id', $user->hospital_id))
            ->get(['id', 'name']);

        $doctors = Doctor::where('is_active', true)
            ->with('hospital:id,name')
            ->when($isManager, fn ($q) => $q->where('hospital_id', $user->hospital_id))
            ->get(['id', 'name', 'specialty', 'hospital_id']);

        return Inertia::render('Admin/TimeSlots/Create', [
            'hospitals' => $hospitals,
            'doctors' => $doctors,
            'preselected_hospital' => $isManager ? $user->hospital_id : null,
        ]);
    }

    /**
     * Store a new time slot.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'hospital_id' => 'required|exists:hospitals,id',
            'doctor_id' => 'nullable|exists:doctors,id',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'duration_minutes' => 'required|integer|min:10|max:120',
            'day_of_week' => 'nullable|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        TimeSlot::create($validated);

        return redirect()->route('admin.time-slots.index')
            ->with('success', 'Time slot created successfully.');
    }

    /**
     * Show edit form.
     */
    public function edit(Request $request, TimeSlot $timeSlot)
    {
        $user = $request->user();
        $isManager = $user->role === 'hospital_manager' && $user->hospital_id;

        // Ensure hospital manager can only edit their hospital's slots
        if ($isManager && $timeSlot->hospital_id !== $user->hospital_id) {
            abort(403);
        }

        $hospitals = Hospital::where('is_active', true)
            ->when($isManager, fn ($q) => $q->where('id', $user->hospital_id))
            ->get(['id', 'name']);

        $doctors = Doctor::where('is_active', true)
            ->with('hospital:id,name')
            ->when($isManager, fn ($q) => $q->where('hospital_id', $user->hospital_id))
            ->get(['id', 'name', 'specialty', 'hospital_id']);

        return Inertia::render('Admin/TimeSlots/Edit', [
            'timeSlot' => $timeSlot,
            'hospitals' => $hospitals,
            'doctors' => $doctors,
        ]);
    }

    /**
     * Update a time slot.
     */
    public function update(Request $request, TimeSlot $timeSlot)
    {
        $validated = $request->validate([
            'hospital_id' => 'required|exists:hospitals,id',
            'doctor_id' => 'nullable|exists:doctors,id',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'duration_minutes' => 'required|integer|min:10|max:120',
            'day_of_week' => 'nullable|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $timeSlot->update($validated);

        return redirect()->route('admin.time-slots.index')
            ->with('success', 'Time slot updated successfully.');
    }

    /**
     * Delete a time slot.
     */
    public function destroy(TimeSlot $timeSlot)
    {
        $timeSlot->delete();

        return redirect()->back()->with('success', 'Time slot deleted successfully.');
    }

    /**
     * Get doctors for a hospital (AJAX).
     */
    public function getDoctors(Request $request)
    {
        $request->validate([
            'hospital_id' => 'required|exists:hospitals,id',
        ]);

        $doctors = Doctor::where('hospital_id', $request->hospital_id)
            ->where('is_active', true)
            ->get(['id', 'name', 'specialty']);

        return response()->json(['doctors' => $doctors]);
    }

    /**
     * Get available slots for a date (AJAX).
     */
    public function getAvailableSlots(Request $request)
    {
        $request->validate([
            'hospital_id' => 'required|exists:hospitals,id',
            'doctor_id' => 'nullable|exists:doctors,id',
            'date' => 'required|date|after_or_equal:today',
        ]);

        $slots = TimeSlot::getAvailableSlotsForDate(
            $request->hospital_id,
            $request->doctor_id,
            $request->date
        );

        return response()->json(['slots' => $slots]);
    }
}
