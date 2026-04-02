<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Disease;
use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\SeoMetadata;
use App\Models\Service;
use Illuminate\Http\Request;

class WebEngineController extends Controller
{
    /**
     * Get list of hospitals for landing page
     */
    public function getHospitals()
    {
        $hospitals = Hospital::with(['location', 'reviews'])
            ->where('is_active', true)
            ->get()
            ->map(function ($hospital) {
            $avgRating = $hospital->reviews->avg('rating');
            $reviewCount = $hospital->reviews->count();

            return [
            'id' => $hospital->id,
            'name' => $hospital->name,
            'slug' => $hospital->slug,
            'domain' => $hospital->domain,
            'subdomain' => $hospital->subdomain,
            'custom_domain' => $hospital->custom_domain,
            'email' => $hospital->email,
            'phone' => $hospital->phone,
            'template_id' => $hospital->template_id,
            'is_active' => $hospital->is_active,
            'location' => $hospital->location ? [
            'id' => $hospital->location->id,
            'name' => $hospital->location->name,
            'slug' => $hospital->location->slug,
            'type' => $hospital->location->type,
            'parent_id' => $hospital->location->parent_id,
            ] : null,
            'lat' => $hospital->lat,
            'lng' => $hospital->lng,
            'image' => $hospital->image,
            'primary_color' => $hospital->primary_color,
            'secondary_color' => $hospital->secondary_color,
            'background_image' => $hospital->background_image,
            'map_url' => $hospital->map_url,
            'map_zoom' => $hospital->map_zoom,
            'average_rating' => $avgRating ? round($avgRating, 1) : 0,
            'review_count' => $reviewCount,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $hospitals,
        ]);
    }

    /**
     * Get hospital by slug with all associated data
     */
    public function getHospitalBySlug($slug)
    {
        $hospital = Hospital::with(['location', 'galleries', 'doctors', 'reviews', 'seoMetadata', 'services', 'diseases'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$hospital) {
            return response()->json([
                'success' => false,
                'message' => 'Hospital not found',
            ], 404);
        }

        $avgRating = $hospital->reviews->avg('rating');
        $reviewCount = $hospital->reviews->count();

        // Get hospital-specific services (via pivot), fallback to all if none assigned
        $services = $hospital->services->isNotEmpty()
            ? $hospital->services->where('is_active', true)
            : Service::where('is_active', true)->get();

        // Get hospital-specific diseases (via pivot), fallback to all if none assigned
        $diseases = $hospital->diseases->isNotEmpty()
            ? $hospital->diseases->where('is_active', true)
            : Disease::where('is_active', true)->get();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $hospital->id,
                'name' => $hospital->name,
                'slug' => $hospital->slug,
                'domain' => $hospital->domain,
                'subdomain' => $hospital->subdomain,
                'custom_domain' => $hospital->custom_domain,
                'email' => $hospital->email,
                'phone' => $hospital->phone,
                'template_id' => $hospital->template_id,
                'is_active' => $hospital->is_active,
                'location' => $hospital->location ? [
                    'id' => $hospital->location->id,
                    'name' => $hospital->location->name,
                    'slug' => $hospital->location->slug,
                    'type' => $hospital->location->type,
                    'parent_id' => $hospital->location->parent_id,
                ] : null,
                'lat' => $hospital->lat,
                'lng' => $hospital->lng,
                'image' => $hospital->image,
                'primary_color' => $hospital->primary_color,
                'secondary_color' => $hospital->secondary_color,
                'background_image' => $hospital->background_image,
                'address' => $hospital->address,
                'emergency_contact' => $hospital->emergency_contact,
                'whatsapp' => $hospital->whatsapp,
                'working_hours_weekday' => $hospital->working_hours_weekday,
                'working_hours_saturday' => $hospital->working_hours_saturday,
                'working_hours_sunday' => $hospital->working_hours_sunday,
                'is_24_7_emergency' => (bool)$hospital->is_24_7_emergency,
                'facebook' => $hospital->facebook,
                'instagram' => $hospital->instagram,
                'twitter' => $hospital->twitter,
                'youtube' => $hospital->youtube,
                'linkedin' => $hospital->linkedin,
                'short_description' => $hospital->short_description,
                'about_us' => $hospital->about_us,
                'established_year' => $hospital->established_year,
                'number_of_beds' => $hospital->number_of_beds,
                'number_of_doctors' => $hospital->number_of_doctors,
                'map_url' => $hospital->map_url,
                'map_zoom' => $hospital->map_zoom,
                'average_rating' => $avgRating ? round($avgRating, 1) : 0,
                'review_count' => $reviewCount,
                'site_settings' => \App\Models\SiteSetting::getAllGrouped(),
                'galleries' => $hospital->galleries->map(function ($gallery) {
            return [
                        'id' => $gallery->id,
                        'image' => $gallery->image,
                        'caption' => $gallery->caption,
                    ];
        }),
                'doctors' => $hospital->doctors->map(function ($doctor) {
            return [
                        'id' => $doctor->id,
                        'name' => $doctor->name,
                        'specialty' => $doctor->specialty,
                        'bio' => $doctor->bio,
                        'image' => $doctor->image,
                        'slug' => $doctor->slug,
                        'is_active' => $doctor->is_active,
                    ];
        }),
                'reviews' => $hospital->reviews->map(function ($review) {
            return [
                        'id' => $review->id,
                        'author_name' => $review->author_name,
                        'rating' => $review->rating,
                        'content' => $review->content,
                        'source' => $review->source,
                    ];
        }),
                'services' => $services->map(function ($service) {
            return [
                        'id' => $service->id,
                        'name' => $service->name,
                        'slug' => $service->slug,
                        'description' => $service->description,
                        'image' => $service->image,
                        'is_active' => $service->is_active,
                        'galleries' => $service->galleries->map(function ($gallery) {
                    return [
                                    'id' => $gallery->id,
                                    'image' => $gallery->image,
                                    'caption' => $gallery->caption,
                                ];
                }
                        ),
                        ];
            }),
                'diseases' => $diseases->map(function ($disease) {
            return [
                        'id' => $disease->id,
                        'name' => $disease->name,
                        'slug' => $disease->slug,
                        'description' => $disease->description,
                        'image' => $disease->image,
                        'is_active' => $disease->is_active,
                    ];
        }),
                'seo_metadata' => $hospital->seoMetadata ? [
                    'id' => $hospital->seoMetadata->id,
                    'meta_title' => $hospital->seoMetadata->meta_title,
                    'meta_description' => $hospital->seoMetadata->meta_description,
                    'schema_json' => $hospital->seoMetadata->schema_json,
                ] : null,
            ],
        ]);
    }

    /**
     * Get tenant configuration by domain/subdomain
     */
    public function getTenantConfig(Request $request)
    {
        $domain = $request->input('domain');
        $subdomain = $request->input('subdomain');

        if (!$domain && !$subdomain) {
            return response()->json([
                'success' => false,
                'message' => 'Domain or subdomain is required',
            ], 400);
        }

        $hospital = null;

        if ($domain) {
            $hospital = Hospital::where('domain', $domain)->where('is_active', true)->first();
        }
        elseif ($subdomain) {
            $hospital = Hospital::where('subdomain', $subdomain)->where('is_active', true)->first();
        }

        if (!$hospital) {
            return response()->json([
                'success' => false,
                'message' => 'Tenant configuration not found',
            ], 404);
        }

        $hospital->load('location');

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $hospital->id,
                'name' => $hospital->name,
                'domain' => $hospital->domain,
                'subdomain' => $hospital->subdomain,
                'custom_domain' => $hospital->custom_domain,
                'email' => $hospital->email,
                'phone' => $hospital->phone,
                'template_id' => $hospital->template_id,
                'is_active' => $hospital->is_active,
                'location' => $hospital->location ? [
                    'id' => $hospital->location->id,
                    'name' => $hospital->location->name,
                    'slug' => $hospital->location->slug,
                    'type' => $hospital->location->type,
                    'parent_id' => $hospital->location->parent_id,
                ] : null,
                'lat' => $hospital->lat,
                'lng' => $hospital->lng,
                'image' => $hospital->image,
                'primary_color' => $hospital->primary_color,
                'secondary_color' => $hospital->secondary_color,
                'background_image' => $hospital->background_image,
                'address' => $hospital->address,
                'emergency_contact' => $hospital->emergency_contact,
                'whatsapp' => $hospital->whatsapp,
                'working_hours_weekday' => $hospital->working_hours_weekday,
                'working_hours_saturday' => $hospital->working_hours_saturday,
                'working_hours_sunday' => $hospital->working_hours_sunday,
                'is_24_7_emergency' => (bool)$hospital->is_24_7_emergency,
                'facebook' => $hospital->facebook,
                'instagram' => $hospital->instagram,
                'twitter' => $hospital->twitter,
                'youtube' => $hospital->youtube,
                'linkedin' => $hospital->linkedin,
                'map_url' => $hospital->map_url,
                'map_zoom' => $hospital->map_zoom,
                'site_settings' => \App\Models\SiteSetting::getAllGrouped(),
            ],
        ]);
    }

    /**
     * Get hospital details by ID
     */
    public function getHospitalDetails($id)
    {
        $hospital = Hospital::with(['location', 'galleries'])->where('id', $id)->where('is_active', true)->first();

        if (!$hospital) {
            return response()->json([
                'success' => false,
                'message' => 'Hospital not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $hospital->id,
                'name' => $hospital->name,
                'domain' => $hospital->domain,
                'subdomain' => $hospital->subdomain,
                'custom_domain' => $hospital->custom_domain,
                'email' => $hospital->email,
                'phone' => $hospital->phone,
                'template_id' => $hospital->template_id,
                'is_active' => $hospital->is_active,
                'location' => $hospital->location ? [
                    'id' => $hospital->location->id,
                    'name' => $hospital->location->name,
                    'slug' => $hospital->location->slug,
                    'type' => $hospital->location->type,
                    'parent_id' => $hospital->location->parent_id,
                ] : null,
                'lat' => $hospital->lat,
                'lng' => $hospital->lng,
                'image' => $hospital->image,
                'primary_color' => $hospital->primary_color,
                'secondary_color' => $hospital->secondary_color,
                'background_image' => $hospital->background_image,
                'address' => $hospital->address,
                'emergency_contact' => $hospital->emergency_contact,
                'whatsapp' => $hospital->whatsapp,
                'working_hours_weekday' => $hospital->working_hours_weekday,
                'working_hours_saturday' => $hospital->working_hours_saturday,
                'working_hours_sunday' => $hospital->working_hours_sunday,
                'is_24_7_emergency' => (bool)$hospital->is_24_7_emergency,
                'facebook' => $hospital->facebook,
                'instagram' => $hospital->instagram,
                'twitter' => $hospital->twitter,
                'youtube' => $hospital->youtube,
                'linkedin' => $hospital->linkedin,
                'map_url' => $hospital->map_url,
                'map_zoom' => $hospital->map_zoom,
                'site_settings' => \App\Models\SiteSetting::getAllGrouped(),
                'galleries' => $hospital->galleries->map(function ($gallery) {
            return [
                        'id' => $gallery->id,
                        'image' => $gallery->image,
                        'caption' => $gallery->caption,
                    ];
        }),
            ],
        ]);
    }

    /**
     * Get doctors associated with a hospital
     */
    public function getDoctors($hospitalId)
    {
        $doctors = Doctor::where('hospital_id', $hospitalId)->where('is_active', true)->get();

        return response()->json([
            'success' => true,
            'data' => $doctors->map(function ($doctor) {
            return [
                    'id' => $doctor->id,
                    'name' => $doctor->name,
                    'specialty' => $doctor->specialty,
                    'bio' => $doctor->bio,
                    'image' => $doctor->image,
                    'slug' => $doctor->slug,
                    'is_active' => $doctor->is_active,
                ];
        }),
        ]);
    }

    /**
     * Get reviews associated with a hospital or globally
     */
    public function getReviews(Request $request)
    {
        $hospitalId = $request->query('hospital_id');

        $query = \App\Models\Review::query();

        if ($hospitalId) {
            $query->where('hospital_id', $hospitalId);
        }

        $reviews = $query->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reviews->map(function ($review) {
            return [
                    'id' => $review->id,
                    'author_name' => $review->author_name,
                    'rating' => $review->rating,
                    'content' => $review->content,
                    'source' => $review->source,
                    'created_at' => $review->created_at,
                ];
        }),
        ]);
    }

    /**
     * Get services associated with a hospital
     */
    public function getServices($hospitalId)
    {
        $hospital = Hospital::with('services')->find($hospitalId);

        // Use hospital-specific services if assigned, otherwise return all
        if ($hospital && $hospital->services->isNotEmpty()) {
            $services = $hospital->services->where('is_active', true);
        }
        else {
            $services = Service::where('is_active', true)->get();
        }

        return response()->json([
            'success' => true,
            'data' => $services->map(function ($service) {
            return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'slug' => $service->slug,
                    'description' => $service->description,
                    'image' => $service->image,
                    'is_active' => $service->is_active,
                    'galleries' => $service->galleries->map(function ($gallery) {
                return [
                            'id' => $gallery->id,
                            'image' => $gallery->image,
                            'caption' => $gallery->caption,
                        ];
            }
                ),
                ];
        }),
        ]);
    }

    /**
     * Get diseases treated at a hospital
     */
    public function getDiseases($hospitalId)
    {
        $hospital = Hospital::with('diseases')->find($hospitalId);

        // Use hospital-specific diseases if assigned, otherwise return all
        if ($hospital && $hospital->diseases->isNotEmpty()) {
            $diseases = $hospital->diseases->where('is_active', true);
        }
        else {
            $diseases = Disease::where('is_active', true)->get();
        }

        return response()->json([
            'success' => true,
            'data' => $diseases->map(function ($disease) {
            return [
                    'id' => $disease->id,
                    'name' => $disease->name,
                    'slug' => $disease->slug,
                    'description' => $disease->description,
                    'image' => $disease->image,
                    'is_active' => $disease->is_active,
                ];
        }),
        ]);
    }

    /**
     * Get SEO metadata for pages or models
     */
    public function getSeoMetadata(Request $request)
    {
        $modelType = $request->input('model_type');
        $modelId = $request->input('model_id');
        $hospitalId = $request->input('hospital_id');

        $query = SeoMetadata::query();

        if ($modelType) {
            $query->where('model_type', $modelType);
        }

        if ($modelId) {
            $query->where('model_id', $modelId);
        }

        if ($hospitalId) {
            // If hospital_id is provided, assume we're looking for hospital's SEO metadata
            $query->where('model_type', Hospital::class)
                ->where('model_id', $hospitalId);
        }

        $seoMetadata = $query->first();

        if (!$seoMetadata) {
            return response()->json([
                'success' => false,
                'message' => 'SEO metadata not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $seoMetadata->id,
                'model_type' => $seoMetadata->model_type,
                'model_id' => $seoMetadata->model_id,
                'meta_title' => $seoMetadata->meta_title,
                'meta_description' => $seoMetadata->meta_description,
                'schema_json' => $seoMetadata->schema_json,
            ],
        ]);
    }

    /**
     * Test endpoint
     */
    public function test()
    {
        return response()->json([
            'success' => true,
            'message' => 'API is running',
        ]);
    }

    /**
     * Get all diseases (without requiring hospital ID)
     * Used by frontend for main site disease listing
     */
    public function getAllDiseases()
    {
        $diseases = Disease::where('is_active', true)->get();

        return response()->json([
            'success' => true,
            'data' => $diseases->map(function ($disease) {
            return [
                    'id' => $disease->id,
                    'name' => $disease->name,
                    'slug' => $disease->slug,
                    'description' => $disease->description,
                    'image' => $disease->image,
                    'is_active' => $disease->is_active,
                ];
        }),
        ]);
    }

    /**
     * Get a disease by slug
     */
    public function getDiseaseBySlug($slug)
    {
        $disease = Disease::findBySlug($slug);

        if (!$disease) {
            return response()->json([
                'success' => false,
                'message' => 'Disease not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $disease->id,
                'name' => $disease->name,
                'slug' => $disease->slug,
                'description' => $disease->description,
                'image' => $disease->image,
                'is_active' => $disease->is_active,
                'galleries' => $disease->galleries->map(function ($gallery) {
            return [
                        'id' => $gallery->id,
                        'image' => $gallery->image,
                        'caption' => $gallery->caption,
                    ];
        }),
            ],
        ]);
    }
}