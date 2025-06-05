<?php

namespace App\Imports;

use App\Models\Siswa;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Illuminate\Support\Facades\Log;

class SiswaImport implements ToModel, WithHeadingRow
{
public function model(array $row)
{
    try {
        $tanggal = is_numeric($row['tanggal_lahir'])
            ? Date::excelToDateTimeObject($row['tanggal_lahir'])->format('Y-m-d')
            : Carbon::createFromFormat('d-m-Y', $row['tanggal_lahir'])->format('Y-m-d');

        return new Siswa([
            'nama' => $row['nama'],
            'nis' => $row['nis'],
            'nisn' => $row['nisn'],
            'tanggal_lahir' => $tanggal,
            'alamat' => $row['alamat'],
            'kelas' => $row['kelas'],
            'email' => $row['nis'] . '@gmail.com',
            'password' => Hash::make($row['nis']),
        ]);
    } catch (\Throwable $e) {
        Log::error("Row gagal di-import: ", $row);
        Log::error("Error: " . $e->getMessage());
        throw $e;
    }
}
}
