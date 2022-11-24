import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { constant } from './i18n/en.js'
import { conf } from './services/conf'

import './assets/global.css'

import '~bootstrap/dist/css/bootstrap.min.css'
// import './registerServiceWorker'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaFlag,
  RiZhihuFill,
  FaUserAlt,
  MdPassword,
  CoMinutemailer,
  MdEmailRound,
  MdDelete,
  MdArrowbackiosnew,
  MdKeyboardbackspace,
  HiMenu,
  RiShutDownLine,
  FaExpand,
  FaCamera,
  FaBan,
  FaEdit
} from 'oh-vue-icons/icons'

addIcons(
  FaFlag,
  RiZhihuFill,
  FaUserAlt,
  MdPassword,
  CoMinutemailer,
  MdEmailRound,
  MdArrowbackiosnew,
  MdKeyboardbackspace,
  MdDelete,
  HiMenu,
  RiShutDownLine,
  FaExpand,
  FaBan,
  FaEdit,
  FaCamera
)

const app = createApp(App)

// Global Var
app.config.globalProperties.msg = 'hello'
app.config.globalProperties.$globalVariable = 'Jimmy'

// Inject of Dependencies
app.provide('txt', constant)
app.provide('conf', conf)

app.use(createPinia())
app.use(router)

app.component('VIcon', OhVueIcon)

app.mount('#app')
