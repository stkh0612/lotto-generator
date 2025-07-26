<!-- src/App.vue -->
<template>
  <v-app>
    <Sidebar v-model="drawer" />
    <v-main>
      <AppBar @toggle-drawer="drawer = !drawer" @show-info="onShowInfo" />
      <router-view />
    </v-main>
    <BottomNav />
    <!-- 언어 선택 드롭다운 -->
    <div style="position:fixed;right:16px;bottom:64px;z-index:999;">
      <select v-model="locale" style="padding:4px 8px;">
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  </v-app>
</template>

<script setup lang="ts">
// import { ref } from 'vue' (중복 제거)
import { ref, computed } from 'vue'
import Sidebar from './components/Sidebar.vue'
import AppBar from './components/AppBar.vue'

import BottomNav from './components/BottomNav.vue'
import { useI18n } from 'vue-i18n'

// 사이드바 열림/닫힘 상태
const drawer = ref(false)


// // i18n 훅 사용
const {locale } = useI18n()


// 정보 버튼 클릭 시 실행할 로직 (예: 다이얼로그 오픈)
function onShowInfo() {
  // TODO: 모달이나 토스트 열기
  console.log('앱 정보 표시!')

  // alert(t('info'))
}

</script>
