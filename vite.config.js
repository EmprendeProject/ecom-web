import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // Split vendor chunk (React, Router) separado del app code.
    // Vite 8 (Rolldown) requiere manualChunks como función.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
        },
      },
    },
    // Assets < 4 KB se inlinan como base64; los más grandes quedan como archivos separados
    assetsInlineLimit: 4096,
  },
})


