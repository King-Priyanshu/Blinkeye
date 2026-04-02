<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'hospital_id',
        'disease_id',
        'location_id',
        'name',
        'email',
        'phone',
        'message',
        'source_url',
        'campaign_type',
    ];

    protected $guarded = [
        'id',
        'status',
        'created_at',
        'updated_at',
    ];

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    public function disease()
    {
        return $this->belongsTo(Disease::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
