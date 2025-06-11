<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ekskul;

class EkskulController extends Controller
{
    /**
     * Menampilkan semua ekskul + jumlah anggota
     */
    public function index()
    {
        return Ekskul::withCount('pendaftaran')->get()->map(function ($ekskul) {
            return [
                'id' => $ekskul->id,
                'nama' => $ekskul->nama,
                'logo' => $ekskul->logo,
                'deskripsi' => $ekskul->deskripsi,
                'jumlah_anggota' => $ekskul->pendaftaran_count,
            ];
        });
    }

    /**
     * Menampilkan detail 1 ekskul berdasarkan ID
     */
    public function show($id)
    {
        $ekskul = Ekskul::withCount('pendaftaran')->findOrFail($id);

        return response()->json([
            'id' => $ekskul->id,
            'nama' => $ekskul->nama,
            'logo' => $ekskul->logo,
            'deskripsi' => $ekskul->deskripsi,
            'pembina' => $ekskul->pembina,
            'pembina_putra' => $ekskul->pembina_putra,
            'pembina_putri' => $ekskul->pembina_putri,
            'ketua' => $ekskul->ketua,
            'ketua_putra' => $ekskul->ketua_putra,
            'ketua_putri' => $ekskul->ketua_putri,
            'jumlah_anggota' => $ekskul->pendaftaran_count,
        ]);
    }

    /**
     * Tambah ekskul (untuk admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string',
            'deskripsi' => 'nullable|string',
            'pembina' => 'nullable|string',
            'pembina_putra' => 'nullable|string',
            'pembina_putri' => 'nullable|string',
            'ketua' => 'nullable|string',
            'ketua_putra' => 'nullable|string',
            'ketua_putri' => 'nullable|string',
            'logo' => 'nullable|string', // URL gambar/logo ekskul
        ]);

        $ekskul = Ekskul::create($validated);

        return response()->json([
            'message' => 'Ekskul berhasil ditambahkan.',
            'data' => $ekskul,
        ], 201);
    }
    public function ekskulSaya(Request $request)
{
    $pembina = $request->user();

    $ekskuls = Ekskul::where('pembina_id', $pembina->id)->get();

    return response()->json($ekskuls);
}

}
