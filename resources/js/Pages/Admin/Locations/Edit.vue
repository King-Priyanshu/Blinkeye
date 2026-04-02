<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { TrashIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';

const props = defineProps({
    location: Object,
    parents: Array,
});

const form = useForm({
    name: props.location.name,
    slug: props.location.slug,
    type: props.location.type,
    parent_id: props.location.parent_id || '',
    lat: props.location.lat || '',
    lng: props.location.lng || '',
    pincode: props.location.pincode || '',
    is_active: props.location.is_active,
    image: null,
    _method: 'PUT',
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
    form.post(route('admin.locations.update', props.location.id));
};

const destroy = () => {
    if (confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
        form.delete(route('admin.locations.destroy', props.location.id));
    }
}
</script>

<template>
    <Head title="Edit Location" />

    <AdminLayout>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Edit Location: {{ location.name }}</h1>
                <p class="mt-2 text-sm text-gray-700">Update geographic data and taxonomy hierarchy.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center space-x-4">
                <Link
                    :href="route('admin.locations.index')"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Back
                </Link>
                <button
                    @click="destroy"
                    class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                    <TrashIcon class="h-4 w-4 mr-1" />
                    Delete
                </button>
            </div>
        </div>

        <div class="mt-8 max-w-2xl bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div class="mt-2">
                                <input type="text" id="name" v-model="form.name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required />
                            </div>
                            <div v-if="form.errors.name" class="mt-2 text-sm text-red-600">{{ form.errors.name }}</div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="slug" class="block text-sm font-medium leading-6 text-gray-900">Slug</label>
                            <div class="mt-2">
                                <input type="text" id="slug" v-model="form.slug" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required />
                            </div>
                            <div v-if="form.errors.slug" class="mt-2 text-sm text-red-600">{{ form.errors.slug }}</div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
                            <div class="mt-2">
                                <select id="type" v-model="form.type" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="state">State</option>
                                    <option value="district">District</option>
                                    <option value="city">City</option>
                                    <option value="village">Village</option>
                                </select>
                            </div>
                            <div v-if="form.errors.type" class="mt-2 text-sm text-red-600">{{ form.errors.type }}</div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="parent_id" class="block text-sm font-medium leading-6 text-gray-900">Parent Location</label>
                            <div class="mt-2">
                                <select id="parent_id" v-model="form.parent_id" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="">-- None --</option>
                                    <option v-for="parent in parents" :key="parent.id" :value="parent.id">
                                        {{ parent.name }} ({{ parent.type }})
                                    </option>
                                </select>
                            </div>
                            <div v-if="form.errors.parent_id" class="mt-2 text-sm text-red-600">{{ form.errors.parent_id }}</div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="lat" class="block text-sm font-medium leading-6 text-gray-900">Latitude</label>
                            <div class="mt-2">
                                <input type="text" id="lat" v-model="form.lat" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div v-if="form.errors.lat" class="mt-2 text-sm text-red-600">{{ form.errors.lat }}</div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="lng" class="block text-sm font-medium leading-6 text-gray-900">Longitude</label>
                            <div class="mt-2">
                                <input type="text" id="lng" v-model="form.lng" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div v-if="form.errors.lng" class="mt-2 text-sm text-red-600">{{ form.errors.lng }}</div>
                        </div>
                        
                        <div class="sm:col-span-6">
                            <label for="image" class="block text-sm font-medium leading-6 text-gray-900">Featured Image</label>
                            <div class="mt-2 flex items-center gap-x-4">
                                <template v-if="previewImage">
                                    <img :src="previewImage" alt="Preview" class="h-16 w-16 object-cover rounded-md shadow-sm" />
                                </template>
                                <template v-else-if="location.image">
                                    <img :src="`/storage/${location.image}`" alt="Current Image" class="h-16 w-16 object-cover rounded-md shadow-sm" />
                                </template>
                                <div class="flex-1">
                                    <input type="file" id="image" @change="handleImageChange" accept="image/*" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-medical-blue-50 file:text-medical-blue-700 hover:file:bg-medical-blue-100" />
                                </div>
                            </div>
                            <div v-if="form.errors.image" class="mt-2 text-sm text-red-600">{{ form.errors.image }}</div>
                        </div>
                        <div class="sm:col-span-6">
                            <div class="relative flex items-start">
                                <div class="flex h-6 items-center">
                                    <input id="is_active" v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600" />
                                </div>
                                <div class="ml-3 text-sm leading-6">
                                    <label for="is_active" class="font-medium text-gray-900">Active</label>
                                    <p class="text-gray-500">Should this location be available in the system?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6">
                        <Link :href="route('admin.locations.index')" class="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                        <button type="submit" :disabled="form.processing" class="inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600">
                            Update Location
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>
