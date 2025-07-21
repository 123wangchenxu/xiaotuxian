import '@/styles/common.scss'
import{lazy} from '@/directives/index.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.mount('#app')
app.use(lazy)
