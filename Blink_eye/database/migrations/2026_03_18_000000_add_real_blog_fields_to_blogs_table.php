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
        Schema::table('blogs', function (Blueprint $table) {
            // Fields for real/static blogs (non-template)
            $table->string('title')->nullable()->after('slug_template');
            $table->string('slug')->nullable()->after('title');
            $table->text('excerpt')->nullable()->after('slug');
            $table->longText('content')->nullable()->after('excerpt');
            $table->string('image')->nullable()->after('content');
            // Flag to distinguish between template and real blog
            $table->boolean('is_template')->default(true)->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn([
                'title',
                'slug',
                'excerpt',
                'content',
                'image',
                'is_template',
            ]);
        });
    }
};
