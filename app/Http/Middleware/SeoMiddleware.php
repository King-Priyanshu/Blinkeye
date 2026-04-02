<?php

namespace App\Http\Middleware;

use App\Services\SeoService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * SEO Middleware - Handles dynamic SEO meta tags for all pages
 *
 * This middleware adds SEO meta tags including:
 * - Title tags
 * - Meta descriptions
 * - Meta keywords
 * - Open Graph tags
 * - Twitter Card tags
 * - Canonical URLs
 * - hreflang tags
 * - JSON-LD structured data
 */
class SeoMiddleware
{
    /**
     * The SEO service instance.
     */
    protected SeoService $seoService;

    /**
     * Default SEO values.
     */
    protected array $defaults = [
        'site_name' => 'Blink Eye Hospitals',
        'title' => 'Best Eye Hospital in India | Expert Eye Care Services',
        'description' => 'Blink Eye Hospitals offers comprehensive eye care services including cataract surgery, LASIK, retina treatment, and more. Expert ophthalmologists, advanced technology, affordable treatments.',
        'keywords' => 'eye hospital, eye care, ophthalmologist, cataract surgery, LASIK, retina treatment, eye treatment',
        'image' => '/images/og-default.jpg',
        'twitter_site' => '@blnk_eye',
    ];

    /**
     * Create a new middleware instance.
     */
    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only process HTML responses
        if (! $this->isHtmlResponse($response)) {
            return $response;
        }

        // Get the hospital context
        $hospital = $request->attributes->get('current_hospital');

        // Get location context if available
        $location = $request->attributes->get('location');

        // Get service context if available
        $service = $request->attributes->get('service');

        // Get disease context if available
        $disease = $request->attributes->get('disease');

        // Determine page type
        $pageType = $this->determinePageType($request);

        // Generate SEO data
        $seoData = $this->generateSeoData($request, $hospital, $location, $service, $disease, $pageType);

        // Inject SEO meta tags into response
        $response = $this->injectSeoTags($response, $seoData);

