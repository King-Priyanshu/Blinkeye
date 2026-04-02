<?php

namespace App\Services;

use App\Models\Disease;
use App\Models\Location;

class ComplianceService
{
    /**
     * Get the appropriate medical disclaimer for a given context.
     *
     * @param  array  $context  ['location' => Location, 'disease' => Disease]
     */
    public function getDisclaimer(array $context = []): string
    {
        $disclaimer = 'This information is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.';

        if (isset($context['disease'])) {
            /** @var Disease $disease */
            // Example: Emergency separation logic
            if (in_array(strtolower($disease->name), ['retinal detachment', 'chemical burn', 'sudden vision loss'])) {
                $disclaimer = '🛑 EMERGENCY: '.$disease->name." requires immediate medical attention. Please visit the nearest Blink Eye Hospital Emergency Room or call your local emergency services immediately.\n\n".$disclaimer;
            }
        }

        if (isset($context['location'])) {
            /** @var Location $location */
            // Region-based compliance control
            // E.g. Punjab specific medical advertising regulations could override or append here
            $disclaimer .= "\n\nAvailable services in ".$location->name.' are subject to standard medical regulations.';
        }

        return $disclaimer;
    }
}
