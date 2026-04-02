<script setup>
import { ref, computed, onMounted } from 'vue';
import { Head, useForm, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import WysiwygEditor from '@/Components/UI/WysiwygEditor.vue';
import { SparklesIcon, CodeBracketIcon, TrashIcon, PhotoIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    template: {
        type: Object,
        default: null,
    },
    groups: {
        type: Array,
        default: () => [],
    },
    hospitals: {
        type: Array,
        default: () => [],
    },
    locations: {
        type: Array,
        default: () => [],
    }
});

const isEditing = computed(() => !!props.template);

const form = useForm({
    title_template: props.template?.title_template || '',
    slug_template: props.template?.slug_template || '',
    content_template: props.template?.content_template || '',
    is_active: props.template?.is_active ?? true,
    hospital_id: props.template?.tenant_id || '',
    group_ids: props.template?.groups ? props.template.groups.map(g => g.id) : [],
});

const editorRef = ref(null);
const selectedShortcode = ref('');

// Unified shortcode dictionary
const shortcodes = [
    // Location shortcodes
    { label: 'Location Name (e.g., Mumbai)', value: '{{location.name}}' },
    { label: 'Location Slug', value: '{{location.slug}}' },
    { label: 'Location Type (e.g., City, Village)', value: '{{location.type}}' },
    { label: 'Location Pincode', value: '{{location.pincode}}' },
    { label: 'Location Latitude', value: '{{location.lat}}' },
    { label: 'Location Longitude', value: '{{location.lng}}' },
    { label: 'Parent Location Name', value: '{{location.parent_name}}' },
    { label: 'Parent Location Type', value: '{{location.parent_type}}' },
    { label: 'State Name', value: '{{location.state_name}}' },
    { label: 'Nearby Cities', value: '{{location.nearby_cities}}' },
    { label: 'Nearby Villages', value: '{{location.nearby_villages}}' },
    { label: 'All Nearby Locations', value: '{{location.nearby_locations}}' },
    { label: 'Location Phrase: in {city}', value: '{{location.in_area}}' },
    { label: 'Location Phrase: near {city}', value: '{{location.near_area}}' },
    
    // Hospital shortcodes
    { label: 'Hospital Name', value: '{{hospital.name}}' },
    { label: 'Hospital Phone', value: '{{hospital.phone}}' },
    { label: 'Hospital Address', value: '{{hospital.address}}' },
    { label: 'Hospital Email', value: '{{hospital.email}}' },
    { label: 'Hospital Emergency Contact', value: '{{hospital.emergency_contact}}' },
    { label: 'Hospital WhatsApp', value: '{{hospital.whatsapp}}' },
    { label: 'Hospital City/Location', value: '{{hospital.city}}' },
    { label: 'Hospital Google Maps URL', value: '{{hospital.map_url}}' },
    { label: 'Hospital Working Hours', value: '{{hospital.working_hours}}' },
    { label: 'Hospital 24/7 Status', value: '{{hospital.is_24_7}}' },
    { label: 'Distance from User', value: '{{hospital.distance}}' },
    
    // Disease & Service shortcodes
    { label: 'Disease Name', value: '{{disease.name}}' },
    { label: 'Service Name', value: '{{service.name}}' },
    
    // Date shortcodes
    { label: 'Current Year', value: '{{date.year}}' },
    { label: 'Current Month', value: '{{date.month}}' },
    { label: 'Current Day', value: '{{date.day}}' },
];

const injectSelectedShortcode = () => {
    if (!selectedShortcode.value || !editorRef.value) return;
    
    editorRef.value.injectShortcode(selectedShortcode.value);
    selectedShortcode.value = ''; // Reset dropdown
};

const updateSlug = () => {
    if (!form.slug_template && form.title_template) {
        form.slug_template = form.title_template.toLowerCase().replace(/[^a-z0-9{}]+/g, '-').replace(/(^-|-$)+/g, '');
    }
};

