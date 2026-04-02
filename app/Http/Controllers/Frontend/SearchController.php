<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Disease;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class SearchController extends Controller
{
    /**
     * Cache TTL constants (in seconds)
     */
    const CACHE_TTL_BLOG_TEMPLATES = 3600; // 1 hour

    const CACHE_TTL_ALL_PAGES = 3600; // 1 hour

    /**
     * Search API for the frontend autocomplete.
     * Returns matching diseases, services, locations, hospitals, and suggested SEO page URLs.
     */
    public function search(Request $request)
    {
        $query = trim($request->input('q', ''));

        if (strlen($query) < 2) {
            return response()->json(['results' => [], 'pages' => []]);
        }

        $words = preg_split('/\s+/', strtolower($query));

        // 1. Search individual entities - using indexes
        $diseases = Disease::where('is_active', true)
            ->where(function ($q) use ($words) {
                foreach ($words as $word) {
                    $q->orWhere('name', 'LIKE', "%{$word}%");
                }
            })
            ->limit(5)->get(['id', 'name', 'slug', 'image']);

        $services = Service::where('is_active', true)
            ->where(function ($q) use ($words) {
                foreach ($words as $word) {
                    $q->orWhere('name', 'LIKE', "%{$word}%");
                }
            })
            ->limit(5)->get(['id', 'name', 'slug', 'image']);

        $locations = Location::where('is_active', true)
            ->where(function ($q) use ($words) {
                foreach ($words as $word) {
                    $q->orWhere('name', 'LIKE', "%{$word}%");
                }
            })
            ->limit(5)->get(['id', 'name', 'slug', 'type', 'image']);

        $hospitals = Hospital::where('is_active', true)
            ->where(function ($q) use ($words) {
                foreach ($words as $word) {
                    $q->orWhere('name', 'LIKE', "%{$word}%");
                }
            })
            ->limit(5)->get(['id', 'name', 'slug', 'subdomain', 'image']);

        // 2. Generate smart SEO page suggestions - using cached blog templates
        $pages = $this->generatePageSuggestions($diseases, $services, $locations);

        return response()->json([
            'results' => [
                'diseases' => $diseases,
                'services' => $services,
                'locations' => $locations,
                'hospitals' => $hospitals,
            ],
            'pages' => $pages,
        ]);
    }

    /**
     * Get cached blog templates with eager loading
     */
    protected function getCachedBlogTemplates(): \Illuminate\Database\Eloquent\Collection
    {
        return Cache::remember('blog_templates_search', self::CACHE_TTL_BLOG_TEMPLATES, function () {
            return Blog::with([
                'groups.items.item' => function ($query) {
                    // Optimize: only load necessary columns
                    $query->select('id', 'name', 'slug', 'type', 'is_active', 'lat', 'lng', 'parent_id', 'image');
                },
            ])
                ->where('is_active', true)
                ->get();
        });
    }

    /**
     * Generates suggested dynamic SEO page URLs based on the matched entities.
     */
    protected function generatePageSuggestions($diseases, $services, $locations)
    {
        $pages = [];

        // Use cached blog templates to avoid repeated queries
        $blogs = $this->getCachedBlogTemplates();

        foreach ($blogs as $blog) {
            $template = $blog->slug_template;
            $titleTemplate = $blog->title_template;

            $needsLocation = str_contains($template, '{{location.slug}}');
            $needsService = str_contains($template, '{{service.slug}}');
            $needsDisease = str_contains($template, '{{disease.slug}}');

            // Get allowed items from the template's groups
            $allowedItems = $blog->groups->flatMap->items->pluck('item');
            $allowedLocations = $allowedItems->whereInstanceOf(Location::class);
            $allowedServices = $allowedItems->whereInstanceOf(Service::class);
            $allowedDiseases = $allowedItems->whereInstanceOf(Disease::class);

            // Filter to only entities that matched the search AND are allowed by the template
            $matchedLocations = $locations->filter(fn ($l) => $allowedLocations->contains('id', $l->id));
            $matchedServices = $services->filter(fn ($s) => $allowedServices->contains('id', $s->id));
            $matchedDiseases = $diseases->filter(fn ($d) => $allowedDiseases->contains('id', $d->id));

            // If no matched entities but template needs them, use all allowed items (limit 2)
            if ($matchedLocations->isEmpty() && $needsLocation) {
                $matchedLocations = $allowedLocations->take(2);
            }
            if ($matchedServices->isEmpty() && $needsService) {
                $matchedServices = $allowedServices->take(2);
            }
            if ($matchedDiseases->isEmpty() && $needsDisease) {
                $matchedDiseases = $allowedDiseases->take(2);
            }

            // Generate URL combinations (capped to avoid explosion)
            $locItems = $needsLocation ? $matchedLocations : collect([null]);
            $svcItems = $needsService ? $matchedServices : collect([null]);
            $disItems = $needsDisease ? $matchedDiseases : collect([null]);

            $count = 0;
            foreach ($locItems as $loc) {
                foreach ($svcItems as $svc) {
                    foreach ($disItems as $dis) {
                        if ($count >= 6) {
                            break 3;
                        }

                        $url = $template;
                        $title = $titleTemplate;

                        if ($loc) {
                            $url = str_replace('{{location.slug}}', $loc->slug, $url);
                            $title = str_replace('{{location.name}}', $loc->name, $title);
                        }
                        if ($svc) {
                            $url = str_replace('{{service.slug}}', $svc->slug, $url);
                            $title = str_replace('{{service.name}}', $svc->name, $title);
                        }
                        if ($dis) {
                            $url = str_replace('{{disease.slug}}', $dis->slug, $url);
                            $title = str_replace('{{disease.name}}', $dis->name, $title);
                        }

                        // Strip any remaining unresolved shortcodes
                        $title = preg_replace('/\{\{[^}]+\}\}/', '', $title);

                        $pages[] = [
                            'url' => '/'.$url,
                            'title' => trim($title),
                        ];
                        $count++;
                    }
                }
            }
        }

        return array_values(array_unique($pages, SORT_REGULAR));
    }

    /**
     * Generate ALL possible SEO page URLs for the sitemap / homepage.
     * Optionally filtered by a hospital's location context.
     * Uses caching for better performance.
     */
    public function allPages(Request $request)
    {
        $hospitalId = $request->input('hospital_id');
        $locationId = $request->input('location_id');

        // Build cache key based on filters
        $cacheKey = 'all_pages';
        if ($hospitalId) {
            $cacheKey .= '_hospital_'.$hospitalId;
        }
        if ($locationId) {
            $cacheKey .= '_location_'.$locationId;
        }

        // Cache all pages without filters for reuse
        if (! $hospitalId && ! $locationId) {
            return Cache::remember($cacheKey, self::CACHE_TTL_ALL_PAGES, function () {
                return $this->generateAllPages(null, null);
            });
        }

        return $this->generateAllPages($hospitalId, $locationId);
    }

    /**
     * Internal method to generate all pages
     */
    protected function generateAllPages($hospitalId, $locationId)
    {
        $blogs = $this->getCachedBlogTemplates();

        // If a hospital context, filter blogs to only those with matching tenant OR global
        if ($hospitalId) {
            $blogs = $blogs->filter(fn ($b) => ! $b->tenant_id || $b->tenant_id == $hospitalId);
        }

        $pages = [];

        foreach ($blogs as $blog) {
            $template = $blog->slug_template;
            $titleTemplate = $blog->title_template;

            $allowedItems = $blog->groups->flatMap->items->pluck('item');
            $allLocations = $allowedItems->whereInstanceOf(Location::class);
            $allServices = $allowedItems->whereInstanceOf(Service::class);
            $allDiseases = $allowedItems->whereInstanceOf(Disease::class);

            // If location context given, filter to only nearby locations
            if ($locationId) {
                // Use cached location hierarchy
                $familyIds = $this->getCachedLocationHierarchy($locationId);
                $allLocations = $allLocations->filter(fn ($l) => $familyIds->contains($l->id));
            }

            $needsLocation = str_contains($template, '{{location.slug}}');
            $needsService = str_contains($template, '{{service.slug}}');
            $needsDisease = str_contains($template, '{{disease.slug}}');

            $locItems = $needsLocation ? $allLocations : collect([null]);
            $svcItems = $needsService ? $allServices : collect([null]);
            $disItems = $needsDisease ? $allDiseases : collect([null]);

            foreach ($locItems as $loc) {
                foreach ($svcItems as $svc) {
                    foreach ($disItems as $dis) {
                        $url = $template;
                        $title = $titleTemplate;

                        if ($loc) {
                            $url = str_replace('{{location.slug}}', $loc->slug, $url);
                            $title = str_replace('{{location.name}}', $loc->name, $title);
                        }
                        if ($svc) {
                            $url = str_replace('{{service.slug}}', $svc->slug, $url);
                            $title = str_replace('{{service.name}}', $svc->name, $title);
                        }
                        if ($dis) {
                            $url = str_replace('{{disease.slug}}', $dis->slug, $url);
                            $title = str_replace('{{disease.name}}', $dis->name, $title);
                        }

                        $title = preg_replace('/\{\{[^}]+\}\}/', '', $title);

                        $pages[] = [
                            'url' => '/'.$url,
                            'title' => trim($title),
                            'location' => $loc ? $loc->name : null,
                            'type' => $needsService ? 'service' : 'disease',
                        ];
                    }
                }
            }
        }

        return response()->json(['pages' => $pages]);
    }

    /**
     * Get cached location hierarchy (parent and children IDs)
     */
    protected function getCachedLocationHierarchy(int $locationId): Collection
    {
        return Cache::remember('location_hierarchy_'.$locationId, 3600, function () use ($locationId) {
            $location = Location::find($locationId);
            if (! $location) {
                return collect([$locationId]);
            }

            $familyIds = collect([$location->id]);
            if ($location->parent_id) {
                $familyIds->push($location->parent_id);
            }
            $childIds = Location::where('parent_id', $location->id)->pluck('id');
            $parentChildIds = Location::where('parent_id', $location->parent_id)->pluck('id');

            return $familyIds->merge($childIds)->merge($parentChildIds)->unique();
        });
    }
}
