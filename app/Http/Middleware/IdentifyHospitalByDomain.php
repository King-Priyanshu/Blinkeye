<?php

namespace App\Http\Middleware;

use App\Models\Hospital;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IdentifyHospitalByDomain
{
    /**
     * Base domains that should be treated as the main site.
     */
    protected array $baseDomains = [
        'localhost',
        '127.0.0.1',
        'blink.drkashishgupta.com',
        'www.blink.drkashishgupta.com',
        'drkashishgupta.com',
    ];

    /**
     * Handle an incoming request.
     * Identifies the hospital by the subdomain or custom domain of the request.
     * Sets context for the entire request lifecycle.
     */
    public function handle(Request $request, Closure $next)
    {
        $host = $request->getHost();
        $this->baseDomains[] = config('app.domain', 'blinkeye.com');
        $this->baseDomains[] = 'www.'.config('app.domain', 'blinkeye.com');

        // Skip identification for base domains (main site)
        $isMainSite = $this->isMainSite($host);

        if (! $isMainSite) {
            $hospital = $this->resolveHospital($host, $request);

            if ($hospital) {
                // Load related data
                $hospital->load(['location', 'services', 'doctors']);

                // Set hospital context
                $this->setHospitalContext($request, $hospital);

                // Share SEO metadata
                $this->shareSeoMetadata($hospital, $request);
            } else {
                // Hospital not found - could redirect or show 404
                $request->attributes->set('hospital_not_found', true);
            }
        }

        // Share main site status
        $this->shareMainSiteStatus($request);

        return $next($request);
    }

    /**
     * Check if the current host is the main site.
     */
    protected function isMainSite(string $host): bool
    {
        // Remove port if present
        $host = explode(':', $host)[0];

        // Check exact match
        if (in_array($host, $this->baseDomains)) {
            return true;
        }

        // Check if it's a www subdomain of the main domain
        $mainDomain = config('app.domain', 'blinkeye.com');
        if ($host === 'www.'.$mainDomain) {
            return true;
        }

        return false;
    }

    /**
     * Resolve the hospital from the request host.
     */
    protected function resolveHospital(string $host, Request $request): ?Hospital
    {
        // Remove port if present
        $host = explode(':', $host)[0];

        // Extract subdomain
        $subdomain = $this->extractSubdomain($host);

        $hospital = null;

        // Priority 1: Exact domain match (custom domain)
        $hospital = Hospital::where('is_active', true)
            ->where(function ($query) use ($host) {
                $query->where('domain', $host)
                    ->orWhere('custom_domain', $host);
            })
            ->first();

        // Priority 2: Subdomain match
        if (! $hospital && $subdomain) {
            $hospital = Hospital::where('subdomain', $subdomain)
                ->where('is_active', true)
                ->first();
        }

        // Priority 3: Slug match (for backwards compatibility)
        if (! $hospital && $subdomain) {
            $hospital = Hospital::where('slug', $subdomain)
                ->where('is_active', true)
                ->first();
        }

        // Store extracted subdomain in request for API use
        if ($subdomain) {
            $request->attributes->set('subdomain', $subdomain);
        }

        return $hospital;
    }

    /**
     * Extract subdomain from host.
     */
    protected function extractSubdomain(string $host): ?string
    {
        $mainDomain = config('app.domain', 'blinkeye.com');
        $mainDomain = str_replace('www.', '', $mainDomain);

        // Check if host ends with main domain
        if (str_ends_with($host, '.'.$mainDomain)) {
            $subdomain = str_replace('.'.$mainDomain, '', $host);
            // Remove www if present
            $subdomain = str_replace('www.', '', $subdomain);

            return $subdomain !== $mainDomain ? $subdomain : null;
        }

        // For localhost or IP-based domains
        $parts = explode('.', $host);
        if (count($parts) > 1 && ! in_array($host, $this->baseDomains)) {
            return $parts[0];
        }

        return null;
    }

    /**
     * Set hospital context in request.
     */
    protected function setHospitalContext(Request $request, Hospital $hospital): void
    {
        // Share with request attributes
        $request->attributes->set('current_hospital', $hospital);
        app()->instance('current_hospital', $hospital);

        // Full data for API endpoints
        $hospitalData = [
            'id' => $hospital->id,
            'name' => $hospital->name,
            'slug' => $hospital->slug,
            'subdomain' => $hospital->subdomain,
            'domain' => $hospital->domain,
            'custom_domain' => $hospital->custom_domain,
            'email' => $hospital->email,
            'phone' => $hospital->phone,
            'address' => $hospital->address,
            'emergency_contact' => $hospital->emergency_contact,
            'whatsapp' => $hospital->whatsapp,
            'is_24_7_emergency' => $hospital->is_24_7_emergency,
            'working_hours' => [
                'weekday' => $hospital->working_hours_weekday,
                'saturday' => $hospital->working_hours_saturday,
                'sunday' => $hospital->working_hours_sunday,
            ],
            'location' => $hospital->location ? [
                'id' => $hospital->location->id,
                'name' => $hospital->location->name,
                'slug' => $hospital->location->slug,
                'city' => $hospital->location->city,
                'state' => $hospital->location->state,
            ] : null,
            'branding' => [
                'primary_color' => $hospital->primary_color,
                'secondary_color' => $hospital->secondary_color,
                'logo' => $hospital->image,
                'background_image' => $hospital->background_image,
            ],
            'about' => [
                'short_description' => $hospital->short_description,
                'about_us' => $hospital->about_us,
                'established_year' => $hospital->established_year,
                'number_of_beds' => $hospital->number_of_beds,
                'number_of_doctors' => $hospital->number_of_doctors,
                'amenities' => $hospital->amenities,
                'accreditations' => $hospital->accreditations,
                'languages' => $hospital->languages,
            ],
            'social_links' => [
                'facebook' => $hospital->facebook,
                'instagram' => $hospital->instagram,
                'twitter' => $hospital->twitter,
                'youtube' => $hospital->youtube,
                'linkedin' => $hospital->linkedin,
            ],
            'seo' => [
                'meta_title' => $hospital->meta_title,
                'meta_description' => $hospital->meta_description,
                'meta_keywords' => $hospital->meta_keywords,
                'og_image' => $hospital->og_image,
                'canonical_url' => $hospital->canonical_url,
            ],
            'services' => $hospital->services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'slug' => $service->slug,
                    'description' => $service->description,
                    'icon' => $service->icon,
                ];
            }),
            'doctors' => $hospital->doctors->map(function ($doctor) {
                return [
                    'id' => $doctor->id,
                    'name' => $doctor->name,
                    'slug' => $doctor->slug,
                    'designation' => $doctor->designation,
                    'specialization' => $doctor->specialization,
                    'image' => $doctor->image,
                ];
            }),
        ];

        // Share via Inertia for server-side rendered pages
        if (class_exists(Inertia::class)) {
            Inertia::share('currentHospital', $hospitalData);
        }

        // Also share for API consumers
        $request->attributes->set('hospital_data', $hospitalData);
    }

    /**
     * Share SEO metadata for the hospital.
     */
    protected function shareSeoMetadata(Hospital $hospital, Request $request): void
    {
        $seoData = [
            'title' => $hospital->meta_title ?? $hospital->name.' - '.config('app.name'),
            'description' => $hospital->meta_description ?? $hospital->short_description,
            'keywords' => $hospital->meta_keywords,
            'og_image' => $hospital->og_image ?? $hospital->image,
            'canonical_url' => $this->buildCanonicalUrl($hospital),
        ];

        $request->attributes->set('seo_metadata', $seoData);

        // Share for Inertia
        if (class_exists(Inertia::class)) {
            Inertia::share('seo', $seoData);
        }
    }

    /**
     * Build canonical URL for the hospital.
     */
    protected function buildCanonicalUrl(Hospital $hospital, ?Request $request = null): string
    {
        $protocol = ($request && $request->secure()) ? 'https' : 'http';
        $domain = config('app.domain', 'blinkeye.com');

        if ($hospital->custom_domain) {
            return $protocol.'://'.$hospital->custom_domain;
        }

        return $protocol.'://'.$hospital->subdomain.'.'.$domain;
    }

    /**
     * Share main site status.
     */
    protected function shareMainSiteStatus(Request $request): void
    {
        $isMainSite = ! $request->attributes->has('current_hospital');

        $request->attributes->set('is_main_site', $isMainSite);

        if (class_exists(Inertia::class) && $isMainSite) {
            Inertia::share('currentHospital', null);
        }
    }
}
