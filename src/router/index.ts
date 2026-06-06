import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SavedView from '../views/SavedView.vue'
import CompareView from '../views/CompareView.vue'
import SimulationView from '../views/SimulationView.vue'
import StatsView from '../views/StatsView.vue'
import AnalysisView from '../views/AnalysisView.vue'
import FortuneView from '../views/FortuneView.vue'
import ResultsView from '../views/ResultsView.vue'
import GuideView from '../views/GuideView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import TermsView from '../views/TermsView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView, meta: { seoKey: 'home' } },
  { path: '/saved', name: 'Saved', component: SavedView, meta: { seoKey: 'saved' } },
  { path: '/compare/:round?', name: 'Compare', component: CompareView, meta: { seoKey: 'compare' } },
  { path: '/simulation', name: 'Simulation', component: SimulationView, meta: { seoKey: 'simulation' } },
  { path: '/stats', name: 'Stats', component: StatsView, meta: { seoKey: 'stats' } },
  { path: '/analysis', name: 'Analysis', component: AnalysisView, meta: { seoKey: 'analysis' } },
  { path: '/fortune', name: 'Fortune', component: FortuneView, meta: { seoKey: 'fortune' } },
  { path: '/guide', name: 'Guide', component: GuideView, meta: { seoKey: 'guide' } },
  { path: '/privacy', name: 'Privacy', component: PrivacyView, meta: { seoKey: 'privacy' } },
  { path: '/terms', name: 'Terms', component: TermsView, meta: { seoKey: 'terms' } },
  { path: '/results/:round?', name: 'Results', component: ResultsView, meta: { seoKey: 'results' } },
  { path: '/:pathMatch(.*)*', redirect: '/' } // Redirect unknown paths to Home
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
