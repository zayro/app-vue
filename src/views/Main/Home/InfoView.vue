<script setup>
import TheWelcome from './TheWelcome.vue'
import { onMounted, onUnmounted } from 'vue'

document.documentElement.style.setProperty('--animate-duration', '8s')

onMounted(() => {
  console.log(' ----------- onMounted  InfoView -----------')
})

onUnmounted(() => {
  console.log(' ----------- onUnmounted  InfoView-----------')
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>

<style scoped src="@/assets/main.css"></style>

<style scoped>
#body {
  max-width: 90%;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
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

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
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
