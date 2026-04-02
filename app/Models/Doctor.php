<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Doctor extends Model
{
    protected $fillable = [
        'name',
        'specialty',
        'bio',
        'hospital_id',
        'is_active',
        'image',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($doctor) {
            $doctor->slug = Str::slug($doctor->name);
        });

        static::updating(function ($doctor) {
            $doctor->slug = Str::slug($doctor->name);
        });
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}
