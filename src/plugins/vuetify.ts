// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// 로컬스토리지에 저장된 모드 읽기 (없으면 light)
const savedDark = localStorage.getItem('darkMode') === 'true'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: savedDark ? 'dark' : 'light',
    themes: {
      light: {
        colors: {
          primary: '#17653A',   // Deep Forest Green
          secondary: '#22C55E', // Accent Green
          accent: '#10B981',    // Emerald
          background: '#F8FAF8', // Soft clean background
          surface: '#FFFFFF',   // Pure white surface
        },
      },
      dark: {
        colors: {
          primary: '#22C55E',   // Bright Green
          secondary: '#86EFAC', // Mint Green
          accent: '#10B981',    // Emerald
          background: '#0F172A', // Dark Slate
          surface: '#1E293B',    // Dark Slate Surface
        },
      },
    },
  },
})
