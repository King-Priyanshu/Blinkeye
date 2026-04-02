<template>
  <HospitalLayout :hospital="hospital" :hospitals="hospitals">
    <!-- Emergency Contact Banner -->
    <div v-if="hospital.emergency_contact" class="bg-red-600 text-white py-3 px-4">
      <div class="container mx-auto flex flex-wrap items-center justify-center gap-4">
        <span class="font-bold">🚨 Emergency:</span>
        <a :href="`tel:${hospital.emergency_contact}`" class="font-semibold hover:underline">
          {{ hospital.emergency_contact }}
        </a>
        <span v-if="hospital.is_24_7_emergency" class="px-3 py-1 bg-white/20 rounded-full text-sm">
          24/7 Available
        </span>
      </div>
    </div>

    <!-- Header -->
    <section class="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
        <p class="text-xl opacity-90">Get in touch with {{ hospital.name }}</p>
      </div>
    </section>

    <!-- Breadcrumb -->
    <div class="bg-white border-b shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <nav class="text-sm flex items-center gap-2">
          <Link href="/" class="text-blue-600 hover:underline">Home</Link>
          <span class="text-gray-400">/</span>
          <span class="text-gray-600">Contact Us</span>
        </nav>
      </div>
    </div>

    <!-- Contact Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Contact Information -->
          <div>
            <h2 class="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <!-- Hospital Info Cards -->
            <div class="space-y-4 mb-8">
              <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border-l-4 border-blue-500">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Address</h3>
                    <p class="text-gray-600">{{ hospital.address || 'Address not available' }}</p>
                    <p class="text-gray-600">{{ hospital.location?.name }}, India</p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border-l-4 border-blue-500">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Phone</h3>
                    <a :href="`tel:${hospital.phone}`" class="text-gray-600 hover:text-blue-600">{{ hospital.phone }}</a>
                    <p v-if="hospital.emergency_contact" class="text-red-600 text-sm mt-1">
                      Emergency: {{ hospital.emergency_contact }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border-l-4 border-blue-500">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Email</h3>
                    <a :href="`mailto:${hospital.email}`" class="text-gray-600 hover:text-blue-600">{{ hospital.email }}</a>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border-l-4 border-blue-500">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-xl">🕐</span>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Working Hours</h3>
                    <p class="text-gray-600">Mon - Sat: {{ hospital.working_hours_weekday || '9:00 AM - 6:00 PM' }}</p>
                    <p v-if="hospital.working_hours_saturday" class="text-gray-600">Saturday: {{ hospital.working_hours_saturday }}</p>
                    <p v-if="hospital.working_hours_sunday" class="text-gray-600">Sunday: {{ hospital.working_hours_sunday }}</p>
                    <p v-if="hospital.is_24_7_emergency" class="text-red-600 font-semibold mt-2">🚨 24/7 Emergency Available</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h3 class="font-semibold mb-4">Find Us on Map</h3>
              <div class="h-64 bg-gray-100 rounded-lg overflow-hidden">
                <!-- OpenStreetMap Embed (No API key required) -->
                <iframe 
                  v-if="hospital.lat && hospital.lng"
                  width="100%" 
                  height="100%" 
                  style="border:0" 
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  :src="`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(hospital.lng)-0.01}%2C${parseFloat(hospital.lat)-0.01}%2C${parseFloat(hospital.lng)+0.01}%2C${parseFloat(hospital.lat)+0.01}&layer=mapnik&marker=${hospital.lat}%2C${hospital.lng}`"
                >
                </iframe>
                <!-- Fallback to Google Maps web URL -->
                <div v-else-if="hospital.address" class="w-full h-full flex items-center justify-center">
                  <a 
                    :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`"
                    target="_blank"
                    class="text-center p-4 hover:bg-gray-50 transition"
                  >
                    <span class="text-4xl block mb-2">🗺️</span>
                    <p class="text-gray-600">Click to open in Google Maps</p>
                  </a>
                </div>
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <div class="text-center">
                    <span class="text-4xl block mb-2">🗺️</span>
                    <p>Map not available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <div class="bg-white p-8 rounded-xl shadow-lg">
              <h2 class="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <div v-if="$page.props.flash?.success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                {{ $page.props.flash.success }}
              </div>

              <form @submit.prevent="submitForm" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input 
                    v-model="form.name"
                    type="text" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                  <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea 
                    v-model="form.message"
                    rows="5" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                  <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
                </div>

                <button 
                  type="submit" 
                  :disabled="loading"
                  class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {{ loading ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </div>

            <!-- Quick Actions -->
            <div class="mt-6 bg-blue-50 p-6 rounded-xl">
              <h3 class="font-semibold mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <Link 
                  href="/book-appointment" 
                  class="flex items-center gap-3 bg-white p-4 rounded-lg hover:shadow-md transition"
                >
                  <span class="text-2xl">📅</span>
                  <div>
                    <span class="font-medium block">Book an Appointment</span>
                    <span class="text-sm text-gray-500">Schedule a consultation</span>
                  </div>
                </Link>
                <a 
                  v-if="hospital.whatsapp"
                  :href="`https://wa.me/${hospital.whatsapp}`"
                  target="_blank"
                  class="flex items-center gap-3 bg-white p-4 rounded-lg hover:shadow-md transition"
                >
                  <span class="text-2xl">💬</span>
                  <div>
                    <span class="font-medium block">Chat on WhatsApp</span>
                    <span class="text-sm text-gray-500">Quick responses</span>
                  </div>
                </a>
                <a 
                  v-if="hospital.emergency_contact"
                  :href="`tel:${hospital.emergency_contact}`"
                  class="flex items-center gap-3 bg-red-50 p-4 rounded-lg hover:shadow-md transition border border-red-200"
                >
                  <span class="text-2xl">🚨</span>
                  <div>
                    <span class="font-medium block text-red-700">Emergency Contact</span>
                    <span class="text-sm text-red-600">{{ hospital.emergency_contact }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Locations -->
    <section class="py-8 bg-gray-100">
      <div class="container mx-auto px-4 text-center">
        <h3 class="font-semibold mb-4">Other Hospital Locations</h3>
        <div class="flex flex-wrap justify-center gap-3">
          <Link 
            v-for="h in hospitals" 
            :key="h.id"
            :href="h.slug ? `/${h.slug}` : '/'"
            class="bg-white px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:shadow-sm transition"
          >
            {{ h.name }}
          </Link>
        </div>
      </div>
    </section>
  </HospitalLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import HospitalLayout from '@/Layouts/HospitalLayout.vue'
import { Link } from '@inertiajs/vue3'

defineProps({
  hospital: Object,
  hospitals: Array,
  seo: Object
})

const loading = ref(false)
const errors = ref({})

const form = useForm({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  loading.value = true
  errors.value = {}
  
  form.post('/contact', {
    onSuccess: () => {
      loading.value = false
      form.reset()
    },
    onError: (e) => {
      loading.value = false
      errors.value = e
    }
  })
}
</script>
