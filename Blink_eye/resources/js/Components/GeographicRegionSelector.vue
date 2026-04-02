<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
    locations: { type: Array, required: true },
    modelValue: { type: [Number, String, null], default: '' },
    error: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const selectedState = ref(null);
const selectedDistrict = ref(null);
const selectedCity = ref(null);

const states = computed(() =>
    props.locations.filter(l => l.type === 'state')
);

const districts = computed(() => {
    if (!selectedState.value) return [];
    return props.locations.filter(
        l => l.type === 'district' && l.parent_id === selectedState.value
    );
});

const cities = computed(() => {
    if (!selectedDistrict.value) return [];
    return props.locations.filter(
        l => (l.type === 'city' || l.type === 'village') && l.parent_id === selectedDistrict.value
    );
});

const topLevelCities = computed(() => {
    if (!selectedState.value) return [];
    return props.locations.filter(
        l => (l.type === 'city' || l.type === 'village') && l.parent_id === selectedState.value
    );
});

function buildAncestorChain(locationId) {
    const chain = [];
    let current = props.locations.find(l => l.id === locationId);
    while (current) {
        chain.unshift(current);
        current = current.parent_id ? props.locations.find(l => l.id === current.parent_id) : null;
    }
    return chain;
}

function initializeFromValue() {
    if (!props.modelValue) {
        selectedState.value = null;
        selectedDistrict.value = null;
        selectedCity.value = null;
        return;
    }
    const chain = buildAncestorChain(props.modelValue);
    for (const loc of chain) {
        if (loc.type === 'state') selectedState.value = loc.id;
        else if (loc.type === 'district') selectedDistrict.value = loc.id;
        else if (loc.type === 'city' || loc.type === 'village') selectedCity.value = loc.id;
    }
}

onMounted(initializeFromValue);
watch(() => props.modelValue, (val) => {
    if (val !== selectedCity.value) initializeFromValue();
});

watch(selectedState, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        selectedDistrict.value = null;
        selectedCity.value = null;
        emit('update:modelValue', '');
    }
});

watch(selectedDistrict, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        selectedCity.value = null;
        emit('update:modelValue', '');
    }
});

watch(selectedCity, (val) => {
    emit('update:modelValue', val || '');
});

const typeLabels = {
    state: 'State',
    district: 'District',
    city: 'City',
    village: 'Village',
};
</script>

<template>
    <div class="space-y-4">
        <!-- State -->
        <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">State</label>
            <select
                v-model="selectedState"
                class="block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium appearance-none"
            >
                <option :value="null" disabled>-- Select State --</option>
                <option v-for="s in states" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
            <p v-if="states.length === 0" class="mt-1 text-xs text-amber-600 font-medium">
                No states found. Create locations first at Admin &rarr; Locations.
            </p>
        </div>

        <!-- District -->
        <div v-if="selectedState">
            <label class="block text-sm font-semibold text-slate-700 mb-2">District</label>
            <select
                v-model="selectedDistrict"
                class="block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium appearance-none"
            >
                <option :value="null" disabled>-- Select District --</option>
                <option v-for="d in districts" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
            <p v-if="districts.length === 0 && topLevelCities.length === 0" class="mt-1 text-xs text-amber-600 font-medium">
                No districts or cities under this state. Add them at Admin &rarr; Locations.
            </p>
        </div>

        <!-- City / Village (under district) -->
        <div v-if="selectedDistrict && cities.length > 0">
            <label class="block text-sm font-semibold text-slate-700 mb-2">City / Village</label>
            <select
                v-model="selectedCity"
                class="block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium appearance-none"
            >
                <option :value="null"disabled>-- Select City / Village --</option>
                <option v-for="c in cities" :key="c.id" :value="c.id">
                    {{ c.name }} ({{ typeLabels[c.type] || c.type }})
                </option>
            </select>
        </div>

        <!-- City / Village (directly under state, no district) -->
        <div v-if="selectedState && !selectedDistrict && topLevelCities.length > 0">
            <label class="block text-sm font-semibold text-slate-700 mb-2">City / Village</label>
            <select
                v-model="selectedCity"
                class="block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium appearance-none"
            >
                <option :value="null" disabled>-- Select City / Village --</option>
                <option v-for="c in topLevelCities" :key="c.id" :value="c.id">
                    {{ c.name }} ({{ typeLabels[c.type] || c.type }})
                </option>
            </select>
        </div>

        <!-- Selection summary -->
        <div v-if="modelValue" class="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 font-medium">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>
                Selected:
                <template v-for="(loc, i) in buildAncestorChain(modelValue)" :key="loc.id">
                    <span v-if="i > 0" class="text-slate-400 mx-1">&rarr;</span>
                    {{ loc.name }}
                </template>
            </span>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-sm font-medium text-red-500">{{ error }}</p>
    </div>
</template>
