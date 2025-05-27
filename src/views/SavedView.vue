<!-- src/views/SavedView.vue -->
<template>
  <v-container fluid class="saved-container py-6">
    <div ref="exportContainer" class="export-area">
        <v-sheet
          class="mx-auto pa-6"
          max-width="600"
          elevation="1"
          rounded
          color="surface"
        >
        <div class="text-h5 font-weight-bold mb-3">저장된 번호</div>

        <!-- 저장된 번호가 있을 때 -->
        
        <div v-if="savedNumbers.length > 0">
         <div
           v-for="(entry, idx) in savedNumbers"
           :key="idx"
           class="mb-1"
         >
           <v-sheet
             class="pa-4"
             elevation="0"
             rounded
             color="background"
           >
             <!-- ① 번호만 한 줄 flex -->
             <div class="d-flex flex-nowrap justify-center" style="gap: 8px;">
               <NumberCircle
                 v-for="n in entry.numbers"
                 :key="n"
                 :number="n"
                 size="40"
               />
             </div>
             <!-- ② 날짜는 새로운 줄로 -->
             <div class="grey--text text-caption mt-2 text-center">
               {{ formatDate(entry.date) }}
             </div>
           </v-sheet>
         </div>
       </div>

        <!-- 저장된 번호가 없을 때 -->
        <div v-else class="text-center grey--text">
            저장된 번호가 없습니다.
        </div>
        </v-sheet>
    </div>
    <!-- 내보내기 버튼 -->
    <v-row justify="center" class="mt-6">
      <v-btn color="primary" @click="exportAsImage('png')">
        PNG로 저장
      </v-btn>
      <!-- <v-btn color="secondary" class="ml-4" @click="exportAsImage('jpeg')">JPG로 저장</v-btn> -->
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import html2canvas from 'html2canvas'
import NumberCircle from '../components/NumberCircle.vue'
import { useLottoStore, LottoEntry } from '../store'

const lottoStore = useLottoStore()
// 페이지 진입할 때 로컬스토리지에서 불러오기
onMounted(() => {
  lottoStore.load()
})

const savedNumbers = computed(() => lottoStore.savedNumbers as LottoEntry[])
console.log("savedNumbers>>>>", savedNumbers.value.length, savedNumbers.value);

function formatDate(iso: string): string {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${y}.${m}.${day} ${h}:${mi}`
}

// 캡처 대상 컨테이너
const exportContainer = ref<HTMLElement>()

/**
 * 화면을 캡처해서 image/png 또는 image/jpeg로 다운로드
 * @param format 'png' | 'jpeg'
 */
async function exportAsImage(format: 'png' | 'jpeg') {
  if (!exportContainer.value) return
  // html2canvas 옵션: 배경 흰색으로 고정
  const canvas = await html2canvas(exportContainer.value, {
    backgroundColor: '#fff',
    scale: 2
  })
  const mime = format === 'png' ? 'image/png' : 'image/jpeg'
  const ext = format === 'png' ? 'png' : 'jpg'
  const dataUrl = canvas.toDataURL(mime, format === 'jpeg' ? 0.9 : undefined)

  // 다운로드 링크 생성
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `saved_lotto.${ext}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.saved-container {
  background-color: var(--v-theme-background);
  /* min-height: calc(100vh - 64px); */
}
.pa-6 {
  padding: 24px !important;
}
</style>
