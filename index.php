<?php
/**
 * Hostinger Bridge - index.php
 * 
 * This file sits at: public_html/blink/index.php
 * It bridges requests to the Laravel app inside Blink_eye/public/index.php
 * 
 * DO NOT MODIFY unless you change the folder structure.
 */

// Define the Laravel public path
$laravelPublicPath = __DIR__ . '/Blink_eye/public';

// Use the maintenance file from Laravel
if (file_exists($laravelPublicPath . '/storage/framework/maintenance.php')) {
    require $laravelPublicPath . '/storage/framework/maintenance.php';
}

// Register the auto-loader
require __DIR__ . '/Blink_eye/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/Blink_eye/bootstrap/app.php';

// Override the public path so Laravel serves assets correctly
$app->usePublicPath($laravelPublicPath);

// Run the application
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
