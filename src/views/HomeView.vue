<!-- src/views/HomeView.vue -->
<template>
  <div class="home-page">

    <!-- ================= 1. 히어로 섹션 ================= -->
    <section class="hero-section">
      <div class="hero-container">
        <!-- 좌측 카피 및 CTA -->
        <div class="hero-content">
          <h1 class="hero-title">{{ $t('home.heroTitle', '로또, 더 스마트하게') }}</h1>
          <p class="hero-subtitle">{{ $t('home.heroSubtitle', '빅데이터 분석으로 당신의 확률을 높이세요!') }}</p>
          <div class="hero-btn-wrap">
            <button type="button" class="btn btn-primary" @click="openDrawModal">
              <v-icon size="18" class="mr-1">mdi-sparkles</v-icon>
              {{ $t('home.drawRecommendBtn', '이달의 조합번호 추천받기') }}
            </button>
            <button type="button" class="btn btn-outline" @click="$router.push('/results')">
              {{ $t('home.checkResultsBtn', '당첨번호 조회하기') }}
            </button>
          </div>
        </div>

        <!-- 우측 최신 당첨번호 카드 -->
        <div class="hero-lotto-card" v-if="latestRoundData">
          <div class="card-header-bar">
            <span class="round-badge">{{ $t('home.latestRound', { round: latestRoundData.round }) }}</span>
            <span class="draw-date">{{ latestRoundData.draw_date }}</span>
          </div>
          <div class="balls-row">
            <div class="six-balls">
              <span
                v-for="(num, idx) in latestBalls"
                :key="idx"
                class="ball-circle"
                :style="{ background: getBallColor(num) }"
              >
                {{ num }}
              </span>
            </div>
            <span class="plus-symbol">+</span>
            <span class="ball-circle bonus-ball">
              {{ latestRoundData.bonus }}
            </span>
          </div>
          <button type="button" class="card-action-btn" @click="$router.push('/compare')">
            {{ $t('home.viewAllResults', '전체 당첨결과 보기') }}
            <v-icon size="16">mdi-arrow-right</v-icon>
          </button>
        </div>
      </div>
    </section>

    <!-- ================= 2. 메인 컨텐츠 컨테이너 ================= -->
    <div class="main-body-container">

      <!-- 2-1. 주요 서비스 4대 카드 그리드 -->
      <section class="mb-10">
        <h2 class="content-heading">{{ $t('home.servicesHeading', '주요 서비스') }}</h2>
        <div class="services-grid">
          <!-- 1. 시뮬레이션 -->
          <div class="service-card" @click="$router.push('/simulation')">
            <div class="service-icon-wrap">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                <circle cx="7" cy="10" r="1.5"/><circle cx="12" cy="10" r="1.5"/><circle cx="17" cy="10" r="1.5"/>
              </svg>
            </div>
            <div class="service-name">{{ $t('home.simulation', '시뮬레이션') }}</div>
            <div class="service-caption">{{ $t('home.simulationDesc', '가상 추첨 및 확률 시뮬레이션') }}</div>
          </div>

          <!-- 2. 통계 -->
          <div class="service-card" @click="$router.push('/stats')">
            <div class="service-icon-wrap">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 20V10M12 20V4M6 20v-6"/>
              </svg>
            </div>
            <div class="service-name">{{ $t('home.stats', '통계') }}</div>
            <div class="service-caption">{{ $t('home.statsDesc', '번호별 출현 빈도 및 통계 분석') }}</div>
          </div>

          <!-- 3. 심층분석 -->
          <div class="service-card" @click="$router.push('/analysis')">
            <div class="service-icon-wrap">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
              </svg>
            </div>
            <div class="service-name">{{ $t('home.analysis', '심층분석') }}</div>
            <div class="service-caption">{{ $t('home.analysisDesc', '패턴 및 홀짝·구간 심층 분석') }}</div>
          </div>

          <!-- 4. 운세/재미 -->
          <div class="service-card" @click="$router.push('/fortune')">
            <div class="service-icon-wrap">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div class="service-name">{{ $t('home.fortune', '운세/재미') }}</div>
            <div class="service-caption">{{ $t('home.fortuneDesc', '오늘의 띠별·별자리 행운 번호') }}</div>
          </div>
        </div>
      </section>

      <!-- 2-2. ⭐ 저장된 번호 (최대 5게임) 섹션 -->
      <section class="saved-numbers-section mb-10">
        <div class="saved-card-box">
          <div class="saved-card-header">
            <div class="d-flex align-center justify-center">
              <span class="star-emoji mr-2">⭐</span>
              <h3 class="saved-card-title">{{ $t('home.savedSectionTitle', '저장된 번호 (최대 5게임)') }}</h3>
            </div>
            <router-link to="/saved" class="saved-manage-link" title="마이페이지에서 관리">
              {{ $t('home.manageAll', '전체관리') }} <v-icon size="14">mdi-chevron-right</v-icon>
            </router-link>
          </div>

          <!-- 저장된 번호 리스트가 있을 때 -->
          <div v-if="savedNumbers && savedNumbers.length > 0" class="saved-games-list">
            <div
              v-for="(entry, idx) in savedNumbers.slice(0, 5)"
              :key="idx"
              class="saved-game-row"
            >
              <div class="saved-balls-wrap">
                <NumberCircle
                  v-for="n in entry.numbers"
                  :key="n"
                  :number="n"
                  :size="ballCircleSize"
                />
              </div>
              <div class="saved-date-text">
                {{ formatSavedDate(entry.date) }}
              </div>
            </div>
          </div>

          <!-- 저장된 번호가 아직 없을 때 (Empty State) -->
          <div v-else class="saved-empty-box">
            <v-icon size="36" color="grey-lighten-1" class="mb-2">mdi-clover</v-icon>
            <p class="empty-guide-text mb-3">
              <strong>{{ $t('home.emptySavedTitle', '아직 저장된 번호가 없습니다.') }}</strong><br>
              {{ $t('home.emptySavedDesc', '나만의 행운 조합 번호를 추천받아 저장해 보세요!') }}
            </p>
            <button type="button" class="btn-empty-draw" @click="openDrawModal">
              <v-icon size="16" class="mr-1">mdi-sparkles</v-icon>
              {{ $t('home.emptyDrawBtn', '번호 추천받고 저장하기') }}
            </button>
          </div>
        </div>
      </section>

      <!-- 2-3. 커뮤니티 최신글 섹션 -->
      <section class="community-recent-section mb-10">
        <div class="community-card-box">
          <div class="saved-card-header">
            <div class="d-flex align-center">
              <v-icon size="20" color="primary" class="mr-2">mdi-post-outline</v-icon>
              <h3 class="saved-card-title">{{ $t('home.communityRecent', '커뮤니티 최신글') }}</h3>
            </div>
            <router-link to="/blog" class="saved-manage-link">
              {{ $t('home.viewMore', '더보기') }} <v-icon size="14">mdi-chevron-right</v-icon>
            </router-link>
          </div>
          <ul class="deck-list">
            <li v-for="post in topBlogPosts" :key="post.id" class="deck-item">
              <div class="deck-item-left">
                <v-icon size="16" color="primary">mdi-file-document-outline</v-icon>
                <router-link :to="`/blog/${post.id}`" class="post-title-link">
                  {{ post.title }}
                </router-link>
              </div>
              <div class="deck-meta">
                <span class="author-tag mr-2">{{ post.author }}</span>
                <span>{{ formatShortDate(post.date) }}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- 2-4. 애드센스 심사 통과를 위한 전문 알고리즘 및 로또 정보 가이드 섹션 -->
      <section class="seo-info-card pa-6 rounded-xl mb-12">
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-3">
          {{ $t('home.seoGuideTitle') }}
        </h3>
        <div class="text-caption text-grey-darken-2" style="line-height: 1.7;">
          <p class="mb-3">
            {{ $t('home.seoP1') }}
          </p>
          <p class="mb-3">
            {{ $t('home.seoP2') }}
          </p>
          <p>
            {{ $t('home.seoP3') }}
          </p>
        </div>
      </section>

    </div>

    <!-- ================= 3. 인터랙티브 번호 생성기 모달 (Dialog) ================= -->
    <v-dialog v-model="drawDialog" max-width="560" scrollable>
      <v-card class="rounded-2xl pa-6 text-center">
        <!-- 모달 헤더 -->
        <div class="d-flex justify-space-between align-center mb-4">
          <div class="d-flex align-center" style="gap: 8px;">
            <v-icon color="primary" size="24">mdi-clover</v-icon>
            <span class="text-h6 font-weight-bold text-primary">{{ $t('home.modal.title', '행운의 번호 추첨') }}</span>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="drawDialog = false" />
        </div>

        <!-- 3D 믹서 애니메이션 -->
        <div v-show="!skipAnimation" class="mb-4">
          <div class="lotto-mixer-box">
            <div
              v-for="ball in mixerBalls"
              :key="ball.id"
              class="mixer-ball-dot"
              :style="{
                transform: `translate3d(${ball.x}px, ${ball.y}px, 0)`,
                background: ball.color
              }"
            ></div>
          </div>
        </div>

        <!-- 번호 표시판 -->
        <div class="d-flex justify-center align-center mb-6 flex-wrap" style="gap: 8px;">
          <div
            v-for="idx in 6"
            :key="idx"
            class="dialog-slot-wrap"
          >
            <span
              v-if="displayNumbers[idx - 1]"
              class="dialog-ball-circle"
              :style="{ background: getBallColor(displayNumbers[idx - 1]) }"
            >
              {{ displayNumbers[idx - 1] }}
            </span>
            <div v-else class="dialog-empty-slot">?</div>
          </div>
        </div>

        <!-- 컨트롤 옵션 -->
        <div class="d-flex justify-center align-center mb-6 text-caption text-grey" style="gap: 16px;">
          <v-checkbox
            v-model="skipAnimation"
            :label="$t('home.modal.skipAnim', '추첨 연출 생략')"
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
            {{ isMuted ? $t('home.modal.mute', '음소거') : $t('home.modal.unmute', '소리 켬') }}
          </v-btn>
        </div>

        <!-- 모달 액션 버튼 -->
        <div class="d-flex justify-center flex-wrap" style="gap: 10px;">
          <v-btn
            color="primary"
            size="large"
            rounded="lg"
            :disabled="isDrawing"
            @click="startDraw"
            prepend-icon="mdi-refresh"
          >
            {{ isDrawing ? $t('home.modal.drawing', '추첨 중...') : $t('home.modal.redraw', '다시 뽑기') }}
          </v-btn>
          <v-btn
            color="secondary"
            variant="flat"
            size="large"
            rounded="lg"
            :disabled="isDrawing || numbers.length < 6"
            @click="saveDrawnNumbers"
            prepend-icon="mdi-content-save"
          >
            {{ $t('home.modal.save', '저장하기') }}
          </v-btn>
          <v-btn
            color="grey-darken-1"
            variant="outlined"
            size="large"
            rounded="lg"
            :disabled="isDrawing || numbers.length < 6"
            @click="shareDrawnNumbers"
            prepend-icon="mdi-share-variant"
          >
            {{ $t('home.modal.share', '공유') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- 공유 모달 -->
    <ShareModal
      v-model="showShareModal"
      :title="shareTitle"
      :text="shareText"
      :url="shareUrl"
    />

    <!-- 토스트 알림 -->
    <v-snackbar v-model="snackbar" timeout="2500" color="primary" rounded="pill">
      {{ snackbarText }}
      <template #actions>
        <v-btn variant="text" @click="snackbar = false">닫기</v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useLottoStore, LottoEntry } from '../store'
import lottoResults from '../assets/lotto_numbers_en.json'
import blogData from '../assets/blog_posts.json'
import ShareModal from '../components/ShareModal.vue'
import NumberCircle from '../components/NumberCircle.vue'
import { playConfetti } from '../utils/AnimHelper'
import { playDrawBeep, playVictoryChime } from '../utils/AudioHelper'

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
  components: { ShareModal, NumberCircle },
  setup() {
    const { t } = useI18n()
    const lottoStore = useLottoStore()
    const { mobile } = useDisplay()
    const ballCircleSize = computed(() => mobile.value ? 36 : 46)

    // 저장된 번호 목록
    const savedNumbers = computed(() => lottoStore.savedNumbers as LottoEntry[])

    function formatSavedDate(iso: string) {
      if (!iso) return ''
      const d = new Date(iso)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const h = String(d.getHours()).padStart(2, '0')
      const mi = String(d.getMinutes()).padStart(2, '0')
      return `${y}.${m}.${day} ${h}:${mi}`
    }

    // 1. 실제 최신 당첨 데이터 바인딩
    const allResults = lottoResults as any[]
    const latestRoundData = computed(() => allResults[0] || null)
    const latestBalls = computed(() => {
      if (!latestRoundData.value) return []
      return [
        latestRoundData.value.num1,
        latestRoundData.value.num2,
        latestRoundData.value.num3,
        latestRoundData.value.num4,
        latestRoundData.value.num5,
        latestRoundData.value.num6
      ]
    })
    const recent5Results = computed(() => allResults.slice(0, 5))
    const topBlogPosts = computed(() => (blogData as any[]).slice(0, 3))

    // 로또 볼 색상 결정 규칙 (로또 표준 대역 매핑)
    function getBallColor(num: number): string {
      if (num <= 10) return '#f59e0b' // 노랑/골드
      if (num <= 20) return '#2563eb' // 파랑
      if (num <= 30) return '#ef4444' // 빨강
      if (num <= 40) return '#475569' // 차콜/그레이
      return '#16a34a'                 // 초록
    }

    // 2. 인터랙티브 번호 생성기 상태
    const drawDialog = ref(false)
    const skipAnimation = ref(localStorage.getItem('skipAnimation') === 'true')
    const isMuted = ref(localStorage.getItem('isMuted') === 'true')
    const numbers = ref<number[]>([])
    const displayNumbers = ref<number[]>([])
    const isDrawing = ref(false)

    const snackbar = ref(false)
    const snackbarText = ref('')

    // 3D 믹서 애니메이션 물리 상수
    const mixerBalls = ref<MixerBall[]>([])
    let animationFrameId: number | null = null
    const BALL_COUNT = 24
    const MIXER_RADIUS = 100
    const BALL_RADIUS = 9
    const CENTER_X = 110
    const CENTER_Y = 110

    const ballColors = [
      '#f59e0b', '#2563eb', '#ef4444', '#475569', '#16a34a'
    ]

    function initMixer() {
      const balls: MixerBall[] = []
      for (let i = 0; i < BALL_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.random() * (MIXER_RADIUS - BALL_RADIUS - 10)
        const x = CENTER_X + Math.cos(angle) * r
        const y = CENTER_Y + Math.sin(angle) * r
        const speed = 1.5 + Math.random() * 2
        const dir = Math.random() * Math.PI * 2
        const vx = Math.cos(dir) * speed
        const vy = Math.sin(dir) * speed
        balls.push({ id: i, x, y, vx, vy, color: ballColors[i % ballColors.length] })
      }
      mixerBalls.value = balls
    }

    function updatePhysics() {
      mixerBalls.value.forEach(ball => {
        const speedMultiplier = isDrawing.value ? 2.2 : 0.6
        ball.x += ball.vx * speedMultiplier
        ball.y += ball.vy * speedMultiplier

        const dx = ball.x - CENTER_X
        const dy = ball.y - CENTER_Y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const limit = MIXER_RADIUS - BALL_RADIUS - 6

        if (dist > limit) {
          ball.x = CENTER_X + (dx / dist) * limit
          ball.y = CENTER_Y + (dy / dist) * limit
          const nx = dx / dist
          const ny = dy / dist
          const k = ball.vx * nx + ball.vy * ny
          ball.vx = ball.vx - 2 * k * nx
          ball.vy = ball.vy - 2 * k * ny
          ball.vx += (Math.random() - 0.5) * 0.2
          ball.vy += (Math.random() - 0.5) * 0.2
        }
      })
      animationFrameId = requestAnimationFrame(updatePhysics)
    }

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
        isDuplicate = allResults.some((e: any) => {
          const past = [e.num1, e.num2, e.num3, e.num4, e.num5, e.num6].sort((a, b) => a - b)
          return past.every((n, i) => n === pick[i])
        })
      } while (isDuplicate)
      return pick
    }

    async function startDraw() {
      if (isDrawing.value) return
      const target = generateTargetNumbers()
      displayNumbers.value = []
      numbers.value = []

      if (skipAnimation.value) {
        numbers.value = [...target]
        displayNumbers.value = [...target]
        if (!isMuted.value) playVictoryChime()
        playConfetti()
        return
      }

      isDrawing.value = true
      let count = 0
      const timer = setInterval(() => {
        if (count < 6) {
          displayNumbers.value.push(target[count])
          if (!isMuted.value) playDrawBeep()
          count++
        } else {
          clearInterval(timer)
          numbers.value = [...target]
          setTimeout(() => {
            displayNumbers.value = [...target]
            isDrawing.value = false
            if (!isMuted.value) playVictoryChime()
            playConfetti()
          }, 200)
        }
      }, 400)
    }

    function openDrawModal() {
      drawDialog.value = true
      if (numbers.value.length === 0) {
        startDraw()
      }
    }

    function saveDrawnNumbers() {
      if (numbers.value.length < 6) return
      lottoStore.save(numbers.value)
      snackbarText.value = t('home.modal.savedSuccess', '번호가 성공적으로 저장되었습니다!')
      snackbar.value = true
    }

    // 공유 모달
    const showShareModal = ref(false)
    const shareTitle = ref('')
    const shareText = ref('')
    const shareUrl = ref('')

    function shareDrawnNumbers() {
      if (numbers.value.length < 6) return
      shareTitle.value = t('home.modal.shareTitle', '☘️ LottoMate 추천 번호!')
      shareText.value = t('home.modal.shareText', { numbers: numbers.value.join(', ') })
      shareUrl.value = window.location.origin
      showShareModal.value = true
    }

    function formatShortDate(iso: string) {
      if (!iso) return ''
      return iso.substring(0, 10).replace(/-/g, '.')
    }

    onMounted(() => {
      lottoStore.load()
      initMixer()
      updatePhysics()
    })

    onBeforeUnmount(() => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      localStorage.setItem('skipAnimation', skipAnimation.value.toString())
      localStorage.setItem('isMuted', isMuted.value.toString())
    })

    return {
      latestRoundData,
      latestBalls,
      recent5Results,
      topBlogPosts,
      getBallColor,
      drawDialog,
      openDrawModal,
      skipAnimation,
      isMuted,
      numbers,
      displayNumbers,
      isDrawing,
      mixerBalls,
      startDraw,
      saveDrawnNumbers,
      shareDrawnNumbers,
      snackbar,
      snackbarText,
      showShareModal,
      shareTitle,
      shareText,
      shareUrl,
      formatShortDate,
      savedNumbers,
      formatSavedDate,
      ballCircleSize
    }
  }
})
</script>

