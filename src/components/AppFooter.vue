<!-- src/components/AppFooter.vue -->
<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-left">
        <div class="footer-logo">LottoMate</div>
        <div class="footer-links-wrap">
          <ul class="footer-links">
            <li><router-link to="/terms">이용약관</router-link></li>
            <li><router-link to="/privacy">개인정보처리방침</router-link></li>
            <li><a :href="`mailto:${email}`">고객센터</a></li>
            <li><a href="https://www.dhlottery.co.kr" target="_blank" rel="noopener noreferrer">동행복권 공식 ↗</a></li>
          </ul>

          <!-- 애드센스 및 이용자 보호 면책 조항 -->
          <div class="disclaimer-text">
            본 서비스의 로또 번호 추천 및 통계 정보는 과거 데이터에 기반한 엔터테인먼트 참고 자료이며 실제 당첨을 보장하지 않습니다. 복권 구매 책임은 구매자 본인에게 있습니다.
          </div>

          <div class="copyright">
            © {{ currentYear }} LottoMate. All rights reserved.
          </div>
        </div>
      </div>

      <button type="button" class="scroll-top-btn" @click="scrollToTop" title="맨 위로 가기">
        <v-icon size="22">mdi-arrow-up</v-icon>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const email = 'superman612@kakao.com'
const currentYear = computed(() => new Date().getFullYear())

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.site-footer {
  background: #1c4e35;
  color: #e2e8f0;
  padding: 40px 24px 34px;
  width: 100%;
  margin-top: auto;
}

.footer-inner {
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-left {
  display: flex;
  align-items: flex-start;
  gap: 36px;
  flex: 1;
}

.footer-logo {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.footer-links-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  flex-wrap: wrap;
}

.footer-links a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.15s;
}

.footer-links a:hover {
  color: #ffffff;
}

.disclaimer-text {
  font-size: 12px;
  color: #a7f3d0;
  opacity: 0.85;
  line-height: 1.5;
  max-width: 780px;
}

.copyright {
  font-size: 12px;
  color: #94a3b8;
}

.scroll-top-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffffff;
  color: #1e293b;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  transition: all 0.2s;
  flex-shrink: 0;
}

.scroll-top-btn:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-left {
    flex-direction: column;
    gap: 16px;
  }
  .scroll-top-btn {
    align-self: flex-end;
  }
}
</style>
