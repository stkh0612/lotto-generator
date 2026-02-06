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
          primary: '#6200EA',   // Deep Purple
          secondary: '#FFD700', // Gold
          accent: '#F50057',    // Pink
          background: '#FFFFFF',
          surface: '#F3E5F5',   // Light Purple tint
        },
      },
      dark: {
        colors: {
          primary: '#B388FF',   // Lighter Purple for dark mode
          secondary: '#FFD700', // Gold
          accent: '#FF4081',    // Pink
          background: '#12002B', // Deep Space Purple
          surface: '#2A0045',    // Dark Purple
        },
      },
    },
  },
})
