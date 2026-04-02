<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Page Not Found - Blink Eye Hospitals</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800,900&display=swap" rel="stylesheet" />

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'Figtree', 'sans-serif'],
                    },
                    colors: {
                        'trust': {
                            light: '#14b8a6',
                            DEFAULT: '#0f766e',
                            dark: '#134e4a',
                        }
                    }
                }
            }
        }
    </script>
</head>

<body class="font-sans antialiased bg-gray-50 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="/" class="flex items-center">
                        <div class="flex-shrink-0 flex items-center">
                            <svg class="h-8 w-8 text-trust" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        <span class="ml-2 text-xl font-bold text-gray-900">Blink Eye</span>
                    </a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/" class="text-gray-600 hover:text-trust font-medium transition">Home</a>
                    <a href="/services" class="text-gray-600 hover:text-trust font-medium transition">Services</a>
                    <a href="/doctors" class="text-gray-600 hover:text-trust font-medium transition">Doctors</a>
                    <a href="/hospitals" class="text-gray-600 hover:text-trust font-medium transition">Hospitals</a>
                    <a href="/contact" class="text-gray-600 hover:text-trust font-medium transition">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full text-center">
            <!-- Error Icon -->
            <div class="relative">
                <div class="absolute -inset-4 bg-amber-100 rounded-full opacity-50 blur-xl"></div>
                <div class="relative bg-white p-6 rounded-full shadow-lg border border-amber-100">
                    <svg class="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <!-- Error Code -->
            <h1 class="mt-8 text-6xl font-extrabold text-gray-900 tracking-tight">404</h1>

            <!-- Title -->
            <h2 class="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h2>

            <!-- Message -->
            <p class="mt-3 text-gray-600">
                @isset($message)
                {{ $message }}
                @else
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                @endisset
            </p>

            <!-- Request ID -->
            @isset($request_id)
            <div class="mt-4 p-3 bg-gray-100 rounded-lg">
                <p class="text-xs text-gray-500">Request ID: {{ $request_id }}</p>
            </div>
            @endisset

            <!-- Search Suggestion -->
            <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p class="text-sm text-blue-800 font-medium">Looking for something specific?</p>
                <div class="mt-3 flex gap-2">
                    <a href="/services" class="text-sm text-blue-600 hover:text-blue-800 underline">Our Services</a>
                    <span class="text-blue-300">•</span>
                    <a href="/doctors" class="text-sm text-blue-600 hover:text-blue-800 underline">Find a Doctor</a>
                    <span class="text-blue-300">•</span>
                    <a href="/hospitals" class="text-sm text-blue-600 hover:text-blue-800 underline">Hospitals</a>
                </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/"
                    class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-trust hover:bg-trust-dark transition shadow-sm">
                    <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                </a>
                <button onclick="window.history.back()"
                    class="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm">
                    Go Back
                </button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row justify-between items-center">
                <p class="text-sm text-gray-500">
                    © {{ date('Y') }} Blink Eye Hospitals. All rights reserved.
                </p>
                <div class="flex space-x-6 mt-4 sm:mt-0">
                    <a href="/privacy" class="text-sm text-gray-500 hover:text-trust">Privacy Policy</a>
                    <a href="/terms" class="text-sm text-gray-500 hover:text-trust">Terms of Service</a>
                    <a href="/contact" class="text-sm text-gray-500 hover:text-trust">Contact Us</a>
                </div>
            </div>
        </div>
    </footer>
</body>

</html>