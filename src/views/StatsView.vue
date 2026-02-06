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

      <div class="text-subtitle-1 mb-2">{{ t('stats.tailDist') }}</div>
      <!-- Tail dist kept as simple chips for now, or could be a chart too. Let's keep chips for variety essentially or making it a small chart is better? Charts are better. -->
      <v-card outlined>
        <v-card-text style="height: 200px;">
          <Bar v-if="loaded" :data="tailData" :options="freqOptions" />
        </v-card-text>
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
