<!-- src/components/BottomNav.vue -->
<template>
  <v-bottom-navigation
    v-model="active"
    app
    height="56"
    class="bottom-nav"
  >
    <v-btn
      value="Home"
      :to="{ name: 'Home' }"
      replace
    >
      <span class="d-flex flex-column align-center">
        <v-icon>mdi-home</v-icon>
        <span class="caption">{{ t('navHome') }}</span>
      </span>
    </v-btn>

    <v-btn
      value="Saved"
      :to="{ name: 'Saved' }"
      replace
    >
      <span class="d-flex flex-column align-center">
        <v-icon>mdi-content-save</v-icon>
        <span class="caption">{{ t('navSaved') }}</span>
      </span>
    </v-btn>

    <v-btn
      value="Compare"
      :to="{ name: 'Compare' }"
      replace
    >
      <span class="d-flex flex-column align-center">
        <v-icon>mdi-magnify</v-icon>
        <span class="caption">{{ t('navCompare') }}</span>
      </span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// ...existing code...
const { t } = useI18n()
import { useRoute, useRouter } from 'vue-router'

// 현재 라우트 & 라우터 인스턴스 가져오기
const route = useRoute()
const router = useRouter()

// active 값 초기화: route.name 과 일치시켜야 선택 상태가 맞아집니다
const active = ref<string>(route.name as string || 'Home')

// 라우트가 바뀌면 active도 동기화
watch(
  () => route.name,
  (name) => {
    if (name) active.value = name as string
  }
)

// active가 바뀌면 해당 라우트로 이동
watch(active, (val) => {
  if (val && val !== route.name) {
    router.push({ name: val })
  }
})
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
.caption {
  font-size: 0.75rem;
}
</style>
