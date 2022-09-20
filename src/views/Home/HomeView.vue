<script setup>
import { RouterLink } from "vue-router";

import HelloWorld from "../../components/HelloWorld.vue";

console.log("----------------------", import.meta.env.BASE_URL);
console.log("----------------------", import.meta.env.VITE_DEBUG);

document.title = "Home";
document.body.style.display = "flex";
document.body.style.placeItems = "center";
document.body.style.minHeight = "100vh";
document.body.style.background = "#181818";
document.body.style.transition = "color 0.5s, background-color 0.5s";
document.body.style.lineHeight = "1.6";
document.body.style.fontFamily =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
document.body.style.fontSize = "15px";
document.body.style.textRendering = "optimizeLegibility";
document.body.style.color = "rgba(235, 235, 235, 0.64)";
</script>

<style scoped src="../../assets/main.css"></style>

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div id="body">
    <div id="home">
      <header>
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />

        <div class="wrapper">
          <HelloWorld msg="You did it!" />

          <nav>
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/home/about">About</RouterLink>
          </nav>
        </div>
      </header>

      <router-view v-slot="{ Component }">
        <!-- Use any custom transition and fallback to `fade` -->
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
