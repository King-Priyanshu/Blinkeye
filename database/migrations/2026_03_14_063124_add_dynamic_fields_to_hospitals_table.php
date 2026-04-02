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
            $table->string('primary_color')->nullable()->after('image');
            $table->string('secondary_color')->nullable()->after('primary_color');
            $table->string('background_image')->nullable()->after('secondary_color');
            $table->string('map_url')->nullable()->after('background_image');
            $table->integer('map_zoom')->default(12)->after('map_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hospitals', function (Blueprint $table) {
            $table->dropColumn([
                'primary_color',
                'secondary_color',
                'background_image',
                'map_url',
                'map_zoom',
            ]);
        });
    }
};
