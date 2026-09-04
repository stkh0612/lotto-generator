<!-- src/views/SavedView.vue -->
<template>
  <v-container fluid class="saved-view py-6 google-anno-skip">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-content-save</v-icon>
          나의 보관함
        </div>
        <h1 class="subpage-title">저장된 행운 번호</h1>
        <p class="subpage-subtitle">
          내가 직접 생성하거나 보관한 번호 목록입니다. 이미지로 저장하여 복권 구매 시 편리하게 활용하세요.
        </p>
      </div>

      <div class="clean-card pa-6 pa-sm-8 mb-8">
        <div ref="exportContainer" class="export-area pa-2">
          <div class="d-flex justify-space-between align-center mb-6">
            <h2 class="card-inner-title mb-0">보관된 로또 번호 (최대 5게임)</h2>
            <v-chip size="small" color="primary" class="font-weight-bold">
              {{ savedNumbers.length }} / 5 게임
            </v-chip>
          </div>

          <!-- 저장된 번호가 있을 때 -->
          <div v-if="savedNumbers.length > 0" class="saved-list">
            <div
              v-for="(entry, idx) in savedNumbers"
              :key="idx"
              class="saved-item-box pa-4 mb-3 d-flex flex-column flex-sm-row justify-space-between align-center"
            >
              <!-- 게임 라벨 & 번호 -->
              <div class="d-flex align-center flex-wrap justify-center mb-2 mb-sm-0" style="gap: 12px;">
                <span class="game-tag">{{ String.fromCharCode(65 + idx) }}</span>
                <div class="d-flex flex-nowrap" style="gap: 6px;">
                  <NumberCircle
                    v-for="n in entry.numbers"
                    :key="n"
                    :number="n"
                    :size="40"
                  />
                </div>
              </div>

              <!-- 날짜 및 삭제 버튼 -->
              <div class="d-flex align-center" style="gap: 10px;">
                <span class="save-date">{{ formatDate(entry.date) }}</span>
                <v-btn
                  icon="mdi-trash-can-outline"
                  variant="text"
                  size="small"
                  color="grey"
                  @click="removeNumber(idx)"
                  title="삭제"
                />
              </div>
            </div>
          </div>

          <!-- 저장된 번호가 없을 때 -->
          <div v-else class="empty-state text-center py-12">
            <v-icon size="56" color="grey-lighten-1" class="mb-3">mdi-inbox-outline</v-icon>
            <p class="text-body-1 font-weight-bold text-grey-darken-1 mb-1">저장된 번호가 없습니다.</p>
            <p class="text-caption text-grey mb-4">메인 홈이나 시뮬레이션에서 마음에 드는 번호를 보관해 보세요.</p>
            <v-btn color="primary" to="/" rounded="lg">번호 추천받으러 가기</v-btn>
          </div>
        </div>

        <!-- 내보내기 버튼 -->
        <div v-if="savedNumbers.length > 0" class="d-flex justify-center mt-6">
          <button type="button" class="btn-action-primary px-6 py-3" @click="exportAsImage('png')">
            <v-icon size="18" class="mr-2">mdi-download</v-icon>
            PNG 이미지로 저장하기
          </button>
        </div>
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import html2canvas from 'html2canvas'
import NumberCircle from '../components/NumberCircle.vue'
import { useLottoStore, LottoEntry } from '../store'

const lottoStore = useLottoStore()

onMounted(() => {
  lottoStore.load()
})

const savedNumbers = computed(() => lottoStore.savedNumbers as LottoEntry[])

function removeNumber(idx: number) {
  lottoStore.remove(idx)
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${y}.${m}.${day} ${h}:${mi}`
}

const exportContainer = ref<HTMLElement>()

async function exportAsImage(format: 'png' | 'jpeg') {
  if (!exportContainer.value) return
  const canvas = await html2canvas(exportContainer.value, {
    backgroundColor: '#ffffff',
    scale: 2
  })
  const mime = format === 'png' ? 'image/png' : 'image/jpeg'
  const ext = format === 'png' ? 'png' : 'jpg'
  const dataUrl = canvas.toDataURL(mime, format === 'jpeg' ? 0.9 : undefined)

  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `lottomate_saved_${Date.now()}.${ext}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.saved-view {
  min-height: calc(100vh - 64px);
}

.subpage-container {
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
}

.subpage-hero {
  padding: 10px 0 0;
}

.subpage-badge {
  display: inline-flex;
  align-items: center;
  background: #e8f5e9;
  color: #17653a;
  font-weight: 700;
  font-size: 13px;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.v-theme--dark .subpage-badge {
  background: #064e3b;
  color: #6ee7b7;
}

.subpage-title {
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.6px;
  margin-bottom: 8px;
}

.v-theme--dark .subpage-title {
  color: #f1f5f9;
}

.subpage-subtitle {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}

.v-theme--dark .subpage-subtitle {
  color: #94a3b8;
}

.clean-card {
  background: #ffffff;
  border: 1px solid #eef2ef;
  border-radius: 22px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.v-theme--dark .clean-card {
  background: #1e293b;
  border-color: #334155;
}

.card-inner-title {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
}

.v-theme--dark .card-inner-title {
  color: #f1f5f9;
}

.saved-item-box {
  background: #f8faf8;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
}

.v-theme--dark .saved-item-box {
  background: #0f172a;
  border-color: #334155;
}

.game-tag {
  font-size: 16px;
  font-weight: 800;
  color: #17653a;
  background: #e8f5e9;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.v-theme--dark .game-tag {
  background: #064e3b;
  color: #6ee7b7;
}

.save-date {
  font-size: 13px;
  color: #8b95a1;
}

.btn-action-primary {
  background: #17653a;
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(23, 101, 58, 0.2);
  transition: all 0.2s;
}

.btn-action-primary:hover {
  background: #12532f;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
}
</style>

