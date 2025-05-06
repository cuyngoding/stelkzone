<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        $request->validate([
            'nama' => 'required|string|max:255',
            'nis' => 'required|string|max:20|unique:siswas,nis',
            'nisn' => 'required|string|max:20|unique:siswas,nisn',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'required|string',
        ]);
    
        // Generate email dan hash password berdasarkan NIS
        $email = $request->nis . '@gmail.com';
        $password = Hash::make($request->nis);
    
        // Simpan semua ke tabel siswas
        $siswa = Siswa::create([
            'nama' => $request->nama,
            'nis' => $request->nis,
            'nisn' => $request->nisn,
            'tanggal_lahir' => $request->tanggal_lahir,
            'alamat' => $request->alamat,
            'email' => $email,
            'password' => $password,
        ]);

        return response()->json([
            'message' => 'Siswa berhasil ditambahkan.',
            'siswa' => [
                'id' => $siswa->id,
                'nama' => $siswa->nama,
                'nis' => $siswa->nis,
                'nisn' => $siswa->nisn,
                'email' => $siswa->email,
                'alamat' => $siswa->alamat,
                'tanggal_lahir' => $siswa->tanggal_lahir,
            ]
        ], 201);

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
            'email' => 'sometimes|required|email|unique:siswas,email,' . $id,
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