<template>
  <v-container fluid class="analysis-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-chart-pie</v-icon>
          심층 패턴 분석
        </div>
        <h1 class="subpage-title">로또 번호 심층 분석</h1>
        <p class="subpage-subtitle">
          합계 구간 정규분포, 5대 색상 대역 비중, 홀짝 비율 추이 등 다차원 패턴을 과학적으로 분석합니다.
        </p>
      </div>

      <!-- 1. 합계 구간 분포 카드 -->
      <div class="clean-card pa-6 pa-sm-8 mb-8">
        <div class="section-title-row mb-4">
          <div>
            <h2 class="card-inner-title mb-1">합계 구간 정규분포 (최근 100회)</h2>
            <p class="card-inner-sub">6개 당첨 번호의 총합이 어느 구간에 밀집되는지 보여주는 통계입니다 (이론상 중심: 138).</p>
          </div>
        </div>

        <div class="chart-box" style="height: 280px;">
          <Bar v-if="loaded" :data="sumData" :options="chartOptions" />
        </div>
      </div>

      <!-- 2. 색상 분포 & 홀짝 비율 추이 (2열 그리드) -->
      <v-row class="mb-8">
        <!-- 번호 색상 분포 도넛 차트 -->
        <v-col cols="12" md="6">
          <div class="clean-card pa-6 fill-height">
            <div class="section-title-row mb-4">
              <div>
                <h3 class="card-inner-title mb-1">5대 색상 대역별 출현 비율</h3>
                <p class="card-inner-sub">역대 모든 당첨 번호의 볼 색상별 누적 점유율입니다.</p>
              </div>
            </div>
            <div class="d-flex justify-center align-center" style="height: 260px;">
              <Doughnut v-if="loaded" :data="colorData" :options="doughnutOptions" />
            </div>
          </div>
        </v-col>

        <!-- 홀짝 비율 추이 라인 차트 -->
        <v-col cols="12" md="6">
          <div class="clean-card pa-6 fill-height">
            <div class="section-title-row mb-4">
              <div>
                <h3 class="card-inner-title mb-1">홀수 출현 개수 추이 (최근 20회)</h3>
                <p class="card-inner-sub">회차별 홀짝 균형 추이와 연속 패턴 흐름입니다.</p>
              </div>
            </div>
            <div style="height: 260px;">
              <Line v-if="loaded" :data="oddEvenData" :options="lineOptions" />
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- 3. 심층 패턴 분석 해설 카드 (SEO & 정보성 강화) -->
      <div class="clean-card pa-6 text-left mb-8">
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-3">
          📈 합계 구간 정규분포 및 다차원 패턴 필터링 가이드
        </h3>
        <div class="text-body-2 text-grey-darken-1" style="line-height: 1.8;">
          <p class="mb-3">
            <strong>1. 합계 구간(Sum Distribution)의 의미:</strong> 로또 6개 번호의 이론적 합계 범위는 21부터 255까지입니다. 중심극한정리에 의해 역대 당첨 번호의 합계는 가운데 지점인 <strong>138을 축으로 종 모양의 대칭 정규분포</strong>를 형성하며, 전체 당첨 번호의 약 80% 이상이 <code>100 ~ 170</code> 구간 사이에 안정적으로 밀집됩니다.
          </p>
          <p class="mb-3">
            <strong>2. 5대 색상 대역의 분산:</strong> 1~10(노랑), 11~20(파랑), 21~30(빨강), 31~40(회색), 41~45(초록)의 5개 구간에서 보통 3~4개 이상의 색상이 골고루 섞여 출현합니다. 특정 한 가지 색상 구간에 5~6개 번호가 몰릴 이론적 확률은 약 0.44%로 매우 낮으며, 실제 과거 1,200회 이상의 추첨에서도 대부분의 회차는 3~4개 이상의 다양한 색상 대역에 고르게 분산되어 출현했습니다.
          </p>
          <p class="mb-0">
            <strong>3. 홀짝 균형 전략:</strong> 홀수와 짝수의 비율이 3:3 (약 33%) 또는 4:2 / 2:4 (약 48%)인 경우가 전체의 81% 이상입니다. 올홀수(6:0)나 올짝수(0:6)와 같은 극단적인 형태를 제외하는 것은 과거에 드물었던 형태를 제외하는 취향 기반 필터이며, 개별 조합의 당첨 확률(814만분의 1) 자체를 높이지는 않습니다.
          </p>
        </div>
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'
import { Bar, Doughnut, Line } from 'vue-chartjs'
import data from '../assets/lotto_numbers_en.json'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

