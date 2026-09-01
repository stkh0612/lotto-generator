<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="1200" elevation="1" rounded>
      <div class="text-h4 font-weight-bold mb-2">{{ $t('analysis.title', '심층 분석') }}</div>
      <div class="mb-6 grey--text text--darken-1">{{ $t('analysis.subtitle', '과거 데이터를 기반으로 한 정밀 분석') }}</div>

      <!-- Sum Distribution -->
      <v-card class="mb-8" outlined>
        <v-card-title>{{ $t('analysis.sumTitle', '합계 구간 분포 (최근 100회)') }}</v-card-title>
        <v-card-text>
          <Bar v-if="loaded" :data="sumData" :options="chartOptions" />
        </v-card-text>
      </v-card>

      <v-row>
        <v-col cols="12" md="6">
          <v-card outlined class="fill-height">
            <v-card-title>{{ $t('analysis.colorTitle', '번호 색상 분포') }}</v-card-title>
            <v-card-text>
              <Doughnut v-if="loaded" :data="colorData" :options="doughnutOptions" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card outlined class="fill-height">
             <v-card-title>{{ $t('analysis.oddEvenTitle', '홀짝 비율 추이 (최근 20회)') }}</v-card-title>
             <v-card-text>
               <Line v-if="loaded" :data="oddEvenData" :options="chartOptions" />
             </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 심층 패턴 분석 해설 카드 (SEO & 정보성 강화) -->
      <v-card class="glass-card pa-6 text-left mt-8" style="background: rgba(124, 77, 255, 0.03) !important;">
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-3">
          📈 합계 구간 정규분포 및 다차원 패턴 필터링 가이드
        </h3>
        <div class="text-body-2 text-grey-darken-1" style="line-height: 1.8;">
          <p class="mb-3">
            <strong>1. 합계 구간(Sum Distribution)의 의미:</strong> 로또 6개 번호의 이론적 합계 범위는 21부터 255까지입니다. 중심극한정리에 의해 역대 당첨 번호의 합계는 가운데 지점인 <strong>138을 축으로 종 모양의 대칭 정규분포</strong>를 형성하며, 전체 당첨 번호의 약 80% 이상이 <code>100 ~ 170</code> 구간 사이에 안정적으로 밀집됩니다.
          </p>
          <p class="mb-3">
            <strong>2. 5대 색상 대역의 분산:</strong> 1~10(노랑), 11~20(파랑), 21~30(빨강), 31~40(회색), 41~45(초록)의 5개 구간에서 보통 3~4개 이상의 색상이 골고루 섞여 출현합니다. 특정 한 가지 색상에만 5~6개 번호가 몰리는 현상은 과거 20년간 발생 확률이 0.1% 미만에 불과합니다.
          </p>
          <p class="mb-0">
            <strong>3. 홀짝 균형 전략:</strong> 홀수와 짝수의 비율이 3:3 (약 33%) 또는 4:2 / 2:4 (약 48%)인 경우가 전체의 81% 이상입니다. 올홀수(6:0)나 올짝수(0:6)와 같은 극단적인 조합을 피하는 것만으로도 비효율적인 조합을 효과적으로 걸러낼 수 있습니다.
          </p>
        </div>
      </v-card>

    </v-sheet>
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

// Types
type Row = { round: number; num1: number; num2: number; num3: number; num4: number; num5: number; num6: number; bonus: number; draw_date: string }
const rows = data as unknown as Row[]

// Colors
const colors = {
  yellow: '#FBC400', // 1-10
  blue: '#69C8F2',   // 11-20
  red: '#FF7272',    // 21-30
  grey: '#AAAAAA',   // 31-40
  green: '#B0D840'   // 41-45
}

// 1. Sum Distribution (Last 100 rounds)
const sumData = computed(() => {
  const last100 = rows.slice(0, 100)
  const buckets = Array(10).fill(0) // 0-50, 51-100, ... 
  // Theoretical max sum = 40+41+42+43+44+45 = 255. Min = 1+2+3+4+5+6 = 21. range ~21-255.
  // Let's create buckets of 25.
  // 0-25, 26-50, 51-75, 76-100, 101-125, 126-150, 151-175, 176-200, 201-225, 226-255
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
      label: 'Frequency',
      backgroundColor: '#1976D2',
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
    labels: ['1-10 (Yellow)', '11-20 (Blue)', '21-30 (Red)', '31-40 (Grey)', '41-45 (Green)'],
    datasets: [{
      backgroundColor: [colors.yellow, colors.blue, colors.red, colors.grey, colors.green],
      data: [counts.yellow, counts.blue, counts.red, counts.grey, counts.green]
    }]
  }
})

// 3. Odd/Even Trend (Last 20)
const oddEvenData = computed(() => {
  const target = rows.slice(0, 20).reverse() // Show chronological order left to right
  const labels = target.map(r => `${r.round}`)
  const oddCounts = target.map(r => {
    let odd = 0
    ;[r.num1, r.num2, r.num3, r.num4, r.num5, r.num6].forEach(n => { if (n % 2 !== 0) odd++ })
    return odd
  })

  return {
    labels,
    datasets: [
      {
        label: 'Odd Numbers Count',
        backgroundColor: '#FF7272',
        borderColor: '#FF7272',
        data: oddCounts,
        tension: 0.3
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

onMounted(() => {
  loaded.value = true
})

</script>

<style scoped>
</style>
