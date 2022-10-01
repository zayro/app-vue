<script setup>
import "bootstrap";

import { ref, onMounted, onBeforeMount, getCurrentInstance, inject } from "vue";

import Spinner from "../../shared/Spinner.vue";
import NavBar from "../../shared/NavBar.vue";
import BackDrop from "../../shared/BackDrop.vue";

const txt = inject("txt");
console.log("🚧 - txt", txt);
const conf = inject("conf");

const sidebar = Object.keys(import.meta.globEager("/public/img/sidebar/*.jpg"));

function openNav() {
  console.log("openNav");
  document.getElementById("mySidenav").style.width = "35% ";
  //document.getElementById("main").style.marginLeft = "35% ";
  document.getElementById("myCanvasNav").style.width = "100%";
  document.getElementById("myCanvasNav").style.opacity = "0.6";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  //document.getElementById("main").style.marginLeft = "0";
  document.getElementById("myCanvasNav").style.width = "0%";
  document.getElementById("myCanvasNav").style.opacity = "0";
}

function changeBackgroundSideNav(img) {
  backgroundSidenav.value = `url("${img}")`;
}
function changeColorSideNav(color) {
  colordSidenav.value = `${color}`;
}

let load = ref();

let colorNavBackground = ref("#b0b0b0");
let colorNavText = ref("#000000");
let backgroundSidenav = ref("");
let colordSidenav = ref("#000000");

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
  <!-- LOADING -->
  <Spinner />

  <!-- LOADING -->
  <BackDrop @close-sidebar="closeNav" />

  <!-- NAVIGATION BAR -->
  <NavBar
    :colorNavBackground="colorNavBackground"
    :colorNavText="colorNavText"
    @open-sidebar="openNav"
  />

  <div v-show="load" id="flex-container">
    <!-- SIDEBAR -->
    <div id="mySidenav" class="sidenav">
      <div class="sidenav-content">
        <span class="closebtn" @click="closeNav">&times;</span>
        <hr />
        <a href="#" class="sidenav-link"> <span class="text-white">About</span> </a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    </div>

    <!-- ROUTING -->
    <div id="main" class="container">
      <div class="d-flex justify-content-around">
        <div class="flex-item">
          <div class="card border-secondary mb-3">
            <div class="card-header">Config Color</div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <p><label for="colorNavBackground">colorNavBackground</label></p>
                  <input
                    id="colorNavBackground"
                    v-model="colorNavBackground"
                    type="color"
                  />
                  <p>{{ colorNavBackground }}</p>
                </div>
                <div class="col">
                  <p><label for="colorNavText">colorNavText</label></p>
                  <input v-model="colorNavText" type="color" />
                  <p>{{ colorNavText }}</p>
                </div>
              </div>

              <div class="row">
                <div class="text-center">SIDEBAR COLOR</div>

                <div class="col point">
                  <div class="point-blue" @click="changeColorSideNav('#35495e')"></div>

                  <div class="point-red" @click="changeColorSideNav('#fb404b')"></div>

                  <div class="point-green" @click="changeColorSideNav('#87cb16')"></div>
                </div>
              </div>

              <div class="row">
                <div class="text-center">SIDEBAR IMAGES</div>

                <div class="d-flex flex-row flex-wrap mb-3 justify-content-around">
                  <div class="text-center" v-for="(item, index) in sidebar" :key="index">
                    <img
                      v-bind:src="item"
                      class="rounded-img"
                      @click="changeBackgroundSideNav(item)"
                      v-bind:alt="index"
                    />

                    <div
                      v-if="index === 0"
                      @click="changeBackgroundSideNav('')"
                      class="rounded-img"
                    >
                      <v-icon label="No Photos">
                        <v-icon name="fa-camera" scale="4" />
                        <v-icon name="fa-ban" scale="5" fill="#fC644d" />
                      </v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-item" style="width: 50%">
          <div class="card border-secondary mb-3">
            <div class="card-header">Config User</div>
            <div class="card-body text-secondary">
              <div class="d-flex justify-content-around"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#mySidenav {
  width: 0%;
}

.rounded-img {
  width: 100px;
  max-height: 100px;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
}

.rounded-img:hover {
  cursor: pointer;
  border: 2px solid;
  border-color: grey;
}

.point {
  padding: 15px;
  display: flex;
  justify-content: space-around;
}

.point > *:hover {
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid;
}

.point-blue {
  width: 25px;
  height: 25px;
  background: #35495e;
  border-radius: 50%;
}

.point-red {
  width: 25px;
  height: 25px;
  background: #fb404b;
  border-radius: 50%;
}

.point-green {
  width: 25px;
  height: 25px;
  background: #87cb16;
  border-radius: 50%;
}

.sidenav-link {
  background: hsla(0, 0%, 100%, 0.23);
  color: white;
  border-radius: 10px;
  margin: 0px 3px 0px 3px;
}
.center-div {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
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

.sidenav-content {
  overflow-x: hidden;
  height: 100%;
  transition: 0.5s;
  /* filter: sepia(60%); */
  height: 100vh;
  opacity: 0.8;
  background-color: v-bind(colordSidenav);
  color: #ffffff;
}

.sidenav {
  overflow: hidden;
  height: 100%;
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  background-image: v-bind(backgroundSidenav);
  background-size: cover;
  background-position: 50%;
  /* filter: sepia(60%); */
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #f1f1f1;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  background: hsla(0, 0%, 100%, 0.23);
  color: white;
  border-radius: 10px;
  margin: 3px 3px 3px 3px;
}

.sidenav .closebtn {
  display: flex;
  justify-content: end;
  padding: 20px;
  top: 0;
  font-size: 36px;
}

.closebtn:hover {
  cursor: pointer;
  border: 1px solid;
  border-radius: 5px;
  opacity: 0.8;
  border-color: hls(0, 0%, 0%);
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
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
