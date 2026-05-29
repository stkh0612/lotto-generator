export interface LottoApiResult {
  returnValue?: string
  drwNo?: number
  drwNoDate?: string
  drwtNo1?: number
  drwtNo2?: number
  drwtNo3?: number
  drwtNo4?: number
  drwtNo5?: number
  drwtNo6?: number
  bnusNo?: number
  [k: string]: any
}

const basePath = (import.meta as any)?.env?.VITE_FUNCTIONS_BASE || '/.netlify/functions'
const base = `${basePath}/lotto`

import lottoResults from '../assets/lotto_numbers_en.json'

export async function fetchRound(round: number): Promise<LottoApiResult> {
  try {
    const res = await fetch(`${base}?round=${round}`)
    if (res.ok) {
      const text = await res.text()
      try {
        return JSON.parse(text)
      } catch {
        // Continue to fallback if parsing fails
      }
    }
  } catch (e) {
    // API failed, proceed to fallback
  }

  // Fallback to local JSON asset
  if (lottoResults && lottoResults.length > 0) {
    const found = lottoResults.find((r: any) => r.round === round)
    if (found) {
      return {
        returnValue: 'success',
        drwNo: found.round,
        drwNoDate: found.draw_date,
        drwtNo1: found.num1,
        drwtNo2: found.num2,
        drwtNo3: found.num3,
        drwtNo4: found.num4,
        drwtNo5: found.num5,
        drwtNo6: found.num6,
        bnusNo: found.bonus
      }
    }
  }

  throw new Error(`회차 정보를 찾을 수 없습니다. (회차: ${round})`)
}
