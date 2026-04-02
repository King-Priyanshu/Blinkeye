<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Delhi/NCR
        $delhi = Location::updateOrCreate(['slug' => 'delhi'], ['type' => 'state', 'name' => 'Delhi/NCR', 'slug' => 'delhi', 'is_active' => true]);
        
        $delhiCities = [
            ['name' => 'New Delhi', 'lat' => 28.6139, 'lng' => 77.2090],
            ['name' => 'South Delhi', 'lat' => 28.5355, 'lng' => 77.2410],
            ['name' => 'Noida', 'lat' => 28.5355, 'lng' => 77.3900],
            ['name' => 'Gurugram', 'lat' => 28.4595, 'lng' => 77.0266],
        ];

        foreach ($delhiCities as $city) {
            $district = Location::updateOrCreate(
                ['slug' => strtolower(str_replace(' ', '-', $city['name']))],
                ['parent_id' => $delhi->id, 'type' => 'district', 'name' => $city['name'], 'slug' => strtolower(str_replace(' ', '-', $city['name'])), 'is_active' => true]
            );

            Location::updateOrCreate(
                ['slug' => strtolower(str_replace(' ', '-', $city['name'])) . '-city'],
                ['parent_id' => $district->id, 'type' => 'city', 'name' => $city['name'], 'slug' => strtolower(str_replace(' ', '-', $city['name'])) . '-city', 'is_active' => true, 'lat' => $city['lat'], 'lng' => $city['lng']]
            );
        }

        // 2. Maharashtra
        $maharashtra = Location::updateOrCreate(['slug' => 'maharashtra'], ['type' => 'state', 'name' => 'Maharashtra', 'slug' => 'maharashtra', 'is_active' => true]);

        $mhCities = [
            ['name' => 'Mumbai', 'lat' => 19.0760, 'lng' => 72.8777],
            ['name' => 'Pune', 'lat' => 18.5204, 'lng' => 73.8567],
        ];

        foreach ($mhCities as $city) {
            $district = Location::updateOrCreate(
                ['slug' => strtolower(str_replace(' ', '-', $city['name']))],
                ['parent_id' => $maharashtra->id, 'type' => 'district', 'name' => $city['name'], 'slug' => strtolower(str_replace(' ', '-', $city['name'])), 'is_active' => true]
            );

            Location::updateOrCreate(
                ['slug' => strtolower(str_replace(' ', '-', $city['name'])) . '-city'],
                ['parent_id' => $district->id, 'type' => 'city', 'name' => $city['name'], 'slug' => strtolower(str_replace(' ', '-', $city['name'])) . '-city', 'is_active' => true, 'lat' => $city['lat'], 'lng' => $city['lng']]
            );
        }

        // 3. Punjab
        $punjab = Location::updateOrCreate(['slug' => 'punjab'], ['type' => 'state', 'name' => 'Punjab', 'slug' => 'punjab', 'is_active' => true]);

        $punjabCities = [
            ['name' => 'Amritsar', 'lat' => 31.6340, 'lng' => 74.8723],
            ['name' => 'Chandigarh', 'lat' => 30.7333, 'lng' => 76.7794],
            ['name' => 'Mohali', 'lat' => 30.7046, 'lng' => 76.7179],
            ['name' => 'Ludhiana', 'lat' => 30.9010, 'lng' => 75.8573],
        ];

        foreach ($punjabCities as $city) {
            $district = Location::updateOrCreate(
                ['slug' => strtolower(str_replace(' ', '-', $city['name']))],
                ['parent_id' => $punjab->id, 'type' => 'district', 'name' => $city['name'], 'slug' => strtolower(str_replace(' ', '-', $city['name'])), 'is_active' => true]
            );

            Location::updateOrCreate(
                ['slug' => strtolower(str_replace(' ', '-', $city['name'])) . '-city'],
                ['parent_id' => $district->id, 'type' => 'city', 'name' => $city['name'], 'slug' => strtolower(str_replace(' ', '-', $city['name'])) . '-city', 'is_active' => true, 'lat' => $city['lat'], 'lng' => $city['lng']]
            );
        }
    }
}
