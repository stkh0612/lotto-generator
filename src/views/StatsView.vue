<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="820" elevation="1" rounded>
      <div class="text-h6 mb-4">{{ t('stats.title') }}</div>
      <div class="mb-2 grey--text text--darken-1">{{ t('stats.subtitle') }}</div>

      <!-- Main Frequency Chart -->
      <v-card outlined class="mb-6">
        <v-card-text style="height: 300px;">
          <Bar v-if="loaded" :data="freqData" :options="freqOptions" />
        </v-card-text>
      </v-card>

      <v-row>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 mb-2">{{ t('stats.top10') }}</div>
           <v-card outlined>
             <v-card-text>
               <Bar v-if="loaded" :data="top10Data" :options="horizontalOptions" />
             </v-card-text>
           </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 mb-2">{{ t('stats.bottom10') }}</div>
          <v-card outlined>
             <v-card-text>
               <Bar v-if="loaded" :data="bottom10Data" :options="horizontalOptions" />
             </v-card-text>
           </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <v-card outlined>
        <v-card-text style="height: 200px;">
          <Bar v-if="loaded" :data="tailData" :options="freqOptions" />
        </v-card-text>
      </v-card>

      <!-- 심층 통계 해설 섹션 (SEO & 정보성 강화) -->
      <v-card class="glass-card pa-6 text-left mt-8" style="background: rgba(124, 77, 255, 0.03) !important;">
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-3">
          📊 로또 통계 분석 지표 및 대수의 법칙(Law of Large Numbers) 해설
        </h3>
        <div class="text-body-2 text-grey-darken-1" style="line-height: 1.8;">
          <p class="mb-3">
            대한민국 로또 6/45의 역대 1회부터 현재까지 1,200회 이상의 추첨 통계를 집계하면, 45개 번호 중 가장 많이 출현한 상위권 번호(34, 43, 27, 18, 12 등)와 하위권 번호(9, 22, 41, 23 등) 사이에 뚜렷한 빈도 차이가 관찰됩니다.
          </p>
          <p class="mb-3">
            <strong>대수의 법칙과 통계적 의미:</strong> 수학적으로 시행 횟수가 무한히 증가할 경우 모든 45개 숫자의 출현 확률은 동일하게 <code>1/45 (약 2.22%)</code>로 수렴하게 됩니다. 현재의 출현 편차는 표본 누적 과정에서의 일시적인 표준편차를 나타내며, 번호 조합 시 지나치게 빈출수나 낙첨수에만 쏠리지 않도록 조율하는 데 활용할 수 있습니다.
          </p>
          <p class="mb-0">
            <strong>끝수 분포 활용법:</strong> 0부터 9까지의 끝수(일의 자리 숫자) 통계를 살펴보면, 6개 번호 조합 중 동일한 끝수가 3개 이상 겹치지 않고 4개 이상의 서로 다른 끝수로 구성된 조합이 전체 당첨 번호의 약 85% 이상을 차지합니다.
          </p>
        </div>
      </v-card>
    </v-sheet>
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

// Main Frequency Data (All 45 numbers)
const freqData = computed(() => {
  return {
    labels: Array.from({length: 45}, (_, i) => i + 1),
    datasets: [{
      label: 'Frequency',
      backgroundColor: '#1976D2', // Primary Brand Color
      data: Array.from({length: 45}, (_, i) => freq.value[i+1])
    }]
  }
})

// Top 10
const top10Data = computed(() => {
  const target = sorted.value.slice(0, 10)
  return {
    labels: target.map(i => i.num),
    datasets: [{
      label: 'Count',
      backgroundColor: '#4CAF50',
      data: target.map(i => i.cnt),
      indexAxis: 'y' as const
    }]
  }
})

// Bottom 10
const bottom10Data = computed(() => {
  const target = [...sorted.value].reverse().slice(0, 10).sort((a,b)=>a.cnt - b.cnt) // least frequent first
  return {
    labels: target.map(i => i.num),
    datasets: [{
      label: 'Count',
      backgroundColor: '#FF5252',
      data: target.map(i => i.cnt),
      indexAxis: 'y' as const
    }]
  }
})

// Tail Distribution
const tailData = computed(() => {
  const d = [0,0,0,0,0,0,0,0,0,0]
  for (let n = 1; n <= 45; n++) {
    const tail = n % 10
    d[tail] += freq.value[n]
  }
  // Labels 0..9
  return {
    labels: ['0','1','2','3','4','5','6','7','8','9'],
    datasets: [{
      label: 'Tail Frequency',
      backgroundColor: '#FFC107',
      data: d
    }]
  }
})

const freqOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  }
}

const horizontalOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } }
}

onMounted(() => {
  loaded.value = true
})
</script>

<style scoped>
</style>
