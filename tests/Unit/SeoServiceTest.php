<?php

namespace Tests\Unit;

use App\Services\SeoService;
use PHPUnit\Framework\TestCase;
use stdClass;

class SeoServiceTest extends TestCase
{
    /**
     * Test that the SeoService template compiler successfully injects data into shortcodes.
     *
     * @return void
     */
    public function test_it_compiles_shortcodes_correctly()
    {
        $service = new SeoService;

        // The raw template containing Tiptap shortcodes
        $template = '<h1>Best {{service.name}} in {{location.name}}</h1><p>Call {{hospital.phone}} now for your {{disease.name}} treatment.</p>';

        // Mock Eloquent/stdClass payloads representing the matched Taxonomy + Tenant route
        $location = new stdClass;
        $location->name = 'Mumbai';
        $location->type = 'city';
        $location->parent = null;

        $hospital = new stdClass;
        $hospital->phone = '+91-9876543210';

        $medicalService = new stdClass;
        $medicalService->name = 'LASIK Eye Surgery';

        $disease = new stdClass;
        $disease->name = 'Cataract';

        $data = [
            'location' => $location,
            'hospital' => $hospital,
            'service' => $medicalService,
            'disease' => $disease,
        ];

        // Execute compilation
        $compiled = $service->compileTemplate($template, $data);

        // Assert the shortcodes were exactly replaced
        $this->assertEquals(
            '<h1>Best LASIK Eye Surgery in Mumbai</h1><p>Call +91-9876543210 now for your Cataract treatment.</p>',
            $compiled
        );
    }
}
