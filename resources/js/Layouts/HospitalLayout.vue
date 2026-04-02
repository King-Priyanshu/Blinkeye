<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Emergency Contact Banner -->
    <div v-if="hospital.emergency_contact" class="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium">
      <span class="mr-2">🚨</span>
      Emergency Contact: {{ hospital.emergency_contact }}
      <span v-if="hospital.is_24_7_emergency" class="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs">24/7 Available</span>
    </div>

    <!-- Main Navigation Header -->
    <header 
      :class="[
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-sm'
      ]"
    >
      <div class="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <!-- Logo -->
        <Link href="/" class="flex items-center gap-2 md:gap-3">
          <div v-if="hospital.image" class="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shadow-md">
            <img :src="hospital.image" :alt="hospital.name" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span class="text-white text-xl md:text-2xl">👁️</span>
          </div>
          <div class="hidden sm:block">
            <span class="text-lg md:text-xl font-bold text-blue-900">{{ hospital.name }}</span>
          </div>
        </Link>
        
        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
          <Link href="/" :class="['font-medium transition', isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600']">Home</Link>
          <Link href="/services" :class="['font-medium transition', isActive('/services') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600']">Services</Link>
          <Link href="/doctors" :class="['font-medium transition', isActive('/doctors') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600']">Doctors</Link>
          <Link href="/contact" :class="['font-medium transition', isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600']">Contact</Link>
          <Link 
            href="/book-appointment" 
            class="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            Book Appointment
          </Link>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen" 
          class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t shadow-lg">
        <div class="container mx-auto px-4 py-4 space-y-3">
          <Link 
            href="/" 
            @click="mobileMenuOpen = false"
            class="block py-3 px-4 rounded-lg hover:bg-blue-50 transition text-gray-700 font-medium"
            :class="{ 'bg-blue-50 text-blue-600': isActive('/') }"
          >
            🏠 Home
          </Link>
          <Link 
            href="/services" 
            @click="mobileMenuOpen = false"
            class="block py-3 px-4 rounded-lg hover:bg-blue-50 transition text-gray-700 font-medium"
            :class="{ 'bg-blue-50 text-blue-600': isActive('/services') }"
          >
            🏥 Services
          </Link>
          <Link 
            href="/doctors" 
            @click="mobileMenuOpen = false"
            class="block py-3 px-4 rounded-lg hover:bg-blue-50 transition text-gray-700 font-medium"
            :class="{ 'bg-blue-50 text-blue-600': isActive('/doctors') }"
          >
            👨‍⚕️ Doctors
          </Link>
          <Link 
            href="/contact" 
            @click="mobileMenuOpen = false"
            class="block py-3 px-4 rounded-lg hover:bg-blue-50 transition text-gray-700 font-medium"
            :class="{ 'bg-blue-50 text-blue-600': isActive('/contact') }"
          >
            📞 Contact
          </Link>
          <Link 
            href="/book-appointment" 
            @click="mobileMenuOpen = false"
            class="block py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition"
          >
            📅 Book Appointment
          </Link>
        </div>
      </div>
    </header>

    <!-- Page Content Slot -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Shared Footer -->
    <footer class="bg-gray-900 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <!-- About & Logo -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div v-if="hospital.image" class="w-12 h-12 rounded-lg overflow-hidden">
                <img :src="hospital.image" :alt="hospital.name" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-2xl">👁️</span>
              </div>
              <h3 class="text-xl font-bold">{{ hospital.name }}</h3>
            </div>
            <p class="text-gray-400 mb-6 max-w-md">
              {{ hospital.short_description || 'Expert eye care with advanced technology and experienced ophthalmologists.' }}
            </p>
            <!-- Social Media Links -->
            <div class="flex gap-3">
              <a v-if="hospital.facebook" :href="hospital.facebook" target="_blank" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
              </a>
              <a v-if="hospital.instagram" :href="hospital.instagram" target="_blank" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84a6.16,6.16,0,1,0,6.16,6.16A6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm6.4-7.86a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.4,8.14Z"/></svg>
              </a>
              <a v-if="hospital.twitter" :href="hospital.twitter" target="_blank" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.52,3.37,5,5,0,0,0,.11,1.12A13.98,13.98,0,0,1,1.64,3.15,4.92,4.92,0,0,0,3.2,9.72,4.86,4.86,0,0,1,.96,9.11v.06a4.93,4.93,0,0,0,3.95,4.83,4.86,4.86,0,0,1-2.22.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21A13.9,13.9,0,0,0,21.56,7.68c0-.21,0-.42,0-.63A10,10,0,0,0,24,4.59Z"/></svg>
              </a>
              <a v-if="hospital.youtube" :href="hospital.youtube" target="_blank" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.56,31.56,0,0,0,0,12a31.56,31.56,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14C4.46,20.5,12,20.5,12,20.5s7.54,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.56,31.56,0,0,0,24,12,31.56,31.56,0,0,0,23.5,6.19ZM9.55,15.57V8.43L16,12Z"/></svg>
              </a>
              <a v-if="hospital.linkedin" :href="hospital.linkedin" target="_blank" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5,2h-17A1.5,1.5,0,0,0,2,3.5v17A1.5,1.5,0,0,0,3.5,22h17a1.5,1.5,0,0,0,1.5-1.5v-17A1.5,1.5,0,0,0,20.5,2ZM8,19H5v-9h3ZM6.5,8.25A1.75,1.75,0,1,1,8.25,6.5,1.75,1.75,0,0,1,6.5,8.25ZM19,19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74,1.74,0,0,0,13,14.19a.66.66,0,0,0,0,.14V19h-3v-9h2.9v1.3a3.11,3.11,0,0,1,2.7-1.4c1.55,0,3.36.86,3.36,3.66Z"/></svg>
              </a>
              <a v-if="hospital.whatsapp" :href="`https://wa.me/${hospital.whatsapp}`" target="_blank" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5,2c-2.05,0-4.1,1.27-5.38,3.42L10.8,8.85l-3.22.72c-.78.18-1.18.27-1.47.92-.3.65-.17,1.32.4,1.85l1.93,1.88c.55-.28,1.13-.45,1.75-.5l.62-3.23h3.57v4.17c-.18.15-.32.35-.4.55l-1.47,4.63c-.35,1.1-.05,2.28.8,3.08,1.05,1,2.68,1.1,3.95.48l2.03-1c.87-.43,1.52-1.15,1.85-2.02.33-.87.35-1.82.07-2.7l-1.12-3.35c.12-.25.18-.52.18-.8v-3.3c0-1.45-1.15-2.63-2.58-2.63h-.45ZM12,22c-1.1,0-2-.9-2-2s.9-2,2-2,2,.9,2,2-.9,2-2,2Z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-bold mb-4 text-lg">Quick Links</h4>
            <ul class="space-y-3 text-gray-400">
              <li><Link href="/" class="hover:text-white transition">Home</Link></li>
              <li><Link href="/services" class="hover:text-white transition">Our Services</Link></li>
              <li><Link href="/doctors" class="hover:text-white transition">Our Doctors</Link></li>
              <li><Link href="/book-appointment" class="hover:text-white transition">Book Appointment</Link></li>
              <li><Link href="/contact" class="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="font-bold mb-4 text-lg">Contact Info</h4>
            <ul class="space-y-4 text-gray-400 text-sm">
              <li class="flex items-start gap-3">
                <span class="mt-0.5">📍</span>
                <div>
                  <p>{{ hospital.address }}</p>
                  <p>{{ hospital.location?.name }}, India</p>
                </div>
              </li>
              <li class="flex items-center gap-3">
                <span>📞</span>
                <a :href="`tel:${hospital.phone}`" class="hover:text-white transition">{{ hospital.phone }}</a>
              </li>
              <li class="flex items-center gap-3">
                <span>✉️</span>
                <a :href="`mailto:${hospital.email}`" class="hover:text-white transition">{{ hospital.email }}</a>
              </li>
              <li v-if="hospital.whatsapp" class="flex items-center gap-3">
                <span>💬</span>
                <a :href="`https://wa.me/${hospital.whatsapp}`" target="_blank" class="hover:text-white transition">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Map Link -->
        <div v-if="hospital.lat && hospital.lng" class="mt-10 p-4 bg-gray-800 rounded-xl">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🗺️</span>
              <div>
                <p class="font-medium">Find us on map</p>
                <p class="text-sm text-gray-400">Visit our hospital location</p>
              </div>
            </div>
            <a 
              :href="`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`" 
              target="_blank"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {{ new Date().getFullYear() }} {{ hospital.name }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'

defineProps({
  hospital: Object,
  hospitals: Array
})

const page = usePage()
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Check if current route matches
const isActive = (path) => {
  return page.url === path
}

// Handle scroll effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
