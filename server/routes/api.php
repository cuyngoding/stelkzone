<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\PembinaController;

// 🧑‍💼 AUTH ADMIN
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🎓 AUTH SISWA
Route::post('/siswa/register', [AuthController::class, 'registerSiswa']);
Route::post('/siswa/login', [AuthController::class, 'loginSiswa']);

// 📘 AUTH PEMBINA
Route::post('/pembina/register', [AuthController::class, 'registerPembina']);
Route::post('/pembina/login', [AuthController::class, 'loginPembina']);

// 🔐 PROTECTED ROUTES (umum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// 🛡️ SISWA PROTECTED ROUTES
Route::middleware('auth:siswa')->group(function () {
    Route::get('/siswa', fn () => response()->json(['message' => 'Halo, Siswa!']));
    Route::get('/siswa/profile', fn (\Illuminate\Http\Request $request) => response()->json([
        'id' => $request->user()->id,
        'nama' => $request->user()->nama,
        'nis' => $request->user()->nis,
    ]));
});

// 🛡️ PEMBINA PROTECTED ROUTES
Route::middleware('auth:pembina')->group(function () {
    Route::get('/pembina', fn () => response()->json(['message' => 'Hai, Pembina!']));
    // Tambahkan route khusus pembina di sini jika ada
});

// 👑 ADMIN PROTECTED ROUTES
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin', fn () => response()->json(['message' => 'Selamat datang, Admin!']));
    Route::apiResource('/siswas', SiswaController::class);
    Route::post('/siswas/import', [SiswaController::class, 'import']); // ← route import
    Route::apiResource('/pembinas', PembinaController::class);
});
