<!-- src/views/FortuneView.vue -->
<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6 glass-card" max-width="850" elevation="2" rounded="xl">
      <div class="text-h4 font-weight-bold mb-2 gradient-text">{{ t('fortune.title', '로또 운세') }}</div>
      <div class="mb-6 grey--text text-grey">{{ t('fortune.subtitle', '타로, 꿈해몽, 별자리로 알아보는 행운의 번호') }}</div>

      <!-- 탭 변경 -->
      <v-tabs v-model="tab" color="primary" class="mb-6" align-tabs="center">
        <v-tab value="tarot">🔮 타로 로또</v-tab>
        <v-tab value="dream">{{ t('fortune.dreamTab') }}</v-tab>
        <v-tab value="zodiac">{{ t('fortune.zodiacTab') }}</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <!-- 1) Tarot Tab -->
        <v-window-item value="tarot">
          <v-card variant="flat" class="pa-4 bg-transparent">
            
            <div v-if="selectedCards.length < 3 && !tarotFinished" class="text-center mb-6">
              <h2 class="text-h5 font-weight-bold mb-2">당신의 로또 운명을 점쳐보세요</h2>
              <p class="text-body-2 text-grey">
                눈을 감고 당첨의 염원을 담아 카드 덱에서 <strong>3장의 타로 카드</strong>를 선택해 주세요.
              </p>
              <v-chip color="primary" class="font-weight-bold px-4">
                선택된 카드: {{ selectedCards.length }} / 3
              </v-chip>
            </div>

            <!-- 타로 카드 스프레드 공간 -->
            <div v-if="!tarotFinished" class="d-flex flex-wrap justify-center my-6" style="gap: 16px; perspective: 1000px;">
              <div
                v-for="(card, index) in tarotDeck"
                :key="index"
                class="tarot-card"
                :class="{ 
                  'is-flipped': isCardSelected(index),
                  'disabled': selectedCards.length >= 3 && !isCardSelected(index)
                }"
                @click="selectTarotCard(index)"
              >
                <div class="tarot-card-inner">
                  <!-- 카드 뒷면 -->
                  <div class="tarot-card-back">
                    <div class="back-design">
                      <v-icon size="40">mdi-compass-rose</v-icon>
                      <span class="text-caption mt-2">LottoMate</span>
                    </div>
                  </div>
                  <!-- 카드 앞면 -->
                  <div class="tarot-card-front">
                    <div class="front-emoji">{{ card.emoji }}</div>
                    <div class="text-subtitle-2 font-weight-bold">{{ card.name }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 타로 추첨 완료 후 결과 인증서 리포트 -->
            <v-expand-transition>
              <div v-if="tarotFinished" class="tarot-result-area text-center">
                
                <div ref="tarotCertificate" class="pa-6 rounded-xl mx-auto my-6 certificate-box" max-width="600">
                  <div class="certificate-header mb-4">
                    <div class="text-h5 font-weight-bold gold-text">★ TAROT LOTTO CERTIFICATE ★</div>
                    <div class="text-caption text-grey">로또메이트 운명 분석 보고서</div>
                  </div>

                  <!-- 3개의 선택된 카드 분석 -->
                  <v-row class="my-6 justify-center">
                    <v-col v-for="(sel, i) in selectedCards" :key="i" cols="12" sm="4">
                      <v-card class="pa-4 glass-card fill-height" border>
                        <div class="text-overline primary-text font-weight-bold">
                          {{ i === 0 ? '과거 · 기운' : i === 1 ? '현재 · 재물' : '미래 · 행운' }}
                        </div>
                        <div class="text-h2 my-2">{{ tarotDeck[sel].emoji }}</div>
                        <div class="text-subtitle-1 font-weight-bold mb-2">{{ tarotDeck[sel].name }}</div>
                        <div class="text-caption text-grey-darken-1 text-left" style="line-height: 1.5;">
                          {{ tarotDeck[sel].desc }}
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>

                  <!-- 추천 행운의 로또 번호 -->
                  <div class="my-8 pa-4 rounded-lg bg-surface-variant text-center" style="background: rgba(124, 77, 255, 0.08);">
                    <div class="text-subtitle-2 font-weight-bold mb-3 text-primary">
                      🔮 당신만을 위한 운명의 번호 추천 🔮
                    </div>
                    <div class="d-flex justify-center flex-wrap" style="gap: 10px;">
                      <NumberCircle
                        v-for="n in tarotNumbers"
                        :key="n"
                        :number="n"
                        :size="48"
                      />
                    </div>
                    <div class="text-caption text-grey mt-3">
                      타로 시드 해시를 통해 생성된 고유의 로또 운세 조합입니다.
                    </div>
                  </div>
                </div>

                <!-- 조작 버튼 -->
                <div class="d-flex justify-center flex-wrap mt-6" style="gap: 16px;">
                  <v-btn class="btn-premium" @click="resetTarot" prepend-icon="mdi-refresh">
                    다시 타로 뽑기
                  </v-btn>
                  
                  <v-btn class="btn-gold" @click="downloadTarotImage" prepend-icon="mdi-download">
                    결과 이미지 다운로드
                  </v-btn>

                  <v-btn color="primary" @click="shareTarotResult" prepend-icon="mdi-share-variant">
                    결과 공유하기
                  </v-btn>

                  <v-btn color="secondary" variant="outlined" @click="saveTarotNumbers" :disabled="tarotNumbers.length < 6">
                    이 번호 저장하기
                  </v-btn>
                </div>

              </div>
            </v-expand-transition>

          </v-card>
        </v-window-item>

        <!-- 2) Dream Tab -->
        <v-window-item value="dream">
          <v-card outlined class="pa-4 glass-card">
            <div class="text-h6 mb-2">꿈에서 무엇을 보셨나요?</div>
            <p class="text-caption text-grey mb-4">
              기억나는 키워드(예: 똥, 조상, 돼지 등)를 검색해 보세요. 매칭되는 단어가 없다면 꿈의 고유 문자를 분석해 운명의 6자리를 추천합니다.
            </p>
            
            <v-text-field
              v-model="dreamInput"
              :label="$t('fortune.dreamInputPlaceholder')"
              variant="outlined"
              append-inner-icon="mdi-magnify"
              @keyup.enter="interpretDream"
              @click:append-inner="interpretDream"
            ></v-text-field>

            <v-expand-transition>
              <div v-if="dreamResult.length > 0" class="mt-6 text-center">
                <div class="subtitle-1 font-weight-bold mb-3 text-primary">추천 번호:</div>
                <div class="d-flex justify-center flex-wrap gap-2 mb-4" style="gap: 8px;">
                  <NumberCircle v-for="n in dreamResult" :key="n" :number="n" :size="48" />
                </div>
                <div class="mt-2 text-caption text-grey">
                  키워드 '{{ lastKeyword }}'와(과) 연관된 번호 조합입니다. 이 번호를 복권 구매에 활용해 보세요!
                </div>
              </div>
            </v-expand-transition>
            
            <v-expand-transition>
              <div v-if="hasSearched && dreamResult.length === 0" class="mt-4 text-center text-grey">
                해당 키워드에 대한 데이터가 없습니다. 다른 단어로 다시 검색해 보세요.
              </div>
            </v-expand-transition>
          </v-card>
        </v-window-item>

        <!-- 3) Zodiac Tab -->
        <v-window-item value="zodiac">
          <v-card outlined class="pa-4 glass-card">
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
              <v-btn size="large" class="btn-premium" @click="generateZodiacNumbers">
                <v-icon start>mdi-creation</v-icon>
                행운 번호 생성
              </v-btn>
            </div>

            <v-expand-transition>
              <div v-if="zodiacResult.length > 0" class="mt-6 text-center">
                <div class="d-flex justify-center flex-wrap gap-3" style="gap: 8px;">
                  <NumberCircle v-for="n in zodiacResult" :key="n" :number="n" :size="48" />
                </div>
                <div class="mt-4 text-body-2 text-grey">
                  {{ zodiacLuckMessage }}
                </div>
              </div>
            </v-expand-transition>
          </v-card>
        </v-window-item>
      </v-window>

      <!-- SEO 최적화 설명 영역 -->
      <v-card class="glass-card pa-6 text-left mt-8" style="background: rgba(124, 77, 255, 0.02) !important;">
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-3">꿈해몽 번호 및 타로 로또 운세에 관한 가이드</h3>
        <p class="text-caption text-grey-darken-1 mb-2" style="line-height: 1.6;">
          많은 사람들이 꿈이나 특수한 운세 징조(별자리, 타로 카드)를 통해 로또 번호를 추천받습니다. 예를 들어, 전통적으로 돼지 꿈은 숫자 8, 18, 28을 상징하고, 똥 꿈은 5, 15, 25 등을 암시한다고 널리 알려져 있습니다. 또한 조상님 꿈은 1, 7, 19 등 번호와 매치되기도 합니다.
        </p>
        <p class="text-caption text-grey-darken-1" style="line-height: 1.6;">
          로또메이트의 <strong>타로 로또 운세</strong>는 신비로운 타로 점술 요소를 로또 번호 알고리즘과 결합하여, 유저가 선택한 메이저 아르카나 카드의 조합 시드를 기반으로 6개의 독자적인 행운 번호를 정교하게 추천해 줍니다. 재미 삼아 뽑아본 타로가 오늘의 1등 당첨번호가 될지도 모르니 매주 한 번씩 자신의 재물운을 확인해 보시길 권장합니다.
        </p>
      </v-card>

    </v-sheet>

    <!-- 토스트 알림 (Snackbar) -->
    <v-snackbar v-model="snackbar" timeout="2500" color="primary" rounded="pill">
      {{ snackbarText }}
      <template #actions>
        <v-btn variant="text" @click="snackbar = false">닫기</v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import html2canvas from 'html2canvas'
