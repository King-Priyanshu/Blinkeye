<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'user_id',
        'hospital_id',
        'doctor_id',
        'appointment_date',
        'appointment_time',
        'patient_name',
        'patient_phone',
        'patient_email',
        'notes',
        'reason',
    ];

    protected $guarded = [
        'status',
    ];

    protected $casts = [
        'appointment_date' => 'date',
    ];

    /* ───── Relationships ───── */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    /* ───── Scopes ───── */

    public function scopeUpcoming($query)
    {
        return $query->where('appointment_date', '>=', now()->toDateString())
            ->whereIn('status', ['pending', 'confirmed'])
            ->orderBy('appointment_date')
            ->orderBy('appointment_time');
    }

    public function scopeToday($query)
    {
        return $query->whereDate('appointment_date', now()->toDateString());
    }

    public function scopeByHospital($query, $hospitalId)
    {
        return $query->where('hospital_id', $hospitalId);
    }

    /* ───── Accessors ───── */

    public function getFormattedTimeAttribute(): string
    {
        $parts = explode(':', $this->appointment_time);
        $hour = (int) $parts[0];
        $min = $parts[1] ?? '00';
        $ampm = $hour >= 12 ? 'PM' : 'AM';
        $h12 = $hour % 12 ?: 12;

        return "{$h12}:{$min} {$ampm}";
    }
}
