<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { PlusIcon, PencilIcon, TrashIcon, StarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/20/solid';

defineProps({
    reviews: Object,
});

const deleteReview = (review) => {
    if (confirm('Are you sure you want to delete this review?')) {
        router.delete(route('admin.reviews.destroy', review.id), {
            preserveScroll: true,
        });
    }
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

const getAverageRating = () => {
    return '4.8'; // Default - would need backend calculation
};
</script>

<template>
    <Head title="Reviews Management" />

    <AdminLayout>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Total Reviews</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">{{ reviews?.total || 0 }}</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center">
                        <StarIcon class="h-6 w-6 text-amber-600" />
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">Average Rating</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900 flex items-center gap-1">
                            <span>4.8</span>
                            <StarIcon class="h-5 w-5 text-amber-400" />
                        </p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">This Month</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">12</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center">
                        <ChatBubbleBottomCenterTextIcon class="h-6 w-6 text-teal-600" />
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-500">5-Star Reviews</p>
                        <p class="mt-1 text-2xl font-bold text-slate-900">85%</p>
                    </div>
                    <div class="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center">
                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Patient Reviews</h1>
                    <p class="mt-1 text-sm text-slate-500">Manage patient reviews and testimonials.</p>
                </div>
                <Link :href="route('admin.reviews.create')" class="inline-flex items-center justify-center gap-x-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 transition-all">
                    <PlusIcon class="h-5 w-5" />
                    Create Review
                </Link>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-100">
                    <thead class="bg-slate-50">
                        <tr>
                            <th class="py-4 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Review</th>
                            <th class="px-3 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th class="relative py-4 pr-6 pl-3"><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 bg-white">
                        <tr v-for="review in (reviews?.data || reviews || [])" :key="review.id" class="hover:bg-slate-50/50 transition-colors group">
                            <td class="whitespace-nowrap py-4 pl-6 pr-3">
                                <div class="flex items-center">
                                    <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center flex-shrink-0">
                                        <svg class="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-semibold text-slate-900">{{ review.author_name }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <div class="flex items-center gap-0.5">
                                    <svg v-for="star in 5" :key="star" :class="[star <= (review.rating || 5) ? 'text-amber-400' : 'text-slate-200', 'w-4 h-4']" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4">
                                <span class="inline-flex items-center rounded-md bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">
                                    {{ review.source }}
                                </span>
                            </td>
                            <td class="px-3 py-4 max-w-xs">
                                <p class="text-sm text-slate-600 line-clamp-2">{{ review.content }}</p>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                                {{ formatDate(review.created_at) }}
                            </td>
                            <td class="relative whitespace-nowrap py-4 pr-6 pl-3">
                                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link :href="route('admin.reviews.edit', review.id)" class="inline-flex items-center rounded-lg p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit">
                                        <PencilIcon class="h-4 w-4" />
                                    </Link>
                                    <button @click="deleteReview(review)" class="inline-flex items-center rounded-lg p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                                        <TrashIcon class="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="(reviews?.data || reviews || []).length === 0">
                            <td colspan="6" class="py-16 text-center">
                                <svg class="mx-auto h-12 w-12 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <h3 class="mt-3 text-sm font-semibold text-slate-900">No reviews found</h3>
                                <p class="mt-1 text-sm text-slate-500">Create a review to display patient testimonials.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="reviews?.links && reviews.links.length > 3" class="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                <p class="text-sm text-slate-600">Showing <span class="font-medium">{{ reviews.from }}</span> to <span class="font-medium">{{ reviews.to }}</span> of <span class="font-medium">{{ reviews.total }}</span> reviews</p>
                <div class="flex gap-1">
                    <Link v-for="link in reviews.links" :key="link.label" :href="link.url || '#'" :class="[link.active ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200', !link.url ? 'opacity-40 pointer-events-none' : '', 'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all']" v-html="link.label" />
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
