import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SavedView from '../views/SavedView.vue'
import CompareView from '../views/CompareView.vue'
import ResultsView from '../views/ResultsView.vue'
import StatsView from '../views/StatsView.vue'
import AnalysisView from '../views/AnalysisView.vue'
import FortuneView from '../views/FortuneView.vue'
import GuideView from '../views/GuideView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView, meta: { seoKey: 'home' } },
  { path: '/saved', name: 'Saved', component: SavedView, meta: { seoKey: 'saved' } },
  { path: '/compare', name: 'Compare', component: CompareView, meta: { seoKey: 'compare' } },
  { path: '/results', name: 'Results', component: ResultsView, meta: { seoKey: 'results' } },
  { path: '/stats', name: 'Stats', component: StatsView, meta: { seoKey: 'stats' } },
  { path: '/analysis', name: 'Analysis', component: AnalysisView, meta: { seoKey: 'analysis' } },
  { path: '/fortune', name: 'Fortune', component: FortuneView, meta: { seoKey: 'fortune' } },
  { path: '/guide', name: 'Guide', component: GuideView, meta: { seoKey: 'guide' } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
