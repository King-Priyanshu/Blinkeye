<script setup>
import { ref, watch } from 'vue';
import { Head, router, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    leads: {
        type: Object,
        required: true,
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
});

const searchStatus = ref(props.filters.status || '');
const searchCampaign = ref(props.filters.campaign || '');

const getStatusColor = (status) => {
    const map = {
        'new': 'bg-blue-50 text-blue-700 ring-blue-600/20',
        'contacted': 'bg-amber-50 text-amber-700 ring-amber-600/20',
        'converted': 'bg-green-50 text-green-700 ring-green-600/20',
        'lost': 'bg-red-50 text-red-700 ring-red-600/20',
    };
    return map[status] || 'bg-slate-100 text-slate-600 ring-slate-500/10';
};

let timeoutId = null;
const applyFilters = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        router.get(
            route('admin.leads.index'),
            { status: searchStatus.value, campaign: searchCampaign.value },
            { preserveState: true, replace: true }
        );
    }, 400);
};

watch(searchStatus, applyFilters);
watch(searchCampaign, applyFilters);

const statusForm = useForm({ status: '' });

const updateLeadStatus = (leadId, newStatus) => {
    statusForm.status = newStatus;
    statusForm.patch(route('admin.leads.update-status', leadId), { preserveScroll: true });
};
</script>

<template>
    <Head title="Lead Management" />

    <AdminLayout>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Total Leads</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">{{ leads.total }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">New</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">{{ leads.data.filter(l => l.status === 'new').length }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Contacted</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">{{ leads.data.filter(l => l.status === 'contacted').length }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Converted</p>
                        <p class="mt-1 text-2xl font-bold text-green-600">{{ leads.data.filter(l => l.status === 'converted').length }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Page header -->
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Lead Pipeline</h1>
                    <p class="mt-1 text-sm text-slate-500">Monitor and manage patient inquiries from SEO and campaigns.</p>
                </div>
                <div class="flex items-center gap-3">
                    <!-- Status Filter -->
                    <select v-model="searchStatus" class="rounded-xl border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm font-medium text-slate-700 h-10">
                        <option value="">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                    </select>
                    <!-- Search -->
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon class="h-4 w-4 text-slate-400" />
                        </div>
                        <input type="text" v-model="searchCampaign" class="block w-48 rounded-xl pl-9 border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm h-10" placeholder="Filter campaigns..." />
                    </div>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-100">
                    <thead class="bg-slate-50">
                        <tr>
                            <th class="py-4 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Name</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Condition / Campaign</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Branch</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 bg-white">
                        <tr v-for="item in leads.data" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                            <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-slate-500">{{ item.created_at }}</td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <p class="text-sm font-semibold text-slate-900">{{ item.name }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-600">{{ item.phone }}</td>
                            <td class="px-3 py-4">
                                <p class="text-sm font-medium text-slate-900">{{ item.disease || 'General Query' }}</p>
                                <p class="text-xs text-slate-500">{{ item.campaign_type || 'Organic SEO' }}</p>
                            </td>
                            <td class="px-3 py-4">
                                <p class="text-sm font-medium text-slate-900">{{ item.hospital }}</p>
                                <p class="text-xs text-teal-600">{{ item.location }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <div class="relative group">
                                    <span :class="[getStatusColor(item.status), 'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer']">
                                        {{ item.status?.toUpperCase() }}
                                        <svg class="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
                                    </span>
                                    <div class="absolute right-0 mt-1 hidden group-hover:block z-10 w-40 rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5 overflow-hidden">
                                        <div class="py-1">
                                            <button @click.stop="updateLeadStatus(item.id, 'new')" class="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors">Mark as New</button>
                                            <button @click.stop="updateLeadStatus(item.id, 'contacted')" class="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors">Mark as Contacted</button>
                                            <button @click.stop="updateLeadStatus(item.id, 'converted')" class="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-green-50 hover:text-green-700 transition-colors border-t border-slate-100">Converted</button>
                                            <button @click.stop="updateLeadStatus(item.id, 'lost')" class="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors">Lost</button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="leads.data.length === 0">
                            <td colspan="6" class="py-16 text-center">
                                <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                                <h3 class="mt-3 text-sm font-semibold text-slate-900">No leads found</h3>
                                <p class="mt-1 text-sm text-slate-500">Leads will appear here once inquiries start flowing in.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="leads.links && leads.links.length > 3" class="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                <p class="text-sm text-slate-600">Showing <span class="font-medium">{{ leads.from }}</span> to <span class="font-medium">{{ leads.to }}</span> of <span class="font-medium">{{ leads.total }}</span> leads</p>
                <div class="flex gap-1">
                    <Link v-for="link in leads.links" :key="link.label" :href="link.url || '#'" :class="[link.active ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200', !link.url ? 'opacity-40 pointer-events-none' : '', 'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all']" v-html="link.label" />
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
