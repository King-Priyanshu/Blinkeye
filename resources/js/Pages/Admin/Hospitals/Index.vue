<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { PlusIcon, PencilIcon, EyeIcon, TrashIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/vue/20/solid';

defineProps({
    hospitals: {
        type: Object,
        required: true,
    },
});

const columns = [
    { key: 'name', label: 'Branch Name' },
    { key: 'location_name', label: 'City / Region' },
    { key: 'theme', label: 'Theme Colors' },
    { key: 'domain', label: 'URL Slug / Path' },
    { key: 'is_active', label: 'Status' },
    { key: 'actions', label: '' },
];
</script>

<template>
    <Head title="Hospitals Management" />

    <AdminLayout>
        <!-- Page header -->
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Hospital Branches</h1>
                    <p class="mt-1 text-sm text-slate-500">Manage all Blink Eye clinic locations and their settings.</p>
                </div>
                <Link
                    :href="route('admin.hospitals.create')"
                    class="inline-flex items-center justify-center gap-x-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-all"
                >
                    <PlusIcon class="h-5 w-5" aria-hidden="true" />
                    Add Branch
                </Link>
            </div>
        </div>

        <!-- Stats cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Total Hospitals</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">{{ hospitals.total }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Active</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">{{ hospitals.data.filter(h => h.is_active).length }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Inactive</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">{{ hospitals.data.filter(h => !h.is_active).length }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
                        <svg class="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Locations</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">{{ new Set(hospitals.data.map(h => h.location_name)).size }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search and filters -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 mb-6">
            <div class="p-4 flex flex-col sm:flex-row gap-4">
                <div class="relative flex-1">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <MagnifyingGlassIcon class="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                        type="search" 
                        placeholder="Search hospitals..." 
                        class="block w-full rounded-xl border-0 py-2.5 pl-11 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6 bg-slate-50"
                    />
                </div>
                <button
                    type="button"
                    class="inline-flex items-center justify-center gap-x-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 transition-colors"
                >
                    <FunnelIcon class="h-5 w-5" />
                    Filters
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-100">
                    <thead class="bg-slate-50">
                        <tr>
                            <th scope="col" class="py-4 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Branch Name</th>
                            <th scope="col" class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">City / Region</th>
                            <th scope="col" class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Theme</th>
                            <th scope="col" class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">URL Slug / Path</th>
                            <th scope="col" class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th scope="col" class="relative py-4 pr-6 pl-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 bg-white">
                        <tr v-for="item in hospitals.data" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                            <td class="whitespace-nowrap py-4 pl-6 pr-3">
                                <div class="flex items-center">
                                    <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center flex-shrink-0">
                                        <svg class="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-semibold text-slate-900">{{ item.name }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <p class="text-sm text-slate-600">{{ item.location_name }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <div class="flex items-center gap-2">
                                    <div class="flex -space-x-2">
                                        <div 
                                            v-if="item.primary_color" 
                                            class="h-7 w-7 rounded-full border-2 border-white shadow-sm" 
                                            :style="{ backgroundColor: item.primary_color }"
                                            :title="'Primary: ' + item.primary_color"
                                        ></div>
                                        <div 
                                            v-if="item.secondary_color" 
                                            class="h-7 w-7 rounded-full border-2 border-white shadow-sm" 
                                            :style="{ backgroundColor: item.secondary_color }"
                                            :title="'Secondary: ' + item.secondary_color"
                                        ></div>
                                    </div>
                                    <span v-if="!item.primary_color && !item.secondary_color" class="text-xs text-slate-400">Default</span>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span v-if="item.subdomain" class="text-sm text-slate-600 font-mono">/{{ item.subdomain }}</span>
                                <span v-else class="text-sm text-slate-400 italic">Not set</span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span 
                                    :class="[
                                        item.is_active 
                                            ? 'bg-green-50 text-green-700 ring-green-600/20' 
                                            : 'bg-slate-100 text-slate-600 ring-slate-500/10',
                                        'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset'
                                    ]"
                                >
                                    {{ item.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="relative whitespace-nowrap py-4 pr-6 pl-3">
                                <div class="flex items-center justify-end gap-2">
                                    <Link 
                                        :href="route('admin.hospitals.edit', item.id)" 
                                        class="inline-flex items-center rounded-lg p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                                        title="Edit"
                                    >
                                        <PencilIcon class="h-4 w-4" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination -->
            <div class="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                <div class="flex flex-1 justify-between sm:hidden">
                    <Link :href="hospitals.prev_page_url || '#'" class="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" :class="{ 'opacity-50 pointer-events-none': !hospitals.prev_page_url }">Previous</Link>
                    <Link :href="hospitals.next_page_url || '#'" class="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" :class="{ 'opacity-50 pointer-events-none': !hospitals.next_page_url }">Next</Link>
                </div>
                <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-slate-600">
                            Showing <span class="font-medium">{{ hospitals.from }}</span> to <span class="font-medium">{{ hospitals.to }}</span> of <span class="font-medium">{{ hospitals.total }}</span> branches
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
