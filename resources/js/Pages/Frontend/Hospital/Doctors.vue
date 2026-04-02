<template>
  <HospitalLayout :hospital="hospital" :hospitals="hospitals">
    <!-- Header with Background -->
    <section class="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-2">Our Doctors</h1>
        <p class="text-xl opacity-90">Meet our expert ophthalmologists at {{ hospital.name }}</p>
      </div>
    </section>

    <!-- Breadcrumb -->
    <div class="bg-white border-b shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <nav class="text-sm flex items-center gap-2">
          <Link href="/" class="text-blue-600 hover:underline">Home</Link>
          <span class="text-gray-400">/</span>
          <span class="text-gray-600">Our Doctors</span>
        </nav>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <section class="py-8 bg-gray-50 border-b">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1 relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search doctors by name or specialty..."
              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg class="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <!-- Filter by Specialty -->
          <select 
            v-model="selectedSpecialty"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">All Specialties</option>
            <option v-for="specialty in uniqueSpecialties" :key="specialty" :value="specialty">{{ specialty }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Doctors Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Results count -->
        <div class="mb-6 text-gray-600">
          Showing {{ filteredDoctors.length }} doctor{{ filteredDoctors.length !== 1 ? 's' : '' }}
        </div>

        <div v-if="filteredDoctors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="doctor in filteredDoctors" 
            :key="doctor.id"
            class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden group"
          >
            <!-- Doctor Image -->
            <div class="relative h-72 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
              <div v-if="!doctor.image" class="w-full h-full flex items-center justify-center">
                <span class="text-8xl">👨‍⚕️</span>
              </div>
              <img 
                v-else 
                :src="doctor.image" 
                :alt="doctor.name"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <!-- Availability badge -->
              <div class="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                Available
              </div>
            </div>
            
            <!-- Doctor Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold mb-1 text-gray-900">{{ doctor.name }}</h3>
              <p class="text-blue-600 font-medium mb-2">{{ doctor.specialty }}</p>
              
              <!-- Experience & Qualifications -->
              <div class="space-y-2 mb-4">
                <div v-if="doctor.experience" class="flex items-center gap-2 text-gray-600 text-sm">
                  <span>💼</span>
                  <span>{{ doctor.experience }} years experience</span>
                </div>
                <div v-if="doctor.qualifications" class="flex items-center gap-2 text-gray-600 text-sm">
                  <span>🎓</span>
                  <span>{{ doctor.qualifications }}</span>
                </div>
              </div>

              <!-- Bio -->
              <p v-if="doctor.bio" class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ doctor.bio.substring(0, 150) }}{{ doctor.bio.length > 150 ? '...' : '' }}
              </p>

              <!-- Actions -->
              <div class="flex gap-3">
                <Link 
                  :href="`/book-appointment?doctor=${doctor.id}`"
                  class="flex-1 text-center bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
                <button 
                  @click="showDoctorDetails(doctor)"
                  class="px-4 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold mb-2">No Doctors Found</h3>
          <p class="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            @click="searchQuery = ''; selectedSpecialty = ''"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Doctor Detail Modal -->
    <div v-if="selectedDoctor" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="selectedDoctor = null">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="relative">
          <button 
            @click="selectedDoctor = null"
            class="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
          >
            <span>✕</span>
          </button>
        </div>
        
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Doctor Image -->
            <div class="w-full md:w-48 flex-shrink-0">
              <div class="w-48 h-48 rounded-xl overflow-hidden bg-gray-100 mx-auto">
                <img 
                  v-if="selectedDoctor.image" 
                  :src="selectedDoctor.image" 
                  :alt="selectedDoctor.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-6xl">👨‍⚕️</div>
              </div>
            </div>
            
            <!-- Doctor Details -->
            <div class="flex-1">
              <h3 class="text-2xl font-bold mb-1">{{ selectedDoctor.name }}</h3>
              <p class="text-blue-600 font-medium text-lg mb-3">{{ selectedDoctor.specialty }}</p>
              
              <div class="space-y-2 mb-4">
                <div v-if="selectedDoctor.experience" class="flex items-center gap-2 text-gray-600">
                  <span>💼</span>
                  <span>{{ selectedDoctor.experience }} years experience</span>
                </div>
                <div v-if="selectedDoctor.qualifications" class="flex items-center gap-2 text-gray-600">
                  <span>🎓</span>
                  <span>{{ selectedDoctor.qualifications }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bio -->
          <div v-if="selectedDoctor.bio" class="mt-6 pt-6 border-t">
            <h4 class="font-semibold mb-2">About</h4>
            <p class="text-gray-600">{{ selectedDoctor.bio }}</p>
          </div>

          <!-- Book Appointment Button -->
          <div class="mt-6 pt-6 border-t">
            <Link 
              :href="`/book-appointment?doctor=${selectedDoctor.id}`"
              class="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Book Appointment with {{ selectedDoctor.name }}
            </Link>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <section class="py-12 bg-blue-600">
      <div class="container mx-auto px-4 text-center text-white">
        <h2 class="text-2xl font-bold mb-4">Need Help Choosing a Doctor?</h2>
        <p class="mb-6 opacity-90">Our team is here to help you find the right specialist for your needs.</p>
        <Link 
          href="/contact" 
          class="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Contact Us
        </Link>
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
import { ref, computed } from 'vue'
import HospitalLayout from '@/Layouts/HospitalLayout.vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
  hospital: Object,
  doctors: Array,
  hospitals: Array,
  seo: Object
})

const searchQuery = ref('')
const selectedSpecialty = ref('')
const selectedDoctor = ref(null)

// Get unique specialties from doctors
const uniqueSpecialties = computed(() => {
  const specialties = new Set()
  props.doctors.forEach(doctor => {
    if (doctor.specialty) {
      specialties.add(doctor.specialty)
    }
  })
  return Array.from(specialties)
})

// Filter doctors based on search and specialty
const filteredDoctors = computed(() => {
  return props.doctors.filter(doctor => {
    const matchesSearch = !searchQuery.value || 
      doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesSpecialty = !selectedSpecialty.value || 
      doctor.specialty === selectedSpecialty.value
    
    return matchesSearch && matchesSpecialty
  })
})

const showDoctorDetails = (doctor) => {
  selectedDoctor.value = doctor
}
</script>
