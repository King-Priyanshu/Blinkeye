<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Group;
use App\Models\Hospital;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = Blog::with('groups')
            ->orderBy('id', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Templates/Index', [
            'templates' => $templates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Templates/Builder', [
            'groups' => Group::with('items')->get(),
            'locations' => Location::select('id', 'name')->get(),
            'hospitals' => Hospital::select('id', 'name', 'location_id')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_template' => 'required|string|max:255',
            'slug_template' => 'required|string|max:255',
            'content_template' => 'required|string',
            'is_active' => 'boolean',
            'group_ids' => 'nullable|array',
            'group_ids.*' => 'exists:groups,id',
        ]);

        DB::transaction(function () use ($validated, $request) {
            $blog = Blog::create([
                'title_template' => $validated['title_template'],
                'slug_template' => $validated['slug_template'],
                'content_template' => $validated['content_template'],
                'is_active' => $validated['is_active'] ?? true,
                'tenant_id' => $request->user()->isSuperAdmin() ? $request->input('hospital_id') : $request->user()->hospital_id,
            ]);

            if (! empty($validated['group_ids'])) {
                $blog->groups()->sync($validated['group_ids']);
            }
        });

        return redirect()->route('admin.templates.index')->with('success', 'Template created successfully.');
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
    public function edit(Blog $template)
    {
        $template->load('groups', 'galleries');

        return Inertia::render('Admin/Templates/Builder', [
            'template' => $template,
            'groups' => Group::with('items')->get(),
            'locations' => Location::select('id', 'name')->get(),
            'hospitals' => Hospital::select('id', 'name', 'location_id')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $template)
    {
        $validated = $request->validate([
            'title_template' => 'required|string|max:255',
            'slug_template' => 'required|string|max:255',
            'content_template' => 'required|string',
            'is_active' => 'boolean',
            'group_ids' => 'nullable|array',
            'group_ids.*' => 'exists:groups,id',
        ]);

        DB::transaction(function () use ($validated, $template, $request) {
            $template->update([
                'title_template' => $validated['title_template'],
                'slug_template' => $validated['slug_template'],
                'content_template' => $validated['content_template'],
                'is_active' => $validated['is_active'] ?? true,
                'tenant_id' => $request->user()->isSuperAdmin() ? $request->input('hospital_id') : $request->user()->hospital_id,
            ]);

            $template->groups()->sync($validated['group_ids'] ?? []);
        });

        return redirect()->route('admin.templates.index')->with('success', 'Template updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $template)
    {
        foreach ($template->galleries as $gallery) {
            Storage::disk('public')->delete($gallery->image_path);
        }
        $template->groups()->detach();
        $template->delete();

        return redirect()->route('admin.templates.index')->with('success', 'Template deleted successfully.');
    }
}
