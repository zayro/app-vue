<script setup>
import { ref } from 'vue'
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

const conf = confStore.getInformation[0] || { first_name: 'Administrador', last_name: 'Usuario' }

const fullname = conf.first_name + ' ' + conf.last_name

const colorNavText = conf.colorIconNav || 'hsl(0, 0%, 85%)'

const avatar = '/img/profile/avatar/user_256x256.png'

console.log('🚧 - confStore:', conf)

const width = ref(window.innerWidth)
const height = ref(window.window.innerHeight)

window.addEventListener('resize', () => {
  width.value = window.innerWidth
  height.value = window.innerHeight
})
</script>

<template>
  <!-- Top Navigation Menu  -->
  <nav class="navbar fixed-top bg-custom">
    <div class="container-fluid">
      <span class="brand font-lato shake-little"> Software Empresarial </span>

      <div class="d-flex" role="search">
        <button class="btn btn-none-border me-2">
          <span class="me-2"> {{ fullname }} </span>
        </button>

        <button
          class="me-2 navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <v-icon name="hi-menu" :fill="colorNavText" scale="1.3" />
        </button>
      </div>

      <div id="offcanvasNavbar" class="offcanvas offcanvas-end" tabindex="-1" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasNavbarLabel" class="offcanvas-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div class="d-flex flex-column mb-3 align-items-center justify-content-center">
            <div class="div-rounded-circle me-2">
              <img :src="avatar" alt="..." class="card-img-login" width="150" />
            </div>
            <p class="pt-3 me-2">
              <strong>Administrador</strong>
            </p>
          </div>

          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li><hr class="menu-divider" /></li>
            <li class="nav-item">
              <RouterLink class="nav-link active" to="/main/"> INICIO </RouterLink>
            </li>
            <li><hr class="menu-divider" /></li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Modulo Vacante
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink to="/main/addPayment"> Agregar Vacante </RouterLink>
                </li>
                <li><a class="dropdown-item" href="#">Agregar Empresa</a></li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><a class="dropdown-item" href="#">Reporte Vacantes</a></li>
                <li><a class="dropdown-item" href="#">Reporte Seguimiento</a></li>
              </ul>
            </li>
            <li><hr class="menu-divider" /></li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Modulo Candidato
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Agregar Informacion HV</a></li>
                <li><a class="dropdown-item" href="#">Adjuntar Documentos</a></li>
              </ul>
            </li>
            <li><hr class="menu-divider" /></li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Modulo Entrevistador
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Adjuntar Documentos</a></li>
                <li><a class="dropdown-item" href="#">Agregar Observaciones</a></li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><a class="dropdown-item" href="#">Reporte candidatos en gestion</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
@import '@/assets/style/var.scss';
@import '@/assets/style/navbar.scss';
</style>
