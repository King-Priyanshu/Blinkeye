<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- SEO: Base Meta --}}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="author" content="Blink Eye Hospitals">
        <meta name="publisher" content="Blink Eye Hospitals">
        <meta name="theme-color" content="#0d9488">
        <link rel="canonical" href="{{ url()->current() }}">

        {{-- SEO: Keywords (populated by Inertia Head from Vue) --}}
        <meta name="description" content="Blink Eye Hospitals — India's trusted eye care network. Find expert treatment for Cataract, Glaucoma, LASIK, Retina conditions near you. Book a free consultation today.">
        <meta name="keywords" content="eye hospital, cataract surgery, LASIK surgery, glaucoma treatment, retina treatment, eye doctor, ophthalmologist, eye care, Bathinda, Ludhiana, Amritsar, Punjab, best eye hospital near me, eye checkup, diabetic retinopathy, macular degeneration, pediatric ophthalmology, dry eye treatment, comprehensive eye exam">

        {{-- SEO: Open Graph (Facebook/LinkedIn sharing) --}}
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Blink Eye Hospitals">
        <meta property="og:locale" content="en_IN">
        <meta property="og:url" content="{{ url()->current() }}">

        {{-- SEO: Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@BlinkEyeHosp">

        {{-- SEO: Geo Meta (local SEO signals) --}}
        <meta name="geo.region" content="IN-PB">
        <meta name="geo.placename" content="Punjab, India">

        <title inertia>{{ config('app.name', 'Blink Eye Hospitals') }}</title>

        {{-- Fonts: Using Inter for premium look --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800,900&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

