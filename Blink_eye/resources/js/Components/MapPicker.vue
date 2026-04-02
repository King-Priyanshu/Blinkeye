<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue';
import L from 'leaflet';

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({ lat: null, lng: null })
    },
    zoom: {
        type: Number,
        default: 12
    },
    height: {
        type: String,
        default: '300px'
    }
});

const emit = defineEmits(['update:modelValue']);

const mapContainer = ref(null);
let map = null;
let marker = null;

// Fix Leaflet default marker icon issue
const fixLeafletIcons = () => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
};

const initMap = () => {
    if (!mapContainer.value) return;

    // Default center - India
    const defaultCenter = [20.5937, 78.9629];
    const center = props.modelValue.lat && props.modelValue.lng 
        ? [props.modelValue.lat, props.modelValue.lng] 
        : defaultCenter;

    map = L.map(mapContainer.value).setView(center, props.zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker if coordinates exist
    if (props.modelValue.lat && props.modelValue.lng) {
        marker = L.marker([props.modelValue.lat, props.modelValue.lng], { draggable: true }).addTo(map);
    }

    // Click handler to set marker
    map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        updateMarker(lat, lng);
    });

    // Marker drag handler
    if (marker) {
        marker.on('dragend', (e) => {
            const pos = e.target.getLatLng();
            emit('update:modelValue', { lat: pos.lat, lng: pos.lng });
        });
    }
};

const updateMarker = (lat, lng) => {
    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng], { draggable: true }).addTo(map);
        marker.on('dragend', (e) => {
            const pos = e.target.getLatLng();
            emit('update:modelValue', { lat: pos.lat, lng: pos.lng });
        });
    }
    emit('update:modelValue', { lat, lng });
};

const clearMarker = () => {
    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
    emit('update:modelValue', { lat: null, lng: null });
};

watch(() => props.modelValue, (newVal) => {
    if (map && newVal.lat && newVal.lng) {
        if (!marker) {
            marker = L.marker([newVal.lat, newVal.lng], { draggable: true }).addTo(map);
            marker.on('dragend', (e) => {
                const pos = e.target.getLatLng();
                emit('update:modelValue', { lat: pos.lat, lng: pos.lng });
            });
        } else {
            marker.setLatLng([newVal.lat, newVal.lng]);
        }
        map.setView([newVal.lat, newVal.lng], props.zoom);
    }
}, { deep: true });

onMounted(() => {
    fixLeafletIcons();
    initMap();
});

onUnmounted(() => {
    if (map) {
        map.remove();
    }
});

defineExpose({
    clearMarker
});
</script>

<template>
    <div class="space-y-2">
        <div 
            ref="mapContainer" 
            :style="{ height: height, width: '100%' }"
            class="rounded-lg border border-gray-300 z-0"
        ></div>
        <div class="flex items-center gap-2 text-sm">
            <input 
                type="text" 
                :value="modelValue.lat || ''"
                @input="emit('update:modelValue', { ...modelValue, lat: parseFloat($event.target.value) || null })"
                placeholder="Latitude"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"
            />
            <input 
                type="text" 
                :value="modelValue.lng || ''"
                @input="emit('update:modelValue', { ...modelValue, lng: parseFloat($event.target.value) || null })"
                placeholder="Longitude"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"
            />
            <button 
                type="button"
                @click="clearMarker"
                class="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
            >
                Clear
            </button>
        </div>
        <p class="text-xs text-gray-500">Click on the map to set coordinates or drag the marker</p>
    </div>
</template>
