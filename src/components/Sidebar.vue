<!-- src/components/Sidebar.vue -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :permanent="!isMobile"
    width="280"
    class="sidebar"
  >
    <!-- 사이드바 상단 헤더 (iOS 노치 안전 영역 여백 및 로고) -->
    <div class="sidebar-header pa-4 pb-2 d-flex align-center justify-space-between">
      <div class="d-flex align-center" style="gap: 8px;">
        <v-avatar size="28" color="primary">
          <v-img src="/leafgrad.svg" alt="LottoMate" />
        </v-avatar>
        <span class="text-subtitle-1 font-weight-bold text-primary">LottoMate</span>
      </div>
      <v-btn v-if="isMobile" icon="mdi-close" variant="text" size="small" @click="drawer = false" />
    </div>
    <v-divider class="mb-1" />

    <v-list dense class="pt-0">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        link
        class="menu-item"
        :active="item.to === $route.path"
        @click="onItemClick"
      >
        <!-- default 슬롯으로 아이콘+텍스트를 같은 컨테이너에 넣습니다 -->
        <template #default>
          <v-icon
            class="menu-icon"
            :color="item.to === $route.path ? 'primary' : 'grey'"
            size="24"
          >
            {{ item.icon }}
          </v-icon>
          <span class="menu-label">{{ item.title }}</span>
        </template>
      </v-list-item>
    </v-list>

    <div class="mt-auto px-4 pb-2">
      <div class="policy-links d-flex justify-center mb-2">
        <router-link to="/privacy" class="policy-link" @click="onItemClick">{{ t('navPrivacy') }}</router-link>
        <span class="policy-separator mx-2">|</span>
        <router-link to="/terms" class="policy-link" @click="onItemClick">{{ t('navTerms') }}</router-link>
      </div>
      <AdBanner />
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'
import AdBanner from './AdBanner.vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const drawer = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const { t } = useI18n()
const items = ref([
  { title: t('navHome'),         icon: 'mdi-home',           to: '/' },
  { title: t('navSaved'),        icon: 'mdi-content-save',   to: '/saved' },
  { title: t('navCompareLong'),  icon: 'mdi-magnify',        to: '/compare' },
  { title: t('navSimulation'),   icon: 'mdi-slot-machine',   to: '/simulation' },
  { title: t('navStats'),        icon: 'mdi-chart-bar',      to: '/stats' },
  { title: t('navAnalysis'),     icon: 'mdi-chart-pie',      to: '/analysis' },
  { title: t('navFortune'),      icon: 'mdi-sparkles',       to: '/fortune' },
  { title: t('navGuide'),        icon: 'mdi-book-open-page-variant', to: '/guide' },
  { title: t('navBlog', '로또 블로그'), icon: 'mdi-post-outline', to: '/blog' },
  { title: t('navAbout', '소개'), icon: 'mdi-information-outline', to: '/about' },
])

function onItemClick() {
  if (isMobile.value) drawer.value = false
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 1px solid #e0e0e0;
}

.sidebar-header {
  padding-top: calc(16px + env(safe-area-inset-top, 0px)) !important;
}

/* 한 줄 flex 배치 */
.menu-item {
  display: flex !important;
  align-items: center;
  padding: 12px 16px;
  margin: 4px 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

/* 아이콘과 텍스트 간격 */
.menu-icon {
  margin-right: 12px;
}

/* 텍스트 스타일 */
.menu-label {
  font-weight: 500;
  color: #424242;
}

/* 활성 메뉴 강조 */
.menu-item.router-link-exact-active {
  background-color: rgba(25, 118, 210, 0.1);
}

/* 호버 시 배경 변화 */
.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.policy-links {
  font-size: 0.72rem;
  color: #757575;
}
.policy-link {
  color: #757575;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.policy-link:hover {
  color: #1976d2;
  text-decoration: underline;
}
.policy-separator {
  color: #bdbdbd;
}
</style>
