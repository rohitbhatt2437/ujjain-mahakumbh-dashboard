import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
  build: {
    outDir: 'dist',
  },
  // This ensures that the router works correctly on page refresh
  // by returning the index.html for any route that doesn't exist
  appType: 'spa'
})
