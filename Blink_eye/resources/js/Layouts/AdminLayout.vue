<script setup>
import { ref, computed, watch } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    MapPinIcon,
    BuildingOfficeIcon,
    TagIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    StarIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    ChevronDownIcon,
    Squares2X2Icon,
    ClipboardDocumentListIcon,
    PhoneIcon,
    UserIcon,
    ClockIcon
} from '@heroicons/vue/24/outline';

const sidebarOpen = ref(false);

const navigation = [
    { name: 'Dashboard', href: route('admin.dashboard.index'), icon: HomeIcon, current: route().current('admin.dashboard.index') },
    { name: 'Locations', href: route('admin.locations.index'), icon: MapPinIcon, current: route().current('admin.locations.*') },
    { name: 'Hospitals', href: route('admin.hospitals.index'), icon: BuildingOfficeIcon, current: route().current('admin.hospitals.*') },
    { name: 'Diseases', href: route('admin.diseases.index'), icon: TagIcon, current: route().current('admin.diseases.*') },
    { name: 'Services', href: route('admin.services.index'), icon: Squares2X2Icon, current: route().current('admin.services.*') },
    { name: 'Grouping Engine', href: route('admin.groups.index'), icon: ClipboardDocumentListIcon, current: route().current('admin.groups.*') },
    { name: 'Blog Templates', href: route('admin.templates.index'), icon: DocumentTextIcon, current: route().current('admin.templates.*') },
    { name: 'Leads', href: route('admin.leads.index'), icon: UserGroupIcon, current: route().current('admin.leads.*') },
    { name: 'Appointments', href: route('admin.appointments.index'), icon: PhoneIcon, current: route().current('admin.appointments.*') },
    { name: 'Time Slots', href: route('admin.time-slots.index'), icon: ClockIcon, current: route().current('admin.time-slots.*') },
    { name: 'Doctors', href: route('admin.doctors.index'), icon: UserIcon, current: route().current('admin.doctors.*') },
    { name: 'Reviews', href: route('admin.reviews.index'), icon: StarIcon, current: route().current('admin.reviews.*') },
    { name: 'Settings', href: route('admin.settings.index'), icon: Cog6ToothIcon, current: route().current('admin.settings.*') },
    { name: 'Analytics', href: '#', icon: ChartBarIcon, current: false },
];

const page = usePage();
const user = page.props.auth.user;

// Flash message toast
const showFlash = ref(false);
const flashMessage = ref('');
const flashType = ref('success');

watch(() => page.props.flash, (flash) => {
    if (flash?.success) {
        flashMessage.value = flash.success;
        flashType.value = 'success';
        showFlash.value = true;
        setTimeout(() => { showFlash.value = false }, 4000);
    }
    if (flash?.error) {
        flashMessage.value = flash.error;
        flashType.value = 'error';
        showFlash.value = true;
        setTimeout(() => { showFlash.value = false }, 5000);
    }
}, { immediate: true });

// Group navigation items
const mainNav = navigation.slice(0, 6);
const secondaryNav = navigation.slice(6);
</script>

