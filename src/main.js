import Vue from 'vue'
// Main File Project
import App from './App.vue'
// Route to Project
import router from './router'
// Data Store
import store from './store'
// Pligin Material Design
import vuetify from './plugins/vuetify'
// PWA
import './registerServiceWorker'

// CASL
/*
import {
    abilitiesPlugin
} from '@casl/vue'
import ability from './services/ability';


Vue.use(abilitiesPlugin, ability)
*/

Vue.config.productionTip = false

Vue.mixin({
    mounted() {
        console.log("hello world!");
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
