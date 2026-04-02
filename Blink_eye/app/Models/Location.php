<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Location extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'parent_id',
        'type', // state, district, city, village
        'name',
        'slug',
        'lat',
        'lng',
        'pincode',
        'population',
        'seo_priority',
        'is_active',
        'image',
    ];

    /**
     * Get the parent location.
     */
    public function parent()
    {
        return $this->belongsTo(Location::class, 'parent_id');
    }

    /**
     * Get the child locations.
     */
    public function children()
    {
        return $this->hasMany(Location::class, 'parent_id');
    }

    /**
     * Scope a query to only include active locations.
     * Uses the is_active index for optimized queries.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to find a location by slug.
     * Uses the slug index for optimized lookups.
     */
    public function scopeBySlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * Find a location by slug (active only).
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

    /**
     * Get all children (recursive) - useful for location hierarchy.
     */
    public function getAllChildren(): Collection
    {
        $children = collect([$this]);

        foreach ($this->children as $child) {
            $children = $children->merge($child->getAllChildren());
        }

        return $children;
    }

    /**
     * Get the location hierarchy (parent, self, children IDs).
     */
    public function getHierarchyIds(): Collection
    {
        $ids = collect([$this->id]);

        if ($this->parent_id) {
            $ids->push($this->parent_id);
        }

        $childIds = Location::where('parent_id', $this->id)->pluck('id');

        return $ids->merge($childIds)->unique();
    }

    /**
     * Get the groups this location is assigned to.
     */
    public function groups()
    {
        return $this->morphToMany(Group::class, 'item', 'group_items');
    }
}
