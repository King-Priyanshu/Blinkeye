<script setup>
import { computed } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: 'gray',
    },
    rounded: {
        type: Boolean,
        default: false,
    },
});

const colorClasses = computed(() => {
    const map = {
        gray: 'bg-slate-100 text-slate-600 ring-slate-500/10',
        red: 'bg-red-50 text-red-700 ring-red-600/10',
        yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
        green: 'bg-green-50 text-green-700 ring-green-600/20',
        blue: 'bg-blue-50 text-blue-700 ring-blue-700/10',
        indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
        purple: 'bg-purple-50 text-purple-700 ring-purple-700/10',
        pink: 'bg-pink-50 text-pink-700 ring-pink-700/10',
        teal: 'bg-teal-50 text-teal-700 ring-teal-600/20',
        'medical-blue': 'bg-teal-50 text-teal-700 ring-teal-600/20',
        trust: 'bg-teal-50 text-teal-700 ring-teal-600/20',
        amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
    };
    return map[props.color] || map.gray;
});

const shapeClass = computed(() => (props.rounded ? 'rounded-full' : 'rounded-md'));
</script>

<template>
    <span :class="['inline-flex items-center px-2.5 py-1 text-xs font-medium ring-1 ring-inset', shapeClass, colorClasses]">
        <slot />
    </span>
</template>
