<?php

namespace Database\Seeders;

use App\Models\Disease;
use App\Models\Group;
use App\Models\GroupItem;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    public function run(): void
    {
        // Location Groups
        $allCities = Group::updateOrCreate(
            ['name' => 'All Cities', 'type' => 'location'],
            ['type' => 'location']
        );
        $majorHubs = Group::updateOrCreate(
            ['name' => 'Major Hubs', 'type' => 'location'],
            ['type' => 'location']
        );
        $punjabGroup = Group::updateOrCreate(
            ['name' => 'Punjab Cities', 'type' => 'location'],
            ['type' => 'location']
        );

        // Service Groups
        $surgicalServices = Group::updateOrCreate(
            ['name' => 'Surgical Procedures', 'type' => 'service'],
            ['type' => 'service']
        );
        $diagnosticServices = Group::updateOrCreate(
            ['name' => 'Diagnostic Tests', 'type' => 'service'],
            ['type' => 'service']
        );
        $laserServices = Group::updateOrCreate(
            ['name' => 'Laser Treatments', 'type' => 'service'],
            ['type' => 'service']
        );

        // Disease Groups
        $retinalDiseases = Group::updateOrCreate(
            ['name' => 'Retinal Issues', 'type' => 'disease'],
            ['type' => 'disease']
        );
        $commonConditions = Group::updateOrCreate(
            ['name' => 'Common Conditions', 'type' => 'disease'],
            ['type' => 'disease']
        );
        $refractiveErrors = Group::updateOrCreate(
            ['name' => 'Refractive Errors', 'type' => 'disease'],
            ['type' => 'disease']
        );

        // Fetch items
        $cities = Location::where('type', 'city')->pluck('id')->toArray();
        $services = Service::pluck('id')->toArray();
        $diseases = Disease::pluck('id')->toArray();

        // Helper to attach items
        $attach = function ($groupId, $typeClass, $ids) {
            foreach ($ids as $id) {
                GroupItem::updateOrCreate([
                    'group_id' => $groupId,
                    'item_type' => $typeClass,
                    'item_id' => $id,
                ]);
            }
        };

        // Attach Locations
        if (! empty($cities)) {
            $attach($allCities->id, Location::class, $cities);
            $attach($majorHubs->id, Location::class, array_slice($cities, 0, 5)); // First 5 are major hubs

            // Punjab cities (first few)
            $punjabCityIds = Location::whereIn('slug', ['amritsar-city', 'ludhiana-city', 'jalandhar-city', 'patiala-city', 'mohali-city'])->pluck('id')->toArray();
            if (! empty($punjabCityIds)) {
                $attach($punjabGroup->id, Location::class, $punjabCityIds);
            }
        }

        // Attach Services - Surgical
        $surgicalSlugs = ['cataract-surgery', 'cornea-transplant', 'squint-treatment', 'eye-trauma-emergency'];
        $surgicalIds = Service::whereIn('slug', $surgicalSlugs)->pluck('id')->toArray();
        if (! empty($surgicalIds)) {
            $attach($surgicalServices->id, Service::class, $surgicalIds);
        }

        // Attach Services - Diagnostic
        $diagnosticSlugs = ['comprehensive-eye-exam', 'contact-lens-low-vision'];
        $diagnosticIds = Service::whereIn('slug', $diagnosticSlugs)->pluck('id')->toArray();
        if (! empty($diagnosticIds)) {
            $attach($diagnosticServices->id, Service::class, $diagnosticIds);
        }

        // Attach Services - Laser
        $laserSlugs = ['lasik-laser-eye-surgery', 'glaucoma-treatment'];
        $laserIds = Service::whereIn('slug', $laserSlugs)->pluck('id')->toArray();
        if (! empty($laserIds)) {
            $attach($laserServices->id, Service::class, $laserIds);
        }

        // Attach Diseases - Retinal
        $retinalSlugs = ['diabetic-retinopathy', 'macular-degeneration', 'retinal-detachment'];
        $retinalIds = Disease::whereIn('slug', $retinalSlugs)->pluck('id')->toArray();
        if (! empty($retinalIds)) {
            $attach($retinalDiseases->id, Disease::class, $retinalIds);
        }

        // Attach Diseases - Common
        $commonSlugs = ['cataract', 'glaucoma', 'dry-eye-syndrome', 'conjunctivitis-pink-eye'];
        $commonIds = Disease::whereIn('slug', $commonSlugs)->pluck('id')->toArray();
        if (! empty($commonIds)) {
            $attach($commonConditions->id, Disease::class, $commonIds);
        }

        // Attach Diseases - Refractive
        $refractiveSlugs = ['myopia-nearsightedness', 'hyperopia-farsightedness', 'astigmatism', 'keratoconus'];
        $refractiveIds = Disease::whereIn('slug', $refractiveSlugs)->pluck('id')->toArray();
        if (! empty($refractiveIds)) {
            $attach($refractiveErrors->id, Disease::class, $refractiveIds);
        }
    }
}
