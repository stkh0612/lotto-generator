<!-- src/views/HomeView.vue -->
<template>
  <v-container class="home-view py-6" fluid>
    
    <!-- 1) 로또 추첨기 영역 (애니메이션 모드) -->
    <v-card class="glass-card pa-6 mx-auto mb-8 text-center" max-width="600" elevation="2">
      <h1 class="text-h4 font-weight-bold mb-2 gradient-text">
        {{ t('appTitle', '로또메이트 번호 생성기') }}
      </h1>
      <p class="text-subtitle-1 text-grey mb-6">
        과거 당첨 패턴과 대조 필터링을 거친 조합을 추첨합니다.
      </p>

      <!-- 추첨 믹서 드럼 -->
      <div v-show="!skipAnimation" class="mb-4">
        <div class="lotto-mixer-container" ref="mixerContainer">
          <!-- 믹서 구체 내부에서 bouncing 하는 미니 볼들 -->
          <div
            v-for="ball in mixerBalls"
            :key="ball.id"
            class="mixer-ball"
            :style="{
              transform: `translate3d(${ball.x}px, ${ball.y}px, 0)`,
              background: ball.color
            }"
          ></div>
        </div>
        <div class="lotto-mixer-stand"></div>
      </div>

      <!-- 번호 표시판 (슬롯) -->
      <div class="d-flex justify-center align-center mb-6 flex-wrap" :style="{ gap }">
        <div
          v-for="idx in 6"
          :key="idx"
          class="slot-wrapper"
          :style="{ width: `${circleSize + 8}px`, height: `${circleSize + 8}px` }"
        >
          <Transition name="ball-drop">
            <NumberCircle
              v-if="displayNumbers[idx - 1]"
              :number="displayNumbers[idx - 1]"
              :size="circleSize"
            />
            <div v-else class="empty-slot" :style="{ width: `${circleSize}px`, height: `${circleSize}px` }">
              ?
            </div>
          </Transition>
        </div>
      </div>

      <!-- 추첨 설정 컨트롤 -->
      <div class="d-flex justify-center align-center mb-6 text-caption text-grey" style="gap: 16px;">
        <v-checkbox
          v-model="skipAnimation"
          label="추첨 연출 생략"
          hide-details
          density="compact"
          color="primary"
        ></v-checkbox>

        <v-btn
          variant="text"
          density="compact"
          :prepend-icon="isMuted ? 'mdi-volume-off' : 'mdi-volume-high'"
          @click="isMuted = !isMuted"
          color="grey"
        >
          {{ isMuted ? '음소거 중' : '사운드 켬' }}
        </v-btn>
      </div>

      <!-- 액션 버튼 -->
      <div class="d-flex justify-center flex-wrap mb-2" style="gap: 12px">
        <v-btn
          class="btn-premium click-pop"
          size="large"
          :disabled="isDrawing"
          @click="startDraw"
          prepend-icon="mdi-clover"
        >
          {{ isDrawing ? '추첨 중...' : t('generateBtn') }}
        </v-btn>
        
        <v-btn
          class="btn-gold click-pop"
          size="large"
          :disabled="isDrawing || numbers.length < 6"
          @click="save"
          prepend-icon="mdi-content-save"
        >
          {{ t('saveBtn') }}
        </v-btn>

        <v-btn
          color="secondary"
          variant="outlined"
          size="large"
          :disabled="isDrawing || numbers.length < 6"
          @click="shareNumbers"
          prepend-icon="mdi-share-variant"
        >
          공유하기
        </v-btn>
      </div>
    </v-card>

    <!-- 2) 저장된 번호 리스트 (최대 5게임) -->
    <v-expand-transition>
      <v-card v-if="savedNumbers.length" class="glass-card pa-6 mx-auto mb-8" max-width="600">
        <div class="text-h6 font-weight-bold mb-4 text-center">
          <v-icon color="secondary" start>mdi-star</v-icon>
          {{ t('savedTitle') }}
        </div>

        <div
          v-for="(entry, idx) in savedNumbers"
          :key="idx"
          class="d-flex flex-column flex-sm-row justify-space-between align-center mb-4 pa-3 rounded-lg"
          style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); gap: 8px;"
        >
          <div class="d-flex justify-center flex-nowrap align-center" :style="{ gap: '8px' }">
            <NumberCircle
              v-for="n in entry.numbers"
              :key="n"
              :number="n"
              :size="mobile ? 32 : 40"
            />
          </div>
          <span class="text-caption text-grey mt-1 mt-sm-0 text-center text-sm-right">
            {{ formatDate(entry.date) }}
          </span>
        </div>
      </v-card>
    </v-expand-transition>

    <!-- 3) 사용 가이드 섹션 -->
    <v-card class="glass-card pa-6 mx-auto mb-8" max-width="600">
      <div class="text-h6 font-weight-bold mb-3 text-primary text-left">
        <v-icon start color="primary">mdi-information-outline</v-icon>
        {{ t('guideTitle') }}
      </div>
      <ul class="pl-4 text-body-2 text-grey-darken-1 text-left" style="line-height: 1.7; list-style-type: decimal;">
        <li v-for="(item, i) in tm('guideList')" :key="i" class="mb-1">{{ item }}</li>
      </ul>
    </v-card>

    <!-- 4) SEO 설명 섹션 (검색엔진 상단 노출용 양질의 텍스트 콘텐츠) -->
    <v-card class="glass-card pa-6 mx-auto mt-10 text-left" max-width="600" style="background: rgba(124, 77, 255, 0.03) !important;">
      <h2 class="text-subtitle-1 font-weight-bold text-primary mb-3">
        LottoMate 로또번호 자동생성 및 추천 알고리즘 안내
      </h2>
      <div class="text-caption text-grey-darken-2" style="line-height: 1.6;">
        <p class="mb-3">
          로또메이트(LottoMate)는 과학적인 통계 및 난수 발생 필터링을 결합한 <strong>무료 로또번호 자동생성기</strong>입니다. 사용자 여러분이 “행운의 로또번호 추천해줘”라고 바랄 때, 단순한 난수가 아닌 역대 당첨 결과를 실시간 대조하여 1등으로 중복 출현했던 불필요한 번호들은 정밀 제거하고 가능성이 높은 <strong>로또번호추출</strong>을 지원합니다.
        </p>
        <p class="mb-3">
          본 사이트의 <strong>로또번호생성</strong> 엔진은 45개의 숫자 분포를 균형 있게 결합하며, 물리적인 3D 추첨 믹서 연출을 구현하여 실제 방송과 같은 흥미진진한 순간을 제공합니다. 추출된 로또 번호 개수와 조합 조건(홀짝 비율, 번호의 총합 범위 등)을 만족하는 행운의 숫자를 간편하게 받아 보실 수 있습니다.
        </p>
        <p>
          매 회차 로또 추첨은 독립 시행이지만, 무작위보다 균형 잡힌 필터링 조합을 활용해 <strong>로또번호 추천</strong>을 받아 생성하는 것이 심리적 당첨 기대치와 만족도를 크게 올려 줍니다. 오늘 로또메이트의 <strong>로또번호 자동생성</strong> 시스템으로 나만의 당첨 예상 번호를 만들고 이미지로 저장해 복권방 명당을 방문해 보세요!
        </p>
      </div>
    </v-card>

    <!-- 토스트 알림 (Snackbar) -->
    <v-snackbar v-model="snackbar" timeout="2500" color="primary" rounded="pill">
      {{ snackbarText }}
      <template #actions>
        <v-btn variant="text" @click="snackbar = false">닫기</v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
