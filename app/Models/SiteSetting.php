<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value', 'type', 'group'];

    protected $casts = [
        'value' => 'string',
    ];

    /**
     * Get a setting value by key with optional default.
     */
    public static function getValue(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        if (!$setting) return $default;

        return match ($setting->type) {
            'json' => json_decode($setting->value, true),
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'integer' => (int) $setting->value,
            default => $setting->value,
        };
    }

    /**
     * Set a setting value by key.
     */
    public static function setValue(string $key, $value, string $type = 'string', string $group = 'general')
    {
        $storeValue = $type === 'json' ? json_encode($value) : (string) $value;

        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $storeValue, 'type' => $type, 'group' => $group]
        );
    }

    /**
     * Get all settings as key-value pairs, optionally filtered by group.
     */
    public static function getAllGrouped(?string $group = null): array
    {
        $query = static::query();
        if ($group) $query->where('group', $group);

        return $query->pluck('value', 'key')->toArray();
    }
}
