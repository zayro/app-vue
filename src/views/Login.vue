<!--  import components -->
<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card elevation="2">
        <v-card-title
          :style="{ background: $vuetify.theme.themes[theme].primary }"
        >
          <span class="title font-weight-light">Login</span>
        </v-card-title>

        <v-form>
          <v-container>
            <!-- <v-row justify="space-around">
              <v-avatar color="primary" size="64">
                <v-icon x-large dark> mdi-account-circle </v-icon></v-avatar
              >
            </v-row> -->
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="form.username"
                  label="User"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-around">
              <v-col>
                <v-btn
                  color="primary"
                  :disabled="!validateForm"
                  @click="login"
                  block
                  dark
                >
                  Accept
                  <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p class="text-end">Olvido su password ?</p>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>


<script>
//import  { http} from '../services/index.js';
import axios from "axios";
import jwt from "jsonwebtoken";

import env from "../mixins/environment";

const checkToken = (tokens) => {
  const secret = `${process.env.TOKENSECRET}`;
  console.log(
    `:rocket: ~ file: Login.vue ~ line 67 ~ checkToken ~ secret`,
    secret
  );

  return jwt.verify(tokens, secret) !== "undefined";
};

export default {
  name: "Login",
  mixins: [env],
  data() {
    return {
      form: { username: "", password: "" },
    };
  },
  computed: {
    //check if both password and email have been set for enabling login button
    validateForm() {
      return this.form.username != "" && this.form.password != "";
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    login() {
      const payload = {
        username: this.form.username,
        password: this.form.password,
      };

      //post credentials and get access token from laravel backend
      axios
        .post("http://localhost:3000/api/v1/login", payload)
        .then((response) => {
          console.log(
            `:rocket: ~ file: Login.vue ~ line 107 ~ .then ~ response`,
            response
          );
          console.log(
            `:rocket: ~ file: Login.vue ~ line 107 ~ .then ~ response`,
            this.env
          );
          checkToken(response.data.token);
          //we store the access token in localstorage, so that we can use it again.
          localStorage.setItem("accessToken", response.data.access_token);

          //we also store the user permissions in localstore.
          //This is needed to implement access control.
          localStorage.setItem("userPermissions", response.data.permissions);

          //after storing token, send user to home page.
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
