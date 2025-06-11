<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\PembinaController;
use App\Http\Controllers\PendaftaranEkskulController;
use App\Http\Controllers\EkskulController;

// 🧑‍💼 AUTH ADMIN
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🎓 AUTH SISWA
Route::post('/siswa/register', [AuthController::class, 'registerSiswa']);
Route::post('/siswa/login', [AuthController::class, 'loginSiswa']);

// 📘 AUTH PEMBINA
Route::post('/pembina/register', [AuthController::class, 'registerPembina']);
Route::post('/pembina/login', [AuthController::class, 'loginPembina']);

// 📘 Ekskul publik (umum)
Route::get('/ekskuls', [EkskulController::class, 'index']);
Route::get('/ekskuls/{id}', [EkskulController::class, 'show']);

// 🔐 ROUTE TERLINDUNGI UNTUK SEMUA ROLE YANG LOGIN VIA SANCTUM
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // ==================== SISWA ====================
    Route::get('/siswa/profile', fn (\Illuminate\Http\Request $request) => response()->json([
        'id' => $request->user()->id,
        'nama' => $request->user()->nama,
        'nis' => $request->user()->nis,
        'nisn' => $request->user()->nisn,
        'tanggal_lahir' => $request->user()->tanggal_lahir,
        'alamat' => $request->user()->alamat,
        'kelas' => $request->user()->kelas,
    ]));

    Route::post('/pendaftaran-ekskul', [PendaftaranEkskulController::class, 'daftar']);
    Route::get('/siswa/ekskul-saya', [PendaftaranEkskulController::class, 'ekskulSaya']);
    Route::get('/pembina/ekskul-saya', [EkskulController::class, 'ekskulSaya']);

    // ==================== PEMBINA ====================
    Route::get('/pembina/profile', fn (\Illuminate\Http\Request $request) => response()->json([
        'id' => $request->user()->id,
        'nama' => $request->user()->nama,
        'nip' => $request->user()->nip,
        'tanggal_lahir' => $request->user()->tanggal_lahir,
        'alamat' => $request->user()->alamat,
        
    ]));

    // ==================== ADMIN ====================
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin', fn () => response()->json(['message' => 'Selamat datang, Admin!']));
        Route::apiResource('/siswas', SiswaController::class);
        Route::post('/siswas/import', [SiswaController::class, 'import']);
        Route::apiResource('/pembinas', PembinaController::class);
        Route::post('/pembinas/import', [PembinaController::class, 'import']);
        Route::post('/ekskuls', [EkskulController::class, 'store']);
        Route::get('/siswas/search', [SiswaController::class, 'search']);
        Route::get('/pembinas/search', [PembinaController::class, 'search']);
    });
});
