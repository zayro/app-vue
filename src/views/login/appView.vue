<script>
// IMAGE IMPORT

import imgDark from '@/assets/img/background/congruent_outline.png'
import imgLight from '@/assets/img/background/y-so-serious-white.png'

export default {
  mounted () {
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'hidden'

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.body.style.backgroundImage = `url(${imgDark})`
    } else {
      // Viewport is greater than 700 pixels wide
      document.body.style.backgroundImage = `url(${imgLight})`
    }
    console.log('the component is now mounted.')
    document.title = 'Login'
    // document.documentElement.style.setProperty('--animate-duration', '.9s');
  }
}
</script>

<template>
  <div class="container-flex">
    <div class="routes">
      <!-- ROUTING -->
      <router-view />
    </div>
  </div>
</template>

<style lang="css" scoped>
.container-flex {
  display: flex; /* or inline-flex */
  flex-direction: row;
}

.sidebar {
  flex-grow: 1;
  margin: auto;
}
.routes {
  flex-grow: 2;
  width: 100%;
}
</style>