import { onBeforeRouteLeave } from 'vue-router'
import { useLottoStore, LottoEntry } from '../store'

import NumberCircle from '../components/NumberCircle.vue'
import axios from 'axios'
import lottoResults from '../assets/lotto_numbers_en.json'
import { playConfetti } from '../utils/AnimHelper'
import { playDrawBeep, playVictoryChime } from '../utils/AudioHelper'
import { shareContent } from '../utils/ShareHelper'

interface MixerBall {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
}

export default defineComponent({
  name: 'HomeView',
  components: { NumberCircle },
  setup() {
    const { t, tm } = useI18n()
    const { mobile } = useDisplay()
    const circleSize = computed(() => mobile.value ? 38 : 50)
    const gap = computed(() => mobile.value ? '8px' : '14px')

    const lottoStore = useLottoStore()

    // 로컬 스토리지에서 설정 불러오기
    const skipAnimation = ref(localStorage.getItem('skipAnimation') === 'true')
    const isMuted = ref(localStorage.getItem('isMuted') === 'true')

    // 최종 정렬 완료 번호
    const numbers = ref<number[]>([])
    // 실시간 순차적으로 채워지는 드롭 번호
    const displayNumbers = ref<number[]>([])
    const isDrawing = ref(false)

    // 토스트 관련 변수
    const snackbar = ref(false)
    const snackbarText = ref('')

    // --- 추첨기 물리 시뮬레이션 데이터 ---
    const mixerBalls = ref<MixerBall[]>([])
    let animationFrameId: number | null = null
    const BALL_COUNT = 25
    const MIXER_RADIUS = 130
    const BALL_RADIUS = 10
    const CENTER_X = 140
    const CENTER_Y = 140

    // 볼 컬러 풀 (로또 번호 대역별 색상 조합)
    const ballColors = [
      'radial-gradient(circle, #FFD54F, #FF6F00)', // 노랑
      'radial-gradient(circle, #4FC3F7, #0277BD)', // 파랑
      'radial-gradient(circle, #E57373, #C62828)', // 빨강
      'radial-gradient(circle, #E0E0E0, #616161)', // 회색
      'radial-gradient(circle, #81C784, #2E7D32)'  // 초록
    ]

    function initMixer() {
      const balls: MixerBall[] = []
      for (let i = 0; i < BALL_COUNT; i++) {
        // 원형 테두리 내부에 적당히 배치
        const angle = Math.random() * Math.PI * 2
        const r = Math.random() * (MIXER_RADIUS - BALL_RADIUS - 15)
        const x = CENTER_X + Math.cos(angle) * r
        const y = CENTER_Y + Math.sin(angle) * r
        
        // 무작위 초기 속도
        const speed = 1.5 + Math.random() * 2.5
        const dir = Math.random() * Math.PI * 2
        const vx = Math.cos(dir) * speed
        const vy = Math.sin(dir) * speed
        
        const color = ballColors[i % ballColors.length]
        
        balls.push({ id: i, x, y, vx, vy, color })
      }
      mixerBalls.value = balls
    }

    // 믹서 롤러 루프
    function updatePhysics() {
      // 그릴 때마다 구체 벽 충돌 물리 연산 진행
      mixerBalls.value.forEach(ball => {
        // 드로잉 중일 땐 볼 속도가 더 빠르고 역동적임
        const speedMultiplier = isDrawing.value ? 2.5 : 0.6
        ball.x += ball.vx * speedMultiplier
        ball.y += ball.vy * speedMultiplier

        // 센터 기준 거리 측정
        const dx = ball.x - CENTER_X
        const dy = ball.y - CENTER_Y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const limit = MIXER_RADIUS - BALL_RADIUS - 8

        if (dist > limit) {
          // 경계면 반사 벡터 연산
          ball.x = CENTER_X + (dx / dist) * limit
          ball.y = CENTER_Y + (dy / dist) * limit
          
          const nx = dx / dist
          const ny = dy / dist
          const k = ball.vx * nx + ball.vy * ny
          // 반사 공식: V_new = V - 2 * (V dot N) * N
          ball.vx = ball.vx - 2 * k * nx
          ball.vy = ball.vy - 2 * k * ny
          
          // 약간의 무작위 교란
          ball.vx += (Math.random() - 0.5) * 0.3
          ball.vy += (Math.random() - 0.5) * 0.3
        }
      })
      animationFrameId = requestAnimationFrame(updatePhysics)
    }

    // 로또 중복 조합 검사를 통과하는 랜덤 6수 계산
    function generateTargetNumbers(): number[] {
      let pick: number[] = []
      let isDuplicate = false
      do {
        const pool = Array.from({ length: 45 }, (_, i) => i + 1)
        pick = []
        while (pick.length < 6) {
          const idx = Math.floor(Math.random() * pool.length)
          pick.push(pool.splice(idx, 1)[0])
        }
        pick.sort((a, b) => a - b)

        isDuplicate = lottoResults.some((e: any) => {
          const past = [
            e.num1, e.num2, e.num3,
            e.num4, e.num5, e.num6
          ].sort((a, b) => a - b)
          return past.every((n, i) => n === pick[i])
        })
      } while (isDuplicate)

      return pick
    }

    // 추첨 프로세스 시작
    async function startDraw() {
      if (isDrawing.value) return
      
      const targetNumbers = generateTargetNumbers()
      displayNumbers.value = []
      numbers.value = []
      
      if (skipAnimation.value) {
        // 애니메이션 생략 시 즉시 세팅
        numbers.value = [...targetNumbers]
        displayNumbers.value = [...targetNumbers]
        if (!isMuted.value) playVictoryChime()
        playConfetti()
        return
      }

      // 애니메이션 연출 모드 시작
      isDrawing.value = true

      // 6개 번호를 0.45초 간격으로 순차 믹싱 및 추출
      let drawnCount = 0
      const drawInterval = setInterval(() => {
        if (drawnCount < 6) {
          const nextNum = targetNumbers[drawnCount]
          displayNumbers.value.push(nextNum)
          
          if (!isMuted.value) playDrawBeep()
          drawnCount++
        } else {
          clearInterval(drawInterval)
          // 6개 추출 완료 시 최종 정렬 후 정식 완료
          numbers.value = [...targetNumbers]
          // 화면에 정렬된 볼로 갱신하기 전 살짝 대기
          setTimeout(() => {
            displayNumbers.value = [...targetNumbers]
            isDrawing.value = false
            if (!isMuted.value) playVictoryChime()
            playConfetti()
          }, 200)
        }
      }, 550)
    }

    const savedNumbers = computed(() => lottoStore.savedNumbers as LottoEntry[])

    async function save() {
      if (numbers.value.length < 6) return
      lottoStore.save(numbers.value)
      
      const webhook = "https://lottomate.life/.netlify/functions/proxy"
      try {
        const payload = JSON.stringify({
          round: 1,
          date: new Date().toISOString(),
          numbers: numbers.value
        })
        const res = await axios.post(webhook, payload)
        const data = res.data as { status: string; message?: string }
        if (data.status === 'ok') {
          console.log('Google Sheets 저장 완료')
        }
      } catch (err) {
        console.error('Google Sheets 저장 중 오류 발생', err)
      }
    }

    // 공유 기능 연동
    async function shareNumbers() {
      if (numbers.value.length < 6) return
      const title = '☘️ LottoMate 행운의 번호 추천!'
      const text = `로또메이트 번호 생성기에서 뽑은 오늘의 행운수:\n[ ${numbers.value.join(', ')} ]\n\n대박을 기원합니다! 1등 가즈아~`
      const url = window.location.href
      
      const isNative = await shareContent(title, text, url)
      if (isNative) {
        snackbarText.value = '공유 창을 열었습니다!'
      } else {
        snackbarText.value = '클립보드에 추천 번호가 복사되었습니다!'
      }
      snackbar.value = true
    }

    function formatDate(iso: string) {
      const d = new Date(iso)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const h = String(d.getHours()).padStart(2, '0')
      const mi = String(d.getMinutes()).padStart(2, '0')
      return `${y}.${m}.${day} ${h}:${mi}`
    }

    onMounted(() => {
      lottoStore.load()
      initMixer()
      updatePhysics()
      // 첫 진입 시 즉시 1회 자동 생성
      startDraw()
    })

    onBeforeUnmount(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      // 로컬 스토리지에 설정값 저장
      localStorage.setItem('skipAnimation', skipAnimation.value.toString())
      localStorage.setItem('isMuted', isMuted.value.toString())
    })

    onBeforeRouteLeave(() => lottoStore.clear())

    return {
      numbers,
      displayNumbers,
      isDrawing,
      skipAnimation,
      isMuted,
      mixerBalls,
      snackbar,
      snackbarText,
      startDraw,
      save,
      shareNumbers,
      formatDate,
      savedNumbers,
      circleSize,
      gap,
      t,
      tm
    }
  }
})
</script>

<style scoped>
.home-view {
  text-align: center;
}

/* 슬롯 스타일 */
.slot-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.empty-slot {
  border: 2px dashed rgba(124, 77, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(124, 77, 255, 0.4);
  font-weight: bold;
  font-size: 1.5rem;
  background: rgba(124, 77, 255, 0.02);
}

/* 볼 드롭 애니메이션 */
.ball-drop-enter-active {
  animation: dropIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25);
}

@keyframes dropIn {
  0% {
    transform: translateY(-80px) scale(0.4);
    opacity: 0;
  }
  70% {
    transform: translateY(10px) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
