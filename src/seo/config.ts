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

export type RouteSeoKey = 'home' | 'saved' | 'compare' | 'simulation' | 'stats' | 'guide' | 'analysis' | 'fortune' | 'results'

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
        title: '로또메이트 · 무료 로또번호 자동생성 및 추천',
        description:
          '로또메이트에서 과학적인 필터링 알고리즘으로 중복 없는 로또번호 자동생성 및 추출 서비스를 이용해 보세요. 행운의 로또번호 추천부터 저장까지 모두 제공합니다.',
        keywords: '로또번호 자동생성, 로또번호 추천, 로또번호생성, 로또번호추출, 로또번호 추천해줘, 무료 로또, 로또메이트'
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
        title: '저장한 로또 번호 개수 및 목록 관리 · 로또메이트',
        description: '로또메이트에서 자동으로 생성한 로또 번호 개수와 저장된 목록을 확인하고, 번호 이미지 다운로드 기능을 통해 편리하게 관리하세요.',
        keywords: '로또 번호 개수, 로또 번호 저장, 로또 이미지 저장, 로또메이트'
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
        title: '역대로또번호조회 및 당첨 결과 비교 · 로또메이트',
        description: '역대로또번호조회 전체 내역과 대조해 당첨결과를 비교하고 일치하는 로또 번호 개수 및 등수를 실시간으로 확인해 보세요.',
        keywords: '역대로또번호조회, 로또번호조회, 로또 번호 개수, 로또 당첨결과 비교, 로또메이트'
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
  simulation: {
    path: '/simulation',
    changefreq: 'daily',
    priority: 0.9,
    copy: {
      ko: {
        title: '로또번호 예측 및 가상 수익률 시뮬레이터 · 로또메이트',
        description: '내가 지정한 번호의 과거 당첨 기여도를 계산하고 가상 시뮬레이션을 통해 로또번호 예측 및 모의 수익률을 시뮬레이션해 보세요.',
        keywords: '로또번호 예측, 로또 시뮬레이션, 로또 타임머신, 로또 가상 체험, 로또 수익률'
      },
      en: {
        title: 'Lotto Time Machine (Simulator) · LottoMate',
        description: 'What if you played these numbers for the past 20 years? Calculate your hypothetical ROI based on historical data.',
        keywords: 'lotto simulator, lotto time machine, lottery roi, virtual lottery'
      },
      ja: {
        title: 'ロトタイムマシン（シミュレーター） · LottoMate',
        description: 'もし過去20年間この番号を買い続けていたら？過去のデータをもとに仮想収益率を計算します。',
        keywords: 'ロトシミュレーター, ロトタイムマシン, ロト収益率'
      }
    }
  },
  stats: {
    path: '/stats',
    changefreq: 'monthly',
    priority: 0.6,
    copy: {
      ko: {
        title: '로또 번호 개수 통계 및 출현 빈도 분석 · 로또메이트',
        description: '역대 당첨 데이터를 분석하여 자주 출현한 로또 번호 개수와 숫자 분포, 홀짝 비율 등 유용한 통계 자료를 제공합니다.',
        keywords: '로또 번호 개수, 로또 통계, 출현 빈도, 로또 분석, 로또메이트'
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
        title: '로또 초보 가이드: 규칙부터 당첨 번호 개수까지 · 로또메이트',
        description: '로또 당첨금 수령 방법, 실수령액 계산, 당첨에 필요한 로또 번호 개수와 규칙 등 기초적인 가이드를 정리해 드립니다.',
        keywords: '로또 번호 개수, 로또 가이드, 로또 규칙, 로또 팁, 로또메이트'
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
  },
  analysis: {
    path: '/analysis',
    changefreq: 'weekly',
    priority: 0.7,
    copy: {
      ko: {
        title: '로또 패턴 정밀 분석 및 통계 분석기 · 로또메이트',
        description: '역대 100회 이상의 당첨 데이터를 기반으로 번호 합계, 색상, 홀짝 분포 및 패턴을 심층 분석하여 로또번호 예측을 돕습니다.',
        keywords: '로또 분석, 로또 패턴, 로또번호 예측, 로또 통계, 로또메이트'
      },
      en: {
        title: 'Deep Lotto Analysis & Statistics · LottoMate',
        description: 'In-depth analysis of sum, color, and odd/even distribution based on historical draw data.',
        keywords: 'lotto analysis, lotto statistics, lotto patterns'
      },
      ja: {
        title: 'ロト詳細分析と統計 · LottoMate',
        description: '過去の抽選データに基づき、合計、色、奇数・偶数の分布を詳しく分析します。',
        keywords: 'ロト分析, ロト統計, ロトパターン'
      }
    }
  },
  fortune: {
    path: '/fortune',
    changefreq: 'daily',
    priority: 0.6,
    copy: {
      ko: {
        title: '오늘의 로또 운세 및 행운의 번호 예측 · 로또메이트',
        description: '꿈 해몽과 오늘 별자리 운세를 분석하여 당신에게 딱 맞는 행운의 로또번호 예측 및 추천 조합을 제공합니다.',
        keywords: '로또번호 예측, 로또 운세, 꿈 해몽 번호, 별자리 로또, 로또메이트'
      },
      en: {
        title: 'Lotto Fortune & Dream Interpretation · LottoMate',
        description: 'Find your lucky numbers through dream interpretation and daily zodiac signs.',
        keywords: 'lotto fortune, dream numbers, zodiac lotto'
      },
      ja: {
        title: 'ロト占いと夢占い · LottoMate',
        description: '夢占いや今日の星座から、あなただけの幸運のロト番号を見つけましょう。',
        keywords: 'ロト占い, 夢占い番号, 星座ロト'
      }
    }
  },
  results: {
    path: '/results',
    changefreq: 'daily',
    priority: 0.9,
    copy: {
      ko: {
        title: '이번주 로또당첨번호 및 오늘로또번호 조회 · 로또메이트',
        description: '이번주 로또번호 및 오늘로또번호 조회를 포함해 실시간으로 회차별 당첨 결과를 알아보고 내 추천 번호와 일치하는 개수를 조회해 보세요.',
        keywords: '로또번호조회, 이번주 로또번호, 오늘로또번호, 로또당첨번호조회, 로또 당첨번호 확인'
      },
      en: {
        title: 'Check Lotto Draw Results by Round · LottoMate',
        description: 'Enter a lottery draw round to review the winning numbers, bonus ball, and match them with your ticket.',
        keywords: 'lotto results check, lottery winning numbers, round check'
      },
      ja: {
        title: '回次別ロト当選結果の照会 · LottoMate',
        description: 'ロトの回次を入力して当選番号とボーナス番号を照会し、自分の番号との一致数を確認しましょう。',
        keywords: 'ロト結果照会, ロト当選番号確認, 回次別結果'
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
