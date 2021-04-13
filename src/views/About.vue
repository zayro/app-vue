
<template>
  <div>
    <h1>Create Event {{ user.name }}</h1>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">
        {{ cat }}
      </li>
    </ul>
    <p>
      {{ getEventById(3) }}
    </p>

    <button v-on:click="createEvent('valor')">llenar</button>

    <hr />

    {{ doneToDos }}

    <hr />
  </div>
</template>


<script>
// @ is an alias to /src

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "About",
  mounted() {
    // fetch cards
    console.log("mounted");
  },
  methods: {
    ...mapActions(["createEvent"]),
  },
  computed: {
    ...mapState(["user", "categories"]),
    ...mapGetters(["getEventById", "catLength", "doneToDos"]),
  },
};
</script>