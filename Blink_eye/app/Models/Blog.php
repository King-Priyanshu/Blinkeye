<?php

namespace App\Models;

use App\Traits\BelongsToHospital;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use BelongsToHospital;

    protected $fillable = [
        'title_template',
        'content_template',
        'slug_template',
        'tenant_id',
        'is_active',
        // For real/static blogs (non-template)
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'is_template',
    ];

    protected $appends = ['title', 'slug', 'excerpt', 'content'];

    /**
     * Check if this is a template or a real blog
     */
    public function isTemplate(): bool
    {
        return ($this->attributes['is_template'] ?? null) === true || ($this->attributes['is_template'] ?? null) === 1
            ? true
            : !empty($this->attributes['title_template']);
    }

    /**
     * Get the display title (works for both templates and real blogs)
     */
    public function getTitleAttribute(): string
    {
        return $this->attributes['title'] ?? $this->attributes['title_template'] ?? '';
    }

    /**
     * Get the display slug (works for both templates and real blogs)
     */
    public function getSlugAttribute(): string
    {
        return $this->attributes['slug'] ?? $this->attributes['slug_template'] ?? '';
    }

    /**
     * Get the excerpt (works for both templates and real blogs)
     */
    public function getExcerptAttribute(): string
    {
        // Use attributes array to avoid recursive accessor call
        if (!empty($this->attributes['excerpt'])) {
            return $this->attributes['excerpt'];
        }

        $content = $this->attributes['content'] ?? $this->attributes['content_template'] ?? '';
        // Strip HTML tags and get first 150 characters
        $plainText = strip_tags($content);

        return strlen($plainText) > 150 ? substr($plainText, 0, 150) . '...' : $plainText;
    }

    /**
     * Get the full content (works for both templates and real blogs)
     */
    public function getContentAttribute(): string
    {
        // Use attributes array to avoid recursive accessor call
        return $this->attributes['content'] ?? $this->attributes['content_template'] ?? '';
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class , 'blog_groups');
    }

    public function galleries()
    {
        return $this->hasMany(BlogGallery::class);
    }

    /**
     * Get the hospitals that this blog is visible on.
     */
    public function hospitals()
    {
        return $this->belongsToMany(Hospital::class , 'hospital_blogs')
            ->withTimestamps();
    }
}