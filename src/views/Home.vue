<!--  import components -->
<template>   
    <div>
    <HelloWorld msg="Welcome to Your Vue.js App :D" />
  </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
   create() {
        //this.author = store.state.count;
    }
};
</script>