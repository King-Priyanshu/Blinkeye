<?php

namespace App\Traits;

use App\Models\Hospital;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToHospital
{
    /**
     * Boot the BelongsToHospital trait for a model.
     *
     * @return void
     */
    protected static function bootBelongsToHospital()
    {
        static::addGlobalScope('hospital', function (Builder $builder) {
            if (session()->has('tenant_id')) {
                $builder->where('hospital_id', session('tenant_id'));
            }
        });

        static::creating(function ($model) {
            if (session()->has('tenant_id') && ! $model->hospital_id) {
                $model->hospital_id = session('tenant_id');
            }
        });
    }

    /**
     * Get the hospital that owns the model.
     */
    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}
