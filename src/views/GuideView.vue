<!-- src/views/GuideView.vue -->
<template>
  <v-container fluid class="guide-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-book-open-page-variant</v-icon>
          로또 이용 가이드
        </div>
        <h1 class="subpage-title">{{ $t('guideTitle', '로또 완벽 가이드') }}</h1>
        <p class="subpage-subtitle">
          로또의 역사와 수학적 확률, 세금 계산법부터 당첨금 수령 방법까지 올바르고 유익한 정보를 안내합니다.
        </p>
      </div>

      <div class="clean-card pa-6 pa-sm-8 mb-8">
        <v-expansion-panels variant="accordion" multiple class="custom-panels">
          <!-- Section 1: History -->
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title class="font-weight-bold text-h6">
              <v-icon start icon="mdi-history" class="mr-2 text-primary" />
              대한민국 로또의 역사
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              <p class="mb-2">
                대한민국의 로또 6/45는 2002년 12월에 시작되었습니다. 초기에는 2,000원의 가격으로 시작했으나, 
                사행성 조장 논란 등으로 인해 2004년 8월부터 1게임당 1,000원으로 가격이 인하되었습니다.
              </p>
              <p>
                로또 판매 수익금의 대부분은 <strong>복권기금</strong>으로 조성되어, 임대주택 건설, 소외계층 복지, 
                문화예술 진흥 등 다양한 공익 사업에 사용됩니다. 즉, 복권 구매는 당첨의 행운을 노리는 동시에 
                우리 사회의 나눔을 실천하는 행위이기도 합니다.
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 2: Math & Probability -->
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title class="font-weight-bold text-h6">
              <v-icon start icon="mdi-calculator" class="mr-2 text-primary" />
              확률의 수학: 814만분의 1과 로또 번호 개수
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              <p class="mb-2">
                로또 6/45는 전체 <strong>로또 번호 개수</strong> 45개 중에서 중복 없이 6개의 번호를 맞추는 게임입니다. 1등 당첨 확률은 순서에 상관없이 6개를 모두 맞춰야 하므로, 수학적으로 다음과 같이 계산됩니다.
              </p>
              <v-alert density="compact" variant="tonal" color="primary" class="my-3 rounded-lg font-weight-bold">
                (45 × 44 × 43 × 42 × 41 × 40) ÷ (6 × 5 × 4 × 3 × 2 × 1) = 8,145,060
              </v-alert>
              <p class="mb-2">
                기본적으로 추첨을 통해 일치하는 <strong>로또 번호 개수</strong>에 따라 당첨 등수가 결정됩니다. (6개 일치 시 1등, 5개와 보너스 일치 시 2등, 5개 일치 시 3등, 4개 일치 시 4등, 3개 일치 시 5등)
              </p>
              <p class="mb-2">
                이는 매주 10만원어치(100게임) 로또를 산다고 가정할 때, 1등에 당첨되기 위해서는 평균적으로 
                <strong>약 1,566년</strong>이 걸린다는 의미입니다.
              </p>
              <p>
                <strong>독립 시행의 법칙:</strong> 많은 분들이 "지난주에 안 나온 번호가 이번 주에 나올 확률이 높다"고 생각하시지만, 
                이는 수학적으로 <strong>거짓</strong>입니다. 동전을 던져 앞면이 10번 나왔다고 해서 11번째에 뒷면이 나올 확률이 높아지지 않는 것과 같습니다. 
                매 회차의 추첨은 이전 회차와 완전히 독립적입니다. 전체 45개의 로또 번호 개수 중에서 각 숫자가 뽑힐 확률은 매주 동일하게 45분의 1입니다.
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 3: Tax -->
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title class="font-weight-bold text-h6">
              <v-icon start icon="mdi-cash-multiple" class="mr-2 text-primary" />
              실수령액과 세금 계산
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              <p class="mb-2">
                로또 당첨금은 <span class="text-decoration-underline font-weight-bold">기타소득</span>으로 분류되어 세금이 원천징수됩니다. 
                세금 비율은 당첨금의 규모에 따라 다릅니다.
              </p>
              <v-table density="compact" class="my-3 border rounded-lg">
                <thead>
                  <tr class="bg-grey-lighten-4">
                    <th>당첨금 구간</th>
                    <th>세율 (소득세+주민세)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>200만원 이하 (4, 5등)</td>
                    <td><strong class="text-primary font-weight-bold">비과세 (0%)</strong></td>
                  </tr>
                  <tr>
                    <td>3억원 이하</td>
                    <td>22% (소득세 20% + 주민세 2%)</td>
                  </tr>
                  <tr>
                    <td>3억원 초과</td>
                    <td>33% (소득세 30% + 주민세 3%)</td>
                  </tr>
                </tbody>
              </v-table>
              <p>
                예를 들어, 1등 당첨금이 20억원이라면:
                <br/>- 3억원까지는 22% 공제
                <br/>- 나머지 17억원에 대해서는 33% 공제
                <br/>를 적용하여 최종 실수령액이 결정됩니다.
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 4: How to Claim -->
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title class="font-weight-bold text-h6">
              <v-icon start icon="mdi-bank" class="mr-2 text-primary" />
              당첨금 수령 방법 가이드
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              <ul class="pl-5 my-2">
                <li class="mb-2"><strong>1등:</strong> NH농협은행 본점 (서울) 방문 수령. (신분증, 당첨복권 필수)</li>
                <li class="mb-2"><strong>2등, 3등:</strong> 전국 NH농협은행 지점 어디서나 가능. (신분증, 당첨복권 필수)</li>
                <li class="mb-2"><strong>4등, 5등:</strong> 일반 판매점 또는 농협은행 지점에서 수령 가능. (당첨복권 필수)</li>
                <li><strong>인터넷 구매:</strong> 4, 5등은 예치금 계좌로 자동 지급, 고액 당첨은 실명 확인 후 지급됩니다. 공식 온라인 복권 구매 및 당첨금 수령 세부 절차는 <a href="https://www.dhlottery.co.kr" target="_blank" rel="noopener noreferrer" class="text-primary font-weight-bold">동행복권 공식 홈페이지(dhlottery.co.kr) ↗</a>에서 확인하실 수 있습니다.</li>
              </ul>
              <v-alert type="warning" variant="outlined" density="compact" class="mt-4 rounded-lg">
                <strong>주의:</strong> 복권 뒷면에 미리 서명해두세요. 분실 시 소유권을 주장할 수 있는 중요한 근거가 됩니다.
              </v-alert>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 5: Myths vs Reality -->
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title class="font-weight-bold text-h6">
              <v-icon start icon="mdi-lightbulb-on" class="mr-2 text-primary" />
              로또에 대한 오해와 진실
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              <p class="mb-2"><strong>Q. 자동보다 수동이 당첨 확률이 높다?</strong></p>
              <p class="mb-4 text-grey-darken-2">
                A. 아닙니다. 당첨자 중 자동 비율이 높은 이유는 단순히 자동 구매 비율이 압도적으로 높기 때문입니다. 
                수학적 확률은 동일합니다.
              </p>

              <p class="mb-2"><strong>Q. 명당 판매점은 정말 당첨이 잘 되나?</strong></p>
              <p class="mb-4 text-grey-darken-2">
                A. 명당이라 불리는 곳은 사람이 많이 몰려 판매량이 많기 때문에 당첨자가 많이 나오는 것뿐입니다. 
                <span class="text-primary font-weight-bold">로또메이트</span>에서 생성한 번호도 명당 판매점의 자동 번호와 확률은 똑같습니다.
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        
        <!-- 실시간 세금 및 실수령액 계산기 인터랙티브 카드 -->
        <div class="calculator-card pa-6 mt-8 rounded-xl">
          <div class="text-subtitle-1 font-weight-bold text-primary mb-3 d-flex align-center">
            <v-icon size="20" class="mr-2">mdi-calculator</v-icon>
            실시간 로또 당첨금 세금 및 실수령액 계산기
          </div>
          <v-row dense align="center" class="mb-2">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="calcPrize"
                label="당첨금 입력 (원 단위)"
                type="number"
                variant="outlined"
                color="primary"
                density="compact"
                prefix="₩"
                hide-details
                rounded="lg"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="d-flex justify-space-around flex-wrap text-caption" style="gap: 6px;">
                <v-btn size="small" variant="tonal" color="primary" rounded="lg" @click="calcPrize = 2000000000">1등 20억</v-btn>
                <v-btn size="small" variant="tonal" color="primary" rounded="lg" @click="calcPrize = 50000000">2등 5천만</v-btn>
                <v-btn size="small" variant="tonal" color="primary" rounded="lg" @click="calcPrize = 1500000">3등 150만</v-btn>
              </div>
            </v-col>
          </v-row>
          
          <div v-if="calcPrize > 0" class="mt-4 pa-4 rounded-xl calc-result-box text-left">
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2 text-grey-darken-1">총 당첨 금액:</span>
              <strong>{{ formatWon(calcPrize) }}</strong>
            </div>
            <div class="d-flex justify-space-between mb-2 text-error">
              <span class="text-body-2">원천징수 세금 합계:</span>
              <strong>- {{ formatWon(taxCalculation.totalTax) }} (실효세율 {{ taxCalculation.effectiveRate }}%)</strong>
            </div>
            <div class="text-caption text-grey ml-2 mb-2">
              * 200만원 이하: 비과세 | 3억원 이하: 22% (소득세 20%+주민세 2%) | 3억원 초과분: 33% (소득세 30%+주민세 3%)
            </div>
            <v-divider class="my-2" />
            <div class="d-flex justify-space-between align-center text-h6 font-weight-bold text-success">
              <span>최종 통장 실수령액:</span>
              <span>{{ formatWon(taxCalculation.netPayout) }}</span>
            </div>
          </div>
        </div>

        <div class="mt-8 pa-4 disclaimer-box text-center text-caption text-grey-darken-1">
          본 사이트에서 제공하는 정보는 참고용이며, 복권기금법 및 동행복권의 최신 정책에 따라 달라질 수 있습니다.
          <br/>지나친 도박은 개인과 가정에 불행을 초래할 수 있습니다.
        </div>
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const calcPrize = ref<number>(2000000000)

