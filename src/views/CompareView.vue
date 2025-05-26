<!-- src/views/CompareView.vue -->
<template>
  <v-container fluid class="compare-container py-6">
    <v-sheet
      class="compare-sheet mx-auto px-8 py-6"
      max-width="600"
      elevation="1"
      rounded
    >
      <!-- 헤더 & 회차 선택 -->
      <div class="text-center mb-6">
        <v-row justify="center" class="mb-4">
          <v-col cols="12" md="6">
            <v-select
              v-model="selectedRound"
              :items="rounds"
              label="회차 선택"
              dense
              outlined
            />
          </v-col>
        </v-row>
        <div class="display-1 font-weight-bold orange--text text--darken-2">
          제 {{ result.round }}회 당첨결과
        </div>
        <div class="subtitle-1 grey--text">
          ({{ formattedDate }} 추첨)
        </div>
      </div>

      <!-- 당첨번호 영역 -->
      <div class="d-flex align-center justify-center numbers-group" :style="{ gap: `${gap}px` }">
        <!-- 메인 6개 번호 -->
        <div class="d-flex flex-nowrap">
          <NumberCircle
            v-for="n in mainNumbers"
            :key="n"
            :number="n"
            :size="circleSize"
          />
        </div>

        <!-- 플러스 기호 -->
        <div
          class="plus-sign font-weight-bold"
          :class="`mx-${mobile ? 2 : 4}`"
          :style="{ fontSize: `${mobile ? 24 : 32}px` }"
          >+</div>

        <!-- 보너스 번호 -->
        <NumberCircle :number="result.bonus" :size="circleSize" />
      </div>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import NumberCircle from '../components/NumberCircle.vue'
import lottoResults from '../assets/lotto_numbers_en.json'

export default defineComponent({
  name: 'CompareView',
  components: { NumberCircle },
  setup() {
    // 반응형용 Vuetify Display 유틸
    const { mobile } = useDisplay()
    
    // 모바일이면 40px, 아니면 56px
    const circleSize = computed(() => mobile.value ? 40 : 56)
    // 간격도 모바일엔 8px, 데스크탑엔 16px
    const gap = computed(() => mobile.value ? 8 : 16)

    // 모든 회차 리스트 (숫자 배열)
    const rounds = lottoResults.map(r => r.round)

    // 선택된 회차 (기본 최신)
    const selectedRound = ref<number>(rounds[0])

    // 선택된 회차의 결과 객체
    const result = computed(() => {
      return lottoResults.find(r => r.round === selectedRound.value)!
    })

    // 메인 6개 번호 배열
    const mainNumbers = computed(() => [
      result.value.num1,
      result.value.num2,
      result.value.num3,
      result.value.num4,
      result.value.num5,
      result.value.num6,
    ])

    // "YYYY-MM-DD" → "YYYY년 MM월 DD일" 포맷
    const formattedDate = computed(() => {
      const [y, m, d] = result.value.draw_date.split('-')
      return `${y}년 ${m}월 ${d}일`
    })

    return {
      rounds,
      selectedRound,
      result,
      mainNumbers,
      formattedDate,
      mobile,
      circleSize,
      gap,
    }
  },
})
</script>

<style scoped>

.plus-sign {
  line-height: 1;
}
</style>
