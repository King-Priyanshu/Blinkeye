<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import StatCard from '@/Components/UI/StatCard.vue';
import { 
    UserGroupIcon, 
    MapPinIcon, 
    BuildingOfficeIcon, 
    ArrowTrendingUpIcon,
    PlusIcon,
    EyeIcon,
    DocumentTextIcon,
    CalendarIcon,
} from '@heroicons/vue/24/outline';

defineProps({
    stats: {
        type: Object,
        default: () => ({
            totalLeads: 0,
            newLeads: 0,
            convertedLeads: 0,
            conversionRate: 0,
            activeLocations: 0,
            activeHospitals: 0,
        }),
    },
});

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
</script>

<template>
    <Head title="Admin Dashboard" />

    <AdminLayout>
        <!-- Welcome Header -->
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
                        Welcome back, <span class="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">{{ $page.props.auth.user.name }}</span> 👋
                    </h1>
                    <p class="mt-1 text-sm text-slate-500">{{ today }} — Here's what's happening with your platform.</p>
                </div>
                <div class="flex items-center gap-3">
                    <Link :href="route('admin.hospitals.create')" class="inline-flex items-center justify-center gap-x-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 transition-all">
                        <PlusIcon class="h-4 w-4" />
                        Add Hospital
                    </Link>
                </div>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
            <StatCard title="Total Leads" :value="stats.totalLeads" color="teal">
                <template #icon>
                    <UserGroupIcon class="h-6 w-6 text-teal-600" aria-hidden="true" />
                </template>
            </StatCard>
            
            <StatCard title="New Leads" :value="stats.newLeads" color="red">
                <template #icon>
                    <UserGroupIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </template>
            </StatCard>
            
            <StatCard title="Conversion Rate" :value="`${stats.conversionRate}%`" color="green">
                <template #icon>
                    <ArrowTrendingUpIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </template>
            </StatCard>
            
            <StatCard title="Active Locations" :value="stats.activeLocations" color="blue">
                <template #icon>
                    <MapPinIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
                </template>
            </StatCard>
            
            <StatCard title="Hospital Branches" :value="stats.activeHospitals" color="cyan">
                <template #icon>
                    <BuildingOfficeIcon class="h-6 w-6 text-cyan-600" aria-hidden="true" />
                </template>
            </StatCard>
        </div>

        <!-- Quick Actions -->
        <div class="mb-8">
            <h2 class="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link :href="route('admin.leads.index')" class="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all text-center">
                    <div class="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <UserGroupIcon class="h-6 w-6 text-amber-600" />
                    </div>
                    <p class="text-sm font-semibold text-slate-900">View Leads</p>
                    <p class="text-xs text-slate-500 mt-0.5">{{ stats.newLeads }} new</p>
                </Link>

                <Link :href="route('admin.appointments.index')" class="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all text-center">
                    <div class="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <CalendarIcon class="h-6 w-6 text-teal-600" />
                    </div>
                    <p class="text-sm font-semibold text-slate-900">Appointments</p>
                    <p class="text-xs text-slate-500 mt-0.5">Manage bookings</p>
                </Link>

                <Link :href="route('admin.doctors.index')" class="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all text-center">
                    <div class="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <EyeIcon class="h-6 w-6 text-blue-600" />
                    </div>
                    <p class="text-sm font-semibold text-slate-900">Doctors</p>
                    <p class="text-xs text-slate-500 mt-0.5">Manage staff</p>
                </Link>

                <Link :href="route('admin.templates.index')" class="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all text-center">
                    <div class="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <DocumentTextIcon class="h-6 w-6 text-purple-600" />
                    </div>
                    <p class="text-sm font-semibold text-slate-900">SEO Templates</p>
                    <p class="text-xs text-slate-500 mt-0.5">Blog engine</p>
                </Link>
            </div>
        </div>

        <!-- Platform Overview -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 class="text-lg font-semibold text-slate-900 mb-2">Platform Overview</h2>
            <p class="text-sm text-slate-500 mb-6">Key metrics at a glance</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div class="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-900">{{ stats.convertedLeads }}</p>
                        <p class="text-xs text-slate-500">Converted Leads</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div class="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <BuildingOfficeIcon class="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-900">{{ stats.activeHospitals }}</p>
                        <p class="text-xs text-slate-500">Active Branches</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MapPinIcon class="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-900">{{ stats.activeLocations }}</p>
                        <p class="text-xs text-slate-500">Active Territories</p>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
