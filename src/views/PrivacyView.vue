<!-- src/views/PrivacyView.vue -->
<template>
  <v-container fluid class="privacy-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-shield-check</v-icon>
          보안 및 규정
        </div>
        <h1 class="subpage-title">
          {{ locale === 'ko' ? '개인정보처리방침' : (locale === 'ja' ? '個人情報保護方針' : 'Privacy Policy') }}
        </h1>
        <p class="subpage-subtitle">
          로또메이트는 이용자의 개인정보를 소중히 보호하며 관련 법령 및 구글 정책을 철저히 준수합니다.
        </p>
      </div>

      <div class="clean-card pa-6 pa-sm-10 mb-8">
        <!-- 1. KOREAN PRIVACY POLICY -->
        <div v-if="locale === 'ko'">
          <div class="text-subtitle-1 mb-6 text-grey-darken-1" style="line-height: 1.7;">
            로또메이트(이하 "서비스")는 이용자의 개인정보를 보호하고 관련 법령을 준수하기 위해 최선을 다하고 있습니다. 본 개인정보처리방침은 서비스가 이용자의 정보를 어떻게 처리하고 보호하는지 설명합니다.
          </div>

          <v-divider class="my-6"></v-divider>

          <h3 class="policy-subheading mb-2">1. 개인정보 수집 및 이용 목적</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            본 서비스는 이용자의 회원 가입이나 민감한 개인 식별 정보(이름, 이메일, 전화번호 등)를 서버에 수집하거나 저장하지 않습니다. 모든 서비스는 비로그인 방식으로 자유롭게 이용하실 수 있습니다.
          </p>

          <h3 class="policy-subheading mb-2">2. 브라우저 로컬 스토리지 사용</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            본 서비스는 이용자가 직접 생성하고 저장한 로또 번호 목록 등을 저장하기 위해 브라우저의 <strong>로컬 스토리지(Local Storage)</strong>를 사용합니다. 이 데이터는 서비스 서버로 전송되지 않으며, 이용자의 기기 내부 브라우저에만 저장되므로 안심하셔도 됩니다. 이용자는 언제든지 브라우저 쿠키 및 사이트 데이터를 삭제하여 이를 초기화할 수 있습니다.
          </p>

          <h3 class="policy-subheading mb-2">3. Google AdSense 및 제3자 쿠키 정책</h3>
          <p class="mb-2 text-body-1" style="line-height: 1.8;">
            본 서비스는 광고 게재를 위해 Google AdSense를 이용하며, 구글(Google) 및 기타 파트너사는 쿠키를 사용하여 본 서비스 또는 다른 인터넷 사이트에 대한 이용자의 방문 기록을 바탕으로 맞춤형 광고를 제공합니다.
          </p>
          <ul class="pl-6 mb-5 text-body-1" style="line-height: 1.8;">
            <li class="mb-1">Google은 광고 쿠키를 사용하여 본 사이트 및 인터넷의 다른 사이트 방문을 토대로 이용자에게 맞춤형 광고를 게재할 수 있습니다.</li>
            <li class="mb-1">이용자는 구글의 <a href="https://adssettings.google.com" target="_blank" rel="noopener" class="policy-link">광고 설정 ↗</a>을 방문하여 맞춤 설정된 광고를 게재하지 않도록 설정(Opt-out)할 수 있습니다.</li>
            <li class="mb-1">또는 <a href="https://optout.aboutads.info" target="_blank" rel="noopener" class="policy-link">www.aboutads.info ↗</a>를 방문하여 제3자 제공업체의 맞춤형 광고용 쿠키 사용을 차단할 수 있습니다.</li>
          </ul>

          <h3 class="policy-subheading mb-2">4. 웹로그 분석 (Google Analytics)</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            본 서비스는 사이트의 트래픽을 분석하고 이용자의 사용 환경을 개선하기 위해 Google Analytics를 사용합니다. 이는 비개인 식별 데이터(접속 국가, 브라우저 종류, 방문한 페이지 등)만을 수집하며, 이용자는 브라우저의 쿠키 설정을 통해 이를 거부할 수 있습니다.
          </p>

          <h3 class="policy-subheading mb-2">5. 개인정보보호책임자 및 문의처</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            서비스 이용 중 개인정보 처리와 관련하여 문의 사항이 있으신 경우 아래의 연락처로 문의해 주시기 바랍니다.
            <br/>- 이메일: <a href="mailto:superman612@kakao.com" class="policy-link">superman612@kakao.com</a>
          </p>

          <v-divider class="my-6"></v-divider>
          <div class="text-caption text-grey text-right">시행일자: 2026년 6월 6일</div>
        </div>

        <!-- 2. JAPANESE PRIVACY POLICY -->
        <div v-else-if="locale === 'ja'">
          <div class="text-subtitle-1 mb-6 text-grey-darken-1" style="line-height: 1.7;">
            LottoMate（以下「当サービス」）は、利用者の個人情報を保護し、関連法令を遵守することに努めています。本プライバシーポリシーでは、当サービスが利用者の情報をどのように処理・保護しているかを説明します。
          </div>

          <v-divider class="my-6"></v-divider>

          <h3 class="policy-subheading mb-2">1. 個人情報の収集および利用目的</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            当サービスは、利用者の会員登録や、個人を特定できる情報（氏名、メールアドレス、電話番号など）をサーバーで収集または保存することはありません。すべてのサービスはログイン不要で自由にご利用いただけます。
          </p>

          <h3 class="policy-subheading mb-2">2. ブラウザのローカルストレージの使用</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            当サービスは、利用者が作成・保存したロト番号リストを管理するため、ブラウザの<strong>ローカルストレージ（Local Storage）</strong>を使用しています。このデータはサーバーへ送信されず、利用者の端末内にのみ保存されます。利用者はブラウザのキャッシュやサイトデータを削除することで、いつでもこのデータを初期化できます。
          </p>

          <h3 class="policy-subheading mb-2">3. Google AdSenseおよび第三者クッキーポリシー</h3>
          <p class="mb-2 text-body-1" style="line-height: 1.8;">
            当サービスは広告配信のためにGoogle AdSenseを利用しています。Googleおよびそのパートナーは、利用者が当サービスや他のサイトにアクセスした際の情報に基づいて、適切な広告を配信するためにクッキー（Cookie）を使用します。
          </p>
          <ul class="pl-6 mb-5 text-body-1" style="line-height: 1.8;">
            <li class="mb-1">Googleは広告クッキーを使用することにより、当サイトや他のサイトへのアクセス情報に基づいて、適切な広告を利用者に表示できます。</li>
            <li class="mb-1">利用者は、Googleの<a href="https://adssettings.google.com" target="_blank" rel="noopener" class="policy-link">広告設定 ↗</a>でパーソナライズ広告を無効にできます。</li>
            <li class="mb-1">または、<a href="https://optout.aboutads.info" target="_blank" rel="noopener" class="policy-link">www.aboutads.info ↗</a>にアクセスすることで、第三者配信事業者のパーソナライズ広告掲載用クッキーを無効にできます。</li>
          </ul>

          <h3 class="policy-subheading mb-2">4. ウェブ分析（Google Analytics）</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            当サービスは、トラフィック分析およびサービス向上のため、Google Analyticsを使用しています。これにより収集されるデータは匿名であり、個人を特定する情報は含まれません。ブラウザのクッキー設定で拒否することができます。
          </p>

          <h3 class="policy-subheading mb-2">5. お問い合わせ先</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            当サービスの個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
            <br/>- メール: <a href="mailto:superman612@kakao.com" class="policy-link">superman612@kakao.com</a>
          </p>

          <v-divider class="my-6"></v-divider>
          <div class="text-caption text-grey text-right">施行日: 2026年6月6日</div>
        </div>

        <!-- 3. ENGLISH PRIVACY POLICY (DEFAULT) -->
        <div v-else>
          <div class="text-subtitle-1 mb-6 text-grey-darken-1" style="line-height: 1.7;">
            LottoMate ("we," "our," or "Service") is committed to protecting your privacy. This Privacy Policy explains how we process and safeguard your information when you use our website.
          </div>

          <v-divider class="my-6"></v-divider>

          <h3 class="policy-subheading mb-2">1. Information Collection and Use</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            We do not require user registration, and we do not collect or store any personally identifiable information (such as name, email address, or phone number) on our servers. You are free to use all features of the Service anonymously.
          </p>

          <h3 class="policy-subheading mb-2">2. Local Storage Usage</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            Our Service uses your browser's <strong>Local Storage</strong> to save your generated lottery numbers. This data remains strictly inside your local device and is never transmitted to our servers. You can clear this data at any time by deleting your browser cache and site data.
          </p>

          <h3 class="policy-subheading mb-2">3. Google AdSense and Third-Party Cookies</h3>
          <p class="mb-2 text-body-1" style="line-height: 1.8;">
            We use Google AdSense to serve advertisements. Google and third-party vendors use cookies to serve ads based on your prior visits to our website or other websites on the Internet.
          </p>
          <ul class="pl-6 mb-5 text-body-1" style="line-height: 1.8;">
            <li class="mb-1">Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.</li>
            <li class="mb-1">You may opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com" target="_blank" rel="noopener" class="policy-link">Ads Settings ↗</a>.</li>
            <li class="mb-1">Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://optout.aboutads.info" target="_blank" rel="noopener" class="policy-link">www.aboutads.info ↗</a>.</li>
          </ul>

          <h3 class="policy-subheading mb-2">4. Web Analytics (Google Analytics)</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            We use Google Analytics to analyze site traffic and improve user experience. Google Analytics collects only non-personally identifiable data (e.g., country, browser type, visited pages). You can disable cookies in your browser settings if you wish to opt out.
          </p>

          <h3 class="policy-subheading mb-2">5. Contact Information</h3>
          <p class="mb-5 text-body-1" style="line-height: 1.8;">
            If you have any questions about this Privacy Policy, please feel free to contact us:
            <br/>- Email: <a href="mailto:superman612@kakao.com" class="policy-link">superman612@kakao.com</a>
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
.privacy-view {
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

.policy-subheading {
  font-size: 18px;
  font-weight: 800;
  color: #17653a;
  margin-top: 24px;
}

.v-theme--dark .policy-subheading {
  color: #6ee7b7;
}

.policy-link {
  color: #17653a;
  font-weight: 700;
  text-decoration: none;
}

.policy-link:hover {
  text-decoration: underline;
}

.v-theme--dark .policy-link {
  color: #6ee7b7;
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
}
</style>

