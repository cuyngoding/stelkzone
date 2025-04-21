<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\PembinaController;


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
});

Route::middleware(['auth', 'role:siswa'])->group(function () {
    Route::get('/siswa', [SiswaController::class, 'index']);
});

Route::middleware(['auth', 'role:pembina'])->group(function () {
    Route::get('/pembina', [PembinaController::class, 'index']);
});



