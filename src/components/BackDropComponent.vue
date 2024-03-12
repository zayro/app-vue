<script setup>
import { defineModel } from 'vue'

const hidden = defineModel('hidden', { default: true })
</script>

<template>
  <div v-if="!hidden" id="myCanvasNav" class="backdrop">
    <div class="flex flex-column flex align-items-center justify-content-center h-full w-full text-center">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.backdrop {
  height: 100vh;
  position: fixed;
  z-index: 2024;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%);
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
  opacity: 0.8;
  transition: opacity 1s;
  backdrop-filter: blur(2px);
}
</style>
