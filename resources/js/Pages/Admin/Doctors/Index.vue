<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { PlusIcon, PencilIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

defineProps({
    doctors: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <Head title="Doctors Directory" />

    <AdminLayout>
        <!-- Page header -->
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Doctors Directory</h1>
                    <p class="mt-1 text-sm text-slate-500">Manage the doctors working at Blink Eye Hospitals.</p>
                </div>
                <Link
                    :href="route('admin.doctors.create')"
                    class="inline-flex items-center justify-center gap-x-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 transition-all"
                >
                    <PlusIcon class="h-5 w-5" />
                    Add Doctor
                </Link>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-100">
                    <thead class="bg-slate-50">
                        <tr>
                            <th class="py-4 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor Name</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Specialty</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hospital</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="relative py-4 pr-6 pl-3"><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 bg-white">
                        <tr v-for="item in doctors.data" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                            <td class="whitespace-nowrap py-4 pl-6 pr-3">
                                <div class="flex items-center">
                                    <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center flex-shrink-0">
                                        <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-semibold text-slate-900">{{ item.name }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span v-if="item.specialty" class="text-sm text-slate-600">{{ item.specialty }}</span>
                                <span v-else class="text-sm text-slate-400 italic">Not set</span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <p class="text-sm text-slate-600">{{ item.hospital_name || '-' }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span :class="[item.is_active ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-slate-100 text-slate-600 ring-slate-500/10', 'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset']">
                                    {{ item.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="relative whitespace-nowrap py-4 pr-6 pl-3">
                                <Link :href="route('admin.doctors.edit', item.id)" class="inline-flex items-center rounded-lg p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit">
                                    <PencilIcon class="h-4 w-4" />
                                </Link>
                            </td>
                        </tr>
                        <tr v-if="doctors.data.length === 0">
                            <td colspan="5" class="py-16 text-center">
                                <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>
                                <h3 class="mt-3 text-sm font-semibold text-slate-900">No doctors found</h3>
                                <p class="mt-1 text-sm text-slate-500">Get started by adding a new doctor.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Pagination -->
            <div v-if="doctors.links && doctors.links.length > 3" class="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                <p class="text-sm text-slate-600">Showing <span class="font-medium">{{ doctors.from }}</span> to <span class="font-medium">{{ doctors.to }}</span> of <span class="font-medium">{{ doctors.total }}</span> doctors</p>
                <div class="flex gap-1">
                    <Link v-for="link in doctors.links" :key="link.label" :href="link.url || '#'"
                        :class="[link.active ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200', !link.url ? 'opacity-40 pointer-events-none' : '', 'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all']"
                        v-html="link.label" />
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
