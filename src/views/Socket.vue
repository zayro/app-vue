
<template>
  <div>
      <v-container class="">
    <h1>{{name}} {{surname}} SOCKET</h1>
      <p>There are  categories</p>

      <input type="text" v-model="name" >
      <button type="button" v-on:click="enviarSocket()" >SEND</button>

      {{message}}

   </v-container>
  </div>
</template>


<script>
// @ is an alias to /src

// ES6 import or TypeScript
import { io } from "socket.io-client";

const socket = io("http://192.168.1.3:3000");


// client-side
socket.on("connect", () => {
  console.log(socket.id); // 
});


export default {
  name: "Socket",

  mounted() {
    // fetch cards
    console.log("mounted");
  },
data: () => ({
    item: {
      title: '',
      description: '',
    },
    name: "MARLON",
    surname: "VARGAS",
    message: ""
}),
  methods: {
    enviarSocket() {
        console.log("enviando parametros");
            socket.emit("msg",  { some: 'data' });
  
    },
  },
  computed: {},
};
</script>
