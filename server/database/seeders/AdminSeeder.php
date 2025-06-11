<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => '544231000@gmail.com'], // ← Email unik
            [
                'nama' => 'Orang Orang Orang',
                'email' => '544231000@gmail.com',
                'password' => Hash::make('544231000'), // ← Password: password
                'role' => 'admin',
            ]
        );
    }
}
