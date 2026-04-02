<script setup>
import { ref, computed } from 'vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { TrashIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    locations: Array,
    diseases: Array,
    services: Array,
});

const form = useForm({
    name: '',
    type: 'Location',
    is_active: true,
    items: [],
});

const availableOptions = computed(() => {
    switch (form.type) {
        case 'Location': return props.locations || [];
        case 'Disease': return props.diseases || [];
        case 'Service': return props.services || [];
        default: return [];
    }
});

const itemTypeMap = {
    'Location': 'App\\Models\\Location',
    'Disease': 'App\\Models\\Disease',
    'Service': 'App\\Models\\Service',
};

const selectedItemToAdd = ref('');

const addItem = () => {
    if (!selectedItemToAdd.value) return;
    
    // Prevent duplicates
    if (form.items.some(i => i.item_id === selectedItemToAdd.value.id)) {
        selectedItemToAdd.value = '';
        return;
    }
    
    form.items.push({
        item_id: selectedItemToAdd.value.id,
        item_type: itemTypeMap[form.type],
        _display_name: selectedItemToAdd.value.name,
    });
    
    selectedItemToAdd.value = '';
};

const removeItem = (index) => {
    form.items.splice(index, 1);
};

// Clear items when type changes
const onTypeChange = () => {
    form.items = [];
    selectedItemToAdd.value = '';
};

const submit = () => {
    // We can filter out _display_name before sending, though Laravel ignores extra fields mostly.
    form.post(route('admin.groups.store'));
};
</script>

<template>
    <Head title="Create Taxonomy Group" />

    <AdminLayout>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Create Taxonomy Group</h1>
                <p class="mt-2 text-sm text-gray-700">Cluster entities together to create dynamic SEO landing pages or lead segments.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <Link
                    :href="route('admin.groups.index')"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Back to List
                </Link>
            </div>
        </div>

        <div class="mt-8 max-w-3xl bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-8">
                        <div class="sm:col-span-4">
                            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Group Name</label>
                            <div class="mt-2 text-sm text-gray-500 mb-1">e.g. "Top Tier Cities" or "Laser Operations"</div>
                            <div class="mt-1">
                                <input type="text" id="name" v-model="form.name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required />
                            </div>
                            <div v-if="form.errors.name" class="mt-2 text-sm text-red-600">{{ form.errors.name }}</div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Entity Type</label>
                            <div class="mt-1 mt-6 sm:mt-0">
                                <select id="type" v-model="form.type" @change="onTypeChange" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required>
                                    <option value="Location">Locations</option>
                                    <option value="Disease">Diseases</option>
                                    <option value="Service">Services</option>
                                </select>
                            </div>
                            <div v-if="form.errors.type" class="mt-2 text-sm text-red-600">{{ form.errors.type }}</div>
                        </div>
                        
                        <div class="sm:col-span-6">
                            <div class="relative flex items-start">
                                <div class="flex h-6 items-center">
                                    <input id="is_active" v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600" />
                                </div>
                                <div class="ml-3 text-sm leading-6">
                                    <label for="is_active" class="font-medium text-gray-900">Active</label>
                                    <p class="text-gray-500">Enable this group to be used in dynamic blog templates.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-4">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 mb-4">Add Entities to Group</h3>
                        
                        <div class="flex items-center space-x-3 mb-6">
                            <select v-model="selectedItemToAdd" class="block w-full max-w-sm rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6">
                                <option value="" disabled>-- Select {{ form.type }} to Add --</option>
                                <option v-for="opt in availableOptions" :key="opt.id" :value="opt">
                                    {{ opt.name }} {{ opt.type ? `(${opt.type})` : '' }}
                                </option>
                            </select>
                            <button type="button" @click="addItem" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Add
                            </button>
                        </div>
                        
                        <div v-if="form.items.length === 0" class="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                            <p class="text-sm text-gray-500">No {{ form.type }}s added to this group yet.</p>
                        </div>

                        <div v-else class="border border-gray-200 rounded-md overflow-hidden">
                            <ul role="list" class="divide-y divide-gray-200">
                                <li v-for="(item, index) in form.items" :key="index" class="flex items-center justify-between py-3 pl-4 pr-5 text-sm leading-6 hover:bg-gray-50 bg-white shadow-sm">
                                    <div class="flex w-0 flex-1 items-center">
                                        <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span class="truncate font-medium text-gray-900">
                                                {{ item._display_name }}
                                            </span>
                                            <span class="flex-shrink-0 text-gray-400">ID: {{ item.item_id }}</span>
                                        </div>
                                    </div>
                                    <div class="ml-4 flex-shrink-0">
                                        <button type="button" @click="removeItem(index)" class="font-medium text-red-600 hover:text-red-500 flex items-center">
                                            <TrashIcon class="h-4 w-4 mr-1" /> Remove
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="form.errors.items" class="mt-2 text-sm text-red-600">{{ form.errors.items }}</div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6">
                        <Link :href="route('admin.groups.index')" class="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                        <button type="submit" :disabled="form.processing" class="inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600">
                            Save Group
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>
