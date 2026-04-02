<?php

namespace App\Helpers;

use App\Models\Disease;
use App\Models\Location;
use App\Models\Service;

/**
 * SEO Helper - Utilities for generating SEO-friendly URLs and content
 */
class SeoHelper
{
    /**
     * Generate a location-based URL slug.
     * Examples:
     *   - eye-hospital-in-mohali
     *   - cataract-surgery-chandigarh
     *   - lasik-eye-surgery-punjab
     */
    public static function generateLocationUrl(string $base, Location $location): string
    {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $base)));
        $locationSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $location->name)));

        return "{$slug}-{$locationSlug}";
    }

    /**
     * Generate a service-based URL with location.
     */
    public static function generateServiceLocationUrl(Service $service, ?Location $location = null): string
    {
        $serviceSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $service->slug)));

        if ($location) {
            $locationSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $location->slug)));

            return "{$serviceSlug}-in-{$locationSlug}";
        }

        return $serviceSlug;
    }

    /**
     * Generate a disease-based URL with location.
     */
    public static function generateDiseaseLocationUrl(Disease $disease, ?Location $location = null): string
    {
        $diseaseSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $disease->slug)));

        if ($location) {
            $locationSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $location->slug)));

            return "{$diseaseSlug}-treatment-{$locationSlug}";
        }

        return "{$diseaseSlug}-treatment";
    }

    /**
     * Generate SEO-friendly title for location pages.
     */
    public static function generateLocationPageTitle(Location $location, ?string $prefix = null): string
    {
        $locationName = $location->name;

        if ($prefix) {
            return "{$prefix} in {$locationName}";
        }

        return "Best Eye Hospital in {$locationName}";
    }

    /**
     * Generate SEO-friendly meta description.
     */
    public static function generateMetaDescription(
        string $primary,
        ?string $location = null,
        ?string $secondary = null,
        int $maxLength = 160
    ): string {
        $parts = array_filter([$primary, $location, $secondary]);
        $description = implode('. ', $parts);

        // Ensure it ends with a period
        if (! str_ends_with($description, '.')) {
            $description .= '.';
        }

        // Trim to max length
        if (strlen($description) > $maxLength) {
            $description = substr($description, 0, $maxLength - 3).'...';
        }

        return $description;
    }

    /**
     * Generate keywords array for SEO.
     */
    public static function generateKeywords(
        ?string $service = null,
        ?string $disease = null,
        ?string $location = null,
        array $additional = []
    ): array {
        $keywords = [];

        // Primary keywords
        if ($service) {
            $keywords[] = $service;
            $keywords[] = "best {$service}";
            $keywords[] = "{$service} treatment";
            $keywords[] = "{$service} surgery";

            if ($location) {
                $keywords[] = "{$service} in {$location}";
                $keywords[] = "best {$service} in {$location}";
            }
        }

        if ($disease) {
            $keywords[] = $disease;
            $keywords[] = "{$disease} treatment";
            $keywords[] = "{$disease} symptoms";

            if ($location) {
                $keywords[] = "{$disease} in {$location}";
            }
        }

        if ($location) {
            $keywords[] = "eye hospital in {$location}";
            $keywords[] = "eye doctor {$location}";
            $keywords[] = "eye care {$location}";
            $keywords[] = "ophthalmologist {$location}";
        }

        // General eye care keywords
        $keywords = array_merge($keywords, [
            'eye hospital',
            'eye care',
            'ophthalmologist',
            'cataract surgery',
            'LASIK',
            'retina treatment',
            'glaucoma treatment',
        ]);

        // Add additional keywords
        $keywords = array_merge($keywords, $additional);

        // Remove duplicates and empty values
        return array_unique(array_filter($keywords));
    }

    /**
     * Generate breadcrumb items for a page.
     */
    public static function generateBreadcrumbs(
        array $items
    ): array {
        $breadcrumbs = [
            ['name' => 'Home', 'url' => url('/')],
        ];

        foreach ($items as $item) {
            $breadcrumbs[] = [
                'name' => $item['name'],
                'url' => isset($item['url']) ? url($item['url']) : null,
            ];
        }

        return $breadcrumbs;
    }

    /**
     * Get URL path for location-based eye hospital page.
     */
    public static function getEyeHospitalInLocation(Location $location): string
    {
        return '/eye-hospital-in-'.$location->slug;
    }

    /**
     * Get URL path for service in location page.
     */
    public static function getServiceInLocation(Service $service, Location $location): string
    {
        return '/'.$service->slug.'-in-'.$location->slug;
    }

    /**
     * Get URL path for disease treatment in location page.
     */
    public static function getDiseaseTreatmentInLocation(Disease $disease, Location $location): string
    {
        return '/'.$disease->slug.'-treatment-'.$location->slug;
    }

    /**
     * Parse a URL slug to extract location, service, disease.
     */
    public static function parseUrlSlug(string $slug): array
    {
        $result = [
            'location' => null,
            'service' => null,
            'disease' => null,
        ];

        // Check for location pattern: eye-hospital-in-{location}
        if (preg_match('/eye-hospital-in-(.+)/', $slug, $matches)) {
            $result['location'] = $matches[1];
        }

        // Check for service pattern: {service}-in-{location}
        if (preg_match('/^(.+)-in-(.+)$/', $slug, $matches)) {
            $result['service'] = $matches[1];
            $result['location'] = $matches[2];
        }

        // Check for disease pattern: {disease}-treatment-{location}
        if (preg_match('/^(.+)-treatment-(.+)$/', $slug, $matches)) {
            $result['disease'] = $matches[1];
            $result['location'] = $matches[2];
        }

        return $result;
    }

    /**
     * Generate schema data for FAQ page.
     */
    public static function generateEyeCareFaqs(): array
    {
        return [
            [
                'question' => 'What is the best eye hospital near me?',
                'answer' => 'Blink Eye Hospitals offers the best eye care services with experienced ophthalmologists, advanced technology, and affordable treatments. Visit our hospital for comprehensive eye care including cataract surgery, LASIK, retina treatment, and more.',
            ],
            [
                'question' => 'How to book an appointment at Blink Eye Hospital?',
                'answer' => 'You can book an appointment by calling our helpline, using our online booking form, or visiting our hospital directly. We offer free consultations for first-time patients.',
            ],
            [
                'question' => 'What are the common eye treatments available?',
                'answer' => 'We offer a wide range of eye treatments including cataract surgery, LASIK eye surgery, retina treatment, glaucoma treatment, pediatric ophthalmology, corneal transplant, and cosmetic eye surgery.',
            ],
            [
                'question' => 'Is cataract surgery safe?',
                'answer' => 'Yes, cataract surgery is one of the safest and most common procedures performed worldwide. Our experienced surgeons use advanced techniques like phacoemulsification for quick recovery and excellent outcomes.',
            ],
            [
                'question' => 'How much does LASIK surgery cost?',
                'answer' => 'LASIK surgery cost varies depending on individual requirements and technology used. We offer competitive pricing with easy EMI options. Schedule a consultation for an accurate quote.',
            ],
            [
                'question' => 'Do you offer emergency eye care services?',
                'answer' => 'Yes, we provide 24/7 emergency eye care services for eye injuries, sudden vision loss, and other urgent eye conditions. Call our emergency helpline immediately.',
            ],
        ];
    }

    /**
     * Clean and format a string for use in URLs.
     */
    public static function slugify(string $string): string
    {
        // Convert to lowercase
        $string = strtolower($string);

        // Replace non-alphanumeric characters with hyphens
        $string = preg_replace('/[^a-z0-9\s-]/', '', $string);

        // Replace multiple spaces/hyphens with single hyphen
        $string = preg_replace('/[\s-]+/', '-', $string);

        // Trim hyphens from start and end
        return trim($string, '-');
    }
}