<template>
    <div class="min-h-screen bg-slate-50/50 flex">
        <!-- Mobile sidebar backdrop -->
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-[280px] flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            
                            <!-- Mobile Sidebar -->
                            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4">
                                <!-- Logo -->
                                <div class="flex h-20 shrink-0 items-center border-b border-white/10">
                                    <div class="flex items-center gap-3 w-full">
                                        <div class="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                            <span class="text-white font-black text-lg">BE</span>
                                        </div>
                                        <div>
                                            <h1 class="text-lg font-extrabold text-white tracking-tight">Blink Eye</h1>
                                            <p class="text-[10px] text-blue-200 uppercase tracking-widest font-bold">Admin Portal</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <nav class="flex flex-1 flex-col mt-2">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-1">
                                        <li v-for="item in navigation" :key="item.name">
                                            <Link :href="item.href" :class="[item.current ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5', 'group flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200']">
                                                <component :is="item.icon" :class="[item.current ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-300', 'h-5 w-5 shrink-0 transition-colors']" aria-hidden="true" />
                                                {{ item.name }}
                                                <div v-if="item.current" class="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                                
                                <!-- User section mobile -->
                                <div class="border-t border-white/10 pt-4 pb-2 mt-auto">
                                    <div class="flex items-center gap-x-3 px-3 relative overflow-hidden rounded-2xl bg-white/5 p-3 backdrop-blur-sm border border-white/10">
                                        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 mix-blend-overlay"></div>
                                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-inner relative z-10">
                                            {{ user.name.charAt(0) }}
                                        </div>
                                        <div class="flex-1 min-w-0 relative z-10">
                                            <p class="text-sm font-bold text-white truncate">{{ user.name }}</p>
                                            <p class="text-xs font-semibold text-blue-300 truncate">Administrator</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Premium Static sidebar for desktop -->
        <div class="hidden lg:flex lg:w-[280px] lg:flex-col fixed inset-y-0 z-50">
            <div class="flex grow flex-col gap-y-6 overflow-y-auto bg-slate-900 border-r border-slate-800 px-5 pb-6 custom-scrollbar relative">
                <!-- Decorative background elements -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <!-- Logo -->
                <div class="flex h-24 shrink-0 items-center justify-start sticky top-0 bg-slate-900/90 backdrop-blur-xl z-10 border-b border-white/5 mx-2">
                    <div class="flex items-center gap-4 w-full group cursor-pointer transition-transform hover:scale-[1.02]">
                        <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                            <span class="text-white font-black text-xl tracking-tighter relative z-10">BE</span>
                        </div>
                        <div>
                            <h1 class="text-2xl font-black text-white tracking-tight leading-none group-hover:text-blue-100 transition-colors">Blink Eye</h1>
                            <p class="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold mt-1">Admin Portal</p>
                        </div>
                    </div>
                </div>
                
                <!-- Main Navigation -->
                <nav class="flex flex-1 flex-col px-2 z-10 relative">
                    <div class="mb-3 pl-3 flex items-center">
                        <span class="h-px bg-slate-800 flex-1"></span>
                        <p class="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Modules</p>
                        <span class="h-px bg-slate-800 flex-1"></span>
                    </div>
                    
                    <ul role="list" class="flex flex-1 flex-col gap-y-1">
                        <li v-for="item in mainNav" :key="item.name">
                            <Link :href="item.href" class="group relative flex items-center gap-x-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300 overflow-hidden" :class="item.current ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'">
                                <div v-if="item.current" class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/5 rounded-xl border border-blue-500/20"></div>
                                <div v-if="item.current" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-md shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                
                                <component :is="item.icon" :class="[item.current ? 'text-blue-400 group-hover:text-blue-300' : 'text-slate-500 group-hover:text-slate-300', 'h-5 w-5 shrink-0 transition-colors relative z-10']" aria-hidden="true" />
                                <span class="relative z-10 transition-transform duration-200" :class="item.current ? 'translate-x-1' : 'group-hover:translate-x-1'">{{ item.name }}</span>
                            </Link>
                        </li>
                    </ul>

                    <div class="mt-8 mb-3 pl-3 flex items-center">
                        <span class="h-px bg-slate-800 flex-1"></span>
                        <p class="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">System & Config</p>
                        <span class="h-px bg-slate-800 flex-1"></span>
                    </div>
                    
                    <ul role="list" class="flex flex-1 flex-col gap-y-1">
                        <li v-for="item in secondaryNav" :key="item.name">
                            <Link :href="item.href" class="group relative flex items-center gap-x-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300 overflow-hidden" :class="item.current ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'">
                                <div v-if="item.current" class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/5 rounded-xl border border-blue-500/20"></div>
                                <div v-if="item.current" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-md shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                
                                <component :is="item.icon" :class="[item.current ? 'text-blue-400 group-hover:text-blue-300' : 'text-slate-500 group-hover:text-slate-300', 'h-5 w-5 shrink-0 transition-colors relative z-10']" aria-hidden="true" />
                                <span class="relative z-10 transition-transform duration-200" :class="item.current ? 'translate-x-1' : 'group-hover:translate-x-1'">{{ item.name }}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <!-- User profile card -->
                <div class="mt-auto pt-6 z-10 relative px-2">
                    <Menu as="div" class="relative">
                        <MenuButton class="w-full flex items-center gap-x-3 rounded-2xl bg-slate-800/50 p-3 pr-4 text-sm font-semibold text-white shadow-inner ring-1 ring-white/10 hover:bg-slate-800 transition-all duration-300 group">
                            <div class="relative">
                                <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-slate-900 group-hover:scale-105 transition-transform">
                                    {{ user.name.charAt(0) }}
                                </div>
                                <div class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-slate-900"></div>
                            </div>
                            <div class="flex-1 min-w-0 text-left">
                                <p class="text-sm font-bold text-white truncate group-hover:text-blue-100 transition-colors">{{ user.name }}</p>
                                <p class="text-[11px] text-blue-400 font-semibold truncate uppercase tracking-wider">Superadmin</p>
                            </div>
                            <ChevronDownIcon class="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                        </MenuButton>
                        <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95 translate-y-2" enter-to-class="transform opacity-100 scale-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="transform opacity-100 scale-100 translate-y-0" leave-to-class="transform opacity-0 scale-95 translate-y-2">
                            <MenuItems class="absolute bottom-full left-0 z-50 mb-3 w-full origin-bottom rounded-2xl bg-slate-800 border border-slate-700 p-2 shadow-xl shadow-black/40 outline-none">
                                <MenuItem v-slot="{ active }">
                                    <Link :href="route('profile.edit')" :class="[active ? 'bg-slate-700/50 text-white' : 'text-slate-300', 'flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors']">
                                        <Cog6ToothIcon class="h-5 w-5 text-slate-400" />
                                        Platform Settings
                                    </Link>
                                </MenuItem>
                                <div class="my-1 h-px bg-slate-700/50"></div>
                                <MenuItem v-slot="{ active }">
                                    <Link :href="route('logout')" method="post" as="button" :class="[active ? 'bg-red-500/10 text-red-500' : 'text-slate-300', 'flex items-center gap-x-3 w-full text-left rounded-xl px-4 py-3 text-sm font-bold transition-colors']">
                                        <ArrowRightOnRectangleIcon class="h-5 w-5 text-red-400" />
                                        Disconnect Session
                                    </Link>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>

        <!-- Main Workspace content -->
        <div class="flex-1 flex flex-col lg:pl-[280px] min-h-screen transition-all">
            <!-- Premium Glass Top header -->
            <header class="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 bg-white/70 backdrop-blur-xl border-b border-white/50 px-4 sm:gap-x-6 sm:px-6 lg:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                <button type="button" class="-m-2.5 p-2.5 text-slate-600 hover:text-blue-600 transition-colors lg:hidden bg-white shadow-sm rounded-lg border border-slate-100 ml-1" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3Icon class="h-5 w-5" aria-hidden="true" />
                </button>

                <!-- Breadcrumb or Context (Hidden on small screens) -->
                <div class="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-400">
                    <span>Admin Workspace</span>
                    <span class="text-slate-300">/</span>
                    <span class="text-slate-800 capitalize">{{ route().current().split('.')[1] || 'Dashboard' }}</span>
                </div>
                
                <div class="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6 ml-auto">
                    <!-- Global Search -->
                    <div class="hidden sm:block relative w-full max-w-xs group">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <svg class="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input 
                            type="search" 
                            placeholder="Quick search..." 
                            class="block w-full rounded-2xl border-0 py-2.5 pl-10 pr-4 text-slate-900 shadow-inner ring-1 ring-inset ring-slate-200/50 bg-slate-100/50 focus:bg-white placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 font-medium transition-all"
                        />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span class="text-[10px] font-bold text-slate-400 border border-slate-300 rounded px-1.5 py-0.5 shadow-sm">⌘K</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-x-4 lg:gap-x-5">
                        <!-- Quick actions CTA -->
                        <div class="hidden lg:flex lg:items-center">
                            <Link :href="route('admin.hospitals.create')" class="inline-flex items-center gap-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Branch
                            </Link>
                        </div>
                        
                        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true" />
                        
                        <!-- Notifications Bell -->
                        <button type="button" class="relative rounded-full p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none">
                            <span class="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                            <span class="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 animate-ping opacity-75"></span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        <!-- Mobile user profile (Hidden on desktop) -->
                        <Menu as="div" class="relative lg:hidden">
                            <MenuButton class="flex items-center gap-x-2 p-1 focus:outline-none">
                                <div class="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    {{ user.name.charAt(0) }}
                                </div>
                            </MenuButton>
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <MenuItems class="absolute right-0 z-50 mt-2.5 w-48 origin-top-right rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-900/5 outline-none">
                                    <MenuItem v-slot="{ active }">
                                        <Link :href="route('profile.edit')" :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-x-3 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700']">
                                            <Cog6ToothIcon class="h-5 w-5 text-slate-400" />
                                            Settings
                                        </Link>
                                    </MenuItem>
                                    <div class="my-1 h-px bg-slate-100"></div>
                                    <MenuItem v-slot="{ active }">
                                        <Link :href="route('logout')" method="post" as="button" :class="[active ? 'bg-red-50 text-red-600' : 'text-slate-700', 'flex items-center gap-x-3 w-full text-left rounded-xl px-4 py-2.5 text-sm font-bold']">
                                            <ArrowRightOnRectangleIcon class="h-5 w-5" :class="active ? 'text-red-500' : 'text-slate-400'" />
                                            Sign out
                                        </Link>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </header>

            <!-- Dynamic Page Content -->
            <main class="flex-1 py-8 px-4 sm:px-6 lg:px-10 relative">
                <!-- Content decorative background (optional) -->
                <div class="absolute inset-0 bg-slate-50/50 pointer-events-none -z-10"></div>

                <!-- Flash Toast Notification -->
                <transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0 translate-y-2" enter-to-class="transform opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <div v-if="showFlash" class="mb-6 rounded-2xl p-4 flex items-center gap-3 shadow-lg border" :class="flashType === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" :class="flashType === 'success' ? 'bg-emerald-100' : 'bg-red-100'">
                            <svg v-if="flashType === 'success'" class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <svg v-else class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <p class="font-semibold text-sm flex-1">{{ flashMessage }}</p>
                        <button @click="showFlash = false" class="p-1 rounded-lg hover:bg-black/5 transition-colors">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </transition>

                <div class="mx-auto max-w-[1400px]">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<style>
/* Custom scrollbar for sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}
</style>
