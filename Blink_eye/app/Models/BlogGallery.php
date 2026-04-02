<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BlogGallery extends Model
{
    protected $fillable = [
        'blog_id',
        'image_path',
        'caption',
    ];

    /**
     * Get the full URL for the gallery image.
     */
    public function getImageAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        if (filter_var($this->image_path, FILTER_VALIDATE_URL)) {
            return $this->image_path;
        }

        return Storage::disk('public')->url($this->image_path);
    }

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
