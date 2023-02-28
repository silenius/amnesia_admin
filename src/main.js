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
    faCircleCheck,
    faCircleXmark,
    faShieldHalved,
    faFolderTree,
    faFolder,
    faFileLines,
    faArrowUpFromBracket,
    faTrashCan,
    faPenToSquare,
    faCalendar,
    faFile,
    faAtom,
    faMicrophoneLines,
    faFileImage,
    faFilePdf,
} from '@fortawesome/free-solid-svg-icons'

library.add(faUpDownLeftRight)
library.add(faUserAstronaut)
library.add(faUserGroup)
library.add(faCircleCheck)
library.add(faCircleXmark)
library.add(faShieldHalved)
library.add(faFolderTree)
library.add(faFolder)
library.add(faFileLines)
library.add(faArrowUpFromBracket)
library.add(faTrashCan)
library.add(faPenToSquare)
library.add(faCalendar)
library.add(faFile)
library.add(faAtom)
library.add(faMicrophoneLines)
library.add(faFileImage)
library.add(faFilePdf)


const app = createApp(App)
const pinia = createPinia()
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)

app.mount('#app')
