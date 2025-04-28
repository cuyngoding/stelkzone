<?php

return [

    'paths' => ['api/*', 'login', 'logout', 'user'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'], // tambahkan port React kamu di sini

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // ini penting untuk Sanctum + cookies

];
