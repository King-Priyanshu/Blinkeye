<?php

use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Api\WebEngineController;
use App\Http\Controllers\Frontend\SearchController;
use App\Models\Blog;
use App\Models\Disease;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
 |--------------------------------------------------------------------------
 | API Routes
 |--------------------------------------------------------------------------
 */

Route::prefix('web-engine')->group(function () {
    // Controller actions for all web engine API endpoints
    Route::get('/test', [WebEngineController::class , 'test']);
    Route::get('/hospitals', [WebEngineController::class , 'getHospitals']);
    Route::get('/hospital/{slug}', [WebEngineController::class , 'getHospitalBySlug']);
    Route::get('/hospital/{id}/details', [WebEngineController::class , 'getHospitalDetails']);
    Route::get('/hospital/{hospitalId}/services', [WebEngineController::class , 'getServices']);
    Route::get('/hospital/{hospitalId}/doctors', [WebEngineController::class , 'getDoctors']);
    Route::get('/hospital/{hospitalId}/diseases', [WebEngineController::class , 'getDiseases']);
    Route::get('/reviews', [WebEngineController::class , 'getReviews']);
    Route::get('/diseases', [WebEngineController::class , 'getAllDiseases']); // Fixed: now uses getAllDiseases method
    Route::get('/diseases/{slug}', [WebEngineController::class , 'getDiseaseBySlug']); // Fixed: now implemented in controller

    // Let's implement this safely.

    // Get all real blogs or templates with content for frontend display
    // Filter by hospital_id if provided - includes global blogs (tenant_id = null) + hospital-specific blogs
    Route::get('/blogs', function (Request $request) {
            $hospitalId = $request->query('hospital_id');

            // First try to get real blogs (is_template = false)
            $query = Blog::where('is_active', true)
                ->where('is_template', false);

            // Filter by hospital if specified - include global + hospital-specific
            if ($hospitalId) {
                $query->where(function ($q) use ($hospitalId) {
                            $q->whereNull('tenant_id')
                                ->orWhere('tenant_id', $hospitalId);
                        }
                        );
                    }

                    $blogs = $query->orderBy('created_at', 'desc')
                        ->get(['id', 'title', 'slug', 'excerpt', 'image', 'created_at', 'tenant_id', 'is_template']);

                    // If no real blogs found, also get templates
                    if ($blogs->isEmpty() && $hospitalId) {
                        $templates = Blog::where('is_active', true)
                            ->where('is_template', true)
                            ->where(function ($q) use ($hospitalId) {
                    $q->whereNull('tenant_id')
                        ->orWhere('tenant_id', $hospitalId);
                }
                )
                    ->orderBy('created_at', 'desc')
                    ->limit(3)
                    ->get(['id', 'title_template as title', 'slug_template as slug', 'content_template as excerpt', 'image', 'created_at', 'tenant_id', 'is_template']);

                $blogs = $templates;
            }

            return response()->json([
            'success' => true,
            'data' => $blogs,
            ]);
        }
        );

        // Get blog by slug
        Route::get('/blogs/{slug}', function ($slug) {
            $blog = Blog::where('slug', $slug)
                ->where('is_active', true)
                ->first();

            if (!$blog) {
                // Try slug_template for templates
                $blog = Blog::where('slug_template', $slug)
                    ->where('is_active', true)
                    ->first();
            }

            if (!$blog) {
                return response()->json([
                'success' => false,
                'message' => 'Blog not found',
                ], 404);
            }

            return response()->json([
            'success' => true,
            'data' => $blog,
            ]);
        }
        );

        // Tenant configuration endpoint
        Route::get('/tenant-config', [WebEngineController::class , 'getTenantConfig']);

        // SEO Metadata endpoint
        Route::get('/seo-metadata', [WebEngineController::class , 'getSeoMetadata']);
    });

/*
 |--------------------------------------------------------------------------
 | Additional API Routes
 |--------------------------------------------------------------------------
 */

// Lead submission - rate limited to prevent spam
Route::post('/leads', [LeadController::class , 'store'])->middleware('throttle:10,1');

// Search
Route::get('/search', [SearchController::class , 'index']);