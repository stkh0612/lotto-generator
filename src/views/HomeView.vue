<!-- src/views/HomeView.vue -->
<template>
  <v-container class="home-view" fluid>
    <!-- 번호 생성 & 저장 영역 -->
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
    <AdBanner />

    <!-- ↓ 저장된 번호 리스트 (최대 5게임) 표시 ↓ -->
    <div v-if="savedNumbers.length" class="saved-section mt-8">
      <div class="text-h6 mb-4">저장된 번호 (최대 5게임)</div>

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
  </v-container>
  <AdBanner />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
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
    const { mobile } = useDisplay()
    // 모바일이면 40px, 아니면 56px
    const circleSize = computed(() => mobile.value ? 40 : 56)
    // 번호 사이 간격: 모바일 8px, 데스크탑 16px
    const gap = computed(() => mobile.value ? '8px' : '16px')

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
      savedNumbers: lottoStore.savedNumbers,
      circleSize,
      gap,
      
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
