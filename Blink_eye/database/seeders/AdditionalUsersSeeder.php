<?php

namespace Database\Seeders;

use App\Models\Hospital;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdditionalUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Content Manager User
        User::firstOrCreate(
            ['email' => 'content@blinkeye.com'],
            [
                'name' => 'Content Manager',
                'role' => 'content_admin',
                'password' => Hash::make('password'),
            ]
        );

        // Create Hospital Manager User
        $hospital = Hospital::first();
        if ($hospital) {
            User::firstOrCreate(
                ['email' => 'manager@blinkeye.com'],
                [
                    'name' => 'Branch Manager ('.$hospital->name.')',
                    'role' => 'hospital_manager',
                    'hospital_id' => $hospital->id,
                    'password' => Hash::make('password'),
                ]
            );
        }
    }
}
