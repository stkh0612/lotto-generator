<!-- src/views/SimulationView.vue -->
<template>
  <v-container fluid class="simulation-view py-6">
    <v-sheet class="mx-auto px-6 py-8 glass-card" max-width="850" elevation="2" rounded="xl">
      
      <div class="text-center mb-6">
        <h1 class="text-h4 font-weight-bold gradient-text mb-2">🎰 로또 시뮬레이터</h1>
        <p class="text-subtitle-1 text-grey">
          과거의 기록 혹은 가상의 미래에서 로또 당첨의 짜릿함을 가상 시뮬레이션해 보세요!
        </p>
      </div>

      <!-- 시뮬레이터 탭 선택 -->
      <v-tabs v-model="simTab" color="primary" class="mb-6" align-tabs="center">
        <v-tab value="timemachine">🕰️ 로또 타임머신</v-tab>
        <v-tab value="infinite">🚀 1등 될 때까지! 무한 구매</v-tab>
      </v-tabs>

      <!-- 1. 번호 선택/생성 공용 카드 -->
      <v-card class="glass-card mb-8 pa-4" elevation="0" border>
        <div class="text-subtitle-2 text-center text-primary mb-3">
          시뮬레이션에 사용할 번호 6개
        </div>
        <div class="d-flex justify-center align-center flex-wrap mb-4" :style="{ gap }">
          <NumberCircle
            v-for="(num, idx) in myNumbers"
            :key="idx"
            :number="num || 0"
            :size="circleSize"
          />
        </div>
        
        <div class="d-flex justify-center mt-2 flex-wrap" style="gap: 12px">
          <v-btn color="secondary" size="small" variant="outlined" @click="openInputModal" prepend-icon="mdi-pencil">
            직접 선택
          </v-btn>
          <v-btn color="secondary" size="small" variant="flat" @click="generateRandom" prepend-icon="mdi-dice-5">
            무작위 생성
          </v-btn>
        </div>
      </v-card>

      <!-- 윈도우 콘텐츠 -->
      <v-window v-model="simTab">
        
        <!-- Tab 1: 로또 타임머신 -->
        <v-window-item value="timemachine">
          <v-card variant="flat" class="bg-transparent text-center">
            <p class="text-body-2 text-grey mb-6">
              "내가 이 번호 조합으로 <strong>로또 1회차부터 매주 한 장씩</strong> 샀다면 지금 결과는 어떨까요?"
            </p>

            <v-btn 
              class="btn-premium click-pop px-8 py-3 mb-6" 
              size="large"
              @click="runTimeMachine" 
              :disabled="myNumbers.some(n => n === 0) || loading"
              :loading="loading"
            >
              타임머신 작동 (총 {{ totalRounds }}회차 대조)
            </v-btn>

            <!-- 결과 리포트 -->
            <v-expand-transition>
              <div v-if="report" class="result-section text-left">
                <v-divider class="my-6"></v-divider>
                
                <h3 class="text-h6 font-weight-bold mb-4 text-center text-primary">🕰️ 타임머신 보고서</h3>
                
                <v-row class="mb-6 text-center">
                  <v-col cols="6" sm="3">
                    <div class="text-caption text-grey">총 투자금</div>
                    <div class="text-h6 font-weight-bold">{{ formatMoney(report.totalCost) }}</div>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <div class="text-caption text-grey">총 당첨금</div>
                    <div class="text-h6 font-weight-bold text-success">
                      {{ formatMoney(report.totalPrize) }}
                    </div>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <div class="text-caption text-grey">수익률 (ROI)</div>
                    <div class="text-h6 font-weight-bold" :class="Number(report.roi) >= 0 ? 'text-success' : 'text-error'">
                      {{ report.roi }}%
                    </div>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <div class="text-caption text-grey">최고 등수</div>
                    <div class="text-h6 font-weight-black text-primary">
                      {{ report.bestRank === 6 ? '낙첨' : `${report.bestRank}등` }}
                    </div>
                  </v-col>
                </v-row>

                <!-- 등수별 카운트 -->
                <div class="rank-grid mb-6">
                  <v-card v-for="r in 5" :key="r" class="pa-3 text-center glass-card" variant="flat">
                    <div class="text-subtitle-2 text-primary">{{ r }}등</div>
                    <div class="font-weight-bold text-h5 my-1">{{ report.ranks[r] }}회</div>
                    <div class="text-caption text-grey">{{ formatMoney(getPrizeByRank(r)) }}</div>
                  </v-card>
                </div>

                <v-alert
                  :color="report.netProfit > 0 ? 'success' : 'error'"
                  variant="tonal"
                  class="text-center rounded-xl"
                >
                  <h3 class="text-h5 font-weight-bold">
                    {{ report.netProfit > 0 ? '축하합니다! 시뮬레이션 결과 대성공!' : '휴... 실제로 매주 안 사길 다행이네요!' }}
                  </h3>
                  <div class="mt-2 text-body-1">
                    순수익: <strong>{{ formatMoney(report.netProfit) }}</strong>
                  </div>
                </v-alert>
              </div>
            </v-expand-transition>

          </v-card>
        </v-window-item>

        <!-- Tab 2: 1등 될 때까지 무한 구매 -->
        <v-window-item value="infinite">
          <v-card variant="flat" class="bg-transparent text-center">
            <p class="text-body-2 text-grey mb-6">
              "내가 지정한 6개 번호로 <strong>1등에 당첨될 때까지</strong> 가상 구매 루프를 돌려봅니다."
            </p>

            <!-- 상태 대시보드 -->
            <div class="infinite-dashboard rounded-xl pa-6 mb-6 text-left" ref="infiniteCertificate">
              <div class="d-flex justify-space-between align-center mb-4">
                <span class="text-h6 font-weight-bold text-primary">🚀 무한 구매 대시보드</span>
                <v-chip size="small" :color="infRunning ? 'success' : 'grey'" class="font-weight-bold">
                  {{ infRunning ? '시뮬레이션 실행 중' : infWon ? '1등 당첨 완료!' : '대기 중' }}
                </v-chip>
              </div>

              <v-row class="text-center" dense>
                <v-col cols="6" sm="3">
                  <div class="text-caption text-grey">가상 소비액 (1게임=1천원)</div>
                  <div class="text-h5 font-weight-bold text-error my-1">
                    {{ formatMoney(infStats.cost) }}
                  </div>
                </v-col>
                <v-col cols="6" sm="3">
                  <div class="text-caption text-grey">누적 수령액</div>
                  <div class="text-h5 font-weight-bold text-success my-1">
                    {{ formatMoney(infStats.prize) }}
                  </div>
                </v-col>
                <v-col cols="6" sm="3">
                  <div class="text-caption text-grey">가상 경과 시간</div>
                  <div class="text-h5 font-weight-bold text-primary my-1">
                    {{ formatYears(infStats.weeks) }}
                  </div>
                </v-col>
                <v-col cols="6" sm="3">
                  <div class="text-caption text-grey">평균 대물림 세대수</div>
                  <div class="text-h5 font-weight-bold text-warning my-1">
                    {{ formatGenerations(infStats.weeks) }}대손
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-4 rgba-border"></v-divider>

              <!-- 실시간 등수 카운터 -->
              <div class="d-flex justify-space-around align-center text-center flex-wrap" style="gap: 12px;">
                <div v-for="r in 5" :key="r" class="px-2">
                  <span class="text-caption text-grey d-block">{{ r }}등 ({{ formatMoney(getPrizeByRank(r)) }})</span>
                  <strong class="text-h6 font-weight-bold text-primary">{{ infStats.ranks[r].toLocaleString() }}회</strong>
                </div>
              </div>

              <!-- 가상 손실 알림판 -->
              <div v-if="infStats.cost > 0" class="mt-4 pa-3 rounded-lg text-center" style="background: rgba(255, 64, 129, 0.08);">
                <span class="text-caption text-grey">누적 순수익:</span>
                <strong class="text-body-1 font-weight-bold text-error ml-2">
                  {{ formatMoney(infStats.prize - infStats.cost) }}
                </strong>
              </div>

              <!-- 1등 당첨 성공 리포트 -->
              <v-expand-transition>
                <div v-if="infWon" class="mt-4 pa-4 rounded-lg text-center border-gold-glow" style="background: rgba(255, 215, 0, 0.08);">
                  <h3 class="text-h6 font-weight-bold text-warning mb-2">🎉 마침내 1등 당첨 성공! 🎉</h3>
                  <p class="text-caption text-grey mb-0" style="line-height: 1.5;">
                    이 로또 번호 한 조합으로 1등에 가상 당첨되기 위해 <strong>{{ (infStats.weeks).toLocaleString() }}주</strong>의 시간과 
                    <strong>{{ formatMoney(infStats.cost) }}</strong> 상당의 가상 재화를 지출하셨습니다.
                    당첨된 기쁨도 크지만, 실제 복권 구매는 소액으로 즐기시길 강력히 권해드립니다!
                  </p>
                </div>
              </v-expand-transition>
            </div>

            <!-- 시뮬레이션 제어 버튼 -->
            <div class="d-flex justify-center flex-wrap animate-buttons" style="gap: 16px;">
              <v-btn
                v-if="!infRunning && !infWon"
                class="btn-premium click-pop px-8"
                size="large"
                @click="startInfiniteSim"
                prepend-icon="mdi-play"
              >
                시뮬레이션 시작
              </v-btn>

              <v-btn
                v-if="infRunning"
                color="warning"
                class="click-pop px-8"
                size="large"
                @click="pauseInfiniteSim"
                prepend-icon="mdi-pause"
              >
                일시 정지
              </v-btn>

              <v-btn
                v-if="!infRunning && (infStats.weeks > 0)"
                color="secondary"
                variant="outlined"
                class="click-pop"
                @click="resetInfiniteSim"
                prepend-icon="mdi-refresh"
              >
                초기화
              </v-btn>

              <v-btn
                v-if="infWon"
                class="btn-gold click-pop"
                size="large"
                @click="downloadInfiniteReport"
                prepend-icon="mdi-download"
              >
                결과 이미지 다운로드
              </v-btn>

              <v-btn
                v-if="infWon"
                color="primary"
                class="click-pop"
                size="large"
                @click="shareInfiniteResult"
                prepend-icon="mdi-share-variant"
              >
                결과 공유하기
              </v-btn>
            </div>

          </v-card>
        </v-window-item>

      </v-window>

      <!-- 직접 입력 다이얼로그 ( Vuetify Modal ) -->
      <v-dialog v-model="showInputModal" max-width="480">
        <v-card class="pa-4 rounded-xl glass-card">
          <v-card-title class="text-h6 font-weight-bold text-center">
            시뮬레이션 번호 선택 ({{ tempSelected.length }}/6)
          </v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap justify-center" style="gap: 8px">
              <v-btn
                v-for="n in 45"
                :key="n"
                icon
                size="small"
                variant="flat"
                :color="tempSelected.includes(n) ? 'primary' : 'grey-darken-3'"
                @click="toggleNumber(n)"
                elevation="0"
                style="min-width: 40px; min-height: 40px;"
              >
                {{ n }}
              </v-btn>
            </div>
            <p class="text-caption text-center mt-4 text-grey">
              서로 중복되지 않는 6개 숫자를 터치하세요.
            </p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn size="large" variant="text" @click="showInputModal = false">취소</v-btn>
            <v-btn 
              size="large" 
              class="btn-premium" 
              :disabled="tempSelected.length !== 6"
              @click="confirmManualInput"
            >
              적용하기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- SEO 최적화 설명 영역 -->
      <v-card class="glass-card pa-6 text-left mt-8" style="background: rgba(124, 77, 255, 0.02) !important;">
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-3">로또 시뮬레이터와 수학적 기대값</h3>
        <p class="text-caption text-grey-darken-1 mb-2" style="line-height: 1.6;">
          대한민국 나눔로또(동행복권) 6/45의 1등 당첨 확률은 약 <strong>814만분의 1</strong>입니다. 이는 매주 한 게임(1,000원)을 살 경우, 통계학적으로 약 15만 년 동안 한 번도 빠짐없이 구매해야 1등에 한 번 당첨될 수 있는 극도로 희박한 확률입니다.
        </p>
        <p class="text-caption text-grey-darken-1" style="line-height: 1.6;">
          로또메이트의 <strong>로또 시뮬레이터</strong>는 이러한 수학적 사실을 누구나 즉각적으로 체감할 수 있도록 제작되었습니다. 타임머신 모드는 과거 역대 당첨 결과를 기준으로 해당 조합의 성과를 분석해 주며, 무한 구매 시뮬레이터는 매 프레임 수천 게임 이상의 시뮬레이션 연산을 통해 실제 1등이 당첨되는 순간까지의 가상 투자 비용과 세대 상속 시점을 흥미롭게 모델링합니다. 통계학적 기대값이 음의 영역(-80% 내외)에 있음을 확인하고, 로또 구매는 언제나 부담 없는 건전한 오락 활동이어야 함을 상기하시기 바랍니다.
        </p>
      </v-card>

    </v-sheet>

    <!-- 토스트 알림 (Snackbar) -->
    <v-snackbar v-model="snackbar" timeout="2500" color="primary" rounded="pill">
      {{ snackbarText }}
      <template #actions>
        <v-btn variant="text" @click="snackbar = false">닫기</v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'
