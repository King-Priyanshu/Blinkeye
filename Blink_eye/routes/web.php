<?php

use App\Http\Controllers\Admin\BlogGalleryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DiseaseController;
use App\Http\Controllers\Admin\DiseaseGalleryController;
use App\Http\Controllers\Admin\DoctorController;
use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\Admin\HospitalGalleryController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ServiceGalleryController;
use App\Http\Controllers\Admin\TemplateController;
use App\Http\Controllers\Admin\TimeSlotController;
use App\Http\Controllers\Frontend\AppointmentController;
use App\Http\Controllers\Frontend\HospitalController;
use App\Http\Controllers\Frontend\LocationPageController;
use App\Http\Controllers\Frontend\PageController;
use App\Http\Controllers\Frontend\SearchController;
use App\Http\Controllers\Frontend\SitemapController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckAdminRole;
use App\Http\Middleware\IdentifyHospitalByDomain;
use App\Models\Blog;
use App\Models\Disease;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
 |--------------------------------------------------------------------------
 | Serve React SPA assets (needed for php artisan serve - no .htaccess support)
 |--------------------------------------------------------------------------
 */
Route::get('/assets/{path}', function ($path) {
    $file = public_path('hospital-app/assets/' . $path);
    if (!file_exists($file)) {
        abort(404);
    }

    $extension = pathinfo($file, PATHINFO_EXTENSION);
    $mimeTypes = [
        'js'   => 'application/javascript',
        'css'  => 'text/css',
        'svg'  => 'image/svg+xml',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif'  => 'image/gif',
        'woff' => 'font/woff',
        'woff2'=> 'font/woff2',
        'ttf'  => 'font/ttf',
        'eot'  => 'application/vnd.ms-fontobject',
        'ico'  => 'image/x-icon',
    ];

    return response(file_get_contents($file))
        ->header('Content-Type', $mimeTypes[$extension] ?? 'application/octet-stream')
        ->header('Cache-Control', 'public, max-age=31536000, immutable');
})->where('path', '.*');

Route::get('/hospital-app/{path}', function ($path) {
    $file = public_path('hospital-app/' . $path);
    if (!file_exists($file) || is_dir($file)) {
        abort(404);
    }

    $extension = pathinfo($file, PATHINFO_EXTENSION);
    $mimeTypes = [
        'js'   => 'application/javascript',
        'css'  => 'text/css',
        'svg'  => 'image/svg+xml',
        'html' => 'text/html',
        'ico'  => 'image/x-icon',
    ];

    return response(file_get_contents($file))
        ->header('Content-Type', $mimeTypes[$extension] ?? 'application/octet-stream');
})->where('path', '.*');

/*
 |--------------------------------------------------------------------------
 | Hospital Identification Middleware (applied globally to all frontend routes)
 |--------------------------------------------------------------------------
 */
