<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHospitalRequest;
use App\Http\Requests\Admin\UpdateHospitalRequest;
use App\Models\Blog;
use App\Models\Disease;
use App\Models\Doctor;
use App\Models\Group;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HospitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hospitals = Hospital::with('location')
            ->orderBy('name')
            ->paginate(20)
            ->through(fn($hospital) => [
        'id' => $hospital->id,
        'name' => $hospital->name,
        'domain' => $hospital->domain,
        'location_name' => $hospital->location ? $hospital->location->name : '-',
        'primary_color' => $hospital->primary_color,
        'secondary_color' => $hospital->secondary_color,
        'is_active' => $hospital->is_active,
        ]);

        return Inertia::render('Admin/Hospitals/Index', [
            'hospitals' => $hospitals,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $locations = Location::where('is_active', true)
            ->orderBy('type')
            ->orderBy('name')
            ->get(['id', 'name', 'type', 'parent_id']);
        $services = Service::where('is_active', true)->get(['id', 'name']);
        $diseases = Disease::where('is_active', true)->get(['id', 'name']);
        $groups = Group::where('is_active', true)->get(['id', 'name', 'type']);
        $blogs = Blog::where('is_active', true)->get(['id', 'title', 'slug', 'is_template']);
        $doctors = Doctor::where('is_active', true)->get(['id', 'name', 'specialty']);

        return Inertia::render('Admin/Hospitals/Create', [
            'locations' => $locations->map(fn($loc) => ['id' => $loc->id, 'name' => $loc->name, 'type' => $loc->type, 'parent_id' => $loc->parent_id]),
            'allServices' => $services,
            'allDiseases' => $diseases,
            'allGroups' => $groups,
            'allBlogs' => $blogs,
            'allDoctors' => $doctors,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHospitalRequest $request)
    {
        $validated = $request->validated();

        // Remove pivot data from validated array before creating hospital
        $serviceIds = $request->input('service_ids', []);
        $diseaseIds = $request->input('disease_ids', []);
        $groupIds = $request->input('group_ids', []);
        $blogIds = $request->input('blog_ids', []);
        $doctorIds = $request->input('doctor_ids', []);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('hospitals', 'public');
        }

        if ($request->hasFile('background_image')) {
            $validated['background_image'] = $request->file('background_image')->store('hospitals/backgrounds', 'public');
        }

        $hospital = Hospital::create($validated);

        // Sync pivot relationships
        $hospital->services()->sync($serviceIds);
        $hospital->diseases()->sync($diseaseIds);
        $hospital->groups()->sync($groupIds);
        $hospital->blogs()->sync($blogIds);

        // Assign doctors
        if (!empty($doctorIds)) {
            Doctor::whereIn('id', $doctorIds)->update(['hospital_id' => $hospital->id]);
        }

        return redirect()->route('admin.hospitals.index')->with('success', 'Hospital branch created successfully.');
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
    public function edit(Hospital $hospital)
    {
        $hospital->load(['galleries', 'services', 'diseases', 'groups', 'blogs', 'doctors', 'location']);
        $locations = Location::where('is_active', true)
            ->orderBy('type')
            ->orderBy('name')
            ->get(['id', 'name', 'type', 'parent_id']);
        $services = Service::where('is_active', true)->get(['id', 'name']);
        $diseases = Disease::where('is_active', true)->get(['id', 'name']);
        $groups = Group::where('is_active', true)->get(['id', 'name', 'type']);
        $blogs = Blog::where('is_active', true)->get(['id', 'title', 'slug', 'is_template']);
        $doctors = Doctor::where('is_active', true)->get(['id', 'name', 'specialty']);

        return Inertia::render('Admin/Hospitals/Edit', [
            'hospital' => $hospital,
            'locations' => $locations->map(fn($loc) => ['id' => $loc->id, 'name' => $loc->name, 'type' => $loc->type, 'parent_id' => $loc->parent_id]),
            'allServices' => $services,
            'allDiseases' => $diseases,
            'allGroups' => $groups,
            'allBlogs' => $blogs,
            'allDoctors' => $doctors,
            'selectedServiceIds' => $hospital->services->pluck('id'),
            'selectedDiseaseIds' => $hospital->diseases->pluck('id'),
            'selectedGroupIds' => $hospital->groups->pluck('id'),
            'selectedBlogIds' => $hospital->blogs->pluck('id'),
            'selectedDoctorIds' => $hospital->doctors->pluck('id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHospitalRequest $request, Hospital $hospital)
    {
        $validated = $request->validated();

        // Extract pivot data
        $serviceIds = $request->input('service_ids', []);
        $diseaseIds = $request->input('disease_ids', []);
        $groupIds = $request->input('group_ids', []);
        $blogIds = $request->input('blog_ids', []);
        $doctorIds = $request->input('doctor_ids', []);

        if ($request->hasFile('image')) {
            if ($hospital->image) {
                Storage::disk('public')->delete($hospital->image);
            }
            $validated['image'] = $request->file('image')->store('hospitals', 'public');
        } else {
            // Keep existing image
            unset($validated['image']);
        }

        if ($request->hasFile('background_image')) {
            if ($hospital->background_image) {
                Storage::disk('public')->delete($hospital->background_image);
            }
            $validated['background_image'] = $request->file('background_image')->store('hospitals/backgrounds', 'public');
        } else {
            // Keep existing background image
            unset($validated['background_image']);
        }

        // Clean up pivot data from validated array before update
        $pivotFields = ['service_ids', 'disease_ids', 'group_ids', 'blog_ids', 'doctor_ids'];
        foreach ($pivotFields as $field) {
            unset($validated[$field]);
        }

        $hospital->update($validated);

        // Sync pivot relationships
        $hospital->services()->sync($serviceIds);
        $hospital->diseases()->sync($diseaseIds);
        $hospital->groups()->sync($groupIds);
        $hospital->blogs()->sync($blogIds);

        // Assign doctors
        // Unassign doctors currently assigned to this hospital that are NOT in $doctorIds
        if (!empty($doctorIds)) {
            Doctor::where('hospital_id', $hospital->id)->whereNotIn('id', $doctorIds)->update(['hospital_id' => null]);
            Doctor::whereIn('id', $doctorIds)->update(['hospital_id' => $hospital->id]);
        } else {
            // Remove all doctors from this hospital
            Doctor::where('hospital_id', $hospital->id)->update(['hospital_id' => null]);
        }

        return redirect()->route('admin.hospitals.index')->with('success', 'Hospital branch updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hospital $hospital)
    {
        if ($hospital->image) {
            Storage::disk('public')->delete($hospital->image);
        }
        if ($hospital->background_image) {
            Storage::disk('public')->delete($hospital->background_image);
        }
        // Assuming galleries cascade on delete, let's also delete their files.
        foreach ($hospital->galleries as $gallery) {
            Storage::disk('public')->delete($gallery->image_path);
        }

        $hospital->delete();

        return redirect()->route('admin.hospitals.index')->with('success', 'Hospital branch deleted successfully.');
    }
}