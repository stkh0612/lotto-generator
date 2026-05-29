// prerender.js (ESM)
// ① node 18+ ESM에서 dirname 얻기
// import { fileURLToPath } from 'url'
// import path from 'path'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname  = path.dirname(__filename)

const fs = require('fs')
const path = require('path')
const http = require('http')
const serve = require('serve-static')
const finalh = require('finalhandler')
const puppeteer = require('puppeteer')

const DIST = path.resolve(__dirname, 'dist')
// 1) serve dist/ on http://localhost:5000
const serveStatic = serve(DIST)
const server = http.createServer((req, res) => {
  // SPA Fallback: rewrite any clean path without a file extension to serve index.html
  const urlPath = req.url.split('?')[0]
  if (!path.extname(urlPath)) {
    req.url = '/index.html'
  }
  serveStatic(req, res, finalh(req, res))
})

const lottoResults = require('./src/assets/lotto_numbers_en.json')

async function prerender() {
  await new Promise(r => server.listen(5173, r))
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // 2) 나열한 SPA 경로 방문 → HTML 추출 → 파일 쓰기
  const baseRoutes = ['/', '/saved', '/compare', '/results', '/stats', '/analysis', '/fortune', '/guide', '/simulation']
  const recentRounds = lottoResults.slice(0, 5).map(r => r.round)
  const compareRoutes = recentRounds.map(r => `/compare/${r}`)
  const resultsRoutes = recentRounds.map(r => `/results/${r}`)
  const routes = [...baseRoutes, ...compareRoutes, ...resultsRoutes]

  for (const route of routes) {
    const url = `http://localhost:5173${route}`
    await page.goto(url, { waitUntil: 'networkidle0' })
    const html = await page.content()

    // determine output file path
    const outDir = path.join(DIST, route === '/' ? '' : route)
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'index.html'), html)
    console.log(`✓ prerendered ${route}`)
  }

  await browser.close()
  server.close()
}

prerender().catch(err => {
  console.error(err)
  process.exit(1)
})
