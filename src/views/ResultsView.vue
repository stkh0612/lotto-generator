<!-- src/views/ResultsView.vue -->
<template>
  <v-container fluid class="results-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-format-list-numbered</v-icon>
          당첨 결과 조회
        </div>
        <h1 class="subpage-title">{{ t('results.title', '회차별 당첨 번호 조회') }}</h1>
        <p class="subpage-subtitle">
          원하는 회차를 검색하여 공식 6/45 당첨 번호와 보너스 번호, 내 번호 일치 결과를 즉시 확인하세요.
        </p>
      </div>

      <div class="clean-card pa-6 pa-sm-8 mb-8">
        <!-- 회차 검색 폼 -->
        <v-form @submit.prevent="onFetch" class="mb-6">
          <div class="d-flex align-center flex-wrap" style="gap: 12px; max-width: 420px; margin: 0 auto;">
            <v-text-field
              v-model.number="round"
              :label="t('results.roundLabel', '회차 번호')"
              type="number"
              min="1"
              required
              variant="outlined"
              color="primary"
              density="comfortable"
              hide-details
              rounded="lg"
            />
            <button type="submit" class="btn-action-primary px-6 py-3" :disabled="loading">
              <v-icon size="18" class="mr-1">mdi-magnify</v-icon>
              {{ t('results.search', '조회') }}
            </button>
          </div>
        </v-form>

        <div v-if="error" class="text-error text-center font-weight-bold mb-4">{{ error }}</div>

        <!-- 당첨 번호 결과 카드 -->
        <template v-if="result">
          <div class="result-display-box pa-6 rounded-2xl text-center mb-8">
            <div class="round-heading mb-4">
              <span class="round-tag">제 {{ result.drwNo }}회</span>
              <span class="date-tag ml-2">({{ result.drwNoDate }} 추첨)</span>
            </div>

            <div class="d-flex align-center justify-center flex-wrap mb-2" style="gap: 10px;">
              <NumberCircle v-for="n in mainNumbers" :key="n" :number="n" :size="48" />
              <div class="plus-sign mx-1">+</div>
              <NumberCircle :number="result.bnusNo" :size="48" />
            </div>
            <div class="text-caption text-grey-darken-1 mt-2">
              당첨 번호 6개 + 보너스 번호 1개
            </div>
          </div>

          <v-divider class="my-6" />

          <!-- 내 번호 대조 비교 영역 -->
          <div class="compare-section">
            <h3 class="card-inner-title mb-2 text-center">{{ t('results.compareTitle', '내 번호와 당첨 결과 대조하기') }}</h3>
            <p class="card-inner-sub text-center mb-6">내가 선택한 6개 번호를 입력하여 몇 개가 맞았는지 확인해 보세요.</p>
            
            <div class="d-flex align-center justify-center flex-wrap" style="gap: 8px;">
              <v-text-field
                v-for="i in 6"
                :key="i"
                v-model.number="input[i-1]"
                type="number"
                min="1"
                max="45"
                variant="outlined"
                color="primary"
                style="max-width: 60px;"
                density="compact"
                hide-details
                rounded="lg"
              />
              <button type="button" class="btn-action-primary px-5 py-2" @click="onCheck">
                대조 확인
              </button>
            </div>

            <div v-if="matchCount !== null" class="mt-6 text-center">
              <div class="match-result-badge d-inline-flex align-center px-4 py-2 rounded-xl">
                🎯 {{ t('results.matches', { n: matchCount }) }}
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 회차 안내 및 등수별 당첨금 가이드 카드 -->
      <div class="clean-card pa-6 pa-sm-8 mb-8">
        <h2 class="guide-section-title mb-3">
          <v-icon size="20" class="mr-2" color="primary">mdi-information-outline</v-icon>
          로또 6/45 등수별 당첨 기준 및 지급 안내
        </h2>
        <p class="text-body-2 text-grey-darken-1 mb-5">
          동행복권 로또 6/45는 1부터 45까지의 숫자 중 6개를 맞추는 복권으로, 매주 토요일 오후 8시 35분경 MBC 생방송을 통해 추첨됩니다.
        </p>

        <div class="table-responsive mb-6">
          <table class="guide-table w-100">
            <thead>
              <tr>
                <th>등수</th>
                <th>당첨 조건</th>
                <th>당첨 확률</th>
                <th>평균 당첨금 / 배분</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1등</strong></td>
                <td>당첨 번호 6개 모두 일치</td>
                <td>1 / 8,145,060</td>
                <td>총 당첨금의 약 75% (평균 15억~30억 원)</td>
              </tr>
              <tr>
                <td><strong>2등</strong></td>
                <td>당첨 번호 5개 + 보너스 번호 일치</td>
                <td>1 / 1,357,510</td>
                <td>총 당첨금의 약 12.5% (평균 4천만~6천만 원)</td>
              </tr>
              <tr>
                <td><strong>3등</strong></td>
                <td>당첨 번호 5개 일치</td>
                <td>1 / 35,724</td>
                <td>총 당첨금의 약 12.5% (평균 120만~160만 원)</td>
              </tr>
              <tr>
                <td><strong>4등</strong></td>
                <td>당첨 번호 4개 일치</td>
                <td>1 / 733</td>
                <td>고정 50,000원 (비과세)</td>
              </tr>
              <tr>
                <td><strong>5등</strong></td>
                <td>당첨 번호 3개 일치</td>
                <td>1 / 45</td>
                <td>고정 5,000원 (비과세)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row-guide-cards d-flex flex-wrap" style="gap: 16px;">
          <div class="info-callout flex-1-1 pa-4 rounded-xl">
            <h4 class="font-weight-bold mb-2 text-primary">🏛️ 등수별 당첨금 수령처</h4>
            <ul class="text-body-2 text-grey-darken-2 pl-4 mb-0" style="line-height: 1.8;">
              <li><strong>1등</strong>: NH농협은행 본점 (서울 중구, 신분증 및 복권 실물 지참)</li>
              <li><strong>2등·3등</strong>: 전국 NH농협은행 각 지점 (신분증 및 복권 실물)</li>
              <li><strong>4등·5등</strong>: 전국 일반 복권 판매점 및 농협은행 지점</li>
            </ul>
          </div>
          <div class="info-callout flex-1-1 pa-4 rounded-xl">
            <h4 class="font-weight-bold mb-2 text-primary">⚠️ 지급 기한 및 보관 주의</h4>
            <ul class="text-body-2 text-grey-darken-2 pl-4 mb-0" style="line-height: 1.8;">
              <li>당첨금 지급 기한은 <strong>해당 회차 지급 개시일로부터 1년(365일)</strong>입니다.</li>
              <li>기한 경과 시 미수령 당첨금은 전액 복권기금으로 귀속됩니다.</li>
              <li>복권 뒷면에 미리 성명과 주민등록번호를 기재해 두시면 분실 시 보호받을 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NumberCircle from '../components/NumberCircle.vue'
