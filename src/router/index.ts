import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SavedView from '../views/SavedView.vue'
import CompareView from '../views/CompareView.vue'
import ResultsView from '../views/ResultsView.vue'
import StatsView from '../views/StatsView.vue'
import GuideView from '../views/GuideView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/',        name: 'Home',     component: HomeView },
  { path: '/saved',   name: 'Saved',    component: SavedView },
  { path: '/compare', name: 'Compare',  component: CompareView },
  { path: '/results', name: 'Results',  component: ResultsView },
  { path: '/stats',   name: 'Stats',    component: StatsView },
  { path: '/guide',   name: 'Guide',    component: GuideView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
