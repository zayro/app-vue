
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
    <br />
    <button v-on:click="userAdd({ field: 'autot', value: 'payload' })">autor</button>
    <br />
    <button v-on:click="userDelete({ field: 'autot' })">delete</button>
    <hr />

    {{ doneToDos }}

    <hr />
  </div>
</template>


<script>
// @ is an alias to /src

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "About",
  mounted() {
    // fetch cards
    console.log("mounted");
  },
  methods: {
    ...mapActions(["createEvent"]),
    ...mapMutations(["ADD_EVENT", "userAdd", "userDelete"]),
  },
  computed: {
    ...mapState(["user", "categories"]),
    ...mapGetters(["getEventById", "catLength", "doneToDos"]),
  },
};
</script>
