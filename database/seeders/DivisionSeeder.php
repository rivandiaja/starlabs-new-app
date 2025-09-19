<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        \App\Models\Division::insert([
            ['name' => 'Jaringan', 'slug' => 'jaringan', 'image_path' => '/images/academy/jaringan.png'],
            ['name' => 'Pemrograman', 'slug' => 'pemrograman', 'image_path' => '/images/academy/pemrograman.png'],
            ['name' => 'Office', 'slug' => 'office', 'image_path' => '/images/academy/office.png'],
            ['name' => 'Multimedia', 'slug' => 'multimedia', 'image_path' => '/images/academy/multimedia.png'],
        ]);
    }
}
