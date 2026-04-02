<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * This migration adds database indexes to optimize common query patterns
     * and eliminate N+1 query issues by improving lookup performance.
     */
    public function up(): void
    {
        // Hospitals table indexes
        Schema::table('hospitals', function (Blueprint $table) {
            // Index on slug for hospital lookups
            $table->index('slug', 'hospitals_slug_index');

            // Index on subdomain for subdomain-based lookups
            $table->index('subdomain', 'hospitals_subdomain_index');

            // Index on location_id for location-based hospital queries
            $table->index('location_id', 'hospitals_location_id_index');

            // Composite index for active hospital lookups by location
            $table->index(['is_active', 'location_id'], 'hospitals_active_location_index');
        });

        // Locations table indexes
        Schema::table('locations', function (Blueprint $table) {
            // Index on slug for location lookups
            $table->index('slug', 'locations_slug_index');

            // Index on parent_id for hierarchy queries
            $table->index('parent_id', 'locations_parent_id_index');

            // Composite index for active location lookups
            $table->index(['is_active', 'parent_id'], 'locations_active_parent_index');
        });

        // Diseases table indexes
        Schema::table('diseases', function (Blueprint $table) {
            // Index on slug for disease lookups
            $table->index('slug', 'diseases_slug_index');

            // Composite index for active disease lookups
            $table->index(['is_active', 'slug'], 'diseases_active_slug_index');
        });

        // Services table indexes
        Schema::table('services', function (Blueprint $table) {
            // Index on slug for service lookups
            $table->index('slug', 'services_slug_index');

            // Composite index for active service lookups
            $table->index(['is_active', 'slug'], 'services_active_slug_index');
        });

        // Blogs table indexes
        Schema::table('blogs', function (Blueprint $table) {
            // Index on tenant_id for multi-tenant queries
            $table->index('tenant_id', 'blogs_tenant_id_index');

            // Composite index for active blog lookups by tenant
            $table->index(['is_active', 'tenant_id'], 'blogs_active_tenant_index');
        });

        // Group items table indexes (for relationship queries)
        Schema::table('group_items', function (Blueprint $table) {
            // Composite index for polymorphic relationship queries
            $table->index(['item_type', 'item_id'], 'group_items_item_type_id_index');

            // Index on group_id for group-based queries
            $table->index('group_id', 'group_items_group_id_index');
        });

        // Blog groups table indexes
        Schema::table('blog_groups', function (Blueprint $table) {
            // Composite index for blog-group relationship queries
            $table->index(['blog_id', 'group_id'], 'blog_groups_blog_group_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop hospitals indexes
        Schema::table('hospitals', function (Blueprint $table) {
            $table->dropIndex('hospitals_slug_index');
            $table->dropIndex('hospitals_subdomain_index');
            $table->dropIndex('hospitals_location_id_index');
            $table->dropIndex('hospitals_active_location_index');
        });

        // Drop locations indexes
        Schema::table('locations', function (Blueprint $table) {
            $table->dropIndex('locations_slug_index');
            $table->dropIndex('locations_parent_id_index');
            $table->dropIndex('locations_active_parent_index');
        });

        // Drop diseases indexes
        Schema::table('diseases', function (Blueprint $table) {
            $table->dropIndex('diseases_slug_index');
            $table->dropIndex('diseases_active_slug_index');
        });

        // Drop services indexes
        Schema::table('services', function (Blueprint $table) {
            $table->dropIndex('services_slug_index');
            $table->dropIndex('services_active_slug_index');
        });

        // Drop blogs indexes
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropIndex('blogs_tenant_id_index');
            $table->dropIndex('blogs_active_tenant_index');
        });

        // Drop group_items indexes
        Schema::table('group_items', function (Blueprint $table) {
            $table->dropIndex('group_items_item_type_id_index');
            $table->dropIndex('group_items_group_id_index');
        });

        // Drop blog_groups indexes
        Schema::table('blog_groups', function (Blueprint $table) {
            $table->dropIndex('blog_groups_blog_group_index');
        });
    }
};
