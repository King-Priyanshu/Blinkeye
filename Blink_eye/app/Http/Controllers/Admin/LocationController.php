<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreLocationRequest;
use App\Http\Requests\Admin\UpdateLocationRequest;
use App\Models\Location;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = Location::with('parent')
            ->orderBy('type')
            ->orderBy('name')
            ->paginate(20)
            ->through(fn ($loc) => [
                'id' => $loc->id,
                'name' => $loc->name,
                'type' => ucfirst($loc->type),
                'parent_name' => $loc->parent ? $loc->parent->name : '-',
                'is_active' => $loc->is_active,
            ]);

        return Inertia::render('Admin/Locations/Index', [
            'locations' => $locations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $parents = Location::where('is_active', true)->whereIn('type', ['state', 'district', 'city'])->get();

        return Inertia::render('Admin/Locations/Create', [
            'parents' => $parents->map(fn ($loc) => ['id' => $loc->id, 'name' => $loc->name, 'type' => $loc->type]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('locations', 'public');
        }

        Location::create($validated);

        return redirect()->route('admin.locations.index')->with('success', 'Location created successfully.');
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
    public function edit(Location $location)
    {
        $parents = Location::where('is_active', true)
            ->whereIn('type', ['state', 'district', 'city'])
            ->where('id', '!=', $location->id) // avoid self-referencing
            ->get();

        return Inertia::render('Admin/Locations/Edit', [
            'location' => $location,
            'parents' => $parents->map(fn ($loc) => ['id' => $loc->id, 'name' => $loc->name, 'type' => $loc->type]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            if ($location->image) {
                Storage::disk('public')->delete($location->image);
            }
            $validated['image'] = $request->file('image')->store('locations', 'public');
        }

        $location->update($validated);

        return redirect()->route('admin.locations.index')->with('success', 'Location updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        if ($location->image) {
            Storage::disk('public')->delete($location->image);
        }
        $location->delete();

        return redirect()->route('admin.locations.index')->with('success', 'Location deleted successfully.');
    }
}
