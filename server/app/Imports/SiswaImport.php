<?php

namespace App\Imports;

use App\Models\Siswa;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SiswaImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Siswa([
            'nama' => $row['nama'],
            'nis' => $row['nis'],
            'nisn' => $row['nisn'],
            'tanggal_lahir' => $row['tanggal_lahir'],
            'alamat' => $row['alamat'],
            'email' => $row['nis'] . '@gmail.com',
            'password' => Hash::make($row['nis']),
        ]);
    }
}
