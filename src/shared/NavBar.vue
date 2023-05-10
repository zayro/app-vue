<script setup>
import { defineProps, defineEmits, ref } from 'vue'

import { useConfigStoreRef } from '@/stores/config'

const confStore = useConfigStoreRef()

const conf = confStore.getInformation[0]

console.log('🚧 - confStore:', conf)

const props = defineProps({
  colorNavBackground: {
    type: String,
    default: '#b0b0b0'
  },
  colorNavText: {
    type: String,
    default: '#000000'
  }
})

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

      <span class="brand font-lato">Edificio Torres de San Valentin </span>

      <div class="navbar-icon-right">
        <a href="javascript:void(0);" class="icon font-lato">
          <strong> {{ conf.first_name + ' ' + conf.last_name }}</strong></a
        >
        <a href="javascript:void(0);" class="icon" @click="myFunction()">
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

<style scoped>
.navbar-icon-right {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}
.navbar-horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#navbar-vertical {
  display: none;
}
.navbar-vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.navbar-vertical > .navbar-item {
  margin-top: 3px;
  margin-bottom: 6px;
}
.navbar-item {
  flex: auto;
}
/* Style the navigation menu */
.navbar-top {
  overflow: hidden;
  position: relative;
}

/* Style navigation menu links */
.navbar-top a {
  padding: 5px 25px 5px 25px;
  text-decoration: none;
  font-size: 17px;
}

.brand {
  text-decoration: none;
  font-size: 23px;
  color: v-bind('props.colorNavText');
  padding: 15px 25px;
}

.brand:hover {
  color: black;
}

a.icon-left {
  padding: 20px;
  margin-right: 5px;
  margin-left: 5px;
}

span.icon-left {
  padding: 20px;
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
}
/* Add a grey background color on mouse-over */
.navbar-top a:hover {
  background-color: #ddd;
  color: black;
  border-radius: 25px;
}

.navbar-top menu:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active link (or home/logo) */

.navbar-top {
  font-family: 'Open Sans', sans-serif;
  -webkit-box-shadow: 0px 6px 10px -1px rgba(191, 191, 191, 0.53);
  -moz-box-shadow: 0px 6px 10px -1px rgba(191, 191, 191, 0.53);
  box-shadow: 0px 6px 10px -1px rgba(191, 191, 191, 0.53);
}

.bg-custom {
  background-color: v-bind('props.colorNavBackground');
}

.navbar-link {
  color: v-bind('props.colorNavText');
}

.navbar-fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
}
</style>
