<script>
export default {
  props: {
    load: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    console.log(props.load);
  },
};
</script>

<template>
  <div class="backdrop" v-if="load">
    <div class="center-div">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style lang="css" scoped>
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
  /*
  display: flex;
  justify-content: center;
  align-items: center;
  */
}

.center-div {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}
</style>
