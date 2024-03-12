<script setup>
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
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
  <div>
    <!-- ROUTE -->
    <router-view v-slot="{ Component }">
      <!-- Use any custom transition and fallback to `fade` <transition :name="route.meta.transition || 'fade'">  -->

      <component :is="Component" />

      <!-- ROUTE END  -->
    </router-view>

    <VueQueryDevtools />
  </div>
</template>
