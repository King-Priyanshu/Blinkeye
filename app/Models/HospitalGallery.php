<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HospitalGallery extends Model
{
    protected $fillable = [
        'hospital_id',
        'image_path',
        'caption',
    ];

    /**
     * Get the full URL for the gallery image.
     * This accessor transforms image_path to a full URL for frontend use.
     */
    public function getImageAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        // Return full URL if it's already a URL
        if (filter_var($this->image_path, FILTER_VALIDATE_URL)) {
            return $this->image_path;
        }

        // Return the full storage URL
        return Storage::disk('public')->url($this->image_path);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}
