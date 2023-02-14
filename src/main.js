import { createApp, readonly, ref } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faUpDownLeftRight,
    faUserAstronaut,
    faUserGroup,
    faBadgeCheck
} from '@fortawesome/free-solid-svg-icons'

library.add(faUpDownLeftRight)
library.add(faUserAstronaut)
library.add(faUserGroup)

const app = createApp(App)
const pinia = createPinia()
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)

app.mount('#app')
