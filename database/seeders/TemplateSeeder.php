<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Group;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    public function run(): void
    {
        $templates = [
            [
                'title_template' => 'Top-Rated {{service.name}} Specialists in {{location.name}}',
                'slug_template' => 'best-{{service.slug}}-in-{{location.slug}}',
                'content_template' => "<h2>Expert {{service.name}} at Blink Eye Hospital</h2>\n<p>Looking for the best eye care in {{location.name}}? Blink Eye Hospital offers premium {{service.name}} services using industry-leading diagnostic and surgical technology.</p>\n<p>Our experienced surgeons at the {{hospital.name}} branch have successfully treated thousands of patients. We ensure a seamless, pain-free experience with rapid recovery times.</p>\n<h3>Why Choose Us?</h3>\n<ul>\n<li>State-of-the-art medical equipment.</li>\n<li>Highly experienced and board-certified eye surgeons.</li>\n<li>Compassionate, patient-first care.</li>\n</ul>\n<p>Contact our {{location.name}} clinic today at <strong>{{hospital.phone}}</strong> to schedule your consultation.</p>",
                'is_active' => true,
                'groups' => ['All Cities', 'Surgical Procedures'],
            ],
            [
                'title_template' => 'Advanced {{disease.name}} Treatment Clinic in {{location.name}}',
                'slug_template' => 'understanding-{{disease.slug}}-treatment-in-{{location.slug}}',
                'content_template' => "<h2>Comprehensive Care for {{disease.name}}</h2>\n<p>{{disease.description}}</p>\n<p>Early detection and proper management are vital. Our specialized team at <strong>{{hospital.name}}</strong> provides personalized treatment plans tailored to the severity of your condition.</p>\n<h3>What to Expect During Your Visit</h3>\n<p>When you visit our {{location.name}} facility, you will undergo a comprehensive eye evaluation. Based on the results, our specialists will guide you through the latest medical or surgical interventions available for {{disease.name}}.</p>\n<p>Schedule an appointment today. Drop us an email at <strong>{{hospital.email}}</strong>.</p>",
                'is_active' => true,
                'groups' => ['Major Hubs', 'Common Conditions'],
            ],
            [
                'title_template' => 'Affordable {{service.name}} Options available in {{location.name}}',
                'slug_template' => 'affordable-{{service.slug}}-clinic-{{location.slug}}',
                'content_template' => "<h2>Book your {{service.name}} Screening Today</h2>\n<p>Are you looking for affordable yet high-quality {{service.name}}? At <strong>{{hospital.name}}</strong>, we provide world-class facilities to the {{location.name}} community at competitive prices without compromising on quality.</p>\n<p>We accept a wide range of insurances and offer EMI options for surgical procedures. Visit our {{location.name}} branch located at {{hospital.address}} for more details.</p>",
                'is_active' => true,
                'groups' => ['Major Hubs', 'Diagnostic Tests'],
            ]
        ];

        foreach ($templates as $data) {
            $groupNames = $data['groups'];
            unset($data['groups']);

            $blog = Blog::create($data);

            $groupIds = Group::whereIn('name', $groupNames)->pluck('id');
            $blog->groups()->attach($groupIds);
        }
    }
}
