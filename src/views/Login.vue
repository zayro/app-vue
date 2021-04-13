<!--  import components -->
<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card elevation="2">
        <v-card-title :style="{background: $vuetify.theme.themes[theme].primary}" >
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
                  v-model="username"
                  label="User"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="password"
                  label="Password"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-around">
              <v-col>
                <v-btn color="primary" block dark>
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
export default {
  name: "Login",
    computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>