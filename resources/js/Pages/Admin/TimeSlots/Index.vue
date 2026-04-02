<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { 
    PlusIcon, 
    PencilIcon, 
    TrashIcon,
    ClockIcon,
    BuildingOfficeIcon,
    UserIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
    timeSlots: Object,
    hospitals: Array,
    filters: Object,
});

const showDeleteModal = ref(false);
const slotToDelete = ref(null);

const dayLabels = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
};

const dayColors = {
    monday: 'bg-blue-100 text-blue-800',
    tuesday: 'bg-indigo-100 text-indigo-800',
    wednesday: 'bg-purple-100 text-purple-800',
    thursday: 'bg-pink-100 text-pink-800',
    friday: 'bg-amber-100 text-amber-800',
    saturday: 'bg-teal-100 text-teal-800',
    sunday: 'bg-rose-100 text-rose-800',
};

const formatTime = (time) => {
    if (!time) return '-';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};

const confirmDelete = (slot) => {
    slotToDelete.value = slot;
    showDeleteModal.value = true;
};

const deleteSlot = () => {
    if (slotToDelete.value) {
        router.delete(route('admin.time-slots.destroy', slotToDelete.value.id), {
            onSuccess: () => {
                showDeleteModal.value = false;
                slotToDelete.value = null;
            }
        });
    }
};
</script>

<template>
    <Head title="Time Slots" />

    <AdminLayout>
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header with Stats -->
                <div class="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div class="flex items-center gap-3 mb-2">
                                <div class="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <ClockIcon class="w-6 h-6" />
                                </div>
                                <h1 class="text-2xl font-bold">Time Slots</h1>
                            </div>
                            <p class="text-teal-100 text-sm">Manage appointment schedules for hospitals and doctors</p>
                        </div>
                        <Link
                            :href="route('admin.time-slots.create')"
                            class="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-teal-700 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-colors shadow-lg"
                        >
                            <PlusIcon class="w-5 h-5" />
                            Add Time Slot
                        </Link>
                    </div>
                </div>

                <!-- Filters -->
                <div class="bg-white rounded-lg shadow mb-6 p-4">
                    <form method="get" class="flex flex-wrap gap-4">
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
                            <select
                                name="hospital_id"
                                :value="filters.hospital_id"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            >
                                <option value="">All Hospitals</option>
                                <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.id">
                                    {{ hospital.name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
                            <select
                                name="day_of_week"
                                :value="filters.day_of_week"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            >
                                <option value="all">All Days</option>
                                <option v-for="(label, key) in dayLabels" :key="key" :value="key">
                                    {{ label }}
                                </option>
                            </select>
                        </div>
                        <div class="flex items-end">
                            <button
                                type="submit"
                                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-medium text-white hover:bg-gray-900"
                            >
                                Filter
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Table -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50/50">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hospital</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Day</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-if="timeSlots.data.length === 0">
                                <td colspan="7" class="px-6 py-16 text-center">
                                    <div class="flex flex-col items-center">
                                        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <ClockIcon class="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p class="text-gray-500 font-medium">No time slots found</p>
                                        <p class="text-gray-400 text-sm mt-1">Create your first time slot to get started</p>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="slot in timeSlots.data" :key="slot.id" class="hover:bg-gray-50/80 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                                            <BuildingOfficeIcon class="w-4 h-4 text-teal-600" />
                                        </div>
                                        <span class="text-sm font-medium text-gray-900">{{ slot.hospital?.name || '-' }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <UserIcon class="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span class="text-sm text-gray-600">{{ slot.doctor?.name || 'All Doctors' }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span 
                                        v-if="slot.day_of_week"
                                        :class="dayColors[slot.day_of_week] || 'bg-gray-100 text-gray-800'"
                                        class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold"
                                    >
                                        {{ dayLabels[slot.day_of_week] }}
                                    </span>
                                    <span v-else class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600">
                                        Every Day
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <ClockIcon class="w-4 h-4 text-gray-400" />
                                        <span class="text-sm font-medium text-gray-900">{{ formatTime(slot.start_time) }}</span>
                                        <span class="text-gray-400">-</span>
                                        <span class="text-sm text-gray-600">{{ formatTime(slot.end_time) }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600">{{ slot.duration_minutes }} min</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        :class="slot.is_active ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-600 border-gray-200'"
                                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
                                    >
                                        {{ slot.is_active ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link
                                            :href="route('admin.time-slots.edit', slot.id)"
                                            class="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors"
                                        >
                                            <PencilIcon class="w-4 h-4" />
                                        </Link>
                                        <button
                                            @click="confirmDelete(slot)"
                                            class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <TrashIcon class="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="timeSlots.links.length > 3" class="mt-4">
                    <div class="flex justify-center">
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <Link
                                v-for="link in timeSlots.links"
                                :key="link.label"
                                :href="link.url || '#'"
                                :class="[
                                    link.active ? 'bg-teal-50 border-teal-500 text-teal-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                    link.url ? 'cursor-pointer' : 'cursor-default opacity-50'
                                ]"
                                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium first:rounded-l-md last:rounded-r-md"
                                preserve-scroll
                            >
                                <span v-html="link.label"></span>
                            </Link>
                        </nav>
                    </div>
                </div>

                <!-- Delete Confirmation Modal -->
                <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showDeleteModal = false"></div>
                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div class="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div class="absolute top-4 right-4">
                                <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-500">
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <TrashIcon class="h-6 w-6 text-red-600" />
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Delete Time Slot
                                    </h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            Are you sure you want to delete this time slot? This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button 
                                    @click="deleteSlot" 
                                    type="button"
                                    class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Delete
                                </button>
                                <button 
                                    @click="showDeleteModal = false" 
                                    type="button"
                                    class="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
