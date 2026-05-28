<!-- src/components/AdBanner.vue -->
<template>
  <div v-if="AdClient && AdSlot && AdSlot !== 'YOUR_AD_SLOT_HERE'" class="ad-banner my-4 text-center">
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
import { onMounted } from 'vue'

// 구글 애드센스 퍼블리셔 정보
const AdClient = "ca-pub-3971187501349159"
const AdSlot   = "YOUR_AD_SLOT_HERE" // 애드센스 대시보드에서 생성한 광고 단위 슬롯 ID를 넣어주세요.

onMounted(() => {
  if (AdClient && AdSlot && AdSlot !== "YOUR_AD_SLOT_HERE") {
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
