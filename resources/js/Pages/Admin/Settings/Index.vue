<script setup>
import { useForm, Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { ref, computed } from 'vue';

defineOptions({ layout: AdminLayout });

const props = defineProps({
    settings: Object,
});

// Flatten all settings into a single form array
const allSettings = computed(() => {
    const flat = [];
    for (const group in props.settings) {
        props.settings[group].forEach(s => flat.push({ ...s }));
    }
    return flat;
});

const form = useForm({
    settings: allSettings.value.map(s => ({ key: s.key, value: s.value })),
});

const getValue = (key) => {
    const item = form.settings.find(s => s.key === key);
    return item ? item.value : '';
};

const setValue = (key, val) => {
    const item = form.settings.find(s => s.key === key);
    if (item) item.value = val;
};

const submit = () => {
    form.post(route('admin.settings.update'), { preserveScroll: true });
};

const groupLabels = {
    stats: { title: 'Homepage Statistics', desc: 'Numbers displayed in the stats bar on the landing page' },
    theme: { title: 'Theme Colors', desc: 'Primary and accent colors used across the website' },
    hero: { title: 'Hero Section & CTA', desc: 'Headline text, subtitle, and call-to-action content' },
    general: { title: 'General Settings', desc: 'Phone number, footer text, and other site-wide settings' },
};

const fieldLabels = {
    stat_surgeries: 'Surgeries Count',
    stat_surgeries_label: 'Surgeries Label',
    stat_locations: 'Locations Count',
    stat_locations_label: 'Locations Label',
    stat_success_rate: 'Success Rate',
    stat_success_rate_label: 'Success Rate Label',
    stat_experience: 'Experience Count',
    stat_experience_label: 'Experience Label',
    color_primary: 'Primary Color (Navy)',
    color_accent: 'Accent Color (Orange)',
    color_accent_hover: 'Accent Hover Color',
    hero_title_line1: 'Hero Title Line 1',
    hero_title_highlight: 'Highlighted Word',
    hero_subtitle: 'Hero Subtitle',
    hero_badge_text: 'Badge Text',
    phone_number: 'Phone Number',
    cta_title: 'CTA Banner Title',
    cta_subtitle: 'CTA Banner Subtitle',
    footer_text: 'Footer Description',
};
</script>

<template>
    <Head title="Site Settings" />

    <div>
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-2xl font-extrabold text-slate-900">Site Settings</h1>
                <p class="text-sm text-slate-500 mt-1">Manage your homepage content, stats, and theme colors</p>
            </div>
            <button @click="submit" :disabled="form.processing" class="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-50">
                <svg v-if="form.processing" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Save All Settings
            </button>
        </div>

        <div v-if="$page.props.flash?.success" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
            ✅ {{ $page.props.flash.success }}
        </div>

        <form @submit.prevent="submit" class="space-y-8">
            <div v-for="(items, group) in settings" :key="group" class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div class="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 class="text-lg font-bold text-slate-800">{{ groupLabels[group]?.title || group }}</h2>
                    <p class="text-sm text-slate-400 mt-0.5">{{ groupLabels[group]?.desc || '' }}</p>
                </div>
                <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div v-for="setting in items" :key="setting.key">
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                            {{ fieldLabels[setting.key] || setting.key }}
                        </label>

                        <!-- Color picker for theme colors -->
                        <div v-if="setting.key.startsWith('color_')" class="flex items-center gap-3">
                            <input type="color" :value="getValue(setting.key)" @input="setValue(setting.key, $event.target.value)" class="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                            <input type="text" :value="getValue(setting.key)" @input="setValue(setting.key, $event.target.value)" class="flex-1 rounded-lg border-slate-200 text-sm py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 font-mono" />
                        </div>

                        <!-- Textarea for long text -->
                        <textarea v-else-if="setting.key.includes('subtitle') || setting.key.includes('footer_text') || setting.key.includes('cta_subtitle')" :value="getValue(setting.key)" @input="setValue(setting.key, $event.target.value)" rows="3" class="w-full rounded-lg border-slate-200 text-sm py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500"></textarea>

                        <!-- Normal input -->
                        <input v-else type="text" :value="getValue(setting.key)" @input="setValue(setting.key, $event.target.value)" class="w-full rounded-lg border-slate-200 text-sm py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>
            </div>
        </form>

        <!-- Preview Section -->
        <div class="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 class="text-lg font-bold text-slate-800 mb-4">Stats Preview</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="stat in ['surgeries','locations','success_rate','experience']" :key="stat" class="p-4 rounded-xl bg-slate-50 text-center border border-slate-100">
                    <div class="text-2xl font-extrabold" :style="{ color: getValue('color_accent') }">{{ getValue('stat_' + stat) }}</div>
                    <div class="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">{{ getValue('stat_' + stat + '_label') }}</div>
                </div>
            </div>

            <h2 class="text-lg font-bold text-slate-800 mt-6 mb-3">Color Preview</h2>
            <div class="flex gap-4">
                <div class="flex-1 h-20 rounded-xl flex items-center justify-center text-white font-bold" :style="{ backgroundColor: getValue('color_primary') }">Primary</div>
                <div class="flex-1 h-20 rounded-xl flex items-center justify-center text-white font-bold" :style="{ backgroundColor: getValue('color_accent') }">Accent</div>
                <div class="flex-1 h-20 rounded-xl flex items-center justify-center text-white font-bold" :style="{ backgroundColor: getValue('color_accent_hover') }">Accent Hover</div>
            </div>
        </div>
    </div>
</template>
