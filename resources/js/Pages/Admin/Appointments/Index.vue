<script setup>
import { ref, watch } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import StatCard from '@/Components/UI/StatCard.vue';
import { debounce } from 'lodash';
import { 
    CalendarIcon, 
    CheckCircleIcon, 
    ClockIcon, 
    XCircleIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    EyeIcon,
    ClipboardDocumentListIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
    appointments: Object,
    currentStatus: { type: String, default: 'all' },
    stats: { type: Object, default: () => ({}) },
    filters: { type: Object, default: () => ({ search: '', date_from: '', date_to: '' }) },
});

// Expose currentStatus for template use
const currentStatus = ref(props.currentStatus);

// Filters State
const search = ref(props.filters.search);
const date_from = ref(props.filters.date_from);
const date_to = ref(props.filters.date_to);

// Reschedule Modal State
const showRescheduleModal = ref(false);
const rescheduleForm = ref({
    appointment_id: null,
    appointment_date: '',
    appointment_time: '',
    patient_name: ''
});

const statusColors = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
    cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
};

const statusOptions = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const formatTimeLabel = (t) => {
    if (!t) return '--';
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

// Actions
const updateStatus = (appointmentId, newStatus) => {
    if (confirm(`Mark this appointment as "${newStatus}"?`)) {
        router.patch(route('admin.appointments.update-status', appointmentId), { status: newStatus }, { preserveScroll: true });
    }
};

const deleteAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to delete this appointment? This cannot be undone.')) {
        router.delete(route('admin.appointments.destroy', appointmentId), { preserveScroll: true });
    }
};

const openRescheduleModal = (appt) => {
    rescheduleForm.value = {
        appointment_id: appt.id,
        appointment_date: appt.appointment_date,
        appointment_time: appt.appointment_time,
        patient_name: appt.patient_name
    };
    showRescheduleModal.value = true;
};

const submitReschedule = () => {
    router.patch(route('admin.appointments.reschedule', rescheduleForm.value.appointment_id), {
        appointment_date: rescheduleForm.value.appointment_date,
        appointment_time: rescheduleForm.value.appointment_time
    }, {
        onSuccess: () => { showRescheduleModal.value = false; },
        preserveScroll: true
    });
};

// Filter fetching
const fetchFilters = () => {
    router.get(route('admin.appointments.index'), {
        status: props.currentStatus,
        search: search.value,
        date_from: date_from.value,
        date_to: date_to.value,
    }, { preserveState: true, replace: true });
};

const debouncedSearch = debounce(fetchFilters, 300);

watch([search, date_from, date_to], () => {
    debouncedSearch();
});

const filterByStatus = (status) => {
    router.get(route('admin.appointments.index'), {
        status,
        search: search.value,
        date_from: date_from.value,
        date_to: date_to.value,
    }, { preserveState: true });
};

// Visual time slots 9AM–6PM for Reschedule
const timeSlots = [];
for (let h = 9; h <= 18; h++) {
    timeSlots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 18) timeSlots.push(`${String(h).padStart(2, '0')}:30`);
}
// Need seconds precision for input binding comparison if from DB
const formatBoundTime = (t) => t.substring(0, 5); 
</script>