import html2canvas from 'html2canvas'
import NumberCircle from '../components/NumberCircle.vue'
import rawData from '../assets/lotto_numbers_en.json'
import { playConfetti } from '../utils/AnimHelper'
import { shareContent } from '../utils/ShareHelper'

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

const history = rawData as unknown as LottoRound[]
const sortedHistory = [...history].sort((a,b) => a.round - b.round)
const totalRounds = sortedHistory.length

const { mobile } = useDisplay()
const simTab = ref('timemachine')
const circleSize = computed(() => mobile.value ? 36 : 48)
const gap = computed(() => mobile.value ? '6px' : '10px')

const myNumbers = ref<number[]>([0,0,0,0,0,0])
const loading = ref(false)
const report = ref<any>(null)

// 1게임 가격
const PRICE_PER_GAME = 1000

// 토스트 변수
const snackbar = ref(false)
const snackbarText = ref('')

// --- 무한 구매 시뮬레이터 반응형 변수 ---
const infRunning = ref(false)
const infWon = ref(false)
const infStats = ref({
  weeks: 0,
  cost: 0,
  prize: 0,
  ranks: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
})

let animationFrameId: number | null = null

function generateRandom() {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1)
  const pick: number[] = []
  while (pick.length < 6) {
    const idx = Math.floor(Math.random() * pool.length)
    pick.push(pool.splice(idx, 1)[0])
  }
  myNumbers.value = pick.sort((a, b) => a - b)
  report.value = null
  resetInfiniteSim()
}

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

