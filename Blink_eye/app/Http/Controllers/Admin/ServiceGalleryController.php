<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceGalleryController extends Controller
{
    /**
     * Store multiple newly uploaded images into the service's gallery.
     */
    public function store(Request $request, Service $service)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'required|image|max:5120',
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store("services/{$service->id}/gallery", 'public');
                $service->galleries()->create([
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Images added to the gallery successfully.');
    }

    /**
     * Remove the specified gallery image from storage.
     */
    public function destroy(Service $service, ServiceGallery $gallery)
    {
        if ($gallery->service_id !== $service->id) {
            abort(403, 'Unauthorized action.');
        }

        Storage::disk('public')->delete($gallery->image_path);
        $gallery->delete();

        return redirect()->back()->with('success', 'Gallery image deleted successfully.');
    }
}
