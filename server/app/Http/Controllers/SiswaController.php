<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Hello, Siswa!']);
    }
}
