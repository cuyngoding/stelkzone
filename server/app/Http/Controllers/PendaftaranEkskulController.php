<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PendaftaranEkskul;
use Illuminate\Support\Facades\Auth;
use App\Models\Ekskul;

class PendaftaranEkskulController extends Controller
{
    public function daftar(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswas,id',
            'ekskul_id' => 'required|exists:ekskuls,id',
        ]);

        // Cek apakah siswa sudah mendaftar ke ekskul ini
        $sudahDaftar = PendaftaranEkskul::where([
            ['siswa_id', $validated['siswa_id']],
            ['ekskul_id', $validated['ekskul_id']],
        ])->exists();

        if ($sudahDaftar) {
            return response()->json([
                'message' => 'Kamu sudah mendaftar ekskul ini.'
            ], 409); // 409 Conflict
        }

        // Simpan pendaftaran
        PendaftaranEkskul::create($validated);

        return response()->json([
            'message' => 'Berhasil daftar ekskul.'
        ], 201);
    }
    public function ekskulSaya(Request $request)
{
    $siswa = $request->user();

    $ekskuls = Ekskul::whereHas('pendaftaran', function ($query) use ($siswa) {
        $query->where('siswa_id', $siswa->id);
    })->get();

    return response()->json($ekskuls);
}
}
