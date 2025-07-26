<!-- src/components/Sidebar.vue -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :permanent="!isMobile"
    width="280"
    class="sidebar"
  >
    <v-list dense>
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

    <div class="mt-auto px-4 pb-4">
      <!-- <AdBanner /> -->
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'

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
  { title: t('navHome'),         icon: 'mdi-home',         to: '/' },
  { title: t('navSaved'), icon: 'mdi-content-save', to: '/saved' },
  { title: t('navCompareLong'),   icon: 'mdi-magnify',      to: '/compare' },
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
</style>