Route::middleware([IdentifyHospitalByDomain::class])->group(function () {

    /*
     |--------------------------------------------------------------------------
     | Homepage — context-aware, shows localized blogs if on a hospital subdomain
     |--------------------------------------------------------------------------
     */
    Route::get('/', function (Request $request) {
        $currentHospital = $request->attributes->get('current_hospital');

        // Get only blog templates (not real blogs) for page generation
        $blogs = Blog::with('groups.items.item')->where('is_active', true)->where('is_template', true)->get();

        // If on a hospital subdomain, filter blogs to that hospital's tenant OR global ones
        if ($currentHospital) {
            $blogs = $blogs->filter(fn ($b) => ! $b->tenant_id || $b->tenant_id == $currentHospital->id);
        }

        // Generate all possible page URLs from the templates
        $featuredBlogs = collect();
        foreach ($blogs as $blog) {
            $template = $blog->slug_template;
            $titleTemplate = $blog->title_template;

            $allowedItems = $blog->groups->flatMap->items->pluck('item');
            $allLocations = $allowedItems->whereInstanceOf(Location::class);
            $allServices = $allowedItems->whereInstanceOf(Service::class);
            $allDiseases = $allowedItems->whereInstanceOf(Disease::class);

            // If on a hospital subdomain, narrow down locations to the hospital's area
            if ($currentHospital && $currentHospital->location_id) {
                $hospitalLoc = $currentHospital->location;
                if ($hospitalLoc) {
                    $familyIds = collect([$hospitalLoc->id]);
                    if ($hospitalLoc->parent_id) {
                        $familyIds->push($hospitalLoc->parent_id);
                        // Also include sibling locations (same district)
                        $siblingIds = Location::where('parent_id', $hospitalLoc->parent_id)->pluck('id');
                        $familyIds = $familyIds->merge($siblingIds);
                    }
                    $childIds = Location::where('parent_id', $hospitalLoc->id)->pluck('id');
                    $familyIds = $familyIds->merge($childIds)->unique();

                    $filteredLocations = $allLocations->filter(fn ($l) => $familyIds->contains($l->id));
                    if ($filteredLocations->isNotEmpty()) {
                        $allLocations = $filteredLocations;
                    }
                }
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

                        $featuredBlogs->push([
                            'url' => '/'.$url,
                            'title' => trim($title),
                            'location' => $loc ? $loc->name : null,
                            'type' => $needsService ? 'service' : 'disease',
                            'hospital_id' => $blog->tenant_id,
                        ]);
                    }
                }
            }
        }

        // Get all locations for the location filter dropdown
        $locations = Location::active()
            ->orderBy('type')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'type', 'parent_id']);

        // Get all diseases and services for quick-link cards
        $diseases = Disease::where('is_active', true)->get(['id', 'name', 'slug', 'description', 'image']);
        $services = Service::where('is_active', true)->get(['id', 'name', 'slug', 'description', 'image']);

        // Get all hospitals for the "Our Hospitals" section
        $hospitals = Hospital::with('location')
            ->where('is_active', true)
            ->get(['id', 'name', 'slug', 'subdomain', 'phone', 'email', 'location_id', 'image']);

        // Get reviews
        $reviews = App\Models\Review::when($currentHospital, fn ($q) => $q->where('hospital_id', $currentHospital->id))
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get(['id', 'author_name', 'rating', 'content', 'source']);

        $siteSettings = \App\Models\SiteSetting::getAllGrouped();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'featuredBlogs' => $featuredBlogs->values(),
            'locations' => $locations,
            'diseases' => $diseases,
            'services' => $services,
            'hospitals' => $hospitals,
            'reviews' => $reviews,
            'siteSettings' => $siteSettings,
        ]);
    }
    );

    /*
     |--------------------------------------------------------------------------
     | SEO: XML Sitemap (for Google Search Console)
     |--------------------------------------------------------------------------
     */
    // Location-based SEO pages
    Route::get('/eye-hospital-in-{location}', [LocationPageController::class, 'eyeHospitalIn'])
        ->name('location.hospital');
    Route::get('/{service}-in-{location}', [LocationPageController::class, 'serviceIn'])
        ->where('service', '[a-z0-9-]+')
        ->where('location', '[a-z0-9-]+')
        ->name('location.service');
    Route::get('/{disease}-treatment-{location}', [LocationPageController::class, 'diseaseTreatmentIn'])
        ->where('disease', '[a-z0-9-]+')
        ->where('location', '[a-z0-9-]+')
        ->name('location.disease');

    Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
    Route::get('/sitemap-index.xml', [SitemapController::class, 'indexIndex'])->name('sitemap.index');
    Route::get('/sitemap-images.xml', [SitemapController::class, 'images'])->name('sitemap.images');
    Route::get('/sitemap-videos.xml', [SitemapController::class, 'videos'])->name('sitemap.videos');

    /*
     |--------------------------------------------------------------------------
     | Search API (autocomplete + smart URL generation)
     |--------------------------------------------------------------------------
     */
    Route::get('/api/search', [SearchController::class, 'search'])->name('api.search');
    Route::get('/api/pages', [SearchController::class, 'allPages'])->name('api.pages');

    /*
     |--------------------------------------------------------------------------
     | Auth & Dashboard
     |--------------------------------------------------------------------------
     */
    Route::get('/dashboard', function () {
        return redirect()->route('admin.dashboard.index');
    }
    )->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    }
    );

    /*
     |--------------------------------------------------------------------------
     | Public Appointment Booking (no login required)
     |--------------------------------------------------------------------------
     */
    Route::get('/book-appointment', [AppointmentController::class, 'create'])->name('appointment.create');
    Route::post('/book-appointment', [AppointmentController::class, 'store'])->name('appointment.store');

    /*
     |--------------------------------------------------------------------------
     | Hospital-Specific Pages (when subdomain is detected)
     |--------------------------------------------------------------------------
     */
    Route::get('/hospital', [HospitalController::class, 'index'])->name('hospital.index');
    Route::get('/doctors', [HospitalController::class, 'doctors'])->name('hospital.doctors');
    Route::get('/services', [HospitalController::class, 'services'])->name('hospital.services');
    Route::get('/contact', [HospitalController::class, 'contact'])->name('hospital.contact');
    Route::post('/contact', [HospitalController::class, 'submitContact'])->name('hospital.contact.submit');

    /*
     |--------------------------------------------------------------------------
     | Admin Panel
     |--------------------------------------------------------------------------
     */
    Route::middleware(['auth', 'verified', CheckAdminRole::class])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
        Route::resource('locations', LocationController::class);
        Route::resource('hospitals', App\Http\Controllers\Admin\HospitalController::class);
        Route::resource('diseases', DiseaseController::class);
        Route::resource('services', ServiceController::class);
        Route::resource('groups', GroupController::class);
        Route::resource('templates', TemplateController::class);
        Route::resource('doctors', DoctorController::class);
        Route::resource('reviews', ReviewController::class);
        Route::get('leads', [LeadController::class, 'index'])->name('leads.index');
        Route::patch('leads/{lead}/status', [LeadController::class, 'updateStatus'])->name('leads.update-status');
        Route::post('leads', [LeadController::class, 'store'])->name('leads.store');

        Route::get('settings', [\App\Http\Controllers\Admin\SiteSettingController::class, 'index'])->name('settings.index');
        Route::post('settings', [\App\Http\Controllers\Admin\SiteSettingController::class, 'update'])->name('settings.update');


        Route::post('hospitals/{hospital}/gallery', [HospitalGalleryController::class, 'store'])->name('hospitals.gallery.store');
        Route::delete('hospitals/{hospital}/gallery/{gallery}', [HospitalGalleryController::class, 'destroy'])->name('hospitals.gallery.destroy');

        Route::post('services/{service}/gallery', [ServiceGalleryController::class, 'store'])->name('services.gallery.store');
        Route::delete('services/{service}/gallery/{gallery}', [ServiceGalleryController::class, 'destroy'])->name('services.gallery.destroy');

        Route::post('diseases/{disease}/gallery', [DiseaseGalleryController::class, 'store'])->name('diseases.gallery.store');
        Route::delete('diseases/{disease}/gallery/{gallery}', [DiseaseGalleryController::class, 'destroy'])->name('diseases.gallery.destroy');

        Route::post('templates/{template}/gallery', [BlogGalleryController::class, 'store'])->name('templates.gallery.store');
        Route::delete('templates/{template}/gallery/{gallery}', [BlogGalleryController::class, 'destroy'])->name('templates.gallery.destroy');

        Route::get('appointments', [App\Http\Controllers\Admin\AppointmentController::class, 'index'])->name('appointments.index');
        Route::get('appointments/{appointment}', [App\Http\Controllers\Admin\AppointmentController::class, 'show'])->name('appointments.show');
        Route::patch('appointments/{appointment}/status', [App\Http\Controllers\Admin\AppointmentController::class, 'updateStatus'])->name('appointments.update-status');
        Route::patch('appointments/{appointment}/reschedule', [App\Http\Controllers\Admin\AppointmentController::class, 'reschedule'])->name('appointments.reschedule');
        Route::delete('appointments/{appointment}', [App\Http\Controllers\Admin\AppointmentController::class, 'destroy'])->name('appointments.destroy');

        // Time Slots Management
        Route::get('time-slots', [TimeSlotController::class, 'index'])->name('time-slots.index');
        Route::get('time-slots/create', [TimeSlotController::class, 'create'])->name('time-slots.create');
        Route::post('time-slots', [TimeSlotController::class, 'store'])->name('time-slots.store');
        Route::get('time-slots/{timeSlot}/edit', [TimeSlotController::class, 'edit'])->name('time-slots.edit');
        Route::patch('time-slots/{timeSlot}', [TimeSlotController::class, 'update'])->name('time-slots.update');
        Route::delete('time-slots/{timeSlot}', [TimeSlotController::class, 'destroy'])->name('time-slots.destroy');
        Route::get('time-slots/doctors', [TimeSlotController::class, 'getDoctors'])->name('time-slots.get-doctors');
        Route::get('time-slots/available', [TimeSlotController::class, 'getAvailableSlots'])->name('time-slots.available');
    }
    );

    require __DIR__.'/auth.php';

    /*
     |--------------------------------------------------------------------------
     | Catch-all route for React SPA + dynamic SEO pages (MUST be last)
     |--------------------------------------------------------------------------
     */
    Route::get('/{slug}', function(Request $request, $slug) {
        // Extract first path segment to check if it's a hospital slug
        $parts = explode('/', trim($slug, '/'));
        $potentialHospitalSlug = $parts[0];

        // Check if the first segment matches an active hospital slug
        if ($potentialHospitalSlug && \App\Models\Hospital::where('slug', $potentialHospitalSlug)->where('is_active', true)->exists()) {
            // Serve the React SPA index.html for all hospital routes
            $spaIndex = public_path('hospital-app/index.html');
            if (file_exists($spaIndex)) {
                return response(file_get_contents($spaIndex))
                    ->header('Content-Type', 'text/html')
                    ->header('Cache-Control', 'no-cache, no-store, must-revalidate');
            }
        }

        // Fallback to dynamic SEO pages for non-hospital routes
        return app(\App\Http\Controllers\Frontend\PageController::class)->__invoke($request, $slug, app(\App\Services\TemplateEngineService::class));
    })->where('slug', '.*')->name('frontend.page');

}); // End of IdentifyHospitalByDomain middleware group
