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

    public function store(StoreHospitalRequest $request)
    {
        $validated = $request->validated();

        $serviceIds = $request->input('service_ids', []);
        $diseaseIds = $request->input('disease_ids', []);
        $groupIds = $request->input('group_ids', []);
        $blogIds = $request->input('blog_ids', []);
        $doctorIds = $request->input('doctor_ids', []);

        // Remove pivot fields from validated data
        foreach (['service_ids', 'disease_ids', 'group_ids', 'blog_ids', 'doctor_ids'] as $field) {
            unset($validated[$field]);
        }

        // Handle file uploads
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('hospitals', 'public');
        } else {
            unset($validated['image']);
        }

        if ($request->hasFile('background_image')) {
            $validated['background_image'] = $request->file('background_image')->store('hospitals/backgrounds', 'public');
        } else {
            unset($validated['background_image']);
        }

        $hospital = Hospital::create($validated);

        $hospital->services()->sync($serviceIds);
        $hospital->diseases()->sync($diseaseIds);
        $hospital->groups()->sync($groupIds);
        $hospital->blogs()->sync($blogIds);

        if (!empty($doctorIds)) {
            Doctor::whereIn('id', $doctorIds)->update(['hospital_id' => $hospital->id]);
        }

        return redirect()->route('admin.hospitals.index')->with('success', 'Hospital branch created successfully.');
    }

    public function show(string $id)
    {
        //
    }

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
            'hospital' => $hospital->only([
                'id', 'name', 'slug', 'domain', 'subdomain', 'custom_domain', 'template_id',
                'email', 'phone', 'location_id', 'lat', 'lng', 'is_active',
                'image', 'primary_color', 'secondary_color', 'background_image',
                'map_url', 'map_zoom', 'address', 'emergency_contact', 'whatsapp',
                'working_hours_weekday', 'working_hours_saturday', 'working_hours_sunday',
                'is_24_7_emergency', 'facebook', 'instagram', 'twitter', 'youtube', 'linkedin',
                'short_description', 'about_us', 'established_year', 'number_of_beds',
                'number_of_doctors', 'amenities', 'accreditations', 'languages',
                'meta_title', 'meta_description', 'meta_keywords', 'og_image', 'canonical_url',
            ]),
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

    public function update(UpdateHospitalRequest $request, Hospital $hospital)
    {
        $validated = $request->validated();

        // Extract pivot IDs before removing from validated
        $serviceIds = $request->input('service_ids', []);
        $diseaseIds = $request->input('disease_ids', []);
        $groupIds = $request->input('group_ids', []);
        $blogIds = $request->input('blog_ids', []);
        $doctorIds = $request->input('doctor_ids', []);

        // Remove non-column fields
        foreach (['service_ids', 'disease_ids', 'group_ids', 'blog_ids', 'doctor_ids'] as $field) {
            unset($validated[$field]);
        }

        // Handle image upload - only update when a new file is provided
        if ($request->hasFile('image')) {
            if ($hospital->image && Storage::disk('public')->exists($hospital->image)) {
                Storage::disk('public')->delete($hospital->image);
            }
            $validated['image'] = $request->file('image')->store('hospitals', 'public');
        } else {
            unset($validated['image']);
        }

        // Handle background image upload - only update when a new file is provided
        if ($request->hasFile('background_image')) {
            if ($hospital->background_image && Storage::disk('public')->exists($hospital->background_image)) {
                Storage::disk('public')->delete($hospital->background_image);
            }
            $validated['background_image'] = $request->file('background_image')->store('hospitals/backgrounds', 'public');
        } else {
            unset($validated['background_image']);
        }

        // Update the hospital record
        $hospital->update($validated);

        // Sync pivot relationships
        $hospital->services()->sync($serviceIds);
        $hospital->diseases()->sync($diseaseIds);
        $hospital->groups()->sync($groupIds);
        $hospital->blogs()->sync($blogIds);

        // Sync doctors - unassign old, assign new
        Doctor::where('hospital_id', $hospital->id)->update(['hospital_id' => null]);
        if (!empty($doctorIds)) {
            Doctor::whereIn('id', $doctorIds)->update(['hospital_id' => $hospital->id]);
        }

        return redirect()->route('admin.hospitals.index')->with('success', 'Hospital branch updated successfully.');
    }

    public function destroy(Hospital $hospital)
    {
        if ($hospital->image && Storage::disk('public')->exists($hospital->image)) {
            Storage::disk('public')->delete($hospital->image);
        }
        if ($hospital->background_image && Storage::disk('public')->exists($hospital->background_image)) {
            Storage::disk('public')->delete($hospital->background_image);
        }

        foreach ($hospital->galleries as $gallery) {
            if (Storage::disk('public')->exists($gallery->image_path)) {
                Storage::disk('public')->delete($gallery->image_path);
            }
        }

        $hospital->delete();

        return redirect()->route('admin.hospitals.index')->with('success', 'Hospital branch deleted successfully.');
    }
}
