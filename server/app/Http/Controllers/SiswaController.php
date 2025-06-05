<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SiswaImport;
use Illuminate\Support\Facades\Log;

class SiswaController extends Controller
{
    

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nis' => 'required|string|max:20|unique:siswas,nis',
            'nisn' => 'required|string|max:20|unique:siswas,nisn',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'required|string',
            'kelas' => 'required|string|max:100',
        ]);

        $email = $request->nis . '@gmail.com';
        $password = Hash::make($request->nis);

        $siswa = Siswa::create([
        'nama' => $request->nama,
        'nis' => $request->nis,
        'nisn' => $request->nisn,
        'tanggal_lahir' => $request->tanggal_lahir,
        'alamat' => $request->alamat,
        'kelas' => $request->kelas, // ← tambahkan ini
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

    public function show(string $id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        return response()->json($siswa);
    }

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
            'kelas' => 'sometimes|required|string|max:100',
        ]);

        $siswa->update($validated);
        return response()->json($siswa);
    }

    public function destroy(string $id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        $siswa->delete();
        return response()->json(['message' => 'Siswa berhasil dihapus']);
    }

    // 🔽 Tambahkan ini di akhir file
    public function import(Request $request)
{
    $request->validate([
        'file' => 'required|file|mimes:xlsx,xls',
    ]);

    try {
        Excel::import(new SiswaImport, $request->file('file'));
        return response()->json(['message' => 'Data siswa berhasil diimport'], 200);
    } catch (\Exception $e) {
        Log::error("IMPORT ERROR: " . $e->getMessage());
        return response()->json([
            'message' => 'Gagal mengimpor data',
            'error' => $e->getMessage(),
        ], 500);
        }
    }
       public function index(Request $request)
{
    $query = Siswa::query();

    if ($search = $request->query('search')) {
        $query->where(function ($q) use ($search) {
            $q->where('nis', 'like', "%{$search}%")
              ->orWhere('nama', 'like', "%{$search}%");
        });
    }

    return response()->json($query->get(), 200);
}


}
