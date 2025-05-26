<!-- src/components/AppBar.vue -->
<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-toolbar-title>LottoMate</v-toolbar-title>
    <v-spacer />

    <!-- 다크 모드 토글 -->
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ currentTheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-btn icon @click="$emit('show-info')">
      <v-icon>mdi-information</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useTheme } from 'vuetify'

export default defineComponent({
  name: 'AppBar',
  setup() {
    const theme = useTheme()
    // 현재 테마 이름(light/dark)
    const currentTheme = computed(() => theme.global.name.value)

    function toggleTheme() {
      const next = currentTheme.value === 'light' ? 'dark' : 'light'
      theme.global.name.value = next
      // 변경된 모드를 로컬스토리지에 저장
      localStorage.setItem('darkMode', (next === 'dark').toString())
    }

    return { currentTheme, toggleTheme }
  },
})
</script>
