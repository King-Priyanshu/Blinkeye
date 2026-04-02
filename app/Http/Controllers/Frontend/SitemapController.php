<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Disease;
use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Support\Facades\Cache;

class SitemapController extends Controller
{
    /**
     * Cache TTL for sitemap generation (1 hour)
     */
    const CACHE_TTL = 3600;

    /**
     * Generate a comprehensive XML sitemap for all SEO pages.
     * Google crawlers will use this to discover all dynamic URLs.
     */
    public function index()
    {
        $cacheKey = 'sitemap_xml_'.config('app.domain', 'default');

        $sitemap = Cache::remember($cacheKey, self::CACHE_TTL, function () {
            $urls = [];
            $now = now()->toW3cString();

            // ═══════════════════════════════════════════════════════════════
            // HIGH PRIORITY PAGES (1.0)
            // ═══════════════════════════════════════════════════════════════

            // Homepage
            $urls[] = $this->createUrlEntry(url('/'), '1.0', 'daily', $now);

            // Main service pages
            $services = Service::active()->get();
            foreach ($services as $service) {
                $urls[] = $this->createUrlEntry(
                    url('/'.$service->slug),
                    '1.0',
                    'weekly',
                    $now,
                    "Best {$service->name} Treatment | Expert Eye Care"
                );
            }

            // Main location pages (cities)
            $cities = Location::active()
                ->where('type', 'city')
                ->where('seo_priority', '>=', 5)
                ->orderBy('seo_priority', 'desc')
                ->get();

            foreach ($cities as $city) {
                $urls[] = $this->createUrlEntry(
                    url('/eye-hospital-in-'.$city->slug),
                    '1.0',
                    'weekly',
                    $now,
                    "Best Eye Hospital in {$city->name} | Expert Eye Care"
                );
            }

            // ═══════════════════════════════════════════════════════════════
            // MEDIUM-HIGH PRIORITY PAGES (0.9)
            // ═══════════════════════════════════════════════════════════════

            // Hospital pages
            $hospitals = Hospital::where('is_active', true)
                ->with('location')
                ->get();

            foreach ($hospitals as $hospital) {
                $locName = $hospital->location?->name ?? '';
                $urls[] = $this->createUrlEntry(
                    url('/hospital/'.$hospital->slug),
                    '0.9',
                    'weekly',
                    $now,
                    "{$hospital->name} - Eye Hospital in {$locName}"
                );
            }

            // Doctor pages
            $doctors = Doctor::where('is_active', true)->get();
            foreach ($doctors as $doctor) {
                $urls[] = $this->createUrlEntry(
                    url('/doctors/'.$doctor->slug),
                    '0.9',
                    'weekly',
                    $now,
                    "Dr. {$doctor->name} - Best Ophthalmologist"
                );
            }

            // Location + Service combination pages
            $locations = Location::active()
                ->whereIn('type', ['city', 'district'])
                ->orderBy('seo_priority', 'desc')
                ->limit(50)
                ->get();

            foreach ($locations as $location) {
                foreach ($services->take(10) as $service) {
                    // Service in location
                    $urls[] = $this->createUrlEntry(
                        url('/'.$service->slug.'-in-'.$location->slug),
                        '0.9',
                        'weekly',
                        $now,
                        "Best {$service->name} in {$location->name} | Expert Eye Care"
                    );

                    // Eye hospital in location
                    $urls[] = $this->createUrlEntry(
                        url('/eye-hospital-in-'.$location->slug),
                        '0.9',
                        'weekly',
                        $now,
                        "Best Eye Hospital in {$location->name}"
                    );
                }
            }

            // ═══════════════════════════════════════════════════════════════
            // MEDIUM PRIORITY PAGES (0.8)
            // ═══════════════════════════════════════════════════════════════

            // Dynamic SEO pages from blog templates
            $blogs = Blog::with('groups.items.item')->where('is_active', true)->get();

            foreach ($blogs as $blog) {
                $template = $blog->slug_template;
                $titleTemplate = $blog->title_template;

                $allowedItems = $blog->groups->flatMap->items->pluck('item');
                $allLocations = $allowedItems->whereInstanceOf(Location::class);
                $allServices = $allowedItems->whereInstanceOf(Service::class);
                $allDiseases = $allowedItems->whereInstanceOf(Disease::class);

                $needsLocation = str_contains($template, '{{location.slug}}');
                $needsService = str_contains($template, '{{service.slug}}');
                $needsDisease = str_contains($template, '{{disease.slug}}');

                // Determine priority based on what's needed
                $basePriority = '0.8';
                if ($needsLocation && ($needsService || $needsDisease)) {
                    $basePriority = '0.8';
                } elseif ($needsLocation || $needsService) {
                    $basePriority = '0.85';
                }

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

                            // Clean remaining placeholders
                            $title = preg_replace('/\{\{[^}]+\}\}/', '', $title);
                            $title = trim($title);

                            $urls[] = $this->createUrlEntry(
                                url('/'.$url),
                                $basePriority,
                                'weekly',
                                $now,
                                $title
                            );
                        }
                    }
                }
            }

