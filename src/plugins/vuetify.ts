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
          primary: '#7C4DFF',   // Deep Indigo/Purple
          secondary: '#FFD700', // Gold
          accent: '#E040FB',    // Neon Magenta
          background: '#F8F6FC', // Soft lavender white
          surface: '#EFEBFA',   // Light lavender surface
        },
      },
      dark: {
        colors: {
          primary: '#B388FF',   // Bright Lavender
          secondary: '#FFD700', // Gold
          accent: '#E040FB',    // Neon Magenta
          background: '#0F041C', // Deepest Space Purple
          surface: '#1E0B36',    // Dark Violet
        },
      },
    },
  },
})