<style scoped>
.home-page {
  width: 100%;
}

/* 1. 히어로 영역 */
.hero-section {
  background: linear-gradient(180deg, #edf7f0 0%, #f7faf8 65%, #ffffff 100%);
  padding: 56px 24px 46px;
  position: relative;
  overflow: hidden;
}

.v-theme--dark .hero-section {
  background: linear-gradient(180deg, #0b1324 0%, #0f172a 65%, #0f172a 100%);
}

.hero-section::after {
  content: "";
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(167, 243, 208, 0.35) 0%, rgba(240, 253, 244, 0) 70%);
  border-radius: 50%;
  pointer-events: none;
}

.v-theme--dark .hero-section::after {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0) 70%);
}

.hero-container {
  max-width: 1160px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 40px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1.25;
  color: #111827;
  margin-bottom: 14px;
}

.v-theme--dark .hero-title {
  color: #f1f5f9;
}

.hero-subtitle {
  font-size: 18px;
  color: #4e5968;
  font-weight: 500;
  margin-bottom: 30px;
}

.v-theme--dark .hero-subtitle {
  color: #94a3b8;
}

.hero-btn-wrap {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: #17653a;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(23, 101, 58, 0.25);
}

.btn-primary:hover {
  background: #12532f;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(23, 101, 58, 0.35);
}

