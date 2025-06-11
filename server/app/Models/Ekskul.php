<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ekskul extends Model
{
    use HasFactory;

    protected $table = 'ekskuls';

    protected $fillable = [
        'nama',
        'deskripsi',
        'pembina',
        'pembina_putra',
        'pembina_putri',
        'ketua',
        'ketua_putra',
        'ketua_putri',
        'logo',
    ];

    /**
     * Relasi ke pendaftaran ekskul (one-to-many)
     */
    public function pendaftaran()
    {
        return $this->hasMany(PendaftaranEkskul::class, 'ekskul_id');
    }

    /**
     * (Opsional) Relasi many-to-many langsung ke siswa melalui tabel pendaftaran
     */
    public function siswa()
    {
        return $this->belongsToMany(Siswa::class, 'pendaftaran_ekskul', 'ekskul_id', 'siswa_id');
    }
    
    public function pembinaUtama()
    {
        return $this->belongsTo(Pembina::class, 'pembina_id');
    }

}
