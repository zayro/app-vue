<script setup>
import { ref, onMounted, onBeforeMount, getCurrentInstance, inject } from 'vue'

import MenuComponent from '@/components/MenuComponent.vue'

const conf = inject('conf')

const app = getCurrentInstance()

const progressBar = app.appContext.config.globalProperties.msg

const imgBody = conf.body.background.imgMain

console.log(imgBody)
console.log(progressBar)
console.groupCollapsed('info Vite')
console.log('----------------------', import.meta.env.BASE_URL)
console.log('----------------------', import.meta.env.VITE_DEBUG)
console.groupEnd()

const blocked = ref(true)

onBeforeMount(() => {
  blocked.value = true
})

onMounted(() => {
  /*
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'
  document.body.style.backgroundImage = `url(${imgBody})`
  */
})
</script>

<template>
  <!-- NAVIGATION BAR -->
  <MenuComponent :go-back="false" />

  <div class="container-flex">
    <!-- ROUTING -->
    <router-view />
  </div>
</template>

<style scoped="css">
.container-flex {
  padding: 60px;
  display: flex;
  /* flex-wrap: wrap;*/
  align-items: stretch;
  justify-content: flex-start;
  align-content: center;
  /* border: 1px solid black;*/
  /* height: calc(100vh - 10px);*/
}
</style>
