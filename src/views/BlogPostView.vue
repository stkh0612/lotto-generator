<!-- src/views/BlogPostView.vue -->
<template>
  <v-container fluid class="blog-post-view py-6">
    <div class="subpage-container">
      <div v-if="post" class="clean-card pa-6 pa-sm-10">
        <!-- 네비게이션 브레드크럼 -->
        <router-link to="/blog" class="back-link mb-6 d-inline-flex align-center">
          <v-icon size="18" class="mr-1">mdi-arrow-left</v-icon>
          블로그 목록으로 돌아가기
        </router-link>

        <h1 class="post-detail-title mb-4">{{ post.title }}</h1>
        
        <div class="d-flex justify-space-between align-center mb-6 flex-wrap post-meta">
          <span>작성일: {{ formatDate(post.date) }}</span>
          <span>작성자: {{ post.author }}</span>
        </div>

        <v-divider class="mb-8" />

        <!-- 블로그 본문 (Markdown 파싱 렌더링) -->
        <div class="blog-content">
          <template v-for="(block, idx) in renderedBlocks" :key="idx">
            <div v-html="block"></div>
          </template>
        </div>

        <!-- 필자 정보 (E-E-A-T 강화) -->
        <div class="author-card mt-10 pa-5 rounded-xl d-flex align-center">
          <v-avatar size="56" color="primary" class="mr-4">
            <v-icon icon="mdi-account-tie" color="white" size="32" />
          </v-avatar>
          <div class="text-left">
            <div class="text-subtitle-1 font-weight-bold text-primary">{{ post.author }}</div>
            <div class="text-caption text-grey-darken-1" style="line-height: 1.6;">
              로또메이트 전문 분석 필진으로, 복권 확률 모델 연구, 세무/금융 가이드 작성 및 건전한 게임 이용에 관한 전문 정보를 제공합니다.
            </div>
          </div>
        </div>

        <v-divider class="my-8" />

        <!-- 꼬리말 및 다른 글 안내 -->
        <div class="d-flex justify-space-between align-center flex-wrap" style="gap: 12px;">
          <v-btn
            v-if="prevPost"
            variant="outlined"
            size="small"
            color="primary"
            rounded="lg"
            :to="`/blog/${prevPost.id}`"
            prepend-icon="mdi-chevron-left"
          >
            이전 글: {{ prevPost.title }}
          </v-btn>
          <v-spacer v-else />

          <v-btn
            v-if="nextPost"
            variant="outlined"
            size="small"
            color="primary"
            rounded="lg"
            :to="`/blog/${nextPost.id}`"
            append-icon="mdi-chevron-right"
          >
            다음 글: {{ nextPost.title }}
          </v-btn>
        </div>
      </div>
      <div v-else class="clean-card text-center py-12 pa-6">
        <v-icon icon="mdi-alert-circle-outline" size="64" color="grey" class="mb-4" />
        <h2 class="text-h6 mb-4">해당 블로그 기사를 찾을 수 없습니다.</h2>
        <v-btn color="primary" to="/blog" rounded="lg">블로그 목록으로 이동</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import blogData from '../assets/blog_posts.json'

interface BlogPost {
  id: number
  slug: string
  title: string
  date: string
  summary: string
  author: string
  content: string
}

const posts = blogData as BlogPost[]
const route = useRoute()

// 현재 기사 조회
const post = computed(() => {
  const idParam = Number(route.params.id)
  return posts.find(p => p.id === idParam)
})

// 이전 글 / 다음 글 계산
const currentIndex = computed(() => {
  if (!post.value) return -1
  return posts.findIndex(p => p.id === post.value!.id)
})

const prevPost = computed(() => {
  const idx = currentIndex.value
  if (idx > 0) return posts[idx - 1]
  return null
})

const nextPost = computed(() => {
  const idx = currentIndex.value
  if (idx !== -1 && idx < posts.length - 1) return posts[idx + 1]
  return null
})

// Markdown Parser Helper
const renderedBlocks = computed(() => {
  if (!post.value) return []
  return renderMarkdown(post.value.content)
})

function renderMarkdown(content: string): string[] {
  const blocks = content.split('\n\n')
  return blocks.map(block => {
    block = block.trim()
    if (!block) return ''
    
    // Headings
    if (block.startsWith('#### ')) {
      return `<h4 class="text-subtitle-1 font-weight-bold mt-5 mb-2">${block.replace('#### ', '')}</h4>`
    }
    if (block.startsWith('### ')) {
      return `<h3 class="post-subheading mt-7 mb-3">${block.replace('### ', '')}</h3>`
    }
    
    // Lists
    if (block.startsWith('* ') || block.startsWith('- ')) {
      const items = block.split('\n').map(line => {
        const itemText = line.replace(/^[\*\-]\s+/, '')
        const formatted = parseInline(itemText)
        return `<li class="mb-2">${formatted}</li>`
      }).join('')
      return `<ul class="pl-6 mb-5 text-body-1" style="list-style-type: disc;">${items}</ul>`
    }
    
    // Paragraphs
    const lines = block.split('\n').map(line => parseInline(line)).join('<br/>')
    return `<p class="mb-4 text-body-1 post-paragraph">${lines}</p>`
  })
}

function parseInline(text: string): string {
  let result = text
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/\$(.*?)\$/g, '<code class="px-1.5 py-0.5 rounded font-weight-bold post-inline-code">$1</code>')
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="post-inline-link">$1</a>')
  return result
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}년 ${m}월 ${day}일`
}
</script>

<style scoped>
.blog-post-view {
  min-height: calc(100vh - 64px);
}

.subpage-container {
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
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

.back-link {
  font-size: 14px;
  font-weight: 700;
  color: #17653a;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #12532f;
}

.v-theme--dark .back-link {
  color: #6ee7b7;
}

.v-theme--dark .back-link:hover {
  color: #a7f3d0;
}

.post-detail-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.6px;
  line-height: 1.35;
}

.v-theme--dark .post-detail-title {
  color: #f1f5f9;
}

.post-meta {
  font-size: 13px;
  color: #64748b;
}

.v-theme--dark .post-meta {
  color: #94a3b8;
}

.blog-content {
  color: #334155;
}

.v-theme--dark .blog-content {
  color: #cbd5e1;
}

.post-paragraph {
  line-height: 1.8;
  text-align: justify;
}

:deep(.post-subheading) {
  font-size: 18px;
  font-weight: 800;
  color: #17653a;
  border-left: 4px solid #17653a;
  padding-left: 10px;
}

.v-theme--dark :deep(.post-subheading) {
  color: #6ee7b7;
  border-left-color: #10b981;
}

:deep(.post-inline-code) {
  background-color: #e8f5e9 !important;
  color: #17653a !important;
}

.v-theme--dark :deep(.post-inline-code) {
  background-color: #064e3b !important;
  color: #6ee7b7 !important;
}

:deep(.post-inline-link) {
  color: #17653a;
  font-weight: 700;
}

.v-theme--dark :deep(.post-inline-link) {
  color: #6ee7b7;
}

.author-card {
  background: #f8faf8;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.v-theme--dark .author-card {
  background: #0f172a;
  border-color: #334155;
}

@media (max-width: 600px) {
  .post-detail-title {
    font-size: 22px;
  }
}
</style>

