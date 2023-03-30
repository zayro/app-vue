import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { constant } from './i18n/en.js'
import { conf } from './services/conf'

import './assets/global.css'

import '~bootstrap/dist/css/bootstrap.min.css'
// import './registerServiceWorker'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  GiPayMoney,
  GiReceiveMoney,
  FaFlag,
  RiZhihuFill,
  FaUserAlt,
  FaCreditCard,
  FaAnchor,
  FaArrowLeft,
  FaArrowRight,
  FaBalanceScale,
  MdPassword,
  CoMinutemailer,
  MdApartment,
  MdEmailRound,
  MdDelete,
  MdArrowbackiosnew,
  MdKeyboardbackspace,
  MdPersonSharp,
  HiMenu,
  HiDocumentReport,
  HiSolidHome,
  RiShutDownLine,
  BiArrowBarUp,
  BiArrowBarDown,
  BiBuilding,
  FaExpand,
  FaCamera,
  FaBan,
  FaEdit
} from 'oh-vue-icons/icons'

addIcons(
  GiPayMoney,
  GiReceiveMoney,
  FaFlag,
  RiZhihuFill,
  FaUserAlt,
  FaCreditCard,
  FaAnchor,
  FaArrowLeft,
  FaArrowRight,
  FaBalanceScale,
  MdPassword,
  CoMinutemailer,
  MdApartment,
  MdEmailRound,
  MdArrowbackiosnew,
  MdKeyboardbackspace,
  MdPersonSharp,
  MdDelete,
  HiMenu,
  HiDocumentReport,
  HiSolidHome,
  RiShutDownLine,
  BiArrowBarUp,
  BiArrowBarDown,
  BiBuilding,
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

app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
