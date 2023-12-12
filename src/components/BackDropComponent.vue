<script setup></script>

<template>
  <div id="myCanvasNav" class="backdrop"></div>
</template>

<style>
.backdrop {
  height: 100vh;
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
