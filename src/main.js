import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { constant } from './i18n/en.js'
import { conf } from './services/conf'

import 'csshake'
// import './registerServiceWorker'

import VueDatePicker from '@vuepic/vue-datepicker'

import VueApexCharts from 'vue3-apexcharts'

import piniaPersist from 'pinia-plugin-persist'

import { VueQueryPlugin } from '@tanstack/vue-query'

import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

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

import './assets/style/css/global.css'

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

// Handler State Data
const pinia = createPinia()

// Global Var
app.config.globalProperties.msg = 'hello'
app.config.globalProperties.$globalVariable = 'Jimmy'

// Inject of Dependencies
app.provide('txt', constant)
app.provide('conf', conf)

app.component('InputIcon', InputIcon)
app.component('IconField', IconField)

app.use(VueApexCharts)

pinia.use(piniaPersist)

app.use(VueQueryPlugin)

app.use(PrimeVue)

app.use(pinia)

app.use(router)

app.component('VIcon', OhVueIcon)

app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
