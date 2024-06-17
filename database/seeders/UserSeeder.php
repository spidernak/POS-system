<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->delete();
        DB::statement('alter table users auto_increment = 1;');
        $user = [
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt(12345678),
                'image' => 'admin.png',
                'gender' => 'Male',
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Admin2',
                'email' => 'admin2@gmail.com',
                'password' => bcrypt(12345678),
                'image' => 'admin2.png',
                'gender' => 'Female',
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            ];
        DB::table('users')->insert($user);

    }
}
