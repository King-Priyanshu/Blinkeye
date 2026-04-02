<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDiseaseRequest;
use App\Http\Requests\Admin\UpdateDiseaseRequest;
use App\Models\Disease;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DiseaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $diseases = Disease::orderBy('name')
            ->paginate(20);

        return Inertia::render('Admin/Diseases/Index', [
            'diseases' => $diseases,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Diseases/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDiseaseRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('diseases', 'public');
        }

        Disease::create($validated);

        return redirect()->route('admin.diseases.index')->with('success', 'Disease created successfully.');
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
    public function edit(Disease $disease)
    {
        $disease->load('galleries');

        return Inertia::render('Admin/Diseases/Edit', [
            'disease' => $disease,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDiseaseRequest $request, Disease $disease)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            if ($disease->image) {
                Storage::disk('public')->delete($disease->image);
            }
            $validated['image'] = $request->file('image')->store('diseases', 'public');
        }

        $disease->update($validated);

        return redirect()->route('admin.diseases.index')->with('success', 'Disease updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disease $disease)
    {
        if ($disease->image) {
            Storage::disk('public')->delete($disease->image);
        }
        foreach ($disease->galleries as $gallery) {
            Storage::disk('public')->delete($gallery->image_path);
        }
        $disease->delete();

        return redirect()->route('admin.diseases.index')->with('success', 'Disease deleted successfully.');
    }
}
