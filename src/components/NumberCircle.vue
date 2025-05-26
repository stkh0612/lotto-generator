<!-- src/components/NumberCircle.vue -->
<template>
  <v-avatar
    :size="size"
    :color="circleColor"
    class="d-flex align-center justify-center"
  >
    <span class="number-text">{{ number }}</span>
  </v-avatar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'NumberCircle',
  props: {
    /** 표시할 로또 숫자 */
    number: {
      type: Number,
      required: true,
    },
    /** 원(circle)의 지름(px) */
    size: {
      type: [Number, String],
      default: 56,
    },
  },
  setup(props) {
    const circleColor = computed<string>(() => {
      const n = props.number
      if (n <= 10) return 'yellow-darken-2'      // 1~10: 노란색
      if (n <= 20) return 'light-blue-darken-2'  // 11~20: 하늘색
      if (n <= 30) return 'red-darken-2'         // 21~30: 빨간색
      if (n <= 40) return 'grey-darken-1'        // 31~40: 회색
      return 'green-darken-2'                    // 41~45: 초록색
    })

    return { circleColor }
  }
})
</script>

<style scoped>
.number-text {
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
}
</style>