import { playConfetti } from '../utils/AnimHelper'
import NumberCircle from '../components/NumberCircle.vue'
import { useLottoStore } from '../store'
import { shareContent } from '../utils/ShareHelper'

const { t } = useI18n()
const tab = ref('tarot')
const lottoStore = useLottoStore()

// 토스트 변수
const snackbar = ref(false)
const snackbarText = ref('')

// --- Tarot System ---
const tarotFinished = ref(false)
const selectedCards = ref<number[]>([])
const tarotNumbers = ref<number[]>([])

// 12장의 대표적인 타로 카드 정보
const tarotDeck = [
  { name: '0. 광대 (The Fool)', emoji: '🃏', desc: '새로운 시작, 모험. 고정 관념을 깬 직관적인 번호 선택이나 완전히 무작위 자동 번호 구매가 의외의 대박을 불러옵니다!' },
  { name: 'I. 마법사 (The Magician)', emoji: '🧙‍♂️', desc: '창조적인 주도권, 재능. 스스로의 영감을 믿으세요. 분석표를 보고 직접 고른 수동 로또 번호에서 탁월한 재물운이 발휘됩니다.' },
  { name: 'III. 여황제 (The Empress)', emoji: '👑', desc: '물질적 번영, 풍요로움. 주머니가 가득 차는 수확의 계절이 옵니다. 오늘 구매하는 로또는 안정적인 이득을 줄 높은 운을 갖고 있습니다.' },
  { name: 'IV. 황제 (The Emperor)', emoji: '🏰', desc: '질서, 확고한 계획. 정교하게 홀짝 비율이나 합계 필터를 조정하여 계획된 로또 게임을 구매하는 것이 횡재수를 활성화합니다.' },
  { name: 'VI. 연인 (The Lovers)', emoji: '💖', desc: '화합, 조화로운 동반. 혼자 구매하는 것보다 가족이나 사랑하는 연인과 번호를 모아 구매하거나 선물로 복권을 주는 것이 당첨 확률을 키웁니다.' },
  { name: 'VII. 전차 (The Chariot)', emoji: '🏎️', desc: '승리, 맹렬한 기세. 강한 상승 기류를 타고 있습니다. 망설이지 마세요. 마음이 이끄는 번호가 있다면 오늘 바로 구매하는 적극성이 필요합니다.' },
  { name: 'X. 운명의 수레바퀴', emoji: '🎡', desc: '인생의 급격한 전환, 대박의 타이밍. 굴러가는 바퀴처럼 강력한 로또 횡재수가 열렸습니다! 오늘이야말로 1등 당첨을 바라볼 수 있는 황금기입니다.' },
  { name: 'XVII. 별 (The Star)', emoji: '⭐', desc: '신비한 영감, 희망. 밤하늘의 쏟아지는 별처럼 번뜩이는 영감의 기운이 쏠려 있습니다. 꿈의 잔상이나 별자리 행운 숫자에 귀 기울이세요.' },
  { name: 'XIX. 태양 (The Sun)', emoji: '☀️', desc: '눈부신 성공, 생명력. 당신의 금전운이 가장 찬란하게 불타오르는 날입니다. 밝은 양의 기운을 담아 당첨의 기쁨을 크게 맞이할 수 있습니다.' },
  { name: 'XXI. 세계 (The World)', emoji: '🌍', desc: '완성, 최고의 결실. 오랜 기간 기다린 보람이 완벽한 성공으로 다가옵니다. 이번 생에 찾아오는 가장 큰 횡재수를 의미하는 최고 등급의 카드입니다.' }
]

