<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { ArrowLeftIcon, ClockIcon, BuildingOfficeIcon, UserIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    hospitals: Array,
    doctors: Array,
    preselected_hospital: [Number, null],
});

const form = useForm({
    hospital_id: props.preselected_hospital || '',
    doctor_id: '',
    start_time: '09:00',
    end_time: '18:00',
    duration_minutes: 30,
    day_of_week: '',
    is_active: true,
});

const dayOptions = [
    { value: '', label: 'Every Day' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
];

const durationOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '60 minutes' },
];

const submit = () => {
    form.post(route('admin.time-slots.store'), {
        onSuccess: () => {
            // Success message handled by inertia
        },
    });
};

const filteredDoctors = (hospitalId) => {
    if (!hospitalId) return [];
    return props.doctors.filter(d => d.hospital_id == hospitalId);
};
</script>

<template>
    <Head title="Create Time Slot" />

    <AdminLayout>
        <div class="py-6">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
                    <div class="flex items-center gap-4">
                        <Link :href="route('admin.time-slots.index')" class="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                            <ArrowLeftIcon class="w-5 h-5" />
                        </Link>
                        <div>
                            <div class="flex items-center gap-2">
                                <ClockIcon class="w-6 h-6" />
                                <h1 class="text-xl font-bold">Create Time Slot</h1>
                            </div>
                            <p class="text-teal-100 text-sm mt-1">Define available appointment time slots</p>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <form @submit.prevent="submit" class="bg-white rounded-lg shadow p-6 space-y-6">
                    <!-- Hospital -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Hospital <span class="text-red-500">*</span></label>
                        <select
                            v-model="form.hospital_id"
                            :class="{'border-red-500': form.errors.hospital_id}"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            required
                        >
                            <option value="">Select Hospital</option>
                            <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.id">
                                {{ hospital.name }}
                            </option>
                        </select>
                        <p v-if="form.errors.hospital_id" class="mt-1 text-sm text-red-600">{{ form.errors.hospital_id }}</p>
                    </div>

                    <!-- Doctor (Optional) -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                        <select
                            v-model="form.doctor_id"
                            :disabled="!form.hospital_id"
                            :class="{'border-red-500': form.errors.doctor_id, 'opacity-50': !form.hospital_id}"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        >
                            <option value="">All Doctors</option>
                            <option v-for="doctor in filteredDoctors(form.hospital_id)" :key="doctor.id" :value="doctor.id">
                                {{ doctor.name }} ({{ doctor.specialty }})
                            </option>
                        </select>
                        <p class="mt-1 text-xs text-gray-500">Leave empty to apply to all doctors at this hospital</p>
                        <p v-if="form.errors.doctor_id" class="mt-1 text-sm text-red-600">{{ form.errors.doctor_id }}</p>
                    </div>

                    <!-- Day of Week -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
                        <select
                            v-model="form.day_of_week"
                            :class="{'border-red-500': form.errors.day_of_week}"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        >
                            <option v-for="option in dayOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                        <p class="mt-1 text-xs text-gray-500">Leave as "Every Day" to apply to all days</p>
                        <p v-if="form.errors.day_of_week" class="mt-1 text-sm text-red-600">{{ form.errors.day_of_week }}</p>
                    </div>

                    <!-- Time Range -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Start Time <span class="text-red-500">*</span></label>
                            <input
                                type="time"
                                v-model="form.start_time"
                                :class="{'border-red-500': form.errors.start_time}"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                required
                            />
                            <p v-if="form.errors.start_time" class="mt-1 text-sm text-red-600">{{ form.errors.start_time }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">End Time <span class="text-red-500">*</span></label>
                            <input
                                type="time"
                                v-model="form.end_time"
                                :class="{'border-red-500': form.errors.end_time}"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                required
                            />
                            <p v-if="form.errors.end_time" class="mt-1 text-sm text-red-600">{{ form.errors.end_time }}</p>
                        </div>
                    </div>

                    <!-- Duration -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Slot Duration <span class="text-red-500">*</span></label>
                        <select
                            v-model="form.duration_minutes"
                            :class="{'border-red-500': form.errors.duration_minutes}"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            required
                        >
                            <option v-for="option in durationOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                        <p class="mt-1 text-xs text-gray-500">How long each appointment slot will be</p>
                        <p v-if="form.errors.duration_minutes" class="mt-1 text-sm text-red-600">{{ form.errors.duration_minutes }}</p>
                    </div>

                    <!-- Active -->
                    <div class="flex items-center">
                        <input
                            type="checkbox"
                            id="is_active"
                            v-model="form.is_active"
                            class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <label for="is_active" class="ml-2 block text-sm text-gray-900">
                            Active
                        </label>
                        <p class="mt-1 text-xs text-gray-500 ml-4">Inactive slots won't be available for booking</p>
                    </div>

                    <!-- Submit -->
                    <div class="flex justify-end pt-4 border-t">
                        <Link
                            :href="route('admin.time-slots.index')"
                            class="mr-4 px-4 py-2 text-gray-700 hover:text-gray-900"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="px-4 py-2 bg-teal-600 border border-transparent rounded-md font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                            {{ form.processing ? 'Creating...' : 'Create Time Slot' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>
