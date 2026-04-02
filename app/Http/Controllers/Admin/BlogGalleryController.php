<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogGalleryController extends Controller
{
    /**
     * Store multiple newly uploaded images into the blog template's gallery.
     */
    public function store(Request $request, Blog $template)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'required|image|max:5120',
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store("blogs/{$template->id}/gallery", 'public');
                $template->galleries()->create([
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Images added to the gallery successfully.');
    }

    /**
     * Remove the specified gallery image from storage.
     */
    public function destroy(Blog $template, BlogGallery $gallery)
    {
        if ($gallery->blog_id !== $template->id) {
            abort(403, 'Unauthorized action.');
        }

        Storage::disk('public')->delete($gallery->image_path);
        $gallery->delete();

        return redirect()->back()->with('success', 'Gallery image deleted successfully.');
    }
}
