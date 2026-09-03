<!-- src/views/CompareView.vue -->
<template>
  <v-container fluid class="compare-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-compare</v-icon>
          당첨 결과 대조
        </div>
        <h1 class="subpage-title">로또 회차별 당첨 결과 비교</h1>
        <p class="subpage-subtitle">
          역대 모든 회차의 1등 당첨 번호와 보너스 번호를 손쉽게 선택하여 한눈에 확인하세요.
        </p>
      </div>

      <div class="clean-card pa-6 pa-sm-10 mb-8 text-center">
        <!-- 회차 선택 드롭다운 -->
        <div class="round-select-wrapper mb-6 mx-auto" style="max-width: 280px;">
          <v-select
            v-model="selectedRound"
            :items="rounds"
            label="회차 선택"
            variant="outlined"
            color="primary"
            density="comfortable"
            hide-details
            rounded="lg"
          />
        </div>

        <div class="round-heading-box mb-6">
          <div class="round-title mb-1">
            제 {{ result.round }}회 당첨결과
          </div>
          <div class="draw-date-text">
            ({{ formattedDate }} 추첨)
          </div>
        </div>

        <!-- 당첨번호 영역 -->
        <div class="d-flex align-center justify-center numbers-group flex-wrap mb-6" :style="{ gap: `${gap}px` }">
          <!-- 메인 6개 번호 -->
          <div class="d-flex flex-nowrap" style="gap: 6px;">
            <NumberCircle
              v-for="n in mainNumbers"
              :key="n"
              :number="n"
              :size="circleSize"
            />
          </div>

          <!-- 플러스 기호 -->
          <div class="plus-sign font-weight-bold mx-2">+</div>

          <!-- 보너스 번호 -->
          <NumberCircle :number="result.bonus" :size="circleSize" />
        </div>
        
        <div class="text-caption text-grey-darken-1">
          기본 당첨 번호 6개 + 2등 결정 보너스 번호 1개
        </div>
      </div>

      <!-- 로또 규칙 안내 카드 -->
      <div class="clean-card pa-6 text-left mb-8">
        <h3 class="card-inner-title mb-3 d-flex align-center">
          <v-icon size="20" class="mr-2 text-primary">mdi-information-outline</v-icon>
          로또 당첨 기준 및 규칙 안내
        </h3>
        <ul class="rule-list pl-5 mb-0" style="line-height: 1.8;">
          <li>1부터 45까지의 숫자 중 서로 중복되지 않는 6개를 선택하여 일치 여부를 대조합니다.</li>
          <li><strong>1등 (6개 번호 일치):</strong> 총 당첨금 중 75%를 당첨자 수로 균등 배분 (평균 20억원 내외)</li>
          <li><strong>2등 (5개 번호 일치 + 보너스 번호 일치):</strong> 총 당첨금 중 12.5% 배분 (평균 5,000만원 내외)</li>
          <li><strong>3등 (5개 번호 일치):</strong> 총 당첨금 중 12.5% 배분 (평균 150만원 내외)</li>
          <li><strong>4등 (4개 번호 일치):</strong> 고정 당첨금 50,000원 (비과세)</li>
          <li><strong>5등 (3개 번호 일치):</strong> 고정 당첨금 5,000원 (비과세)</li>
        </ul>
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'
import NumberCircle from '../components/NumberCircle.vue'
import lottoResults from '../assets/lotto_numbers_en.json'

const { mobile } = useDisplay()
const route = useRoute()
const router = useRouter()

const circleSize = computed(() => mobile.value ? 40 : 54)
const gap = computed(() => mobile.value ? 6 : 14)

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
  return lottoResults.find(r => r.round === selectedRound.value) || lottoResults[0]
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
</script>

<style scoped>
.compare-view {
  min-height: calc(100vh - 64px);
}

.subpage-container {
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
}

.subpage-hero {
  padding: 10px 0 0;
}

.subpage-badge {
  display: inline-flex;
  align-items: center;
  background: #e8f5e9;
  color: #17653a;
  font-weight: 700;
  font-size: 13px;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.v-theme--dark .subpage-badge {
  background: #064e3b;
  color: #6ee7b7;
}

.subpage-title {
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.6px;
  margin-bottom: 8px;
}

.v-theme--dark .subpage-title {
  color: #f1f5f9;
}

.subpage-subtitle {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}

.v-theme--dark .subpage-subtitle {
  color: #94a3b8;
}

.clean-card {
  background: #ffffff;
  border: 1px solid #eef2ef;
  border-radius: 22px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.v-theme--dark .clean-card {
  background: #1e293b;
  border-color: #334155;
}

.round-title {
  font-size: 26px;
  font-weight: 800;
  color: #17653a;
  letter-spacing: -0.5px;
}

.v-theme--dark .round-title {
  color: #4ade80;
}

.draw-date-text {
  font-size: 14px;
  color: #64748b;
}

.v-theme--dark .draw-date-text {
  color: #94a3b8;
}

.plus-sign {
  font-size: 24px;
  color: #94a3b8;
  line-height: 1;
}

.card-inner-title {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
}

.v-theme--dark .card-inner-title {
  color: #f1f5f9;
}

.rule-list {
  color: #4b5563;
}

.v-theme--dark .rule-list {
  color: #cbd5e1;
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
  .round-title {
    font-size: 22px;
  }
}
</style>

