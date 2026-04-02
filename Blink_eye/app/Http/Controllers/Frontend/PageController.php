<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Disease;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;
use App\Services\TemplateEngineService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Cache TTL constants (in seconds)
     */
    const CACHE_TTL_BLOG_TEMPLATES = 3600; // 1 hour

    const CACHE_TTL_LOCATION_HIERARCHY = 3600; // 1 hour

    const CACHE_TTL_HOSPITALS = 1800; // 30 minutes

    const CACHE_TTL_ALL_PAGES = 3600; // 1 hour

    public function __invoke(Request $request, string $slug, TemplateEngineService $templateEngine)
    {
        $currentHospital = $request->attributes->get('current_hospital');

        // Cache blog templates - they don't change often
        $blogs = $this->getCachedBlogTemplates($currentHospital->id ?? null);

        foreach ($blogs as $blog) {
            // Skip non-template blogs - they are handled separately via API
            if (! $blog->isTemplate()) {
                continue;
            }

            // Convert slug_template to a regex pattern
            $patternStr = preg_quote($blog->slug_template, '/');

            // Replace shortcodes with named capture groups
            $patternStr = preg_replace('/\\\\{\\\\{([a-z]+)\\\\.slug\\\\}\\\\}/', '(?<$1>[a-z0-9-]+)', $patternStr);
            $pattern = '/^'.$patternStr.'$/';

            if (preg_match($pattern, $slug, $matches)) {
                $context = [];
                $validMatch = true;

                $allowedItems = $blog->groups->flatMap->items->pluck('item');

                if (isset($matches['location'])) {
                    $location = $allowedItems->whereInstanceOf(Location::class)->where('slug', $matches['location'])->first();
                    if (! $location) {
                        // Fallback: search globally with index optimization
                        $location = Location::where('slug', $matches['location'])->where('is_active', true)->first();
                    }
                    if (! $location) {
                        $validMatch = false;
                    } else {
                        $context['location'] = $location;
                    }
                }

                if (isset($matches['disease'])) {
                    $disease = $allowedItems->whereInstanceOf(Disease::class)->where('slug', $matches['disease'])->first();
                    if (! $disease) {
                        $disease = Disease::where('slug', $matches['disease'])->where('is_active', true)->first();
                    }
                    if (! $disease) {
                        $validMatch = false;
                    } else {
                        $context['disease'] = $disease;
                    }
                }

                if (isset($matches['service'])) {
                    $service = $allowedItems->whereInstanceOf(Service::class)->where('slug', $matches['service'])->first();
                    if (! $service) {
                        $service = Service::where('slug', $matches['service'])->where('is_active', true)->first();
                    }
                    if (! $service) {
                        $validMatch = false;
                    } else {
                        $context['service'] = $service;
                    }
                }

                // Add hospital context
                if ($currentHospital) {
                    $context['hospital'] = $currentHospital;
                } elseif ($blog->tenant_id) {
                    $context['hospital'] = Hospital::find($blog->tenant_id);
                } else {
                    // Auto-detect nearest hospital based on the location context
                    if (isset($context['location']) && $context['location']->lat && $context['location']->lng) {
                        $nearest = Hospital::closestTo($context['location']->lat, $context['location']->lng)
                            ->where('is_active', true)
                            ->first();
                        if ($nearest) {
                            $context['hospital'] = $nearest;
                        }
                    } else {
                        // Fallback: find a hospital in the same location hierarchy
                        if (isset($context['location'])) {
                            $locIds = $this->getCachedLocationHierarchy($context['location']->id);

                            $nearest = Hospital::whereIn('location_id', $locIds)->where('is_active', true)->first();
                            if ($nearest) {
                                $context['hospital'] = $nearest;
                            }
                        }

                        // Ultimate fallback: first hospital
                        if (! isset($context['hospital'])) {
                            $context['hospital'] = Hospital::where('is_active', true)->first();
                        }
                    }
                }

                if ($validMatch) {
                    $title = $templateEngine->render($blog->title_template, $context);
                    $content = $templateEngine->render($blog->content_template, $context);

                    // Get related pages for the sidebar
                    $relatedPages = $this->generateRelatedPages($blog, $context);

                    // Generate Table of Contents from <h2> tags
                    $toc = $this->generateTableOfContents($content);

                    // Get all hospitals for the "Visit a Branch" section - with eager loading
                    $allHospitals = $this->getCachedActiveHospitals();

                    // Eager-load gallery images for the context hospital
                    if (isset($context['hospital'])) {
                        $context['hospital']->load('galleries');
                    }

                    // ────── SEO Metadata ──────
                    $locationName = $context['location']->name ?? '';
                    $locationType = $context['location']->type ?? 'city';
                    $diseaseName = $context['disease']->name ?? '';
                    $serviceName = $context['service']->name ?? '';
                    $hospitalName = $context['hospital']->name ?? 'Blink Eye Hospitals';

                    // Get location hierarchy for SEO
                    $stateName = '';
                    $districtName = '';
                    $nearbyCities = '';
                    $nearbyVillages = '';

                    if (isset($context['location'])) {
                        $loc = $context['location'];
                        if ($loc->parent) {
                            if ($loc->parent->type === 'district') {
                                $districtName = $loc->parent->name;
                                if ($loc->parent->parent) {
                                    $stateName = $loc->parent->parent->name;
                                }
                            } elseif ($loc->parent->type === 'state') {
                                $stateName = $loc->parent->name;
                            }
                        }
                        // Get nearby locations
                        $children = $loc->children()->where('is_active', true)->get();
                        if ($children->isNotEmpty()) {
                            $nearbyCities = $children->where('type', 'city')->pluck('name')->implode(', ');
                            $nearbyVillages = $children->where('type', 'village')->pluck('name')->implode(', ');
                        }
                    }

                    // Build keyword-rich meta description
                    $metaDesc = "Find the best {$serviceName}{$diseaseName} treatment";
                    if ($locationName) {
                        $metaDesc .= " in {$locationName}";
                    }
                    $metaDesc .= " at {$hospitalName}. Expert ophthalmologists, advanced technology, affordable eye care. Book your free consultation today.";

                    // Build comprehensive keywords array for SEO and lead generation
                    $keywords = array_filter([
                        // Primary keywords
                        $diseaseName, $serviceName, $locationName,
                        $diseaseName ? "{$diseaseName} treatment" : null,
                        $diseaseName ? "{$diseaseName} surgery" : null,
                        $serviceName ? "best {$serviceName}" : null,

                        // Location-specific keywords
                        $locationName ? "eye hospital in {$locationName}" : null,
                        $locationName ? "eye doctor {$locationName}" : null,
                        $locationName ? "{$serviceName}{$diseaseName} {$locationName}" : null,
                        $locationName ? "best eye hospital near {$locationName}" : null,
                        $locationName ? "ophthalmologist in {$locationName}" : null,
                        $locationName ? "eye clinic {$locationName}" : null,

                        // District and state keywords
                        $districtName ? "eye hospital in {$districtName}" : null,
                        $districtName ? "eye doctor in {$districtName}" : null,
                        $stateName ? "eye hospital in {$stateName}" : null,
                        $stateName ? "best eye hospital {$stateName}" : null,

                        // Nearby locations keywords (for local SEO)
                        $nearbyCities ? 'eye hospital '.strtolower($nearbyCities) : null,
                        $nearbyVillages ? 'eye care '.strtolower($nearbyVillages) : null,

                        // Generic eye care keywords
                        'eye hospital', 'ophthalmologist', 'eye care', 'Blink Eye',
                        $hospitalName,

                        // Lead generation keywords
                        $locationName ? "{$diseaseName} treatment {$locationName} cost" : null,
                        $locationName ? "{$serviceName} {$locationName} booking" : null,
                        'free consultation', 'eye checkup', 'cataract surgery', 'LASIK',
                    ]);

                    // JSON-LD Structured Data for Google Rich Results
                    $jsonLd = [
                        '@context' => 'https://schema.org',
                        '@type' => 'MedicalWebPage',
                        'name' => $title,
                        'description' => $metaDesc,
                        'url' => url()->current(),
                        'publisher' => [
                            '@type' => 'MedicalOrganization',
                            'name' => $hospitalName,
                            'medicalSpecialty' => 'Ophthalmology',
                        ],
                        'about' => array_filter([
                            isset($context['disease']) ? [
                                '@type' => 'MedicalCondition',
                                'name' => $diseaseName,
                            ] : null,
                            isset($context['service']) ? [
                                '@type' => 'MedicalProcedure',
                                'name' => $serviceName,
                            ] : null,
                        ]),
                    ];

                    if ($context['hospital'] ?? null) {
                        $jsonLd['publisher']['address'] = [
                            '@type' => 'PostalAddress',
                            'addressRegion' => $locationName,
                            'addressCountry' => 'IN',
                        ];
                        if ($context['hospital']->phone ?? null) {
                            $jsonLd['publisher']['telephone'] = $context['hospital']->phone;
                        }
                    }

                    return Inertia::render('Frontend/Article', [
                        'title' => $title,
                        'content' => $content,
                        'context' => [
                            'location' => $context['location'] ?? null,
                            'disease' => $context['disease'] ?? null,
                            'service' => $context['service'] ?? null,
                            'hospital' => $context['hospital'] ?? null,
                        ],
                        'relatedPages' => $relatedPages,
                        'toc' => $toc,
                        'hospitals' => $allHospitals,
                        'seo' => [
                            'description' => $metaDesc,
                            'keywords' => implode(', ', array_unique($keywords)),
                            'jsonLd' => $jsonLd,
                        ],
                    ]);
                }
            }
        }

        abort(404);
    }

    /**
     * Get cached blog templates with full eager loading
     * Uses deep eager loading: groups -> items -> item
     * Only returns template blogs (is_template = true)
     */
    protected function getCachedBlogTemplates(?int $tenantId = null): \Illuminate\Database\Eloquent\Collection
    {
        $cacheKey = 'blog_templates'.($tenantId ? '_tenant_'.$tenantId : '_global');

        return Cache::remember($cacheKey, self::CACHE_TTL_BLOG_TEMPLATES, function () use ($tenantId) {
            $blogs = Blog::with([
                'groups.items.item' => function ($query) {
                    // Optimize: only load necessary columns
                    $query->select('id', 'name', 'slug', 'type', 'is_active', 'lat', 'lng', 'parent_id', 'image');
                },
            ])
                ->where('is_active', true)
                ->where('is_template', true) // Only get templates, not real blogs
                ->get();

            // If on a hospital subdomain, filter blogs
            if ($tenantId) {
                $blogs = $blogs->filter(fn ($b) => ! $b->tenant_id || $b->tenant_id == $tenantId);
            }

            return $blogs;
        });
    }

    /**
     * Get cached location hierarchy (parent and children IDs)
     */
    protected function getCachedLocationHierarchy(int $locationId): Collection
    {
        return Cache::remember('location_hierarchy_'.$locationId, self::CACHE_TTL_LOCATION_HIERARCHY, function () use ($locationId) {
            $location = Location::find($locationId);
            if (! $location) {
                return collect([$locationId]);
            }

            $locIds = collect([$location->id]);
            if ($location->parent_id) {
                $locIds->push($location->parent_id);
            }

            $childIds = Location::where('parent_id', $location->id)->pluck('id');

            return $locIds->merge($childIds)->unique();
        });
    }

    /**
     * Get cached active hospitals with eager loaded location
     */
    protected function getCachedActiveHospitals(): \Illuminate\Database\Eloquent\Collection
    {
        return Cache::remember('active_hospitals_with_locations', self::CACHE_TTL_HOSPITALS, function () {
            return Hospital::with('location')
                ->where('is_active', true)
                ->get(['id', 'name', 'subdomain', 'slug', 'phone', 'location_id', 'image']);
        });
    }

    /**
     * Generate related page URLs for the sidebar.
     * Optimized with cached allowed items
     */
    protected function generateRelatedPages(Blog $blog, array $context): array
    {
        $pages = [];

        // Use cached allowed items to avoid repeated queries
        $allowedItems = $blog->groups->flatMap->items->pluck('item');

        $allLocations = $allowedItems->whereInstanceOf(Location::class);
        $allServices = $allowedItems->whereInstanceOf(Service::class);
        $allDiseases = $allowedItems->whereInstanceOf(Disease::class);

        $template = $blog->slug_template;
        $titleTemplate = $blog->title_template;

        $needsLocation = str_contains($template, '{{location.slug}}');
        $needsService = str_contains($template, '{{service.slug}}');
        $needsDisease = str_contains($template, '{{disease.slug}}');

        // Vary the location while keeping the same service/disease
        if ($needsLocation && isset($context['service'])) {
            foreach ($allLocations->take(5) as $loc) {
                if (isset($context['location']) && $loc->id === $context['location']->id) {
                    continue;
                }
                $url = $template;
                $title = $titleTemplate;
                $url = str_replace('{{location.slug}}', $loc->slug, $url);
                $title = str_replace('{{location.name}}', $loc->name, $title);
                $url = str_replace('{{service.slug}}', $context['service']->slug, $url);
                $title = str_replace('{{service.name}}', $context['service']->name, $title);
                $title = preg_replace('/\{\{[^}]+\}\}/', '', $title);
                $pages[] = ['url' => '/'.$url, 'title' => trim($title)];
            }
        }

        // Vary the service while keeping the same location
        if ($needsService && isset($context['location'])) {
            foreach ($allServices->take(5) as $svc) {
                if (isset($context['service']) && $svc->id === $context['service']->id) {
                    continue;
                }
                $url = $template;
                $title = $titleTemplate;
                $url = str_replace('{{service.slug}}', $svc->slug, $url);
                $title = str_replace('{{service.name}}', $svc->name, $title);
                $url = str_replace('{{location.slug}}', $context['location']->slug, $url);
                $title = str_replace('{{location.name}}', $context['location']->name, $title);
                $title = preg_replace('/\{\{[^}]+\}\}/', '', $title);
                $pages[] = ['url' => '/'.$url, 'title' => trim($title)];
            }
        }

        // Same for diseases
        if ($needsDisease && isset($context['location'])) {
            foreach ($allDiseases->take(5) as $dis) {
                if (isset($context['disease']) && $dis->id === $context['disease']->id) {
                    continue;
                }
                $url = $template;
                $title = $titleTemplate;
                $url = str_replace('{{disease.slug}}', $dis->slug, $url);
                $title = str_replace('{{disease.name}}', $dis->name, $title);
                $url = str_replace('{{location.slug}}', $context['location']->slug, $url);
                $title = str_replace('{{location.name}}', $context['location']->name, $title);
                $title = preg_replace('/\{\{[^}]+\}\}/', '', $title);
                $pages[] = ['url' => '/'.$url, 'title' => trim($title)];
            }
        }

        return array_slice($pages, 0, 8);
    }

    /**
     * Parse HTML content to extract <h2> tags for a Table of Contents.
     * Injects IDs into the original <h2> tags for anchor linking.
     */
    protected function generateTableOfContents(string &$content): array
    {
        $toc = [];
        // Regex to find all <h2> elements. We capture the inner text.
        // We'll replace them with <h2> tags that have an id attribute.
        $content = preg_replace_callback('/<h2>(.*?)<\/h2>/is', function ($matches) use (&$toc) {
            $headingText = strip_tags($matches[1]);
            // Create a clean slug-like id
            $id = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $headingText), '-'));

            $toc[] = [
                'id' => $id,
                'title' => trim($headingText),
            ];

            return '<h2 id="'.$id.'" class="scroll-mt-28">'.$matches[1].'</h2>';
        }, $content);

        return $toc;
    }
}
