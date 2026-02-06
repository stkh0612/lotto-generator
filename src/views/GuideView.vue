<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="820" elevation="1" rounded>
      <div class="text-h4 font-weight-bold mb-6 text-primary">{{ $t('guideTitle') }}</div>

      <div class="text-subtitle-1 mb-6 grey--text text--darken-2">
        로또메이트는 단순한 번호 생성기를 넘어, 로또에 관한 정확한 정보와 올바른 이용 문화를 지향합니다.
        아래에서 로또에 대한 모든 궁금증을 해결하세요.
      </div>

      <v-expansion-panels variant="accordion" multiple>
        <!-- Section 1: History -->
        <v-expansion-panel>
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
        <v-expansion-panel>
          <v-expansion-panel-title class="font-weight-bold text-h6">
            <v-icon start icon="mdi-calculator" class="mr-2 text-primary" />
            확률의 수학: 814만분의 1
          </v-expansion-panel-title>
          <v-expansion-panel-text class="text-body-1">
            <p class="mb-2">
              로또 1등 당첨 확률은 45개의 숫자 중 순서에 상관없이 6개를 모두 맞춰야 하므로, 수학적으로 다음과 같이 계산됩니다.
            </p>
            <v-alert density="compact" variant="tonal" border="start" border-color="primary" class="my-3">
              (45 × 44 × 43 × 42 × 41 × 40) ÷ (6 × 5 × 4 × 3 × 2 × 1) = <strong>8,145,060</strong>
            </v-alert>
            <p class="mb-2">
              이는 매주 10만원어치(100게임) 로또를 산다고 가정할 때, 1등에 당첨되기 위해서는 평균적으로 
              <strong>약 1,566년</strong>이 걸린다는 의미입니다.
            </p>
            <p>
              <strong>독립 시행의 법칙:</strong> 많은 분들이 "지난주에 안 나온 번호가 이번 주에 나올 확률이 높다"고 생각하시지만, 
              이는 수학적으로 <strong>거짓</strong>입니다. 동전을 던져 앞면이 10번 나왔다고 해서 11번째에 뒷면이 나올 확률이 높아지지 않는 것과 같습니다. 
              매 회차의 추첨은 이전 회차와 완전히 독립적입니다.
            </p>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Section 3: Tax -->
        <v-expansion-panel>
          <v-expansion-panel-title class="font-weight-bold text-h6">
            <v-icon start icon="mdi-cash-multiple" class="mr-2 text-primary" />
            실수령액과 세금 계산
          </v-expansion-panel-title>
          <v-expansion-panel-text class="text-body-1">
            <p class="mb-2">
              로또 당첨금은 <span class="text-decoration-underline">기타소득</span>으로 분류되어 세금이 원천징수됩니다. 
              세금 비율은 당첨금의 규모에 따라 다릅니다.
            </p>
            <v-table density="compact" class="my-3 border rounded">
              <thead>
                <tr class="bg-grey-lighten-4">
                  <th>당첨금 구간</th>
                  <th>세율 (소득세+주민세)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>200만원 이하 (4, 5등)</td>
                  <td><strong>비과세 (0%)</strong></td>
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
        <v-expansion-panel>
          <v-expansion-panel-title class="font-weight-bold text-h6">
            <v-icon start icon="mdi-bank" class="mr-2 text-primary" />
            당첨금 수령 방법 가이드
          </v-expansion-panel-title>
          <v-expansion-panel-text class="text-body-1">
            <ul class="pl-5 my-2">
              <li class="mb-2"><strong>1등:</strong> NH농협은행 본점 (서울) 방문 수령. (신분증, 당첨복권 필수)</li>
              <li class="mb-2"><strong>2등, 3등:</strong> 전국 NH농협은행 지점 어디서나 가능. (신분증, 당첨복권 필수)</li>
              <li class="mb-2"><strong>4등, 5등:</strong> 일반 판매점 또는 농협은행 지점에서 수령 가능. (당첨복권 필수)</li>
              <li><strong>인터넷 구매:</strong> 4, 5등은 예치금 계좌로 자동 지급, 고액 당첨은 실명 확인 후 지급.</li>
            </ul>
            <v-alert type="warning" variant="outlined" density="compact" class="mt-4">
              <strong>주의:</strong> 복권 뒷면에 미리 서명해두세요. 분실 시 소유권을 주장할 수 있는 중요한 근거가 됩니다.
            </v-alert>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Section 5: Myths vs Reality -->
        <v-expansion-panel>
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
      
      <div class="mt-8 pa-4 bg-grey-lighten-4 rounded text-center text-caption text-grey">
        본 사이트에서 제공하는 정보는 참고용이며, 복권기금법 및 동행복권의 최신 정책에 따라 달라질 수 있습니다.
        <br/>지나친 도박은 개인과 가정에 불행을 초래할 수 있습니다.
      </div>

    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const panel = ref([0]) // Open first panel by default
</script>

<style scoped>
.v-expansion-panel-title {
  font-size: 1.1rem;
}
</style>
