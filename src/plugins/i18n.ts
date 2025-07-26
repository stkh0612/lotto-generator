import { createI18n } from 'vue-i18n'
import ko from '../locales/ko.json'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

export default createI18n({
  legacy: false,
  locale: 'ko', // 기본 언어
  fallbackLocale: 'en',
  messages: { ko, en, ja }
})
