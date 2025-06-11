<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PendaftaranEkskul extends Model
{
    protected $table = 'pendaftaran_ekskul';

    protected $fillable = [
        'siswa_id',
        'ekskul_id',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function ekskul()
    {
        return $this->belongsTo(Ekskul::class);
    }
}
