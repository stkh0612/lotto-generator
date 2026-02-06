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
