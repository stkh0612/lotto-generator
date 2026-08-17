<!-- src/views/BlogView.vue -->
<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="820" elevation="1" rounded>
      <div class="d-flex align-center mb-6">
        <v-icon start icon="mdi-book-open-page-variant" class="text-primary mr-2" size="32" />
        <h1 class="text-h4 font-weight-bold text-primary mb-0">로또메이트 정보 블로그</h1>
      </div>
      
      <p class="text-subtitle-1 text-grey mb-8">
        로또 당첨 확률의 수학적 분석부터 세금 계산법, 수령 가이드까지 로또에 대한 유익하고 신뢰할 수 있는 정보를 공유합니다.
      </p>

      <v-divider class="mb-8" />

      <div class="blog-list">
        <v-card
          v-for="post in posts"
          :key="post.id"
          class="mb-6 pa-4 blog-card"
          outlined
          hover
          :to="`/blog/${post.id}`"
        >
          <div class="d-flex justify-space-between align-start flex-wrap mb-2">
            <h2 class="text-h6 font-weight-bold text-primary mb-1">
              {{ post.title }}
            </h2>
            <span class="text-caption text-grey text-no-wrap ml-sm-4">
              {{ formatDate(post.date) }}
            </span>
          </div>

          <p class="text-body-2 text-grey-darken-2 mb-4" style="line-height: 1.6;">
            {{ post.summary }}
          </p>

          <div class="d-flex justify-space-between align-center">
            <span class="text-caption text-grey">작성자: {{ post.author }}</span>
            <v-btn
              variant="text"
              color="primary"
              density="compact"
              append-icon="mdi-arrow-right"
              class="font-weight-bold"
            >
              자세히 보기
            </v-btn>
          </div>
        </v-card>
      </div>

      <div class="mt-8 pa-4 bg-grey-lighten-4 rounded text-center text-caption text-grey">
        본 블로그에서 제공하는 정보는 단순 정보 제공 및 참고용이며, 공식 수령 절차나 세율 등은 관련 기관(동행복권, 농협은행 등)의 최신 정책을 반드시 재확인하시기 바랍니다.
      </div>
    </v-sheet>
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
.blog-card {
  transition: transform 0.2s, border-color 0.2s;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(124, 77, 255, 0.15) !important;
  border-radius: 8px;
}

.v-theme--light .blog-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.blog-card:hover {
  transform: translateY(-2px);
  border-color: #7c4dff !important;
  box-shadow: 0 4px 12px rgba(124, 77, 255, 0.1) !important;
}
</style>
