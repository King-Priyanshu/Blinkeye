<template>
  <HospitalLayout :hospital="hospital" :hospitals="hospitals">
    <!-- Header -->
    <section class="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-2">Eye Treatments & Services</h1>
        <p class="text-xl opacity-90">Comprehensive eye care at {{ hospital.name }}</p>
      </div>
    </section>

    <!-- Breadcrumb -->
    <div class="bg-white border-b shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <nav class="text-sm flex items-center gap-2">
          <Link href="/" class="text-blue-600 hover:underline">Home</Link>
          <span class="text-gray-400">/</span>
          <span class="text-gray-600">Our Services</span>
        </nav>
      </div>
    </div>

    <!-- Services Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div v-if="services.length > 0" class="space-y-6">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            <div class="grid grid-cols-1 md:grid-cols-3">
              <!-- Service Image -->
              <div class="h-48 md:h-auto bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div v-if="!service.image" class="text-6xl">👁️</div>
                <img 
                  v-else 
                  :src="service.image" 
                  :alt="service.name"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Service Info -->
              <div class="p-6 md:col-span-2">
                <h3 class="text-2xl font-bold mb-2 text-blue-800">{{ service.name }}</h3>
                <p class="text-gray-600 mb-4">
                  {{ service.description }}
                </p>
                
                <!-- Expandable Content -->
                <div v-if="expandedService === service.id" class="mt-4 pt-4 border-t">
                  <h4 class="font-semibold mb-2">What to expect:</h4>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-green-500">✓</span>
                      <span>Comprehensive diagnosis and treatment</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-500">✓</span>
                      <span>State-of-the-art equipment and technology</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-500">✓</span>
                      <span>Expert care from experienced ophthalmologists</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-500">✓</span>
                      <span>Personalized treatment plan</span>
                    </li>
                  </ul>
                </div>

                <!-- Actions -->
                <div class="flex flex-wrap gap-3 mt-4">
                  <button 
                    @click="toggleExpand(service.id)"
                    class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition"
                  >
                    {{ expandedService === service.id ? 'Show Less' : 'Learn More' }}
                  </button>
                  <Link 
                    :href="`/book-appointment?service=${service.id}`"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Book Now
                  </Link>
                  <Link 
                    href="/contact" 
                    class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Services Message -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">👁️</div>
          <h3 class="text-xl font-semibold mb-2">Services Coming Soon</h3>
          <p class="text-gray-600">We offer a wide range of eye treatments. Contact us for more information.</p>
        </div>
      </div>
    </section>

    <!-- Why Choose Our Services -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4">Why Choose Our Eye Care Services?</h2>
        <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We are committed to providing the highest quality eye care
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">🔬</span>
            </div>
            <h3 class="font-semibold mb-2">Advanced Technology</h3>
            <p class="text-gray-600 text-sm">Latest diagnostic and treatment equipment</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">👨‍⚕️</span>
            </div>
            <h3 class="font-semibold mb-2">Expert Doctors</h3>
            <p class="text-gray-600 text-sm">Experienced ophthalmologists</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">💰</span>
            </div>
            <h3 class="font-semibold mb-2">Affordable Care</h3>
            <p class="text-gray-600 text-sm">Transparent pricing</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">❤️</span>
            </div>
            <h3 class="font-semibold mb-2">Patient Care</h3>
            <p class="text-gray-600 text-sm">Personalized attention</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-12 bg-blue-600">
      <div class="container mx-auto px-4 text-center text-white">
        <h2 class="text-2xl font-bold mb-4">Not Sure Which Treatment You Need?</h2>
        <p class="mb-6 opacity-90">Our doctors will guide you to the right treatment after a thorough examination.</p>
        <Link 
          href="/book-appointment" 
          class="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Free Consultation
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
import { ref } from 'vue'
import HospitalLayout from '@/Layouts/HospitalLayout.vue'
import { Link } from '@inertiajs/vue3'

defineProps({
  hospital: Object,
  services: Array,
  hospitals: Array,
  seo: Object
})

const expandedService = ref(null)

const toggleExpand = (serviceId) => {
  expandedService.value = expandedService.value === serviceId ? null : serviceId
}
</script>
