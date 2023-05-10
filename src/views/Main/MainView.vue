<script setup>
import { ref, onMounted, onBeforeMount, getCurrentInstance, inject } from 'vue'

import Spinner from '../../shared/Spinner.vue'
import NavBar from '../../shared/NavBar.vue'

// import Avatar from './Avatar/AvatarComponent.vue'
import Sidebar from '../../shared/SideBar.vue'

import { useAppStoreRef } from '@/stores/app'

const appStore = useAppStoreRef()

const conf = inject('conf')

function openNav () {
  console.log('openNav')
  document.getElementById('mySidenav').style.minWidth = '350px'
  document.getElementById('mySidenav').style.width = '350px'
}

function closeNav () {
  document.getElementById('mySidenav').style.minWidth = '0'
  document.getElementById('mySidenav').style.width = '0'
}

const load = ref()
const positionSidebar = ref('relative')

const app = getCurrentInstance()
const progressBar = app.appContext.config.globalProperties.msg

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
  document.body.style.backgroundImage = `url(${conf.body.background.imgMain})`
})
</script>

<template>
  <div class="container-flex">
    <!-- LOADING -->
    <Spinner />

    <!-- NAVIGATION BAR -->
    <NavBar
      :color-nav-background="appStore.conf.colorNavBackground"
      :color-nav-text="appStore.conf.colorNavText"
      @open-sidebar="openNav"
    />

    <!-- SIDEBAR -->
    <Sidebar
      :background-sidenav="appStore.getBackgroundSidenav"
      :background-image-sidenav="appStore.getBackgroundImageSidenav"
      :color-sidenav="appStore.getColorSidenav"
      :position-sidenav="positionSidebar"
      @close-sidebar="closeNav"
    />

    <div v-show="load" class="routes">
      <!-- ROUTING -->
      <router-view />
    </div>
  </div>
</template>
