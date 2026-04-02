<template>
  <HospitalLayout :hospital="hospital" :hospitals="hospitals">
    <!-- Hero Section with Modern Dark Theme -->
    <section class="relative min-h-[700px] flex items-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-slate-950">
        <!-- Gradient Orbs -->
        <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-teal-500/20 blur-[150px] animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]"></div>
        
        <!-- Grid Pattern -->
        <div class="absolute inset-0 opacity-[0.03]" 
          style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;">
        </div>
      </div>
      
      <!-- Background Image Overlay (if exists) -->
      <div 
        v-if="hospital.background_image"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${hospital.background_image})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60"></div>
      </div>
      <div v-else class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950"></div>
      
      <div class="relative container mx-auto px-4 py-24">
        <div class="max-w-4xl">
          <!-- Trust Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
            <span class="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
            <span class="text-teal-300 text-sm font-medium">Best Eye Care in {{ hospital.location?.name || 'Punjab' }}</span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            {{ hospital.name }}
            <span class="block mt-2 bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Best Eye Hospital in {{ hospital.location?.name || 'India' }}
            </span>
          </h1>
          
          <p class="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl leading-relaxed">
            {{ hospital.short_description || 'Experience world-class eye care with advanced technology and our team of expert ophthalmologists.' }}
          </p>
          
          <!-- Stats Row -->
          <div class="flex flex-wrap gap-6 md:gap-10 mb-10">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                <svg class="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-white">15+</p>
                <p class="text-sm text-slate-400">Years Experience</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-white">{{ hospital.number_of_doctors || '10+' }}</p>
                <p class="text-sm text-slate-400">Expert Doctors</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-white">50K+</p>
                <p class="text-sm text-slate-400">Happy Patients</p>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4">
            <Link 
              href="/book-appointment" 
              class="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all hover:scale-105"
            >
              <span class="relative z-10 flex items-center gap-2">
                Book Free Consultation
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
            </Link>
            <Link 
              href="/contact" 
              class="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div class="w-1 h-2 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Gallery Slider -->
    <section v-if="hospital.galleries && hospital.galleries.length > 0" class="py-12 bg-slate-950">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-2">Our Facility</h2>
          <p class="text-slate-400">World-class infrastructure for premium eye care</p>
        </div>
        <div class="relative max-w-5xl mx-auto">
          <div class="overflow-hidden rounded-2xl">
            <div class="flex transition-transform duration-700 ease-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="(gallery, index) in hospital.galleries" :key="index" class="w-full flex-shrink-0">
                <img 
                  :src="gallery.image" 
                  :alt="`Hospital Gallery ${index + 1}`"
                  class="w-full h-64 md:h-96 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <!-- Navigation -->
          <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all group">
            <svg class="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button @click="nextSlide" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all group">
            <svg class="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <!-- Dots -->
          <div class="flex justify-center gap-2 mt-6">
            <button 
              v-for="(gallery, index) in hospital.galleries" 
              :key="index"
              @click="currentSlide = index"
              :class="['w-2 h-2 rounded-full transition-all duration-300', currentSlide === index ? 'w-8 bg-teal-400' : 'bg-slate-600 hover:bg-slate-500']"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Info Bar - Modern Card Design -->
    <section class="py-8 bg-slate-900 border-y border-white/5">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-teal-500/30 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase tracking-wider">Location</p>
              <p class="text-white font-semibold">{{ hospital.location?.name || 'Punjab' }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
              <a :href="`tel:${hospital.phone}`" class="text-white font-semibold hover:text-cyan-400 transition-colors">{{ hospital.phone }}</a>
            </div>
          </div>
          <div class="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase tracking-wider">Email</p>
              <a :href="`mailto:${hospital.email}`" class="text-white font-semibold hover:text-blue-400 transition-colors text-sm">{{ hospital.email }}</a>
            </div>
          </div>
          <div class="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase tracking-wider">Hours</p>
              <p class="text-white font-semibold text-sm">{{ hospital.working_hours_weekday || 'Mon-Sat: 9AM-6PM' }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section v-if="services && services.length > 0" class="py-20 bg-slate-950">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-4">Our Services</span>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Comprehensive Eye Care</h2>
          <p class="text-slate-400 max-w-2xl mx-auto">Advanced treatments and procedures for all your eye care needs</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(service, index) in services.slice(0, 6)" 
            :key="service.id"
            class="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div class="relative">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span class="text-2xl">{{ serviceIcons[index % serviceIcons.length] }}</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">{{ service.name }}</h3>
              <p class="text-slate-400 text-sm mb-4 line-clamp-2">{{ service.description || 'Advanced eye treatment using latest technology and techniques.' }}</p>
              <Link 
                :href="`/services#${service.slug}`"
                class="inline-flex items-center gap-1 text-teal-400 font-medium text-sm group-hover:gap-2 transition-all"
              >
                Learn More
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-10">
          <Link href="/services" class="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all">
            View All Services
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 bg-slate-900">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">Why Choose Us</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Excellence in Eye Care</h2>
            <p class="text-slate-400 mb-8 text-lg">We combine cutting-edge technology with compassionate care to deliver the best possible outcomes for our patients.</p>
            
            <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">Advanced Technology</h3>
                  <p class="text-slate-400 text-sm">State-of-the-art diagnostic and surgical equipment for precise treatment.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">Expert Team</h3>
                  <p class="text-slate-400 text-sm">Highly experienced ophthalmologists with years of expertise.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">Patient-Centric Care</h3>
                  <p class="text-slate-400 text-sm">Personalized treatment plans tailored to your specific needs.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
            <div class="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div class="grid grid-cols-2 gap-6">
                <div class="text-center p-4">
                  <p class="text-4xl font-bold text-teal-400 mb-2">15+</p>
                  <p class="text-slate-400 text-sm">Years of Excellence</p>
                </div>
                <div class="text-center p-4">
                  <p class="text-4xl font-bold text-cyan-400 mb-2">50K+</p>
                  <p class="text-slate-400 text-sm">Patients Treated</p>
                </div>
                <div class="text-center p-4">
                  <p class="text-4xl font-bold text-blue-400 mb-2">10+</p>
                  <p class="text-slate-400 text-sm">Expert Doctors</p>
                </div>
                <div class="text-center p-4">
                  <p class="text-4xl font-bold text-purple-400 mb-2">99%</p>
                  <p class="text-slate-400 text-sm">Success Rate</p>
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-white/10">
                <div class="flex items-center justify-center gap-4">
                  <div class="flex -space-x-2">
                    <div class="w-10 h-10 rounded-full bg-teal-500 border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold">A</div>
                    <div class="w-10 h-10 rounded-full bg-cyan-500 border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold">B</div>
                    <div class="w-10 h-10 rounded-full bg-blue-500 border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold">C</div>
                  </div>
                  <p class="text-slate-300 text-sm">Trusted by 50,000+ patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section v-if="hospital.lat && hospital.lng" class="py-20 bg-slate-950">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-4">Our Location</span>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Find Us Here</h2>
          <p class="text-slate-400 max-w-2xl mx-auto">Visit us at our convenient location. We're here to provide you with the best eye care services.</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <!-- Map Container -->
          <div class="lg:col-span-2">
            <div class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div id="map-view" class="h-96 w-full"></div>
            </div>
          </div>
          
          <!-- Location Info -->
          <div class="space-y-6">
            <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 class="text-xl font-bold text-white mb-4">Contact & Directions</h3>
              
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p class="text-white font-semibold">Address</p>
                    <p class="text-slate-400 text-sm">{{ hospital.address || 'Address not available' }}</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p class="text-white font-semibold">Phone</p>
                    <a :href="`tel:${hospital.phone}`" class="text-teal-400 hover:text-teal-300 text-sm">{{ hospital.phone }}</a>
                  </div>
                </div>
                
                <div v-if="hospital.working_hours_weekday" class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p class="text-white font-semibold">Working Hours</p>
                    <p class="text-slate-400 text-sm">{{ hospital.working_hours_weekday }}</p>
                    <p v-if="hospital.working_hours_saturday" class="text-slate-500 text-sm">Sat: {{ hospital.working_hours_saturday }}</p>
                    <p v-if="hospital.working_hours_sunday" class="text-slate-500 text-sm">Sun: {{ hospital.working_hours_sunday }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Get Directions Button -->
              <div class="mt-6 pt-6 border-t border-white/10">
                <a 
                  :href="directionsUrl" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  Get Directions
                </a>
                <p class="text-slate-500 text-xs text-center mt-2">Opens in Google Maps, Apple Maps, or navigation app</p>
              </div>
            </div>
            
            <!-- Emergency Contact -->
            <div v-if="hospital.emergency_contact" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div>
                  <p class="text-white font-semibold">Emergency</p>
                  <p class="text-red-400 text-sm">24/7 Available</p>
                </div>
              </div>
              <a 
                :href="`tel:${hospital.emergency_contact}`" 
                class="block w-full text-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                Call: {{ hospital.emergency_contact }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-teal-900/50 to-cyan-900/50"></div>
      <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/20 blur-[100px]"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-500/20 blur-[100px]"></div>
      
      <div class="relative container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready for Better Vision?</h2>
        <p class="text-slate-300 mb-8 max-w-2xl mx-auto">Schedule your free consultation today and take the first step towards clearer vision.</p>
        <div class="flex flex-wrap justify-center gap-4">
          <Link 
            href="/book-appointment" 
            class="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
          >
            Book Free Consultation
          </Link>
          <a 
            :href="`tel:${hospital.phone}`"
            class="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Call Now: {{ hospital.phone }}
          </a>
        </div>
      </div>
    </section>

    <!-- Other Locations -->
    <section v-if="hospitals && hospitals.length > 1" class="py-12 bg-slate-900 border-t border-white/5">
      <div class="container mx-auto px-4 text-center">
        <p class="text-slate-500 text-sm mb-4">Other Hospital Locations</p>
        <div class="flex flex-wrap justify-center gap-3">
          <Link
            v-for="h in hospitals"
            :key="h.id"
            :href="h.slug ? `/${h.slug}` : '/'"
            class="px-4 py-2 bg-white/5 border border-white/10 text-slate-300 rounded-lg hover:text-white hover:bg-white/10 hover:border-teal-500/30 transition-all text-sm"
          >
            {{ h.name }}
          </Link>
        </div>
      </div>
    </section>
  </HospitalLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HospitalLayout from '@/Layouts/HospitalLayout.vue'
import { Link } from '@inertiajs/vue3'
import L from 'leaflet'

const props = defineProps({
  hospital: Object,
  services: Array,
  doctors: Array,
  hospitals: Array,
  seo: Object
})

const currentSlide = ref(0)

const serviceIcons = ['👁️', '🔬', '⚕️', '💉', '🩺', '🔎']

const nextSlide = () => {
  const total = serviceIcons.length
  currentSlide.value = (currentSlide.value + 1) % total
}

const prevSlide = () => {
  const total = serviceIcons.length
  currentSlide.value = (currentSlide.value - 1 + total) % total
}

// Compute directions URL for navigation
const directionsUrl = computed(() => {
  const hospital = props.hospital
  if (hospital && hospital.lat && hospital.lng) {
    const address = hospital.address ? encodeURIComponent(hospital.address) : ''
    return `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}${address ? '&destination_address_id=' + address : ''}`
  }
  return '#'
})

// Initialize map on mount
let map = null
let marker = null

const initMap = () => {
  const hospital = props.hospital
  if (!hospital || !hospital.lat || !hospital.lng) return
  
  const mapContainer = document.getElementById('map-view')
  if (!mapContainer || map) return
  
  // Initialize Leaflet map
  map = L.map(mapContainer).setView([hospital.lat, hospital.lng], 15)
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)
  
  // Add marker
  marker = L.marker([hospital.lat, hospital.lng]).addTo(map)
  
  // Add popup with hospital name
  if (hospital.name) {
    marker.bindPopup(`<strong>${hospital.name}</strong>`).openPopup()
  }
}

// Fix Leaflet default marker icon
const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

onMounted(() => {
  fixLeafletIcons()
  
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    initMap()
  }, 100)
})

// Auto-advance slides
if (typeof window !== 'undefined') {
  setInterval(() => {
    nextSlide()
  }, 5000)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
