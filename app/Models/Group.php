<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'name',
        'type',
        'is_active',
    ];

    public function items()
    {
        return $this->hasMany(GroupItem::class);
    }

    public function blogs()
    {
        return $this->belongsToMany(Blog::class , 'blog_groups');
    }

    /**
     * Get the hospitals that belong to this group/sector.
     */
    public function hospitals()
    {
        return $this->belongsToMany(Hospital::class , 'hospital_groups')
            ->withTimestamps();
    }
}