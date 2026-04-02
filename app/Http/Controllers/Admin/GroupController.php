<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Disease;
use App\Models\Group;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = Group::withCount(['items', 'blogs'])
            ->orderBy('name')
            ->paginate(20)
            ->through(fn ($group) => [
                'id' => $group->id,
                'name' => $group->name,
                'type' => $group->type,
                'items_count' => $group->items_count,
                'blogs_count' => $group->blogs_count,
                'is_active' => $group->is_active,
            ]);

        return Inertia::render('Admin/Groups/Index', [
            'groups' => $groups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Load options for polymorphic relation
        return Inertia::render('Admin/Groups/Create', [
            'locations' => Location::select('id', 'name', 'type')->get(),
            'diseases' => Disease::select('id', 'name')->get(),
            'services' => Service::select('id', 'name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255', // e.g. "Location", "Disease", "Service"
            'is_active' => 'boolean',
            'items' => 'nullable|array',
            'items.*.item_type' => 'required|string',
            'items.*.item_id' => 'required|integer',
        ]);

        DB::transaction(function () use ($validated) {
            $group = Group::create([
                'name' => $validated['name'],
                'type' => $validated['type'],
                'is_active' => $validated['is_active'] ?? true,
            ]);

            if (! empty($validated['items'])) {
                foreach ($validated['items'] as $item) {
                    $group->items()->create([
                        'item_type' => $item['item_type'],
                        'item_id' => $item['item_id'],
                    ]);
                }
            }
        });

        return redirect()->route('admin.groups.index')->with('success', 'Group created successfully.');
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
    public function edit(Group $group)
    {
        $group->load(['items', 'blogs']);

        return Inertia::render('Admin/Groups/Edit', [
            'group' => $group,
            'locations' => Location::select('id', 'name', 'type')->get(),
            'diseases' => Disease::select('id', 'name')->get(),
            'services' => Service::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $group)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'is_active' => 'boolean',
            'items' => 'nullable|array',
            'items.*.item_type' => 'required|string',
            'items.*.item_id' => 'required|integer',
        ]);

        DB::transaction(function () use ($validated, $group) {
            $group->update([
                'name' => $validated['name'],
                'type' => $validated['type'],
                'is_active' => $validated['is_active'] ?? true,
            ]);

            // Sync items by deleting all and recreating
            $group->items()->delete();

            if (! empty($validated['items'])) {
                foreach ($validated['items'] as $item) {
                    $group->items()->create([
                        'item_type' => $item['item_type'],
                        'item_id' => $item['item_id'],
                    ]);
                }
            }
        });

        return redirect()->route('admin.groups.index')->with('success', 'Group updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        $group->items()->delete();
        $group->delete();

        return redirect()->route('admin.groups.index')->with('success', 'Group deleted successfully.');
    }
}
