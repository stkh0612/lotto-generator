import { effectScope, nextTick, watch } from 'vue'
import type { Router } from 'vue-router'
import type { I18n } from 'vue-i18n'
import {
  BASE_URL,
  SITE_NAME,
  SUPPORTED_LOCALES,
  ROUTE_SEO_CONFIG,
  resolveLocale,
  resolveRouteSeoKey,
  resolveSeoCopy,
  type SupportedLocale
} from '../seo/config'

const OG_DEFAULT_IMAGE = `${BASE_URL}/og-image.png`
const TWITTER_DEFAULT_IMAGE = `${BASE_URL}/twitter-image.png`
const JSON_LD_ID = 'seo-website-schema'

function setMetaTag(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

function setLinkCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function ensureRobotsTag() {
  const existing = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!existing) {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'robots')
    meta.setAttribute('content', 'index, follow')
    document.head.appendChild(meta)
  }
}

function toAbsoluteUrl(path: string) {
  if (!path || path === '/') {
    return `${BASE_URL}/`
  }
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

function ensureJsonLd(locale: SupportedLocale) {
  let script = document.head.querySelector<HTMLScriptElement>(`#${JSON_LD_ID}`)
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = JSON_LD_ID
    document.head.appendChild(script)
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${BASE_URL}/`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/compare?round={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  script.textContent = JSON.stringify(schema)
}

function updateOgLocale(locale: SupportedLocale) {
  const info = SUPPORTED_LOCALES.find(({ code }) => code === locale)
  if (!info) return
  setMetaTag('property', 'og:locale', info.ogLocale)
}

function applySeo(route: Router['currentRoute']['value'], locale: SupportedLocale) {
  const key = resolveRouteSeoKey(route)
  const config = ROUTE_SEO_CONFIG[key]
  const copy = resolveSeoCopy(key, locale)
  const canonicalUrl = toAbsoluteUrl(route.fullPath || config.path)

  document.title = copy.title
  document.documentElement.setAttribute('lang', locale)

  ensureRobotsTag()
  setMetaTag('name', 'description', copy.description)
  setMetaTag('name', 'keywords', copy.keywords)

  setMetaTag('property', 'og:type', 'website')
  setMetaTag('property', 'og:site_name', SITE_NAME)
  setMetaTag('property', 'og:title', copy.title)
  setMetaTag('property', 'og:description', copy.description)
  setMetaTag('property', 'og:url', canonicalUrl)
  setMetaTag('property', 'og:image', OG_DEFAULT_IMAGE)

  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', copy.title)
  setMetaTag('name', 'twitter:description', copy.description)
  setMetaTag('name', 'twitter:image', TWITTER_DEFAULT_IMAGE)

  updateOgLocale(locale)
  setLinkCanonical(canonicalUrl)
  ensureJsonLd(locale)
}

export function installSeo(router: Router, i18n: I18n) {
  const localeRef = i18n.global.locale as unknown as { value: string }

  const runUpdate = () => {
    const locale = resolveLocale(localeRef?.value)
    applySeo(router.currentRoute.value, locale)
  }

  router.afterEach(() => {
    nextTick(runUpdate)
  })

  const scope = effectScope()
  scope.run(() => {
    watch(
      () => localeRef.value,
      () => nextTick(runUpdate),
      { immediate: true }
    )
  })

  // Initial run in case router.afterEach has not fired yet.
  runUpdate()
}
