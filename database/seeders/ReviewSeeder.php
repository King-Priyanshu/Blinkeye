<?php

namespace Database\Seeders;

use App\Models\Hospital;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $hospitals = Hospital::all()->keyBy('subdomain');
        
        if ($hospitals->isEmpty()) {
            return;
        }

        $reviews = [
            [
                'hospital_subdomain' => 'delhi',
                'author_name' => 'Rahul Khanna',
                'rating' => 5,
                'content' => 'I had my SMILE LASIK surgery at the Delhi center. The entire process was seamless, painless, and the staff was extremely professional. My vision is 20/20 now. Highly recommended!',
                'source' => 'Google Reviews',
            ],
            [
                'hospital_subdomain' => 'delhi',
                'author_name' => 'Meera Singh',
                'rating' => 5,
                'content' => 'Dr. Guleria performed robotic cataract surgery on my mother. The facility is world-class, clean, and modern. She recovered her full vision within days.',
                'source' => 'Practo',
            ],
            [
                'hospital_subdomain' => 'mumbai',
                'author_name' => 'Anil Desai',
                'rating' => 5,
                'content' => 'The best eye clinic in Mumbai. I suffered from severe dry eyes and nothing worked until I visited Blink Eye. Dr. Mehra is exceptional.',
                'source' => 'Google Reviews',
            ],
            [
                'hospital_subdomain' => 'mumbai',
                'author_name' => 'Shweta Iyer',
                'rating' => 5,
                'content' => 'Got my father\'s retina surgery done here. Exceptional care, top-notch equipment, and very compassionate doctors. Thank you to the entire team.',
                'source' => 'JustDial',
            ],
            [
                'hospital_subdomain' => 'chandigarh',
                'author_name' => 'Gurpreet Kaur',
                'rating' => 5,
                'content' => 'Brought my 4-year-old son for a squint checkup. Dr. Ritu was incredibly patient and made him feel totally at ease. Excellent pediatric eye care.',
                'source' => 'Google Reviews',
            ],
            [
                'hospital_subdomain' => 'amritsar',
                'author_name' => 'Sukhbir Singh',
                'rating' => 4,
                'content' => 'Got my cataract operated via Phaco method. The hospital is very clean and the doctors are transparent about the costs. Excellent experience.',
                'source' => 'Practo',
            ],
            [
                'hospital_subdomain' => 'pune',
                'author_name' => 'Aditi Kulkarni',
                'rating' => 5,
                'content' => 'Premium service in Koregaon Park. From the front desk to the surgical suite, everything screams quality. My LASIK was over in 15 minutes!',
                'source' => 'Google Reviews',
            ],
        ];

        foreach ($reviews as $review) {
            $hospitalId = isset($hospitals[$review['hospital_subdomain']]) ? $hospitals[$review['hospital_subdomain']]->id : null;
            
            if ($hospitalId) {
                unset($review['hospital_subdomain']);
                $review['hospital_id'] = $hospitalId;
                
                Review::create($review);
            }
        }
    }
}
