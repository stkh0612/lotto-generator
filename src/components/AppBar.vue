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

    <!-- 인포 버튼 -->
    <v-btn icon @click="infoDialog = true">
      <v-icon>mdi-information</v-icon>
    </v-btn>

    <!-- 이메일 레이어 팝업 -->
    <v-dialog
      v-model="infoDialog"
      max-width="400"
      scrollable
    >
      <v-card>
        <v-card-title class="headline">문의 및 피드백</v-card-title>
        <v-card-text>
          언제든 편하게 메일 보내주세요:<br>
          <a :href="`mailto:${email}`">{{ email }}</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="infoDialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useTheme } from 'vuetify'
import { ref } from 'vue'



export default defineComponent({
  name: 'AppBar',
  setup() {
    const infoDialog = ref(false)
    // 실제 사용하실 이메일 주소로 교체하세요
    const email = 'superman612@outlook.com'
    const theme = useTheme()
    // 현재 테마 이름(light/dark)
    const currentTheme = computed(() => theme.global.name.value)

    function toggleTheme() {
      const next = currentTheme.value === 'light' ? 'dark' : 'light'
      theme.global.name.value = next
      // 변경된 모드를 로컬스토리지에 저장
      localStorage.setItem('darkMode', (next === 'dark').toString())
    }

    return { currentTheme, toggleTheme, infoDialog, email}
  },
})
</script>
