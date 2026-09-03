<template>
  <v-container fluid class="stats-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-chart-bar</v-icon>
          빅데이터 통계
        </div>
        <h1 class="subpage-title">로또 번호별 통계 분석</h1>
        <p class="subpage-subtitle">
          역대 1,200회 이상의 실제 당첨 데이터를 바탕으로 45개 번호의 출현 빈도와 패턴을 심층 분석합니다.
        </p>
      </div>

      <!-- 1. 45개 전체 번호 출현 빈도 차트 카드 -->
      <div class="clean-card pa-6 pa-sm-8 mb-8">
        <div class="section-title-row mb-4">
          <div>
            <h2 class="card-inner-title mb-1">전체 번호 출현 빈도 (1~45번)</h2>
            <p class="card-inner-sub">번호 대역별 색상으로 시각화된 역대 누적 당첨 횟수입니다.</p>
          </div>
        </div>

        <div class="chart-box" style="height: 320px;">
          <Bar v-if="loaded" :data="freqData" :options="freqOptions" />
        </div>
      </div>

      <!-- 2. 상위 10위 (HOT) & 하위 10위 (COLD) 2열 그리드 -->
      <v-row class="mb-8">
        <!-- 상위 10위 (가장 많이 나온 번호) -->
        <v-col cols="12" md="6">
          <div class="clean-card pa-6 fill-height">
            <div class="d-flex align-center mb-3">
              <span class="stat-badge hot-badge mr-2">🔥 HOT</span>
              <h3 class="card-inner-title">가장 많이 나온 번호 TOP 10</h3>
            </div>
            <p class="card-inner-sub mb-4">역대 당첨 번호 중 가장 높은 빈도로 출현한 행운의 숫자들입니다.</p>
            <div style="height: 280px;">
              <Bar v-if="loaded" :data="top10Data" :options="horizontalOptions" />
            </div>
          </div>
        </v-col>

        <!-- 하위 10위 (가장 적게 나온 번호) -->
        <v-col cols="12" md="6">
          <div class="clean-card pa-6 fill-height">
            <div class="d-flex align-center mb-3">
              <span class="stat-badge cold-badge mr-2">❄️ COLD</span>
              <h3 class="card-inner-title">가장 적게 나온 번호 TOP 10</h3>
            </div>
            <p class="card-inner-sub mb-4">상대적으로 출현 빈도가 낮아 다음 출현이 기대되는 번호들입니다.</p>
            <div style="height: 280px;">
              <Bar v-if="loaded" :data="bottom10Data" :options="horizontalOptions" />
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- 3. 끝수(0~9) 분포 분석 카드 -->
      <div class="clean-card pa-6 pa-sm-8 mb-8">
        <div class="section-title-row mb-4">
          <div>
            <h2 class="card-inner-title mb-1">일의 자리 끝수(0~9) 출현 분포</h2>
            <p class="card-inner-sub">당첨 번호 끝자리 숫자의 누적 빈도 분석 통계입니다.</p>
          </div>
        </div>

        <div class="chart-box" style="height: 220px;">
          <Bar v-if="loaded" :data="tailData" :options="tailOptions" />
        </div>
      </div>

      <!-- 4. 심층 통계 해설 섹션 (SEO & 정보성 강화) -->
      <div class="clean-card pa-6 text-left mb-8">
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-3">
          📊 로또 통계 분석 지표 및 대수의 법칙(Law of Large Numbers) 해설
        </h3>
        <div class="text-body-2 text-grey-darken-1" style="line-height: 1.8;">
          <p class="mb-3">
            대한민국 로또 6/45의 역대 1회부터 현재까지 1,200회 이상의 추첨 통계를 집계하면, 45개 번호 중 가장 많이 출현한 상위권 번호와 하위권 번호 사이에 표본 통계적 편차가 관찰됩니다.
          </p>
          <p class="mb-3">
            <strong>대수의 법칙과 통계적 의미:</strong> 수학적으로 시행 횟수가 무한히 증가할 경우 모든 45개 숫자의 출현 확률은 동일하게 <code>1/45 (약 2.22%)</code>로 수렴하게 됩니다. 현재의 출현 편차는 표본 누적 과정에서의 일시적인 표준편차를 나타내며, 번호 조합 시 지나치게 빈출수나 낙첨수에만 쏠리지 않도록 균형을 조율하는 데 활용할 수 있습니다.
          </p>
          <p class="mb-0">
            <strong>끝수 분포 활용법:</strong> 0부터 9까지의 끝수(일의 자리 숫자) 통계를 살펴보면, 6개 번호 조합 중 동일한 끝수가 3개 이상 겹치지 않고 4개 이상의 서로 다른 끝수로 구성된 조합이 전체 당첨 번호의 약 85% 이상을 차지합니다.
          </p>
        </div>
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import data from '../assets/lotto_numbers_en.json'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Row = { round: number; num1: number; num2: number; num3: number; num4: number; num5: number; num6: number; bonus: number; draw_date: string }
const rows = data as unknown as Row[]
const { t } = useI18n()
const loaded = ref(false)

