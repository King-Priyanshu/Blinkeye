<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

        <div v-if="status" class="mb-4 text-sm font-medium text-teal-600 bg-teal-50 p-4 rounded-xl border border-teal-100">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="space-y-6">
            <div>
                <InputLabel for="email" value="Email" class="text-slate-700 font-medium mb-1.5 ml-1" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                    placeholder="Enter your email"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div>
                <div class="flex items-center justify-between mb-1.5 px-1">
                    <InputLabel for="password" value="Password" class="text-slate-700 font-medium" />
                    <Link
                        v-if="canResetPassword"
                        :href="route('password.request')"
                        class="text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                    placeholder="••••••••"
                />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="block">
                <label class="flex items-center group cursor-pointer">
                    <Checkbox name="remember" v-model:checked="form.remember" class="border-slate-300 text-teal-600 focus:ring-teal-500 rounded text-base cursor-pointer" />
                    <span class="ms-3 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors"
                        >Remember me</span
                    >
                </label>
            </div>

            <div class="pt-2 flex flex-col gap-4">
                <PrimaryButton
                    class="w-full text-base py-3.5"
                    :class="{ 'opacity-50 cursor-not-allowed': form.processing }"
                    :disabled="form.processing"
                >
                    Sign in to Account
                </PrimaryButton>
                
                <p class="text-center text-sm text-slate-500">
                    Not a member? 
                    <Link :href="route('register')" class="font-semibold text-teal-600 hover:text-teal-500 transition-colors">Apply for care</Link>
                </p>
            </div>
        </form>
    </GuestLayout>
</template>