            // Disease + Location pages
            $diseases = Disease::active()->get();
            foreach ($locations as $location) {
                foreach ($diseases->take(10) as $disease) {
                    $urls[] = $this->createUrlEntry(
                        url('/'.$disease->slug.'-treatment-'.$location->slug),
                        '0.8',
                        'weekly',
                        $now,
                        "{$disease->name} Treatment in {$location->name}"
                    );
                }
            }

            // ═══════════════════════════════════════════════════════════════
            // LOWER PRIORITY PAGES (0.6-0.7)
            // ═══════════════════════════════════════════════════════════════

            // All locations (including smaller cities/towns)
            $allLocations = Location::active()
                ->where('type', '!=', 'city')
                ->get();

            foreach ($allLocations as $location) {
                $urls[] = $this->createUrlEntry(
                    url('/eye-hospital-in-'.$location->slug),
                    '0.6',
                    'monthly',
                    $now
                );
            }

            // Static pages
            $staticPages = [
                '/about-us' => '0.7',
                '/contact' => '0.7',
                '/book-appointment' => '0.8',
                '/doctors' => '0.7',
                '/services' => '0.7',
                '/blog' => '0.6',
                '/reviews' => '0.6',
            ];

            foreach ($staticPages as $page => $priority) {
                $urls[] = $this->createUrlEntry(
                    url($page),
                    $priority,
                    'monthly',
                    $now
                );
            }

            // Remove duplicates based on URL
            $seen = [];
            $uniqueUrls = [];
            foreach ($urls as $url) {
                $urlKey = $url['loc'];
                if (! isset($seen[$urlKey])) {
                    $seen[$urlKey] = true;
                    $uniqueUrls[] = $url;
                }
            }

