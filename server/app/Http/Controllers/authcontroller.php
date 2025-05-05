<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller 
{
    // 🧑‍💼 REGISTER ADMIN/PEMBINA
    public function register(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'in:admin,pembina'
        ]);
    
        $user = User::create([
            'nama' => $request->nama, // ← perbaikan di sini
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'admin'
        ]);
    
        return response()->json([
            'user' => $user,
            'message' => 'User registered successfully'
        ]);
    }
    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $token = $user->createToken('authToken')->plainTextToken;
    
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'nama' => $user->nama, // ← perbaikan di sini
                'email' => $user->email,
                'role' => $user->role
            ]
        ]);
    }
    
    public function user()
    {
        $user = auth()->user();
    
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        return response()->json([
            'id' => $user->id,
            'nama' => $user->nama, // ← perbaikan di sini
            'email' => $user->email,
            'role' => $user->role
        ]);
    }
    
    // 🎓 REGISTER SISWA
    // Tambahkan method untuk register siswa
    public function registerSiswa(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'email' => 'required|email|unique:siswas,email',
            'nis' => 'required|unique:siswas,nis',
            'password' => 'required|min:6',
        ]);
    
        $siswa = Siswa::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'nis' => $request->nis,
            'password' => Hash::make($request->password),
        ]);
    
        return response()->json([
            'siswa' => $siswa,
            'message' => 'Siswa berhasil didaftarkan',
        ]);
    }
    
    // Tambahkan method untuk login siswa
    public function loginSiswa(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);        
    
        $siswa = Siswa::where('email', $request->email)->first();
    
        if (!$siswa || !Hash::check($request->password, $siswa->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $token = $siswa->createToken('siswaToken')->plainTextToken;
    
        return response()->json([
            'token' => $token,
            'siswa' => [
                'id' => $siswa->id,
                'nama' => $siswa->nama,
                'email' => $siswa->email,
            ],
        ]);
    }    
}
