<!-- src/views/HomeView.vue -->
<template>
  <v-container class="home-view" fluid>
    <!-- 번호 생성 & 저장 영역 -->
    <v-row justify="center" class="mt-8 mb-8" no-gutters>
      <v-col
        cols="auto"
        v-for="num in numbers"
        :key="num"
        class="px-2"
      >
        <NumberCircle :number="num" size="56" />
      </v-col>
    </v-row>
    <!-- ② 액션 버튼 영역: v-col + px-2 -->
    <v-row justify="center" class="mt-4 mb-8" no-gutters>
      <v-col cols="auto" class="px-2">
        <v-btn color="primary" @click="generate">
          번호 생성
        </v-btn>
      </v-col>
      <v-col cols="auto" class="px-2">
        <v-btn
          color="secondary"
          :disabled="numbers.length < 6"
          @click="save"
        >
          번호 저장
        </v-btn>
      </v-col>
    </v-row>

    <!-- 광고 및 저장된 번호 섹션... -->
    <AdBanner class="my-4" />

    <!-- ↓ 저장된 번호 리스트 (최대 5게임) 표시 ↓ -->
    <div v-if="savedNumbers.length" class="saved-section mt-8">
      <div class="text-h6 mb-4">저장된 번호 (최대 5게임)</div>
      <v-row
        v-for="(entry, idx) in savedNumbers"
        :key="idx"
        class="mb-6"
        align="center"
        justify="center"
      >
        <!-- 저장된 6개 번호 -->
        <v-col cols="auto" v-for="n in entry.numbers" :key="n">
          <NumberCircle :number="n" size="45" />
        </v-col>
        <!-- 저장 일시 (간단 포맷) -->
        <span class="ml-4 grey--text text-caption">
          {{ formatDate(entry.date) }}
        </span>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useLottoStore, LottoEntry } from '../store'

import NumberCircle from '../components/NumberCircle.vue'
import AdBanner from '../components/AdBanner.vue'

// 기존 당첨 결과 불러오기
import lottoResults from '../assets/lotto_numbers_en.json'

export default defineComponent({
  name: 'HomeView',
  components: { NumberCircle, AdBanner },
  setup() {
    const lottoStore = useLottoStore()
    const numbers = ref<number[]>([])

    function generate() {
      let isDuplicate: boolean

      do {
        // 1~45 풀 생성
        const pool = Array.from({ length: 45 }, (_, i) => i + 1)
        const pick: number[] = []

        // 6개 뽑기
        while (pick.length < 6) {
          const idx = Math.floor(Math.random() * pool.length)
          pick.push(pool.splice(idx, 1)[0])
        }

        // 오름차순 정렬
        pick.sort((a, b) => a - b)
        numbers.value = pick

        // 기존 당첨 번호 중 완전히 일치하는 조합이 있는지
        isDuplicate = lottoResults.some((entry: { num1: any; num2: any; num3: any; num4: any; num5: any; num6: any }) => {
          const past = [
            entry.num1,
            entry.num2,
            entry.num3,
            entry.num4,
            entry.num5,
            entry.num6,
          ].sort((a, b) => a - b)
          // 모든 인덱스의 값이 동일해야 true
          return past.every((n, i) => n === pick[i])
        })
      } while (isDuplicate)
    }

    function save() {
      lottoStore.save(numbers.value)
    }

    // 저장된 번호를 리액티브로 가져옴
    const savedNumbers = lottoStore.savedNumbers as LottoEntry[]

    // 날짜를 "YYYY.MM.DD HH:MM" 형태로 포맷
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

    // 뷰를 벗어날 때 state만 클리어 (로컬스토리지는 유지)
    onBeforeRouteLeave(() => {
      lottoStore.clear()
    })

    return {
      numbers,
      generate,
      save,
      formatDate,
      savedNumbers: lottoStore.savedNumbers
      
    }
  }
})
</script>

<style scoped>
.home-view {
  text-align: center;
}

/* 저장된 번호 섹션 스타일 */
.saved-section {
  max-width: 600px;
  margin: 0 auto;
}
</style>
