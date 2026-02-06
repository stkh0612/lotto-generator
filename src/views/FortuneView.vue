<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="820" elevation="1" rounded>
      <div class="text-h4 font-weight-bold mb-2 text-primary">{{ $t('fortune.title') }}</div>
      <div class="mb-6 grey--text text--darken-1">{{ $t('fortune.subtitle') }}</div>

      <v-tabs v-model="tab" color="primary" class="mb-6">
        <v-tab value="dream">{{ $t('fortune.dreamTab') }}</v-tab>
        <v-tab value="zodiac">{{ $t('fortune.zodiacTab') }}</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <!-- Dream Tab -->
        <v-window-item value="dream">
          <v-card outlined class="pa-4">
            <div class="text-h6 mb-4"> 꿈에서 무엇을 보셨나요?</div>
            <v-text-field
              v-model="dreamInput"
              :label="$t('fortune.dreamInputPlaceholder')"
              variant="outlined"
              append-inner-icon="mdi-magnify"
              @keyup.enter="interpretDream"
              @click:append-inner="interpretDream"
            ></v-text-field>

            <v-expand-transition>
              <div v-if="dreamResult.length > 0" class="mt-4">
                <div class="subtitle-1 font-weight-bold mb-2">추천 번호:</div>
                <div class="d-flex flex-wrap gap-2">
                  <v-chip v-for="n in dreamResult" :key="n" color="primary" class="mr-2 mb-2 font-weight-bold">
                    {{ n }}
                  </v-chip>
                </div>
                <div class="mt-2 text-caption grey--text">
                  키워드 '{{ lastKeyword }}'와(과) 연관된 번호입니다.
                </div>
              </div>
            </v-expand-transition>
             <v-expand-transition>
               <div v-if="hasSearched && dreamResult.length === 0" class="mt-4 text-center text-grey">
                 해당 키워드에 대한 데이터가 없습니다. 다른 단어(예: 뱀, 조상, 불)로 검색해보세요.
               </div>
             </v-expand-transition>
          </v-card>
        </v-window-item>

        <!-- Zodiac Tab -->
        <v-window-item value="zodiac">
          <v-card outlined class="pa-4">
            <div class="text-h6 mb-4">오늘의 별자리 행운 번호</div>
            <v-select
              v-model="selectedZodiac"
              :items="zodiacSigns"
              item-title="name"
              item-value="id"
              label="별자리를 선택하세요"
              variant="outlined"
            ></v-select>

            <div class="text-center mt-6" v-if="selectedZodiac">
               <v-btn size="large" color="secondary" @click="generateZodiacNumbers">
                 <v-icon start>mdi-creation</v-icon>
                 행운 번호 생성
               </v-btn>
            </div>

             <v-expand-transition>
              <div v-if="zodiacResult.length > 0" class="mt-6 text-center">
                <div class="d-flex justify-center flex-wrap gap-3">
                  <div
                    v-for="n in zodiacResult"
                    :key="n"
                    class="ball"
                    :style="{ backgroundColor: getBallColor(n) }"
                  >
                    {{ n }}
                  </div>
                </div>
                <div class="mt-4 text-body-2 text-grey-darken-2">
                  {{ zodiacLuckMessage }}
                </div>
              </div>
            </v-expand-transition>
          </v-card>
        </v-window-item>
      </v-window>

    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const tab = ref(null)

// --- Dream Interpretation ---
const dreamInput = ref('')
const dreamResult = ref<number[]>([])
const hasSearched = ref(false)
const lastKeyword = ref('')

// Simple Dream Dictionary (Korean)
const dreamDict: Record<string, number[]> = {
  '뱀': [3, 13, 23, 33, 43],
  '불': [2, 4, 15, 22, 30],
  '물': [1, 10, 21, 31, 40],
  '조상': [1, 7, 19, 29, 39],
  '똥': [5, 15, 25, 35, 45],
  '돼지': [8, 18, 28, 38],
  '개': [4, 14, 24, 34],
  '고양이': [5, 15, 25, 35],
  '피': [11, 22, 33, 44],
  '돈': [6, 16, 26, 36],
  '자동차': [9, 19, 29, 39],
  '비행기': [2, 12, 22, 32],
  '집': [1, 11, 21, 31]
}

function interpretDream() {
  if (!dreamInput.value.trim()) return
  const keyword = dreamInput.value.trim()
  lastKeyword.value = keyword
  hasSearched.value = true
  
  // Simple check
  let found: number[] = []
  for (const key in dreamDict) {
    if (keyword.includes(key)) {
      found = [...found, ...dreamDict[key]]
    }
  }
  
  // If no match, generate "Random but Deterministic" based on string hash
  if (found.length === 0) {
    // Generate numbers based on keyword hash code
    let hash = 0
    for(let i=0; i<keyword.length; i++) hash = keyword.charCodeAt(i) + ((hash << 5) - hash)
    
    // Seed random generator with hash
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    const nums = new Set<number>()
    let attempt = 0
    while(nums.size < 6 && attempt < 100) {
      const r = Math.floor(seededRandom(hash + attempt) * 45) + 1
      nums.add(r)
      attempt++
    }
    found = Array.from(nums).sort((a,b)=>a-b)
  } else {
    // If dictionary found too many, take 6
    if (found.length > 6) found = found.slice(0, 6)
    // If too few, fill with related
  }
  
  dreamResult.value = [...new Set(found)].sort((a,b)=>a-b)
}

// --- Zodiac ---
// Vuetify Select items needs title/value
const zodiacSigns = [
  { name: '물병자리 (1/20~2/18)', id: 'aquarius' },
  { name: '물고기자리 (2/19~3/20)', id: 'pisces' },
  { name: '양자리 (3/21~4/19)', id: 'aries' },
  { name: '황소자리 (4/20~5/20)', id: 'taurus' },
  { name: '쌍둥이자리 (5/21~6/21)', id: 'gemini' },
  { name: '게자리 (6/22~7/22)', id: 'cancer' },
  { name: '사자자리 (7/23~8/22)', id: 'leo' },
  { name: '처녀자리 (8/23~9/23)', id: 'virgo' },
  { name: '천칭자리 (9/24~10/22)', id: 'libra' },
  { name: '전갈자리 (10/23~11/22)', id: 'scorpio' },
  { name: '사수자리 (11/23~12/24)', id: 'sagittarius' },
  { name: '염소자리 (12/25~1/19)', id: 'capricorn' }
]

const selectedZodiac = ref(null)
const zodiacResult = ref<number[]>([])
const zodiacLuckMessage = ref('')

function generateZodiacNumbers() {
  if (!selectedZodiac.value) return
  
  // Simply random for now, but implies "stars aligned"
  const nums = new Set<number>()
  while(nums.size < 6) {
    nums.add(Math.floor(Math.random() * 45) + 1)
  }
  zodiacResult.value = Array.from(nums).sort((a,b)=>a-b)
  zodiacLuckMessage.value = '오늘 별자리가 속삭이는 행운의 숫자입니다. 좋은 기운을 받아가세요!'
}

function getBallColor(n: number) {
  if (n <= 10) return '#FBC400'
  else if (n <= 20) return '#69C8F2'
  else if (n <= 30) return '#FF7272'
  else if (n <= 40) return '#AAAAAA'
  else return '#B0D840'
}

</script>

<style scoped>
.ball {
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: bold; font-size: 1.1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
</style>
