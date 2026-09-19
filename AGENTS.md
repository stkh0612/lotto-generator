# AGENTS.md - LottoMate Development Instructions

This file serves as the system instruction set for AI assistants (Cursor, Claude, Copilot, Antigravity, etc.) working on the **LottoMate** codebase.

For detailed project architecture and operations, please refer to [PROJECT_GUIDE.md](./PROJECT_GUIDE.md).

## Critical Guidelines for AI
1. **Tech Stack**: Vue 3 (`<script setup lang="ts">`), TypeScript, Vite, Pinia, Vuetify 3.
2. **Installation**: Always use `npm install --legacy-peer-deps` due to Vuetify dependency peer requirements.
3. **Build & SEO**:
   - `npm run build` runs both Vite bundle and `scripts/post-build-seo.cjs`.
   - The SEO script injects semantic pre-rendered HTML into `dist/<route>/index.html` and synchronizes `public/sitemap.xml`.
   - Never remove or break the `<div id="app">` injection mechanism in `post-build-seo.cjs`.
4. **URL & Trailing Slash Policy**:
   - The canonical URLs must always have trailing slashes (e.g., `https://lottomate.life/stats/`, `/analysis/`).
   - Netlify serves directory structures, and non-trailing slash routes trigger 301 redirects.
5. **Git Sync Warning**:
   - GitHub Actions runs automatically every Saturday evening (KST) to update `src/assets/lotto_numbers_en.json` and pushes commits directly to `master`.
   - Always recommend running `git pull origin master` before editing.
6. **Tone & Ethics**:
   - Promote responsible lottery play (entertainment only, independent trials, mathematical reality, no fake 100% win prediction claims).
