<script setup>
import { Head, useForm, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { TrashIcon, PhotoIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';

const props = defineProps({
    service: Object,
});

const form = useForm({
    name: props.service.name,
    slug: props.service.slug,
    description: props.service.description || '',
    is_active: props.service.is_active,
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
    form.post(route('admin.services.update', props.service.id));
};

const destroy = () => {
    if (confirm('Are you absolutely sure you want to delete this specific taxonomy? Lead data routing relying on this ID might be affected.')) {
        form.delete(route('admin.services.destroy', props.service.id));
    } // TODO: prevent if relations exist
}

/* ── Gallery ── */
const galleryForm = useForm({ images: [] });

const handleGalleryFiles = (e) => {
    galleryForm.images = Array.from(e.target.files);
};

const uploadGallery = () => {
    galleryForm.post(route('admin.services.gallery.store', props.service.id), {
        preserveScroll: true,
        onSuccess: () => {
            galleryForm.reset();
        },
    });
};

const deleteGalleryImage = (galleryId) => {
    if (confirm('Delete this gallery image?')) {
        router.delete(route('admin.services.gallery.destroy', [props.service.id, galleryId]), {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <Head title="Edit Clinical Service" />

    <AdminLayout>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Edit Service: {{ service.name }}</h1>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center space-x-4">
                <Link
                    :href="route('admin.services.index')"
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
                        <div class="sm:col-span-6">
                            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Service Name</label>
                            <div class="mt-2">
                                <input type="text" id="name" v-model="form.name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required />
                            </div>
                            <div v-if="form.errors.name" class="mt-2 text-sm text-red-600">{{ form.errors.name }}</div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="slug" class="block text-sm font-medium leading-6 text-gray-900">URL Slug</label>
                            <div class="mt-2 text-sm text-gray-500 mb-1">How this appears in URLs: blinkeye.in/treatment/<span class="font-bold text-gray-900">{{ form.slug || 'slug' }}</span></div>
                            <div class="mt-1">
                                <input type="text" id="slug" v-model="form.slug" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required />
                            </div>
                            <div v-if="form.errors.slug" class="mt-2 text-sm text-red-600">{{ form.errors.slug }}</div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Internal Description / Notes</label>
                            <div class="mt-2">
                                <textarea id="description" v-model="form.description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                            <div v-if="form.errors.description" class="mt-2 text-sm text-red-600">{{ form.errors.description }}</div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="image" class="block text-sm font-medium leading-6 text-gray-900">Featured Image</label>
                            <div class="mt-2 flex items-center gap-x-4">
                                <template v-if="previewImage">
                                    <img :src="previewImage" alt="Preview" class="h-16 w-16 object-cover rounded-md shadow-sm" />
                                </template>
                                <template v-else-if="service.image">
                                    <img :src="`/storage/${service.image}`" alt="Current Image" class="h-16 w-16 object-cover rounded-md shadow-sm" />
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
                                    <p class="text-gray-500">Should this entity be available for blog templates and lead tracking?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6">
                        <Link :href="route('admin.services.index')" class="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                        <button type="submit" :disabled="form.processing" class="inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600">
                            Update Service
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════ -->
        <!-- Gallery Management Section                        -->
        <!-- ══════════════════════════════════════════════════ -->
        <div class="mt-10 max-w-4xl">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h2 class="text-base font-semibold leading-6 text-gray-900">
                        <PhotoIcon class="h-5 w-5 inline-block mr-1 -mt-0.5 text-medical-blue-600" />
                        Photo Gallery
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">Upload photos related to this service (procedure images, equipment, results, etc.)</p>
                </div>
            </div>

            <!-- Upload form -->
            <div class="mt-4 bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <form @submit.prevent="uploadGallery" class="flex items-end gap-4">
                        <div class="flex-1">
                            <label for="gallery_images" class="block text-sm font-medium leading-6 text-gray-900">Add Images</label>
                            <div class="mt-2">
                                <input type="file" id="gallery_images" @change="handleGalleryFiles" accept="image/*" multiple class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-medical-blue-50 file:text-medical-blue-700 hover:file:bg-medical-blue-100" />
                            </div>
                            <div v-if="galleryForm.errors.images" class="mt-2 text-sm text-red-600">{{ galleryForm.errors.images }}</div>
                        </div>
                        <button type="submit" :disabled="galleryForm.processing || !galleryForm.images.length" class="inline-flex justify-center rounded-md bg-medical-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                            Upload
                        </button>
                    </form>
                </div>
            </div>

            <!-- Gallery Grid -->
            <div v-if="service.galleries && service.galleries.length" class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <div v-for="img in service.galleries" :key="img.id" class="group relative rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img :src="`/storage/${img.image_path}`" :alt="img.caption || 'Gallery image'" class="w-full h-40 object-cover" />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button @click="deleteGalleryImage(img.id)" class="rounded-full bg-red-600 p-2 text-white hover:bg-red-500 shadow-lg">
                            <TrashIcon class="h-5 w-5" />
                        </button>
                    </div>
                    <div v-if="img.caption" class="p-2 text-xs text-gray-600 truncate">{{ img.caption }}</div>
                </div>
            </div>
            <div v-else class="mt-6 text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <PhotoIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-semibold text-gray-900">No photos yet</h3>
                <p class="mt-1 text-sm text-gray-500">Upload images to showcase this service.</p>
            </div>
        </div>
    </AdminLayout>
</template>
