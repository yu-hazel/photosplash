import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/photosplash/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/icons/*',
          dest: 'assets/icons',
        },
        {
          src: 'src/assets/images/*',
          dest: 'assets/images',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@recoil': fileURLToPath(new URL('./src/recoil', import.meta.url)),
      '@apis': fileURLToPath(new URL('./src/apis', import.meta.url)),
    },
  },
  // SCSS 전역 사용
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/main.scss";`,
      },
    },
  },
})