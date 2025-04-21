<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Pastikan user sudah login
        $user = $request->user();

        // Jika tidak login atau role tidak cocok, tolak akses
        if (!$user || $user->role !== $role) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // Lanjutkan request kalau role cocok
        return $next($request);
    }
}
