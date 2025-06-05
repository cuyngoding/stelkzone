<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens; // jika pakai Sanctum
use Illuminate\Notifications\Notifiable;

class Siswa extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'nama',
        'nis',
        'nisn',
        'tanggal_lahir',
        'alamat',
        'kelas',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
