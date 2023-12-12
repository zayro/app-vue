<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  load: {
    type: Boolean,
    required: false,
    default: true
  }
})
console.log('🚧 - props:', props)
</script>

<template>
  <div v-if="props?.load || true" class="backdrop">
    <div class="center-div">
      <div class="spinner"></div>
      <div class="text-color-primary text-center text-uppercase fs-6 fw-semibold">Waiting ..</div>
    </div>
  </div>
</template>

<style lang="css">
/**
* Spinner Loading
*/

.text-color-primary {
  color: #09f;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.925);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.backdrop {
  z-index: 1031;
  width: 100vw;
  height: 100vh;
  background-color: rgb(104, 104, 104, 0.5);
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.8;
  transition: opacity 2s;
  /*
  display: flex;
  justify-content: center;
  align-items: center;
  */
}

.center-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  align-content: center;
  height: 100vh;
}
</style>
