<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    hospitals: { type: Array, default: () => [] },
    doctors: { type: Array, default: () => [] },
    reasons: { type: Array, default: () => [] },
    preselected_hospital: { type: [String, Number], default: '' },
});

const page = usePage();
const showSuccess = ref(!!page.props.flash?.success);
const currentStep = ref(1);
const availableSlots = ref([]);
const loadingSlots = ref(false);

const form = useForm({
    hospital_id: props.preselected_hospital || '',
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
    patient_name: '',
    patient_phone: '',
    patient_email: '',
    notes: '',
});

// Filter doctors by selected hospital
const filteredDoctors = computed(() => {
    if (!form.hospital_id) return [];
    return props.doctors.filter(d => d.hospital_id == form.hospital_id);
});

const onHospitalChange = () => { 
    form.doctor_id = ''; 
    form.appointment_date = '';
    form.appointment_time = '';
    availableSlots.value = [];
};

// Fetch available slots when date changes
const fetchAvailableSlots = async () => {
    if (!form.hospital_id || !form.appointment_date) {
        availableSlots.value = [];
        return;
    }
    
    loadingSlots.value = true;
    try {
        const response = await axios.get(route('admin.time-slots.available'), {
            params: {
                hospital_id: form.hospital_id,
                doctor_id: form.doctor_id || null,
                date: form.appointment_date
            }
        });
        availableSlots.value = response.data.slots || [];
    } catch (error) {
        console.error('Error fetching slots:', error);
        availableSlots.value = [];
    } finally {
        loadingSlots.value = false;
    }
};

// Watch for date and doctor changes to fetch slots
watch([() => form.appointment_date, () => form.doctor_id], () => {
    if (form.appointment_date) {
        fetchAvailableSlots();
    }
});

// Reset time when date changes
watch(() => form.appointment_date, () => {
    form.appointment_time = '';
});

// Min date = today
const today = new Date().toISOString().split('T')[0];

// Fallback time slots if no available slots from database
const defaultTimeSlots = [];
for (let h = 9; h <= 18; h++) {
    defaultTimeSlots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 18) defaultTimeSlots.push(`${String(h).padStart(2, '0')}:30`);
}

// Use available slots from database or fallback to defaults
const timeSlots = computed(() => {
    if (availableSlots.value.length > 0) {
        return availableSlots.value.map(s => s.start);
    }
    return defaultTimeSlots;
});

const formatTimeLabel = (t) => {
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

const selectTime = (t) => {
    form.appointment_time = t;
};

const nextStep = () => {
    if (currentStep.value === 1 && form.hospital_id && form.appointment_date && form.appointment_time && form.reason) {
        currentStep.value = 2;
    }
};

const submit = () => {
    form.post(route('appointment.store'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            currentStep.value = 1;
            showSuccess.value = true;
            availableSlots.value = [];
        },
    });
};
</script>