const generatedMatrix = computed(() => {
    if (!form.title_template || !form.slug_template || form.group_ids.length === 0 || !form.hospital_id) return [];
    
    let simulatedPages = [];
    const selectedHospital = props.hospitals.find(h => h.id === form.hospital_id);
    const hostLocation = props.locations.find(l => l.id === selectedHospital?.location_id);
    
    form.group_ids.forEach(groupId => {
        const group = props.groups.find(g => g.id === groupId);
        if (!group || !group.items) return;
        
        group.items.forEach(pivot => {
            let slug = form.slug_template;
            let title = form.title_template;
            
            // Simulating basic Replacement Engine based on the poly items
            let baseName = '';
            if (pivot.item_type === 'App\\Models\\Location') {
                const loc = props.locations.find(l => l.id === pivot.item_id);
                baseName = loc ? loc.name : 'Unknown Location';
                slug = slug.replace(/{{location\.slug}}/g, baseName.toLowerCase().replace(/\s+/g, '-'));
                title = title.replace(/{{location\.name}}/g, baseName);
            } else if (pivot.item_type === 'App\\Models\\Service') {
                baseName = 'Service Widget'; // Dummy Service name for preview
                slug = slug.replace(/{{service\.slug}}/g, baseName.toLowerCase().replace(/\s+/g, '-'));
                title = title.replace(/{{service\.name}}/g, baseName);
                
                // For Service type tags, we also often auto-inject the HOST location.
                if (hostLocation) {
                    slug = slug.replace(/{{location\.slug}}/g, hostLocation.name.toLowerCase().replace(/\s+/g, '-'));
                    title = title.replace(/{{location\.name}}/g, hostLocation.name);
                }
            } else if (pivot.item_type === 'App\\Models\\Disease') {
                 baseName = 'Disease Widget'; // Dummy Disease name
                 slug = slug.replace(/{{disease\.slug}}/g, baseName.toLowerCase().replace(/\s+/g, '-'));
                 title = title.replace(/{{disease\.name}}/g, baseName);
                 if (hostLocation) {
                     slug = slug.replace(/{{location\.slug}}/g, hostLocation.name.toLowerCase().replace(/\s+/g, '-'));
                     title = title.replace(/{{location\.name}}/g, hostLocation.name);
                 }
             } else if (pivot.item_type === 'App\\Models\\Doctor') {
                 baseName = 'Doctor Widget'; // Dummy Doctor name
                 slug = slug.replace(/{{doctor\.slug}}/g, baseName.toLowerCase().replace(/\s+/g, '-'));
                 title = title.replace(/{{doctor\.name}}/g, baseName);
                 if (hostLocation) {
                     slug = slug.replace(/{{location\.slug}}/g, hostLocation.name.toLowerCase().replace(/\s+/g, '-'));
                     title = title.replace(/{{location\.name}}/g, hostLocation.name);
                 }
             }
            
            // Clean uncompiled shortcodes for preview
            slug = slug.replace(/{{[^}]+}}/g, 'dynamic-field');
            title = title.replace(/{{[^}]+}}/g, 'DynamicField');

            simulatedPages.push({
                title: title,
                url: `/${selectedHospital ? selectedHospital.domain : 'domain.com'}/${slug}`,
                groupName: group.name
            });
        });
    });
    
    return simulatedPages;
});

const submit = () => {
    if (isEditing.value) {
        form.put(route('admin.templates.update', props.template.id));
    } else {
        form.post(route('admin.templates.store'));
    }
};

/* ── Gallery (only when editing) ── */
const galleryForm = useForm({ images: [] });

const handleGalleryFiles = (e) => {
    galleryForm.images = Array.from(e.target.files);
};

const uploadGallery = () => {
    if (!isEditing.value) return;
    galleryForm.post(route('admin.templates.gallery.store', props.template.id), {
        preserveScroll: true,
        onSuccess: () => {
            galleryForm.reset();
        },
    });
};

