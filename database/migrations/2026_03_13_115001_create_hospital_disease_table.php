<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Creates a pivot table to link hospitals with the diseases they treat.
     */
    public function up(): void
    {
        Schema::create('hospital_disease', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hospital_id')->constrained()->cascadeOnDelete();
            $table->foreignId('disease_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['hospital_id', 'disease_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospital_disease');
    }
};
