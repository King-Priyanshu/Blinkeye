<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useForm, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';

const props = defineProps({
    title: String,
    content: String,
    context: Object,
    relatedPages: { type: Array, default: () => [] },
    toc: { type: Array, default: () => [] },
    hospitals: { type: Array, default: () => [] },
    seo: { type: Object, default: () => ({}) },
});

const page = usePage();

const form = useForm({
    name: '',
    phone: '',
    hospital_id: props.context?.hospital?.id || '',
    disease_id: props.context?.disease?.id || '',
    location_id: props.context?.location?.id || '',
    source_url: page.props.current_url || '',
});

const submit = () => {
    form.post(route('admin.leads.store'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset('name', 'phone');
            alert('Thank you for inquiring! We will contact you shortly.');
        }
    });
};

const jsonLdScript = computed(() => {
    if (!props.seo?.jsonLd) return null;
    return JSON.stringify(props.seo.jsonLd);
});
</script>

<template>
    <Head :title="title">
        <meta v-if="seo.description" name="description" :content="seo.description" />
        <meta v-if="seo.keywords" name="keywords" :content="seo.keywords" />
        <meta v-if="seo.description" property="og:title" :content="title" />
        <meta v-if="seo.description" property="og:description" :content="seo.description" />
        <meta property="og:type" content="article" />
        <component v-if="jsonLdScript" :is="'script'" type="application/ld+json" v-text="jsonLdScript" />
    </Head>

    <div class="min-h-screen bg-slate-950 font-sans text-white selection:bg-teal-500 selection:text-white pb-20">
        <!-- Background Effects -->
        <div class="fixed inset-0 z-0 pointer-events-none">
            <div class="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px]"></div>
            <div class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]"></div>
        </div>

        <!-- Header -->
        <header class="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-2xl border-b border-white/5">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    </div>
                    <div>
                        <span class="block text-xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent leading-tight">Blink Eye</span>
                        <span class="hidden sm:block text-[10px] uppercase font-bold tracking-wider text-slate-500 group-hover:text-teal-400 transition-colors">← Back to Home</span>
                    </div>
                </Link>

                <div class="flex items-center gap-5">
                    <a v-if="context?.hospital?.phone" :href="'tel:' + context.hospital.phone" class="hidden sm:flex items-center gap-2 text-slate-400 font-medium hover:text-teal-400 transition-colors text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                        {{ context.hospital.phone }}
                    </a>
                    <Link :href="route('appointment.create')" class="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white text-sm font-semibold rounded-full shadow-lg shadow-teal-500/25 transition-all">
                        Book Appointment
                    </Link>
                </div>
            </div>
        </header>

        <!-- Breadcrumb Context Bar -->
        <div class="border-b border-white/5 bg-white/[0.02]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm font-medium">
                <Link href="/" class="text-slate-500 hover:text-teal-400 transition-colors">Home</Link>
                <span class="text-slate-600">/</span>
                <span v-if="context?.location" class="flex items-center gap-1.5 text-slate-400">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {{ context.location.name }}
                </span>
                <span v-if="context?.location && (context?.disease || context?.service)" class="text-slate-600">/</span>
                <span v-if="context?.disease" class="flex items-center gap-1.5 text-rose-300">
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span> {{ context.disease.name }}
                </span>
                <span v-if="context?.service" class="flex items-center gap-1.5 text-cyan-300">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> {{ context.service.name }}
                </span>
            </div>
        </div>

        <main class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Content Column -->
            <article class="lg:col-span-8 space-y-8">
                <!-- Hospital Badge -->
                <div v-if="context?.hospital" class="flex items-center gap-4 p-5 bg-teal-500/10 rounded-2xl border border-teal-500/20 backdrop-blur-sm">
                    <div class="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                    </div>
                    <div class="flex-1">
                        <p class="text-xs font-bold uppercase tracking-wider text-teal-300 mb-0.5">
                            <span v-if="context?.location">Available in {{ context.location.name }}</span>
                            <span v-else>Nearest Available Branch</span>
                        </p>
                        <p class="text-lg font-bold text-white">{{ context.hospital.name }}</p>
                    </div>
                    <div class="flex gap-2">
                        <a v-if="context.hospital.phone" :href="'tel:' + context.hospital.phone" class="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                        </a>
                        <a v-if="context.hospital.whatsapp" :href="'https://wa.me/' + context.hospital.whatsapp" target="_blank" class="p-2.5 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                        </a>
                    </div>
                </div>

                <div class="bg-white/[0.03] backdrop-blur-md p-8 lg:p-12 rounded-3xl border border-white/[0.06] shadow-2xl">
                    <h1 class="text-3xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-10 text-white">
                        <span class="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">{{ title }}</span>
                    </h1>
                    <div v-html="content" class="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-slate-300 prose-p:text-slate-300 leading-relaxed marker:text-teal-500"></div>
                </div>
            </article>

            <!-- Sidebar -->
            <aside class="lg:col-span-4 space-y-6">
                <!-- Sticky Container -->
                <div class="sticky top-28 space-y-6">
                    <!-- Glassmorphism Lead Form -->
                    <div id="lead-form" class="relative group">
                        <div class="absolute -inset-[1px] bg-gradient-to-br from-teal-500/40 to-cyan-500/40 rounded-3xl opacity-50 blur-sm pointer-events-none"></div>
                        <div class="relative bg-slate-900/80 p-7 rounded-3xl border border-white/10 backdrop-blur-xl">
                            <h3 class="text-xl font-bold text-white mb-2">Book an Appointment</h3>
                            <p class="text-slate-400 text-sm mb-6">
                                <span v-if="context?.location">Expert eye care in {{ context.location.name }} - Request a free consultation today!</span>
                                <span v-else>Expert eye care is just a step away. Request a free consultation.</span>
                            </p>

                            <form @submit.prevent="submit" class="space-y-4">
                                <div>
                                    <input type="text" v-model="form.name" required placeholder="Full Name" class="block w-full border border-white/10 bg-white/5 focus:bg-white/10 focus:border-teal-400 focus:ring-teal-400 text-white placeholder-slate-500 rounded-xl py-3.5 px-4 transition-all" />
                                </div>
                                <div>
                                    <input type="tel" v-model="form.phone" required placeholder="Phone Number" class="block w-full border border-white/10 bg-white/5 focus:bg-white/10 focus:border-teal-400 focus:ring-teal-400 text-white placeholder-slate-500 rounded-xl py-3.5 px-4 transition-all" />
                                </div>
                                <button type="submit" :disabled="form.processing" class="w-full relative mt-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold hover:from-teal-400 hover:to-cyan-400 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 disabled:opacity-50 glow-btn">
                                    {{ form.processing ? 'Submitting...' : 'Get Callback Now' }}
                                </button>
                                <p class="text-[11px] text-center text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 text-teal-500"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" /></svg>
                                    Your information is 100% secure.
                                </p>
                            </form>
                        </div>
                    </div>

                    <!-- Table of Contents -->
                    <div v-if="toc && toc.length > 0" class="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.06] backdrop-blur-md">
                        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">On This Page</h4>
                        <nav>
                            <ul class="space-y-2.5 border-l border-white/10 pl-3">
                                <li v-for="item in toc" :key="item.id">
                                    <a :href="'#' + item.id" class="block text-sm text-slate-400 hover:text-teal-400 transition-colors py-0.5 relative group">
                                        <span class="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-teal-500/0 border border-teal-500/0 group-hover:bg-teal-500 group-hover:border-teal-400 transition-all"></span>
                                        {{ item.title }}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <!-- Related Guides -->
                    <div v-if="relatedPages && relatedPages.length > 0" class="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.06] backdrop-blur-md">
                        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Related Guides</h4>
                        <ul class="space-y-1">
                            <li v-for="page in relatedPages" :key="page.url">
                                <Link :href="page.url" class="flex items-start gap-2.5 text-sm text-slate-300 hover:text-teal-400 hover:bg-white/5 p-2 rounded-lg transition-all group">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mt-0.5 text-slate-600 group-hover:text-teal-500 transition-colors flex-shrink-0"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" /></svg>
                                    <span class="leading-snug">{{ page.title }}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <!-- Nearest Branches -->
                    <div v-if="hospitals && hospitals.length > 0" class="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.06] backdrop-blur-md">
                        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Our Hospital Branches</h4>
                        <div class="space-y-3">
                            <div v-for="h in hospitals.slice(0, 4)" :key="h.id" class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                                <div class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5 border border-teal-500/20 group-hover:bg-teal-500/20 group-hover:scale-110 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                                </div>
                                <div>
                                    <p class="font-bold text-sm text-slate-200 group-hover:text-teal-300 transition-colors">{{ h.name }}</p>
                                    <p class="text-slate-500 text-xs">{{ h.location?.name }}</p>
                                    <a v-if="h.phone" :href="'tel:' + h.phone" class="text-cyan-400 text-xs font-medium hover:underline mt-0.5 inline-block">{{ h.phone }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </main>
    </div>
</template>

<style scoped>
.glow-btn {
  position: relative;
}
.glow-btn::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  border-radius: 0.75rem;
  z-index: -1;
  opacity: 0;
  filter: blur(12px);
  transition: opacity 0.3s;
}
.glow-btn:hover::after {
  opacity: 0.6;
}
</style>
