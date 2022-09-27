<script setup>
import "bootstrap";

import { ref, onMounted, onBeforeMount, getCurrentInstance, inject } from "vue";

import Spinner from "../../shared/Spinner.vue";

const txt = inject("txt");
const conf = inject("conf");
console.log("🚧 - conf", conf);
console.log("🚧 - txt", txt);

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  //document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("myCanvasNav").style.width = "100%";
  document.getElementById("myCanvasNav").style.opacity = "0.4";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("myCanvasNav").style.width = "0%";
  document.getElementById("myCanvasNav").style.opacity = "0";
}

let load = ref();

const app = getCurrentInstance();
const progressBar = app.appContext.config.globalProperties.msg;

console.log(progressBar);

onBeforeMount(() => {
  load.value = false;
});

onMounted(() => {
  load.value = true;
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "hidden";

  document.body.style.backgroundImage = `url(${conf.body.background.imgMain})`;
});
</script>

<template>
  <div v-show="load" id="flex-container">
    <nav class="navbar navbar-expand-lg fixed-top bg-beige">
      <div class="container-fluid">
        <v-icon name="hi-menu" fill="#121212" scale="1.3" @click="openNav" />
        <a class="navbar-brand" href="#"> </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"> Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <span c lass="navbar-text"> fghf </span>
        </div>
      </div>
    </nav>

    <div
      id="myCanvasNav"
      class="overlay3"
      @click="closeNav"
      style="width: 0%; opacity: 0"
    ></div>

    <!-- SIDEBAR -->
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>

    <Spinner />

    <!--     <div id="main" class="flex-item">
      <div id="myCanvasNav" class="backdrop">
        <div class="center-div">
          <div class="spinner"></div>
        </div>
      </div -->>

    <h2>Sidenav Push Example</h2>
    <p>
      Click on the element below to open the side navigation menu, and push this content
      to the right. Notice that we add a black see-through background-color to body when
      the sidenav is opened.
    </p>
  </div>
</template>

<style lang="css" scoped>
@import "bootstrap/dist/css/bootstrap.css";

.offcanvas-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}

.backdrop {
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgb(104, 104, 104, 0.5);
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  /*
  display: flex;
  justify-content: center;
  align-items: center;
  */
}

.center-div {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}

.bg-beige {
  opacity: 0.8;
  background-color: rgb(104, 104, 104, 0.8);
}

.navbar {
  color: #ffff;
}

.nav-link {
  color: #ffff;
}

nav {
  font-family: "Open Sans", sans-serif;
  color: #ffff;
  height: 80px;
  -webkit-box-shadow: 0px 10px 15px -1px rgba(191, 191, 191, 0.53);
  -moz-box-shadow: 0px 10px 15px -1px rgba(191, 191, 191, 0.53);
  box-shadow: 0px 10px 15px -1px rgba(191, 191, 191, 0.53);
}

#flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  height: 98vh;
}

#flex-container > .flex-item {
  -webkit-flex: auto;
  flex: auto;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
}

.overlay3 {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(191, 191, 191, 0.9);
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
  opacity: 0;
  transition: opacity 1s;
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
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
