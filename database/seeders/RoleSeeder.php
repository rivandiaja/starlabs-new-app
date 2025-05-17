<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'Dev',
            'Admin',
            'BPH',
            'KaDiv Pemrograman',
            'KaDiv Multimedia',
            'KaDiv Jaringan',
            'KaDiv Office',
            'Pengurus',
            'Anggota',
        ];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }
    }
}
