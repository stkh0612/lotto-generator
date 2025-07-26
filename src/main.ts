import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

/* Vuetify 스타일 · 아이콘 */
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
