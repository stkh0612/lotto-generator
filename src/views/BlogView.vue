<!-- src/views/BlogView.vue -->
<template>
  <v-container fluid class="blog-view py-6">
    <div class="subpage-container">
      
      <!-- 상단 서브 히어로 배너 -->
      <div class="subpage-hero mb-8 text-center">
        <div class="subpage-badge">
          <v-icon size="14" class="mr-1">mdi-book-open-page-variant</v-icon>
          로또 정보 블로그
        </div>
        <h1 class="subpage-title">로또메이트 지식 포털</h1>
        <p class="subpage-subtitle">
          로또 당첨 확률의 수학적 분석부터 세금 계산법, 수령 가이드까지 신뢰할 수 있는 전문 지식을 공유합니다.
        </p>
      </div>

      <div class="blog-list">
        <v-card
          v-for="post in posts"
          :key="post.id"
          class="mb-6 pa-6 clean-card blog-card"
          hover
          :to="`/blog/${post.id}`"
        >
          <div class="d-flex justify-space-between align-start flex-wrap mb-2">
            <h2 class="text-h6 font-weight-bold post-title mb-1">
              {{ post.title }}
            </h2>
            <span class="text-caption text-grey text-no-wrap ml-sm-4">
              {{ formatDate(post.date) }}
            </span>
          </div>

          <p class="text-body-2 text-grey-darken-1 mb-4" style="line-height: 1.6;">
            {{ post.summary }}
          </p>

          <div class="d-flex justify-space-between align-center">
            <span class="text-caption text-grey">작성자: {{ post.author }}</span>
            <span class="read-more-link">
              자세히 보기
              <v-icon size="16" class="ml-1">mdi-arrow-right</v-icon>
            </span>
          </div>
        </v-card>
      </div>

      <div class="mt-8 pa-4 disclaimer-box text-center text-caption text-grey-darken-1">
        본 블로그에서 제공하는 정보는 단순 정보 제공 및 참고용이며, 공식 수령 절차나 세율 등은 관련 기관(동행복권, 농협은행 등)의 최신 정책을 반드시 재확인하시기 바랍니다.
      </div>

    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import blogData from '../assets/blog_posts.json'

interface BlogPost {
  id: number
  slug: string
  title: string
  date: string
  summary: string
  author: string
}

const posts = ref<BlogPost[]>(blogData)

function formatDate(iso: string) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}년 ${m}월 ${day}일`
}
</script>

<style scoped>
.blog-view {
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
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.v-theme--dark .clean-card {
  background: #1e293b;
  border-color: #334155;
}

.blog-card {
  transition: all 0.2s ease;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-2px);
  border-color: #10b981 !important;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.12) !important;
}

.post-title {
  color: #111827;
  transition: color 0.2s;
}

.v-theme--dark .post-title {
  color: #f1f5f9;
}

.blog-card:hover .post-title {
  color: #17653a;
}

.v-theme--dark .blog-card:hover .post-title {
  color: #6ee7b7;
}

.read-more-link {
  font-size: 14px;
  font-weight: 700;
  color: #17653a;
  display: inline-flex;
  align-items: center;
}

.v-theme--dark .read-more-link {
  color: #6ee7b7;
}

.disclaimer-box {
  background: #f8faf8;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  line-height: 1.6;
}

.v-theme--dark .disclaimer-box {
  background: #0f172a;
  border-color: #334155;
  color: #94a3b8;
}

@media (max-width: 600px) {
  .subpage-title {
    font-size: 24px;
  }
}
</style>
