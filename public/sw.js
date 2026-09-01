// public/sw.js - Lightweight & SEO-safe Service Worker for LottoMate

const CACHE_NAME = 'lottomate-cache-v1'
const STATIC_ASSETS = [
  '/',
  '/leafgrad.svg',
  '/og-image.png',
  '/manifest.webmanifest'
]

// 1. Service Worker 설치 및 기본 자산 프리캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Pre-caching partial failure:', err)
      })
    })
  )
  self.skipWaiting()
})

// 2. 활성화 및 구버전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// 3. 네트워크 요청 처리: 페이지 탐색은 Network-first, 정적 파일은 Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)

  // 외부 도메인 (Google AdSense, Google Analytics, Kakao 등)은 캐싱 제외
  if (url.origin !== self.location.origin) {
    return
  }

  // HTML 페이지 탐색 요청 -> Network-first (실시간 최신 데이터 우선)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          return networkRes
        })
        .catch(() => {
          return caches.match(req).then((cached) => cached || caches.match('/'))
        })
    )
    return
  }

  // 정적 리소스(JS, CSS, 이미지, 폰트) -> Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200 && networkRes.type === 'basic') {
            const resClone = networkRes.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone))
          }
          return networkRes
        })
        .catch(() => cached)

      return cached || fetchPromise
    })
  )
})
