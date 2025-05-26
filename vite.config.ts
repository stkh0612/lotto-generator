// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ 
      autoImport: true,    // Vuetify 컴포넌트를 자동 import
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