const loaded = ref(false)

type Row = { round: number; num1: number; num2: number; num3: number; num4: number; num5: number; num6: number; bonus: number; draw_date: string }
const rows = data as unknown as Row[]

// Colors
const colors = {
  yellow: '#f59e0b', // 1-10
  blue: '#3b82f6',   // 11-20
  red: '#ef4444',    // 21-30
  grey: '#6b7280',   // 31-40
  green: '#10b981'   // 41-45
}

// 1. Sum Distribution (Last 100 rounds)
const sumData = computed(() => {
  const last100 = rows.slice(0, 100)
  const labels = ['~50', '51-75', '76-100', '101-125', '126-150', '151-175', '176-200', '201-225', '226~']
  const counts = Array(9).fill(0)

  last100.forEach(r => {
    const sum = r.num1 + r.num2 + r.num3 + r.num4 + r.num5 + r.num6
    if(sum <= 50) counts[0]++
    else if(sum <= 75) counts[1]++
    else if(sum <= 100) counts[2]++
    else if(sum <= 125) counts[3]++
    else if(sum <= 150) counts[4]++
    else if(sum <= 175) counts[5]++
    else if(sum <= 200) counts[6]++
    else if(sum <= 225) counts[7]++
    else counts[8]++
  })

  return {
    labels,
    datasets: [{
      label: '출현 회수',
      backgroundColor: '#17653a',
      borderRadius: 6,
      data: counts
    }]
  }
})

// 2. Color Distribution (All time)
const colorData = computed(() => {
  const counts = { yellow: 0, blue: 0, red: 0, grey: 0, green: 0 }
  const checkColor = (n: number) => {
    if (n <= 10) counts.yellow++
    else if (n <= 20) counts.blue++
    else if (n <= 30) counts.red++
    else if (n <= 40) counts.grey++
    else counts.green++
  }

  rows.forEach(r => {
    [r.num1, r.num2, r.num3, r.num4, r.num5, r.num6].forEach(checkColor)
  })

  return {
    labels: ['1-10(노랑)', '11-20(파랑)', '21-30(빨강)', '31-40(회색)', '41-45(초록)'],
    datasets: [{
      backgroundColor: [colors.yellow, colors.blue, colors.red, colors.grey, colors.green],
      data: [counts.yellow, counts.blue, counts.red, counts.grey, counts.green],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  }
})

// 3. Odd/Even Trend (Last 20)
const oddEvenData = computed(() => {
  const target = rows.slice(0, 20).reverse()
  const labels = target.map(r => `${r.round}회`)
  const oddCounts = target.map(r => {
    let odd = 0
    ;[r.num1, r.num2, r.num3, r.num4, r.num5, r.num6].forEach(n => { if (n % 2 !== 0) odd++ })
    return odd
  })

  return {
    labels,
    datasets: [
      {
        label: '홀수 개수 (0~6개)',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        borderColor: '#22c55e',
        pointBackgroundColor: '#17653a',
        pointBorderColor: '#ffffff',
        pointRadius: 4,
        fill: true,
        data: oddCounts,
        tension: 0.3
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: '#f1f5f2' } }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const }
  }
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: {
      min: 0,
      max: 6,
      ticks: { stepSize: 1 },
      grid: { color: '#f1f5f2' }
    }
  }
}

onMounted(() => {
  loaded.value = true
})
</script>

<style scoped>
.analysis-view {
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

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
}
</style>
