<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hospitals', function (Blueprint $table) {
            // Contact Information
            $table->string('address')->nullable()->after('phone');
            $table->string('emergency_contact')->nullable()->after('address');
            $table->string('whatsapp')->nullable()->after('emergency_contact');

            // Working Hours
            $table->string('working_hours_weekday')->nullable()->after('whatsapp');
            $table->string('working_hours_saturday')->nullable()->after('working_hours_weekday');
            $table->string('working_hours_sunday')->nullable()->after('working_hours_saturday');
            $table->boolean('is_24_7_emergency')->default(false)->after('working_hours_sunday');

            // Social Media
            $table->string('facebook')->nullable()->after('is_24_7_emergency');
            $table->string('instagram')->nullable()->after('facebook');
            $table->string('twitter')->nullable()->after('instagram');
            $table->string('youtube')->nullable()->after('twitter');
            $table->string('linkedin')->nullable()->after('youtube');

            // Additional Information
            $table->text('short_description')->nullable()->after('linkedin');
            $table->text('about_us')->nullable()->after('short_description');
            $table->string('established_year')->nullable()->after('about_us');
            $table->integer('number_of_beds')->nullable()->after('established_year');
            $table->integer('number_of_doctors')->nullable()->after('number_of_beds');

            // Features/Amenities (JSON)
            $table->json('amenities')->nullable()->after('number_of_doctors');

            // Accreditation
            $table->text('accreditations')->nullable()->after('amenities');

            // Languages
            $table->json('languages')->nullable()->after('accreditations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hospitals', function (Blueprint $table) {
            $table->dropColumn([
                'address',
                'emergency_contact',
                'whatsapp',
                'working_hours_weekday',
                'working_hours_saturday',
                'working_hours_sunday',
                'is_24_7_emergency',
                'facebook',
                'instagram',
                'twitter',
                'youtube',
                'linkedin',
                'short_description',
                'about_us',
                'established_year',
                'number_of_beds',
                'number_of_doctors',
                'amenities',
                'accreditations',
                'languages',
            ]);
        });
    }
};
