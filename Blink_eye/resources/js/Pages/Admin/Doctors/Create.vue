<template>
  <AdminLayout>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">Add New Doctor</h2>
        <Link :href="route('admin.doctors.index')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Back to Doctors</Link>
      </div>
    </template>

    <div class="p-6">
      <div class="max-w-2xl mx-auto bg-white shadow-sm sm:rounded-lg">
        <div class="p-6">
          <form @submit.prevent="submit">
            <div class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name <span class="text-red-500">*</span></label>
                <input id="name" v-model="form.name" type="text" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                <div v-if="form.errors.name" class="mt-2 text-sm text-red-600">{{ form.errors.name }}</div>
              </div>

              <div>
                <label for="specialty" class="block text-sm font-medium text-gray-700">Specialty</label>
                <input id="specialty" v-model="form.specialty" type="text" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                <div v-if="form.errors.specialty" class="mt-2 text-sm text-red-600">{{ form.errors.specialty }}</div>
              </div>

              <div>
                <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
                <textarea id="bio" v-model="form.bio" rows="4" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                <div v-if="form.errors.bio" class="mt-2 text-sm text-red-600">{{ form.errors.bio }}</div>
              </div>

              <div>
                <label for="hospital_id" class="block text-sm font-medium text-gray-700">Hospital <span class="text-red-500">*</span></label>
                <select id="hospital_id" v-model="form.hospital_id" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="">Select a hospital</option>
                  <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.id">{{ hospital.name }}</option>
                </select>
                <div v-if="form.errors.hospital_id" class="mt-2 text-sm text-red-600">{{ form.errors.hospital_id }}</div>
              </div>

              <div>
                <label for="image" class="block text-sm font-medium text-gray-700">Profile Image</label>
                <input id="image" type="file" accept="image/*" class="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" @change="handleImageChange" />
                <div v-if="form.errors.image" class="mt-2 text-sm text-red-600">{{ form.errors.image }}</div>
              </div>

              <div v-if="imagePreview" class="mt-4">
                <img :src="imagePreview" alt="Preview" class="object-cover h-40 w-40 rounded-lg" />
              </div>

              <div>
                <label class="flex items-center">
                  <input v-model="form.is_active" type="checkbox" class="text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span class="ml-2 text-sm text-gray-700">Active</span>
                </label>
              </div>
            </div>

            <div class="flex items-center justify-end pt-6 space-x-3">
              <Link :href="route('admin.doctors.index')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
              <button type="submit" :disabled="form.processing" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50">
                Save Doctor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Link, useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'

defineProps({
  hospitals: { type: Array, required: true },
})

const imagePreview = ref(null)

const form = useForm({
  name: '',
  specialty: '',
  bio: '',
  hospital_id: '',
  is_active: true,
  image: null,
})

const handleImageChange = (event) => {
  const file = event.target.files[0]
  form.image = file || null
  imagePreview.value = file ? URL.createObjectURL(file) : null
}

const submit = () => {
  form.post(route('admin.doctors.store'))
}
</script>
