<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
    },
    color: {
        type: String,
        default: 'teal',
    },
    trend: {
        type: String,
        default: null, // 'up', 'down', or null
    },
    trendValue: {
        type: String,
        default: null,
    },
});

const colorMap = {
    teal: { bg: 'bg-teal-50', icon: 'text-teal-600', ring: 'ring-teal-500/20' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', ring: 'ring-amber-500/20' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', ring: 'ring-green-500/20' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', ring: 'ring-emerald-500/20' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', ring: 'ring-red-500/20' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'ring-blue-500/20' },
    cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', ring: 'ring-cyan-500/20' },
    'medical-blue': { bg: 'bg-teal-50', icon: 'text-teal-600', ring: 'ring-teal-500/20' },
    trust: { bg: 'bg-teal-50', icon: 'text-teal-600', ring: 'ring-teal-500/20' },
};
</script>

<template>
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
        <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-500 truncate">{{ title }}</p>
                <div class="flex items-baseline gap-2 mt-1">
                    <p class="text-2xl font-bold text-slate-900">{{ value }}</p>
                    <span v-if="trendValue" :class="[trend === 'up' ? 'text-green-600' : 'text-red-500', 'text-xs font-semibold']">
                        {{ trend === 'up' ? '↑' : '↓' }} {{ trendValue }}
                    </span>
                </div>
            </div>
            <div :class="[colorMap[color]?.bg || 'bg-teal-50', 'h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0']">
                <slot name="icon">
                    <svg :class="[colorMap[color]?.icon || 'text-teal-600', 'h-6 w-6']" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                    </svg>
                </slot>
            </div>
        </div>
    </div>
</template>
