<?php

namespace App\Http\Controllers\Frontend;

use App\Helpers\SeoHelper;
use App\Http\Controllers\Controller;
use App\Models\Disease;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;
use App\Services\SeoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controller for location-based SEO pages
 * Handles URLs like:
 * - /eye-hospital-in-mohali
 * - /cataract-surgery-chandigarh
 * - /lasik-eye-surgery-punjab
 * - /cataract-treatment-mohali
 */
class LocationPageController extends Controller
{
    /**
     * The SEO service instance.
     */
    protected SeoService $seoService;

    /**
     * Create a new controller instance.
     */
    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    /**
     * Display eye hospital in a specific location.
     * URL: /eye-hospital-in-{location}
     */
    public function eyeHospitalIn(Request $request, string $locationSlug)
    {
        $location = Location::active()
            ->where('slug', $locationSlug)
            ->firstOrFail();

        // Get hospital for this location
        $hospital = $this->getHospitalForLocation($location);

        if (! $hospital) {
            abort(404, 'No hospital found in this location');
        }

        // Get services offered at this hospital
        $services = $hospital->services()->active()->get();

        // Get diseases treated at this hospital
        $diseases = $hospital->diseases()->active()->get();

        // Generate SEO data
        $seoData = $this->seoService->generateSeoMetadata(
            $hospital,
            $location,
            null,
            null,
            'location'
        );

        // Get nearby locations
        $nearbyLocations = $this->getNearbyLocations($location);

        return Inertia::render('Frontend/Location/Hospital', [
            'location' => $location,
            'hospital' => $hospital,
            'services' => $services,
            'diseases' => $diseases,
            'nearbyLocations' => $nearbyLocations,
            'seo' => [
                'title' => $seoData['meta']['title'],
                'description' => $seoData['meta']['description'],
                'keywords' => $seoData['meta']['keywords'],
                'canonical' => $seoData['meta']['canonical'],
                'schemas' => $seoData['schemas'],
            ],
            'breadcrumbs' => SeoHelper::generateBreadcrumbs([
                ['name' => 'Eye Hospital in '.$location->name, 'url' => '/eye-hospital-in-'.$locationSlug],
            ]),
        ]);
    }

    /**
     * Display service in a specific location.
     * URL: /{service}-in-{location}
     */
    public function serviceIn(Request $request, string $serviceSlug, string $locationSlug)
    {
        $service = Service::active()
            ->where('slug', $serviceSlug)
            ->firstOrFail();

        $location = Location::active()
            ->where('slug', $locationSlug)
            ->firstOrFail();

        // Get hospital for this location
        $hospital = $this->getHospitalForLocation($location);

        if (! $hospital) {
            abort(404, 'No hospital found in this location');
        }

        // Generate SEO data
        $seoData = $this->seoService->generateSeoMetadata(
            $hospital,
            $location,
            $service,
            null,
            'service'
        );

        // Get related services
        $relatedServices = Service::active()
            ->where('id', '!=', $service->id)
            ->limit(6)
            ->get();

        return Inertia::render('Frontend/Location/Service', [
            'service' => $service,
            'location' => $location,
            'hospital' => $hospital,
            'relatedServices' => $relatedServices,
            'seo' => [
                'title' => $seoData['meta']['title'],
                'description' => $seoData['meta']['description'],
                'keywords' => $seoData['meta']['keywords'],
                'canonical' => $seoData['meta']['canonical'],
                'schemas' => $seoData['schemas'],
            ],
            'breadcrumbs' => SeoHelper::generateBreadcrumbs([
                ['name' => 'Services', 'url' => '/services'],
                ['name' => $service->name.' in '.$location->name, 'url' => '/'.$serviceSlug.'-in-'.$locationSlug],
            ]),
        ]);
    }

    /**
     * Display disease treatment in a specific location.
     * URL: /{disease}-treatment-{location}
     */
    public function diseaseTreatmentIn(Request $request, string $diseaseSlug, string $locationSlug)
    {
        $disease = Disease::active()
            ->where('slug', $diseaseSlug)
            ->firstOrFail();

        $location = Location::active()
            ->where('slug', $locationSlug)
            ->firstOrFail();

        // Get hospital for this location
        $hospital = $this->getHospitalForLocation($location);

        if (! $hospital) {
            abort(404, 'No hospital found in this location');
        }

        // Generate SEO data
        $seoData = $this->seoService->generateSeoMetadata(
            $hospital,
            $location,
            null,
            $disease,
            'disease'
        );

        // Get related diseases
        $relatedDiseases = Disease::active()
            ->where('id', '!=', $disease->id)
            ->limit(6)
            ->get();

        return Inertia::render('Frontend/Location/Disease', [
            'disease' => $disease,
            'location' => $location,
            'hospital' => $hospital,
            'relatedDiseases' => $relatedDiseases,
            'seo' => [
                'title' => $seoData['meta']['title'],
                'description' => $seoData['meta']['description'],
                'keywords' => $seoData['meta']['keywords'],
                'canonical' => $seoData['meta']['canonical'],
                'schemas' => $seoData['schemas'],
            ],
            'breadcrumbs' => SeoHelper::generateBreadcrumbs([
                ['name' => 'Eye Diseases', 'url' => '/diseases'],
                [$disease->name.' Treatment in '.$location->name],
            ]),
        ]);
    }

    /**
     * Get the hospital for a specific location.
     */
    protected function getHospitalForLocation(Location $location): ?Hospital
    {
        // First, try to find a hospital directly in this location
        $hospital = Hospital::where('location_id', $location->id)
            ->where('is_active', true)
            ->first();

        if ($hospital) {
            return $hospital;
        }

        // Then, try to find a hospital in the parent location
        if ($location->parent_id) {
            $hospital = Hospital::where('location_id', $location->parent_id)
                ->where('is_active', true)
                ->first();

            if ($hospital) {
                return $hospital;
            }
        }

        // Finally, try to find the nearest hospital by coordinates
        if ($location->lat && $location->lng) {
            $hospital = Hospital::closestTo($location->lat, $location->lng)
                ->where('is_active', true)
                ->first();

            if ($hospital) {
                return $hospital;
            }
        }

        // Fallback to any active hospital
        return Hospital::active()->first();
    }

    /**
     * Get nearby locations for cross-linking.
     */
    protected function getNearbyLocations(Location $location, int $limit = 5): array
    {
        // Get locations in the same parent or state
        if ($location->parent_id) {
            return Location::active()
                ->where('parent_id', $location->parent_id)
                ->where('id', '!=', $location->id)
                ->limit($limit)
                ->get()
                ->toArray();
        }

        // Get child locations
        return Location::active()
            ->where('parent_id', $location->id)
            ->limit($limit)
            ->get()
            ->toArray();
    }
}
