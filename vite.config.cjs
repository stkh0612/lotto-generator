// vite.config.ts
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vuetify from 'vite-plugin-vuetify'

// import path from 'path'
// import vitePrerender from 'vite-plugin-prerender'

// export default defineConfig({
//   base: '/',
//   plugins: [
//     vue(),
//     vuetify({ 
//       autoImport: true,    // Vuetify 컴포넌트를 자동 import
//     }),
//     vitePrerender({
//       // 필수: 빌드 결과물이 위치할 경로
//       staticDir: path.join(__dirname, 'dist'),
      
//       // 필수: 사전 렌더링할 라우트 목록
//       routes: ['/', '/saved', '/compare'],
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
// })
const { defineConfig } = require('vite')
const vue   = require('@vitejs/plugin-vue')
const vuetify = require('vite-plugin-vuetify')
const vitePrerender = require('vite-plugin-prerender')

module.exports = defineConfig({
  base: '/',
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    vitePrerender({
      staticDir: require('path').join(__dirname, 'dist'),
      routes: ['/', '/saved', '/compare'],
    }),
  ]
})