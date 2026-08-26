import { createI18n } from 'vue-i18n'
import ko from '../locales/ko.json'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

const SUPPORTED_CODES = ['ko', 'en', 'ja'] as const
type SupportedLocale = (typeof SUPPORTED_CODES)[number]

function getInitialLocale(): SupportedLocale {
  if (typeof window === 'undefined') {
    return 'ko'
  }

  // 1. URL 쿼리 파라미터 확인 (?lang=en)
  const params = new URLSearchParams(window.location.search)
  const langQuery = params.get('lang')?.toLowerCase()
  if (langQuery && SUPPORTED_CODES.includes(langQuery as SupportedLocale)) {
    localStorage.setItem('lottomate-locale', langQuery)
    return langQuery as SupportedLocale
  }

  // 2. localStorage 확인
  const savedLocale = localStorage.getItem('lottomate-locale')?.toLowerCase()
  if (savedLocale && SUPPORTED_CODES.includes(savedLocale as SupportedLocale)) {
    return savedLocale as SupportedLocale
  }

  // 3. 브라우저 언어 설정 확인
  const browserLang = navigator.language.split('-')[0].toLowerCase()
  if (SUPPORTED_CODES.includes(browserLang as SupportedLocale)) {
    return browserLang as SupportedLocale
  }

  return 'ko'
}

const initialLocale = getInitialLocale()

export default createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: { ko, en, ja }
})
