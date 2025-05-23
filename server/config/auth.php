<?php

return [

    'defaults' => [
        'guard' => 'web', // default tetap web
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
        'siswa' => [ // ✅ guard siswa menggunakan sanctum
            'driver' => 'sanctum',
            'provider' => 'siswas',
        ],
        'pembina' => [
        'driver' => 'sanctum',
        'provider' => 'pembinas',
    ],

    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],
        'siswas' => [ // ✅ provider siswa
            'driver' => 'eloquent',
            'model' => App\Models\Siswa::class,
        ],
        'pembinas' => [
        'driver' => 'eloquent',
        'model' => App\Models\Pembina::class,
    ],

    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
