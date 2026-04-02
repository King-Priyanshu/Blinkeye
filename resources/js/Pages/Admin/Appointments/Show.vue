<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { 
    CalendarIcon, 
    ClockIcon, 
    UserIcon, 
    PhoneIcon, 
    EnvelopeIcon, 
    BuildingOfficeIcon,
    ArrowLeftIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentTextIcon,
    ChatBubbleLeftEllipsisIcon,
    ArrowPathIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
    appointment: Object,
});

const showRescheduleModal = ref(false);
const rescheduleForm = useForm({
    appointment_date: '',
    appointment_time: '',
});

const statusColors = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
    cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
};

const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const formatTimeLabel = (t) => {
    if (!t) return '--';
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

const updateStatus = (newStatus) => {
    if (confirm(`Mark this appointment as "${newStatus}"?`)) {
        router.patch(route('admin.appointments.update-status', props.appointment.id), { status: newStatus }, { preserveScroll: true });
    }
};

const deleteAppt = () => {
    if (confirm('Are you sure you want to delete this appointment?')) {
        router.delete(route('admin.appointments.destroy', props.appointment.id));
    }
};

const openRescheduleModal = () => {
    rescheduleForm.appointment_date = props.appointment.appointment_date;
    rescheduleForm.appointment_time = props.appointment.appointment_time;
    showRescheduleModal.value = true;
};

const submitReschedule = () => {
    rescheduleForm.patch(route('admin.appointments.reschedule', props.appointment.id), {
        onSuccess: () => {
            showRescheduleModal.value = false;
        }
    });
};

const today = new Date().toISOString().split('T')[0];
</script>

<template>
    <Head :title="`Appointment - ${appointment.patient_name}`" />
    <AdminLayout>
        
        <!-- Header -->
        <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="flex items-center gap-4">
                <Link :href="route('admin.appointments.index')" class="p-2 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                    <ArrowLeftIcon class="w-5 h-5" />
                </Link>
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Appointment Details</h1>
                    <p class="text-sm text-gray-500 mt-1">Ref ID: #{{ String(appointment.id).padStart(5, '0') }} • Created: {{ new Date(appointment.created_at).toLocaleDateString() }}</p>
                </div>
            </div>
            
            <div class="flex gap-2">
                <span :class="[statusColors[appointment.status], 'px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider border flex items-center gap-2']">
                    <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                    {{ appointment.status }}
                </span>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Main Content: Timeline & Details -->
            <div class="lg:col-span-2 space-y-6">
                
                <!-- Schedule Highlight -->
                <div class="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl shadow-lg p-8 text-white flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
                    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div class="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col items-center justify-center shrink-0">
                        <span class="text-sm font-bold uppercase tracking-widest text-teal-100">{{ new Date(appointment.appointment_date).toLocaleDateString('en-US', { month: 'short' }) }}</span>
                        <span class="text-4xl font-black leading-none my-1">{{ new Date(appointment.appointment_date).getDate() }}</span>
                        <span class="text-xs font-semibold text-teal-100">{{ new Date(appointment.appointment_date).getFullYear() }}</span>
                    </div>
                    <div class="flex-1 text-center sm:text-left z-10">
                        <h2 class="text-3xl font-extrabold mb-1">{{ formatTimeLabel(appointment.appointment_time) }}</h2>
                        <p class="text-teal-100 font-medium mb-3">{{ formatDate(appointment.appointment_date) }}</p>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm">
                            <span class="w-2 h-2 rounded-full bg-teal-300"></span>
                            {{ appointment.reason || 'General Consultation' }}
                        </div>
                    </div>
                </div>

                <!-- Info Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <!-- Clinic Details -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BuildingOfficeIcon class="w-5 h-5 text-teal-500" />
                            Clinical Details
                        </h3>
                        <dl class="space-y-4">
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Hospital / Clinic</dt>
                                <dd class="mt-1 text-sm text-gray-900 font-semibold">{{ appointment.hospital?.name || '--' }}</dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Assigned Specialist</dt>
                                <dd class="mt-1 text-sm text-gray-900 font-semibold flex flex-col">
                                    <span v-if="appointment.doctor">Dr. {{ appointment.doctor.name }}</span>
                                    <span v-else>Any Available Doctor</span>
                                    <span v-if="appointment.doctor" class="text-xs text-teal-600 font-medium mt-0.5">{{ appointment.doctor.specialty }}</span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <!-- Patient Notes Container -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
                        <h3 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ChatBubbleLeftEllipsisIcon class="w-5 h-5 text-amber-500" />
                            Patient Notes
                        </h3>
                        <div class="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-4">
                            <p class="text-sm text-gray-700 italic leading-relaxed" v-if="appointment.notes">"{{ appointment.notes }}"</p>
                            <p class="text-sm text-gray-400 italic" v-else>No additional notes provided by the patient.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar: Patient Info & Actions -->
            <div class="space-y-6">
                <!-- Patient Profile -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 mx-auto mb-4">
                        <UserIcon class="w-8 h-8" />
                    </div>
                    <h3 class="text-lg font-bold text-center text-gray-900 mb-6">{{ appointment.patient_name }}</h3>
                    
                    <div class="space-y-4">
                        <a :href="`tel:${appointment.patient_phone}`" class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 group">
                            <div class="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                                <PhoneIcon class="w-5 h-5" />
                            </div>
                            <div>
                                <div class="text-xs font-medium text-gray-500">Phone Number</div>
                                <div class="text-sm font-bold text-gray-900">{{ appointment.patient_phone }}</div>
                            </div>
                        </a>
                        
                        <a v-if="appointment.patient_email" :href="`mailto:${appointment.patient_email}`" class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 group">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <EnvelopeIcon class="w-5 h-5" />
                            </div>
                            <div>
                                <div class="text-xs font-medium text-gray-500">Email Address</div>
                                <div class="text-sm font-bold text-gray-900 truncate max-w-[150px]">{{ appointment.patient_email }}</div>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Admin Action Center -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 class="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Quick Actions</h3>
                    
                    <div class="space-y-3 flex flex-col">
                        <button v-if="['pending', 'confirmed'].includes(appointment.status)" @click="openRescheduleModal" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-amber-500 text-white hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                            <ArrowPathIcon class="w-5 h-5" /> Reschedule
                        </button>

                        <button v-if="appointment.status === 'pending'" @click="updateStatus('confirmed')" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                            <CheckCircleIcon class="w-5 h-5" /> Confirm Appointment
                        </button>

                        <button v-if="appointment.status === 'confirmed'" @click="updateStatus('completed')" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                            <CheckCircleIcon class="w-5 h-5" /> Mark as Completed
                        </button>
                        
                        <button v-if="['pending', 'confirmed'].includes(appointment.status)" @click="updateStatus('cancelled')" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                            <XCircleIcon class="w-5 h-5" /> Cancel Appointment
                        </button>
                        
                        <div class="border-t border-gray-100 my-2 pt-2"></div>
                        
                        <button @click="deleteAppt" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors">
                            Move to Trash
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reschedule Modal -->
        <div v-if="showRescheduleModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showRescheduleModal = false"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div class="absolute top-4 right-4">
                        <button @click="showRescheduleModal = false" class="text-gray-400 hover:text-gray-500">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
                            <ArrowPathIcon class="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900 text-center" id="modal-title">
                            Reschedule Appointment
                        </h3>
                        <p class="mt-2 text-sm text-gray-500 text-center">
                            Change the date and time for this appointment
                        </p>
                    </div>
                    <form @submit.prevent="submitReschedule" class="mt-5 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">New Date</label>
                            <input 
                                type="date" 
                                v-model="rescheduleForm.appointment_date" 
                                :min="today"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">New Time</label>
                            <input 
                                type="time" 
                                v-model="rescheduleForm.appointment_time" 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div class="mt-5 sm:mt-6">
                            <button 
                                type="submit" 
                                :disabled="rescheduleForm.processing"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:text-sm disabled:opacity-50"
                            >
                                {{ rescheduleForm.processing ? 'Saving...' : 'Save Changes' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
