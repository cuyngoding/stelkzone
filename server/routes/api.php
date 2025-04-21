<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route untuk register dan login (tanpa middleware)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route yang membutuhkan autentikasi Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // ✅ Route khusus untuk masing-masing role
    Route::middleware('role:admin')->get('/admin', function () {
        return response()->json(['message' => 'Selamat datang, Admin!']);
    });

    Route::middleware('role:siswa')->get('/siswa', function () {
        return response()->json(['message' => 'Halo, Siswa!']);
    });

    Route::middleware('role:pembina')->get('/pembina', function () {
        return response()->json(['message' => 'Hai, Pembina!']);
    });
});
