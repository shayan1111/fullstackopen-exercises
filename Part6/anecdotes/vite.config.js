import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import '@testing-library/jest-dom/vitest'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
  }
})
