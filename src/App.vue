<template>
  <v-app>
    <Sidebar v-model="drawer" />
    <AppBar @toggle-drawer="drawer = !drawer" />
    <v-main class="app-main-content">
      <router-view />
      <AppFooter />
    </v-main>
    <PwaInstallPrompt />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import AppBar from './components/AppBar.vue'
import AppFooter from './components/AppFooter.vue'
import PwaInstallPrompt from './components/PwaInstallPrompt.vue'

const drawer = ref(false)
</script>

<style scoped>
.app-main-content {
  padding-top: calc(64px + env(safe-area-inset-top, 0px)) !important;
  padding-bottom: 0 !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
