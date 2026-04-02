<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Disease;
use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Show the public booking form.
     */
    public function create(Request $request)
    {
        $hospitals = Hospital::where('is_active', true)->get(['id', 'name']);
        $doctors = Doctor::where('is_active', true)->with('hospital:id,name')->get(['id', 'name', 'specialty', 'hospital_id']);

        // Get common reasons for visit from services and diseases
        $reasons = collect();
        $services = Service::where('is_active', true)->pluck('name');
        $diseases = Disease::where('is_active', true)->pluck('name');
        $reasons = $services->merge($diseases)->unique()->sort()->values();

        return Inertia::render('Frontend/BookAppointment', [
            'hospitals' => $hospitals,
            'doctors' => $doctors,
            'reasons' => $reasons,
            'preselected_hospital' => $request->query('hospital_id', ''),
        ]);
    }

    /**
     * Store a new public appointment (no login required).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'hospital_id' => 'required|exists:hospitals,id',
            'doctor_id' => 'nullable|exists:doctors,id',
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required|date_format:H:i',
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'required|string|max:20',
            'patient_email' => 'nullable|email|max:255',
            'notes' => 'nullable|string|max:1000',
            'reason' => 'nullable|string|max:255',
        ]);

        $validated['status'] = 'pending';

        // Basic slot conflict check
        $conflict = Appointment::where('hospital_id', $validated['hospital_id'])
            ->where('appointment_date', $validated['appointment_date'])
            ->where('appointment_time', $validated['appointment_time'])
            ->whereNotNull('doctor_id')
            ->where('doctor_id', $validated['doctor_id'] ?? null)
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($conflict && $validated['doctor_id']) {
            return redirect()->back()
                ->withErrors(['appointment_time' => 'This doctor already has an appointment at this time. Please choose a different time slot.'])
                ->withInput();
        }

        Appointment::create($validated);

        return redirect()->back()->with('success', 'Appointment booked successfully! Our team will contact you shortly to confirm.');
    }
}
