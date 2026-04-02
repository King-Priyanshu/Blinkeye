<script setup>
import { Head, Link, useForm, router, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
    canLogin: Boolean, canRegister: Boolean, laravelVersion: String, phpVersion: String,
    featuredBlogs: { type: Array, default: () => [] }, locations: { type: Array, default: () => [] },
    diseases: { type: Array, default: () => [] }, services: { type: Array, default: () => [] },
    hospitals: { type: Array, default: () => [] }, reviews: { type: Array, default: () => [] },
    siteSettings: { type: Object, default: () => ({}) },
});

const setting = (key, defaultVal) => props.siteSettings && props.siteSettings[key] !== undefined ? props.siteSettings[key] : defaultVal;

const searchQuery = ref(''); const searchResults = ref(null); const searchLoading = ref(false);
const showSearchDropdown = ref(false); let searchTimeout = null;

watch(searchQuery, (val) => {
    clearTimeout(searchTimeout);
    if (val.length < 2) { searchResults.value = null; showSearchDropdown.value = false; return; }
    searchLoading.value = true;
    searchTimeout = setTimeout(async () => {
        try { const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`); searchResults.value = await res.json(); showSearchDropdown.value = true; } catch (e) { console.error(e); }
        searchLoading.value = false;
    }, 300);
});

const goToPage = (url) => { showSearchDropdown.value = false; searchQuery.value = ''; router.visit(url); };
const selectedLocation = ref(''); const selectedHospital = ref('');

const filteredBlogs = computed(() => {
    let blogs = props.featuredBlogs;
    if (selectedLocation.value) { const loc = props.locations.find(l => l.id == selectedLocation.value); if (loc) blogs = blogs.filter(b => b.location === loc.name); }
    if (selectedHospital.value) { const hosp = props.hospitals.find(h => h.id == selectedHospital.value); if (hosp) { const locName = hosp.location ? hosp.location.name : null; blogs = blogs.filter(b => b.hospital_id == hosp.id || (!b.hospital_id && locName && b.location === locName)); } }
    return blogs;
});

const activeTab = ref('all');
const displayBlogs = computed(() => {
    if (activeTab.value === 'service') return filteredBlogs.value.filter(b => b.type === 'service');
    if (activeTab.value === 'disease') return filteredBlogs.value.filter(b => b.type === 'disease');
    return filteredBlogs.value;
});

const page = usePage();
const form = useForm({ name: '', phone: '', source_url: page.props.current_url || '' });
const submit = () => { form.post(route('admin.leads.store'), { preserveScroll: true, onSuccess: () => { form.reset('name', 'phone'); alert('Thank you! Our care team will contact you shortly.'); } }); };
const cityLocations = computed(() => props.locations.filter(l => l.type === 'city'));
const scrolled = ref(false);
onMounted(() => { window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 30; }); });
</script>

<template>
<Head title="Premium Eye Care — Blink Eye Hospitals" />

<component :is="'style'">
    :root {
        --primary: {{ setting('color_primary', '#0f2b46') }};
        --accent: {{ setting('color_accent', '#f97316') }};
        --accent-hover: {{ setting('color_accent_hover', '#ea580c') }};
    }
    .text-\[\#0f2b46\] { color: var(--primary) !important; }
    .bg-\[\#0f2b46\] { background-color: var(--primary) !important; }
    .bg-\[\#0f2b46\]\/90 { background-color: color-mix(in srgb, var(--primary) 90%, transparent) !important; }
    .from-\[\#0f2b46\]\/95 { --tw-gradient-from: color-mix(in srgb, var(--primary) 95%, transparent) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
    .via-\[\#0f2b46\]\/80 { --tw-gradient-stops: var(--tw-gradient-from), color-mix(in srgb, var(--primary) 80%, transparent), var(--tw-gradient-to) !important; }
    .to-\[\#0f2b46\]\/40 { --tw-gradient-to: color-mix(in srgb, var(--primary) 40%, transparent) !important; }
    
    .text-orange-500 { color: var(--accent) !important; }
    .bg-orange-500 { background-color: var(--accent) !important; }
    .text-orange-400 { color: var(--accent) !important; }
    .border-orange-400\/30 { border-color: color-mix(in srgb, var(--accent) 30%, transparent) !important; }
    .hover\:bg-orange-600:hover { background-color: var(--accent-hover) !important; }
    .hover\:text-orange-600:hover { color: var(--accent-hover) !important; }
</component>

<div class="min-h-screen bg-white font-sans text-gray-800 selection:bg-orange-500 selection:text-white">

<!-- HEADER -->
<header :class="[scrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md', 'fixed w-full top-0 z-50 border-b border-gray-100 transition-all duration-300']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <Link href="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#0f2b46] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            </div>
            <div>
                <span class="text-lg font-bold text-[#0f2b46] tracking-tight block leading-tight">Blink Eye</span>
                <span class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Hospital Network</span>
            </div>
        </Link>
        <div class="flex items-center gap-5">
            <a :href="'tel:' + setting('phone_number', '1800-123-4567')" class="hidden md:flex items-center gap-2 text-[#0f2b46] font-semibold text-sm hover:text-orange-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                {{ setting('phone_number', '1800-123-4567') }}
            </a>
            <Link :href="route('login')" class="text-sm font-semibold text-gray-500 hover:text-[#0f2b46] transition-colors hidden sm:block">Admin</Link>
            <Link :href="route('appointment.create')" class="rounded-lg px-5 py-2.5 bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all text-sm shadow-sm">
                Book Appointment
            </Link>
        </div>
    </div>
</header>

<!-- HERO with BG Image -->
<section class="relative pt-[72px] overflow-hidden">
    <div class="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#0f2b46]/95 via-[#0f2b46]/80 to-[#0f2b46]/40"></div>
        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div class="max-w-2xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-widest mb-6">
                    <span class="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                    {{ $page.props.currentHospital ? $page.props.currentHospital.name : setting('hero_badge_text', 'Trusted Eye Care Since 2001') }}
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white">
                    {{ setting('hero_title_line1', 'Your Vision,') }}<br/>
                    Our <span class="text-orange-400">{{ setting('hero_title_highlight', 'Mission') }}</span>
                </h1>
                <p class="text-lg text-blue-100/80 mb-8 max-w-lg leading-relaxed">
                    {{ setting('hero_subtitle', 'Search for any eye disease, treatment or location to find expert care, top hospitals, and detailed guides — all personalized to your area.') }}
                </p>

                <!-- Search Bar -->
                <div class="max-w-xl relative">
                    <div class="flex items-center bg-white rounded-xl overflow-hidden shadow-2xl border-2 border-transparent focus-within:border-orange-400 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-gray-400 ml-4 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                        <input v-model="searchQuery" type="text" placeholder='Search "Cataract Surgery in Bathinda"...' class="flex-1 py-4 px-3 text-base text-gray-900 placeholder-gray-400 border-0 focus:ring-0 focus:outline-none bg-transparent" @focus="searchQuery.length >= 2 && (showSearchDropdown = true)" @blur="setTimeout(() => showSearchDropdown = false, 200)" />
                        <div v-if="searchLoading" class="mr-4"><div class="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>
                        <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-4 text-sm transition-colors">Search</button>
                    </div>

                    <!-- Dropdown -->
                    <div v-if="showSearchDropdown && searchResults" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
                        <div v-if="searchResults.pages && searchResults.pages.length > 0" class="p-3">
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Pages</p>
                            <button v-for="pg in searchResults.pages.slice(0, 6)" :key="pg.url" @mousedown.prevent="goToPage(pg.url)" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-left text-sm text-gray-700 font-medium">
                                <span class="w-7 h-7 rounded-md bg-[#0f2b46]/10 text-[#0f2b46] flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg></span>
                                {{ pg.title }}
                            </button>
                        </div>
                        <div v-if="searchResults.results" class="border-t border-gray-50 p-3">
                            <div v-if="searchResults.results.diseases?.length" class="mb-2">
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-2">Diseases</p>
                                <button v-for="d in searchResults.results.diseases" :key="d.id" @mousedown.prevent="searchQuery = d.name" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-sm text-gray-600">
                                    <img v-if="d.image" :src="`/storage/${d.image}`" :alt="d.name" class="w-7 h-7 rounded-md object-cover" />
                                    <span v-else class="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center"><span class="w-2 h-2 rounded-full bg-red-400"></span></span>
                                    {{ d.name }}
                                </button>
                            </div>
                            <div v-if="searchResults.results.services?.length" class="mb-2">
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-2">Services</p>
                                <button v-for="s in searchResults.results.services" :key="s.id" @mousedown.prevent="searchQuery = s.name" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-sm text-gray-600">
                                    <img v-if="s.image" :src="`/storage/${s.image}`" :alt="s.name" class="w-7 h-7 rounded-md object-cover" />
                                    <span v-else class="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center"><span class="w-2 h-2 rounded-full bg-blue-400"></span></span>
                                    {{ s.name }}
                                </button>
                            </div>
                            <div v-if="searchResults.results.hospitals?.length">
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-2">Hospitals</p>
                                <button v-for="h in searchResults.results.hospitals" :key="h.id" @mousedown.prevent="goToPage('/' + h.slug)" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 text-sm text-gray-600">
                                    <img v-if="h.image" :src="`/storage/${h.image}`" :alt="h.name" class="w-7 h-7 rounded-md object-cover" />
                                    <span v-else class="w-7 h-7 rounded-md bg-green-50 flex items-center justify-center"><span class="w-2 h-2 rounded-full bg-green-400"></span></span>
                                    {{ h.name }}
                                </button>
                            </div>
                        </div>
                        <div v-if="(!searchResults.pages || !searchResults.pages.length) && (!searchResults.results || (!searchResults.results.diseases?.length && !searchResults.results.services?.length))" class="p-5 text-center text-gray-400 text-sm">No results found.</div>
                    </div>
                </div>

                <div v-if="cityLocations.length > 0" class="flex flex-wrap items-center gap-2 mt-6">
                    <span class="text-xs font-semibold text-blue-200/60 uppercase tracking-wider mr-1">Popular:</span>
                    <button v-for="loc in cityLocations" :key="loc.id" @click="searchQuery = loc.name" class="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-white/70 hover:bg-orange-500/30 hover:border-orange-400/40 hover:text-white transition-all">{{ loc.name }}</button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- STATS BAR -->
<section class="relative z-20 -mt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            <div v-for="(stat, i) in [{num: setting('stat_surgeries', '50,000+'),label: setting('stat_surgeries_label', 'Successful Surgeries'),color:'text-[#0f2b46]'},{num: setting('stat_locations', '15+'),label: setting('stat_locations_label', 'Hospital Locations'),color:'text-orange-500'},{num: setting('stat_success_rate', '98%'),label: setting('stat_success_rate_label', 'Success Rate'),color:'text-emerald-500'},{num: setting('stat_experience', '25+'),label: setting('stat_experience_label', 'Years Experience'),color:'text-[#0f2b46]'}]" :key="i" class="p-6 md:p-8 text-center">
                <div :class="[stat.color, 'text-3xl md:text-4xl font-extrabold mb-1']">{{ stat.num }}</div>
                <div class="text-xs text-gray-400 font-semibold uppercase tracking-wider">{{ stat.label }}</div>
            </div>
        </div>
    </div>
</section>

<!-- SPECIALIZATIONS -->
<section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <span class="text-orange-500 text-xs font-bold uppercase tracking-widest">What We Treat</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0f2b46] mt-2">Our Specializations</h2>
                <p class="mt-2 text-gray-500 max-w-lg">From routine checkups to advanced surgical solutions — we treat every eye condition with precision.</p>
            </div>
            <Link :href="route('appointment.create')" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f2b46] text-white font-semibold rounded-lg text-sm hover:bg-[#1a3d5c] transition-colors self-start md:self-auto">
                Get Expert Consultation
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 class="text-sm font-bold text-red-500 uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span class="w-5 h-0.5 bg-red-400 rounded"></span>Eye Conditions
                </h3>
                <div class="space-y-3">
                    <div v-for="disease in diseases" :key="disease.id" @click="searchQuery = disease.name; typeof window !== 'undefined' && window.scrollTo({top: 0, behavior: 'smooth'})" class="group p-4 rounded-xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex gap-4 items-center">
                        <img v-if="disease.image" :src="`/storage/${disease.image}`" :alt="disease.name" class="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-100" />
                        <div class="w-14 h-14 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold text-[#0f2b46] group-hover:text-orange-600 transition-colors">{{ disease.name }}</h4>
                            <p class="text-sm text-gray-400 mt-0.5 line-clamp-1">{{ disease.description || 'Learn about this condition and treatments.' }}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="text-sm font-bold text-blue-500 uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span class="w-5 h-0.5 bg-blue-400 rounded"></span>Treatments & Services
                </h3>
                <div class="space-y-3">
                    <div v-for="service in services" :key="service.id" @click="searchQuery = service.name; typeof window !== 'undefined' && window.scrollTo({top: 0, behavior: 'smooth'})" class="group p-4 rounded-xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex gap-4 items-center">
                        <img v-if="service.image" :src="`/storage/${service.image}`" :alt="service.name" class="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-100" />
                        <div class="w-14 h-14 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" /></svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold text-[#0f2b46] group-hover:text-orange-600 transition-colors">{{ service.name }}</h4>
                            <p class="text-sm text-gray-400 mt-0.5 line-clamp-1">{{ service.description || 'Expert surgical and diagnostic services.' }}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- BLOG GRID with BG Image -->
<section class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center"></div>
    <div class="absolute inset-0 bg-[#0f2b46]/90"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
                <span class="text-orange-400 text-xs font-bold uppercase tracking-widest">Expert Knowledge</span>
                <h2 class="text-3xl font-extrabold text-white mt-2">Explore Our Guides</h2>
                <p class="mt-2 text-blue-200/60">Localized treatment information and hospital recommendations.</p>
            </div>
            <div class="flex gap-3">
                <select v-model="selectedLocation" class="rounded-lg border-white/10 bg-white/10 text-sm py-2 px-3 text-white focus:border-orange-400 focus:ring-orange-400 min-w-[140px] backdrop-blur-sm">
                    <option value="" class="text-gray-900">All Locations</option>
                    <option v-for="loc in cityLocations" :key="loc.id" :value="loc.id" class="text-gray-900">{{ loc.name }}</option>
                </select>
                <select v-model="selectedHospital" class="rounded-lg border-white/10 bg-white/10 text-sm py-2 px-3 text-white focus:border-orange-400 focus:ring-orange-400 min-w-[140px] backdrop-blur-sm">
                    <option value="" class="text-gray-900">All Hospitals</option>
                    <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.id" class="text-gray-900">{{ hospital.name }}</option>
                </select>
            </div>
        </div>
        <div class="flex gap-2 mb-8">
            <button @click="activeTab = 'all'" :class="[activeTab === 'all' ? 'bg-orange-500 text-white' : 'text-white/60 border-white/15 hover:bg-white/10', 'px-5 py-2 rounded-lg text-sm font-bold transition-all border border-transparent']">All</button>
            <button @click="activeTab = 'service'" :class="[activeTab === 'service' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' : 'text-white/60 border-white/15 hover:bg-white/10', 'px-5 py-2 rounded-lg text-sm font-bold transition-all border']">Services</button>
            <button @click="activeTab = 'disease'" :class="[activeTab === 'disease' ? 'bg-red-500/20 text-red-300 border-red-400/30' : 'text-white/60 border-white/15 hover:bg-white/10', 'px-5 py-2 rounded-lg text-sm font-bold transition-all border']">Diseases</button>
        </div>
        <div v-if="displayBlogs.length > 0" class="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory hide-scroll-bar -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link v-for="(blog, index) in displayBlogs" :key="index" :href="blog.url" class="group block w-[80vw] sm:w-[320px] flex-shrink-0 snap-start">
                <div class="h-full flex flex-col bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 hover:border-orange-400/30 hover:-translate-y-1 transition-all duration-300">
                    <div class="flex items-center gap-3 mb-3">
                        <div :class="[blog.type === 'service' ? 'bg-blue-400/20 text-blue-300' : 'bg-red-400/20 text-red-300', 'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0']">
                            <svg v-if="blog.type === 'service'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" /></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                        </div>
                        <span v-if="blog.location" class="text-[10px] font-semibold text-white/50 bg-white/10 px-2 py-0.5 rounded">📍 {{ blog.location }}</span>
                    </div>
                    <h3 class="text-sm font-bold text-white mb-2 group-hover:text-orange-300 transition-colors leading-snug">{{ blog.title }}</h3>
                    <p class="text-white/40 text-xs mt-auto font-semibold flex items-center gap-1 group-hover:text-orange-400 transition-colors pt-2">
                        Read Guide <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" /></svg>
                    </p>
                </div>
            </Link>
        </div>
        <div v-else class="text-center py-12 text-white/40"><p>No guides available for this filter.</p></div>
    </div>
</section>

<!-- HOSPITALS -->
<section v-if="hospitals.length > 0" class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-orange-500 text-xs font-bold uppercase tracking-widest">Locations</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0f2b46] mt-2">Our Hospital Network</h2>
            <p class="mt-3 text-gray-500">Find the Blink Eye branch closest to you.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="hospital in hospitals" :key="hospital.id" class="group">
                <div class="bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <a :href="'/' + hospital.slug" target="_blank" v-if="hospital.image" class="h-44 w-full block overflow-hidden">
                        <img :src="`/storage/${hospital.image}`" :alt="hospital.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </a>
                    <div class="p-6">
                        <div v-if="!hospital.image" class="w-11 h-11 rounded-xl bg-[#0f2b46]/10 text-[#0f2b46] flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>
                        </div>
                        <a :href="'/' + hospital.slug" target="_blank"><h3 class="text-lg font-bold text-[#0f2b46] mb-1 hover:text-orange-600 transition-colors">{{ hospital.name }}</h3></a>
                        <p class="text-sm text-gray-400 mb-3">{{ hospital.location ? hospital.location.name : 'Location TBD' }}</p>
                        <div class="space-y-1.5 text-sm text-gray-500">
                            <a v-if="hospital.phone" :href="'tel:' + hospital.phone" class="flex items-center gap-2 hover:text-orange-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>{{ hospital.phone }}</a>
                            <a v-if="hospital.email" :href="'mailto:' + hospital.email" class="flex items-center gap-2 hover:text-orange-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>{{ hospital.email }}</a>
                        </div>
                        <div class="mt-5 pt-4 border-t border-gray-100 flex gap-2">
                            <a :href="'/' + hospital.slug" target="_blank" class="flex-1 text-center px-3 py-2 rounded-lg bg-[#0f2b46] text-white font-semibold text-sm hover:bg-[#1a3d5c] transition-colors">Visit</a>
                            <Link :href="route('appointment.create', { hospital_id: hospital.id })" class="flex-1 text-center px-3 py-2 rounded-lg bg-orange-50 text-orange-600 font-semibold text-sm hover:bg-orange-500 hover:text-white transition-all border border-orange-200 hover:border-orange-500">Book</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- WHY CHOOSE US -->
<section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
            <span class="text-orange-500 text-xs font-bold uppercase tracking-widest">Why Choose Us</span>
            <h2 class="text-3xl font-extrabold text-[#0f2b46] mt-2">Built on Excellence</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(feat, i) in [{title:'Expert Surgeons',desc:'Board-certified specialists with decades of experience.',icon:'shield',color:'bg-[#0f2b46]/10 text-[#0f2b46]'},{title:'Advanced Technology',desc:'Latest laser and robotic systems for unmatched precision.',icon:'bolt',color:'bg-orange-50 text-orange-500'},{title:'Compassionate Care',desc:'Patient-first approach ensuring comfort at every step.',icon:'heart',color:'bg-emerald-50 text-emerald-500'}]" :key="i" class="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div :class="[feat.color, 'mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-5']">
                    <svg v-if="feat.icon==='shield'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                    <svg v-else-if="feat.icon==='bolt'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                </div>
                <h3 class="text-lg font-bold text-[#0f2b46] mb-2">{{ feat.title }}</h3>
                <p class="text-gray-500 text-sm">{{ feat.desc }}</p>
            </div>
        </div>
    </div>
</section>

<!-- REVIEWS -->
<section v-if="reviews.length > 0" class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-orange-500 text-xs font-bold uppercase tracking-widest">Testimonials</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0f2b46] mt-2">Patient Stories</h2>
            <p class="mt-3 text-gray-500">Real experiences from patients who entrusted us with their vision.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="review in reviews.slice(0, 3)" :key="review.id" class="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-all flex flex-col h-full">
                <div class="flex text-amber-400 mb-4 gap-0.5">
                    <svg v-for="i in review.rating" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">"{{ review.content }}"</p>
                <div class="flex items-center gap-3 mt-auto pt-5 border-t border-gray-100">
                    <div class="w-10 h-10 rounded-full bg-[#0f2b46] flex items-center justify-center text-white font-bold text-sm">{{ review.author_name.charAt(0) }}</div>
                    <div>
                        <h4 class="font-bold text-[#0f2b46] text-sm">{{ review.author_name }}</h4>
                        <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{{ review.source }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA Banner -->
<section class="py-16 bg-[#0f2b46] relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2880&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
    <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">{{ setting('cta_title', 'Ready to See the World Clearly?') }}</h2>
        <p class="text-blue-200/60 mb-8 text-lg">{{ setting('cta_subtitle', 'Book your appointment today and take the first step towards better vision.') }}</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <Link :href="route('appointment.create')" class="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-orange-500/30 text-sm">Book Appointment</Link>
            <a :href="'tel:' + setting('phone_number', '1800-123-4567')" class="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all border border-white/15 text-sm backdrop-blur-sm">Call {{ setting('phone_number', '1800-123-4567') }}</a>
        </div>
    </div>
</section>

<!-- FOOTER -->
<footer class="bg-[#0a1f33] text-white pt-14 pb-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    </div>
                    <span class="text-lg font-bold">Blink Eye</span>
                </div>
                <p class="text-sm text-gray-400 leading-relaxed">{{ setting('footer_text', 'Advanced eye care across multiple locations in India.') }}</p>
            </div>
            <div>
                <h4 class="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">Quick Links</h4>
                <ul class="space-y-2 text-sm">
                    <li v-for="disease in diseases.slice(0, 4)" :key="disease.id"><button @click="searchQuery = disease.name; typeof window !== 'undefined' && window.scrollTo({top: 0, behavior: 'smooth'})" class="text-gray-400 hover:text-orange-400 transition-colors">{{ disease.name }}</button></li>
                </ul>
            </div>
            <div>
                <h4 class="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">Our Branches</h4>
                <ul class="space-y-2 text-sm">
                    <li v-for="hospital in hospitals" :key="hospital.id" class="text-gray-400">{{ hospital.name }}</li>
                </ul>
            </div>
        </div>
        <div class="border-t border-white/10 pt-6 text-xs text-center text-gray-500">&copy; 2026 Blink Eye Hospitals. All rights reserved.</div>
    </div>
</footer>

</div>
</template>

<style scoped>
.hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none; }
.hide-scroll-bar::-webkit-scrollbar { display: none; }
</style>
