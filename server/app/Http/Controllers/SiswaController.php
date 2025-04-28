<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    // GET /api/siswa
    public function index()
    {
        return response()->json(Siswa::all(), 200);
    }

    // POST /api/siswa
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nis' => 'required|numeric|unique:siswas',
            'nisn' => 'required|numeric|unique:siswas',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
        ]);

        // Ambil user_id dari token (auth:sanctum)
        $validated['user_id'] = $request->user()->id;

        $siswa = Siswa::create($validated);
        return response()->json($siswa, 201);
    }

    // GET /api/siswa/{id}
    public function show(string $id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        return response()->json($siswa);
    }

    // PUT /api/siswa/{id}
    public function update(Request $request, string $id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'nis' => 'sometimes|required|numeric|unique:siswas,nis,' . $id,
            'nisn' => 'sometimes|required|numeric|unique:siswas,nisn,' . $id,
            'tanggal_lahir' => 'sometimes|required|date',
            'alamat' => 'sometimes|required|string',
        ]);

        $siswa->update($validated);
        return response()->json($siswa);
    }

    // DELETE /api/siswa/{id}
    public function destroy(string $id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        $siswa->delete();
        return response()->json(['message' => 'Siswa berhasil dihapus']);
    }
}
