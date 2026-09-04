import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

/* Vuetify 스타일 · 아이콘 */
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import { installSeo } from './plugins/seo'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

installSeo(router, i18n)

function initAnalyticsAndAds() {
  const host = window.location.hostname
  const userAgent = navigator.userAgent || ''
  const isHeadless = userAgent.includes('Headless') || userAgent.includes('Prerender') || (window as any).__PRERENDER_INJECTED
  
  if ((host === 'lottomate.life' || host.endsWith('netlify.app')) && !isHeadless) {
    // 1) Load Google AdSense (single load safeguard)
    if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      const adsenseScript = document.createElement('script')
      adsenseScript.async = true
      adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3971187501349159'
      adsenseScript.setAttribute('crossorigin', 'anonymous')
      document.head.appendChild(adsenseScript)
    }

    // 2) Load Google Analytics
    const gaScript = document.createElement('script')
    gaScript.async = true
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-LMKESBRXMP'
    document.head.appendChild(gaScript)

    // 3) Init gtag
    const anyWin = window as any
    anyWin.dataLayer = anyWin.dataLayer || []
    anyWin.gtag = function () {
      anyWin.dataLayer.push(arguments)
    }
    anyWin.gtag('js', new Date())
    anyWin.gtag('config', 'G-LMKESBRXMP')
  }
}

function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const userAgent = navigator.userAgent || ''
    const isHeadless = userAgent.includes('Headless') || userAgent.includes('Prerender') || (window as any).__PRERENDER_INJECTED
    if (!isHeadless) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope)
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err)
          })
      })
    }
  }
}

initAnalyticsAndAds()
registerServiceWorker()

app.mount('#app')
