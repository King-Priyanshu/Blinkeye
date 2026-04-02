<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Hospital extends Model
{
    protected $fillable = [
        'name',
        'domain',
        'subdomain',
        'custom_domain',
        'template_id',
        'email',
        'phone',
        'is_active',
        'lat',
        'lng',
        'location_id',
        'image',
        'slug',
        'primary_color',
        'secondary_color',
        'background_image',
        'map_url',
        'map_zoom',
        // Contact Information
        'address',
        'emergency_contact',
        'whatsapp',
        // Working Hours
        'working_hours_weekday',
        'working_hours_saturday',
        'working_hours_sunday',
        'is_24_7_emergency',
        // Social Media
        'facebook',
        'instagram',
        'twitter',
        'youtube',
        'linkedin',
        // Additional Information
        'short_description',
        'about_us',
        'established_year',
        'number_of_beds',
        'number_of_doctors',
        'amenities',
        'accreditations',
        'languages',
        // SEO Fields
        'meta_title',
        'meta_description',
        'meta_keywords',
        'og_image',
        'canonical_url',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($hospital) {
            $hospital->slug = Str::slug($hospital->name);
        });

        static::updating(function ($hospital) {
            $hospital->slug = Str::slug($hospital->name);
        });
    }

    /**
     * Scope a query to only include active hospitals.
     * Uses the is_active index for optimized queries.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to find a hospital by slug.
     * Uses the slug index for optimized lookups.
     */
    public function scopeBySlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * Scope a query to find a hospital by subdomain.
     * Uses the subdomain index for optimized lookups.
     */
    public function scopeBySubdomain($query, string $subdomain)
    {
        return $query->where('subdomain', $subdomain);
    }

    /**
     * Scope a query to filter by location.
     * Uses the location_id index for optimized lookups.
     */
    public function scopeInLocation($query, int $locationId)
    {
        return $query->where('location_id', $locationId);
    }

    /**
     * Find a hospital by slug (active only).
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
     * Find a hospital by subdomain (active only).
     * Optimized for subdomain-based lookups.
     */
    public static function findBySubdomain(string $subdomain, bool $activeOnly = true): ?self
    {
        $query = static::where('subdomain', $subdomain);

        if ($activeOnly) {
            $query->where('is_active', true);
        }

        return $query->first();
    }

    /**
     * Scope a query to order hospitals by distance from given coordinates.
     */
    public function scopeClosestTo($query, $lat, $lng)
    {
        return $query->selectRaw('*,
            ( 6371 * acos( cos( radians(?) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance',
        [$lat, $lng, $lat]
        )->orderBy('distance');
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function galleries()
    {
        return $this->hasMany(HospitalGallery::class);
    }

    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function seoMetadata()
    {
        return $this->morphOne(SeoMetadata::class , 'model');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class , 'hospital_service')
            ->withTimestamps();
    }

    public function diseases()
    {
        return $this->belongsToMany(Disease::class , 'hospital_disease')
            ->withTimestamps();
    }

    /**
     * Get the sectors/groups associated with this hospital.
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class , 'hospital_groups')
            ->withTimestamps();
    }

    /**
     * Get the blog templates visible for this hospital.
     */
    public function blogs()
    {
        return $this->belongsToMany(Blog::class , 'hospital_blogs')
            ->withTimestamps();
    }
}