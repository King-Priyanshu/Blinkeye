<?php

namespace App\Services;

use App\Models\Disease;
use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\Location;
use App\Models\Service;

class SeoService
{
    /**
     * Generate MedicalOrganization Schema for a Hospital.
     */
    public function generateMedicalOrganizationSchema(Hospital $hospital, ?Location $location = null): array
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'MedicalOrganization',
            'name' => $hospital->name,
            'url' => $this->getHospitalUrl($hospital),
            'logo' => $hospital->og_image ?? $this->getHospitalLogoUrl($hospital),
            'description' => $hospital->meta_description ?? $hospital->short_description,
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => $hospital->phone,
                'contactType' => 'Customer Service',
                'areaServed' => 'IN',
                'availableLanguage' => ['English', 'Hindi', 'Punjabi'],
            ],
            'areaServed' => [
                '@type' => 'State',
                'name' => $hospital->location?->name ?? 'Punjab',
            ],
            'healthPlanNetwork' => [
                '@type' => 'HealthPlanNetwork',
                'name' => 'Eye Care Services',
            ],
        ];

        // Add address if available
        if ($hospital->address) {
            $address = [
                '@type' => 'PostalAddress',
                'streetAddress' => $hospital->address,
                'addressCountry' => 'IN',
            ];
            if ($hospital->location) {
                $address['addressLocality'] = $hospital->location->name;
                if ($hospital->location->parent) {
                    $address['addressRegion'] = $hospital->location->parent->name;
                }
            }
            $schema['address'] = $address;
        }

        // Add geo coordinates if available
        if ($hospital->lat && $hospital->lng) {
            $schema['location'] = [
                '@type' => 'Place',
                'geo' => [
                    '@type' => 'GeoCoordinates',
                    'latitude' => $hospital->lat,
                    'longitude' => $hospital->lng,
                ],
                'address' => $schema['address'] ?? null,
            ];
        }

        // Add opening hours
        $openingHours = $this->generateOpeningHours($hospital);
        if (! empty($openingHours)) {
            $schema['openingHoursSpecification'] = $openingHours;
        }

        // Add aggregate rating if reviews exist
        if ($hospital->reviews && $hospital->reviews->count() > 0) {
            $avgRating = $hospital->reviews->avg('rating');
            $reviewCount = $hospital->reviews->count();

            $schema['aggregateRating'] = [
                '@type' => 'AggregateRating',
                'ratingValue' => round($avgRating, 1),
                'reviewCount' => $reviewCount,
                'bestRating' => 5,
                'worstRating' => 1,
            ];
        }

        return array_filter($schema, fn ($v) => $v !== null);
    }

    /**
     * Generate LocalBusiness Schema for a Hospital branch.
     */
    public function generateLocalBusinessSchema(Hospital $hospital, ?Location $location = null): array
    {
        $name = $hospital->name;
        if ($location) {
            $name .= ' - '.$location->name;
        }

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'MedicalClinic',
            'name' => $name,
            'image' => $hospital->og_image ?? $hospital->image ?? $this->getHospitalImageUrl($hospital),
            'telephone' => $hospital->phone,
            'url' => $this->getHospitalUrl($hospital),
            'priceRange' => '$$',
            'description' => $hospital->meta_description ?? $hospital->short_description,
            'medicalSpecialty' => 'Ophthalmology',
        ];

        // Add address
        if ($hospital->address) {
            $address = [
                '@type' => 'PostalAddress',
                'streetAddress' => $hospital->address,
                'addressCountry' => 'IN',
            ];
            if ($hospital->location) {
                $address['addressLocality'] = $hospital->location->name;
                if ($hospital->location->parent) {
                    $address['addressRegion'] = $hospital->location->parent->name;
                }
            }
            $schema['address'] = $address;
        }

        // Add geo coordinates
        if ($hospital->lat && $hospital->lng) {
            $schema['geo'] = [
                '@type' => 'GeoCoordinates',
                'latitude' => $hospital->lat,
                'longitude' => $hospital->lng,
            ];
        }

        // Add opening hours
        $openingHours = $this->generateOpeningHours($hospital);
        if (! empty($openingHours)) {
            $schema['openingHoursSpecification'] = $openingHours;
        }

        // Add contact point
        $schema['contactPoint'] = [
            '@type' => 'ContactPoint',
            'telephone' => $hospital->phone,
            'contactType' => 'Customer Service',
            'availableLanguage' => ['English', 'Hindi', 'Punjabi'],
        ];

        // Add emergency contact
        if ($hospital->emergency_contact) {
            $schema['potentialAction'] = [
                '@type' => 'CallAction',
                'name' => 'Emergency Contact',
                'target' => 'tel:'.$hospital->emergency_contact,
            ];
        }

        // Add aggregate rating
        if ($hospital->reviews && $hospital->reviews->count() > 0) {
            $avgRating = $hospital->reviews->avg('rating');
            $schema['aggregateRating'] = [
                '@type' => 'AggregateRating',
                'ratingValue' => round($avgRating, 1),
                'reviewCount' => $hospital->reviews->count(),
                'bestRating' => 5,
            ];
        }

        return array_filter($schema, fn ($v) => $v !== null);
    }

    /**
     * Generate comprehensive FAQ Schema.
     */
    public function generateFaqSchema(array $faqs): array
    {
        $mainEntity = [];

        foreach ($faqs as $faq) {
            $mainEntity[] = [
                '@type' => 'Question',
                'name' => $faq['question'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => $faq['answer'],
                ],
                'upvoteCount' => $faq['upvotes'] ?? 0,
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => $mainEntity,
        ];
    }

    /**
     * Generate BreadcrumbList Schema.
     */
    public function generateBreadcrumbSchema(array $items): array
    {
        $breadcrumbList = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [],
        ];

        $position = 1;
        foreach ($items as $item) {
            $breadcrumbList['itemListElement'][] = [
                '@type' => 'ListItem',
                'position' => $position++,
                'name' => $item['name'],
                'item' => $item['url'] ?? null,
            ];
        }

        return $breadcrumbList;
    }

    /**
     * Generate Article Schema for blog content.
     */
    public function generateArticleSchema(string $headline, string $description, string $url, ?string $image = null, ?string $publishedAt = null, ?string $author = null): array
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $headline,
            'description' => $description,
            'url' => $url,
            'image' => $image,
            'author' => [
                '@type' => 'Organization',
                'name' => $author ?? 'Blink Eye Hospitals',
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'Blink Eye Hospitals',
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => asset('logo.png'),
                ],
            ],
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => $url,
            ],
            'articleSection' => 'Eye Care',
            'inLanguage' => 'en-IN',
        ];

        if ($publishedAt) {
            $schema['datePublished'] = $publishedAt;
            $schema['dateModified'] = $publishedAt;
        }

        return array_filter($schema, fn ($v) => $v !== null);
    }

    /**
     * Generate FAQPage schema for eye-related questions.
     */
    public function generateEyeCareFaqSchema(): array
    {
        $faqs = [
            [
                'question' => 'What is the best eye hospital near me?',
                'answer' => 'Blink Eye Hospitals offers the best eye care services with experienced ophthalmologists, advanced technology, and affordable treatments. Visit our hospital for comprehensive eye care including cataract surgery, LASIK, retina treatment, and more.',
            ],
            [
                'question' => 'How to book an appointment at Blink Eye Hospital?',
                'answer' => 'You can book an appointment by calling our helpline, using our online booking form, or visiting our hospital directly. We offer free consultations for first-time patients.',
            ],
            [
                'question' => 'What are the common eye treatments available?',
                'answer' => 'We offer a wide range of eye treatments including cataract surgery, LASIK eye surgery, retina treatment, glaucoma treatment, pediatric ophthalmology, corneal transplant, and cosmetic eye surgery.',
            ],
            [
                'question' => 'Is cataract surgery safe?',
                'answer' => 'Yes, cataract surgery is one of the safest and most common procedures performed worldwide. Our experienced surgeons use advanced techniques like phacoemulsification for quick recovery and excellent outcomes.',
            ],
            [
                'question' => 'How much does LASIK surgery cost?',
                'answer' => 'LASIK surgery cost varies depending on individual requirements and technology used. We offer competitive pricing with easy EMI options. Schedule a consultation for an accurate quote.',
            ],
            [
                'question' => 'Do you offer emergency eye care services?',
                'answer' => 'Yes, we provide 24/7 emergency eye care services for eye injuries, sudden vision loss, and other urgent eye conditions. Call our emergency helpline immediately.',
            ],
            [
                'question' => 'What are the symptoms of eye problems?',
                'answer' => 'Common symptoms include blurred vision, eye pain, redness, floaters, flashes of light, dry eyes, and difficulty seeing at night. Regular eye check-ups are recommended for early detection.',
            ],
            [
                'question' => 'How often should I get an eye checkup?',
                'answer' => 'Adults should have a comprehensive eye exam every 1-2 years. If you have diabetes, high blood pressure, or a family history of eye disease, more frequent check-ups are recommended.',
            ],
        ];

        return $this->generateFaqSchema($faqs);
    }

    /**
     * Generate Hospital page specific schema.
     */
    public function generateHospitalPageSchema(Hospital $hospital, ?Location $location = null, ?Service $service = null, ?Disease $disease = null): array
    {
        $schemas = [];

        // Add MedicalOrganization schema
        $schemas[] = $this->generateMedicalOrganizationSchema($hospital, $location);

        // Add LocalBusiness schema
        $schemas[] = $this->generateLocalBusinessSchema($hospital, $location);

        // Add FAQ schema for eye care
        $schemas[] = $this->generateEyeCareFaqSchema();

        return $schemas;
    }

    /**
     * Generate Service page schema.
     */
    public function generateServicePageSchema(Hospital $hospital, Service $service, ?Location $location = null): array
    {
        $schemas = [];

        // Add LocalBusiness with service specialization
        $schema = $this->generateLocalBusinessSchema($hospital, $location);
        $schema['medicalSpecialty'] = 'Ophthalmology';

        // Add service-specific information
        $schema['serviceType'] = $service->name;
        $schema['availableService'] = [
            '@type' => 'MedicalProcedure',
            'name' => $service->name,
            'description' => $service->description,
        ];

        $schemas[] = $schema;

        // Add FAQ for this specific service
        $serviceFaqs = $this->generateServiceFaqs($service);
        if (! empty($serviceFaqs)) {
            $schemas[] = $this->generateFaqSchema($serviceFaqs);
        }

        return $schemas;
    }

    /**
     * Generate location-specific FAQ schema.
     */
    public function generateLocationPageSchema(Hospital $hospital, Location $location): array
    {
        $schemas = [];

        // Add LocalBusiness with location
        $schemas[] = $this->generateLocalBusinessSchema($hospital, $location);

        // Add location-specific FAQ
        $faqs = [
            [
                'question' => "Best eye hospital in {$location->name}?",
                'answer' => "Blink Eye Hospital in {$location->name} offers comprehensive eye care services with experienced ophthalmologists and advanced technology. Visit us for cataract surgery, LASIK, retina treatment, and more.",
            ],
            [
                'question' => "Eye doctor near {$location->name}?",
                'answer' => "Our {$location->name} branch has experienced eye specialists who provide quality eye care. Book an appointment for consultation.",
            ],
            [
                'question' => "Eye treatment in {$location->name}?",
                'answer' => "We offer all types of eye treatments including cataract, LASIK, retina, glaucoma, and pediatric eye care at our {$location->name} facility.",
            ],
        ];

        $schemas[] = $this->generateFaqSchema($faqs);

        // Add local SEO breadcrumb
        $schemas[] = $this->generateBreadcrumbSchema([
            ['name' => 'Home', 'url' => url('/')],
            ['name' => 'Eye Hospital', 'url' => url('/eye-hospital')],
            ['name' => $location->name, 'url' => url('/eye-hospital-in-'.$location->slug)],
        ]);

        return $schemas;
    }

    /**
     * Generate Doctor schema for rich snippets.
     */
    public function generateDoctorSchema(Doctor $doctor, Hospital $hospital): array
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Physician',
            'name' => 'Dr. '.$doctor->name,
            'image' => $doctor->image ? asset('storage/'.$doctor->image) : null,
            'url' => url('/doctors/'.$doctor->slug),
            'description' => $doctor->description ?? $doctor->specialization,
            'jobTitle' => 'Ophthalmologist',
            'hospital' => [
                '@type' => 'Hospital',
                'name' => $hospital->name,
                'url' => $this->getHospitalUrl($hospital),
            ],
            'worksFor' => [
                '@type' => 'Organization',
                'name' => $hospital->name,
            ],
            'medicalSpecialty' => $doctor->specialization ?? 'Ophthalmology',
        ];

        if ($doctor->qualification) {
            $schema['education'] = [
                '@type' => 'EducationalOccupationalCredential',
                'credentialCategory' => 'Degree',
                'name' => $doctor->qualification,
            ];
        }

        if ($doctor->experience_years) {
            $schema['yearsExperience'] = $doctor->experience_years;
        }

        return array_filter($schema, fn ($v) => $v !== null);
    }

    /**
     * Generate complete SEO metadata for a page.
     */
    public function generateSeoMetadata(
        Hospital $hospital,
        ?Location $location = null,
        ?Service $service = null,
        ?Disease $disease = null,
        ?string $pageType = 'general'
    ): array {
        $title = '';
        $description = '';
        $keywords = [];
        $canonicalUrl = '';

        $locationName = $location?->name ?? '';
        $serviceName = $service?->name ?? '';
        $diseaseName = $disease?->name ?? '';
        $hospitalName = $hospital->name;

        switch ($pageType) {
            case 'hospital':
                $title = "{$hospitalName} - Best Eye Hospital in {$locationName} | Eye Care Services";
                $description = "{$hospitalName} is the best eye hospital in {$locationName}. Expert ophthalmologists, advanced cataract & LASIK surgery, retina treatment, and comprehensive eye care. Book free consultation today!";
                $keywords = ['eye hospital', 'eye hospital in '.$locationName, 'ophthalmologist', 'eye care', 'cataract surgery', 'LASIK'];
                $canonicalUrl = $this->getHospitalUrl($hospital);
                break;

            case 'service':
                $title = "{$serviceName} in {$locationName} - Best {$serviceName} Treatment at {$hospitalName}";
                $description = "Get best {$serviceName} treatment in {$locationName} at {$hospitalName}. Experienced eye specialists, advanced technology, affordable pricing. Book your free consultation for {$serviceName} today!";
                $keywords = [
                    $serviceName,
                    $serviceName.' treatment',
                    $serviceName.' surgery',
                    'best '.$serviceName.' in '.$locationName,
                    'eye hospital in '.$locationName,
                ];
                $canonicalUrl = url('/'.$serviceName.'-'.$locationName);
                break;

            case 'disease':
                $title = "{$diseaseName} Treatment in {$locationName} - {$diseaseName} Specialist at {$hospitalName}";
                $description = "Expert {$diseaseName} treatment in {$locationName}. {$hospitalName} offers advanced {$diseaseName} diagnosis and treatment with experienced ophthalmologists. Book consultation now!";
                $keywords = [
                    $diseaseName,
                    $diseaseName.' treatment',
                    'eye disease',
                    $diseaseName.' in '.$locationName,
                ];
                $canonicalUrl = url('/'.$diseaseName.'-'.$locationName);
                break;

            case 'location':
                $title = "Best Eye Hospital in {$locationName} - {$hospitalName} | Eye Care Services";
                $description = "Find the best eye hospital in {$locationName}. {$hospitalName} offers comprehensive eye care services including cataract surgery, LASIK, retina treatment, and more. Expert ophthalmologists!";
                $keywords = [
                    'eye hospital in '.$locationName,
                    'eye doctor '.$locationName,
                    'cataract surgery '.$locationName,
                    'LASIK '.$locationName,
                    'best eye care '.$locationName,
                ];
                $canonicalUrl = url('/eye-hospital-in-'.$locationName);
                break;

            default:
                $title = $hospital->meta_title ?? "{$hospitalName} - Best Eye Hospital in {$locationName} | Eye Care";
                $description = $hospital->meta_description ?? "{$hospitalName} offers comprehensive eye care services. Expert ophthalmologists, advanced technology, affordable treatments.";
                $keywords = array_filter(explode(',', $hospital->meta_keywords ?? ''));
                $canonicalUrl = $hospital->canonical_url ?? $this->getHospitalUrl($hospital);
                break;
        }

        // Add location-based keywords
        if ($location) {
            if ($location->parent) {
                $keywords[] = 'eye hospital in '.$location->parent->name;
            }
            $keywords[] = 'eye specialist near me';
        }

        // Add Open Graph data
        $ogImage = $hospital->og_image ?? $hospital->image ?? null;

        return [
            'meta' => [
                'title' => $title,
                'description' => $description,
                'keywords' => implode(', ', array_unique(array_filter($keywords))),
                'canonical' => $canonicalUrl,
                'robots' => 'index, follow',
            ],
            'openGraph' => [
                'title' => $title,
                'description' => $description,
                'url' => $canonicalUrl,
                'type' => 'website',
                'image' => $ogImage ? url($ogImage) : null,
                'site_name' => $hospitalName,
                'locale' => 'en_IN',
            ],
            'twitter' => [
                'card' => 'summary_large_image',
                'title' => $title,
                'description' => $description,
                'image' => $ogImage ? url($ogImage) : null,
                'site' => '@blnk_eye',
            ],
            'schemas' => $this->generateHospitalPageSchema($hospital, $location, $service, $disease),
        ];
    }

    /**
     * Generate hreflang tags for multilingual support.
     */
    public function generateHreflangTags(string $baseUrl, array $languages = ['en-IN']): array
    {
        $tags = [];

        foreach ($languages as $lang) {
            $tags[] = [
                'lang' => $lang,
                'url' => $baseUrl.'?lang='.$lang,
            ];
        }

        // Always add x-default
        $tags[] = [
            'lang' => 'x-default',
            'url' => $baseUrl,
        ];

        return $tags;
    }

    /**
     * Parse and replace shortcodes within a given template string.
     */
    public function compileTemplate(string $template, array $data = []): string
    {
        $replacements = [
            '{{date.year}}' => date('Y'),
            '{{date.month}}' => date('F'),
            '{{date.day}}' => date('d'),
        ];

        if (isset($data['location'])) {
            $replacements['{{location.name}}'] = $data['location']->name ?? '';
            $replacements['{{location.type}}'] = $data['location']->type ?? '';
            $replacements['{{location.slug}}'] = $data['location']->slug ?? '';
            $replacements['{{location.city}}'] = $data['location']->type === 'city' ? $data['location']->name : ($data['location']->parent->name ?? '');
            $replacements['{{location.state}}'] = $data['location']->parent->name ?? $data['location']->name ?? '';
        }

        if (isset($data['hospital'])) {
            $replacements['{{hospital.name}}'] = $data['hospital']->name ?? '';
            $replacements['{{hospital.phone}}'] = $data['hospital']->phone ?? '';
            $replacements['{{hospital.address}}'] = $data['hospital']->address ?? '';
            $replacements['{{hospital.email}}'] = $data['hospital']->email ?? '';
        }

        if (isset($data['disease'])) {
            $replacements['{{disease.name}}'] = $data['disease']->name ?? '';
            $replacements['{{disease.slug}}'] = $data['disease']->slug ?? '';
        }

        if (isset($data['service'])) {
            $replacements['{{service.name}}'] = $data['service']->name ?? '';
            $replacements['{{service.slug}}'] = $data['service']->slug ?? '';
        }

        return str_replace(array_keys($replacements), array_values($replacements), $template);
    }

    /**
     * Generate dynamic SEO title for a page.
     */
    public function generateSeoTitle(string $template, array $data): string
    {
        $title = $this->compileTemplate($template, $data);

        // Ensure title isn't too long
        if (strlen($title) > 60) {
            $title = substr($title, 0, 57).'...';
        }

        return $title;
    }

    /**
     * Generate dynamic meta description.
     */
    public function generateMetaDescription(string $template, array $data): string
    {
        $description = $this->compileTemplate($template, $data);

        // Ensure description is optimal length
        if (strlen($description) > 160) {
            $description = substr($description, 0, 157).'...';
        }

        return $description;
    }

    /**
     * Helper: Generate opening hours specification.
     */
    protected function generateOpeningHours(Hospital $hospital): array
    {
        $hours = [];

        // Weekday hours
        if ($hospital->working_hours_weekday) {
            $hours[] = [
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens' => '09:00',
                'closes' => '18:00',
            ];
        }

        // Saturday hours
        if ($hospital->working_hours_saturday) {
            $hours[] = [
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => 'Saturday',
                'opens' => '09:00',
                'closes' => '17:00',
            ];
        }

        // Sunday hours
        if ($hospital->working_hours_sunday) {
            $hours[] = [
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => 'Sunday',
                'opens' => '10:00',
                'closes' => '14:00',
            ];
        }

        // 24/7 Emergency
        if ($hospital->is_24_7_emergency) {
            $hours[] = [
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                'opens' => '00:00',
                'closes' => '23:59',
            ];
        }

        return $hours;
    }

    /**
     * Helper: Generate service-specific FAQs.
     */
    protected function generateServiceFaqs(Service $service): array
    {
        $serviceName = strtolower($service->name);

        $commonFaqs = [
            'cataract' => [
                ['question' => 'What is cataract surgery?', 'answer' => 'Cataract surgery is a procedure to remove the cloudy lens of your eye and replace it with an artificial lens. It is one of the most common and successful surgeries performed worldwide.'],
                ['question' => 'How long does cataract surgery take?', 'answer' => 'The surgery typically takes 15-30 minutes. Most patients can go home the same day after a short observation period.'],
                ['question' => 'Is cataract surgery painful?', 'answer' => 'No, cataract surgery is performed under local anesthesia. You may feel some pressure but no pain during the procedure.'],
                ['question' => 'What is the recovery time after cataract surgery?', 'answer' => 'Most patients recover within 4-6 weeks. You can resume normal activities within a few days, but should avoid strenuous activities for a few weeks.'],
            ],
            'lasik' => [
                ['question' => 'What is LASIK eye surgery?', 'answer' => 'LASIK (Laser-Assisted In Situ Keratomileusis) is a laser eye surgery that corrects refractive errors like nearsightedness, farsightedness, and astigmatism.'],
                ['question' => 'Am I a candidate for LASIK?', 'answer' => 'Ideal candidates are over 18 years old, have stable vision for at least one year, and have sufficient corneal thickness. A comprehensive eye exam is required to determine eligibility.'],
                ['question' => 'Does LASIK hurt?', 'answer' => 'No, numbing eye drops are used during the procedure. You may feel some discomfort or pressure, but it is generally painless.'],
                ['question' => 'How long does LASIK take?', 'answer' => 'The actual laser procedure takes about 10-15 minutes per eye. The entire visit takes about 1-2 hours.'],
            ],
            'retina' => [
                ['question' => 'What is retina treatment?', 'answer' => 'Retina treatment addresses conditions affecting the retina, such as retinal detachment, macular degeneration, and diabetic retinopathy. Treatment options include laser therapy, injections, and surgery.'],
                ['question' => 'What are the symptoms of retina problems?', 'answer' => 'Common symptoms include floaters, flashes of light, blurred vision, dark spots, and loss of peripheral vision. Seek immediate medical attention if you experience sudden changes.'],
            ],
            'glaucoma' => [
                ['question' => 'What is glaucoma?', 'answer' => 'Glaucoma is a group of eye diseases that damage the optic nerve, usually due to high eye pressure. It is a leading cause of blindness if left untreated.'],
                ['question' => 'How is glaucoma treated?', 'answer' => 'Treatment includes eye drops, oral medications, laser therapy, or surgery to lower eye pressure and prevent further damage.'],
            ],
        ];

        foreach ($commonFaqs as $key => $faqs) {
            if (str_contains($serviceName, $key)) {
                return $faqs;
            }
        }

        return [];
    }

    /**
     * Helper: Get hospital URL.
     */
    protected function getHospitalUrl(Hospital $hospital): string
    {
        if ($hospital->custom_domain) {
            return 'https://'.$hospital->custom_domain;
        }
        if ($hospital->subdomain) {
            return 'https://'.$hospital->subdomain.'.'.config('app.domain', 'blinkeye.in');
        }

        return url('/');
    }

    /**
     * Helper: Get hospital logo URL.
     */
    protected function getHospitalLogoUrl(Hospital $hospital): string
    {
        return asset('logo.png');
    }

    /**
     * Helper: Get hospital image URL.
     */
    protected function getHospitalImageUrl(Hospital $hospital): string
    {
        if ($hospital->image) {
            return asset('storage/'.$hospital->image);
        }

        return asset('images/eye-hospital-default.jpg');
    }
}
