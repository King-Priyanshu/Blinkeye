import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'medical-blue': {
                    50: '#f0f7ff',
                    100: '#e0effe',
                    200: '#bae0fd',
                    300: '#7cc7fc',
                    400: '#36abf9',
                    500: '#0c8fec',
                    600: '#0070cb',
                    700: '#0059a4',
                    800: '#024c87',
                    900: '#084071',
                    950: '#05294c',
                },
                'trust': {
                    light: '#14b8a6', // teal-500
                    DEFAULT: '#0f766e', // teal-700
                    dark: '#134e4a', // teal-900
                }
            }
        },
    },

    plugins: [forms, typography],
};
