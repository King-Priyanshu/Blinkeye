import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../Blink_eye/public/hospital-app'),
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    host: process.env.VITE_DEV_HOST || 'localhost',
    allowedHosts: process.env.VITE_DEV_HOST === '0.0.0.0' ? ['localhost', '127.0.0.1'] : undefined,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
