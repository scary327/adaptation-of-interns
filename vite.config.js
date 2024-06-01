import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 80,
    host: true
  },
  server: {
    port: 80,
    host: true
  },
  optimizeDeps: {
    include: ['frappe-gantt-react'],
  },
  build: {
    rollupOptions: {
      external: ['frappe-gantt-react/dist/frappe-gantt.cjs.js'],
    },
  },
})
