<?php

namespace App\Services;

use App\Models\Blog;
use App\Models\Disease;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;

class TemplateEngineService
{
    /**
     * Parse the template string with the provided context.
     * If the blog is not a template, return the content as-is.
     *
     * @param  array  $context  ['location' => Location, 'disease' => Disease, 'hospital' => Hospital]
     */
    public function render(string $template, array $context = []): string
    {
        $replacements = $this->buildReplacements($context);

        foreach ($replacements as $key => $value) {
            $template = str_replace('{{'.$key.'}}', $value, $template);
        }

        return $template;
    }

    /**
     * Render a full blog (handles both templates and real blogs)
     *
     * @return array ['title' => string, 'content' => string]
     */
    public function renderBlog(Blog $blog, array $context = []): array
    {
        // If it's a real blog (not a template), return content as-is
        if (! $blog->isTemplate()) {
            return [
                'title' => $blog->title,
                'content' => $blog->content,
            ];
        }

        // Otherwise, render the template
        return [
            'title' => $this->render($blog->title_template, $context),
            'content' => $this->render($blog->content_template, $context),
        ];
    }

    /**
     * Build the dictionary of shortcode replacements based on context models.
     */
    protected function buildReplacements(array $context): array
    {
        $dict = [];

        if (isset($context['location'])) {
            /** @var Location $loc */
            $loc = $context['location'];

            // Basic location info
            $dict['location.name'] = $loc->name;
            $dict['location.slug'] = $loc->slug;
            $dict['location.type'] = $loc->type ?? 'city';

            // Geolocation data
            $dict['location.lat'] = $loc->lat ?? '';
            $dict['location.lng'] = $loc->lng ?? '';
            $dict['location.pincode'] = $loc->pincode ?? '';

            // Legacy support
            $dict['city_name'] = $loc->name;

            // Location hierarchy - parent information
            if ($loc->parent) {
                $dict['location.parent_name'] = $loc->parent->name;
                $dict['location.parent_slug'] = $loc->parent->slug;
                $dict['location.parent_type'] = $loc->parent->type ?? '';

                if ($loc->parent->type === 'district') {
                    $dict['district_name'] = $loc->parent->name;
                    if ($loc->parent->parent) {
                        $dict['state_name'] = $loc->parent->parent->name;
                        $dict['location.state_name'] = $loc->parent->parent->name;
                        $dict['location.state_slug'] = $loc->parent->parent->slug;
                    }
                } elseif ($loc->parent->type === 'state') {
                    $dict['state_name'] = $loc->parent->name;
                    $dict['location.state_name'] = $loc->parent->name;
                    $dict['location.state_slug'] = $loc->parent->slug;
                }
            }

            // Child locations (nearby cities, villages)
            $children = $loc->children()->where('is_active', true)->get();
            if ($children->isNotEmpty()) {
                $dict['location.nearby_cities'] = $children->where('type', 'city')->pluck('name')->implode(', ');
                $dict['location.nearby_villages'] = $children->where('type', 'village')->pluck('name')->implode(', ');
                $dict['location.nearby_locations'] = $children->pluck('name')->implode(', ');
            }

            // For SEO - location phrases
            $dict['location.in_area'] = 'in '.$loc->name;
            $dict['location.near_area'] = 'near '.$loc->name;
            $dict['location.area_name'] = $loc->name.' area';
        }

        if (isset($context['hospital'])) {
            /** @var Hospital $hosp */
            $hosp = $context['hospital'];

            // Hospital basic info
            $dict['hospital.name'] = $hosp->name;
            $dict['hospital.phone'] = $hosp->phone;
            $dict['hospital.address'] = $hosp->address ?? '';
            $dict['hospital.email'] = $hosp->email ?? '';
            $dict['hospital.emergency_contact'] = $hosp->emergency_contact ?? '';
            $dict['hospital.whatsapp'] = $hosp->whatsapp ?? '';

            // Hospital location
            if ($hosp->location) {
                $dict['hospital.location'] = $hosp->location->name;
                $dict['hospital.city'] = $hosp->location->name;
            }

            // Hospital geolocation for maps
            if ($hosp->lat && $hosp->lng) {
                $dict['hospital.lat'] = $hosp->lat;
                $dict['hospital.lng'] = $hosp->lng;
                $dict['hospital.map_url'] = $hosp->map_url ?? "https://www.google.com/maps?q={$hosp->lat},{$hosp->lng}&z=15";
            }

            // Legacy support
            $dict['nearest_branch'] = $hosp->name;
            $dict['hospital_name'] = $hosp->name;
            $dict['local_phone'] = $hosp->phone;

            if (isset($hosp->distance)) {
                $dict['distance_from_user'] = round($hosp->distance, 1).' km';
                $dict['hospital.distance'] = round($hosp->distance, 1).' km';
            }

            // Working hours
            $dict['hospital.working_hours'] = $hosp->working_hours_weekday ?? '';
            $dict['hospital.is_24_7'] = $hosp->is_24_7_emergency ? '24/7' : '';
        }

        if (isset($context['disease'])) {
            /** @var Disease $disease */
            $disease = $context['disease'];
            $dict['disease.name'] = $disease->name;
            $dict['disease.slug'] = $disease->slug;
            $dict['disease_name'] = $disease->name;
        }

        if (isset($context['service'])) {
            /** @var Service $service */
            $service = $context['service'];
            $dict['service.name'] = $service->name;
            $dict['service.slug'] = $service->slug;
            $dict['service_name'] = $service->name;
        }

        // Date/time placeholders
        $dict['date.year'] = date('Y');
        $dict['date.month'] = date('F');
        $dict['date.day'] = date('d');

        return $dict;
    }
}
