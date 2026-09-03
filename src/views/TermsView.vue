<!-- src/views/TermsView.vue -->
<template>
  <v-container fluid class="terms-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-file-document-outline</v-icon>
          이용 규정
        </div>
        <h1 class="subpage-title">
          {{ locale === 'ko' ? '이용약관' : (locale === 'ja' ? '利用規約' : 'Terms of Service') }}
        </h1>
        <p class="subpage-subtitle">
          로또메이트 서비스의 이용 조건 및 절차, 책임 범위에 관한 기본 사항을 안내합니다.
        </p>
      </div>

      <div class="clean-card pa-6 pa-sm-10 mb-8">
        <!-- 1. KOREAN TERMS OF SERVICE -->
        <div v-if="locale === 'ko'">
          <div class="text-subtitle-1 mb-6 text-grey-darken-1" style="line-height: 1.7;">
            로또메이트(이하 "서비스")를 이용해 주셔서 감사합니다. 본 약관은 본 서비스의 이용 조건 및 절차에 관한 기본적인 사항을 규정합니다. 서비스를 이용함으로써 귀하는 본 약관에 동의하게 됩니다.
          </div>

          <v-divider class="my-6"></v-divider>

          <h3 class="terms-subheading mb-2">1. 서비스의 목적 및 제공</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            본 서비스는 이용자에게 무작위 로또 번호 생성, 번호 비교, 모의 시뮬레이션, 통계 분석 등 정보 제공 및 오락 목적으로 서비스 개발자가 개인적으로 운영하는 무료 웹 애플리케이션입니다.
          </p>

          <h3 class="terms-subheading mb-2">2. 당첨 보장 불가 및 면책 조항 (필독)</h3>
          <v-alert type="warning" variant="tonal" class="mb-4 text-body-1 font-weight-medium rounded-xl">
            본 서비스에서 제공하는 모든 로또 번호 생성 기능 및 통계 분석 결과는 수학적 확률 및 무작위 난수 생성에 기반한 것으로, 실제 복권 당첨을 보장하지 않습니다.
          </v-alert>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            실제 로또 6/45의 모든 추첨 결과는 독립 시행이므로 어떠한 통계적, 수학적 기법으로도 미래의 당첨 번호를 예측할 수 없습니다. 서비스 내의 시뮬레이션 및 분석 데이터는 오락용 참고 자료일 뿐이며, 이를 바탕으로 한 복권 구매 결정 및 그에 따른 모든 재정적 결과(구매 비용 손실 등)는 전적으로 이용자 본인의 책임입니다. 서비스 개발자는 당첨 여부나 손실에 대해 어떠한 법적 책임을 지지 않습니다.
          </p>

          <h3 class="terms-subheading mb-2">3. 이용자의 권리 및 의무</h3>
          <ul class="pl-6 mb-5 text-body-1" style="line-height: 1.8;">
            <li class="mb-2">이용자는 본 서비스를 개인적이고 비상업적인 목적으로만 자유롭게 이용할 수 있습니다.</li>
            <li class="mb-2">서비스의 데이터를 무단으로 대량 크롤링하거나 시스템에 부하를 주는 행위, 역공학(Reverse Engineering) 등 서비스의 정상적인 운영을 방해하는 행위를 금지합니다.</li>
          </ul>

          <h3 class="terms-subheading mb-2">4. 브라우저 데이터 보존</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            이용자가 저장한 번호 목록 등은 이용자의 브라우저 로컬 스토리지에 저장됩니다. 기기 오작동, 브라우저 캐시 삭제, 기기 분실 등으로 인한 데이터 유실에 대해 본 서비스는 복구 의무를 지지 않습니다.
          </p>

          <h3 class="terms-subheading mb-2">5. 약관의 변경 및 서비스의 중단</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            본 서비스는 운영상 필요하다고 판단되는 경우 예고 없이 서비스의 일부 또는 전부를 변경하거나 중단할 수 있으며, 본 이용약관의 내용을 수정할 수 있습니다. 변경된 약관은 사이트 게시판이나 페이지 내에 공지함으로써 효력이 발생합니다.
          </p>

          <v-divider class="my-6"></v-divider>
          <div class="text-caption text-grey text-right">시행일자: 2026년 6월 6일</div>
        </div>

        <!-- 2. JAPANESE TERMS OF SERVICE -->
        <div v-else-if="locale === 'ja'">
          <div class="text-subtitle-1 mb-6 text-grey-darken-1" style="line-height: 1.7;">
            LottoMate（以下「当サービス」）をご利用いただきありがとうございます。本規約は、当サービスの利用条件および手続きに関する基本的な事項を定めています。当サービスを利用することにより、利用者は本規約に同意したものとみなされます。
          </div>

          <v-divider class="my-6"></v-divider>

          <h3 class="terms-subheading mb-2">1. サービスの目的および提供</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            当サービスは、利用者にランダムなロト番号の生成、番号の比較、模擬シミュレーション、統計分析などの情報提供および娯楽目的で個人運営されている無料のウェブアプリケーションです。
          </p>

          <h3 class="terms-subheading mb-2">2. 当選保証の不可および免責事項（必読）</h3>
          <v-alert type="warning" variant="tonal" class="mb-4 text-body-1 font-weight-medium rounded-xl">
            当サービスで提供されるすべてのロト番号生成機能および統計分析結果は、数学的な確率およびランダムな乱数生成に基づいており、実際の宝くじの当選を保証するものではありません。
          </v-alert>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            実際のロト抽選結果はすべて独立試行であるため、いかなる統計的・数学的手法を用いても、未来の当選番号を予測することは不可能です。サービス内のシミュレーションおよび分析データは娯楽用の参考資料に過ぎず、これに基づいた宝くじの購入決定およびそれに伴うすべての財務的結果（購入費用の損失など）は、完全に利用者自身の責任となります。当サービスの開発者は、当選の可否や損失に関していかなる法的責任も負いません。
          </p>

          <h3 class="terms-subheading mb-2">3. 利用者の権利および義務</h3>
          <ul class="pl-6 mb-5 text-body-1" style="line-height: 1.8;">
            <li class="mb-2">利用者は、当サービスを個人的かつ非商業的な目的に限って自由にご利用いただけます。</li>
            <li class="mb-2">当サービスのデータを無断で大量にスクレイピングする行為、システムに過度な負荷をかける行為、その他正常な運営を妨げる行為を禁止します。</li>
          </ul>

          <h3 class="terms-subheading mb-2">4. ブラウザデータの保存</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            利用者が保存した番号リストなどは、ブラウザのローカルストレージに保存されます。端末の故障、ブラウザキャッシュの削除、端末の紛失などによるデータの消失について、当サービスは復旧の義務を負いません。
          </p>

          <h3 class="terms-subheading mb-2">5. 規約の変更およびサービスの中断</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            当サービスは、運営上の必要があると判断した場合、予告なくサービスの一部または全部を変更もしくは中断することがあり、本規約を改定することがあります。改定された規約は当ページへの掲載をもって効力を生じるものとします。
          </p>

          <v-divider class="my-6"></v-divider>
          <div class="text-caption text-grey text-right">施行日: 2026년 6월 6일</div>
        </div>

        <!-- 3. ENGLISH TERMS OF SERVICE (DEFAULT) -->
        <div v-else>
          <div class="text-subtitle-1 mb-6 text-grey-darken-1" style="line-height: 1.7;">
            Thank you for using LottoMate ("Service"). These Terms of Service govern your use of our website. By accessing or using the Service, you agree to be bound by these terms.
          </div>

          <v-divider class="my-6"></v-divider>

          <h3 class="terms-subheading mb-2">1. Description of Service</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            LottoMate is a free web application operated for entertainment and informational purposes, providing random lottery number generation, ticket comparisons, draw simulations, and basic historical statistics.
          </p>

          <h3 class="terms-subheading mb-2">2. No Guarantee of Winnings and Disclaimer of Liability (Important)</h3>
          <v-alert type="warning" variant="tonal" class="mb-4 text-body-1 font-weight-medium rounded-xl">
            All lottery number generation features and statistical analysis results provided by this Service are based on mathematical probabilities and random number generation. They do NOT guarantee any real lottery winnings.
          </v-alert>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            Each draw in the official lottery is an independent event, meaning future winning numbers cannot be predicted by any statistical or mathematical means. The simulation and analysis data on this website are for entertainment reference only. Any decision to buy lottery tickets and the financial consequences of doing so (including losses) are entirely your responsibility. We hold no liability for any financial losses or lack of winnings.
          </p>

          <h3 class="terms-subheading mb-2">3. User Obligations and Restrictions</h3>
          <ul class="pl-6 mb-5 text-body-1" style="line-height: 1.8;">
            <li class="mb-2">You may use the Service only for personal, non-commercial purposes.</li>
            <li class="mb-2">You must not crawl the site data systematically, overload our systems, or perform any action that disrupts the normal operation of the Service.</li>
          </ul>

          <h3 class="terms-subheading mb-2">4. Data Retention</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            Your saved numbers are kept in your browser's local storage. We are not responsible for any data loss resulting from device malfunction, browser clearing, or device loss.
          </p>

          <h3 class="terms-subheading mb-2">5. Modification and Termination</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            We reserve the right to modify or discontinue the Service (or any part thereof) or revise these Terms at any time without notice. Your continued use of the website after changes constitutes agreement to the updated Terms.
          </p>

          <v-divider class="my-6"></v-divider>
          <div class="text-caption text-grey text-right">Effective Date: June 6, 2026</div>
        </div>
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>

<style scoped>
.terms-view {
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

.terms-subheading {
  font-size: 18px;
  font-weight: 800;
  color: #17653a;
  margin-top: 24px;
}

.v-theme--dark .terms-subheading {
  color: #6ee7b7;
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
}
</style>
