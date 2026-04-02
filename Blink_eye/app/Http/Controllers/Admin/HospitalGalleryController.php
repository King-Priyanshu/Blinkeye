<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hospital;
use App\Models\HospitalGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HospitalGalleryController extends Controller
{
    /**
     * Store multiple newly uploaded images into the hospital's gallery.
     */
    public function store(Request $request, Hospital $hospital)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'required|image|max:5120', // 5MB max per image
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store("hospitals/{$hospital->id}/gallery", 'public');
                $hospital->galleries()->create([
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Images added to the gallery successfully.');
    }

    /**
     * Remove the specified gallery image from storage.
     */
    public function destroy(Hospital $hospital, HospitalGallery $gallery)
    {
        if ($gallery->hospital_id !== $hospital->id) {
            abort(403, 'Unauthorized action.');
        }

        Storage::disk('public')->delete($gallery->image_path);
        $gallery->delete();

        return redirect()->back()->with('success', 'Gallery image deleted successfully.');
    }
}
