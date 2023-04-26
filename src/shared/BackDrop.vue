<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits({
  'close-sidebar': null
})
</script>

<template>
  <div id="myCanvasNav" class="backdrop" style="width: 0%; opacity: 0" @click="emit('close-sidebar')"></div>
</template>

<style>
.backdrop {
  height: 100%;
  position: fixed;
  z-index: 2030;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%);
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
  transition: opacity 1s;
}
</style>
