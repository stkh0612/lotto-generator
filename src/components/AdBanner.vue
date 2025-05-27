<!-- src/components/AdBanner.vue -->
<template>
  <div class="ad-banner my-4 text-center">
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

const AdClient = import.meta.env.VITE_AD_CLIENT
const AdSlot   = import.meta.env.VITE_AD_SLOT

onMounted(() => {
  // 삽입된 <ins> 태그들을 Google에 알려줍니다.
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    // console.warn(e)
  }
})

</script>

<style scoped>
.ad-banner {
  /* 원하는 높이·여백 조절 */
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
