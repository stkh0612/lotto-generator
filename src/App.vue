<template>
  <v-app>
    <Sidebar v-model="drawer" />
    <AppBar @toggle-drawer="drawer = !drawer" @show-info="onShowInfo" />
    <v-main class="app-main-content">
      <router-view />
      <AppFooter />
    </v-main>
    <BottomNav />
    <PwaInstallPrompt />
    <div class="locale-switcher">
      <select v-model="locale" aria-label="Select language">
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Sidebar from './components/Sidebar.vue'
import AppBar from './components/AppBar.vue'
import BottomNav from './components/BottomNav.vue'
import AppFooter from './components/AppFooter.vue'
import PwaInstallPrompt from './components/PwaInstallPrompt.vue'
import { useI18n } from 'vue-i18n'

const drawer = ref(false)
const { locale } = useI18n()

watch(locale, (newLocale) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lottomate-locale', newLocale)
  }
})

function onShowInfo() {
  // TODO: connect to modal when the information panel is ready
  console.log('info requested')
}
</script>

<style scoped>
.app-main-content {
  padding-top: calc(72px + env(safe-area-inset-top, 0px)) !important;
  padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px)) !important;
}

.locale-switcher {
  position: fixed;
  right: 16px;
  bottom: 64px;
  z-index: 999;
}

.locale-switcher select {
  padding: 4px 8px;
}
</style>
