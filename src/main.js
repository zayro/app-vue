import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

 //import './assets/main.css'

import './registerServiceWorker'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, FaUserAlt, MdPassword } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, FaUserAlt, MdPassword);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component("v-icon", OhVueIcon);

app.mount('#app')
