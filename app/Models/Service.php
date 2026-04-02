<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
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
        return $this->hasMany(ServiceGallery::class);
    }

    /**
     * Scope a query to only include active services.
     * Uses the is_active index for optimized queries.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to find a service by slug.
     * Uses the slug index for optimized lookups.
     */
    public function scopeBySlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * Find a service by slug (active only).
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
        return $this->belongsToMany(Hospital::class, 'hospital_service')
            ->withTimestamps();
    }
}
