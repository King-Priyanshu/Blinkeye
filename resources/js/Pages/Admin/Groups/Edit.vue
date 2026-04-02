<script setup>
import { ref, computed, onMounted } from 'vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { TrashIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    group: Object,
    locations: Array,
    diseases: Array,
    services: Array,
});

const form = useForm({
    name: props.group.name,
    type: props.group.type,
    is_active: props.group.is_active,
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

onMounted(() => {
    // Populate existing items
    if (props.group.items && props.group.items.length > 0) {
        props.group.items.forEach(pivot => {
            // Find the display name from the available options
            const opt = availableOptions.value.find(o => o.id === pivot.item_id);
            if (opt) {
                form.items.push({
                    item_id: pivot.item_id,
                    item_type: pivot.item_type,
                    _display_name: opt.name,
                });
            }
        });
    }
});

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
    if (confirm("Changing the Entity Type will clear all currently assigned entities. Continue?")) {
        form.items = [];
        selectedItemToAdd.value = '';
    } else {
        // Revert to original type
        form.type = props.group.type;
    }
};

const submit = () => {
    form.put(route('admin.groups.update', props.group.id));
};

const generatedPagesPreview = computed(() => {
    if (!props.group.blogs || props.group.blogs.length === 0 || form.items.length === 0) return [];
    
    let pages = [];
    props.group.blogs.forEach(template => {
        form.items.forEach(item => {
            let slug = template.slug_template;
            let title = template.title_template;
            
            // Very basic find-and-replace simulation for preview
            const tokenName = item.item_type.split('\\').pop().toLowerCase();
            const safeName = item._display_name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            slug = slug.replace(new RegExp(`{{${tokenName}.slug}}`, 'g'), safeName)
                       .replace(new RegExp(`{{${tokenName}.name}}`, 'g'), safeName)
                       .replace(new RegExp(`{{location.slug}}`, 'g'), safeName); // Fallback assumption
                       
            title = title.replace(new RegExp(`{{${tokenName}.name}}`, 'g'), item._display_name)
                         .replace(new RegExp(`{{location.name}}`, 'g'), item._display_name); // Fallback
                         
            pages.push({
                template_name: template.title_template,
                generated_slug: slug,
                generated_title: title,
                status: template.is_active ? 'Active' : 'Draft'
            });
        });
    });
    
    return pages;
});

const destroy = () => {
    if (confirm('Are you absolutely sure you want to delete this group? Any Blog content linked to this group may become inaccessible.')) {
        form.delete(route('admin.groups.destroy', props.group.id));
    }
}
</script>

<template>
    <Head title="Edit Taxonomy Group" />

    <AdminLayout>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Edit Group: {{ group.name }}</h1>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center space-x-4">
                <Link
                    :href="route('admin.groups.index')"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Back
                </Link>
                <button
                    @click="destroy"
                    class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                    <TrashIcon class="h-4 w-4 mr-1" />
                    Delete
                </button>
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
                            Update Group
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Live Preview Matrix -->
        <div class="mt-8 max-w-5xl bg-white shadow sm:rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <div>
                    <h3 class="text-base font-semibold leading-6 text-gray-900">SEO Page Generation Matrix</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        Live preview of the blog pages that will be automatically generated for this taxonomy group based on assigned Templates.
                    </p>
                </div>
                <div class="text-sm font-semibold text-medical-blue-600">
                    Total Pages: {{ generatedPagesPreview.length }}
                </div>
            </div>
            
            <div class="px-4 py-5 sm:px-6">
                <div v-if="generatedPagesPreview.length === 0" class="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <p class="text-sm text-gray-500">Add entities to this group and assign Blog Templates to see the generation matrix.</p>
                </div>
                
                <table v-else class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Generated URL Slug</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Compiled Title</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Source Template</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="(page, idx) in generatedPagesPreview" :key="idx">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-medical-blue-600 sm:pl-6">
                                /blog/{{ page.generated_slug }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ page.generated_title }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span class="truncate block max-w-xs">{{ page.template_name }}</span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span :class="[page.status === 'Active' ? 'text-green-700 bg-green-50 ring-green-600/20' : 'text-gray-600 bg-gray-50 ring-gray-500/10', 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset']">
                                    {{ page.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </AdminLayout>
</template>
