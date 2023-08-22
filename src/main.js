import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import { createHead } from "@unhead/vue"

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
    faCheck,
    faXmark,
    faCircleXmark,
    faCirclePlus,
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
    faCaretDown,
    faCaretRight,
    faAngleRight,
    faHandPointRight,
    faList,
    faArrowUpRightFromSquare,
    faSliders,
    faHouse,
    faFlask,
    faBrain,
    faSquareCheck,
    faSquareXmark,
    faSquare,
    faSquareVirus,
    faAnglesLeft,
    faAnglesRight,
    faPaperPlane,
    faCircle as faCircleSolid
} from '@fortawesome/free-solid-svg-icons'

import {
    faSquarePlus,
    faImage,
    faCircle
} from '@fortawesome/free-regular-svg-icons'

library.add(faSquareCheck)
library.add(faSquareXmark)
library.add(faSquare)
library.add(faSquareVirus)
library.add(faUpDownLeftRight)
library.add(faUserAstronaut)
library.add(faUserGroup)
library.add(faCircleCheck)
library.add(faCircleXmark)
library.add(faXmark)
library.add(faCheck)
library.add(faCirclePlus)
library.add(faCircle)
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
library.add(faImage)
library.add(faFilePdf)
library.add(faCaretDown)
library.add(faCaretRight)
library.add(faAngleRight)
library.add(faHandPointRight)
library.add(faList)
library.add(faArrowUpRightFromSquare)
library.add(faSliders)
library.add(faHouse)
library.add(faFlask)
library.add(faSquarePlus)
library.add(faBrain)
library.add(faAnglesLeft)
library.add(faAnglesRight)
library.add(faPaperPlane)
library.add(faCircleSolid)

const app = createApp(App)
const pinia = createPinia()
//const head = createHead()
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)
//app.use(head)

app.mount('#app')