import { fetchRound } from '../services/lottoApi'
import lottoResults from '../assets/lotto_numbers_en.json'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const round = ref<number | null>(null)
const loading = ref(false)
const error = ref<string>('')
const result = ref<any | null>(null)

const mainNumbers = computed<number[]>(() => result.value ? [
  result.value.drwtNo1,
  result.value.drwtNo2,
  result.value.drwtNo3,
  result.value.drwtNo4,
  result.value.drwtNo5,
  result.value.drwtNo6,
] : [])

async function onFetch() {
  error.value = ''
  result.value = null
  if (!round.value || round.value < 1) {
    error.value = t('results.invalidRound')
    return
  }
  loading.value = true
  try {
    const data = await fetchRound(round.value)
    if (data.returnValue === 'fail') {
      throw new Error(t('results.notFound'))
    }
    result.value = data
    if (route.params.round && Number(route.params.round) !== round.value) {
      router.replace({ params: { round: round.value.toString() } })
    } else if (!route.params.round && Number(route.query.round) !== round.value) {
      router.replace({ query: { ...route.query, round: round.value.toString() } })
    }
  } catch (e: any) {
    error.value = e?.message || t('results.error')
  } finally {
    loading.value = false
  }
}

function syncRoundFromQuery() {
  const qRound = Number(route.query.round || route.params.round)
  if (qRound && qRound > 0) {
    round.value = qRound
    onFetch()
  }
}

watch(() => [route.query.round, route.params.round], () => {
  const qRound = Number(route.query.round || route.params.round)
  if (qRound && qRound !== round.value) {
    syncRoundFromQuery()
  }
})

onMounted(() => {
  syncRoundFromQuery()
  if (!round.value && !result.value && lottoResults && lottoResults.length > 0) {
    round.value = lottoResults[0].round
    onFetch()
  }
})

const input = ref<(number | null)[]>([null, null, null, null, null, null])
const matchCount = ref<number | null>(null)

function onCheck() {
  if (!result.value) return
  const set = new Set(mainNumbers.value)
  const picks = input.value.filter((n): n is number => typeof n === 'number')
  const count = picks.reduce((acc, n) => acc + (set.has(n) ? 1 : 0), 0)
  matchCount.value = count
}
</script>

<style scoped>
.results-view {
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

.btn-action-primary {
  background: #17653a;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(23, 101, 58, 0.2);
  transition: all 0.2s;
}

.btn-action-primary:hover:not(:disabled) {
  background: #12532f;
  transform: translateY(-1px);
}

.result-display-box {
  background: #f8faf8;
  border: 1px solid #e2e8f0;
}

.v-theme--dark .result-display-box {
  background: #0f172a;
  border-color: #334155;
}

.round-tag {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
}

.v-theme--dark .round-tag {
  color: #f1f5f9;
}

.date-tag {
  font-size: 14px;
  color: #64748b;
}

.plus-sign {
  font-size: 22px;
  font-weight: 700;
  color: #94a3b8;
}

.card-inner-title {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
}

.v-theme--dark .card-inner-title {
  color: #f1f5f9;
}

.card-inner-sub {
  font-size: 13px;
  color: #64748b;
}

.match-result-badge {
  background: #e8f5e9;
  color: #17653a;
  font-weight: 800;
  font-size: 16px;
}

.v-theme--dark .match-result-badge {
  background: #064e3b;
  color: #6ee7b7;
}

.guide-section-title {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  display: flex;
  align-items: center;
}

.v-theme--dark .guide-section-title {
  color: #f1f5f9;
}

.guide-table {
  border-collapse: collapse;
  font-size: 14px;
}

.guide-table th {
  background: #f8fafc;
  color: #334155;
  font-weight: 700;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.v-theme--dark .guide-table th {
  background: #0f172a;
  color: #cbd5e1;
  border-color: #334155;
}

.guide-table td {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  color: #475569;
}

.v-theme--dark .guide-table td {
  border-color: #334155;
  color: #94a3b8;
}

.info-callout {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  min-width: 280px;
}

.v-theme--dark .info-callout {
  background: #0f172a;
  border-color: #334155;
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
  .guide-section-title {
    font-size: 17px;
  }
  .guide-table th, .guide-table td {
    padding: 8px 10px;
    font-size: 12px;
  }
}
</style>


