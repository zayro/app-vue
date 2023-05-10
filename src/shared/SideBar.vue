<script setup>
import { defineProps, defineEmits } from 'vue'

import BackDrop from './BackDrop.vue'

const emit = defineEmits({
  'close-sidebar': null
})

const props = defineProps({
  backgroundImageSideNav: {
    type: String,
    default: 'none'
  },
  backgroundSidenav: {
    type: String,
    default: '#b0b0b0'
  },
  colorSidenav: {
    type: String,
    default: '#000000'
  },
  positionSidenav: {
    type: String,
    default: 'relative'
  }
})

function closeNav () {
  document.getElementById('mySidenav').style.width = '0'
  // document.getElementById("main").style.marginLeft = "0";
  document.getElementById('myCanvasNav').style.width = '0%'
  document.getElementById('myCanvasNav').style.opacity = '0'
}

console.log('info props', props.positionSidenav)

let marginTop
let opacity = ''

if (props.positionSidenav === 'relative') {
  marginTop = '66px'
  opacity = 1
} else {
  marginTop = '0px'
  opacity = 0.5
}
</script>
<template>
  <!-- LOADING -->
  <BackDrop v-if="props.positionSidenav !== 'relative'" @close-sidebar="closeNav" />
  <div id="mySidenav" class="sidenav">
    <div class="sidenav-content">
      <span class="closebtn" @click="emit('close-sidebar')"> &times;</span>
      <div class="d-flex justify-content-center">
        <div class="div-rounded-circle">
          <v-icon name="bi-building" fill="#686868" scale="4" />
        </div>
      </div>
      <nav>
        <hr />
        <RouterLink to="/main/"> <v-icon name="hi-solid-home" fill="black" scale="1.5" /> Home </RouterLink>
        <hr />
        <!-- <a href="#" class="sidenav-link"> <v-icon name="gi-receive-money" fill="black" scale="1.5" /> Generar Pagos </a>
      <hr /> -->
        <RouterLink to="/main/addPayment">
          <v-icon name="gi-receive-money" fill="black" scale="1.5" /> Agregar Pagos
        </RouterLink>

        <hr />
        <RouterLink to="/main/addExpenditure">
          <v-icon name="gi-pay-money" fill="black" scale="1.5" /> Agregar Gastos
        </RouterLink>
        <hr />
        <RouterLink to="/main/report">
          <v-icon name="hi-document-report" fill="black" scale="1.5" /> Reportes</RouterLink
        >
        <hr />

        <a href="#"> <v-icon name="md-person-sharp" fill="black" scale="1.5" /> Configuracion </a>
      </nav>
    </div>
  </div>
</template>

<style scoped>
a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

nav {
  width: 100%;
  font-size: 12px;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: rgba(39, 167, 82, 0.747);
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid rgba(206, 37, 37, 0.48);
}

nav a:first-of-type {
  border: 0;
}
@media (hover: hover) {
  a:hover {
    background-color: hsla(241, 55%, 38%, 0.2);
  }
}

.sidenav {
  overflow: hidden;
  display: flex;
  height: calc(100vh - 70px);
  position: v-bind('props.positionSidenav');
  z-index: 3000;
  left: 0;
  margin-top: v-bind(marginTop);
  /* background-image: v-bind('props.backgroundImageSideNav'); */
  background-size: cover;
  background-position: 50%;
  border-radius: 0.375rem;
  border: 1px solid hsla(0, 2%, 38%, 0.644);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  /* filter: sepia(60%); */
}

.sidenav-content {
  overflow-x: hidden;
  transition: 0.5s;
  /* filter: sepia(60%); */

  opacity: v-bind(opacity);
  width: 100%;
  background-color: v-bind('props.backgroundSidenav');
  color: v-bind('props.colorSidenav');
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 20px;
  color: v-bind('props.colorSidenav');
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  background: hsla(0, 0%, 100%, 0.23);
  color: v-bind('props.colorSidenav');
  border-radius: 10px;
  margin: 3px 3px 3px 3px;
}

.sidenav .closebtn {
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  padding-right: 15px;
  font-size: 36px;
}

.closebtn:hover {
  cursor: pointer;
  /*border: 1px solid;*/
  border-radius: 5px;
  opacity: 0.8;
  border-color: hls(0, 0%, 0%);
}

.sidenav-link {
  background: hsla(0, 0%, 100%, 0.23);
  color: v-bind('props.colorSidenav');
  border-radius: 10px;
  margin: 0px 3px 0px 3px;
}

#mySidenav {
  width: 0%;
}

.div-rounded-circle {
  background-color: aliceblue;
  border-radius: 50%;
  margin-top: 5px;
  padding: 20px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
