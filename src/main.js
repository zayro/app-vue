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

Vue.config.productionTip = false

Vue.mixin({
  created() {
    console.log("hello world!");
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
