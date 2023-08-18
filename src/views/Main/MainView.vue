<script setup>
import { ref, onMounted, onBeforeMount, getCurrentInstance, inject } from 'vue'

import Spinner from '../../shared/Spinner.vue'
import NavBar from '../../shared/NavBar.vue'

const conf = inject('conf')

const load = ref()

const app = getCurrentInstance()
const progressBar = app.appContext.config.globalProperties.msg

const imgBody = conf.body.background.imgMain

console.log(progressBar)

onBeforeMount(() => {
  load.value = false
})

onMounted(() => {
  load.value = true
  /*
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'
   */
  document.body.style.backgroundImage = `url(${imgBody})`
})
</script>

<template>
  <div class="container-flex">
    <!-- LOADING -->
    <Spinner />

    <!-- NAVIGATION BAR -->
    <NavBar />

    <div v-show="load" class="flex-item">
      <!-- ROUTING -->
      <router-view />
    </div>
  </div>
</template>
