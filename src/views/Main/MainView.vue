<script setup>
import { ref, onMounted, onBeforeMount, getCurrentInstance, inject } from 'vue'

import MenuComponent from '@/components/MenuComponent.vue'

const conf = inject('conf')

const load = ref()

const app = getCurrentInstance()

const progressBar = app.appContext.config.globalProperties.msg

const imgBody = conf.body.background.imgMain

console.log(imgBody)
console.log(progressBar)
console.groupCollapsed('info Vite')
console.log('----------------------', import.meta.env.BASE_URL)
console.log('----------------------', import.meta.env.VITE_DEBUG)
console.groupEnd()

onBeforeMount(() => {
  load.value = false
})

onMounted(() => {
  load.value = true
  /*
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'
  document.body.style.backgroundImage = `url(${imgBody})`
  */
})
</script>

<template>
  <!-- NAVIGATION BAR -->
  <MenuComponent />

  <div class="container-flex">
    <div class="flex flex-row justify-content-around">
      <div class="flex p-3">
        <Panel header="Header">
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </Panel>
      </div>
      <div class="flex p-3">
        <Panel header="Header">
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </Panel>
      </div>
    </div>
  </div>
</template>

<style scoped="css">
.container-flex {
  padding: 20px;
  display: flex;
  /* flex-wrap: wrap;*/
  align-items: stretch;
  justify-content: flex-start;
  align-content: center;
  /* border: 1px solid black;*/
  /* height: calc(100vh - 10px);*/
}
</style>
