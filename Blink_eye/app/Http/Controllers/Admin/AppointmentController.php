<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * List all appointments with stats, search, and date filters.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $isManager = $user->role === 'hospital_manager' && $user->hospital_id;

        $query = Appointment::with('hospital', 'doctor')
            ->orderByDesc('appointment_date')
            ->orderByDesc('appointment_time');

        // Hospital managers only see their hospital's appointments
        if ($isManager) {
            $query->where('hospital_id', $user->hospital_id);
        }

        // Status filter
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Date range filter
        if ($request->filled('date_from')) {
            $query->whereDate('appointment_date', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->whereDate('appointment_date', '<=', $request->date_to);
        }

        // Search by patient name or phone
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('patient_name', 'like', "%{$search}%")
                    ->orWhere('patient_phone', 'like', "%{$search}%")
                    ->orWhere('patient_email', 'like', "%{$search}%");
            });
        }

        $appointments = $query->paginate(20)->withQueryString();

        // Stats — scoped to hospital manager if applicable
        $statsQuery = Appointment::query();
        if ($isManager) {
            $statsQuery->where('hospital_id', $user->hospital_id);
        }

        $stats = [
            'today' => (clone $statsQuery)->today()->count(),
            'pending' => (clone $statsQuery)->where('status', 'pending')->count(),
            'confirmed' => (clone $statsQuery)->where('status', 'confirmed')->count(),
            'completed' => (clone $statsQuery)->where('status', 'completed')->count(),
            'cancelled' => (clone $statsQuery)->where('status', 'cancelled')->count(),
            'total' => (clone $statsQuery)->count(),
        ];

        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments,
            'currentStatus' => $request->status ?? 'all',
            'stats' => $stats,
            'filters' => [
                'search' => $request->search ?? '',
                'date_from' => $request->date_from ?? '',
                'date_to' => $request->date_to ?? '',
            ],
        ]);
    }

    /**
     * Show a single appointment detail.
     */
    public function show(Appointment $appointment)
    {
        $appointment->load('hospital', 'doctor');

        return Inertia::render('Admin/Appointments/Show', [
            'appointment' => $appointment,
        ]);
    }

    /**
     * Update appointment status (confirm, cancel, complete).
     */
    public function updateStatus(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        $appointment->update($validated);

        return redirect()->back()->with('success', 'Appointment status updated.');
    }

    /**
     * Reschedule an appointment (change date/time).
     */
    public function reschedule(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required|date_format:H:i',
        ]);

        $appointment->update($validated);

        return redirect()->back()->with('success', 'Appointment rescheduled successfully.');
    }

    /**
     * Delete an appointment.
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return redirect()->back()->with('success', 'Appointment deleted successfully.');
    }
}