function isCardSelected(idx: number): boolean {
  return selectedCards.value.includes(idx)
}

function selectTarotCard(idx: number) {
  if (isCardSelected(idx)) return
  if (selectedCards.value.length >= 3) return

  selectedCards.value.push(idx)

  // 3장이 다 뽑히면 결과 산출
  if (selectedCards.value.length === 3) {
    setTimeout(() => {
      generateTarotNumbers()
      tarotFinished.value = true
      playConfetti()
    }, 800)
  }
}

// 3장 카드 조합 기반 결정론적 번호 생성
function generateTarotNumbers() {
  const sortedIndices = [...selectedCards.value].sort((a, b) => a - b)
  // 해시 코드를 인덱스들로 산출
  const seed = sortedIndices[0] * 100 + sortedIndices[1] * 10 + sortedIndices[2]
  
  // Seeded Random Helper
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000
    return x - Math.floor(x)
  }

  const nums = new Set<number>()
  let attempt = 0
  while (nums.size < 6 && attempt < 100) {
    const r = Math.floor(seededRandom(seed + attempt) * 45) + 1
    nums.add(r)
    attempt++
  }

  tarotNumbers.value = Array.from(nums).sort((a, b) => a - b)
}

function saveTarotNumbers() {
  if (tarotNumbers.value.length < 6) return
  const success = lottoStore.save(tarotNumbers.value)
  if (success) {
    alert('행운의 타로 번호가 저장되었습니다. [저장된 번호] 탭에서 확인하세요!')
  } else {
    alert('이미 저장된 번호 조합입니다.')
  }
}

