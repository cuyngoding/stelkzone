<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pembina;
use App\Imports\PembinaImport;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class PembinaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'nip' => 'required|unique:pembinas,nip',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string',
            'no_hp' => 'nullable|string',
        ]);

        $validated['email'] = $validated['nip'] . '@gmail.com';
        $validated['password'] = bcrypt($validated['nip']);
        $validated['role'] = 'pembina';

        $pembina = Pembina::create($validated);

        return response()->json($pembina, 201);
    }

    public function show(Pembina $pembina)
    {
        return $pembina;
    }

    public function update(Request $request, Pembina $pembina)
    {
        $validated = $request->validate([
            'nama' => 'sometimes|required',
            'nip' => 'sometimes|required|unique:pembinas,nip,' . $pembina->id,
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string',
            'no_hp' => 'nullable|string',
        ]);

        if (isset($validated['nip'])) {
            $validated['email'] = $validated['nip'] . '@gmail.com';
            $validated['password'] = bcrypt($validated['nip']);
        }

        $pembina->update($validated);

        return response()->json($pembina);
    }

    public function destroy(Pembina $pembina)
    {
        $pembina->delete();
        return response()->json(['message' => 'Pembina deleted']);
    }
    public function import(Request $request)
{
    $request->validate([
        'file' => 'required|file|mimes:xlsx,xls',
    ]);

    try {
        Excel::import(new PembinaImport, $request->file('file'));
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
    $query = Pembina::query();

    if ($search = $request->query('search')) {
        $query->where(function ($q) use ($search) {
            $q->where('nip', 'like', "%{$search}%")
              ->orWhere('nama', 'like', "%{$search}%");
        });
    }

    return response()->json($query->get(), 200);
}

}
