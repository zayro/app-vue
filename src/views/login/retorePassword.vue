<script setup>
import { constant } from "../../i18n/en";
import { computed, ref, onMounted } from "vue";

onMounted(() => {
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "hidden";
});

const form = ref({ username: "" });

const txt = constant;

// const avatar = "/img/profile/avatar/user_256x256.png";

const imgDark = "/img/background/congruent_outline.png";
const imgLight = "/img/background/y-so-serious-white.png";

const validateForm = computed(() => {
  return form.value.username != "";
});

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.style.backgroundImage = `url(${imgDark})`;
} else {
  // Viewport is greater than 700 pixels wide
  document.body.style.backgroundImage = `url(${imgLight})`;
}
</script>

<template>
  <div class="container no-overflow" id="body">
    <div class="container-login animate__animated animate__pulse animate__delay-5s">
      <div class="card-login p-3 mb-5 rounded">
        <div class="card">
          <div class="d-flex justify-content-start align-items-center">
            <RouterLink to="/login">
              <div>
                <v-icon
                  name="md-keyboardbackspace"
                  fill="#686868"
                  title="Back Home"
                  scale="2"
                />
              </div>
            </RouterLink>

            <!-- <RouterLink to="/login"><span class="align-middle">Back Home</span></RouterLink>
 -->
          </div>
          <div class="d-flex justify-content-center">
            <div class="div-rounded-circle">
              <v-icon name="fa-user-alt" fill="#686868" scale="3" />
            </div>
          </div>

          <div class="card-body">
            <h3 class="card-title">{{ txt.COMPONENTS.recoveryPass.title }}</h3>
            <form>
              <div class="form-group">
                <label>Email address</label>
                <div class="input-group mb-3">
                  <span class="input-group-text input-icon" id="basic-addon1">
                    <v-icon name="md-email-round" fill="#686868" scale="1.5" />
                  </span>
                  <input
                    type="email"
                    v-model.trim="form.username"
                    name="username"
                    class="input"
                    placeholder="Type email"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    :disabled="!validateForm"
                    @click="login"
                  >
                    {{ txt.BUTTON.send }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css" src="./login.css"></style>

<style scoped>
#body {
  width: calc(100%);
  height: 98vh;
}
</style>
