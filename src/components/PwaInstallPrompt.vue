<!-- src/components/PwaInstallPrompt.vue -->
<template>
  <div v-if="showPrompt" class="pwa-install-banner-wrapper">
    <v-card class="pwa-banner-card pa-4 elevation-6 rounded-xl">
      <div class="d-flex align-center justify-space-between flex-wrap" style="gap: 12px;">
        <!-- 아이콘 & 설명 -->
        <div class="d-flex align-center" style="gap: 12px;">
          <v-avatar size="44" color="transparent" class="elevation-1">
            <v-img src="/apple-touch-icon.png" alt="LottoMate App Icon" />
          </v-avatar>
          <div class="text-left">
            <div class="text-subtitle-2 font-weight-bold text-primary">
              📲 로또메이트를 홈 화면에 추가하세요
            </div>
            <div class="text-caption text-grey-darken-1">
              앱처럼 빠르고 간편하게 매주 행운 번호를 확인하세요!
            </div>
          </div>
        </div>

        <!-- 액션 버튼 -->
        <div class="d-flex align-center" style="gap: 8px;">
          <v-btn
            color="primary"
            class="btn-premium font-weight-bold"
            size="small"
            @click="handleInstallClick"
            prepend-icon="mdi-download"
          >
            앱 설치하기
          </v-btn>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            color="grey"
            @click="dismissPrompt"
          />
        </div>
      </div>
    </v-card>

    <!-- iOS 사파리 전용 설치 안내 모달 -->
    <v-dialog v-model="showIosModal" max-width="400">
      <v-card class="pa-5 rounded-xl text-center">
        <v-icon color="primary" size="48" class="mb-3">mdi-apple</v-icon>
        <div class="text-h6 font-weight-bold mb-2">홈 화면에 추가하기</div>
        <p class="text-body-2 text-grey-darken-1 mb-4" style="line-height: 1.6;">
          사파리(Safari) 브라우저 하단의 <strong>공유 버튼</strong>(<v-icon size="small">mdi-export-variant</v-icon>)을 누른 후, <strong>[홈 화면에 추가]</strong>를 선택하시면 앱으로 설치됩니다.
        </p>
        <v-btn color="primary" block @click="showIosModal = false">
          확인했습니다
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showPrompt = ref(false)
const showIosModal = ref(false)
let deferredPrompt: any = null

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

const isStandalone = () => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  )
}

onMounted(() => {
  // 이미 PWA로 실행 중이거나 최근 7일 내 닫은 경우 표시 안 함
  if (typeof window === 'undefined' || isStandalone()) return

  const dismissedTime = localStorage.getItem('lottomate-pwa-dismissed')
  if (dismissedTime) {
    const passedDays = (Date.now() - Number(dismissedTime)) / (1000 * 60 * 60 * 24)
    if (passedDays < 7) return
  }

  // 안드로이드 / 크롬 beforeinstallprompt 이벤트 감지
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt = e
    showPrompt.value = true
  })

  // iOS Safari의 경우 2초 후 배너 표시
  if (isIos() && !isStandalone()) {
    setTimeout(() => {
      showPrompt.value = true
    }, 2000)
  }
})

async function handleInstallClick() {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      showPrompt.value = false
    }
    deferredPrompt = null
  } else if (isIos()) {
    showIosModal.value = true
  } else {
    // 일반 데스크톱/브라우저
    alert('브라우저 주소창 우측의 [설치] 또는 바로가기 추가 버튼을 클릭해 주세요!')
  }
}

function dismissPrompt() {
  showPrompt.value = false
  localStorage.setItem('lottomate-pwa-dismissed', Date.now().toString())
}
</script>

<style scoped>
.pwa-install-banner-wrapper {
  position: fixed;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  max-width: 600px;
  z-index: 1000;
  animation: slideUp 0.4s ease-out;
}

.pwa-banner-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(124, 77, 255, 0.2);
}

.v-theme--dark .pwa-banner-card {
  background: rgba(26, 11, 46, 0.95) !important;
  border: 1px solid rgba(124, 77, 255, 0.3);
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}
</style>
