<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SiswaController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Admin routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin', fn () => response()->json(['message' => 'Selamat datang, Admin!']));
        Route::apiResource('/siswas', SiswaController::class);
    });

    // Siswa routes
    Route::middleware('role:siswa')->get('/siswa', fn () => response()->json(['message' => 'Halo, Siswa!']));

    // Pembina routes
    Route::middleware('role:pembina')->get('/pembina', fn () => response()->json(['message' => 'Hai, Pembina!']));
});
