<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\SiteSetting;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, json, boolean, integer
            $table->string('group')->default('general'); // general, stats, theme, hero
            $table->timestamps();
        });

        // Seed default settings
        $defaults = [
            // Stats
            ['key' => 'stat_surgeries', 'value' => '50,000+', 'type' => 'string', 'group' => 'stats'],
            ['key' => 'stat_surgeries_label', 'value' => 'Successful Surgeries', 'type' => 'string', 'group' => 'stats'],
            ['key' => 'stat_locations', 'value' => '15+', 'type' => 'string', 'group' => 'stats'],
            ['key' => 'stat_locations_label', 'value' => 'Hospital Locations', 'type' => 'string', 'group' => 'stats'],
            ['key' => 'stat_success_rate', 'value' => '98%', 'type' => 'string', 'group' => 'stats'],
            ['key' => 'stat_success_rate_label', 'value' => 'Success Rate', 'type' => 'string', 'group' => 'stats'],
            ['key' => 'stat_experience', 'value' => '25+', 'type' => 'string', 'group' => 'stats'],
            ['key' => 'stat_experience_label', 'value' => 'Years Experience', 'type' => 'string', 'group' => 'stats'],

            // Theme colors
            ['key' => 'color_primary', 'value' => '#0f2b46', 'type' => 'string', 'group' => 'theme'],
            ['key' => 'color_accent', 'value' => '#f97316', 'type' => 'string', 'group' => 'theme'],
            ['key' => 'color_accent_hover', 'value' => '#ea580c', 'type' => 'string', 'group' => 'theme'],

            // Hero content
            ['key' => 'hero_title_line1', 'value' => 'Your Vision,', 'type' => 'string', 'group' => 'hero'],
            ['key' => 'hero_title_highlight', 'value' => 'Mission', 'type' => 'string', 'group' => 'hero'],
            ['key' => 'hero_subtitle', 'value' => 'Search for any eye disease, treatment or location to find expert care, top hospitals, and detailed guides — all personalized to your area.', 'type' => 'string', 'group' => 'hero'],
            ['key' => 'hero_badge_text', 'value' => 'Trusted Eye Care Since 2001', 'type' => 'string', 'group' => 'hero'],
            ['key' => 'phone_number', 'value' => '1800-123-4567', 'type' => 'string', 'group' => 'general'],
            ['key' => 'cta_title', 'value' => 'Ready to See the World Clearly?', 'type' => 'string', 'group' => 'hero'],
            ['key' => 'cta_subtitle', 'value' => 'Book your appointment today and take the first step towards better vision.', 'type' => 'string', 'group' => 'hero'],
            ['key' => 'footer_text', 'value' => 'Advanced eye care across multiple locations in India.', 'type' => 'string', 'group' => 'general'],
        ];

        foreach ($defaults as $setting) {
            SiteSetting::create($setting);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
