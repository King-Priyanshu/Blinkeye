<?php

namespace App\Services;

use App\Models\Lead;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    private const ALLOWED_GROUP_COLUMNS = [
        'disease_id',
        'location_id',
        'hospital_id',
        'status',
        'campaign_type',
        'source',
    ];

    /**
     * Get aggregate leads grouped by a specific taxonomy relation (disease, location, etc.).
     */
    public function getLeadsGroupedBy(string $column): Collection
    {
        if (!in_array($column, self::ALLOWED_GROUP_COLUMNS, true)) {
            throw new \InvalidArgumentException("Invalid group-by column: {$column}");
        }

        return Lead::select($column, DB::raw('count(*) as total'))
            ->groupBy($column)
            ->get();
    }

    /**
     * Get conversion rates for a specific hospital branch.
     */
    public function getConversionRates(int $hospitalId): array
    {
        $total = Lead::where('hospital_id', $hospitalId)->count();
        $converted = Lead::where('hospital_id', $hospitalId)
            ->where('status', 'converted')
            ->count();

        return [
            'total_leads' => $total,
            'converted_leads' => $converted,
            'conversion_rate' => $total > 0 ? round(($converted / $total) * 100, 2).'%' : '0%',
        ];
    }
}
