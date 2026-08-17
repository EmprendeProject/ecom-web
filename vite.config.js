import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      // Comprimir GIFs (mantiene animación)
      gifsicle: {
        optimizationLevel: 3,
        interlaced: false,
      },
      // Comprimir PNGs con optipng
      optipng: {
        optimizationLevel: 5,
      },
      // Comprimir PNGs con pngquant (pérdida mínima, gran reducción)
      pngquant: {
        quality: [0.75, 0.90],
        speed: 4,
      },
      // Comprimir JPEGs con mozjpeg
      mozjpeg: {
        quality: 82,
        progressive: true,
      },
      // Minificar SVGs
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
      // Convertir PNG/JPEG → WebP (formato moderno, ~30-80% más liviano)
      webp: {
        quality: 82,
        method: 6,
      },
    }),
  ],
})
