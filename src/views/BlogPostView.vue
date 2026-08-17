<!-- src/views/BlogPostView.vue -->
<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="820" elevation="1" rounded>
      <div v-if="post">
        <!-- 네비게이션 브레드크럼 -->
        <v-btn
          variant="text"
          prepend-icon="mdi-arrow-left"
          to="/blog"
          color="primary"
          class="pl-0 mb-4 font-weight-bold"
        >
          블로그 목록으로 돌아가기
        </v-btn>

        <h1 class="text-h4 font-weight-bold text-primary mb-3">{{ post.title }}</h1>
        
        <div class="d-flex justify-space-between align-center mb-6 flex-wrap text-caption text-grey">
          <span>작성일: {{ formatDate(post.date) }}</span>
          <span>작성자: {{ post.author }}</span>
        </div>

        <v-divider class="mb-6" />

        <!-- 블로그 본문 (Markdown 파싱 렌더링) -->
        <div class="blog-content">
          <template v-for="(block, idx) in renderedBlocks" :key="idx">
            <div v-html="block"></div>
          </template>
        </div>

        <v-divider class="my-8" />

        <!-- 꼬리말 및 다른 글 안내 -->
        <div class="d-flex justify-space-between align-center flex-wrap" style="gap: 12px;">
          <v-btn
            v-if="prevPost"
            variant="outlined"
            size="small"
            color="primary"
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
            :to="`/blog/${nextPost.id}`"
            append-icon="mdi-chevron-right"
          >
            다음 글: {{ nextPost.title }}
          </v-btn>
        </div>
      </div>
      <div v-else class="text-center py-12">
        <v-icon icon="mdi-alert-circle-outline" size="64" color="error" class="mb-4" />
        <h2 class="text-h6 mb-4">해당 블로그 기사를 찾을 수 없습니다.</h2>
        <v-btn color="primary" to="/blog">블로그 목록으로 이동</v-btn>
      </div>
    </v-sheet>
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
      return `<h4 class="text-subtitle-1 font-weight-bold mt-5 mb-2 text-secondary">${block.replace('#### ', '')}</h4>`
    }
    if (block.startsWith('### ')) {
      return `<h3 class="text-h6 font-weight-bold mt-7 mb-3 text-primary" style="border-left: 4px solid #7c4dff; padding-left: 8px;">${block.replace('### ', '')}</h3>`
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
    return `<p class="mb-4 text-body-1" style="line-height: 1.8; text-align: justify;">${lines}</p>`
  })
}

function parseInline(text: string): string {
  let result = text
  // Bold **text**
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Inline formulas / code $math$
  result = result.replace(/\$(.*?)\$/g, '<code class="px-1 py-0.5 rounded bg-grey-lighten-3 text-deep-purple font-weight-bold">$1</code>')
  // Links [text](url)
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-primary font-weight-bold">$1</a>')
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
.blog-content {
  color: #ECEFF1;
}

.v-theme--light .blog-content {
  color: #37474F;
}

/* Deep purple style code overrides in light theme */
.v-theme--light :deep(code) {
  background-color: #f5f5f5 !important;
  color: #512da8 !important;
}

.v-theme--dark :deep(code) {
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: #b39ddb !important;
}
</style>
