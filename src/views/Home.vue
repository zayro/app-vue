<!--  import components -->
<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js App :D" />
    <p>{{ user }}</p>
  </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  computed: {
    ...mapState(["user"]),
  },
  create() {
    //this.author = store.state.count;
  },
};
</script>
