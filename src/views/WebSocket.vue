
<template>
  <div>
    <v-container class="">
      <h1>{{ name }} {{ surname }} WEB SOCKET</h1>
      <p>There are categories</p>

        <input type="text" v-model="room" />
      <input type="text" v-model="message" />
      <button type="button" v-on:click="enviarSocket()">SEND</button>

      <hr>

      {{ message }}
    </v-container>
  </div>
</template>


<script>
// @ is an alias to /src

// ES6 import or TypeScript

export default {
  name: "Websocket",

  mounted() {
    // fetch cards
    console.log("mounted");
  },
  created: function () {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://192.168.1.3:3000/game");

    // Connection opened
    this.connection.addEventListener("open", (event) => {
   

      //this.connection.send(  JSON.stringify({  join: "beta", room: "beta", msg: "web VUE" }) );
      this.connection.send(  JSON.stringify({  join: "beta"}) );
      this.connection.send(  JSON.stringify({  room: "beta", msg: "web VUE" }) );
      console.log(event);
    });

    // Escucha por mensajes
    this.connection.addEventListener("message", function (event) {
      console.log("Message from server", event.data);
      this.message = event.data;
      
    });

    this.connection.onerror = function (event) {
      console.log(event);
    };

    this.connection.onmessage = function (event) {
      console.log(event);
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };
  },
  data: () => ({
    item: {
      title: "",
      description: "",
    },
    name: "MARLON",
    surname: "VARGAS",
    room: "",
    message: "",
  }),
  methods: {
    enviarSocket() {
      console.log("enviando parametros");
      this.connection.send(JSON.stringify({room: this.room, msg: this.message}))
    },
  },
  computed: {},
};
</script>