const taxCalculation = computed(() => {
  const p = calcPrize.value || 0
  if (p <= 2000000) {
    return { totalTax: 0, netPayout: p, effectiveRate: '0.0' }
  }
  
  let tax = 0
  if (p <= 300000000) {
    tax = p * 0.22
  } else {
    // 3억 이하 22% + 3억 초과 33%
    tax = (300000000 * 0.22) + ((p - 300000000) * 0.33)
  }
  
  const net = p - tax
  const rate = ((tax / p) * 100).toFixed(1)
  return { totalTax: Math.floor(tax), netPayout: Math.floor(net), effectiveRate: rate }
})

function formatWon(n: number): string {
  if (n >= 100000000) {
    const eok = Math.floor(n / 100000000)
    const man = Math.floor((n % 100000000) / 10000)
    const rem = n % 10000
    if (man > 0 && rem > 0) {
      return `${eok}억 ${man.toLocaleString()}만 ${rem.toLocaleString()}원`
    } else if (man > 0) {
      return `${eok}억 ${man.toLocaleString()}만 원`
    } else if (rem > 0) {
      return `${eok}억 ${rem.toLocaleString()}원`
    }
    return `${eok}억 원`
  }
  if (n >= 10000) {
    const man = Math.floor(n / 10000)
    const rem = n % 10000
    return rem > 0 ? `${man.toLocaleString()}만 ${rem.toLocaleString()}원` : `${man.toLocaleString()}만 원`
  }
  return `${n.toLocaleString()}원`
}
</script>

<style scoped>
.guide-view {
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

.calculator-card {
  background: #f8faf8;
  border: 1px solid #e2e8f0;
}

.v-theme--dark .calculator-card {
  background: #0f172a;
  border-color: #334155;
}

.calc-result-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
}

.v-theme--dark .calc-result-box {
  background: #1e293b;
  border-color: #334155;
}

.disclaimer-box {
  background: #f8faf8;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  line-height: 1.6;
}

.v-theme--dark .disclaimer-box {
  background: #0f172a;
  border-color: #334155;
  color: #94a3b8;
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
}
</style>

