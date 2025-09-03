<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="680" elevation="1" rounded>
      <div class="text-h6 mb-4">회차 결과 조회</div>

      <v-form @submit.prevent="onFetch">
        <v-row align="center" class="mb-4" dense>
          <v-col cols="6" sm="4">
            <v-text-field v-model.number="round" label="회차" type="number" min="1" required density="compact" />
          </v-col>
          <v-col cols="6" sm="3">
            <v-btn color="primary" type="submit" :loading="loading">조회</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <div v-if="error" class="red--text mb-3">{{ error }}</div>

      <template v-if="result">
        <div class="mb-2">{{ result.drwNo }}회차 ({{ result.drwNoDate }})</div>
        <div class="d-flex align-center justify-center flex-wrap" style="gap:12px;">
          <NumberCircle v-for="n in mainNumbers" :key="n" :number="n" :size="48" />
          <div class="font-weight-bold" style="font-size:24px;">+</div>
          <NumberCircle :number="result.bnusNo" :size="48" />
        </div>

        <v-divider class="my-6"/>

        <div class="text-subtitle-1 mb-2">번호 대조</div>
        <div class="d-flex align-center flex-wrap" style="gap:8px;">
          <v-text-field
            v-for="i in 6"
            :key="i"
            v-model.number="input[i-1]"
            type="number"
            min="1"
            max="45"
            style="max-width: 88px;"
            density="compact"
            hide-details
          />
          <v-btn color="secondary" @click="onCheck">대조</v-btn>
          <div v-if="matchCount !== null" class="ml-2">일치: {{ matchCount }}개</div>
        </div>
      </template>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NumberCircle from '../components/NumberCircle.vue'
import { fetchRound } from '../services/lottoApi'

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
    error.value = '올바른 회차를 입력하세요.'
    return
  }
  loading.value = true
  try {
    const data = await fetchRound(round.value)
    if (data.returnValue === 'fail') {
      throw new Error('해당 회차 데이터를 찾을 수 없습니다')
    }
    result.value = data
  } catch (e: any) {
    error.value = e?.message || '조회 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
}

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
</style>

