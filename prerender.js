// prerender.js (ESM)
// ① node 18+ ESM에서 dirname 얻기
import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

import fs       from 'fs'
//import path     from 'path'
import http     from 'http'
import serve    from 'serve-static'
import finalh   from 'finalhandler'
import puppeteer from 'puppeteer'

const DIST = path.resolve(__dirname, 'dist')
// 1) serve dist/ on http://localhost:5000
const serveStatic = serve(DIST)
const server = http.createServer((req, res) => {
  serveStatic(req, res, finalh(req, res))
})

async function prerender() {
  await new Promise(r => server.listen(5173, r))
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // 2) 나열한 SPA 경로 방문 → HTML 추출 → 파일 쓰기
  const routes = ['/', '/saved', '/compare']
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
