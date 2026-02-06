<template>
  <v-container fluid class="simulation-view py-6">
    <v-sheet class="mx-auto px-6 py-8" max-width="800" elevation="2" rounded="xl" color="surface">
      <div class="text-center mb-6">
        <h2 class="text-h4 font-weight-bold primary--text mb-2">🎰 로또 타임머신</h2>
        <p class="text-subtitle-1 grey--text">
          "내가 이 번호로 1회부터 매주 샀다면?"
        </p>
      </div>

      <!-- 1. 번호 입력/생성 -->
      <v-card class="glass-card mb-8 pa-4" elevation="0">
        <div class="d-flex justify-center align-center flex-wrap" style="gap: 12px">
          <NumberCircle
            v-for="(num, idx) in myNumbers"
            :key="idx"
            :number="num || 0"
            size="50"
          />
        </div>
        <div class="d-flex justify-center mt-6" style="gap: 16px">
          <v-btn color="secondary" size="large" @click="generateRandom" prepend-icon="mdi-dice-5">
            랜덤 생성
          </v-btn>
          <v-btn 
            color="primary" 
            size="large" 
            @click="runSimulation" 
            :disabled="myNumbers.length !== 6 || loading"
            :loading="loading"
            class="click-pop"
          >
            결과 확인 ({{ totalRounds }}회차)
          </v-btn>
        </div>
      </v-card>

      <!-- 2. 결과 리포트 -->
      <v-expand-transition>
        <div v-if="report" class="result-section">
          <v-divider class="mb-6"></v-divider>
          
          <!-- 요약 카드 -->
          <v-row class="mb-6 text-center">
            <v-col cols="6" sm="3">
              <div class="text-caption grey--text">총 투자금</div>
              <div class="text-h6">{{ formatMoney(report.totalCost) }}</div>
            </v-col>
            <v-col cols="6" sm="3">
              <div class="text-caption grey--text">총 당첨금</div>
              <div class="text-h6" :class="report.totalPrize > 0 ? 'text-green' : ''">
                {{ formatMoney(report.totalPrize) }}
              </div>
            </v-col>
            <v-col cols="6" sm="3">
              <div class="text-caption grey--text">수익률 (ROI)</div>
              <div class="text-h6" :class="report.roi >= 0 ? 'text-green' : 'text-red'">
                {{ report.roi }}%
              </div>
            </v-col>
            <v-col cols="6" sm="3">
              <div class="text-caption grey--text">최고 등수</div>
              <div class="text-h6 font-weight-black text-primary">
                {{ report.bestRank === 6 ? '낙첨' : `${report.bestRank}등` }}
              </div>
            </v-col>
          </v-row>

          <!-- 등수별 카운트 -->
          <div class="rank-grid mb-6">
            <v-card v-for="r in 5" :key="r" class="pa-3 text-center" variant="outlined">
              <div class="text-caption">{{ r }}등</div>
              <div class="font-weight-bold text-h5">{{ report.ranks[r] }}회</div>
              <div class="text-caption text-grey">{{ formatMoney(getPrizeByRank(r)) }}</div>
            </v-card>
          </div>

          <!-- 메시지 -->
          <v-alert
            :color="report.netProfit > 0 ? 'success' : 'error'"
            variant="tonal"
            class="text-center"
          >
            <h3 class="text-h5 font-weight-bold">
              {{ report.netProfit > 0 ? '와... 당장 이 번호 사러 가세요!' : '휴... 실제로 안 사길 잘했네요!' }}
            </h3>
            <div class="mt-2">
              순수익: {{ formatMoney(report.netProfit) }}
            </div>
          </v-alert>

        </div>
      </v-expand-transition>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NumberCircle from '../components/NumberCircle.vue'
import rawData from '../assets/lotto_numbers_en.json'
import { playConfetti } from '../utils/AnimHelper'

// Types
type LottoRound = {
  round: number
  draw_date: string
  num1: number
  num2: number
  num3: number
  num4: number
  num5: number
  num6: number
  bonus: number
}

// Data Setup
const history = rawData as unknown as LottoRound[]
const sortedHistory = [...history].sort((a,b) => a.round - b.round)
const totalRounds = sortedHistory.length

const myNumbers = ref<number[]>([0,0,0,0,0,0])
const loading = ref(false)
const report = ref<any>(null)

// 1게임 가격 (천원)
const PRICE_PER_GAME = 1000

function generateRandom() {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1)
  const pick: number[] = []
  while (pick.length < 6) {
    const idx = Math.floor(Math.random() * pool.length)
    pick.push(pool.splice(idx, 1)[0])
  }
  myNumbers.value = pick.sort((a, b) => a - b)
  report.value = null // reset result
}

// Approximate prizes (Actual prizes vary every week, but using fixed averages for simulation simplicity)
function getPrizeByRank(rank: number) {
  switch(rank) {
    case 1: return 2000000000 // 20억
    case 2: return 50000000   // 5천만
    case 3: return 1500000    // 150만
    case 4: return 50000      // 5만
    case 5: return 5000       // 5천
    default: return 0
  }
}

function runSimulation() {
  loading.value = true
  setTimeout(() => {
    let wins = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
    let totalPrize = 0
    
    const mySet = new Set(myNumbers.value)

    for (const round of sortedHistory) {
      // Check matches
      const winNums = [round.num1, round.num2, round.num3, round.num4, round.num5, round.num6]
      let matchCnt = 0
      for (const n of winNums) {
        if (mySet.has(n)) matchCnt++
      }

      let rank = 6 // init as lose
      if (matchCnt === 6) rank = 1
      else if (matchCnt === 5 && mySet.has(round.bonus)) rank = 2
      else if (matchCnt === 5) rank = 3
      else if (matchCnt === 4) rank = 4
      else if (matchCnt === 3) rank = 5

      wins[rank as keyof typeof wins]++
      totalPrize += getPrizeByRank(rank)
    }

    const totalCost = totalRounds * PRICE_PER_GAME
    const netProfit = totalPrize - totalCost
    const roi = ((netProfit / totalCost) * 100).toFixed(1)
    
    // Determine best rank
    let best = 6
    if (wins[1] > 0) best = 1
    else if (wins[2] > 0) best = 2
    else if (wins[3] > 0) best = 3
    else if (wins[4] > 0) best = 4
    else if (wins[5] > 0) best = 5

    report.value = {
      totalCost,
      totalPrize,
      netProfit,
      roi,
      ranks: wins,
      bestRank: best
    }

    if (wins[1] > 0 || wins[2] > 0 || wins[3] > 0) {
      playConfetti()
    }

    loading.value = false
  }, 500) // fake delay for effect
}

function formatMoney(n: number) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(n)
}

// Init with random
generateRandom()
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.rank-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
@media (max-width: 600px) {
  .rank-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