// --- 타임머신 시뮬레이션 ---
function runTimeMachine() {
  loading.value = true
  setTimeout(() => {
    let wins = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
    let totalPrize = 0
    
    const mySet = new Set(myNumbers.value)

    for (const round of sortedHistory) {
      const winNums = [round.num1, round.num2, round.num3, round.num4, round.num5, round.num6]
      let matchCnt = 0
      for (const n of winNums) {
        if (mySet.has(n)) matchCnt++
      }

      let rank = 6
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
  }, 600)
}

// --- 무한 구매 시뮬레이션 루프 ---
const pool = Array.from({ length: 45 }, (_, i) => i + 1)

function startInfiniteSim() {
  if (myNumbers.value.some(n => n === 0)) return
  if (infWon.value) resetInfiniteSim()
  
  infRunning.value = true
  loopInfiniteSim()
}

function pauseInfiniteSim() {
  infRunning.value = false
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

function resetInfiniteSim() {
  pauseInfiniteSim()
  infWon.value = false
  infStats.value = {
    weeks: 0,
    cost: 0,
    prize: 0,
    ranks: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  }
}

function loopInfiniteSim() {
  if (!infRunning.value) return

  const GAMES_PER_FRAME = 4000
  const userSet = new Set(myNumbers.value)
  
  let currentCost = infStats.value.cost
  let currentPrize = infStats.value.prize
  let currentWeeks = infStats.value.weeks
  const currentRanks = { ...infStats.value.ranks }
  
  let hitFirstPlace = false

  for (let g = 0; g < GAMES_PER_FRAME; g++) {
    currentWeeks++
    currentCost += 1000

    let matches = 0
    for (let i = 0; i < 6; i++) {
      const randIdx = i + Math.floor(Math.random() * (45 - i))
      const temp = pool[randIdx]
      pool[randIdx] = pool[i]
      pool[i] = temp
      
      if (userSet.has(temp)) {
        matches++
      }
    }

    const bonusIdx = 6 + Math.floor(Math.random() * (45 - 6))
    const bonusNum = pool[bonusIdx]
    const hasBonus = userSet.has(bonusNum)

    let rank = 6
    if (matches === 6) {
      rank = 1
      hitFirstPlace = true
    } else if (matches === 5 && hasBonus) {
      rank = 2
    } else if (matches === 5) {
      rank = 3
    } else if (matches === 4) {
      rank = 4
    } else if (matches === 3) {
      rank = 5
    }

    if (rank <= 5) {
      currentRanks[rank as keyof typeof currentRanks]++
      currentPrize += getPrizeByRank(rank)
    }

    if (hitFirstPlace) {
      break
    }
  }

  infStats.value.cost = currentCost
  infStats.value.prize = currentPrize
  infStats.value.weeks = currentWeeks
  infStats.value.ranks = currentRanks

  if (hitFirstPlace) {
    infWon.value = true
    infRunning.value = false
    playConfetti()
    setTimeout(playConfetti, 400)
    setTimeout(playConfetti, 800)
  } else {
    animationFrameId = requestAnimationFrame(loopInfiniteSim)
  }
}

// 결과 포맷 함수들
function formatMoney(n: number) {
  if (n >= 100000000) {
    const eok = Math.floor(n / 100000000)
    const man = Math.floor((n % 100000000) / 10000)
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`
  }
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(n)
}

function formatYears(weeks: number) {
  const years = Math.floor(weeks / 52)
  const remainingWeeks = weeks % 52
  return years > 0 ? `${years}년 ${remainingWeeks}주` : `${weeks}주`
}

function formatGenerations(weeks: number) {
  const years = weeks / 52
  const gen = Math.floor(years / 30)
  return gen.toLocaleString()
}

// 결과 보고서 덤프 이미지 내려받기
const infiniteCertificate = ref<HTMLElement>()
async function downloadInfiniteReport() {
  if (!infiniteCertificate.value) return
  const canvas = await html2canvas(infiniteCertificate.value, {
    backgroundColor: '#0F041C',
    scale: 2,
    useCORS: true
  })
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `lottomate_infinite_simulation.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 공유 기능 구현
async function shareInfiniteResult() {
  if (!infWon.value) return
  const title = '🚀 LottoMate 1등 당첨 시뮬레이션 보고서'
  const years = Math.floor(infStats.value.weeks / 52)
  const costStr = formatMoney(infStats.value.cost)
  const prizeStr = formatMoney(infStats.value.prize)
  const netProfitStr = formatMoney(infStats.value.prize - infStats.value.cost)
  const genStr = formatGenerations(infStats.value.weeks)
  
  const text = `로또 1등 당첨될 때까지 가상 구매 결과:\n내 번호: [ ${myNumbers.value.join(', ')} ]\n당첨 소요 시간: ${years.toLocaleString()}년 (${genStr}대손 경과)\n누적 가상 소비액: ${costStr}\n누적 가상 당첨금: ${prizeStr}\n누적 순수익: ${netProfitStr}\n\n지금 로또메이트에서 1등에 당첨되려면 얼마나 걸릴지 시뮬레이션해 보세요!`
  const url = window.location.origin + '/simulation'

  const isNative = await shareContent(title, text, url)
  if (isNative) {
    snackbarText.value = '공유 창을 열었습니다!'
  } else {
    snackbarText.value = '클립보드에 결과가 복사되었습니다!'
  }
  snackbar.value = true
}

// --- 수동 입력 모달 연동 로직 ---
const showInputModal = ref(false)
const tempSelected = ref<number[]>([])

function openInputModal() {
  tempSelected.value = myNumbers.value.filter(n => n > 0)
  showInputModal.value = true
}

function toggleNumber(n: number) {
  const idx = tempSelected.value.indexOf(n)
  if (idx >= 0) {
    tempSelected.value.splice(idx, 1)
  } else {
    if (tempSelected.value.length < 6) {
      tempSelected.value.push(n)
    }
  }
}

function confirmManualInput() {
  if (tempSelected.value.length < 6) return
  myNumbers.value = [...tempSelected.value].sort((a,b) => a-b)
  report.value = null
  resetInfiniteSim()
  showInputModal.value = false
}

onMounted(generateRandom)

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.infinite-dashboard {
  background: radial-gradient(circle at top, #1E0B36 0%, #0D041A 100%) !important;
  border: 1px solid rgba(124, 77, 255, 0.25);
  box-shadow: inset 0 0 15px rgba(124, 77, 255, 0.1);
}

.rgba-border {
  border-color: rgba(255, 255, 255, 0.08) !important;
}

.border-gold-glow {
  border: 2px solid #FFD700 !important;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
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
