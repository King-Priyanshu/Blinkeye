<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Hospital;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $hospitals = Hospital::all()->keyBy('subdomain');
        
        if ($hospitals->isEmpty()) {
            return;
        }

        $doctorsData = [
            // Delhi Doctors
            ['name' => 'Dr. Randeep Guleria', 'specialty' => 'Chief Cataract & Refractive Surgeon', 'bio' => 'Dr. Guleria leads the Delhi Center of Excellence. He has pioneered robotic cataract surgeries in India.', 'hospital_subdomain' => 'delhi', 'slug' => 'dr-randeep-guleria-delhi', 'is_active' => true],
            ['name' => 'Dr. Anjali Verma', 'specialty' => 'Senior Vitreo-Retinal Surgeon', 'bio' => 'Specializes in complex retinal detachments and advanced diabetic retinopathy management.', 'hospital_subdomain' => 'delhi', 'slug' => 'dr-anjali-verma-delhi', 'is_active' => true],
            ['name' => 'Dr. Rohan Kapoor', 'specialty' => 'Glaucoma & Anterior Segment', 'bio' => 'Expert in minimally invasive glaucoma surgery (MIGS) and complicated pediatric glaucoma.', 'hospital_subdomain' => 'delhi', 'slug' => 'dr-rohan-kapoor-delhi', 'is_active' => true],
            
            // Mumbai Doctors
            ['name' => 'Dr. Prakash Mehra', 'specialty' => 'Cornea & LASIK Specialist', 'bio' => 'Mumbai\'s premier LASIK surgeon with thousands of zero-error refractive surgeries performed.', 'hospital_subdomain' => 'mumbai', 'slug' => 'dr-prakash-mehra-mumbai', 'is_active' => true],
            ['name' => 'Dr. Sneha Patil', 'specialty' => 'Oculoplasty & Facial Aesthetics', 'bio' => 'Renowned for precision cosmetic eyelid surgeries and reconstructive trauma care.', 'hospital_subdomain' => 'mumbai', 'slug' => 'dr-sneha-patil-mumbai', 'is_active' => true],
            
            // Chandigarh Doctors
            ['name' => 'Dr. Harjinder Singh', 'specialty' => 'Comprehensive Ophthalmologist', 'bio' => 'Over 20 years of experience managing varying complex eye diseases across the tri-city area.', 'hospital_subdomain' => 'chandigarh', 'slug' => 'dr-harjinder-singh-chandigarh', 'is_active' => true],
            ['name' => 'Dr. Ritu Bhatia', 'specialty' => 'Pediatric Ophthalmology', 'bio' => 'Specializes in pediatric strabismus and amblyopia, creating a comfortable environment for children.', 'hospital_subdomain' => 'chandigarh', 'slug' => 'dr-ritu-bhatia-chandigarh', 'is_active' => true],
            
            // Amritsar Doctors
            ['name' => 'Dr. Manjit Kohli', 'specialty' => 'Cataract Surgeon', 'bio' => 'Trusted by thousands of families in Punjab for safe, painless, and rapid-recovery cataract procedures.', 'hospital_subdomain' => 'amritsar', 'slug' => 'dr-manjit-kohli-amritsar', 'is_active' => true],
            ['name' => 'Dr. Simran Kaur', 'specialty' => 'Medical Retina', 'bio' => 'Dedicated exclusively to medical management of retina disorders including macular edema.', 'hospital_subdomain' => 'amritsar', 'slug' => 'dr-simran-kaur-amritsar', 'is_active' => true],

            // Pune Doctors
            ['name' => 'Dr. Vikram Deshmukh', 'specialty' => 'Refractive & Cornea Surgery', 'bio' => 'Renowned for utilizing advanced topography-guided LASIK procedures for exceptional visual outcomes.', 'hospital_subdomain' => 'pune', 'slug' => 'dr-vikram-deshmukh-pune', 'is_active' => true],
            ['name' => 'Dr. Anita Joshi', 'specialty' => 'Glaucoma Specialist', 'bio' => 'Expert in comprehensive glaucoma diagnostic imaging and long-term ocular pressure management.', 'hospital_subdomain' => 'pune', 'slug' => 'dr-anita-joshi-pune', 'is_active' => true],
        ];

        foreach ($doctorsData as $doctor) {
            $hospitalId = isset($hospitals[$doctor['hospital_subdomain']]) ? $hospitals[$doctor['hospital_subdomain']]->id : null;
            
            if ($hospitalId) {
                unset($doctor['hospital_subdomain']);
                $doctor['hospital_id'] = $hospitalId;
                
                Doctor::updateOrCreate(
                    ['slug' => $doctor['slug']],
                    $doctor
                );
            }
        }
    }
}
