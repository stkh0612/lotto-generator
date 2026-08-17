const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vuetify = require('vite-plugin-vuetify')
const vitePrerender = require('vite-plugin-prerender')
const lottoResults = require('./src/assets/lotto_numbers_en.json')

const recentRounds = lottoResults.slice(0, 5).map(r => r.round)
const compareRoutes = recentRounds.map(r => `/compare/${r}`)
const resultsRoutes = recentRounds.map(r => `/results/${r}`)

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
      routes: [
        '/', '/saved', '/compare', '/simulation', '/stats', '/analysis', '/fortune', '/guide', '/results', '/privacy', '/terms',
        '/blog', '/blog/1', '/blog/2', '/blog/3', '/blog/4', '/blog/5', '/about',
        ...compareRoutes,
        ...resultsRoutes
      ],
    }),
  ]
})
