<!-- src/components/ShareModal.vue -->
<template>
  <v-dialog v-model="visible" max-width="480">
    <v-card class="pa-5 rounded-xl">
      <!-- 헤더 -->
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="text-h6 font-weight-bold text-primary d-flex align-center">
          <v-icon start color="secondary" class="mr-2">mdi-share-variant</v-icon>
          행운 공유하기
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" @click="close" />
      </div>

      <!-- 미리보기 카드 -->
      <v-card variant="tonal" color="primary" class="pa-4 mb-5 rounded-lg text-left">
        <div class="text-subtitle-2 font-weight-bold mb-2">{{ title }}</div>
        <div class="text-body-2 text-grey-darken-2" style="white-space: pre-line; line-height: 1.6;">
          {{ text }}
        </div>
      </v-card>

      <!-- 공유 액션 버튼들 -->
      <div class="d-flex flex-column" style="gap: 10px;">
        <!-- 1) 카카오톡 / 모바일 앱 전체 공유 -->
        <v-btn
          color="#FEE500"
          class="font-weight-bold text-grey-darken-4"
          size="large"
          prepend-icon="mdi-chat"
          @click="handleKakaoOrNativeShare"
          style="border-radius: 8px;"
        >
          카카오톡 / SNS로 공유하기
        </v-btn>

        <!-- 2) 텍스트 및 링크 복사 -->
        <v-btn
          variant="outlined"
          color="primary"
          size="large"
          prepend-icon="mdi-content-copy"
          @click="handleCopy"
          style="border-radius: 8px;"
        >
          내용 및 링크 복사하기
        </v-btn>
      </div>

      <!-- 토스트 스낵바 -->
      <v-snackbar v-model="snackbar" :timeout="2500" location="bottom" color="success">
        {{ snackbarMessage }}
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { shareContent } from '../utils/ShareHelper'

const props = defineProps<{
  modelValue: boolean
  title: string
  text: string
  url?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const snackbar = ref(false)
const snackbarMessage = ref('')

function close() {
  visible.value = false
}

async function handleKakaoOrNativeShare() {
  const shareUrl = props.url || window.location.href
  const isNative = await shareContent(props.title, props.text, shareUrl)
  if (!isNative) {
    snackbarMessage.value = '클립보드에 내용이 복사되었습니다. 친구에게 붙여넣기(Ctrl+V)하세요!'
    snackbar.value = true
  } else {
    close()
  }
}

async function handleCopy() {
  const shareUrl = props.url || window.location.href
  const fullText = `${props.title}\n\n${props.text}\n\n👉 바로가기: ${shareUrl}`
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullText)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = fullText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    snackbarMessage.value = '클립보드에 복사되었습니다! 원하는 곳에 붙여넣으세요.'
    snackbar.value = true
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
</style>
