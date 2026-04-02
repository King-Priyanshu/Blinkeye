<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDoctorRequest;
use App\Http\Requests\Admin\UpdateDoctorRequest;
use App\Models\Doctor;
use App\Models\Hospital;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctors = Doctor::with('hospital')
            ->orderBy('name')
            ->paginate(20)
            ->through(fn ($doctor) => [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'specialty' => $doctor->specialty,
                'hospital_name' => $doctor->hospital ? $doctor->hospital->name : '-',
                'is_active' => $doctor->is_active,
            ]);

        return Inertia::render('Admin/Doctors/Index', [
            'doctors' => $doctors,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hospitals = Hospital::where('is_active', true)->get();

        return Inertia::render('Admin/Doctors/Create', [
            'hospitals' => $hospitals->map(fn ($hospital) => ['id' => $hospital->id, 'name' => $hospital->name]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('doctors', 'public');
        }

        Doctor::create($validated);

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Doctor $doctor)
    {
        $hospitals = Hospital::where('is_active', true)->get();

        return Inertia::render('Admin/Doctors/Edit', [
            'doctor' => $doctor,
            'hospitals' => $hospitals->map(fn ($hospital) => ['id' => $hospital->id, 'name' => $hospital->name]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorRequest $request, Doctor $doctor)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            if ($doctor->image) {
                Storage::disk('public')->delete($doctor->image);
            }
            $validated['image'] = $request->file('image')->store('doctors', 'public');
        }

        $doctor->update($validated);

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        if ($doctor->image) {
            Storage::disk('public')->delete($doctor->image);
        }

        $doctor->delete();

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor deleted successfully.');
    }
}
