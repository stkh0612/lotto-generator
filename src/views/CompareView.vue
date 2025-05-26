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
      <div class="d-flex align-center justify-center numbers-group">
        <!-- 메인 6개 번호 -->
        <div class="d-flex flex-nowrap" style="gap: 16px;">
          <NumberCircle
            v-for="n in mainNumbers"
            :key="n"
            :number="n"
            size="56"
          />
        </div>

        <!-- 플러스 기호 -->
        <div class="plus-sign mx-4 font-weight-bold display-1">
          +
        </div>

        <!-- 보너스 번호 -->
        <NumberCircle :number="result.bonus" size="56" />
      </div>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import NumberCircle from '../components/NumberCircle.vue'
import lottoResults from '../assets/lotto_numbers_en.json'

export default defineComponent({
  name: 'CompareView',
  components: { NumberCircle },
  setup() {
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
    }
  },
})
</script>

<style scoped>
.compare-container {
  /* background-color: #f5f5f5; */
  /* min-height: calc(100vh - 64px); */
}
.compare-sheet {
  /* background-color: white; */
}
.plus-sign {
  line-height: 1;
}
</style>
