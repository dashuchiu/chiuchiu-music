import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/tailwind.css'
import '@/assets/vant.scss'
import '@/mock/mockServer'
import i18n from './i18n'
const app = createApp(App)

app.use(createPinia()).use(router).use(i18n).mount('#app')
