<!-- src/views/HomeView.vue -->
<template>
  <v-container class="home-view" fluid>
    <!-- 1) 번호 생성 & 저장 영역 -->
    <div
      class="d-flex justify-center"
      :style="{ gap }"
    >
      <NumberCircle
        v-for="num in numbers"
        :key="num"
        :number="num"
        :size="circleSize"
      />
    </div>
    
    <!-- 2) 액션 버튼 영역 -->
    <v-row justify="center" class="mt-4 mb-8" no-gutters>
      <v-col cols="auto" class="px-2">
        <v-btn color="primary" @click="generate">
          {{ t('generateBtn') }}
        </v-btn>
      </v-col>
      <v-col cols="auto" class="px-2">
        <v-btn
          color="secondary"
          :disabled="numbers.length < 6"
          @click="save"
        >
          {{ t('saveBtn') }}
        </v-btn>
      </v-col>
    </v-row>   

    <!-- 4) 저장된 번호 리스트 (최대 5게임) -->
    <div v-if="savedNumbers.length" class="saved-section mt-8">
      <div class="text-h6 mb-4">{{ t('savedTitle') }}</div>

      <div
        v-for="(entry, idx) in savedNumbers"
        :key="idx"
        class="d-flex justify-center flex-nowrap mb-6"
        :style="{ gap }"
      >
        <NumberCircle
          v-for="n in entry.numbers"
          :key="n"
          :number="n"
          :size="circleSize"
        />
        <span class="ml-4 grey--text text-caption">
          {{ formatDate(entry.date) }}
        </span>
      </div>
    </div>

    <!-- 0) 사용 가이드 섹션 -->
    <v-alert
      type="info"
      colored-border
      elevation="1"
      class="mb-5"
    >
      <div class="text-h6 font-weight-medium mb-2">{{ t('guideTitle') }}</div>
      <ul class="pl-4" style="line-height:1.6; text-align: left;">
        <li v-for="(item, i) in tm('guideList')" :key="i">{{ item }}</li>
      </ul>
    </v-alert>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
import { onBeforeRouteLeave } from 'vue-router'
import { useLottoStore, LottoEntry } from '../store'

import NumberCircle from '../components/NumberCircle.vue'


import axios from 'axios'
const webhook = "https://lottomate.life/.netlify/functions/proxy"

// 과거 당첨결과 데이터
import lottoResults from '../assets/lotto_numbers_en.json'
import { playConfetti } from '../utils/AnimHelper'

export default defineComponent({
  name: 'HomeView',
  components: { NumberCircle },
  setup() {
    const { t, tm } = useI18n()
    const { mobile } = useDisplay()
    const circleSize = computed(() => mobile.value ? 40 : 56)
    const gap = computed(() => mobile.value ? '8px' : '16px')

    const lottoStore = useLottoStore()
    const numbers = ref<number[]>([])

    function generate() {
      playConfetti() // Trigger animation!
      let isDuplicate: boolean
      do {
        const pool = Array.from({ length: 45 }, (_, i) => i + 1)
        const pick: number[] = []
        while (pick.length < 6) {
          const idx = Math.floor(Math.random() * pool.length)
          pick.push(pool.splice(idx, 1)[0])
        }
        pick.sort((a, b) => a - b)
        numbers.value = pick

        isDuplicate = lottoResults.some((e: any) => {
          const past = [
            e.num1, e.num2, e.num3,
            e.num4, e.num5, e.num6
          ].sort((a, b) => a - b)
          return past.every((n, i) => n === pick[i])
        })
      } while (isDuplicate)
    }

    async function save() {
      lottoStore.save(numbers.value)
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
        } else {
          console.error('저장 실패:', data.message)
        }
      } catch (err) {
        console.error('Google Sheets 저장 중 오류 발생', err)
      }
    }

    const savedNumbers = lottoStore.savedNumbers as LottoEntry[]

    function formatDate(iso: string) {
      const d = new Date(iso)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const h = String(d.getHours()).padStart(2, '0')
      const mi = String(d.getMinutes()).padStart(2, '0')
      return `${y}.${m}.${day} ${h}:${mi}`
    }

    onMounted(generate)
    onBeforeRouteLeave(() => lottoStore.clear())


    return {
      numbers,
      generate,
      save,
      formatDate,
      savedNumbers,
      circleSize,
      gap,
      t,
      tm,
    }
  }
})
</script>

<style scoped>
.home-view {
  text-align: center;
}

.saved-section {
  max-width: 600px;
  margin: 0 auto;
}
</style>
