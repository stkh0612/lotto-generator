<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="820" elevation="1" rounded>
      <div class="text-h6 mb-4">기초 통계</div>
      <div class="mb-2 grey--text text--darken-1">보유한 과거 추첨 데이터 기준 빈도</div>

      <v-row>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 mb-2">상위 10 (자주 출현)</div>
          <div class="d-flex flex-wrap" style="gap:8px;">
            <div v-for="item in top10" :key="item.num" class="chip">
              <span class="num">{{ item.num }}</span>
              <span class="cnt">{{ item.cnt }}</span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 mb-2">하위 10 (드묾)</div>
          <div class="d-flex flex-wrap" style="gap:8px;">
            <div v-for="item in bottom10" :key="item.num" class="chip">
              <span class="num">{{ item.num }}</span>
              <span class="cnt">{{ item.cnt }}</span>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <div class="text-subtitle-1 mb-2">끝수 분포 (1의 자리)</div>
      <div class="d-flex flex-wrap" style="gap:8px;">
        <div v-for="(v, k) in tailDist" :key="k" class="chip">
          <span class="num">{{ k }}</span>
          <span class="cnt">{{ v }}</span>
        </div>
      </div>
    </v-sheet>
  </v-container>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import data from '../assets/lotto_numbers_en.json'

type Row = { round: number; num1: number; num2: number; num3: number; num4: number; num5: number; num6: number; bonus: number; draw_date: string }
const rows = data as unknown as Row[]

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

const top10 = computed(() => sorted.value.slice(0, 10))
const bottom10 = computed(() => [...sorted.value].reverse().slice(0, 10).sort((a,b)=>a.num-b.num))

const tailDist = computed(() => {
  const d: Record<string, number> = {
    '0': 0, '1': 0, '2': 0, '3': 0, '4': 0,
    '5': 0, '6': 0, '7': 0, '8': 0, '9': 0,
  }
  for (let n = 1; n <= 45; n++) {
    const tail = n % 10
    d[String(tail)] += freq.value[n]
  }
  return d
})
</script>

<style scoped>
.chip { display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border:1px solid #e0e0e0; border-radius:999px; }
.num { font-weight:600; }
.cnt { color:#666; }
</style>

