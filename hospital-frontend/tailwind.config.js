/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50, #f0fdfa)',
          100: 'var(--primary-100, #ccfbf1)',
          200: 'var(--primary-200, #99f6e4)',
          300: 'var(--primary-300, #5eead4)',
          400: 'var(--primary-400, #2dd4bf)',
          500: 'var(--primary-500, #14b8a6)',
          600: 'var(--primary-600, #0d9488)',
          700: 'var(--primary-700, #0f766e)',
          800: 'var(--primary-800, #115e59)',
          900: 'var(--primary-900, #134e4a)',
        },
        secondary: {
          50: 'var(--secondary-50, #f0f9ff)',
          100: 'var(--secondary-100, #e0f2fe)',
          200: 'var(--secondary-200, #bae6fd)',
          300: 'var(--secondary-300, #7dd3fc)',
          400: 'var(--secondary-400, #38bdf8)',
          500: 'var(--secondary-500, #0ea5e9)',
          600: 'var(--secondary-600, #0284c7)',
          700: 'var(--secondary-700, #0369a1)',
          800: 'var(--secondary-800, #075985)',
          900: 'var(--secondary-900, #0c4a6e)',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
