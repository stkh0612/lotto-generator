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

export async function fetchRound(round: number): Promise<LottoApiResult> {
  const res = await fetch(`${base}?round=${round}`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    const hint = text.slice(0, 80).replace(/\s+/g, ' ')
    throw new Error(`Unexpected non-JSON response. Is Netlify function reachable? Hint: ${hint}`)
  }
}
