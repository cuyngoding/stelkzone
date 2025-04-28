<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\PembinaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        return response()->json([
            'user' => Auth::user()
        ]);
    }

    return response()->json([
        'message' => 'Login gagal'
    ], 401);
});

Route::post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['message' => 'Logged out']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'role:siswa'])->group(function () {
    Route::get('/siswa', [SiswaController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'role:pembina'])->group(function () {
    Route::get('/pembina', [PembinaController::class, 'index']);
});