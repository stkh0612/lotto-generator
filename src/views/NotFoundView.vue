<!-- src/views/NotFoundView.vue -->
<template>
  <v-container fluid class="not-found-view py-12">
    <div class="subpage-container text-center">
      <div class="clean-card pa-8 pa-sm-12 mx-auto" style="max-width: 540px;">
        <div class="status-badge mb-4">
          <v-icon size="16" class="mr-1" color="error">mdi-alert-circle-outline</v-icon>
          404 Not Found
        </div>

        <h1 class="text-h5 font-weight-bold text-grey-darken-4 mb-3">
          페이지를 찾을 수 없습니다
        </h1>

        <p class="text-body-1 text-grey mb-8" style="line-height: 1.6;">
          요청하신 페이지가 삭제되었거나 잘못된 주소로 접속하셨습니다.<br />
          아래 버튼을 눌러 홈으로 이동해 주세요.
        </p>

        <div class="d-flex flex-column" style="gap: 12px;">
          <v-btn
            color="primary"
            size="large"
            rounded="lg"
            to="/"
            elevation="0"
          >
            <v-icon start icon="mdi-home" />
            홈으로 돌아가기
          </v-btn>

          <v-btn
            variant="tonal"
            color="primary"
            size="large"
            rounded="lg"
            to="/results"
          >
            <v-icon start icon="mdi-format-list-numbered" />
            최신 당첨 번호 조회
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '페이지를 찾을 수 없습니다 (404 Not Found) · 로또메이트'
  let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'robots')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', 'noindex, follow')
})
</script>

<style scoped>
.not-found-view {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.subpage-container {
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
}

.clean-card {
  background: #ffffff;
  border: 1px solid #eef2ef;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

.v-theme--dark .clean-card {
  background: #1e293b;
  border-color: #334155;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  background: #fee2e2;
  color: #b91c1c;
  font-weight: 700;
  font-size: 13px;
  padding: 4px 14px;
  border-radius: 20px;
}

.v-theme--dark .status-badge {
  background: #7f1d1d;
  color: #fca5a5;
}
</style>
