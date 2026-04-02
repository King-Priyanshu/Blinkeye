<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupItem extends Model
{
    protected $fillable = [
        'group_id',
        'item_type',
        'item_id',
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function item()
    {
        return $this->morphTo();
    }
}
