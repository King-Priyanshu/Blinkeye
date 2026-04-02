<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { PlusIcon, PencilIcon } from '@heroicons/vue/20/solid';

defineProps({
    groups: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <Head title="Taxonomy Groups" />

    <AdminLayout>
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Taxonomy Groups</h1>
                    <p class="mt-1 text-sm text-slate-500">Build collections of Locations, Diseases, or Services for bulk SEO routing.</p>
                </div>
                <Link :href="route('admin.groups.create')" class="inline-flex items-center justify-center gap-x-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 transition-all">
                    <PlusIcon class="h-5 w-5" />
                    Create Group
                </Link>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-100">
                    <thead class="bg-slate-50">
                        <tr>
                            <th class="py-4 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Group Name</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Entity Type</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Entities</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Templates</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="relative py-4 pr-6 pl-3"><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 bg-white">
                        <tr v-for="item in groups.data" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                            <td class="whitespace-nowrap py-4 pl-6 pr-3">
                                <div class="flex items-center">
                                    <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                                        <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" /></svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-semibold text-slate-900">{{ item.name }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span class="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10 capitalize">{{ item.type }}</span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span class="text-sm font-bold text-slate-900">{{ item.items_count }}</span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span :class="[item.blogs_count > 0 ? 'bg-teal-50 text-teal-700 ring-teal-600/20' : 'bg-slate-100 text-slate-500 ring-slate-500/10', 'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset']">
                                    {{ item.blogs_count }} Templates
                                </span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span :class="[item.is_active ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-slate-100 text-slate-600 ring-slate-500/10', 'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset']">
                                    {{ item.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="relative whitespace-nowrap py-4 pr-6 pl-3">
                                <Link :href="route('admin.groups.edit', item.id)" class="inline-flex items-center rounded-lg p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit">
                                    <PencilIcon class="h-4 w-4" />
                                </Link>
                            </td>
                        </tr>
                        <tr v-if="groups.data.length === 0">
                            <td colspan="6" class="py-16 text-center">
                                <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75z" /></svg>
                                <h3 class="mt-3 text-sm font-semibold text-slate-900">No groups found</h3>
                                <p class="mt-1 text-sm text-slate-500">Create a group to start organizing entities.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="groups.links && groups.links.length > 3" class="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                <p class="text-sm text-slate-600">Showing <span class="font-medium">{{ groups.from }}</span> to <span class="font-medium">{{ groups.to }}</span> of <span class="font-medium">{{ groups.total }}</span> groups</p>
                <div class="flex gap-1">
                    <Link v-for="link in groups.links" :key="link.label" :href="link.url || '#'" :class="[link.active ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200', !link.url ? 'opacity-40 pointer-events-none' : '', 'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all']" v-html="link.label" />
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
