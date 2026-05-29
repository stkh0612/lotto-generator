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

    <!-- 0) 로또 규칙 안내 -->
    <v-alert
      type="info"
      colored-border
      elevation="1"
      class="mt-8"
    >
      <div class="text-h6 font-weight-medium mb-2">로또 규칙 안내</div>
      <ul class="pl-4" style="line-height:1.6; text-align:left;">
        <li>1부터 45까지의 숫자 중 서로 중복되지 않는 6개를 고릅니다.</li>
        <li>6개의 기본 당첨 번호를 오름차순으로 정렬해 표시합니다.</li>
        <li>추가로 보너스 번호 1개가 무작위로 선택됩니다.</li>
        <li>당첨 등수는 맞춘 기본 번호 개수와 보너스 번호 일치 여부에 따라 결정됩니다.</li>
        <li>예) 6개 일치 → 1등, 5개+보너스 → 2등, 5개 → 3등, 4개 → 4등, 3개 → 5등</li>
      </ul>
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'
import NumberCircle from '../components/NumberCircle.vue'
import lottoResults from '../assets/lotto_numbers_en.json'

export default defineComponent({
  name: 'CompareView',
  components: { NumberCircle },
  setup() {
    const { mobile } = useDisplay()
    const route = useRoute()
    const router = useRouter()
    
    const circleSize = computed(() => mobile.value ? 40 : 56)
    const gap = computed(() => mobile.value ? 8 : 16)

    const rounds = lottoResults.map(r => r.round)
    const selectedRound = ref<number>(rounds[0])

    function syncRoundFromQuery() {
      const qRound = Number(route.query.round || route.params.round)
      if (qRound && rounds.includes(qRound)) {
        selectedRound.value = qRound
      }
    }

    watch(selectedRound, (newVal) => {
      if (newVal) {
        if (route.params.round && Number(route.params.round) !== newVal) {
          router.replace({ params: { round: newVal.toString() } })
        } else if (!route.params.round && Number(route.query.round) !== newVal) {
          router.replace({ query: { ...route.query, round: newVal.toString() } })
        }
      }
    })

    watch(() => [route.query.round, route.params.round], () => {
      syncRoundFromQuery()
    })

    onMounted(() => {
      syncRoundFromQuery()
    })

    const result = computed(() => {
      return lottoResults.find(r => r.round === selectedRound.value)!
    })

    const mainNumbers = computed(() => [
      result.value.num1,
      result.value.num2,
      result.value.num3,
      result.value.num4,
      result.value.num5,
      result.value.num6,
    ])

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
