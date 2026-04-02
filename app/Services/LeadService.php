<?php

namespace App\Services;

use App\Models\Hospital;
use App\Models\Lead;

class LeadService
{
    /**
     * Store a new lead and map it to the nearest branch if not specified.
     */
    public function captureLead(array $data): Lead
    {
        // Auto-detect nearest branch logic if hospital_id is omitted but lat/lng is present
        if (empty($data['hospital_id']) && ! empty($data['lat']) && ! empty($data['lng'])) {
            $nearest = Hospital::closestTo($data['lat'], $data['lng'])->first();
            if ($nearest) {
                $data['hospital_id'] = $nearest->id;
            } else {
                // Fallback to a default/main branch if none found
                $data['hospital_id'] = Hospital::first()->id;
            }
        }

        return Lead::create([
            'hospital_id' => $data['hospital_id'],
            'disease_id' => $data['disease_id'] ?? null,
            'location_id' => $data['location_id'] ?? null,
            'name' => $data['name'],
            'phone' => $data['phone'],
            'source_url' => $data['source_url'] ?? request()->url(),
            'campaign_type' => $data['campaign_type'] ?? 'Organic',
            'status' => 'new',
        ]);
    }
}
