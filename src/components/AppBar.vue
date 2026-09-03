<!-- src/components/AppBar.vue -->
<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- 좌측 로고 -->
      <router-link to="/" class="site-logo">
        LottoMate
      </router-link>

      <!-- 데스크탑 중앙 메뉴 (768px 이상에서만 노출) -->
      <nav class="desktop-nav">
        <ul class="nav-links">
          <li :class="{ active: currentRoute === '/' }">
            <router-link to="/" class="nav-link nav-home" title="홈">
              <v-icon size="19" class="nav-icon">mdi-home</v-icon>
            </router-link>
          </li>
          <li :class="{ active: currentRoute.startsWith('/simulation') }">
            <router-link to="/simulation" class="nav-link">{{ $t('navSimulation', '시뮬레이션') }}</router-link>
          </li>
          <li :class="{ active: currentRoute === '/stats' }">
            <router-link to="/stats" class="nav-link">{{ $t('navStats', '통계') }}</router-link>
          </li>
          <li :class="{ active: currentRoute.startsWith('/analysis') }">
            <router-link to="/analysis" class="nav-link">{{ $t('navAnalysis', '심층분석') }}</router-link>
          </li>
          <li :class="{ active: currentRoute.startsWith('/fortune') }">
            <router-link to="/fortune" class="nav-link">{{ $t('navFortune', '운세/재미') }}</router-link>
          </li>
        </ul>
      </nav>

      <!-- 우측 액션 버튼 및 햄버거 메뉴 -->
      <div class="header-right-actions">
        <!-- 다국어 선택기 -->
        <div class="header-lang-wrap">
          <v-icon size="16" class="lang-globe-icon">mdi-translate</v-icon>
          <select v-model="locale" aria-label="언어 선택" class="header-lang-select">
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        <!-- 다크 모드 토글 -->
        <button type="button" class="action-btn" @click="toggleTheme" title="테마 변경">
          <v-icon size="20">{{ currentTheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </button>

        <!-- 햄버거 메뉴 토글 버튼 -->
        <button type="button" class="hamburger-menu-btn" @click="$emit('toggle-drawer')" aria-label="메뉴 열기">
          <v-icon size="24">mdi-menu</v-icon>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppBar',
  emits: ['toggle-drawer'],
  setup() {
    const route = useRoute()
    const theme = useTheme()
    const { locale } = useI18n()

    watch(locale, (newLocale) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lottomate-locale', newLocale)
      }
    })

    const currentRoute = computed(() => route.path)
    const currentTheme = computed(() => theme.global.name.value)

    function toggleTheme() {
      const next = currentTheme.value === 'light' ? 'dark' : 'light'
      theme.global.name.value = next
      localStorage.setItem('darkMode', (next === 'dark').toString())
    }

    return {
      currentRoute,
      currentTheme,
      toggleTheme,
      locale
    }
  }
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #edf2ed;
  z-index: 1000;
  padding-top: env(safe-area-inset-top, 0px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.v-theme--dark .site-header {
  background: #1e293b;
  border-bottom: 1px solid #334155;
}

.header-inner {
  max-width: 1160px;
  margin: 0 auto;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-logo {
  font-size: 24px;
  font-weight: 800;
  color: #17653a;
  letter-spacing: -0.5px;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.v-theme--dark .site-logo {
  color: #22c55e;
}

.desktop-nav {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.15s ease;
}

.v-theme--dark .nav-link {
  color: #cbd5e1;
}

.nav-link:hover,
.nav-links li.active .nav-link {
  color: #17653a;
}

.v-theme--dark .nav-link:hover,
.v-theme--dark .nav-links li.active .nav-link {
  color: #22c55e;
}

.nav-icon {
  color: inherit;
}

.header-right-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-lang-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f8faf8;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 3px 8px;
  font-size: 13px;
  color: #334155;
  transition: all 0.2s;
}

.v-theme--dark .header-lang-wrap {
  background: #334155;
  border-color: #475569;
  color: #e2e8f0;
}

.lang-globe-icon {
  color: #17653a;
}

.v-theme--dark .lang-globe-icon {
  color: #22c55e;
}

.header-lang-select {
  border: none;
  background: transparent;
  outline: none;
  font-size: 12px;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
}

.action-btn,
.hamburger-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.v-theme--dark .action-btn,
.v-theme--dark .hamburger-menu-btn {
  color: #cbd5e1;
}

.action-btn:hover,
.hamburger-menu-btn:hover {
  background: #f1f5f2;
}

.v-theme--dark .action-btn:hover,
.v-theme--dark .hamburger-menu-btn:hover {
  background: #334155;
}

@media (max-width: 820px) {
  .desktop-nav {
    display: none;
  }
}
</style>
