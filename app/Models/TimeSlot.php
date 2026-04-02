<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimeSlot extends Model
{
    protected $fillable = [
        'hospital_id',
        'doctor_id',
        'start_time',
        'end_time',
        'duration_minutes',
        'day_of_week',
        'is_active',
    ];

    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'is_active' => 'boolean',
    ];

    /* ───── Relationships ───── */

    public function hospital(): BelongsTo
    {
        return $this->belongsTo(Hospital::class);
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }

    /* ───── Scopes ───── */

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForHospital($query, $hospitalId)
    {
        return $query->where('hospital_id', $hospitalId);
    }

    public function scopeForDoctor($query, $doctorId)
    {
        return $query->where('doctor_id', $doctorId);
    }

    public function scopeForDay($query, $dayOfWeek)
    {
        return $query->where('day_of_week', $dayOfWeek);
    }

    public function scopeGeneralSlots($query)
    {
        return $query->whereNull('doctor_id');
    }

    public function scopeDoctorSpecificSlots($query)
    {
        return $query->whereNotNull('doctor_id');
    }

    /* ───── Accessors ───── */

    public function getFormattedTimeAttribute(): string
    {
        return $this->start_time->format('h:i A').' - '.$this->end_time->format('h:i A');
    }

    public function getTimeSlotsForDayAttribute(): array
    {
        $slots = [];
        $current = $this->start_time->copy();
        $end = $this->end_time->copy();

        while ($current->lt($end)) {
            $slotEnd = $current->copy()->addMinutes($this->duration_minutes);
            if ($slotEnd->gt($end)) {
                break;
            }
            $slots[] = [
                'start' => $current->format('H:i'),
                'end' => $slotEnd->format('H:i'),
                'label' => $current->format('h:i A'),
            ];
            $current = $slotEnd;
        }

        return $slots;
    }

    /* ───── Helpers ───── */

    /**
     * Generate all available time slots for a given hospital/doctor on a specific date.
     */
    public static function getAvailableSlotsForDate($hospitalId, $doctorId, $date): array
    {
        $dayOfWeek = strtolower(date('l', strtotime($date)));

        // Get general slots for hospital
        $generalSlots = self::active()
            ->forHospital($hospitalId)
            ->generalSlots()
            ->where(function ($q) use ($dayOfWeek) {
                $q->where('day_of_week', $dayOfWeek)
                    ->orWhereNull('day_of_week');
            })
            ->get();

        // Get doctor-specific slots
        $doctorSlots = self::active()
            ->forHospital($hospitalId)
            ->forDoctor($doctorId ?? 0)
            ->where(function ($q) use ($dayOfWeek) {
                $q->where('day_of_week', $dayOfWeek)
                    ->orWhereNull('day_of_week');
            })
            ->get();

        // Merge and deduplicate slots
        $allSlots = $generalSlots->merge($doctorSlots)->unique(function ($slot) {
            return $slot->start_time->format('H:i');
        });

        // Get booked appointments for this date
        $bookedSlots = Appointment::where('hospital_id', $hospitalId)
            ->where('appointment_date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->when($doctorId, function ($q) use ($doctorId) {
                $q->where('doctor_id', $doctorId);
            })
            ->pluck('appointment_time')
            ->map(function ($time) {
                return substr($time, 0, 5); // Get HH:MM format
            })
            ->toArray();

        // Generate slot array with availability
        $availableSlots = [];
        foreach ($allSlots as $slot) {
            $slotTimes = $slot->generateTimeSlots();
            foreach ($slotTimes as $time) {
                if (! in_array($time['start'], $bookedSlots)) {
                    $availableSlots[] = $time;
                }
            }
        }

        // Sort by time
        usort($availableSlots, function ($a, $b) {
            return $a['start'] <=> $b['start'];
        });

        return $availableSlots;
    }

    /**
     * Generate individual time slots from start to end time.
     */
    public function generateTimeSlots(): array
    {
        $slots = [];
        $current = $this->start_time->copy();
        $end = $this->end_time->copy();

        while ($current->lt($end)) {
            $slotEnd = $current->copy()->addMinutes($this->duration_minutes);
            if ($slotEnd->gt($end)) {
                break;
            }
            $slots[] = [
                'start' => $current->format('H:i'),
                'end' => $slotEnd->format('H:i'),
                'label' => $current->format('h:i A'),
            ];
            $current = $slotEnd;
        }

        return $slots;
    }
}
