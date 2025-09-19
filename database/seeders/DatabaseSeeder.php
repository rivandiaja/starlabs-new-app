<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // First, seed roles
        $this->call(RoleSeeder::class);
        $this->call(DivisionSeeder::class);


        // Optionally create a test user (with a role)
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('admin123'), // Use bcrypt for hashing
            'role_id' => 1, // You can adjust the role_id accordingly
        ]);

    }
}
