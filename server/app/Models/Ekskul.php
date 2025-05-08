<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Siswa;
use App\Models\Pembina;


class Ekskul extends Model
{
    use HasFactory;

    public function siswas()
    {
        return $this->belongsToMany(Siswa::class, 'ekskul_siswa');
    }

    public function pembinas() 
    {
        return $this->belongsToMany(Pembina::class, 'ekskul_pembina');
    }
}   
