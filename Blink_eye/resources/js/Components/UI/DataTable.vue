<script setup>
import { Link } from '@inertiajs/vue3';
import { PencilIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
    actionLabel: {
        type: String,
        default: 'Edit',
    },
    actionRoute: {
        type: Function,
        default: null,
    },
});
</script>

<template>
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-100">
                <thead class="bg-slate-50">
                    <tr>
                        <th v-for="col in columns" :key="col.key" scope="col" class="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {{ col.label }}
                        </th>
                        <th v-if="actionRoute" scope="col" class="relative py-4 pr-6 pl-3">
                            <span class="sr-only">{{ actionLabel }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                    <tr v-for="row in data" :key="row.id" class="hover:bg-slate-50/50 transition-colors">
                        <td v-for="col in columns" :key="col.key" class="whitespace-nowrap py-4 px-6 text-sm text-slate-900">
                            <slot :name="`cell(${col.key})`" :value="row[col.key]" :item="row">
                                {{ row[col.key] }}
                            </slot>
                        </td>
                        <td v-if="actionRoute" class="relative whitespace-nowrap py-4 pr-6 pl-3">
                            <div class="flex items-center justify-end gap-2">
                                <Link :href="actionRoute(row)" class="inline-flex items-center rounded-lg p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" :title="actionLabel">
                                    <PencilIcon class="h-4 w-4" />
                                </Link>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="data.length === 0">
                        <td :colspan="columns.length + (actionRoute ? 1 : 0)" class="py-16 text-center">
                            <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 class="mt-3 text-sm font-semibold text-slate-900">No records found</h3>
                            <p class="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
