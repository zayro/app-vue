<script setup>
import { defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStoreRef } from '@/stores/config'

const router = useRouter()
const store = useConfigStoreRef()

const clearSession = () => {
  // localStorage.clear()
  store.resetAll()
  router.push({ path: '/' })
}

const confStore = useConfigStoreRef()

const conf = confStore.getInformation[0] || { first_name: 'Nombre', last_name: 'Usuario' }

const fullname = conf.first_name + ' ' + conf.last_name

const colorNavText = conf.colorIconNav || 'hsl(0, 0%, 85%)'

console.log('🚧 - confStore:', conf)

const width = ref(window.innerWidth)
const height = ref(window.window.innerHeight)

window.addEventListener('resize', () => {
  width.value = window.innerWidth
  height.value = window.innerHeight
})

const emit = defineEmits({
  'open-sidebar': null
})

function myFunction () {
  const x = document.getElementById('navbar-vertical')
  if (x.style.display === 'block') {
    x.style.display = 'none'
  } else {
    x.style.display = 'block'
  }
}
</script>

<template>
  <!-- Top Navigation Menu  -->
  <div v-if="width > 1024" class="navbar-top navbar-fixed-top bg-custom">
    <div class="navbar-horizontal">
      <span v-if="width > 1024" class="menu icon-left" @click="emit('open-sidebar')">
        <v-icon name="hi-menu" :fill="colorNavText" scale="1.3" />
      </span>

      <span class="brand font-lato">Gente Util SAS </span>

      <div class="navbar-icon-right">
        <a href="javascript:void(0);" class="icon font-lato">
          <strong> {{ fullname }} </strong></a
        >
        <a href="javascript:void(0);" class="icon" @click="clearSession()">
          <v-icon name="ri-shut-down-line" :fill="colorNavText" scale="1.3" />
        </a>
      </div>

      <div v-if="width < 1024" id="mini">
        <a href="javascript:void(0);" class="icon" @click="myFunction()">
          <v-icon name="hi-menu" :fill="colorNavText" scale="1.3" />
        </a>
      </div>
    </div>
  </div>

  <div v-if="width < 1024" class="navbar-top bg-custom">
    <div class="navbar-horizontal container">
      <span class="brand">LOGO</span>

      <div class="navbar-icon-right">
        <a href="javascript:void(0);" class="icon" @click="emit('open-sidebar')">
          <v-icon name="hi-menu" :fill="colorNavText" scale="1.8" />
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/style/var.scss';
@import '@/assets/style/navbar.scss';
</style>
