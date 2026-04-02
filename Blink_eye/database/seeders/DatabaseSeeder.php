<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Super Admin User
        User::firstOrCreate(
            ['email' => 'admin@blinkeye.com'],
            [
                'name' => 'Super Admin',
                'role' => 'super_admin',
                'password' => Hash::make('password'),
            ]
        );

        // Run seeders in proper order
        $this->call([
            LocationSeeder::class,
            ServiceSeeder::class,
            DiseaseSeeder::class,
            HospitalSeeder::class,
            DoctorSeeder::class,
            GroupSeeder::class,
            TemplateSeeder::class,
            AdditionalUsersSeeder::class,
            LeadSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
