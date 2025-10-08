<template>
  <v-app>
    <Sidebar v-model="drawer" />
    <v-main>
      <AppBar @toggle-drawer="drawer = !drawer" @show-info="onShowInfo" />
      <router-view />
    </v-main>
    <BottomNav />
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
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import AppBar from './components/AppBar.vue'
import BottomNav from './components/BottomNav.vue'
import { useI18n } from 'vue-i18n'

const drawer = ref(false)
const { locale } = useI18n()

function onShowInfo() {
  // TODO: connect to modal when the information panel is ready
  console.log('info requested')
}
</script>

<style scoped>
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
