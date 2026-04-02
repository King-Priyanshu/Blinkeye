<?php

namespace Database\Seeders;

use App\Models\Disease;
use Illuminate\Database\Seeder;

class DiseaseSeeder extends Seeder
{
    public function run(): void
    {
        $diseases = [
            [
                'name' => 'Cataract',
                'description' => 'A clouding of the normally clear lens of the eye. People with cataracts see through a cloudy lens, making it difficult to perform daily activities like reading and driving.',
                'slug' => 'cataract',
            ],
            [
                'name' => 'Myopia (Nearsightedness)',
                'description' => 'A common refractive error where distant objects appear blurry while close objects can be seen clearly. It occurs when the eyeball is too long or the cornea has too much curvature.',
                'slug' => 'myopia-nearsightedness',
            ],
            [
                'name' => 'Hyperopia (Farsightedness)',
                'description' => 'A refractive error where close objects appear more blurry than distant objects. It occurs when the eyeball is too short or the cornea has too little curvature.',
                'slug' => 'hyperopia-farsightedness',
            ],
            [
                'name' => 'Astigmatism',
                'description' => 'A refractive error caused by an irregularly shaped cornea or lens, resulting in blurred or distorted vision at all distances.',
                'slug' => 'astigmatism',
            ],
            [
                'name' => 'Glaucoma',
                'description' => 'A group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in the eye. It is a leading cause of blindness if left untreated.',
                'slug' => 'glaucoma',
            ],
            [
                'name' => 'Diabetic Retinopathy',
                'description' => 'A diabetes complication that affects the eyes by damaging blood vessels in the retina. It can cause vision loss and blindness if not treated early.',
                'slug' => 'diabetic-retinopathy',
            ],
            [
                'name' => 'Macular Degeneration',
                'description' => 'A medical condition causing vision loss in the center of the field of vision (the macula). It is a leading cause of vision loss in people over 60.',
                'slug' => 'macular-degeneration',
            ],
            [
                'name' => 'Dry Eye Syndrome',
                'description' => 'A condition where tears fail to provide adequate moisture for the eyes, causing discomfort, redness, and vision problems. Common causes include aging, certain medications, and environmental factors.',
                'slug' => 'dry-eye-syndrome',
            ],
            [
                'name' => 'Conjunctivitis (Pink Eye)',
                'description' => 'Inflammation or infection of the conjunctiva (the clear tissue covering the white part of the eye and inside of the eyelids). It can be caused by bacteria, viruses, or allergies.',
                'slug' => 'conjunctivitis-pink-eye',
            ],
            [
                'name' => 'Squint (Strabismus)',
                'description' => 'A condition where the eyes do not align in the same direction. One eye may look straight ahead while the other turns in, up, down, or out.',
                'slug' => 'squint-strabismus',
            ],
            [
                'name' => 'Keratoconus',
                'description' => 'A progressive eye disease where the normally round cornea thins and begins to bulge into a cone shape, causing distorted vision and increased sensitivity to light.',
                'slug' => 'keratoconus',
            ],
            [
                'name' => 'Retinal Detachment',
                'description' => 'A serious eye condition where the retina pulls away from its normal position. Without prompt treatment, it can cause permanent vision loss.',
                'slug' => 'retinal-detachment',
            ],
        ];

        foreach ($diseases as $disease) {
            Disease::updateOrCreate(['slug' => $disease['slug']], $disease + ['is_active' => true]);
        }
    }
}
