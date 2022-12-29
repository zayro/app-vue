<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits({
  'close-sidebar': null
})

const props = defineProps({
  backgroundSidenav: {
    type: String,
    default: '#b0b0b0'
  },
  colorSidenav: {
    type: String,
    default: '#000000'
  }
})
</script>
<template>
  <div id="mySidenav" class="sidenav">
    <div class="sidenav-content">
      <span class="closebtn" @click="emit('close-sidebar')">&times;</span>
      <hr />
      <a href="#" class="sidenav-link"> <span class="text-white">About</span> </a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
  </div>
</template>

<style scoped>
.sidenav-content {
  overflow-x: hidden;
  height: 100%;
  transition: 0.5s;
  /* filter: sepia(60%); */
  height: 100vh;
  opacity: 0.8;
  background-color: v-bind('props.colorSidenav');
  color: #ffffff;
}

.sidenav {
  overflow: hidden;
  height: 100%;
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  background-image: v-bind('props.backgroundSidenav');
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

.sidenav-link {
  background: hsla(0, 0%, 100%, 0.23);
  color: white;
  border-radius: 10px;
  margin: 0px 3px 0px 3px;
}

#mySidenav {
  width: 0%;
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
