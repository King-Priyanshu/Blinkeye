<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Disease;
use App\Models\DiseaseGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DiseaseGalleryController extends Controller
{
    /**
     * Store multiple newly uploaded images into the disease's gallery.
     */
    public function store(Request $request, Disease $disease)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'required|image|max:5120',
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store("diseases/{$disease->id}/gallery", 'public');
                $disease->galleries()->create([
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Images added to the gallery successfully.');
    }

    /**
     * Remove the specified gallery image from storage.
     */
    public function destroy(Disease $disease, DiseaseGallery $gallery)
    {
        if ($gallery->disease_id !== $disease->id) {
            abort(403, 'Unauthorized action.');
        }

        Storage::disk('public')->delete($gallery->image_path);
        $gallery->delete();

        return redirect()->back()->with('success', 'Gallery image deleted successfully.');
    }
}
