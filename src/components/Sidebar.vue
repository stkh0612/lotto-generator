<!-- src/components/Sidebar.vue -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    width="300"
    class="sidebar"
  >
    <!-- 사이드바 상단 헤더 -->
    <div class="sidebar-header pa-4 pb-3 d-flex align-center justify-space-between">
      <div class="d-flex align-center" style="gap: 8px;">
        <span class="text-h6 font-weight-bold" style="color: #17653a;">LottoMate</span>
      </div>
      <v-btn icon="mdi-close" variant="text" size="small" @click="drawer = false" />
    </div>
    <v-divider class="mb-2" />

    <v-list dense class="pt-0">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        link
        class="menu-item"
        :active="item.to === $route.path"
        @click="drawer = false"
      >
        <template #default>
          <v-icon
            class="menu-icon"
            :color="item.to === $route.path ? 'primary' : 'grey-darken-1'"
            size="22"
          >
            {{ item.icon }}
          </v-icon>
          <span class="menu-label">{{ item.title }}</span>
        </template>
      </v-list-item>
    </v-list>

    <div class="mt-auto px-4 pb-4">
      <!-- 모바일 드로어 언어 선택기 -->
      <div class="drawer-lang-box mb-3 d-flex justify-center">
        <div class="drawer-lang-inner">
          <v-icon size="16" class="mr-1 text-primary">mdi-translate</v-icon>
          <select v-model="locale" aria-label="언어 선택" class="drawer-lang-select">
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>

      <div class="policy-links d-flex justify-center mb-3">
        <router-link to="/privacy" class="policy-link" @click="drawer = false">{{ t('navPrivacy', '개인정보처리방침') }}</router-link>
        <span class="policy-separator mx-2">|</span>
        <router-link to="/terms" class="policy-link" @click="drawer = false">{{ t('navTerms', '이용약관') }}</router-link>
        <span class="policy-separator mx-2">|</span>
        <router-link to="/about" class="policy-link" @click="drawer = false">{{ t('navAbout', '소개') }}</router-link>
      </div>
      <AdBanner />
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AdBanner from './AdBanner.vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const drawer = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const { t, locale } = useI18n()

watch(locale, (newLocale) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lottomate-locale', newLocale)
  }
})

const items = computed(() => [
  { title: t('navHome', '홈으로'),                      icon: 'mdi-home',                  to: '/' },
  { title: t('navFortune', '운세/재미'),                icon: 'mdi-crystal-ball',          to: '/fortune' },
  { title: t('navResults', '당첨번호조회'),             icon: 'mdi-format-list-numbered',  to: '/results' },
  { title: t('navCompareLong', '당첨번호 대조/비교'),   icon: 'mdi-magnify',               to: '/compare' },
  { title: t('navStats', '통계분석'),                   icon: 'mdi-chart-bar',             to: '/stats' },
  { title: t('navAnalysis', '심층 패턴분석'),           icon: 'mdi-chart-pie',             to: '/analysis' },
  { title: t('navSimulation', '시뮬레이션 추첨'),       icon: 'mdi-slot-machine',          to: '/simulation' },
  { title: t('navBlog', '커뮤니티 (블로그)'),           icon: 'mdi-post-outline',          to: '/blog' },
  { title: t('navSaved', '마이페이지 (저장번호)'),      icon: 'mdi-content-save',          to: '/saved' },
  { title: t('navGuide', '로또 가이드'),                icon: 'mdi-book-open-page-variant',to: '/guide' },
  { title: t('navAbout', '서비스 소개'),                icon: 'mdi-information-outline',   to: '/about' },
])
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background: #ffffff !important;
}

.v-theme--dark .sidebar {
  background: #1e293b !important;
}

.sidebar-header {
  padding-top: calc(16px + env(safe-area-inset-top, 0px)) !important;
}

.menu-item {
  display: flex !important;
  align-items: center;
  padding: 10px 14px;
  margin: 4px 10px;
  border-radius: 10px;
  transition: all 0.15s;
}

.menu-icon {
  margin-right: 12px;
}

.menu-label {
  font-weight: 600;
  font-size: 14px;
  color: #334155;
}

.v-theme--dark .menu-label {
  color: #e2e8f0;
}

.menu-item.router-link-exact-active {
  background-color: rgba(23, 101, 58, 0.1);
}

.menu-item.router-link-exact-active .menu-label {
  color: #17653a;
  font-weight: 700;
}

.v-theme--dark .menu-item.router-link-exact-active {
  background-color: rgba(34, 197, 94, 0.15);
}

.v-theme--dark .menu-item.router-link-exact-active .menu-label {
  color: #22c55e;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.policy-links {
  font-size: 0.75rem;
}

.policy-link {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
}

.policy-link:hover {
  color: #17653a;
  text-decoration: underline;
}

.policy-separator {
  color: #cbd5e1;
}

.drawer-lang-inner {
  display: inline-flex;
  align-items: center;
  background: #f8faf8;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 13px;
}

.v-theme--dark .drawer-lang-inner {
  background: #334155;
  border-color: #475569;
}

.drawer-lang-select {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
}

.v-theme--dark .drawer-lang-select {
  color: #e2e8f0;
}
</style>
