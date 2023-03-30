<script setup>
import 'bootstrap'

import { ref, onMounted, onBeforeMount, getCurrentInstance, inject, watch } from 'vue'

import { useAppStoreRef } from '@/stores/app'

import { useConfigStoreRef } from '@/stores/config'

const txt = inject('txt')
console.log('🚧 - txt', txt)
const conf = inject('conf')
console.log('🚧 - conf', conf)

const appStore = useAppStoreRef()

const configStore = useConfigStoreRef()

const sidebar = Object.keys(import.meta.globEager('@/assets/img/sidebar/*.jpg'))

const background = Object.keys(import.meta.globEager('@/assets/img/background/*'))

function changeBackgroundImageSideNav (img) {
  backgroundImageSidenav.value = `url("${img}")`
  appStore.setConfig({ backgroundImageSidenav: `url("${img}")` })
}

function changeColorSideNav (color) {
  colorSidenav.value = `${color}`
  appStore.setConfig({ colorSidenav: `${color}` })
}

const load = ref()

const colorNavBackground = ref(appStore.conf.colorNavBackground)
const colorNavText = ref(appStore.conf.colorNavText)
const backgroundSidenav = ref(appStore.conf.backgroundSidenav)
const colorSidenav = ref(appStore.conf.colorSidenav)
const backgroundImageSidenav = ref(appStore.conf.backgroundImageSidenav)

const app = getCurrentInstance()
const progressBar = app.appContext.config.globalProperties.msg

function hiddenCard (id) {
  const x = document.getElementsByClassName(id)
  const styleIcon = x[1].style.display || 'flex'
  if (styleIcon === 'flex') {
    x[0].innerHTML = 'expand_less'
    x[1].style.display = 'none'
  } else {
    x[0].innerHTML = 'expand_more'
    x[1].style.display = 'flex'
  }
}

watch(colorNavBackground, async (newValue, old) => {
  appStore.setConfig({ colorNavBackground: newValue })
})

watch(colorNavText, async (newValue, old) => {
  appStore.setConfig({ colorNavText: newValue })
})

watch(backgroundSidenav, async (newValue, old) => {
  appStore.setConfig({ backgroundSidenav: newValue })
})

console.log(progressBar)

onBeforeMount(() => {
  load.value = false
})

onMounted(() => {
  load.value = true
})
</script>

<template>
  <div>
    <div v-show="load" id="flex-container">
      <!-- ROUTING -->
      <div id="main">
        <div class="d-flex flex-column">
          <div class="flex-item">
            <div class="card mb-3">
              <div class="card-body">
                <div class="card-tools">
                  <div class="card-title">Config Navbar</div>

                  <span class="material-icons configNavbar" @click="hiddenCard('configNavbar')">expand_more</span>
                </div>

                <hr />
                <div class="configNavbar row">
                  <div class="col mb-3">
                    <p><label for="colorNavBackground">Nav Background</label></p>
                    <input
                      id="colorNavBackground"
                      v-model="colorNavBackground"
                      class="form-control form-control-color"
                      type="color"
                    />
                    <p>{{ colorNavBackground }}</p>
                  </div>
                  <div class="col mb-3">
                    <p><label for="colorNavText">Nav Text</label></p>
                    <input v-model="colorNavText" type="color" class="form-control form-control-color" />
                    <p>{{ colorNavText }}</p>
                  </div>
                  <div class="col">
                    <label for="customRange3" class="form-label">Navbar opacity</label>
                    <input id="customRange3" type="range" class="form-range" min="0" max="5" step="0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-item">
            <div class="card mb-3">
              <div class="card-body">
                <div class="card-tools">
                  <div class="card-title">Config SIDEBAR</div>
                  <span class="material-icons configSidebar" @click="hiddenCard('configSidebar')">expand_more</span>
                </div>

                <hr />

                <div class="configSidebar">
                  <div class="row">
                    <div class="card-subtitle">COLOR</div>

                    <div class="col point">
                      <div class="point-blue" @click="changeColorSideNav('#35495e')"></div>

                      <div class="point-red" @click="changeColorSideNav('#fb404b')"></div>

                      <div class="point-green" @click="changeColorSideNav('#87cb16')"></div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="card-subtitle">BACKGROUND</div>

                    <input
                      id="colorNavBackground"
                      v-model="backgroundSideNav"
                      class="form-control form-control-color"
                      type="color"
                    />
                  </div>

                  <hr />

                  <div class="row">
                    <div class="card-subtitle">IMAGES</div>

                    <div class="d-flex flex-row flex-wrap mb-3 justify-content-around">
                      <div v-for="(item, index) in sidebar" :key="index" class="text-center">
                        <img :src="item" class="rounded-img" :alt="index" @click="changeBackgroundImageSideNav(item)" />

                        <div v-if="index === 0" class="rounded-img" @click="changeBackgroundImageSideNav('')">
                          <v-icon label="No Photos">
                            <v-icon name="fa-camera" scale="2.5" />
                            <v-icon name="fa-ban" scale="4" fill="#fC644d" />
                          </v-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-item">
            <div class="card mb-3">
              <div class="card-body">
                <div class="card-tools">
                  <div class="card-title">Config Background</div>
                  <span class="material-icons configBackground" @click="hiddenCard('configBackground')"
                    >expand_more</span
                  >
                </div>
                <hr />

                <div class="row configBackground">
                  <div class="card-subtitle">IMAGES</div>

                  <div class="d-flex flex-row flex-wrap mb-3">
                    <div v-for="(item, index) in background" :key="index" class="text-center">
                      <img
                        :src="item"
                        class="rounded-img"
                        :alt="index + item"
                        width="100"
                        height="100"
                        @click="changeBackgroundImageSideNav(item)"
                      />
                    </div>
                  </div>

                  <div class="d-flex flex-row flex-wrap mb-3">
                    <div
                      v-if="index === Object.keys(background).length - 1"
                      label="No Photos"
                      class="rounded-img"
                      @click="changeBackgroundImageSideNav('')"
                    >
                      <v-icon>
                        <v-icon name="fa-camera" scale="2.5" />
                        <v-icon name="fa-ban" scale="4" fill="#fC644d" />
                      </v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card-body {
  padding: 40px;
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

.center-div {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}

#flex-container {
  margin-top: 80px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  align-content: space-around;
  /* height: 98vh; */
}

.flex-item {
  /*
  -webkit-flex: auto;
  flex: auto;
  */
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
}

.card-tools {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.material-icons {
  cursor: pointer;
}
</style>
