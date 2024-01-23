<script setup>
import { RouterLink } from 'vue-router'

import { onMounted } from 'vue'

console.groupCollapsed('info Vite')
console.log('----------------------', import.meta.env.BASE_URL)
console.log('----------------------', import.meta.env.VITE_DEBUG)
console.groupEnd()

onMounted(() => {
  document.title = 'Home'
})
</script>

<template>
  <div id="body">
    <div id="home">
      <header>
        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
        <v-icon name="bi-pc-display" fill="black" scale="8" />

        <div class="wrapper">
          <div class="greetings">
            <h1 class="green">Bienvenido a tu App!</h1>
            <hr />
            <h3>
              <p>
                Somos una empresa innovadora en el mercado de software empresarial, y nos dedicamos a proporcionar
                soluciones de gestión de negocios efectivas y eficientes a nuestros clientes.
              </p>
            </h3>
          </div>
          <hr />

          <nav>
            <RouterLink to="/main/">Inicio</RouterLink>
            <RouterLink to="/main/about/">Acerca de Nosotros</RouterLink>
          </nav>
        </div>
      </header>

      <router-view />
    </div>
  </div>
</template>

<style scoped>
@import 'animate.css';

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

#body {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  width: calc(100%);
  height: 98vh;
}

/**
* Home
*/
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: rgba(84, 84, 84, 0.48);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid rgba(84, 84, 84, 0.48);
}

nav a:first-of-type {
  border: 0;
}
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  #body {
    display: flex;
    place-items: center;
  }

  #home {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    justify-content: center;
    padding-right: calc(160px / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
