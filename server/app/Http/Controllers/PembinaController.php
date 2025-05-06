<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pembina;

class PembinaController extends Controller
{
    public function index()
    {
        return Pembina::all();
    }

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
}
