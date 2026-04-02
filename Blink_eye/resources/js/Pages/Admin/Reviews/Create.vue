<template>
  <AdminLayout>
    <div class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">Create Review</h1>
          <p class="mt-1 text-sm text-gray-600">Add a new patient review or testimonial</p>
        </div>

        <div class="bg-white shadow-sm rounded-lg p-6">
          <form @submit.prevent="submit">
            <div class="space-y-6">
              <div>
                <label for="author_name" class="block text-sm font-medium text-gray-700 mb-2">Author Name *</label>
                <input v-model="form.author_name" type="text" id="author_name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter author name" required />
                <div v-if="form.errors.author_name" class="mt-1 text-sm text-red-600">{{ form.errors.author_name }}</div>
              </div>

              <div>
                <label for="rating" class="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                <select v-model="form.rating" id="rating" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select rating</option>
                  <option :value="1">1 Star</option>
                  <option :value="2">2 Stars</option>
                  <option :value="3">3 Stars</option>
                  <option :value="4">4 Stars</option>
                  <option :value="5">5 Stars</option>
                </select>
                <div v-if="form.errors.rating" class="mt-1 text-sm text-red-600">{{ form.errors.rating }}</div>
              </div>

              <div>
                <label for="source" class="block text-sm font-medium text-gray-700 mb-2">Source *</label>
                <select v-model="form.source" id="source" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select source</option>
                  <option value="internal">Internal</option>
                  <option value="google">Google</option>
                  <option value="healthgrades">Healthgrades</option>
                  <option value="facebook">Facebook</option>
                  <option value="yelp">Yelp</option>
                </select>
                <div v-if="form.errors.source" class="mt-1 text-sm text-red-600">{{ form.errors.source }}</div>
              </div>

              <div>
                <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Review Content</label>
                <textarea v-model="form.content" id="content" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter review content"></textarea>
                <div v-if="form.errors.content" class="mt-1 text-sm text-red-600">{{ form.errors.content }}</div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end space-x-3">
              <Link :href="route('admin.reviews.index')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</Link>
              <button type="submit" :disabled="form.processing" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
                <span v-if="form.processing">Creating...</span>
                <span v-else>Create Review</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const form = useForm({
  author_name: '',
  rating: '',
  content: '',
  source: 'internal',
})

const submit = () => {
  form.post(route('admin.reviews.store'))
}
</script>