<template>
    <Head title="Book Appointment — Blink Eye" />

    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden font-sans">
        <!-- Background Effects -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>
        </div>

        <!-- Header -->
        <header class="relative z-10 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    </div>
                    <span class="text-2xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">Blink Eye</span>
                </Link>
                <div class="flex items-center gap-4">
                    <a href="tel:1800-123-4567" class="hidden sm:flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                        1800-123-4567
                    </a>
                    <Link href="/" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">← Back</Link>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <!-- Success Message -->
            <div v-if="showSuccess" class="bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-10 text-center backdrop-blur-xl shadow-2xl">
                <div class="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                </div>
                <h2 class="text-3xl font-extrabold text-white mb-4">Request Received!</h2>
                <p class="text-lg text-emerald-300 mb-8 max-w-lg mx-auto">Your appointment request has been successfully submitted. Our care team will call you shortly to confirm your slot.</p>
                <div class="flex gap-4 justify-center">
                    <button @click="showSuccess = false" class="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/20">Book Another</button>
                    <Link href="/" class="px-8 py-3.5 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-colors border border-white/10">Return Home</Link>
                </div>
            </div>

            <!-- Booking Form -->
            <div v-if="!showSuccess">
                <div class="text-center mb-12">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                        Fast & Secure Booking
                    </div>
                    <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">Schedule Your Visit</h1>
                    <p class="mt-4 text-lg text-slate-400 max-w-xl mx-auto">Skip the queue. Book your consultation in less than 2 minutes. No account required.</p>
                </div>

                <!-- Progress Tracker -->
                <div class="flex items-center justify-center mb-10">
                    <div class="flex items-center gap-4">
                        <div :class="['flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors', currentStep >= 1 ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 'bg-slate-800 text-slate-500']">1</div>
                        <div :class="['w-16 h-1 rounded-full transition-colors', currentStep >= 2 ? 'bg-teal-500' : 'bg-slate-800']"></div>
                        <div :class="['flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors', currentStep >= 2 ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 'bg-slate-800 text-slate-500']">2</div>
                    </div>
                </div>

                <form @submit.prevent="submit" class="bg-white/[0.02] backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl relative">
                    
                    <div v-if="page.props.errors.appointment_time" class="absolute -top-16 left-0 right-0 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-6 py-4 rounded-xl text-center font-medium backdrop-blur-md">
                        {{ page.props.errors.appointment_time }}
                    </div>

                    <!-- Step 1: Medical Info -->
                    <div v-show="currentStep === 1" class="p-8 sm:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span class="text-teal-400 text-xl">🏥</span> Clinic Details & Time
                        </h2>
                        
                        <div class="space-y-8">
                            <!-- Location & Doctor -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-semibold text-slate-300 mb-2">Hospital Branch <span class="text-rose-400">*</span></label>
                                    <select v-model="form.hospital_id" @change="onHospitalChange" required class="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3.5 px-4 [&>option]:bg-slate-900">
                                        <option value="" class="text-slate-500">Choose preferred location</option>
                                        <option v-for="h in hospitals" :key="h.id" :value="h.id">{{ h.name }}</option>
                                    </select>
                                    <p v-if="form.errors.hospital_id" class="mt-2 text-sm text-rose-400">{{ form.errors.hospital_id }}</p>
                                </div>
                                <div v-if="filteredDoctors.length > 0">
                                    <label class="block text-sm font-semibold text-slate-300 mb-2">Preferred Doctor <span class="text-slate-500 font-normal">(Optional)</span></label>
                                    <select v-model="form.doctor_id" class="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3.5 px-4 [&>option]:bg-slate-900">
                                        <option value="">Any available specialist</option>
                                        <option v-for="d in filteredDoctors" :key="d.id" :value="d.id">Dr. {{ d.name }} — {{ d.specialty }}</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Reason for visit -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-300 mb-2">Reason for Visit <span class="text-rose-400">*</span></label>
                                <select v-model="form.reason" required class="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3.5 px-4 [&>option]:bg-slate-900">
                                    <option value="" class="text-slate-500">What do you need help with?</option>
                                    <optgroup label="Common Conditions & Services">
                                        <option v-for="r in reasons" :key="r" :value="r">{{ r }}</option>
                                    </optgroup>
                                    <option value="General Checkup">General Eye Checkup</option>
                                    <option value="Other">Other / Not Sure</option>
                                </select>
                            </div>

                            <!-- Date & Time Slots -->
                            <div class="pt-6 border-t border-white/5">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label class="block text-sm font-semibold text-slate-300 mb-2">Select Date <span class="text-rose-400">*</span></label>
                                        <input type="date" v-model="form.appointment_date" :min="today" required class="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3.5 px-4" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-slate-300 mb-3">Select Time Slot <span class="text-rose-400">*</span></label>
                                        <div class="grid grid-cols-3 gap-2">
                                            <button 
                                                v-for="t in timeSlots" 
                                                :key="t" 
                                                type="button"
                                                @click="selectTime(t)"
                                                :class="[
                                                    'py-2.5 px-2 text-sm font-medium rounded-xl border transition-all',
                                                    form.appointment_time === t 
                                                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.3)]' 
                                                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                                                ]"
                                            >
                                                {{ formatTimeLabel(t) }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-10 pt-8 border-t border-white/5 flex justify-end">
                            <button type="button" @click="nextStep" :disabled="!(form.hospital_id && form.appointment_date && form.appointment_time && form.reason)" class="px-8 py-3.5 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                Continue to Details
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Step 2: Patient Info -->
                    <div v-show="currentStep === 2" class="p-8 sm:p-12 animate-in fade-in slide-in-from-right-8 duration-500">
                        <button type="button" @click="currentStep = 1" class="text-sm font-semibold text-slate-400 hover:text-white flex items-center gap-2 mb-8 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.66l4.15 4.15a.75.75 0 1 1-1.06 1.06l-5.414-5.41a.75.75 0 0 1 0-1.06l5.414-5.41a.75.75 0 1 1 1.06 1.06L5.66 9.25h10.59a.75.75 0 0 1 .75.75Z" clip-rule="evenodd" /></svg>
                            Back to Selection
                        </button>
                        
                        <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span class="text-cyan-400 text-xl">👤</span> Patient Information
                        </h2>
                        
                        <div class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-semibold text-slate-300 mb-2">Full Name <span class="text-rose-400">*</span></label>
                                    <input type="text" v-model="form.patient_name" required placeholder="e.g. Rajesh Kumar" class="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3.5 px-4 placeholder-slate-600 focus:bg-white/10 transition-colors" />
                                    <p v-if="form.errors.patient_name" class="mt-2 text-sm text-rose-400">{{ form.errors.patient_name }}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-slate-300 mb-2">Phone Number <span class="text-rose-400">*</span></label>
                                    <input type="tel" v-model="form.patient_phone" required placeholder="e.g. 9876543210" class="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3.5 px-4 placeholder-slate-600 focus:bg-white/10 transition-colors" />
                                    <p v-if="form.errors.patient_phone" class="mt-2 text-sm text-rose-400">{{ form.errors.patient_phone }}</p>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-slate-300 mb-2">Email Address <span class="text-slate-500 font-normal">(Optional, for reminders)</span></label>
                                <input type="email" v-model="form.patient_email" placeholder="you@example.com" class="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3.5 px-4 placeholder-slate-600 focus:bg-white/10 transition-colors" />
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-slate-300 mb-2">Additional Notes <span class="text-slate-500 font-normal">(Optional)</span></label>
                                <textarea v-model="form.notes" rows="3" placeholder="Any specific symptoms, previous surgeries, or concerns..." class="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3.5 px-4 placeholder-slate-600 focus:bg-white/10 transition-colors resize-none"></textarea>
                            </div>
                        </div>

                        <!-- Summary Box -->
                        <div class="mt-8 bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                            <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Appointment Summary</h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span class="block text-slate-500 mb-1">Date & Time</span>
                                    <span class="text-white font-medium">{{ form.appointment_date || '--' }} <br/> {{ form.appointment_time ? formatTimeLabel(form.appointment_time) : '--' }}</span>
                                </div>
                                <div>
                                    <span class="block text-slate-500 mb-1">Reason</span>
                                    <span class="text-white font-medium">{{ form.reason || '--' }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <p class="text-sm text-slate-400 max-w-sm">By submitting this form, our team will review your request and call you to confirm your slot.</p>
                            <button type="submit" :disabled="form.processing" class="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-extrabold hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed glow-btn flex items-center justify-center gap-2 text-lg">
                                <span v-if="form.processing" class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                {{ form.processing ? 'Processing...' : 'Confirm Booking ✓' }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>