        return $response;
    }

    /**
     * Check if response is HTML.
     */
    protected function isHtmlResponse(Response $response): bool
    {
        $contentType = $response->headers->get('Content-Type', '');

        return str_contains($contentType, 'text/html');
    }

    /**
     * Determine the page type based on URL.
     */
    protected function determinePageType(Request $request): string
    {
        $path = $request->path();

        if ($path === '/' || $path === '') {
            return 'homepage';
        }

        if (preg_match('#^hospital/([^/]+)#', $path, $matches)) {
            return 'hospital';
        }

        if (preg_match('#^eye-hospital-in-#', $path)) {
            return 'location';
        }

        if (preg_match('#^doctors/#', $path)) {
            return 'doctors';
        }

        if (preg_match('#^services/#', $path) || preg_match('#^.*-surgery$#', $path)) {
            return 'service';
        }

        if (preg_match('#^.*-treatment-#', $path) || preg_match('#^.*-disease$#', $path)) {
            return 'disease';
        }

        if (preg_match('#^blog/#', $path) || preg_match('#^article/#', $path)) {
            return 'blog';
        }

        return 'general';
    }

    /**
     * Generate SEO data based on context.
     */
    protected function generateSeoData(
        Request $request,
        $hospital,
        $location,
        $service,
        $disease,
        string $pageType
    ): array {
        $url = url()->current();

        // Base SEO data
        $seo = [
            'url' => $url,
            'canonical' => $url,
            'title' => $this->defaults['title'],
            'description' => $this->defaults['description'],
            'keywords' => $this->defaults['keywords'],
            'image' => url($this->defaults['image']),
            'type' => 'website',
            'schemas' => [],
        ];

        // If we have a hospital, use its SEO data
        if ($hospital) {
            $hospitalSeo = $this->seoService->generateSeoMetadata(
                $hospital,
                $location,
                $service,
                $disease,
                $pageType
            );

            $seo = array_merge($seo, [
                'title' => $hospitalSeo['meta']['title'],
                'description' => $hospitalSeo['meta']['description'],
                'keywords' => $hospitalSeo['meta']['keywords'],
                'canonical' => $hospitalSeo['meta']['canonical'],
                'image' => $hospitalSeo['openGraph']['image'] ?? $seo['image'],
                'schemas' => $hospitalSeo['schemas'] ?? [],
            ]);
        }

        // Page-specific overrides
        switch ($pageType) {
            case 'homepage':
                $seo['title'] = $this->defaults['site_name'].' - Best Eye Hospital in India | Expert Eye Care';
                $seo['description'] = 'Find the best eye hospital near you. Blink Eye Hospitals offers cataract surgery, LASIK, retina treatment, and comprehensive eye care. Book free consultation today!';
                $seo['keywords'] = 'eye hospital, best eye hospital, cataract surgery, LASIK, retina treatment, eye care, ophthalmologist';
                break;

            case 'location':
                if ($location) {
                    $state = $location->parent?->name ?? $location->name;
                    $seo['title'] = "Best Eye Hospital in {$location->name} - {$this->defaults['site_name']} | Expert Eye Care";
                    $seo['description'] = "Find the best eye hospital in {$location->name}. Expert ophthalmologists, advanced cataract & LASIK surgery. Book your free consultation at our {$location->name} eye clinic!";
                    $seo['keywords'] = "eye hospital in {$location->name}, eye doctor {$location->name}, cataract surgery {$location->name}, LASIK {$location->name}, best eye care {$location->name}";
                }
                break;

            case 'service':
                if ($service) {
                    $serviceName = $service->name;
                    $locationName = $location?->name ?? 'India';
                    $seo['title'] = "Best {$serviceName} in {$locationName} - Expert {$serviceName} Treatment | {$this->defaults['site_name']}";
                    $seo['description'] = "Get expert {$serviceName} treatment in {$locationName}. Our experienced ophthalmologists use advanced technology for best results. Book free consultation!";
                    $seo['keywords'] = "{$serviceName}, {$serviceName} treatment, {$serviceName} surgery, best {$serviceName}";
                }
                break;

            case 'disease':
                if ($disease) {
                    $diseaseName = $disease->name;
                    $locationName = $location?->name ?? 'India';
                    $seo['title'] = "{$diseaseName} Treatment in {$locationName} - Expert Eye Care | {$this->defaults['site_name']}";
                    $seo['description'] = "Expert {$diseaseName} treatment in {$locationName}. Advanced diagnosis and treatment by experienced ophthalmologists. Book consultation now!";
                    $seo['keywords'] = "{$diseaseName}, {$diseaseName} treatment, eye disease, {$diseaseName} symptoms";
                }
                break;

            case 'doctors':
                $seo['title'] = 'Our Doctors - Expert Ophthalmologists | '.$this->defaults['site_name'];
                $seo['description'] = 'Meet our team of expert ophthalmologists at Blink Eye Hospitals. Our doctors specialize in cataract, LASIK, retina, and all eye care treatments.';
                $seo['keywords'] = 'eye doctor, ophthalmologist, eye specialist, best eye doctor';
                break;

            case 'blog':
                $seo['type'] = 'article';
                $seo['title'] = 'Eye Care Blog - Expert Articles | '.$this->defaults['site_name'];
                $seo['description'] = 'Read expert articles on eye health, cataract, LASIK, retina treatment, and more. Stay informed about the latest in eye care.';
                $seo['keywords'] = 'eye care blog, eye health, eye articles, ophthalmology';
                break;
        }

        return $seo;
    }

    /**
     * Inject SEO meta tags into the response.
     */
    protected function injectSeoTags(Response $response, array $seo): Response
    {
        $content = $response->getContent();

        // Build meta tags
        $metaTags = $this->buildMetaTags($seo);

        // Build Open Graph tags
        $ogTags = $this->buildOpenGraphTags($seo);

        // Build Twitter Card tags
        $twitterTags = $this->buildTwitterCardTags($seo);

        // Build canonical URL
        $canonical = '<link rel="canonical" href="'.htmlspecialchars($seo['canonical']).'">';

        // Build hreflang tags
        $hreflangTags = $this->buildHreflangTags($seo['canonical']);

        // Build JSON-LD schemas
        $jsonLd = $this->buildJsonLd($seo['schemas']);

        // Find the position to insert tags (after <head>)
        $headEndPosition = strpos($content, '</head>');

        if ($headEndPosition !== false) {
            $seoTags = "\n".$metaTags."\n".$ogTags."\n".$twitterTags."\n".$canonical."\n".$hreflangTags."\n".$jsonLd."\n";
            $content = substr($content, 0, $headEndPosition).$seoTags.substr($content, $headEndPosition);
            $response->setContent($content);
        }

        return $response;
    }

    /**
     * Build standard meta tags.
     */
    protected function buildMetaTags(array $seo): string
    {
        $tags = [];

        // Title
        $tags[] = '<title>'.htmlspecialchars($seo['title']).'</title>';

        // Description
        $tags[] = '<meta name="description" content="'.htmlspecialchars($seo['description']).'">';

        // Keywords
        $tags[] = '<meta name="keywords" content="'.htmlspecialchars($seo['keywords']).'">';

        // Robots
        $tags[] = '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">';

        // Author
        $tags[] = '<meta name="author" content="'.htmlspecialchars($this->defaults['site_name']).'">';

        // Theme color
        $tags[] = '<meta name="theme-color" content="#0066cc">';

        // Rating
        $tags[] = '<meta name="rating" content="General">';

        // Language
        $tags[] = '<meta name="language" content="English">';

        // Geographic tags
        $tags[] = '<meta name="geo.region" content="IN">';
        $tags[] = '<meta name="geo.placename" content="Punjab">';

        return implode("\n", $tags);
    }

    /**
     * Build Open Graph meta tags.
     */
    protected function buildOpenGraphTags(array $seo): string
    {
        $tags = [];

        $tags[] = '<meta property="og:title" content="'.htmlspecialchars($seo['title']).'">';
        $tags[] = '<meta property="og:description" content="'.htmlspecialchars($seo['description']).'">';
        $tags[] = '<meta property="og:url" content="'.htmlspecialchars($seo['canonical']).'">';
        $tags[] = '<meta property="og:type" content="'.htmlspecialchars($seo['type']).'">';
        $tags[] = '<meta property="og:image" content="'.htmlspecialchars($seo['image']).'">';
        $tags[] = '<meta property="og:image:width" content="1200">';
        $tags[] = '<meta property="og:image:height" content="630">';
        $tags[] = '<meta property="og:site_name" content="'.htmlspecialchars($this->defaults['site_name']).'">';
        $tags[] = '<meta property="og:locale" content="en_IN">';
        $tags[] = '<meta property="og:locale:alternate" content="en_US">';

        // For articles
        if ($seo['type'] === 'article') {
            $tags[] = '<meta property="article:published_time" content="'.now()->toIso8601String().'">';
            $tags[] = '<meta property="article:modified_time" content="'.now()->toIso8601String().'">';
            $tags[] = '<meta property="article:section" content="Eye Care">';
            $tags[] = '<meta property="article:tag" content="Eye Health">';
            $tags[] = '<meta property="article:tag" content="Ophthalmology">';
        }

        return implode("\n", $tags);
    }

    /**
     * Build Twitter Card meta tags.
     */
    protected function buildTwitterCardTags(array $seo): string
    {
        $tags = [];

        $tags[] = '<meta name="twitter:card" content="summary_large_image">';
        $tags[] = '<meta name="twitter:title" content="'.htmlspecialchars($seo['title']).'">';
        $tags[] = '<meta name="twitter:description" content="'.htmlspecialchars($seo['description']).'">';
        $tags[] = '<meta name="twitter:image" content="'.htmlspecialchars($seo['image']).'">';
        $tags[] = '<meta name="twitter:site" content="'.htmlspecialchars($this->defaults['twitter_site']).'">';
        $tags[] = '<meta name="twitter:creator" content="'.htmlspecialchars($this->defaults['twitter_site']).'">';

        return implode("\n", $tags);
    }

    /**
     * Build hreflang tags for multilingual SEO.
     */
    protected function buildHreflangTags(string $canonical): string
    {
        $tags = [];

        // English India (default)
        $tags[] = '<link rel="alternate" hreflang="en-IN" href="'.htmlspecialchars($canonical).'">';

        // English US
        $tags[] = '<link rel="alternate" hreflang="en" href="'.htmlspecialchars($canonical).'">';

        // Hindi India (if translated)
        // $tags[] = '<link rel="alternate" hreflang="hi-IN" href="' . htmlspecialchars($canonical) . '">';

        // X-default
        $tags[] = '<link rel="alternate" hreflang="x-default" href="'.htmlspecialchars($canonical).'">';

        return implode("\n", $tags);
    }

    /**
     * Build JSON-LD structured data.
     */
    protected function buildJsonLd(array $schemas): string
    {
        if (empty($schemas)) {
            // Add default organization schema
            $schemas[] = [
                '@context' => 'https://schema.org',
                '@type' => 'Organization',
                'name' => $this->defaults['site_name'],
                'url' => url('/'),
                'logo' => url('/logo.png'),
                'contactPoint' => [
                    '@type' => 'ContactPoint',
                    'telephone' => '+91-XXX-XXXX-XXXX',
                    'contactType' => 'Customer Service',
                    'areaServed' => 'IN',
                    'availableLanguage' => ['English', 'Hindi', 'Punjabi'],
                ],
                'sameAs' => [
                    'https://www.facebook.com/blinkeye',
                    'https://www.instagram.com/blinkeye',
                    'https://twitter.com/blnk_eye',
                    'https://www.youtube.com/blinkeye',
                ],
            ];
        }

        $html = '';
        foreach ($schemas as $schema) {
            $html .= '<script type="application/ld+json">'.json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE).'</script>';
        }

        return $html;
    }
}