.btn-outline {
  background: #ffffff;
  color: #17653a;
  border: 1px solid #80c89a;
}

.btn-outline:hover {
  background: #f0f7f2;
}

.v-theme--dark .btn-outline {
  background: rgba(255, 255, 255, 0.05);
  color: #6ee7b7;
  border: 1px solid #059669;
}

.v-theme--dark .btn-outline:hover {
  background: rgba(5, 150, 105, 0.15);
  color: #a7f3d0;
}

/* 최신 당첨번호 카드 */
.hero-lotto-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 28px 30px;
  border: 1px solid #eef2ef;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
}

.v-theme--dark .hero-lotto-card {
  background: #1e293b;
  border-color: #334155;
}

.card-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;
}

.round-badge {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.4px;
}

.v-theme--dark .round-badge {
  color: #f1f5f9;
}

.draw-date {
  font-size: 13px;
  color: #8b95a1;
}

.balls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 6px;
}

.six-balls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ball-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
}

.plus-symbol {
  font-size: 18px;
  font-weight: 600;
  color: #8b95a1;
  padding: 0 4px;
}

.bonus-ball {
  background: #ffffff !important;
  border: 2px solid #17653a;
  color: #17653a;
  box-shadow: 0 2px 8px rgba(23, 101, 58, 0.15);
}

