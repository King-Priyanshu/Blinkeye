<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Cataract Surgery',
                'description' => 'Safe and painless surgical procedure to restore vision by replacing a cloudy lens with an artificial intraocular lens (IOL). We offer advanced phacoemulsification techniques with premium IOL options including multifocal and toric lenses.',
                'slug' => 'cataract-surgery',
            ],
            [
                'name' => 'LASIK / Laser Eye Surgery',
                'description' => 'Laser-assisted in situ keratomileusis (LASIK) is a revolutionary procedure to correct refractive errors like myopia, hyperopia, and astigmatism, reducing dependency on glasses and contact lenses.',
                'slug' => 'lasik-laser-eye-surgery',
            ],
            [
                'name' => 'Retina Treatment',
                'description' => 'Advanced medical and surgical treatments for complex retinal vascular and macular diseases including diabetic retinopathy, macular degeneration, retinal detachment, and retinal vein occlusion.',
                'slug' => 'retina-treatment',
            ],
            [
                'name' => 'Glaucoma Treatment',
                'description' => 'Comprehensive glaucoma management including medication, laser therapy (SLT), and surgical interventions (trabeculectomy, MIGS) to control intraocular pressure and prevent vision loss.',
                'slug' => 'glaucoma-treatment',
            ],
            [
                'name' => 'Cornea Transplant',
                'description' => 'Surgical replacement of part of a damaged or diseased cornea using healthy donor tissue. We perform full-thickness (penetrating) and partial-thickness (lamellar) corneal transplants.',
                'slug' => 'cornea-transplant',
            ],
            [
                'name' => 'Pediatric Ophthalmology',
                'description' => 'Specialized eye care and vision correction specifically tailored for children and infants, including treatment for amblyopia (lazy eye), strabismus (squint), and congenital eye conditions.',
                'slug' => 'pediatric-ophthalmology',
            ],
            [
                'name' => 'Squint Treatment',
                'description' => 'Comprehensive diagnosis and treatment of strabismus (misaligned eyes) in both children and adults. Treatment options include glasses, prisms, vision therapy, and surgical correction.',
                'slug' => 'squint-treatment',
            ],
            [
                'name' => 'Oculoplasty',
                'description' => 'Cosmetic and reconstructive eyelid surgery including ptosis correction, blepharoplasty, eyelid tumor removal, tear duct surgery, and treatment for eyelid malpositions.',
                'slug' => 'oculoplasty',
            ],
            [
                'name' => 'Uveitis Treatment',
                'description' => 'Expert management of uveitis and other inflammatory eye conditions. We provide comprehensive diagnosis, medical treatment, and surgical interventions for complex cases.',
                'slug' => 'uveitis-treatment',
            ],
            [
                'name' => 'Eye Trauma & Emergency',
                'description' => '24/7 emergency eye care services for ocular injuries, chemical burns, foreign body removal, and acute vision loss. Our team is equipped to handle all types of eye emergencies.',
                'slug' => 'eye-trauma-emergency',
            ],
            [
                'name' => 'Comprehensive Eye Exam',
                'description' => 'Detailed diagnostic checkup evaluating visual acuity, refractive errors, eye pressure, and screening for signs of potential eye diseases using advanced diagnostic equipment.',
                'slug' => 'comprehensive-eye-exam',
            ],
            [
                'name' => 'Contact Lens & Low Vision Aid',
                'description' => 'Specialized services for fitting contact lenses including specialty lenses for keratoconus and dry eyes, as well as low vision aids for patients with vision impairment.',
                'slug' => 'contact-lens-low-vision',
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['slug' => $service['slug']], $service + ['is_active' => true]);
        }
    }
}
