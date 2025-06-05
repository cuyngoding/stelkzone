<?php

namespace App\Imports;

use App\Models\Pembina;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Carbon\Carbon;

class PembinaImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        $tanggal = is_numeric($row['tanggal_lahir'])
            ? Date::excelToDateTimeObject($row['tanggal_lahir'])->format('Y-m-d')
            : Carbon::createFromFormat('d-m-Y', $row['tanggal_lahir'])->format('Y-m-d');

        return new Pembina([
            'nama' => $row['nama'],
            'nip' => $row['nip'],
            'tanggal_lahir' => $tanggal,
            'alamat' => $row['alamat'],
            'email' => $row['nip'] . '@gmail.com',
            'role' => 'pembina',
            'password' => Hash::make($row['nip']),
        ]);
    }
}
