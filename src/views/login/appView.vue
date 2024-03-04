<script>
// IMAGE IMPORT
import imgBodyBackGround from '@/assets/img/background/pattern5_black.png'

export default {
  mounted () {
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'hidden'
    console.log('the component is now mounted.')
    document.title = 'App'
    document.body.style.backgroundImage = `url(${imgBodyBackGround})`
    // document.documentElement.style.setProperty('--animate-duration', '.9s');
  }
}
</script>

<template>
  <div class="flex align-items-center justify-content-between flex-column h-screen">
    <div class="flex align-items-center justify-content-center h-full w-full">
      <!-- ROUTING -->
      <router-view />
    </div>
  </div>
</template>
