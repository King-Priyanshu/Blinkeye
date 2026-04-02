<?php

namespace Database\Seeders;

use App\Models\Disease;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Database\Seeder;

class HospitalSeeder extends Seeder
{
    public function run(): void
    {
        // Get locations
        $delhi = Location::where('slug', 'new-delhi-city')->first();
        $mumbai = Location::where('slug', 'mumbai-city')->first();
        $chandigarh = Location::where('slug', 'chandigarh-city')->first();
        $amritsar = Location::where('slug', 'amritsar-city')->first();
        $pune = Location::where('slug', 'pune-city')->first();

        // Get all services and diseases
        $allServices = Service::pluck('id')->toArray();
        $allDiseases = Disease::pluck('id')->toArray();

        $hospitalsData = [
            [
                'name' => 'Blink Eye Hospital - Delhi Center of Excellence',
                'subdomain' => 'delhi',
                'slug' => 'blink-eye-hospital-delhi',
                'domain' => 'delhi.blinkeye.com',
                'template_id' => 1,
                'email' => 'delhi@blinkeye.com',
                'phone' => '+91-11-4567-8901',
                'address' => 'Safdarjung Enclave, New Delhi - 110029',
                'location_id' => $delhi ? $delhi->id : null,
                'lat' => $delhi ? $delhi->lat : 28.5677,
                'lng' => $delhi ? $delhi->lng : 77.2064,
                'is_active' => true,
                'short_description' => 'Flagship advanced eye care center in the heart of Delhi.',
                'about_us' => 'Blink Eye Hospital Delhi is our flagship center of excellence. Equipped with state-of-the-art robotic and laser technology, we provide comprehensive tertiary eye care to patients across the NCR region and beyond.',
                'meta_title' => 'Best Eye Hospital in Delhi NCR | Blink Eye Hospital',
                'meta_description' => 'Top eye hospital in Delhi offering robotic cataract surgery, SMILE LASIK, retina transplants, and glaucoma care. Award-winning eye specialists in New Delhi.',
                'meta_keywords' => 'eye hospital new delhi, robotic cataract surgery, SMILE lasik, retina specialist, top eye doctor delhi',
                'working_hours_weekday' => '8:00 AM - 8:00 PM',
                'working_hours_saturday' => '9:00 AM - 5:00 PM',
                'emergency_contact' => '+91-11-4567-8900',
            ],
            [
                'name' => 'Blink Eye Hospital - Mumbai Hub',
                'subdomain' => 'mumbai',
                'slug' => 'blink-eye-hospital-mumbai',
                'domain' => 'mumbai.blinkeye.com',
                'template_id' => 1,
                'email' => 'mumbai@blinkeye.com',
                'phone' => '+91-22-2345-6789',
                'address' => 'Bandra West, Mumbai, Maharashtra 400050',
                'location_id' => $mumbai ? $mumbai->id : null,
                'lat' => $mumbai ? $mumbai->lat : 19.0596,
                'lng' => $mumbai ? $mumbai->lng : 72.8295,
                'is_active' => true,
                'short_description' => 'Premium ophthalmology institute serving Mumbai suburbs.',
                'about_us' => 'Blink Eye Hospital Mumbai offers world-class refractive and surgical eye treatments. Our Mumbai branch specializes in advanced LASIK, complex retinal vascular surgeries, and premium intraocular lens implantations.',
                'meta_title' => 'Top Rated Eye Clinic in Mumbai | Blink Eye',
                'meta_description' => 'Advanced eye clinic in Bandra, Mumbai. Trust our expert ophthalmologists for LASIK, glaucoma management, pediatric eye care, and comprehensive exams.',
                'meta_keywords' => 'eye hospital mumbai, bandra eye clinic, lasik surgeon mumbai, pediatric ophthalmologist',
                'working_hours_weekday' => '9:00 AM - 7:00 PM',
                'working_hours_saturday' => '9:00 AM - 3:00 PM',
                'emergency_contact' => '+91-22-2345-6788',
            ],
            [
                'name' => 'Blink Eye Hospital - Chandigarh',
                'subdomain' => 'chandigarh',
                'slug' => 'blink-eye-hospital-chandigarh',
                'domain' => 'chandigarh.blinkeye.com',
                'template_id' => 2,
                'email' => 'chandigarh@blinkeye.com',
                'phone' => '+91-172-460-5555',
                'address' => 'Sector 22, Madhya Marg, Chandigarh - 160022',
                'location_id' => $chandigarh ? $chandigarh->id : null,
                'lat' => $chandigarh ? $chandigarh->lat : 30.7333,
                'lng' => $chandigarh ? $chandigarh->lng : 76.7794,
                'is_active' => true,
                'short_description' => 'Leading eye care center in the tri-city region.',
                'about_us' => 'Serving the tri-city area, Blink Eye Hospital Chandigarh brings renowned specialists under one roof. We pride ourselves on ethical medical practices and utilizing the most modern diagnostic equipment available.',
                'meta_title' => 'Expert Eye Specialists in Chandigarh | Blink Eye Hospital',
                'meta_description' => 'Tri-city\'s premier eye hospital. We treat cataracts, keratoconus, diabetic retinopathy, and more with compassionate care and medical excellence.',
                'meta_keywords' => 'eye hospital chandigarh, cataract surgeon, retina clinic chandigarh',
                'working_hours_weekday' => '8:00 AM - 7:00 PM',
                'working_hours_saturday' => '9:00 AM - 3:00 PM',
                'emergency_contact' => '+91-172-460-5556',
            ],
            [
                'name' => 'Blink Eye Hospital - Amritsar',
                'subdomain' => 'amritsar',
                'slug' => 'blink-eye-hospital-amritsar',
                'domain' => 'amritsar.blinkeye.com',
                'template_id' => 3,
                'email' => 'amritsar@blinkeye.com',
                'phone' => '+91-183-250-5555',
                'address' => 'Mall Road, Near Golden Temple, Amritsar, Punjab - 143001',
                'location_id' => $amritsar ? $amritsar->id : null,
                'lat' => $amritsar ? $amritsar->lat : 31.6340,
                'lng' => $amritsar ? $amritsar->lng : 74.8723,
                'is_active' => true,
                'short_description' => 'Trusted vision center for families in Punjab.',
                'about_us' => 'Blink Eye Amritsar is a trusted name in vision correction, providing reliable surgical solutions for decades. We specialize in comprehensive eye exams, pediatric care, and refractive surgeries.',
                'meta_title' => 'Best Eye Care in Amritsar | Blink Eye',
                'meta_description' => 'Trusted vision center in Amritsar. Specializing in family eye care, safe cataract removals, and squint treatments.',
                'meta_keywords' => 'eye hospital amritsar, amritsar eye clinic, safe cataract surgery',
                'working_hours_weekday' => '9:00 AM - 6:00 PM',
                'working_hours_saturday' => '9:00 AM - 2:00 PM',
                'emergency_contact' => '+91-183-250-5556',
            ],
            [
                'name' => 'Blink Eye Hospital - Pune Clinic',
                'subdomain' => 'pune',
                'slug' => 'blink-eye-hospital-pune',
                'domain' => 'pune.blinkeye.com',
                'template_id' => 2,
                'email' => 'pune@blinkeye.com',
                'phone' => '+91-20-4123-5678',
                'address' => 'Koregaon Park, Pune, Maharashtra 411001',
                'location_id' => $pune ? $pune->id : null,
                'lat' => $pune ? $pune->lat : 18.5362,
                'lng' => $pune ? $pune->lng : 73.8939,
                'is_active' => true,
                'short_description' => 'Modern facility dedicated to advanced ophthalmic care.',
                'about_us' => 'Blink Eye Clinic Pune specializes in advanced diagnostic testing and outpatient surgical procedures. With a patient-first approach, we are Pune\'s highest-rated eye care destination.',
                'meta_title' => 'Premium Eye Care Clinic in Pune | Blink Eye',
                'meta_description' => 'Pune\'s top-rated eye facility in Koregaon Park. Comprehensive diagnostic center, LASIK, and dry eye treatments.',
                'meta_keywords' => 'pune eye clinic, koregaon park ophthalmologist, dry eye treatment pune',
                'working_hours_weekday' => '10:00 AM - 8:00 PM',
                'working_hours_saturday' => '10:00 AM - 5:00 PM',
                'emergency_contact' => '+91-20-4123-5679',
            ]
        ];

        foreach ($hospitalsData as $hData) {
            $hospital = Hospital::updateOrCreate(
                ['subdomain' => $hData['subdomain']],
                $hData
            );

            // Sync all services and diseases to the hospitals
            if ($hospital->wasRecentlyCreated || $hospital->exists) {
                // Delhi gets everything
                $hospital->services()->sync($allServices);
                $hospital->diseases()->sync($allDiseases);
            }
        }
    }
}
