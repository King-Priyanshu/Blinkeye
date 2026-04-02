<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Disease;
use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\Lead;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HospitalController extends Controller
{
    /**
     * Display the hospital-specific homepage.
     */
    public function index(Request $request)
    {
        $currentHospital = $request->attributes->get('current_hospital');

        if (! $currentHospital) {
            // If no hospital context, show main site
            return redirect('/');
        }

        // Load related data
        $currentHospital->load(['location', 'galleries']);

        // Get featured doctors (limit 6)
        $doctors = Doctor::where('hospital_id', $currentHospital->id)
            ->where('is_active', true)
            ->limit(6)
            ->get(['id', 'name', 'specialty', 'image', 'slug']);

        // Get featured services (limit 8)
        $services = Service::where('is_active', true)
            ->limit(8)
            ->get(['id', 'name', 'slug', 'description', 'image']);

        // Get diseases (limit 6)
        $diseases = Disease::where('is_active', true)
            ->limit(6)
            ->get(['id', 'name', 'slug', 'description', 'image']);

        // Get all hospitals for footer/navigation
        $allHospitals = Hospital::with('location')
            ->where('is_active', true)
            ->get(['id', 'name', 'subdomain', 'phone', 'location_id', 'image']);

        // Get locations for quick links
        $locations = Location::active()
            ->orderBy('type')
            ->orderBy('name')
            ->limit(20)
            ->get(['id', 'name', 'slug', 'type', 'parent_id']);

        // SEO
        $title = $currentHospital->name.' - Best Eye Hospital in '.($currentHospital->location->name ?? 'India');
        $description = 'Get expert eye care at '.$currentHospital->name.'. Best ophthalmologists, advanced LASIK, cataract, and retina treatments. Book your free consultation today.';

        return Inertia::render('Frontend/Hospital/Home', [
            'hospital' => $currentHospital,
            'doctors' => $doctors,
            'services' => $services,
            'diseases' => $diseases,
            'hospitals' => $allHospitals,
            'locations' => $locations,
            'seo' => [
                'title' => $title,
                'description' => $description,
            ],
        ]);
    }

    /**
     * Display doctors listing for the hospital.
     */
    public function doctors(Request $request)
    {
        $currentHospital = $request->attributes->get('current_hospital');

        if (! $currentHospital) {
            return redirect('/');
        }

        $doctors = Doctor::where('hospital_id', $currentHospital->id)
            ->where('is_active', true)
            ->get(['id', 'name', 'specialty', 'bio', 'image', 'slug']);

        $allHospitals = Hospital::with('location')
            ->where('is_active', true)
            ->get(['id', 'name', 'subdomain', 'phone', 'location_id', 'image']);

        $title = 'Our Doctors - '.$currentHospital->name;
        $description = 'Meet our expert ophthalmologists at '.$currentHospital->name.'. Specializing in LASIK, cataract, retina, and comprehensive eye care.';

        return Inertia::render('Frontend/Hospital/Doctors', [
            'hospital' => $currentHospital,
            'doctors' => $doctors,
            'hospitals' => $allHospitals,
            'seo' => [
                'title' => $title,
                'description' => $description,
            ],
        ]);
    }

    /**
     * Display services listing for the hospital.
     */
    public function services(Request $request)
    {
        $currentHospital = $request->attributes->get('current_hospital');

        if (! $currentHospital) {
            return redirect('/');
        }

        $services = Service::where('is_active', true)
            ->get(['id', 'name', 'slug', 'description', 'image']);

        $allHospitals = Hospital::with('location')
            ->where('is_active', true)
            ->get(['id', 'name', 'subdomain', 'phone', 'location_id', 'image']);

        $title = 'Eye Treatments & Services - '.$currentHospital->name;
        $description = 'Explore our comprehensive eye care services including LASIK, cataract surgery, retina treatment, glaucoma care, and more at '.$currentHospital->name;

        return Inertia::render('Frontend/Hospital/Services', [
            'hospital' => $currentHospital,
            'services' => $services,
            'hospitals' => $allHospitals,
            'seo' => [
                'title' => $title,
                'description' => $description,
            ],
        ]);
    }

    /**
     * Display contact page for the hospital.
     */
    public function contact(Request $request)
    {
        $currentHospital = $request->attributes->get('current_hospital');

        if (! $currentHospital) {
            return redirect('/');
        }

        $currentHospital->load('location');

        $allHospitals = Hospital::with('location')
            ->where('is_active', true)
            ->get(['id', 'name', 'subdomain', 'phone', 'location_id', 'image']);

        $title = 'Contact Us - '.$currentHospital->name;
        $description = 'Contact '.$currentHospital->name.' for eye care appointments. Located in '.($currentHospital->location->name ?? 'India').'. Call '.$currentHospital->phone;

        return Inertia::render('Frontend/Hospital/Contact', [
            'hospital' => $currentHospital,
            'hospitals' => $allHospitals,
            'seo' => [
                'title' => $title,
                'description' => $description,
            ],
        ]);
    }

    /**
     * Submit contact form.
     */
    public function submitContact(Request $request)
    {
        $currentHospital = $request->attributes->get('current_hospital');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string|max:1000',
        ]);

        $lead = Lead::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'message' => $validated['message'],
            'hospital_id' => $currentHospital ? $currentHospital->id : null,
            'status' => 'new',
        ]);

        return back()->with('success', 'Thank you for contacting us! We will get back to you soon.');
    }
}
