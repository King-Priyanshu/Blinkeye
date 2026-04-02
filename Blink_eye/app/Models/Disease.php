<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Disease extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_active',
        'image',
    ];

    public function groups()
    {
        return $this->morphToMany(Group::class, 'item', 'group_items');
    }

    public function galleries()
    {
        return $this->hasMany(DiseaseGallery::class);
    }

    /**
     * Scope a query to only include active diseases.
     * Uses the is_active index for optimized queries.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to find a disease by slug.
     * Uses the slug index for optimized lookups.
     */
    public function scopeBySlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * Find a disease by slug (active only).
     * Optimized for single-record lookups.
     */
    public static function findBySlug(string $slug, bool $activeOnly = true): ?self
    {
        $query = static::where('slug', $slug);

        if ($activeOnly) {
            $query->where('is_active', true);
        }

        return $query->first();
    }

    public function hospitals()
    {
        return $this->belongsToMany(Hospital::class, 'hospital_disease')
            ->withTimestamps();
    }
}
