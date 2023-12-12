<script setup>
function toggleFullScreen (idElement) {
  const elem = document.getElementById(idElement)

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
    })
  } else {
    document.exitFullscreen()
  }
}

function remove (idElement) {
  const element = document.getElementById(idElement)

  element.remove()
}
</script>
<template>
  <div id="fullscreenElement" class="card mb-3">
    <div class="card-body p-4">
      <div class="card-tools d-flex flex-row justify-content-between">
        <div class="card-title">CARD</div>
        <div class="d-flex flex-row justify-content-around">
          <div class="cursor-pointer" @click="toggleFullScreen('fullscreenElement')">
            <v-icon name="hi-arrows-expand" :fill="colorNavText" scale="1.3" />
          </div>
          <div>
            <v-icon
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              name="bi-arrows-collapse"
              :fill="colorNavText"
              scale="1.3"
            >
            </v-icon>
          </div>
        </div>
      </div>

      <hr />

      <div id="collapseExample" class="row collapse">
        <h1>Hola mundo</h1>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
