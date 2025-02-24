<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authcontroller;



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register',[authcontroller::class,'register']);
Route::post('/login',[authcontroller::class,'login']);
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user',[authcontroller::class,'user']);
    Route::post('/logout',[authcontroller::class,'logout']);
});