const freq = computed(() => {
  const f = Array.from({ length: 46 }, () => 0)
  for (const r of rows) {
    f[r.num1]++; f[r.num2]++; f[r.num3]++; f[r.num4]++; f[r.num5]++; f[r.num6]++
  }
  return f
})

const sorted = computed(() => {
  const arr = [] as { num: number; cnt: number }[]
  for (let n = 1; n <= 45; n++) arr.push({ num: n, cnt: freq.value[n] })
  return arr.sort((a, b) => b.cnt - a.cnt)
})

// 번호별 로또 볼 색상 매핑 함수
function getBallColorHex(n: number) {
  if (n <= 10) return '#f59e0b' // Yellow
  if (n <= 20) return '#3b82f6' // Blue
  if (n <= 30) return '#ef4444' // Red
  if (n <= 40) return '#6b7280' // Grey
  return '#10b981'             // Green
}

// Main Frequency Data (All 45 numbers with range colors)
const freqData = computed(() => {
  const nums = Array.from({ length: 45 }, (_, i) => i + 1)
  return {
    labels: nums.map(n => `${n}번`),
    datasets: [{
      label: '출현 횟수',
      backgroundColor: nums.map(n => getBallColorHex(n)),
      borderRadius: 4,
      data: nums.map(n => freq.value[n])
    }]
  }
})

// Top 10 (HOT - Emerald)
const top10Data = computed(() => {
  const target = sorted.value.slice(0, 10)
  return {
    labels: target.map(i => `${i.num}번`),
    datasets: [{
      label: '누적 출현',
      backgroundColor: '#10b981',
      borderRadius: 6,
      data: target.map(i => i.cnt)
    }]
  }
})

// Bottom 10 (COLD - Rose Red)
const bottom10Data = computed(() => {
  const target = [...sorted.value].reverse().slice(0, 10).sort((a,b)=>a.cnt - b.cnt)
  return {
    labels: target.map(i => `${i.num}번`),
    datasets: [{
      label: '누적 출현',
      backgroundColor: '#f43f5e',
      borderRadius: 6,
      data: target.map(i => i.cnt)
    }]
  }
})

// Tail Distribution (Amber)
const tailData = computed(() => {
  const d = [0,0,0,0,0,0,0,0,0,0]
  for (let n = 1; n <= 45; n++) {
    const tail = n % 10
    d[tail] += freq.value[n]
  }
  return {
    labels: ['끝수 0', '끝수 1', '끝수 2', '끝수 3', '끝수 4', '끝수 5', '끝수 6', '끝수 7', '끝수 8', '끝수 9'],
    datasets: [{
      label: '끝수 누적 빈도',
      backgroundColor: '#f59e0b',
      borderRadius: 6,
      data: d
    }]
  }
})

const freqOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: '#f1f5f2' } }
  }
}

const horizontalOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: '#f1f5f2' } },
    y: { grid: { display: false } }
  }
}

const tailOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: '#f1f5f2' } }
  }
}

onMounted(() => {
  loaded.value = true
})
</script>

<style scoped>
.stats-view {
  min-height: calc(100vh - 64px);
}

.subpage-container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.subpage-hero {
  padding: 10px 0 0;
}

.subpage-badge {
  display: inline-flex;
  align-items: center;
  background: #e8f5e9;
  color: #17653a;
  font-weight: 700;
  font-size: 13px;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.v-theme--dark .subpage-badge {
  background: #064e3b;
  color: #6ee7b7;
}

.subpage-title {
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.6px;
  margin-bottom: 8px;
}

.v-theme--dark .subpage-title {
  color: #f1f5f9;
}

.subpage-subtitle {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}

.v-theme--dark .subpage-subtitle {
  color: #94a3b8;
}

.clean-card {
  background: #ffffff;
  border: 1px solid #eef2ef;
  border-radius: 22px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.v-theme--dark .clean-card {
  background: #1e293b;
  border-color: #334155;
}

.card-inner-title {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.4px;
}

.v-theme--dark .card-inner-title {
  color: #f1f5f9;
}

.card-inner-sub {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 0;
}

.v-theme--dark .card-inner-sub {
  color: #94a3b8;
}

.stat-badge {
  font-size: 12px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
}

.hot-badge {
  background: #ecfdf5;
  color: #059669;
}

.cold-badge {
  background: #fff1f2;
  color: #e11d48;
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
}
</style>
