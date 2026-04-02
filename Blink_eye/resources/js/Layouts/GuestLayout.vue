<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="min-h-screen flex selection:bg-teal-500 selection:text-white bg-white">
        <!-- Left Side: Form Area -->
        <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 border-r border-slate-100 z-10 bg-white">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div class="mb-10 text-center lg:text-left">
                    <Link href="/">
                        <ApplicationLogo class="h-12 w-auto fill-current text-teal-600 mx-auto lg:mx-0" />
                    </Link>
                    <h2 class="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                        Welcome Back
                    </h2>
                    <p class="mt-2 text-sm text-slate-500">
                        Sign in to access your dashboard.
                    </p>
                </div>

                <div class="mt-8">
                    <slot />
                </div>
            </div>
        </div>
        
        <!-- Right Side: Imagery Area -->
        <div class="hidden lg:block relative w-0 flex-1">
            <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Medical professional" />
            <div class="absolute inset-0 bg-gradient-to-r from-teal-900/40 via-blue-900/40 to-slate-900/60 mix-blend-multiply"></div>
            
            <div class="absolute inset-0 flex flex-col justify-end p-16">
                <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-xl shadow-2xl">
                    <div class="flex gap-2 mb-4">
                         <svg class="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" /></svg>
                         <svg class="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" /></svg>
                         <svg class="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" /></svg>
                         <svg class="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" /></svg>
                         <svg class="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" /></svg>
                    </div>
                    <p class="text-white text-lg font-medium leading-relaxed drop-shadow-md">
                        "The technology and care at Blink Eye Hospitals completely transformed my vision. The staff was incredibly professional and the facility is state-of-the-art."
                    </p>
                    <p class="text-slate-300 text-sm mt-4 font-semibold uppercase tracking-wider">— Recent Patient Review</p>
                </div>
            </div>
        </div>
    </div>
</template>
