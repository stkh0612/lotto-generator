<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="680" elevation="1" rounded>
      <div class="text-h6 mb-4">{{ t('results.title') }}</div>

      <v-form @submit.prevent="onFetch">
        <v-row align="center" class="mb-4" dense>
          <v-col cols="6" sm="4">
            <v-text-field v-model.number="round" :label="t('results.roundLabel')" type="number" min="1" required density="compact" />
          </v-col>
          <v-col cols="6" sm="3">
            <v-btn color="primary" type="submit" :loading="loading">{{ t('results.search') }}</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <div v-if="error" class="red--text mb-3">{{ error }}</div>

      <template v-if="result">
        <div class="mb-2">{{ result.drwNo }}{{ t('results.roundLabel') }} ({{ result.drwNoDate }})</div>
        <div class="d-flex align-center justify-center flex-wrap" style="gap:12px;">
          <NumberCircle v-for="n in mainNumbers" :key="n" :number="n" :size="48" />
          <div class="font-weight-bold" style="font-size:24px;">+</div>
          <NumberCircle :number="result.bnusNo" :size="48" />
        </div>

        <v-divider class="my-6"/>

        <div class="text-subtitle-1 mb-2">{{ t('results.compareTitle') }}</div>
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
          <v-btn color="secondary" @click="onCheck">{{ t('results.search') }}</v-btn>
          <div v-if="matchCount !== null" class="ml-2">{{ t('results.matches', { n: matchCount }) }}</div>
        </div>
      </template>
    </v-sheet>
  </v-container>
  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import NumberCircle from '../components/NumberCircle.vue'
import { fetchRound } from '../services/lottoApi'

const { t } = useI18n()

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
  } catch (e: any) {
    error.value = e?.message || t('results.error')
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

