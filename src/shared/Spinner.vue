<script>
export default {
  props: {
    load: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    console.log('Spinner ', props.load)
  }
}
</script>

<template>
  <div v-if="load" class="backdrop">
    <div class="center-div">
      <div class="spinner"></div>
      <div class="text-white">Cargando</div>
    </div>
  </div>
</template>

<style lang="css">
/**
* Spinner Loading
*/

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
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
  z-index: 100;
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