<template>
    <Head title="Appointments Management" />
    <AdminLayout>
        
        <!-- Header & Stats -->
        <div class="mb-8">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight mb-6">Appointments Dashboard</h1>
            
            <dl class="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
                <StatCard title="Total Appointments" :value="stats.total" color="medical-blue">
                    <template #icon><CalendarIcon class="w-6 h-6" /></template>
                </StatCard>
                <StatCard title="Action Req. (Pending)" :value="stats.pending" color="amber">
                    <template #icon><ClockIcon class="w-6 h-6" /></template>
                </StatCard>
                <StatCard title="Confirmed" :value="stats.confirmed" color="emerald">
                    <template #icon><CheckCircleIcon class="w-6 h-6" /></template>
                </StatCard>
                <StatCard title="Today's Visits" :value="stats.today" color="cyan">
                    <template #icon><EyeIcon class="w-6 h-6" /></template>
                </StatCard>
            </dl>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                <!-- Status Tabs -->
                <div class="md:col-span-5 flex flex-wrap gap-1 bg-slate-100 rounded-xl p-1">
                    <button v-for="s in statusOptions" :key="s" @click="filterByStatus(s)"
                        :class="[currentStatus === s ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700', 'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all flex-1']">
                        {{ s }}
                    </button>
                </div>

                <!-- Date Range -->
                <div class="md:col-span-4 flex items-center gap-2">
                    <input type="date" v-model="date_from" class="w-full rounded-xl border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm" placeholder="From" />
                    <span class="text-slate-400 text-sm">to</span>
                    <input type="date" v-model="date_to" class="w-full rounded-xl border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm" placeholder="To" />
                </div>

                <!-- Search -->
                <div class="md:col-span-3 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon class="h-4 w-4 text-slate-400" />
                    </div>
                    <input type="text" v-model="search" placeholder="Search name or phone..." class="w-full rounded-xl pl-9 border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm" />
                </div>
            </div>
        </div>

        <!-- Data Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto min-h-[400px]">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-slate-50">
                        <tr>
                            <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Info</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hospital & Dr.</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="px-5 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="appt in appointments.data" :key="appt.id" class="hover:bg-slate-50/50 transition-colors group">
                            
                            <!-- Patient -->
                            <td class="px-5 py-4">
                                <div class="text-sm font-bold text-slate-900">{{ appt.patient_name }}</div>
                                <div class="text-xs font-medium text-slate-500 mt-0.5">{{ appt.patient_phone }}</div>
                                <div v-if="appt.patient_email" class="text-xs text-slate-400">{{ appt.patient_email }}</div>
                            </td>
                            
                            <!-- Schedule -->
                            <td class="px-5 py-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex flex-col items-center justify-center border border-teal-100 flex-shrink-0">
                                        <span class="text-[10px] uppercase font-bold leading-none">{{ new Date(appt.appointment_date).toLocaleDateString('en-US', { month: 'short' }) }}</span>
                                        <span class="text-base font-black leading-none">{{ new Date(appt.appointment_date).getDate() }}</span>
                                    </div>
                                    <div>
                                        <div class="text-sm font-semibold text-gray-900">{{ formatTimeLabel(appt.appointment_time) }}</div>
                                        <div class="text-xs text-gray-500">{{ new Date(appt.appointment_date).toLocaleDateString('en-US', { weekday: 'long' }) }}</div>
                                    </div>
                                </div>
                            </td>
                            
                            <!-- Hospital -->
                            <td class="px-5 py-4">
                                <div class="text-sm text-slate-900 font-medium">{{ appt.hospital?.name }}</div>
                                <div class="text-xs text-teal-600 font-semibold">{{ appt.doctor ? `Dr. ${appt.doctor.name}` : 'Any Available Doctor' }}</div>
                            </td>
                            
                            <!-- Reason -->
                            <td class="px-5 py-4">
                                <span class="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg text-xs ring-1 ring-inset ring-slate-500/10">
                                    {{ appt.reason || 'General Consultation' }}
                                </span>
                            </td>
                            
                            <!-- Status -->
                            <td class="px-5 py-4">
                                <span :class="[statusColors[appt.status], 'px-2.5 py-1 rounded-full text-xs font-bold capitalize border']">
                                    {{ appt.status }}
                                </span>
                            </td>
                            
                            <!-- Actions -->
                            <td class="px-5 py-4 text-right">
                                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    
                                    <!-- View Detail -->
                                    <Link :href="route('admin.appointments.show', appt.id)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                                        <EyeIcon class="w-5 h-5" />
                                    </Link>
                                    
                                    <!-- Status quick actions -->
                                    <button v-if="appt.status === 'pending'" @click="updateStatus(appt.id, 'confirmed')" class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Confirm">
                                        <CheckCircleIcon class="w-5 h-5" />
                                    </button>
                                    
                                    <!-- Reschedule -->
                                    <button v-if="appt.status !== 'completed' && appt.status !== 'cancelled'" @click="openRescheduleModal(appt)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Reschedule">
                                        <ArrowPathIcon class="w-5 h-5" />
                                    </button>

                                    <!-- Delete -->
                                    <button @click="deleteAppointment(appt.id)" class="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                                        <XCircleIcon class="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Empty State -->
                        <tr v-if="appointments.data.length === 0">
                            <td colspan="6" class="px-5 py-16 text-center">
                                <CalendarIcon class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 class="text-lg font-medium text-gray-900">No appointments found</h3>
                                <p class="text-gray-500 mt-1">Try adjusting your search or filters.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination -->
            <div v-if="appointments.last_page > 1" class="px-5 py-4 border-t border-slate-100 flex justify-center gap-1">
                <Link v-for="link in appointments.links" :key="link.label" :href="link.url || '#'"
                    :class="[link.active ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200', !link.url ? 'opacity-40 pointer-events-none' : '', 'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all']"
                    v-html="link.label" />
            </div>
        </div>

    </AdminLayout>

    <!-- Reschedule Modal -->
    <div v-if="showRescheduleModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showRescheduleModal = false"></div>
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 class="text-lg font-bold text-gray-900">Reschedule Appointment</h3>
                <button @click="showRescheduleModal = false" class="text-gray-400 hover:bg-gray-200 rounded-full p-1"><XCircleIcon class="w-6 h-6" /></button>
            </div>
            <form @submit.prevent="submitReschedule" class="p-6">
                <p class="text-sm text-gray-500 mb-6">Change the date and time for <strong class="text-gray-900">{{ rescheduleForm.patient_name }}</strong>'s appointment.</p>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">New Date</label>
                        <input type="date" v-model="rescheduleForm.appointment_date" :min="new Date().toISOString().split('T')[0]" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">New Time</label>
                        <select v-model="rescheduleForm.appointment_time" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
                            <option value="">Select a time</option>
                            <option v-for="t in timeSlots" :key="t" :value="t">{{ formatTimeLabel(t) }}</option>
                        </select>
                    </div>
                </div>
                
                <div class="mt-8 flex justify-end gap-3">
                    <button type="button" @click="showRescheduleModal = false" class="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" :disabled="!rescheduleForm.appointment_date || !rescheduleForm.appointment_time" class="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-50">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</template>
