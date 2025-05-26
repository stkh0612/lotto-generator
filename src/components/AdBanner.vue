<!-- src/components/AdBanner.vue -->
<template>
  <v-sheet
    class="ad-banner d-flex align-center justify-center"
    height="150"
    elevation="1"
  >
    <!-- 실제 광고가 들어올 자리 -->
    <slot>
      <span class="text--secondary"></span>
    </slot>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdBanner'
})
</script>

<style scoped>
.ad-banner {
  background-color: #fafafa; /* 연한 회색 배경 */
  border-radius: 4px;
  margin: 0 16px;            /* 좌우 여백 */
}
</style>
