<script setup>
import { defineEmits } from "vue";

const emit = defineEmits({
  "close-sidebar": null,
});
</script>

<template>
  <div
    id="myCanvasNav"
    class="backdrop"
    @click="emit('close-sidebar')"
    style="width: 0%; opacity: 0"
  ></div>
</template>

<style>
.backdrop {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 2030;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 47%);
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
  opacity: 0;
  transition: opacity 1s;
}
</style>
