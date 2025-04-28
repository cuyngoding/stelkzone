<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nis',
        'nisn',
        'tanggal_lahir',
        'alamat',
        'user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
