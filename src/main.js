import { createApp, readonly, ref } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'

import { backend_url } from './symbols.js'

const app = createApp(App)

app.provide(
    backend_url, 
    import.meta.env.VITE_BASE_BACKEND
)

app.use(createPinia())
app.use(router)

app.mount('#app')
