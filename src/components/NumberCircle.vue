<!-- src/components/NumberCircle.vue -->
<template>
  <div
    class="lotto-ball bounce-enter-active"
    :style="ballStyle"
  >
    <span class="number-text">{{ number }}</span>
    <div class="shine"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'NumberCircle',
  props: {
    number: { type: Number, required: true },
    size: { type: [Number, String], default: 56 },
  },
  setup(props) {
    const ballStyle = computed(() => {
      const raw = String(props.size).replace(/px/g, '')
      const s = `${raw}px`
      
      let bg = ''
      const n = props.number
      
      // Gradients for 3D look
      if (n <= 10) bg = 'radial-gradient(circle at 35% 35%, #FFD54F, #FF6F00)' // Yellow/Gold
      else if (n <= 20) bg = 'radial-gradient(circle at 35% 35%, #4FC3F7, #0277BD)' // Blue
      else if (n <= 30) bg = 'radial-gradient(circle at 35% 35%, #E57373, #C62828)' // Red
      else if (n <= 40) bg = 'radial-gradient(circle at 35% 35%, #E0E0E0, #616161)' // Grey
      else bg = 'radial-gradient(circle at 35% 35%, #81C784, #2E7D32)' // Green

      return {
        width: s,
        height: s,
        minWidth: s, // Force minimum width
        minHeight: s, // Force minimum height
        background: bg,
        fontSize: `calc(${parseInt(raw) / 2}px)`
      }
    })

    return { ballStyle }
  }
})
</script>

<style scoped>
.lotto-ball {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 
    inset -5px -5px 10px rgba(0,0,0,0.3),
    inset 2px 2px 5px rgba(255,255,255,0.4),
    3px 8px 10px rgba(0,0,0,0.25); /* Drop shadow */
  font-family: 'Jua', sans-serif;
  overflow: hidden;
  user-select: none;
  flex-shrink: 0; /* Prevent squeezing in flex containers */
}

.number-text {
  color: #fff;
  z-index: 2;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
}

/* High-spec Shine effect */
.shine {
  position: absolute;
  top: 5%;
  left: 10%;
  width: 25%;
  height: 15%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
  transform: rotate(-45deg);
  z-index: 1;
}
</style>