.v-theme--dark .bonus-ball {
  background: #0f172a !important;
  border: 2px solid #22c55e;
  color: #4ade80;
  box-shadow: 0 2px 10px rgba(34, 197, 94, 0.2);
}

.card-action-btn {
  width: 100%;
  border: 1px solid #e2e8f0;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.v-theme--dark .card-action-btn {
  color: #cbd5e1;
  border-color: #475569;
}

.card-action-btn:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
  color: #17653a;
}

.v-theme--dark .card-action-btn:hover {
  border-color: #64748b;
  background: #334155;
  color: #6ee7b7;
}

/* 2. 본문 영역 */
.main-body-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  width: 100%;
}

.content-heading {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 18px;
  letter-spacing: -0.4px;
}

.v-theme--dark .content-heading {
  color: #f1f5f9;
}

/* 주요 서비스 4단 그리드 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.service-card {
  background: #ffffff;
  border: 1px solid #eef2ef;
  border-radius: 16px;
  padding: 26px 14px 22px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.v-theme--dark .service-card {
  background: #1e293b;
  border-color: #334155;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(23, 101, 58, 0.08);
  border-color: #a7f3d0;
}

.service-icon-wrap {
  width: 48px;
  height: 48px;
  margin-bottom: 14px;
  color: #17653a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-theme--dark .service-icon-wrap {
  color: #22c55e;
}

.service-name {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
}

.v-theme--dark .service-name {
  color: #f1f5f9;
}

.service-caption {
  font-size: 12px;
  color: #8b95a1;
  line-height: 1.4;
  font-weight: 500;
}

/* 2열 레이아웃 */
.middle-section {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 22px;
}

