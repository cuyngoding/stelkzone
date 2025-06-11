<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ekskul;

class EkskulSeeder extends Seeder
{
    public function run()
    {
        // Tipe 1: Pembina & Ketua ganda
        Ekskul::create([
            'nama' => 'SATRYA ROVER (PRAMUKA)',
            'deskripsi' => 'Ekskul Pramuka untuk pembinaan karakter dan kedisiplinan.',
            'pembina_putra' => 'Haryadi Indrawijaya',
            'pembina_putri' => 'Yayu Aprilika Yunus',
            'ketua_putra' => 'Arthawan Pratama',
            'ketua_putri' => 'Siti Khadija',
            'logo' => 'https://i.pinimg.com/736x/5c/52/a2/5c52a23d49d5657afb92b9b1b237aa99.jpg',
            
        ]);

        // Tipe 2: Pembina & Ketua tunggal
        Ekskul::create([
            'nama' => 'BASKET',
            'deskripsi' => 'Ekskul olahraga basket untuk siswa berprestasi.',
            'pembina' => 'Bu Lilis',
            'ketua' => 'Amanda',
            'logo' => 'https://i.pinimg.com/736x/65/ca/7e/65ca7ee1565de859d45130a9762398b9.jpg',
        ]);

        Ekskul::create([
            'nama' => 'REKAYASA WEB (WEB TECHNOLOGY)',
            'deskripsi' => 'Ekskul pemrograman web dan teknologi informasi.',
            'pembina' => 'Pak Rudi',
            'ketua' => 'Ilham Maulana',
            'logo' => 'https://i.pinimg.com/736x/6f/15/6f/6f156f753877456df7c2710058c8b064.jpg',
        ]);

        Ekskul::create([
            'nama' => 'Gradasi',
            'deskripsi' => 'Ekskul kesenian .',
            'pembina' => 'Pak Askar',
            'ketua' => 'Ando',
            'logo' => 'https://i.pinimg.com/736x/6f/15/6f/6f156f753877456df7c2710058c8b064.jpg',
        ]);
        Ekskul::create([
            'nama' => 'Christosel',
            'deskripsi' => 'Ekskul umat beragama kristen',
            'pembina' => 'kurang tahu',
            'ketua' => 'kurang tahu',
            'logo' => 'https://i.pinimg.com/736x/6f/15/6f/6f156f753877456df7c2710058c8b064.jpg',
        ]);
    }
}
