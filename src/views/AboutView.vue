<!-- src/views/AboutView.vue -->
<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="820" elevation="1" rounded>
      <div class="d-flex align-center mb-6">
        <v-icon start icon="mdi-information-outline" class="text-primary mr-2" size="32" />
        <h1 class="text-h4 font-weight-bold text-primary mb-0">로또메이트 소개</h1>
      </div>

      <p class="text-subtitle-1 text-grey mb-8">
        로또메이트(LottoMate)는 복권을 건전하게 즐기는 문화를 지향하며, 사용자분들께 과학적이고 투명한 데이터를 제공하기 위해 설립된 독립 서비스입니다.
      </p>

      <v-divider class="mb-8" />

      <!-- Section 1: Philosophy -->
      <div class="mb-8 text-left">
        <h2 class="text-h6 font-weight-bold mb-3 text-primary" style="border-left: 4px solid #7c4dff; padding-left: 8px;">
          우리의 철학 (Philosophy)
        </h2>
        <p class="text-body-1 mb-4" style="line-height: 1.8;">
          대한민국 로또 6/45 추첨은 이전 결과가 다음 결과에 아무런 영향을 주지 않는 **완전한 독립 시행(Independent Trials)**입니다. 즉, 미래의 당첨 번호를 예측하는 수학적 기법은 존재하지 않습니다.
        </p>
        <p class="text-body-1 mb-4" style="line-height: 1.8;">
          로또메이트는 절대 "당첨 번호를 100% 예측한다"거나 "당첨 확률을 보장한다"는 허위/과장된 주장을 하지 않습니다. 대신, 번호 선택 과정에서 생길 수 있는 심리적 불안을 덜어주고, 중복 없는 번호 생성 및 통계적 필터링을 통해 **복권을 건전하고 재미있는 하나의 오락**으로 즐기실 수 있도록 돕는 것을 철학으로 합니다.
        </p>
      </div>

      <!-- Section 2: Features -->
      <div class="mb-8 text-left">
        <h2 class="text-h6 font-weight-bold mb-3 text-primary" style="border-left: 4px solid #7c4dff; padding-left: 8px;">
          주요 제공 서비스
        </h2>
        <v-row class="mt-2">
          <v-col cols="12" md="6" class="py-2">
            <v-card variant="outlined" class="pa-4 h-100">
              <div class="text-subtitle-1 font-weight-bold text-secondary mb-2">☘️ 균형 있는 번호 필터링 생성</div>
              <div class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">
                단순 무작위 추출이 아닌, 과거에 이미 1등으로 출현했던 번호 조합을 필터링하고 홀짝 비율 등의 조율을 거친 번호를 안전하게 생성합니다.
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="py-2">
            <v-card variant="outlined" class="pa-4 h-100">
              <div class="text-subtitle-1 font-weight-bold text-secondary mb-2">📊 투명한 당첨 분석 및 통계</div>
              <div class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">
                역대 1회부터 누적된 당첨번호 데이터를 바탕으로 각 숫자의 출현 빈도와 끝수 분포 등 객관적인 수치 데이터를 제공합니다.
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="py-2">
            <v-card variant="outlined" class="pa-4 h-100">
              <div class="text-subtitle-1 font-weight-bold text-secondary mb-2">⏱️ 가상 수익률 시뮬레이션</div>
              <div class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">
                만약 내가 선택한 번호로 지난 20년간 꾸준히 로또를 샀다면 어떤 수익을 거두었을지 모의 통계를 계산하여, 복권의 냉혹한 확률을 인지할 수 있는 기회를 제공합니다.
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="py-2">
            <v-card variant="outlined" class="pa-4 h-100">
              <div class="text-subtitle-1 font-weight-bold text-secondary mb-2">✍️ 전문적인 금융 및 세무 정보</div>
              <div class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">
                고액 당첨 시의 소득세 원천징수 계산법, 공동 구매 시의 증여세 대처 방법, 수령 절차 가이드 등 유용하고 신뢰할 수 있는 텍스트 콘텐츠를 전해드립니다.
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Section 3: Social Responsibility -->
      <div class="mb-8 text-left">
        <h2 class="text-h6 font-weight-bold mb-3 text-primary" style="border-left: 4px solid #7c4dff; padding-left: 8px;">
          건전한 복권 구매 행동 강령
        </h2>
        <p class="text-body-1 mb-4" style="line-height: 1.8;">
          복권 구매는 소외계층을 돕는 복권기금의 재원으로 사용되는 유익한 면이 있는 반면, 과도한 몰입은 개인의 일상과 가정 경제를 위협할 수 있습니다. 로또메이트는 사용자가 주당 1만 원 이하의 소액으로 건전하게 복권을 이용하도록 적극 권장하고 있습니다.
        </p>
        <v-alert type="info" variant="tonal" border="start" density="compact" class="my-4">
          복권은 '투자'나 '재테크' 수단이 될 수 없습니다. 한 주의 작은 행복과 설렘을 나누는 '오락'으로만 대하시기를 바랍니다.
        </v-alert>
      </div>

      <!-- Section 4: Contact -->
      <div class="mb-6 text-left">
        <h2 class="text-h6 font-weight-bold mb-3 text-primary" style="border-left: 4px solid #7c4dff; padding-left: 8px;">
          문의 및 제휴 (Contact Us)
        </h2>
        <p class="text-body-1" style="line-height: 1.8;">
          로또메이트에 대한 피드백, 제안 사항, 데이터 기재 오류 보정 요청 등은 언제든 이메일로 보내주시면 성실히 검토하고 빠르게 보완하겠습니다.
          <br/>
          * **이메일**: <a href="mailto:stkh0612@gmail.com" class="text-primary font-weight-bold">stkh0612@gmail.com</a>
        </p>
      </div>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
// No complex script logic needed for this page
</script>

<style scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
