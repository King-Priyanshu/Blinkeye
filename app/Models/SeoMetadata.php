<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMetadata extends Model
{
    protected $fillable = [
        'model_id',
        'model_type',
        'meta_title',
        'meta_description',
        'schema_json',
    ];
}
