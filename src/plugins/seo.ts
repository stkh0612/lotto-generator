import { effectScope, nextTick, watch } from 'vue'
import type { Router } from 'vue-router'
import type { I18n } from 'vue-i18n'
import lottoResults from '../assets/lotto_numbers_en.json'
import blogPosts from '../assets/blog_posts.json'
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

function updateHrefLangLinks(routeFullPath: string) {
  // 기존의 hreflang 링크 제거
  const existingLinks = document.head.querySelectorAll('link[rel="alternate"][hreflang]')
  existingLinks.forEach(el => el.remove())

  // 경로 및 기타 쿼리스트링 파싱 (lang은 제외)
  const [pathname, search] = routeFullPath.split(/[?#]/)
  let formattedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const lastSegment = formattedPath.split('/').pop() || ''
  if (!lastSegment.includes('.') && !formattedPath.endsWith('/')) {
    formattedPath += '/'
  }

  let queryString = ''
  if (search) {
    const params = new URLSearchParams(search)
    params.delete('lang')
    const qs = params.toString()
    if (qs) {
      queryString = `?${qs}`
    }
  }

  const basePageUrl = `${BASE_URL}${formattedPath}${queryString}`

  // 각 지원하는 로케일별로 alternate 링크 생성
  SUPPORTED_LOCALES.forEach(({ code, hrefLang }) => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'alternate')
    link.setAttribute('hreflang', hrefLang)
    
    let url = basePageUrl
    if (code !== 'ko') {
      url += (queryString ? '&' : '?') + `lang=${code}`
    }
    
    link.setAttribute('href', url)
    document.head.appendChild(link)
  })

  // x-default 주입 (한국어 기준)
  const defaultLink = document.createElement('link')
  defaultLink.setAttribute('rel', 'alternate')
  defaultLink.setAttribute('hreflang', 'x-default')
  defaultLink.setAttribute('href', basePageUrl)
  document.head.appendChild(defaultLink)
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
  const [pathname, search] = path.split(/[?#]/)
  const suffix = path.slice(pathname.length)
  let formattedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const lastSegment = formattedPath.split('/').pop() || ''
  if (!lastSegment.includes('.') && !formattedPath.endsWith('/')) {
    formattedPath += '/'
  }
  return `${BASE_URL}${formattedPath}${suffix}`
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

function ensureBlogPostingJsonLd(route: Router['currentRoute']['value'], locale: SupportedLocale) {
  const BLOG_LD_ID = 'seo-blogposting-schema'
  let script = document.head.querySelector<HTMLScriptElement>(`#${BLOG_LD_ID}`)
  
  const key = resolveRouteSeoKey(route)
  if (key !== 'blogPost') {
    if (script) script.remove()
    return
  }

  const idParam = route.query.id || route.params.id
  if (!idParam) {
    if (script) script.remove()
    return
  }

  const postId = Number(idParam)
  const foundPost = blogPosts.find((p: any) => p.id === postId)
  if (!foundPost) {
    if (script) script.remove()
    return
  }

  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = BLOG_LD_ID
    document.head.appendChild(script)
  }

  const canonicalUrl = toAbsoluteUrl(route.fullPath)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': canonicalUrl,
    'headline': foundPost.title,
    'description': foundPost.summary,
    'datePublished': foundPost.date,
    'author': {
      '@type': 'Organization',
      'name': foundPost.author || SITE_NAME
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/og-image.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  }

  script.textContent = JSON.stringify(schema)
}

function updateOgLocale(locale: SupportedLocale) {
  const info = SUPPORTED_LOCALES.find(({ code }) => code === locale)
  if (!info) return
  setMetaTag('property', 'og:locale', info.ogLocale)
}

function getRoundNumbersText(roundVal: string | number | (string | null)[]) {
  const rNum = Number(roundVal)
  if (isNaN(rNum)) return ''
  const found = lottoResults.find((r: any) => r.round === rNum)
  if (found) {
    return `${found.num1}, ${found.num2}, ${found.num3}, ${found.num4}, ${found.num5}, ${found.num6} (보너스 ${found.bonus})`
  }
  return ''
}

function applySeo(route: Router['currentRoute']['value'], locale: SupportedLocale) {
  const key = resolveRouteSeoKey(route)
  const config = ROUTE_SEO_CONFIG[key]
  const copy = resolveSeoCopy(key, locale)
  const canonicalUrl = toAbsoluteUrl(route.fullPath || config.path)

  let title = copy.title
  let description = copy.description
  const keywords = copy.keywords

  // 블로그 상세 포스트 동적 SEO 처리
  if (key === 'blogPost') {
    const idParam = route.params.id
    if (idParam) {
      const postId = Number(idParam)
      const foundPost = blogPosts.find((p: any) => p.id === postId)
      if (foundPost) {
        title = `${foundPost.title} · 로또메이트 블로그`
        description = foundPost.summary
      }
    }
  }

  // 동적 회차 쿼리(?round=XXXX)나 경로 파라미터(:round)가 한국어 로케일에서 있을 때 SEO 정보를 고도화
  const roundParam = route.query.round || route.params.round
  if (locale === 'ko' && roundParam) {
    const roundStr = String(roundParam)
    const numbersText = getRoundNumbersText(roundStr)

    if (key === 'compare') {
      title = `제 ${roundStr}회 역대로또번호조회 및 당첨 결과 비교 · 로또메이트`
      description = `제 ${roundStr}회 역대로또번호조회 당첨결과 정보 및 로또 번호 개수 비교 기능 제공.`
      if (numbersText) {
        description += ` 당첨번호: ${numbersText}`
      }
    } else if (key === 'results') {
      title = `제 ${roundStr}회 로또당첨번호조회 및 오늘로또번호 확인 · 로또메이트`
      description = `제 ${roundStr}회 이번주 로또번호 및 오늘로또번호 조회 실시간 확인.`
      if (numbersText) {
        description += ` 당첨번호는 ${numbersText} 입니다.`
      }
    }
  }

  document.title = title
  document.documentElement.setAttribute('lang', locale)

  ensureRobotsTag()
  setMetaTag('name', 'description', description)
  setMetaTag('name', 'keywords', keywords)

  setMetaTag('property', 'og:type', 'website')
  setMetaTag('property', 'og:site_name', SITE_NAME)
  setMetaTag('property', 'og:title', title)
  setMetaTag('property', 'og:description', description)
  setMetaTag('property', 'og:url', canonicalUrl)
  setMetaTag('property', 'og:image', OG_DEFAULT_IMAGE)

  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', title)
  setMetaTag('name', 'twitter:description', description)
  setMetaTag('name', 'twitter:image', TWITTER_DEFAULT_IMAGE)

  updateOgLocale(locale)
  setLinkCanonical(canonicalUrl)
  updateHrefLangLinks(route.fullPath)
  ensureJsonLd(locale)
  ensureBlogPostingJsonLd(route, locale)
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
