<script setup>
import { RouterView } from 'vue-router'

import MenuComponent from '@/components/MenuComponent.vue'

window.addEventListener('offline', () => {
  console.log('offline')
})
window.addEventListener('online', () => {
  console.log('online')
})
window.addEventListener('resize', () => {
  console.log('innerWidth', window.innerWidth, 'innerHeight', window.innerHeight)
})
window.onload = function () {
  console.log(' window.onload ')
}
</script>

<template>
  <!-- NAVIGATION BAR -->
  <MenuComponent />

  <div class="container-flex">
    <router-view v-slot="{ Component, route }">
      <!-- Use any custom transition and fallback to `fade` -->
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped="css">
.container-flex {
  /* padding: 6rem 4rem 0; */
  padding-top: 10px;
  display: flex;
  /* flex-wrap: wrap;*/
  align-items: center;
  justify-content: center;
  align-content: center;
  /* border: 1px solid black;*/
  /* height: calc(100vh - 10px);*/
}
</style>