            return $this->buildXml($uniqueUrls);
        });

        return response($sitemap, 200, [
            'Content-Type' => 'application/xml',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }

    /**
     * Generate sitemap index for large sites.
     */
    public function indexIndex()
    {
        $sitemaps = [
            [
                'loc' => url('/sitemap.xml'),
                'lastmod' => now()->toW3cString(),
            ],
        ];

        // Add separate sitemaps for large sites
        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.PHP_EOL;

        foreach ($sitemaps as $sitemap) {
            $xml .= '  <sitemap>'.PHP_EOL;
            $xml .= '    <loc>'.htmlspecialchars($sitemap['loc']).'</loc>'.PHP_EOL;
            $xml .= '    <lastmod>'.$sitemap['lastmod'].'</lastmod>'.PHP_EOL;
            $xml .= '  </sitemap>'.PHP_EOL;
        }

        $xml .= '</sitemapindex>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    /**
     * Generate image sitemap for better image indexing.
     */
    public function images()
    {
        $urls = [];
        $now = now()->toW3cString();

        // Add hospital images
        $hospitals = Hospital::where('is_active', true)
            ->whereNotNull('image')
            ->get();

        foreach ($hospitals as $hospital) {
            $urls[] = [
                'loc' => url('/hospital/'.$hospital->slug),
                'images' => [
                    [
                        'loc' => asset('storage/'.$hospital->image),
                        'title' => $hospital->name,
                        'caption' => $hospital->short_description,
                    ],
                ],
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'.PHP_EOL;
        $xml .= '  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'.PHP_EOL;

        foreach ($urls as $url) {
            $xml .= '  <url>'.PHP_EOL;
            $xml .= '    <loc>'.htmlspecialchars($url['loc']).'</loc>'.PHP_EOL;
            $xml .= '    <changefreq>weekly</changefreq>'.PHP_EOL;
            $xml .= '    <priority>0.8</priority>'.PHP_EOL;

            foreach ($url['images'] as $image) {
                $xml .= '    <image:image>'.PHP_EOL;
                $xml .= '      <image:loc>'.htmlspecialchars($image['loc']).'</image:loc>'.PHP_EOL;
                $xml .= '      <image:title>'.htmlspecialchars($image['title']).'</image:title>'.PHP_EOL;
                if ($image['caption']) {
                    $xml .= '      <image:caption>'.htmlspecialchars($image['caption']).'</image:caption>'.PHP_EOL;
                }
                $xml .= '    </image:image>'.PHP_EOL;
            }

            $xml .= '  </url>'.PHP_EOL;
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    /**
     * Generate video sitemap for video content.
     */
    public function videos()
    {
        // For future use if video content is added
        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'.PHP_EOL;
        $xml .= '  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'.PHP_EOL;
        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    /**
     * Create a URL entry with SEO metadata.
     */
    protected function createUrlEntry(
        string $url,
        string $priority = '0.5',
        string $changefreq = 'weekly',
        ?string $lastmod = null,
        ?string $title = null
    ): array {
        return [
            'loc' => $url,
            'priority' => $priority,
            'changefreq' => $changefreq,
            'lastmod' => $lastmod ?? now()->toW3cString(),
            'title' => $title,
        ];
    }

    /**
     * Build XML from URL entries.
     */
    protected function buildXml(array $urls): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'.PHP_EOL;
        $xml .= '  xmlns:xhtml="http://www.w3.org/1999/xhtml"'.PHP_EOL;
        $xml .= '  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"'.PHP_EOL;
        $xml .= '  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"'.PHP_EOL;
        $xml .= '  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'.PHP_EOL;
        $xml .= '  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'.PHP_EOL;

        foreach ($urls as $url) {
            $xml .= '  <url>'.PHP_EOL;
            $xml .= '    <loc>'.htmlspecialchars($url['loc']).'</loc>'.PHP_EOL;
            $xml .= '    <lastmod>'.$url['lastmod'].'</lastmod>'.PHP_EOL;
            $xml .= '    <changefreq>'.$url['changefreq'].'</changefreq>'.PHP_EOL;
            $xml .= '    <priority>'.$url['priority'].'</priority>'.PHP_EOL;

            // Add alternate versions for hreflang (English India)
            $xml .= '    <xhtml:link rel="alternate" hreflang="en-IN" href="'.htmlspecialchars($url['loc']).'" />'.PHP_EOL;
            $xml .= '    <xhtml:link rel="alternate" hreflang="en" href="'.htmlspecialchars($url['loc']).'" />'.PHP_EOL;
            $xml .= '    <xhtml:link rel="alternate" hreflang="x-default" href="'.htmlspecialchars($url['loc']).'" />'.PHP_EOL;

            $xml .= '  </url>'.PHP_EOL;
        }

        $xml .= '</urlset>';

        return $xml;
    }
}
