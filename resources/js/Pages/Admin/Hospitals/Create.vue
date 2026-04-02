<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import MapPicker from '@/Components/MapPicker.vue';
import GeographicRegionSelector from '@/Components/GeographicRegionSelector.vue';
import { ref } from 'vue';

const props = defineProps({
    locations: Array,
    allServices: Array,
    allDiseases: Array,
    allGroups: Array,
    allBlogs: Array,
    allDoctors: Array,
});

const form = useForm({
    name: '', domain: '', subdomain: '', custom_domain: '', template_id: 1, email: '', phone: '', location_id: null, lat: '', lng: '', is_active: true, image: null,
    primary_color: '#0ea5e9', secondary_color: '#38bdf8', background_image: null, map_url: '', map_zoom: 12,
    address: '', emergency_contact: '', whatsapp: '',
    working_hours_weekday: '', working_hours_saturday: '', working_hours_sunday: '', is_24_7_emergency: false,
    facebook: '', instagram: '', twitter: '', youtube: '', linkedin: '',
    short_description: '', about_us: '',
    established_year: '', number_of_beds: '', number_of_doctors: '', amenities: [], accreditations: '', languages: [],
    meta_title: '', meta_description: '', meta_keywords: '', og_image: '', canonical_url: '',
    service_ids: [], disease_ids: [], group_ids: [], blog_ids: [], doctor_ids: [],
});

const previewImage = ref(null);
const previewBackgroundImage = ref(null);
const mapCoordinates = ref({ lat: null, lng: null });

const presetPalettes = [
    { name: 'Medical Blue', primary: '#0ea5e9', secondary: '#38bdf8' },
    { name: 'Trust Navy', primary: '#1e3a8a', secondary: '#3b82f6' },
    { name: 'Health Emerald', primary: '#10b981', secondary: '#34d399' },
    { name: 'Calming Teal', primary: '#14b8a6', secondary: '#2dd4bf' },
    { name: 'Professional Slate', primary: '#475569', secondary: '#94a3b8' },
    { name: 'Gentle Purple', primary: '#8b5cf6', secondary: '#a78bfa' },
    { name: 'Vibrant Rose', primary: '#e11d48', secondary: '#fb7185' },
    { name: 'Amber Glow', primary: '#d97706', secondary: '#fbbf24' },
];

const applyPalette = (palette) => {
    form.primary_color = palette.primary;
    form.secondary_color = palette.secondary;
};

const handleImageChange = (e) => {
    const file = e.target.files[0]; form.image = file;
    previewImage.value = file ? URL.createObjectURL(file) : null;
};

const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0]; form.background_image = file;
    previewBackgroundImage.value = file ? URL.createObjectURL(file) : null;
};

const submit = () => {
    if (mapCoordinates.value.lat) form.lat = mapCoordinates.value.lat;
    if (mapCoordinates.value.lng) form.lng = mapCoordinates.value.lng;
    form.post(route('admin.hospitals.store'));
};
</script>

