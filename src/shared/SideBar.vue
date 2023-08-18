<script setup>
import { defineEmits } from 'vue'

import BackDrop from './BackDrop.vue'

const emit = defineEmits({
  'close-sidebar': null
})

function closeNav () {
  document.getElementById('mySidenav').style.width = '0'
  document.getElementById('mySidenav').style.marginLeft = '0'
  document.getElementById('mySidenav').style.opacity = '0'
  document.getElementById('mySidenav').style.display = 'none'
}
</script>
<template>
  <!-- LOADING -->
  <BackDrop @close-sidebar="closeNav" />
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
        <RouterLink to="/main/report">
          <v-icon name="md-person-sharp" fill="black" scale="1.5" /> Configuracion
        </RouterLink>
        <hr />
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/var.scss';
@import '@/assets/style/sidebar.scss';
</style>
