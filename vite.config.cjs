const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vuetify = require('vite-plugin-vuetify')
const vitePrerender = require('vite-plugin-prerender')

module.exports = defineConfig({
  base: '/',
  server: {
    // Proxy removed: Using client-side simulation instead of API
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    vitePrerender({
      staticDir: require('path').join(__dirname, 'dist'),
      routes: ['/', '/saved', '/compare', '/simulation', '/stats', '/analysis', '/fortune', '/guide'],
    }),
  ]
})