<template>
    <Head title="Create Premium Branch" />
    <AdminLayout>
        <!-- Page Header Header with Glassmorphism -->
        <div class="mb-8 relative rounded-2xl p-8 overflow-hidden shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700">
            <div class="absolute inset-0 bg-white/5 backdrop-blur-2xl"></div>
            <div class="relative z-10">
                <div class="flex items-center gap-2 mb-3">
                    <Link :href="route('admin.hospitals.index')" class="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                        <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg> Back to Directory
                    </Link>
                </div>
                <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-tight">Register New Branch</h1>
                <p class="mt-2 text-sm text-slate-400 font-medium">Create a stunning presence for the new hospital branch.</p>
            </div>
        </div>

        <!-- Form Wrapper -->
        <form @submit.prevent="submit" class="space-y-10">
            <!-- Basic Information Card -->
            <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div class="px-8 py-6 border-b border-slate-100 bg-white/50">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-blue-50 rounded-xl text-blue-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-slate-900 tracking-tight">Core Identity</h2>
                            <p class="text-sm text-slate-500 mt-1">Foundational details of the hospital branch.</p>
                        </div>
                    </div>
                </div>
                <div class="p-8">
                    <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
                        <!-- Branch Name -->
                        <div class="group">
                            <label class="block text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Branch Name</label>
                            <input type="text" v-model="form.name" class="mt-2 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" required placeholder="e.g. Blink Eye Central" />
                            <p v-if="form.errors.name" class="mt-2 text-sm font-medium text-red-500">{{ form.errors.name }}</p>
                        </div>
                        
                        <!-- Location -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-slate-700 mb-3">Geographic Region</label>
                            <GeographicRegionSelector
                                v-model="form.location_id"
                                :locations="locations"
                                :error="form.errors.location_id"
                            />
                        </div>

                        <!-- Phone -->
                        <div class="group">
                            <label class="block text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Primary Contact Number</label>
                            <input type="tel" v-model="form.phone" class="mt-2 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" placeholder="+91 XXXXX XXXXX" />
                            <p v-if="form.errors.phone" class="mt-2 text-sm font-medium text-red-500">{{ form.errors.phone }}</p>
                        </div>

                        <!-- Email -->
                        <div class="group">
                            <label class="block text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Official Email</label>
                            <input type="email" v-model="form.email" class="mt-2 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" placeholder="branch@blinkeye.in" />
                            <p v-if="form.errors.email" class="mt-2 text-sm font-medium text-red-500">{{ form.errors.email }}</p>
                        </div>

                        <!-- Routing Section -->
                        <div class="md:col-span-2 pt-6 border-t border-slate-100/50">
                            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Digital Routing</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="group">
                                    <label class="block text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">URL Slug / Path</label>
                                    <div class="mt-2 relative flex items-stretch">
                                        <input type="text" v-model="form.subdomain" class="block w-full rounded-l-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-0 transition-all font-medium" placeholder="cityname" />
                                        <div class="flex items-center rounded-r-xl border border-l-0 border-slate-200 bg-slate-50 px-4 text-slate-500 font-medium whitespace-nowrap"> (ex: amritsar)</div>
                                    </div>
                                    <p v-if="form.errors.subdomain" class="mt-2 text-sm font-medium text-red-500">{{ form.errors.subdomain }}</p>
                                </div>
                                <div class="group">
                                    <label class="block text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Custom Domain (Optional)</label>
                                    <input type="text" v-model="form.custom_domain" class="mt-2 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" placeholder="www.specialty-clinic.com" />
                                </div>
                            </div>
                        </div>

                        <!-- Template -->
                        <div class="md:col-span-2 group pt-6 border-t border-slate-100/50">
                            <label class="block text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Web Engine Theme Template</label>
                            <select v-model="form.template_id" class="mt-2 block w-full max-w-md rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" required>
                                <option :value="1">🚀 Template 1: Premium Modern Clinic</option>
                                <option :value="2">👁️ Template 2: Elite Eye Care Layout</option>
                                <option :value="3">✨ Template 3: Clean & Minimalist</option>
                                <option :value="4">🏢 Template 4: Corporate Hospital Style</option>
                                <option :value="5">👶 Template 5: Friendly / Pediatric Focus</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Media & Appearance Card -->
            <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div class="px-8 py-6 border-b border-slate-100 bg-white/50">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-purple-50 rounded-xl text-purple-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-slate-900 tracking-tight">Visual Elements</h2>
                            <p class="text-sm text-slate-500 mt-1">Photos, brand colors, and map placements.</p>
                        </div>
                    </div>
                </div>
                <div class="p-8">
                    <div class="grid grid-cols-1 gap-y-10 md:grid-cols-2 gap-x-12">
                        <!-- Colors -->
                        <div class="space-y-6">
                            <!-- Preset Palettes -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-700">Quick Themes (Curated Palettes)</label>
                                <div class="mt-3 flex flex-wrap gap-3">
                                    <button 
                                        type="button" 
                                        v-for="palette in presetPalettes" 
                                        :key="palette.name"
                                        @click="applyPalette(palette)"
                                        class="group relative flex items-center justify-center p-1 rounded-xl border-2 transition-all hover:-translate-y-0.5"
                                        :class="(form.primary_color === palette.primary && form.secondary_color === palette.secondary) ? 'border-slate-400 scale-105 shadow-md' : 'border-transparent hover:border-slate-200'"
                                        :title="palette.name"
                                    >
                                        <div class="w-10 h-10 rounded-lg flex overflow-hidden border border-slate-200/50 shadow-sm">
                                            <div class="w-1/2 h-full" :style="{ backgroundColor: palette.primary }"></div>
                                            <div class="w-1/2 h-full" :style="{ backgroundColor: palette.secondary }"></div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <!-- Custom Colors -->
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-slate-700">Primary Color</label>
                                    <div class="mt-2 flex items-center gap-3">
                                        <input type="color" v-model="form.primary_color" class="h-12 w-16 rounded-xl cursor-pointer p-0.5 ring-1 ring-slate-200 focus:outline-none focus:ring-blue-500 transition-all border-none" />
                                        <input type="text" v-model="form.primary_color" class="block w-full rounded-xl border-slate-200 bg-white/50 px-3 py-2 font-mono text-sm font-medium text-slate-900 uppercase focus:border-blue-500 max-w-[100px]" />
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-slate-700">Secondary Color</label>
                                    <div class="mt-2 flex items-center gap-3">
                                        <input type="color" v-model="form.secondary_color" class="h-12 w-16 rounded-xl cursor-pointer p-0.5 ring-1 ring-slate-200 focus:outline-none focus:ring-blue-500 transition-all border-none" />
                                        <input type="text" v-model="form.secondary_color" class="block w-full rounded-xl border-slate-200 bg-white/50 px-3 py-2 font-mono text-sm font-medium text-slate-900 uppercase focus:border-blue-500 max-w-[100px]" />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Color Live Preview -->
                            <div class="mt-6 p-6 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white shadow-inner">
                                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Live UI Preview</p>
                                <div class="flex flex-wrap items-center gap-4">
                                    <button type="button" class="px-5 py-2.5 rounded-xl text-white font-semibold transition-transform hover:-translate-y-0.5 shadow-lg" :style="{ backgroundColor: form.primary_color, boxShadow: `0 10px 15px -3px ${form.primary_color}40` }">Primary Action</button>
                                    <button type="button" class="px-5 py-2.5 rounded-xl text-white font-semibold transition-transform hover:-translate-y-0.5 shadow-lg" :style="{ backgroundColor: form.secondary_color, boxShadow: `0 10px 15px -3px ${form.secondary_color}40` }">Secondary Action</button>
                                    <span class="px-4 py-1.5 rounded-full text-sm font-bold border" :style="{ backgroundColor: form.primary_color + '15', color: form.primary_color, borderColor: form.primary_color + '30' }">Featured Tag</span>
                                </div>
                            </div>
                        </div>

                        <!-- Images -->
                        <div class="space-y-8">
                            <div class="group">
                                <label class="block text-sm font-semibold text-slate-700">Profile Photo (Thumbnail)</label>
                                <div class="mt-3 flex items-start gap-5">
                                    <div class="h-24 w-24 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative">
                                        <img v-if="previewImage" :src="previewImage" class="absolute inset-0 w-full h-full object-cover" />
                                        <svg v-else class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    </div>
                                    <div class="flex-1 pt-2">
                                        <input type="file" @change="handleImageChange" accept="image/*" class="block w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all cursor-pointer" />
                                        <p class="text-xs text-slate-400 mt-2">Recommended: 800x800px square.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="group">
                                <label class="block text-sm font-semibold text-slate-700">Hero Landscape Banner</label>
                                <div class="mt-3 flex flex-col gap-4">
                                    <div class="h-32 w-full shrink-0 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative shadow-inner">
                                        <img v-if="previewBackgroundImage" :src="previewBackgroundImage" class="absolute inset-0 w-full h-full object-cover" />
                                        <svg v-else class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" /></svg>
                                    </div>
                                    <input type="file" @change="handleBackgroundImageChange" accept="image/*" class="block w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-50 file:text-purple-600 hover:file:bg-purple-100 transition-all cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        <!-- Full Map Area -->
                        <div class="md:col-span-2 pt-8 border-t border-slate-100/50">
                            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Interactive Map Coordinates</h3>
                            <div class="rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 relative group">
                                <div class="absolute inset-0 bg-blue-500/5 z-0 pointer-events-none group-hover:bg-blue-500/0 transition-all"></div>
                                <MapPicker v-model="mapCoordinates" :zoom="form.map_zoom || 14" height="400px" class="relative z-10" />
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label class="block text-sm font-semibold text-slate-700">Google Map Embed HTML/URL</label>
                                    <input type="url" v-model="form.map_url" class="mt-2 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 font-medium" placeholder="https://www.google.com/maps/embed?..." />
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-slate-700">Default Zoom Level</label>
                                    <input type="number" v-model="form.map_zoom" min="1" max="20" class="mt-2 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-purple-500 font-medium" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Operations Details Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <!-- Contact Card -->
                <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-8">
                    <h3 class="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> Contact & Address
                    </h3>
                    <div class="space-y-5">
                        <div class="group">
                            <label class="block text-sm font-semibold text-slate-700">Full Physical Address</label>
                            <textarea v-model="form.address" rows="3" class="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 font-medium"></textarea>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-5">
                            <div class="flex-1 group">
                                <label class="block text-sm font-semibold text-slate-700">Emergency Line</label>
                                <input type="text" v-model="form.emergency_contact" class="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 font-medium text-red-600 font-bold" />
                            </div>
                            <div class="flex-1 group">
                                <label class="block text-sm font-semibold text-slate-700">WhatsApp Helpdesk</label>
                                <input type="text" v-model="form.whatsapp" class="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Hours Card -->
                <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-8">
                    <h3 class="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                        <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Operational Hours
                    </h3>
                    <div class="space-y-4">
                        <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                            <span class="w-24 font-bold text-slate-500 text-sm">Weekdays</span>
                            <input type="text" v-model="form.working_hours_weekday" placeholder="9:00 AM - 6:00 PM" class="block flex-1 rounded-lg border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-medium" />
                        </div>
                        <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                            <span class="w-24 font-bold text-slate-500 text-sm">Saturday</span>
                            <input type="text" v-model="form.working_hours_saturday" placeholder="9:00 AM - 2:00 PM" class="block flex-1 rounded-lg border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-medium" />
                        </div>
                        <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                            <span class="w-24 font-bold text-slate-500 text-sm">Sunday</span>
                            <input type="text" v-model="form.working_hours_sunday" placeholder="Closed" class="block flex-1 rounded-lg border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-medium" />
                        </div>
                        <div class="pt-2 pl-2">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="form.is_24_7_emergency" class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span class="ml-3 text-sm font-bold text-slate-700">Offers 24/7 Emergency Care</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Deep Associations Grid (Doctors, Services, etc.) -->
            <div class="space-y-0 relative">
                <!-- Assignment Header -->
                <div class="text-center pb-8 pt-4">
                    <h2 class="text-2xl font-black text-slate-900 drop-shadow-sm">Branch Associations</h2>
                    <p class="text-slate-500 mt-2 font-medium">Link specialized entities directly to this location.</p>
                </div>

                <div class="grid grid-cols-1 gap-8">
                    
                    <!-- DOCTORS SELECTION -->
                    <div class="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-xl rounded-3xl shadow-[0_-4px_30px_rgb(0,0,0,0.02),0_10px_40px_rgb(0,0,0,0.06)] border border-blue-100 p-8 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div class="relative z-10 flex items-center justify-between mb-8">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <div>
                                    <h3 class="text-xl font-extrabold text-slate-900">Medical Specialists roster</h3>
                                    <p class="text-sm text-slate-500 mt-1 font-medium">Select expert doctors who practice at this specific branch.</p>
                                </div>
                            </div>
                            <div class="bg-white/80 px-4 py-2 rounded-full border border-blue-100 shadow-sm text-sm font-bold text-blue-600">
                                {{ form.doctor_ids.length }} Selected
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                            <label v-for="doc in allDoctors" :key="doc.id" class="group relative flex flex-col p-5 cursor-pointer rounded-2xl border-2 transition-all duration-200 overflow-hidden bg-white hover:shadow-xl hover:shadow-blue-500/10" :class="form.doctor_ids.includes(doc.id) ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-100 hover:border-blue-300'">
                                <div class="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" :class="{'opacity-100': form.doctor_ids.includes(doc.id)}"></div>
                                <input type="checkbox" :value="doc.id" v-model="form.doctor_ids" class="absolute top-4 right-4 h-5 w-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-600 shadow-sm z-10 transition-transform" :class="{'scale-110': form.doctor_ids.includes(doc.id)}" />
                                
                                <div class="relative z-10 flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center text-slate-400 font-bold border-2 border-white shadow-sm ring-1 ring-slate-100">
                                         <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-bold text-slate-900 truncate">{{ doc.name }}</p>
                                        <p class="text-xs font-semibold text-blue-600 truncate mt-0.5">{{ doc.specialty || 'General Specialist' }}</p>
                                    </div>
                                </div>
                            </label>
                            <div v-if="allDoctors.length===0" class="col-span-full py-10 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                                <p class="text-slate-500 font-medium">No active doctors found in the system to assign.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Layout Grid for smaller selectors -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        <!-- SERVICES -->
                        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                                <span class="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mr-3"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></span> Operational Services
                            </h3>
                            <div class="flex flex-wrap gap-3">
                                <label v-for="srv in allServices" :key="srv.id" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 cursor-pointer transition-all font-medium text-sm" :class="form.service_ids.includes(srv.id)?'bg-teal-50 border-teal-500 text-teal-900':'bg-white border-slate-200 text-slate-600 hover:border-teal-300'">
                                    <input type="checkbox" :value="srv.id" v-model="form.service_ids" class="sr-only" />
                                    {{ srv.name }}
                                </label>
                            </div>
                        </div>

                        <!-- DISEASES -->
                        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                                <span class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mr-3"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-14v5l3.5 3.5"/></svg></span> Supported Diseases
                            </h3>
                            <div class="flex flex-wrap gap-3">
                                <label v-for="dis in allDiseases" :key="dis.id" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 cursor-pointer transition-all font-medium text-sm" :class="form.disease_ids.includes(dis.id)?'bg-rose-50 border-rose-500 text-rose-900':'bg-white border-slate-200 text-slate-600 hover:border-rose-300'">
                                    <input type="checkbox" :value="dis.id" v-model="form.disease_ids" class="sr-only" />
                                    {{ dis.name }}
                                </label>
                            </div>
                        </div>

                        <!-- GROUPS -->
                        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                                <span class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span> Sector Divisions
                            </h3>
                            <div class="flex flex-wrap gap-3">
                                <label v-for="grp in allGroups" :key="grp.id" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 cursor-pointer transition-all font-medium text-sm" :class="form.group_ids.includes(grp.id)?'bg-indigo-50 border-indigo-500 text-indigo-900':'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'">
                                    <input type="checkbox" :value="grp.id" v-model="form.group_ids" class="sr-only" />
                                    {{ grp.name }}
                                </label>
                            </div>
                        </div>

                        <!-- BLOGS -->
                        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                                <span class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mr-3"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13ZM4 19.5v-13"/></svg></span> Knowledge Base / Blogs
                            </h3>
                            <div class="flex flex-wrap gap-3">
                                <label v-for="blg in allBlogs" :key="blg.id" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 cursor-pointer transition-all font-medium text-sm" :class="form.blog_ids.includes(blg.id)?'bg-amber-50 border-amber-500 text-amber-900':'bg-white border-slate-200 text-slate-600 hover:border-amber-300'">
                                    <input type="checkbox" :value="blg.id" v-model="form.blog_ids" class="sr-only" />
                                    {{ blg.title }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit Section -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 pb-16 px-4">
                <label class="relative inline-flex items-center cursor-pointer p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-slate-200 transition-colors">
                    <input type="checkbox" v-model="form.is_active" class="sr-only peer">
                    <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-[1.75rem] peer-checked:after:border-white after:content-[''] after:absolute after:top-[18px] after:left-[18px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500 shadow-inner"></div>
                    <span class="ml-4 text-base font-extrabold text-slate-900 tracking-tight">Active & Publised</span>
                </label>
                
                <div class="flex gap-4 w-full sm:w-auto">
                    <Link :href="route('admin.hospitals.index')" class="flex-1 sm:flex-none text-center px-8 py-4 rounded-2xl font-bold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all">Discard</Link>
                    <button type="submit" :disabled="form.processing" class="flex-1 sm:flex-none px-10 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all text-lg disabled:opacity-70">
                        Launch Branch Module
                    </button>
                </div>
            </div>
        </form>
    </AdminLayout>
</template>
