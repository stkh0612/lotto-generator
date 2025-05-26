import { defineStore } from 'pinia'

export interface LottoEntry {
  numbers: number[]
  date: string
}

export const useLottoStore = defineStore('lotto', {
  state: () => ({
    savedNumbers: JSON.parse(localStorage.getItem('lotto') || '[]') as LottoEntry[]
  }),
  actions: {
    /**
     * 주어진 numbers 조합을 저장.
     * 이미 동일 조합이 있으면 저장하지 않고 false 리턴.
     */
    save(numbers: number[]): boolean {
      // 1) 입력 배열을 정렬 복사
      const pick = [...numbers].sort((a, b) => a - b)

      // 2) 중복 검사
      const exists = this.savedNumbers.some((entry) => {
        const past = [...entry.numbers].sort((a, b) => a - b)
        return past.every((n, i) => n === pick[i])
      })
      if (exists) {
        return false
      }

      // 3) 최대 5개 유지
      if (this.savedNumbers.length >= 5) {
        this.savedNumbers.shift()
      }

      // 4) 새 엔트리 추가
      this.savedNumbers.push({ numbers: pick, date: new Date().toISOString() })

      // 5) 로컬스토리지 갱신
      localStorage.setItem('lotto', JSON.stringify(this.savedNumbers))

      return true
    },
    remove(index: number) {
      this.savedNumbers.splice(index, 1)
      localStorage.setItem('lotto', JSON.stringify(this.savedNumbers))
    },
    clear() {
      // state만 비우고, localStorage는 건드리지 않습니다!
      this.savedNumbers = []
      // localStorage.setItem('lotto', JSON.stringify([]))  <-- 이 줄을 제거하세요
    },
    /** 로컬스토리지에 저장된 값을 다시 읽어와 state에 반영 */
    load() {
      this.savedNumbers = JSON.parse(localStorage.getItem('lotto') || '[]') as LottoEntry[]
    }
  }
})
