<!-- src/views/AboutView.vue -->
<template>
  <v-container fluid class="about-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-information-outline</v-icon>
          서비스 소개
        </div>
        <h1 class="subpage-title">로또메이트 소개</h1>
        <p class="subpage-subtitle">
          건전한 복권 이용 문화와 투명하고 과학적인 빅데이터 분석을 지향하는 독립 정보 포털입니다.
        </p>
      </div>

      <div class="clean-card pa-6 pa-sm-10 mb-8">
        <!-- Section 1: Philosophy -->
        <div class="mb-10 text-left">
          <h2 class="section-title-line mb-3">
            우리의 철학 (Philosophy)
          </h2>
          <p class="text-body-1 mb-4" style="line-height: 1.8;">
            대한민국 로또 6/45 추첨은 이전 결과가 다음 결과에 아무런 영향을 주지 않는 <strong>완전한 독립 시행(Independent Trials)</strong>입니다. 즉, 미래의 당첨 번호를 예측하는 수학적 기법은 존재하지 않습니다.
          </p>
          <p class="text-body-1 mb-0" style="line-height: 1.8;">
            로또메이트는 절대 "당첨 번호를 100% 예측한다"거나 "당첨 확률을 보장한다"는 허위/과장된 주장을 하지 않습니다. 대신, 번호 선택 과정에서 생길 수 있는 심리적 불안을 덜어주고, 중복 없는 번호 생성 및 통계적 필터링을 통해 <strong>복권을 건전하고 재미있는 하나의 일상 오락</strong>으로 즐기실 수 있도록 돕는 것을 철학으로 합니다.
          </p>
        </div>

        <!-- Section 2: Features -->
        <div class="mb-10 text-left">
          <h2 class="section-title-line mb-4">
            주요 제공 서비스
          </h2>
          <v-row>
            <v-col cols="12" md="6">
              <div class="feature-item-card pa-5 fill-height">
                <div class="text-subtitle-1 font-weight-bold text-primary mb-2">☘️ 균형 있는 번호 필터링 생성</div>
                <div class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">
                  단순 무작위 추출이 아닌, 과거에 이미 1등으로 출현했던 번호 조합을 필터링하고 홀짝 비율 등의 조율을 거친 번호를 안전하게 생성합니다.
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="feature-item-card pa-5 fill-height">
                <div class="text-subtitle-1 font-weight-bold text-primary mb-2">📊 투명한 당첨 분석 및 통계</div>
                <div class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">
                  역대 1회부터 누적된 당첨번호 데이터를 바탕으로 각 숫자의 출현 빈도와 끝수 분포 등 객관적인 수치 데이터를 제공합니다.
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="feature-item-card pa-5 fill-height">
                <div class="text-subtitle-1 font-weight-bold text-primary mb-2">⏱️ 가상 수익률 시뮬레이션</div>
                <div class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">
                  만약 내가 선택한 번호로 지난 20년간 꾸준히 로또를 샀다면 어떤 수익을 거두었을지 모의 통계를 계산하여, 복권의 냉혹한 확률을 인지할 수 있는 기회를 제공합니다.
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="feature-item-card pa-5 fill-height">
                <div class="text-subtitle-1 font-weight-bold text-primary mb-2">✍️ 전문적인 금융 및 세무 정보</div>
                <div class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">
                  고액 당첨 시의 소득세 원천징수 계산법, 공동 구매 시의 증여세 대처 방법, 수령 절차 가이드 등 유용하고 신뢰할 수 있는 텍스트 콘텐츠를 전해드립니다.
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Section 3: Social Responsibility -->
        <div class="mb-10 text-left">
          <h2 class="section-title-line mb-3">
            건전한 복권 구매 행동 강령
          </h2>
          <p class="text-body-1 mb-4" style="line-height: 1.8;">
            복권 구매는 소외계층을 돕는 복권기금의 재원으로 사용되는 유익한 면이 있는 반면, 과도한 몰입은 개인의 일상과 가정 경제를 위협할 수 있습니다. 로또메이트는 사용자가 주당 1만 원 이하의 소액으로 건전하게 복권을 이용하도록 적극 권장하고 있습니다.
          </p>
          <v-alert type="info" variant="tonal" color="primary" class="my-4 rounded-xl font-weight-bold">
            복권은 '투자'나 '재테크' 수단이 될 수 없습니다. 한 주의 작은 행복과 설렘을 나누는 '오락'으로만 대하시기를 바랍니다.
          </v-alert>
        </div>

        <!-- Section 4: Data Source & Official Link -->
        <div class="mb-10 text-left">
          <h2 class="section-title-line mb-3">
            데이터 출처 및 공식 사이트 안내
          </h2>
          <p class="text-body-1 mb-2" style="line-height: 1.8;">
            로또메이트에서 활용하는 모든 로또 6/45 당첨 번호, 등수별 당첨금 및 추첨 결과 데이터는 대한민국 복권 수탁사업자인 <strong>동행복권(Donghang Lottery)</strong>의 공식 공공데이터 포털 API 및 공식 발표 자료에 기반합니다.
          </p>
          <p class="text-body-1" style="line-height: 1.8;">
            실제 온라인 복권 구매, 당첨금 수령 확인 및 공식 공지사항은 동행복권 공식 웹사이트를 이용해 주시기 바랍니다.
            <br/>
            * <strong>공식 홈페이지</strong>: <a href="https://www.dhlottery.co.kr" target="_blank" rel="noopener noreferrer" class="text-primary font-weight-bold">동행복권 공식 사이트 (dhlottery.co.kr) ↗</a>
          </p>
        </div>

        <!-- Section 5: Contact -->
        <div class="text-left">
          <h2 class="section-title-line mb-3">
            문의 및 제휴 (Contact Us)
          </h2>
          <p class="text-body-1 mb-0" style="line-height: 1.8;">
            로또메이트에 대한 피드백, 제안 사항, 데이터 기재 오류 보정 요청 등은 언제든 이메일로 보내주시면 성실히 검토하고 빠르게 보완하겠습니다.
            <br/>
            * <strong>이메일</strong>: <a href="mailto:superman612@kakao.com" class="text-primary font-weight-bold">superman612@kakao.com</a>
          </p>
        </div>
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-view {
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

.section-title-line {
  font-size: 20px;
  font-weight: 800;
  color: #17653a;
  border-left: 4px solid #17653a;
  padding-left: 10px;
}

.v-theme--dark .section-title-line {
  color: #6ee7b7;
  border-left-color: #10b981;
}

.feature-item-card {
  background: #f8faf8;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
}

.v-theme--dark .feature-item-card {
  background: #0f172a;
  border-color: #334155;
}

a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
}
</style>

