const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vuetify = require('vite-plugin-vuetify')
const vitePrerender = require('vite-plugin-prerender')

module.exports = defineConfig({
  base: '/',
  server: {
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Explicitly check URL start to avoiding path stripping issues
        if (req.url.startsWith('/.netlify/functions/lotto')) {
          try {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const round = url.searchParams.get('round')

            console.log(`[Vite Proxy] Intercepted: ${req.url}`)

            if (!round) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'round param missing' }))
              return
            }

            const targetUrl = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`
            console.log(`[Vite Proxy] Forwarding to: ${targetUrl}`)

            // Native fetch (Node 18+)
            const upstream = await fetch(targetUrl)
            const text = await upstream.text()

            res.setHeader('Content-Type', 'application/json')
            res.statusCode = upstream.status
            res.end(text)
            return // End response here
          } catch (e) {
            console.error('[Vite Proxy Error]', e)
            res.statusCode = 502
            res.end(JSON.stringify({ error: 'Proxy Error' }))
            return
          }
        }
        // Not matched -> continue
        next()
      })
    }
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    vitePrerender({
      staticDir: require('path').join(__dirname, 'dist'),
      routes: ['/', '/saved', '/compare', '/results', '/stats', '/analysis', '/fortune', '/guide'],
    }),
  ]
})
