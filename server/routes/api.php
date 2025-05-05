<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SiswaController;

// 🧑‍💼 AUTH ADMIN/PEMBINA
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🎓 AUTH SISWA
Route::post('/siswa/register', [AuthController::class, 'registerSiswa']);
Route::post('/siswa/login', [AuthController::class, 'loginSiswa']);

// 🔐 PROTECTED ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // 👑 ADMIN
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin', fn () => response()->json(['message' => 'Selamat datang, Admin!']));
        Route::apiResource('/siswas', SiswaController::class);
    });

    // 🎓 SISWA
    Route::middleware('role:siswa')->get('/siswa', fn () => response()->json(['message' => 'Halo, Siswa!']));

    // 📘 PEMBINA
    Route::middleware('role:pembina')->get('/pembina', fn () => response()->json(['message' => 'Hai, Pembina!']));
});
// 🛡️ PROTECTED SISWA ROUTES (khusus guard siswa)
Route::middleware('auth:siswa')->group(function () {
    Route::get('/siswa/profile', fn (\Illuminate\Http\Request $request) => response()->json([
        'id' => $request->user()->id,
        'nama' => $request->user()->nama,
        'nis' => $request->user()->nis,
    ]));
});
