<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { PlusIcon, PencilIcon } from '@heroicons/vue/20/solid';

defineProps({
    diseases: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <Head title="Diseases Management" />

    <AdminLayout>
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Medical Conditions</h1>
                    <p class="mt-1 text-sm text-slate-500">Manage the core taxonomy of eye conditions for SEO and lead routing.</p>
                </div>
                <Link :href="route('admin.diseases.create')" class="inline-flex items-center justify-center gap-x-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 transition-all">
                    <PlusIcon class="h-5 w-5" />
                    Add Condition
                </Link>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-100">
                    <thead class="bg-slate-50">
                        <tr>
                            <th class="py-4 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Disease Name</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">URL Slug</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="relative py-4 pr-6 pl-3"><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 bg-white">
                        <tr v-for="item in diseases.data" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                            <td class="whitespace-nowrap py-4 pl-6 pr-3">
                                <div class="flex items-center">
                                    <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center flex-shrink-0">
                                        <svg class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-semibold text-slate-900">{{ item.name }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span class="text-slate-500 text-xs font-mono bg-slate-100 px-2.5 py-1 rounded-lg">/{{ item.slug }}</span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span :class="[item.is_active ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-slate-100 text-slate-600 ring-slate-500/10', 'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset']">
                                    {{ item.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="relative whitespace-nowrap py-4 pr-6 pl-3">
                                <Link :href="route('admin.diseases.edit', item.id)" class="inline-flex items-center rounded-lg p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit">
                                    <PencilIcon class="h-4 w-4" />
                                </Link>
                            </td>
                        </tr>
                        <tr v-if="diseases.data.length === 0">
                            <td colspan="4" class="py-16 text-center">
                                <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                                <h3 class="mt-3 text-sm font-semibold text-slate-900">No conditions found</h3>
                                <p class="mt-1 text-sm text-slate-500">Get started by adding a new medical condition.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="diseases.links && diseases.links.length > 3" class="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                <p class="text-sm text-slate-600">Showing <span class="font-medium">{{ diseases.from }}</span> to <span class="font-medium">{{ diseases.to }}</span> of <span class="font-medium">{{ diseases.total }}</span> conditions</p>
                <div class="flex gap-1">
                    <Link v-for="link in diseases.links" :key="link.label" :href="link.url || '#'" :class="[link.active ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200', !link.url ? 'opacity-40 pointer-events-none' : '', 'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all']" v-html="link.label" />
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
