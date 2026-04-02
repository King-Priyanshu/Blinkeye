<?php

namespace Database\Seeders;

use App\Models\Disease;
use App\Models\Hospital;
use App\Models\Location;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeadSeeder extends Seeder
{
    public function run(): void
    {
        $hospitals = Hospital::pluck('id')->toArray();
        $diseases = Disease::pluck('id')->toArray();
        $locations = Location::where('type', 'city')->pluck('id')->toArray();

        $statuses = ['new', 'contacted', 'converted', 'lost'];
        $campaigns = ['seo_page', 'organic', 'google_ads', 'facebook_promo', 'referral', 'whatsapp'];

        $leads = [
            // New leads
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Rajinder Singh',
                'phone' => '+91-9876543210',
                'source_url' => 'http://amritsar.blinkeye.com/cataract-surgery',
                'campaign_type' => 'seo_page',
                'status' => 'new',
                'created_at' => now()->subHours(2),
            ],
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Priya Malhotra',
                'phone' => '+91-9876543211',
                'source_url' => 'http://chandigarh.blinkeye.com/lasik-surgery',
                'campaign_type' => 'google_ads',
                'status' => 'new',
                'created_at' => now()->subHours(5),
            ],
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Gurpreet Singh',
                'phone' => '+91-9876543212',
                'source_url' => 'http://mohali.blinkeye.com/diabetic-retinopathy',
                'campaign_type' => 'organic',
                'status' => 'new',
                'created_at' => now()->subDays(1),
            ],
            // Contacted leads
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Anita Sharma',
                'phone' => '+91-9876543213',
                'source_url' => 'http://amritsar.blinkeye.com/glaucoma-treatment',
                'campaign_type' => 'seo_page',
                'status' => 'contacted',
                'created_at' => now()->subDays(2),
            ],
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Mohammad Rashid',
                'phone' => '+91-9876543214',
                'source_url' => 'http://chandigarh.blinkeye.com/cornea-transplant',
                'campaign_type' => 'referral',
                'status' => 'contacted',
                'created_at' => now()->subDays(3),
            ],
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Sunita Devi',
                'phone' => '+91-9876543215',
                'source_url' => 'http://mohali.blinkeye.com/pediatric-ophthalmology',
                'campaign_type' => 'facebook_promo',
                'status' => 'contacted',
                'created_at' => now()->subDays(4),
            ],
            // Converted leads
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Paramjit Singh',
                'phone' => '+91-9876543216',
                'source_url' => 'http://amritsar.blinkeye.com/cataract-surgery',
                'campaign_type' => 'google_ads',
                'status' => 'converted',
                'created_at' => now()->subDays(10),
            ],
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Kavita Arora',
                'phone' => '+91-9876543217',
                'source_url' => 'http://chandigarh.blinkeye.com/lasik-surgery',
                'campaign_type' => 'organic',
                'status' => 'converted',
                'created_at' => now()->subDays(15),
            ],
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Harjinder Singh',
                'phone' => '+91-9876543218',
                'source_url' => 'http://mohali.blinkeye.com/retina-treatment',
                'campaign_type' => 'seo_page',
                'status' => 'converted',
                'created_at' => now()->subDays(20),
            ],
            // Lost leads
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Ramesh Kumar',
                'phone' => '+91-9876543219',
                'source_url' => 'http://amritsar.blinkeye.com/cataract-surgery',
                'campaign_type' => 'google_ads',
                'status' => 'lost',
                'created_at' => now()->subDays(25),
            ],
            [
                'hospital_id' => $hospitals[array_rand($hospitals)] ?? null,
                'disease_id' => $diseases[array_rand($diseases)] ?? null,
                'location_id' => $locations[array_rand($locations)] ?? null,
                'name' => 'Meenu Sharma',
                'phone' => '+91-9876543220',
                'source_url' => 'http://chandigarh.blinkeye.com/lasik-surgery',
                'campaign_type' => 'facebook_promo',
                'status' => 'lost',
                'created_at' => now()->subDays(30),
            ],
        ];

        foreach ($leads as &$lead) {
            $lead['created_at'] = $lead['created_at'] ?? now();
            $lead['updated_at'] = now();
        }

        DB::table('leads')->insert($leads);
    }
}
