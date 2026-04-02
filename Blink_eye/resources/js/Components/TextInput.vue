<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel({
    type: String,
    required: true,
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input
        class="rounded-xl border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3 px-4 bg-slate-50/50 transition-colors"
        v-model="model"
        ref="input"
    />
</template>
