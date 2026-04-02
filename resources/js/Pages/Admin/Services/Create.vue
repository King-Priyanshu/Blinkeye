<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { ref } from 'vue';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/vue/24/outline';

const form = useForm({
    name: '',
    slug: '',
    description: '',
    is_active: true,
    image: null,
});

const previewImage = ref(null);

const handleImageChange = (e) => {
    const file = e.target.files[0];
    form.image = file;
    if (file) {
        previewImage.value = URL.createObjectURL(file);
    } else {
        previewImage.value = null;
    }
};

const submit = () => {
    form.post(route('admin.services.store'));
};

const updateSlug = () => {
    if (!form.slug && form.name) {
        form.slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
};
</script>

<template>
    <Head title="Add Hospital Service" />

    <AdminLayout>
        <!-- Gradient Header -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
            <div class="flex items-center gap-4">
                <Link :href="route('admin.services.index')" class="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                    <ArrowLeftIcon class="w-5 h-5" />
                </Link>
                <div>
                    <div class="flex items-center gap-2">
                        <PlusIcon class="w-6 h-6" />
                        <h1 class="text-xl font-bold">Add Clinical Service</h1>
                    </div>
                    <p class="text-purple-100 text-sm mt-1">Define a new treatment or procedure taxonomy context.</p>
                </div>
            </div>
        </div>

        <div class="mt-8 max-w-2xl bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-6">
                            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Service Name</label>
                            <div class="mt-2">
                                <input type="text" id="name" v-model="form.name" @blur="updateSlug" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" required placeholder="e.g. LASIK Eye Surgery" />
                            </div>
                            <div v-if="form.errors.name" class="mt-2 text-sm text-red-600">{{ form.errors.name }}</div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="slug" class="block text-sm font-medium leading-6 text-gray-900">URL Slug</label>
                            <div class="mt-2 text-sm text-gray-500 mb-1">How this appears in URLs: blinkeye.in/treatment/<span class="font-bold text-gray-900">{{ form.slug || 'slug' }}</span></div>
                            <div class="mt-1">
                                <input type="text" id="slug" v-model="form.slug" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" required />
                            </div>
                            <div v-if="form.errors.slug" class="mt-2 text-sm text-red-600">{{ form.errors.slug }}</div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Internal Description / Notes</label>
                            <div class="mt-2">
                                <textarea id="description" v-model="form.description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                            <div v-if="form.errors.description" class="mt-2 text-sm text-red-600">{{ form.errors.description }}</div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="image" class="block text-sm font-medium leading-6 text-gray-900">Featured Image</label>
                            <div class="mt-2 flex items-center gap-x-4">
                                <template v-if="previewImage">
                                    <img :src="previewImage" alt="Preview" class="h-16 w-16 object-cover rounded-md shadow-sm" />
                                </template>
                                <div class="flex-1">
                                    <input type="file" id="image" @change="handleImageChange" accept="image/*" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
                                </div>
                            </div>
                            <div v-if="form.errors.image" class="mt-2 text-sm text-red-600">{{ form.errors.image }}</div>
                        </div>
                        
                        <div class="sm:col-span-6">
                            <div class="relative flex items-start">
                                <div class="flex h-6 items-center">
                                    <input id="is_active" v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600" />
                                </div>
                                <div class="ml-3 text-sm leading-6">
                                    <label for="is_active" class="font-medium text-gray-900">Active</label>
                                    <p class="text-gray-500">Should this entity be available for blog templates and lead tracking?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6">
                        <Link :href="route('admin.services.index')" class="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                        <button type="submit" :disabled="form.processing" class="inline-flex justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                            Save Service
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>