function resetTarot() {
  selectedCards.value = []
  tarotNumbers.value = []
  tarotFinished.value = false
}

// html2canvas 결과 다운로드
const tarotCertificate = ref<HTMLElement>()
async function downloadTarotImage() {
  if (!tarotCertificate.value) return
  
  const canvas = await html2canvas(tarotCertificate.value, {
    backgroundColor: '#0F041C',
    scale: 2,
    useCORS: true
  })
  
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `lottomate_tarot_result.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 공유 기능
async function shareTarotResult() {
  if (tarotNumbers.value.length < 6) return
  const title = '🔮 LottoMate 타로 로또 운세 보고서'
  const cardNames = selectedCards.value.map(idx => tarotDeck[idx].name.split('.')[1] || tarotDeck[idx].name).join(', ')
  const text = `로또메이트 타로 운세 결과:\n뽑은 카드들: [ ${cardNames} ]\n추천된 행운수: [ ${tarotNumbers.value.join(', ')} ]\n\n지금 타로 카드를 뽑고 당신의 로또 행운을 알아보세요!`
  const url = window.location.origin + '/fortune'

  const isNative = await shareContent(title, text, url)
  if (isNative) {
    snackbarText.value = '공유 창을 열었습니다!'
  } else {
    snackbarText.value = '클립보드에 타로 운세 결과가 복사되었습니다!'
  }
  snackbar.value = true
}


// --- Dream Interpretation (꿈 해몽) ---
const dreamInput = ref('')
const dreamResult = ref<number[]>([])
const hasSearched = ref(false)
const lastKeyword = ref('')

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
  
  let found: number[] = []
  for (const key in dreamDict) {
    if (keyword.includes(key)) {
      found = [...found, ...dreamDict[key]]
    }
  }
  
  if (found.length === 0) {
    let hash = 0
    for(let i=0; i<keyword.length; i++) {
      hash = keyword.charCodeAt(i) + ((hash << 5) - hash)
    }
    
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
    if (found.length > 6) {
      found = found.slice(0, 6)
    } else if (found.length < 6) {
      const pool = Array.from({length: 45}, (_, i) => i + 1).filter(n => !found.includes(n))
      while (found.length < 6) {
        const rIdx = Math.floor(Math.random() * pool.length)
        found.push(pool.splice(rIdx, 1)[0])
      }
    }
  }
  
  dreamResult.value = [...new Set(found)].sort((a,b)=>a-b)
}


// --- Zodiac (별자리) ---
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
  
  const nums = new Set<number>()
  while(nums.size < 6) {
    nums.add(Math.floor(Math.random() * 45) + 1)
  }
  zodiacResult.value = Array.from(nums).sort((a,b)=>a-b)
  zodiacLuckMessage.value = '오늘의 우주 기운이 별자리를 향해 쏟아내는 운명적인 로또 번호입니다. 좋은 예감과 함께 구매해 보세요!'
  playConfetti()
}
</script>

<style scoped>
/* 타로 카드 스타일 */
.tarot-card {
  width: 105px;
  height: 165px;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
  user-select: none;
}

.tarot-card:hover {
  transform: translateY(-8px) scale(1.03);
}

.tarot-card.disabled {
  opacity: 0.4;
  pointer-events: none;
  filter: grayscale(80%);
}

.tarot-card-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.25);
  transform-style: preserve-3d;
}

.tarot-card.is-flipped .tarot-card-inner {
  transform: rotateY(180deg);
  pointer-events: none;
}

.tarot-card-front, .tarot-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.tarot-card-back {
  background: radial-gradient(circle at center, #2C1A5C 0%, #0F041C 100%);
  border: 2px solid rgba(124, 77, 255, 0.3);
  color: #FFD700;
}

.back-design {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(255, 215, 0, 0.2);
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.tarot-card-front {
  background: radial-gradient(circle at center, #1E0B36 0%, #090214 100%);
  border: 2px solid #FFD700;
  color: #fff;
  transform: rotateY(180deg);
}

.front-emoji {
  font-size: 2.8rem;
  margin-bottom: 8px;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.3));
}

/* 인증서 박스 */
.certificate-box {
  background: radial-gradient(circle at top, #1E0B36 0%, #0F041C 100%) !important;
  border: 2px solid #FFD700 !important;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.15) !important;
  max-width: 620px;
}

.gold-text {
  color: #FFD700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
  letter-spacing: 1px;
}

.primary-text {
  color: #B388FF;
}

@media (max-width: 600px) {
  .tarot-card {
    width: 85px;
    height: 135px;
  }
  .front-emoji {
    font-size: 2.2rem;
  }
}
</style>
