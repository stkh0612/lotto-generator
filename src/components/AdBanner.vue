<!-- src/components/AdBanner.vue -->
<template>
  <div v-if="!isExcluded && AdClient && AdSlot && AdSlot !== 'YOUR_AD_SLOT_HERE'" class="ad-banner my-4 text-center">
    <ins
      class="adsbygoogle"
      style="display:block"
      :data-ad-client="AdClient"
      :data-ad-slot="AdSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 애드센스 정책 준수를 위해 실질적 콘텐츠가 없는 유틸리티/약관 페이지는 광고 게재 제외
const isExcluded = computed(() => {
  if (!route || !route.path) return false
  const p = route.path.toLowerCase()
  return p.startsWith('/saved') || p.startsWith('/privacy') || p.startsWith('/terms')
})

// 구글 애드센스 퍼블리셔 정보
const AdClient = "ca-pub-3971187501349159"
const AdSlot   = "YOUR_AD_SLOT_HERE" // 애드센스 대시보드에서 생성한 광고 단위 슬롯 ID를 넣어주세요.

onMounted(() => {
  if (!isExcluded.value && AdClient && AdSlot && AdSlot !== "YOUR_AD_SLOT_HERE") {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.warn('AdSense push failed', e)
    }
  }
})
</script>

<style scoped>
.ad-banner {
  margin-top: 24px;
  margin-bottom: 24px;
  min-height: 100px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