const deleteGalleryImage = (galleryId) => {
    if (!isEditing.value) return;
    if (confirm('Delete this gallery image?')) {
        router.delete(route('admin.templates.gallery.destroy', [props.template.id, galleryId]), {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <Head :title="isEditing ? 'Edit Template' : 'New Template'" />

    <AdminLayout>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">{{ isEditing ? 'Edit Blog Template' : 'Create Blog Template' }}</h1>
                <p class="mt-2 text-sm text-gray-700">Write dynamic SEO content. Use shortcodes to automatically generate unique permutations across Taxonomy Groups.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-x-3">
                <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-medical-blue-600 shadow-sm ring-1 ring-inset ring-medical-blue-300 hover:bg-blue-50 transition-colors tooltip-trigger" title="Future capability: Generate content via AI" onclick="alert('AI Generation will be connected in Phase 4. Stay tuned!')">
                    <SparklesIcon class="-ml-0.5 mr-1.5 h-4 w-4 text-medical-blue-500" aria-hidden="true" />
                    Auto Generate with AI
                </button>
                <Link
                    :href="route('admin.templates.index')"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Back to Templates
                </Link>
            </div>
        </div>

        <div class="mt-8 flex flex-col lg:flex-row gap-8">
            <!-- Main Editor Area -->
            <div class="flex-1">
                <form id="template-builder" @submit.prevent="submit" class="space-y-6">
                    <div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6 space-y-6">
                        <!-- Title -->
                        <div>
                            <label for="title_template" class="block text-sm font-medium leading-6 text-gray-900">SEO Title Template <span class="text-red-500">*</span></label>
                            <div class="mt-2 text-sm text-gray-500 mb-1" v-pre>e.g. "Best {{service.name}} in {{location.name}} - Blink Eye Hospitals"</div>
                            <input type="text" id="title_template" v-model="form.title_template" @blur="updateSlug" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required />
                            <div v-if="form.errors.title_template" class="mt-2 text-sm text-red-600">{{ form.errors.title_template }}</div>
                        </div>

                        <!-- Slug -->
                        <div>
                            <label for="slug_template" class="block text-sm font-medium leading-6 text-gray-900">URL Slug Pattern <span class="text-red-500">*</span></label>
                            <div class="mt-2 text-sm text-gray-500 mb-1" v-pre>e.g. "best-{{service.slug}}-in-{{location.slug}}"</div>
                            <input type="text" id="slug_template" v-model="form.slug_template" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6 text-medical-blue-600 font-mono" required />
                            <div v-if="form.errors.slug_template" class="mt-2 text-sm text-red-600">{{ form.errors.slug_template }}</div>
                        </div>

                        <!-- Content Builder -->
                        <div>
                            <div class="flex items-center justify-between mb-2 mt-4">
                                <label class="block text-sm font-medium leading-6 text-gray-900">Dynamic Content Body <span class="text-red-500">*</span></label>
                                
                                <!-- Shortcode Injector Tool -->
                                <div class="flex items-center space-x-2 bg-blue-50 p-1.5 rounded-md border border-blue-200">
                                    <SparklesIcon class="h-4 w-4 text-blue-600" />
                                    <select v-model="selectedShortcode" class="block w-48 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-xs text-xs">
                                        <option value="" disabled>Insert Dynamic Variable...</option>
                                        <option v-for="sc in shortcodes" :key="sc.value" :value="sc.value">
                                            {{ sc.label }}
                                        </option>
                                    </select>
                                    <button type="button" @click="injectSelectedShortcode" :disabled="!selectedShortcode" class="rounded bg-medical-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600 disabled:opacity-50">
                                        Insert
                                    </button>
                                </div>
                            </div>
                            
                            <WysiwygEditor ref="editorRef" v-model="form.content_template" />
                            <div v-if="form.errors.content_template" class="mt-2 text-sm text-red-600">{{ form.errors.content_template }}</div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Sidebar Configuration -->
            <div class="lg:w-80 flex-shrink-0 space-y-6">
                <!-- Status Box / Assignment -->
                <div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 border-b border-gray-200 pb-2 mb-4">Ownership</h3>
                    
                    <div class="mb-5" v-if="$page.props.auth.user.role === 'super_admin'">
                        <label for="hospital_id" class="block text-sm font-medium leading-6 text-gray-900">Hospital Branch</label>
                        <select id="hospital_id" v-model="form.hospital_id" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-medical-blue-600 sm:text-sm sm:leading-6">
                            <option value="">-- Apply Globally --</option>
                            <option v-for="h in hospitals" :key="h.id" :value="h.id">{{ h.name }}</option>
                        </select>
                        <p class="mt-2 text-xs text-gray-500">Attach this content funnel to a specific branch instead of all generic hospitals.</p>
                    </div>

                    <div class="relative flex items-start border-t border-gray-100 pt-4">
                        <div class="flex h-6 items-center">
                            <input id="is_active" v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600" />
                        </div>
                        <div class="ml-3 text-sm leading-6">
                            <label for="is_active" class="font-medium text-gray-900">Active Template</label>
                        </div>
                    </div>
                    
                    <button type="submit" form="template-builder" :disabled="form.processing" class="mt-6 w-full inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600">
                        {{ isEditing ? 'Update Template' : 'Save & Publish Template' }}
                    </button>
                </div>

                <!-- Grouping Assignment -->
                <div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 border-b border-gray-200 pb-2 mb-4">Target Audience Groups</h3>
                    <p class="text-xs text-gray-500 mb-4">Select the Taxonomy Groups this template should generate pages for. <br/><br/>If assigned to "Tier 1 Cities", and that group has 5 cities, 5 unique pages will be generated.</p>
                    
                    <div class="space-y-4 max-h-96 overflow-y-auto">
                        <div v-if="groups.length === 0" class="text-sm text-gray-500 italic">No taxonomy groups available. Create a Group first.</div>
                        
                        <div v-for="group in groups" :key="group.id" class="relative flex items-start">
                            <div class="flex h-6 items-center">
                                <input :id="`group-${group.id}`" v-model="form.group_ids" :value="group.id" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600" />
                            </div>
                            <div class="ml-3 text-sm leading-6">
                                <label :for="`group-${group.id}`" class="font-medium text-gray-900">{{ group.name }}</label>
                                <span class="ml-1 inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600">{{ group.type }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="form.errors.group_ids" class="mt-2 text-sm text-red-600">{{ form.errors.group_ids }}</div>
                </div>
            </div>
        </div>
        
        <!-- Generated Matrix Overlay Preview -->
        <div class="mt-8 max-w-7xl bg-white shadow sm:rounded-lg overflow-hidden" v-if="generatedMatrix.length > 0">
            <div class="bg-gradient-to-r from-medical-blue-50 to-indigo-50 px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 class="text-base font-semibold leading-6 text-medical-blue-900 flex items-center">
                    <SparklesIcon class="h-5 w-5 mr-2 text-medical-blue-600"/> 
                    SEO Generation Matrix Simulator
                </h3>
                <p class="mt-1 text-sm text-medical-blue-700">This template will automatically stamp out {{ generatedMatrix.length }} unique landing pages upon saving.</p>
            </div>
            <div class="px-4 py-5 sm:p-6 bg-slate-50 relative overflow-y-auto max-h-[400px]">
                <ul role="list" class="divide-y divide-gray-200 bg-white rounded-md border border-gray-200">
                    <li v-for="(page, idx) in generatedMatrix" :key="idx" class="flex items-center justify-between gap-x-6 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div class="min-w-0">
                            <div class="flex items-start gap-x-3">
                                <p class="text-sm font-semibold leading-6 text-gray-900 truncate">{{ page.title }}</p>
                            </div>
                            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                <p class="truncate font-mono bg-gray-100 rounded px-1">{{ page.url }}</p>
                            </div>
                        </div>
                        <div class="flex flex-none items-center gap-x-4">
                            <span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                                {{ page.groupName }}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════ -->
        <!-- Gallery Management Section (edit mode only)       -->
        <!-- ══════════════════════════════════════════════════ -->
        <div v-if="isEditing" class="mt-10 max-w-4xl">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h2 class="text-base font-semibold leading-6 text-gray-900">
                        <PhotoIcon class="h-5 w-5 inline-block mr-1 -mt-0.5 text-medical-blue-600" />
                        Blog Template Gallery
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">Upload images for this blog template (infographics, illustrations, banners, etc.)</p>
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
            <div v-if="template.galleries && template.galleries.length" class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <div v-for="img in template.galleries" :key="img.id" class="group relative rounded-lg overflow-hidden shadow-sm border border-gray-200">
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
                <p class="mt-1 text-sm text-gray-500">Upload images to use within this blog template.</p>
            </div>
        </div>
        
    </AdminLayout>
</template>
