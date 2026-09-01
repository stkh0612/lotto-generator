<!-- src/components/AppFooter.vue -->
<template>
  <footer class="app-footer py-6 mt-8">
    <v-container>
      <!-- 약관 및 정책 링크 -->
      <div class="footer-links mb-4 d-flex justify-center flex-wrap align-center">
        <router-link to="/about" class="footer-link">{{ t('navAbout', '소개') }}</router-link>
        <span class="divider mx-3">|</span>
        <router-link to="/privacy" class="footer-link">{{ t('navPrivacy', '개인정보처리방침') }}</router-link>
        <span class="divider mx-3">|</span>
        <router-link to="/terms" class="footer-link">{{ t('navTerms', '이용약관') }}</router-link>
        <span class="divider mx-3">|</span>
        <a href="https://www.dhlottery.co.kr" target="_blank" rel="noopener noreferrer" class="footer-link">
          동행복권 공식사이트 ↗
        </a>
      </div>

      <!-- 면책 조항 및 주의사항 -->
      <div class="footer-disclaimer mx-auto mb-4 text-center px-4" style="max-width: 760px;">
        <p class="mb-2 text-caption">
          <strong>면책조항 (Disclaimer):</strong> 본 서비스에서 제공하는 모든 로또 번호 생성 결과, 과거 통계 대조 및 분석 정보는 수학적 확률과 임의의 난수에 기반한 참고 데이터일 뿐이며, 실제 당첨을 보장하지 않습니다. 로또 구매에 따른 모든 결과 및 재정적 책임은 전적으로 구매자 본인에게 있습니다.
        </p>
        <p class="text-caption text-grey">
          지나친 도박과 복권 몰입은 개인과 가정을 해칠 수 있습니다. 복권 구매는 오락으로 가볍게 즐겨주세요.
        </p>
      </div>

      <!-- 저작권 및 고객 문의 -->
      <div class="footer-copyright text-center text-caption text-grey-darken-1">
        <div>© {{ currentYear }} LottoMate. All rights reserved.</div>
        <div class="mt-1">
          고객문의: <a href="mailto:superman612@kakao.com" class="contact-email">superman612@kakao.com</a>
        </div>
      </div>
    </v-container>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  border-top: 1px solid rgba(124, 77, 255, 0.1);
  background: rgba(15, 4, 28, 0.4);
  width: 100%;
}

.v-theme--light .app-footer {
  background: rgba(255, 255, 255, 0.8);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.footer-link {
  color: #7c4dff;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.v-theme--light .footer-link {
  color: #1976d2;
}

.footer-link:hover {
  text-decoration: underline;
  color: #e040fb;
}

.divider {
  color: rgba(124, 77, 255, 0.3);
  font-size: 0.8rem;
}

.v-theme--light .divider {
  color: rgba(0, 0, 0, 0.2);
}

.footer-disclaimer p {
  line-height: 1.6;
  color: #b0bec5;
}

.v-theme--light .footer-disclaimer p {
  color: #616161;
}

.contact-email {
  color: #b0bec5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.v-theme--light .contact-email {
  color: #424242;
}

.contact-email:hover {
  color: #7c4dff;
  text-decoration: underline;
}
</style>
