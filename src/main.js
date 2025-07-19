import '@/styles/common.scss'
import{lazy} from '@/directives/index.js'
import { createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
app.use(lazy)
