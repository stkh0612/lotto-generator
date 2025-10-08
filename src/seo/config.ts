import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const BASE_URL = 'https://lottomate.life'
export const SITE_NAME = 'LottoMate'

export const SUPPORTED_LOCALES = [
  { code: 'ko', hrefLang: 'ko', ogLocale: 'ko_KR' },
  { code: 'en', hrefLang: 'en', ogLocale: 'en_US' },
  { code: 'ja', hrefLang: 'ja', ogLocale: 'ja_JP' }
] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]['code']

export const DEFAULT_LOCALE: SupportedLocale = 'ko'

export type RouteSeoKey = 'home' | 'saved' | 'compare' | 'results' | 'stats' | 'guide'

interface LocaleCopy {
  title: string
  description: string
  keywords: string
}

interface RouteSeoConfig {
  path: string
  changefreq: 'daily' | 'weekly' | 'monthly'
  priority: number
  copy: Record<SupportedLocale, LocaleCopy>
}

export const ROUTE_SEO_CONFIG: Record<RouteSeoKey, RouteSeoConfig> = {
  home: {
    path: '/',
    changefreq: 'daily',
    priority: 1,
    copy: {
      ko: {
        title: '로또메이트 · 로또 번호 생성기 & 당첨 확인',
        description:
          '중복 없는 로또 번호를 자동으로 만들고 저장하며 지난 회차 당첨 결과까지 확인할 수 있는 올인원 로또 도우미입니다.',
        keywords: '로또메이트, 로또 번호 생성기, 로또 당첨 확인, 번호 추천, 무료 로또'
      },
      en: {
        title: 'LottoMate · Smart Lotto Number Generator & Result Checker',
        description:
          'Generate unique lotto numbers, save your favorite tickets, and compare them with past draw results in one smart interface.',
        keywords: 'LottoMate, lotto number generator, lottery results checker, lucky numbers, lotto tips'
      },
      ja: {
        title: 'LottoMate · ロト番号ジェネレーターと当選チェック',
        description:
          '重複なしでロト番号を自動生成し、保存して過去の当選結果と照合できるオールインワンロト支援ツールです。',
        keywords: 'LottoMate, ロト番号ジェネレーター, 当選チェック, ロト6, ロト結果'
      }
    }
  },
  saved: {
    path: '/saved',
    changefreq: 'weekly',
    priority: 0.8,
    copy: {
      ko: {
        title: '저장한 로또 번호 관리 · 로또메이트',
        description: '최대 5게임까지 저장한 로또 번호를 한눈에 확인하고 이미지로 내려받아 보관하세요.',
        keywords: '로또 번호 저장, 로또 이미지 저장, 로또메이트 저장 번호'
      },
      en: {
        title: 'Manage Saved Lotto Numbers · LottoMate',
        description: 'Review up to five saved lotto tickets and export them as images for easy sharing.',
        keywords: 'saved lotto numbers, lotto ticket export, LottoMate saved tickets'
      },
      ja: {
        title: '保存したロト番号の管理 · LottoMate',
        description: '最大5ゲームまで保存したロト番号を確認し、画像としてダウンロードできます。',
        keywords: 'ロト番号保存, ロト画像ダウンロード, LottoMate 保存番号'
      }
    }
  },
  compare: {
    path: '/compare',
    changefreq: 'weekly',
    priority: 0.8,
    copy: {
      ko: {
        title: '회차별 로또 당첨 번호 비교 · 로또메이트',
        description: '회차를 선택해 당첨 번호를 확인하고 보너스 번호까지 함께 비교해 보세요.',
        keywords: '로또 당첨 번호, 회차별 당첨, 로또 비교'
      },
      en: {
        title: 'Compare Lotto Winning Numbers by Draw · LottoMate',
        description: 'Select a draw to review the winning numbers and bonus ball together in seconds.',
        keywords: 'lotto winning numbers, draw comparison, lotto bonus number'
      },
      ja: {
        title: '抽選回ごとのロト当選番号比較 · LottoMate',
        description: '抽選回を選んで当選番号とボーナス番号をまとめて確認しましょう。',
        keywords: 'ロト当選番号, 抽選結果比較, ボーナス番号'
      }
    }
  },
  results: {
    path: '/results',
    changefreq: 'daily',
    priority: 0.9,
    copy: {
      ko: {
        title: '실시간 로또 당첨 결과 조회 · 로또메이트',
        description: '회차를 입력해 실시간 로또 당첨 결과를 확인하고 내가 가진 번호와 즉시 비교해 보세요.',
        keywords: '로또 당첨 조회, 로또 실시간 결과, 당첨 비교'
      },
      en: {
        title: 'Real-Time Lotto Results Checker · LottoMate',
        description: 'Enter a draw number to fetch lotto winning results and compare them with your selection instantly.',
        keywords: 'lotto results checker, real-time lottery results, match lotto numbers'
      },
      ja: {
        title: 'ロト当選結果を即時チェック · LottoMate',
        description: '抽選回を入力してロトの当選結果を取得し、手元の番号とすぐに照合できます。',
        keywords: 'ロト当選結果, リアルタイムロト, 番号照合'
      }
    }
  },
  stats: {
    path: '/stats',
    changefreq: 'monthly',
    priority: 0.6,
    copy: {
      ko: {
        title: '로또 번호 통계 & 빈도 분석 · 로또메이트',
        description: '누적 데이터로 계산한 번호별 출현 빈도와 꼬리 숫자 분포를 통해 전략을 세워 보세요.',
        keywords: '로또 통계, 출현 빈도, 로또 분석'
      },
      en: {
        title: 'Lotto Number Statistics & Frequency Analysis · LottoMate',
        description: 'Use aggregated draw data to review number frequency and tail distribution for better lotto strategies.',
        keywords: 'lotto statistics, number frequency, lotto analysis'
      },
      ja: {
        title: 'ロト番号の統計と頻度分析 · LottoMate',
        description: '累積データをもとに番号ごとの出現頻度や下一桁の分布をチェックして戦略を立てましょう。',
        keywords: 'ロト統計, 出現頻度, ロト分析'
      }
    }
  },
  guide: {
    path: '/guide',
    changefreq: 'monthly',
    priority: 0.5,
    copy: {
      ko: {
        title: '로또 초보자를 위한 가이드 · 로또메이트',
        description: '로또 규칙, 참여 방법, 보관 팁 등 필수 정보를 정리한 가이드를 확인하세요.',
        keywords: '로또 가이드, 로또 규칙, 로또 팁'
      },
      en: {
        title: 'Beginner\'s Guide to Lotto · LottoMate',
        description: 'Learn lotto rules, how to participate, and storage tips in one concise guide.',
        keywords: 'lotto guide, lotto rules, lotto tips'
      },
      ja: {
        title: 'ロト初心者ガイド · LottoMate',
        description: 'ロトのルールや購入方法、保管のコツなど知っておきたい情報をまとめています。',
        keywords: 'ロトガイド, ロトルール, ロトのコツ'
      }
    }
  }
}

export function resolveLocale(raw: string | undefined): SupportedLocale {
  const locale = raw?.toLowerCase() as SupportedLocale | undefined
  return SUPPORTED_LOCALES.some(({ code }) => code === locale) ? locale! : DEFAULT_LOCALE
}

export function resolveRouteSeoKey(route: RouteLocationNormalizedLoaded): RouteSeoKey {
  const key = route.meta?.seoKey
  if (typeof key === 'string' && key in ROUTE_SEO_CONFIG) {
    return key as RouteSeoKey
  }
  return 'home'
}

export function resolveSeoCopy(key: RouteSeoKey, locale: SupportedLocale) {
  return ROUTE_SEO_CONFIG[key].copy[locale]
}
