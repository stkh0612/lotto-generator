<!-- src/App.vue -->
<template>
  <v-app>
    <Sidebar v-model="drawer" />
    <v-main>
      <AppBar @toggle-drawer="drawer = !drawer" @show-info="onShowInfo" />
      <router-view />
    </v-main>
    <BottomNav />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import AppBar from './components/AppBar.vue'

import BottomNav from './components/BottomNav.vue'

// 사이드바 열림/닫힘 상태
const drawer = ref(false)

// 정보 버튼 클릭 시 실행할 로직 (예: 다이얼로그 오픈)
function onShowInfo() {
  // TODO: 모달이나 토스트 열기
  console.log('앱 정보 표시!')
}
</script>
