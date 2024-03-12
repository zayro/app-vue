<script setup>
import { RouterView } from 'vue-router'

import MenuComponent from '@/components/MenuComponent.vue'
</script>

<template>
  <div>
    <!-- NAVIGATION BAR -->
    <MenuComponent />

    <div class="container-flex">
      <router-view v-slot="{ Component, route }">
        <!-- Use any custom transition and fallback to `fade` <transition :name="route.meta.transition || 'fade'">  -->

        <transition
          enter-active-class="animate__animated animate__fadeIntLeft"
          leave-active-class="animate__animated animate__fadeOutLeft"
        >
          <component :is="Component" />
        </transition>

        <!-- ROUTE END  -->
      </router-view>
    </div>
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
