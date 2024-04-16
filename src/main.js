import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/tailwind.css'
import '@/assets/vant.scss'
import '@/mock/mockServer'
const app = createApp(App)

app.use(createPinia()).use(router).mount('#app')
