import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { constant } from './i18n/en.js'
import { conf } from './services/conf'

import 'bootstrap'
import '~bootstrap/dist/css/bootstrap.min.css'

import 'csshake'
// import './registerServiceWorker'

// import './assets/style/global.scss'

import '@/assets/style/layout.scss'
import '@/assets/style/fonts.scss'
import '@/assets/style/card.scss'
import '@/assets/style/form.scss'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import VueApexCharts from 'vue3-apexcharts'

import piniaPersist from 'pinia-plugin-persist'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiPcDisplay,
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
  IoDocument,
  IoDocumentText,
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
  HiArrowsExpand,
  HiSolidHome,
  RiShutDownLine,
  BiArrowBarUp,
  BiArrowBarDown,
  BiArrowsCollapse,
  BiBuilding,
  FaExpand,
  FaCamera,
  FaBan,
  FaEdit
} from 'oh-vue-icons/icons'

addIcons(
  BiPcDisplay,
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
  IoDocument,
  IoDocumentText,
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
  HiArrowsExpand,
  HiSolidHome,
  RiShutDownLine,
  BiArrowBarUp,
  BiArrowBarDown,
  BiArrowsCollapse,
  BiBuilding,
  FaExpand,
  FaBan,
  FaEdit,
  FaCamera
)

const app = createApp(App)
const pinia = createPinia()

// Global Var
app.config.globalProperties.msg = 'hello'
app.config.globalProperties.$globalVariable = 'Jimmy'

// Inject of Dependencies
app.provide('txt', constant)
app.provide('conf', conf)

app.use(VueApexCharts)

pinia.use(piniaPersist)

app.use(pinia)

app.use(router)

app.component('VIcon', OhVueIcon)

app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