.recent-table-card {
  background: #ffffff;
  border: 1px solid #eef2ef;
  border-radius: 18px;
  padding: 24px 26px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.v-theme--dark .recent-table-card {
  background: #1e293b;
  border-color: #334155;
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.card-inner-title {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.v-theme--dark .card-inner-title {
  color: #f1f5f9;
}

.view-more-link {
  font-size: 13px;
  color: #8b95a1;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  transition: color 0.15s;
}

.view-more-link:hover {
  color: #17653a;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.results-table th {
  color: #8b95a1;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 4px;
  border-bottom: 1px solid #f1f5f2;
}

.results-table td {
  padding: 12px 4px;
  vertical-align: middle;
  border-bottom: 1px solid #f9fbf9;
  font-size: 13px;
}

.td-round {
  font-weight: 700;
  color: #1f2937;
}

.v-theme--dark .td-round {
  color: #f1f5f9;
}

.td-date {
  color: #9ca3af;
  font-size: 12px;
}

.td-balls-flex {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
}

.ball-mini {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: #ffffff;
}

.td-bonus {
  font-weight: 700;
  color: #4b5563;
}

.v-theme--dark .td-bonus {
  color: #cbd5e1;
}

.btn-detail-pill {
  padding: 4px 12px;
  background: #f8faf8;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-detail-pill:hover {
  background: #f0f7f2;
  border-color: #86efac;
  color: #17653a;
}

/* 프리미엄 분석 서비스 프로모션 배너 */
.premium-promo-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 45%, #e1f6e8 100%);
  border: 1px solid #d1fae5;
  border-radius: 18px;
  padding: 34px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.v-theme--dark .premium-promo-card {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
  border-color: #047857;
}

.promo-text-wrap {
  max-width: 62%;
  z-index: 1;
}

.promo-badge {
  font-size: 22px;
  font-weight: 800;
  color: #14532d;
  margin-bottom: 8px;
  letter-spacing: -0.4px;
}

.v-theme--dark .promo-badge {
  color: #6ee7b7;
}

.promo-subcopy {
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
  margin-bottom: 22px;
}

.v-theme--dark .promo-subcopy {
  color: #e2e8f0;
}

.btn-promo-action {
  background: #17653a;
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(20, 83, 45, 0.22);
  transition: all 0.2s;
}

.btn-promo-action:hover {
  background: #14532d;
  transform: translateY(-1px);
}

.promo-vector-illust {
  width: 125px;
  height: 125px;
  flex-shrink: 0;
  z-index: 1;
}

/* 3단 정보 카드 그리드 */
.bottom-info-deck {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.deck-card {
  background: #ffffff;
  border: 1px solid #eef2ef;
  border-radius: 18px;
  padding: 22px 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  min-height: 230px;
}

.v-theme--dark .deck-card {
  background: #1e293b;
  border-color: #334155;
}

.deck-card-title {
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
}

.v-theme--dark .deck-card-title {
  color: #f1f5f9;
}

.deck-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding: 0;
  margin: 0;
  flex: 1;
}

.deck-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}

.deck-item-left {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
}

.post-title-link {
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-theme--dark .post-title-link {
  color: #cbd5e1;
}

.post-title-link:hover {
  text-decoration: underline;
  color: #17653a;
}

.deck-meta {
  font-size: 12px;
  color: #9ca3af;
  flex-shrink: 0;
}

.author-tag {
  color: #6b7280;
}

.deck-bottom-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 14px;
  border-top: 1px solid #f8faf8;
}

.rank-badge {
  font-weight: 800;
  font-size: 13px;
  width: 16px;
  text-align: center;
}

.rank-1 { color: #ef4444; }
.rank-2 { color: #374151; }
.rank-3 { color: #16a34a; }

.views-meta {
  display: inline-flex;
  align-items: center;
  color: #6b7280;
  font-size: 12px;
}

/* SEO 섹션 */
.seo-info-card {
  background: #f0f7f2;
  border: 1px solid #d1fae5;
}

.v-theme--dark .seo-info-card {
  background: #1e293b;
  border-color: #334155;
}

/* 3. 모달 추첨기 스타일 */
.lotto-mixer-box {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(23, 101, 58, 0.1) 0%, rgba(20, 83, 45, 0.4) 80%);
  border: 5px solid rgba(23, 101, 58, 0.3);
  box-shadow: inset 0 0 25px rgba(23, 101, 58, 0.3);
  position: relative;
  overflow: hidden;
  margin: 0 auto 16px;
}

.mixer-ball-dot {
  position: absolute;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  box-shadow: inset -2px -2px 4px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.4);
}

.dialog-slot-wrap {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-ball-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.dialog-empty-slot {
  width: 44px;
  height: 44px;
  border: 2px dashed rgba(23, 101, 58, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(23, 101, 58, 0.4);
  font-size: 18px;
  font-weight: 700;
}

/* 반응형 미디어 쿼리 */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .middle-section {
    grid-template-columns: 1fr;
  }
  .bottom-info-deck {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  .hero-subtitle {
    font-size: 15px;
  }
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .service-card {
    padding: 18px 12px;
  }
  .hero-lotto-card {
    padding: 22px 20px;
  }
  .ball-circle {
    width: 38px;
    height: 38px;
    font-size: 14px;
  }
  .premium-promo-card {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  .promo-text-wrap {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-btn-wrap {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .ball-circle {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
  .six-balls {
    gap: 4px;
  }
  .ball-mini {
    width: 22px;
    height: 22px;
    font-size: 10px;
  }
  .td-balls-flex {
    gap: 3px;
  }
  .results-table th,
  .results-table td {
    padding: 8px 2px;
    font-size: 11px;
  }
  .btn-detail-pill {
    padding: 2px 8px;
    font-size: 11px;
  }
}

/* ⭐ 저장된 번호 (최대 5게임) 카드 스타일 */
.saved-numbers-section,
.community-recent-section {
  display: flex;
  justify-content: center;
  width: 100%;
}

.saved-card-box,
.community-card-box {
  background: #ffffff;
  border: 1px solid #eef2ef;
  border-radius: 22px;
  padding: 30px 24px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  width: 100%;
  max-width: 600px;
  position: relative;
}

.v-theme--dark .saved-card-box,
.v-theme--dark .community-card-box {
  background: #1e293b;
  border-color: #334155;
}

.saved-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f2;
}

.v-theme--dark .saved-card-header {
  border-bottom-color: #334155;
}

.star-emoji {
  font-size: 20px;
}

.saved-card-title {
  font-size: 19px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.4px;
  margin: 0;
}

.v-theme--dark .saved-card-title {
  color: #f1f5f9;
}

.saved-manage-link {
  font-size: 13px;
  font-weight: 600;
  color: #8b95a1;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  transition: color 0.15s;
}

.saved-manage-link:hover {
  color: #17653a;
}

.saved-games-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.saved-game-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.saved-balls-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.saved-date-text {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
  letter-spacing: -0.2px;
}

.saved-empty-box {
  padding: 30px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-guide-text {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}

.btn-empty-draw {
  background: #17653a;
  color: #ffffff;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 4px 10px rgba(23, 101, 58, 0.2);
  transition: all 0.2s;
}

.btn-empty-draw:hover {
  background: #12532f;
  transform: translateY(-1px);
}
</style>
