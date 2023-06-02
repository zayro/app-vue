<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import swal from 'sweetalert'
import { constant } from '@/i18n/en'
import { http } from '@/services/http-axios'
import { useConfigStoreRef } from '@/stores/config'

import imgDark from '@/assets/img/background/congruent_outline.png'
import imgLight from '@/assets/img/background/y-so-serious-white.png'

const txt = ref(constant)

const form = reactive({ username: '', password: '' })

const avatar = '/img/profile/avatar/user_256x256.png'

const conf = useConfigStoreRef()
const router = useRouter()

// check if both password and email have been set for enabling login button
const validateForm = computed(() => {
  return form.username !== '' && form.password !== ''
})

const login = () => {
  const payload = {
    username: form.username,
    password: form.password
  }
  http
    .post('login', payload)
    .then((response) => {
      swal('Ingreso Exitoso!', 'Bienvenido App!', 'success')
      conf.setToken(response.data.token)
      router.push({ path: '/main/' })
    })
    .catch((error) => {
      console.log('🚧 - login - error:', error)
      swal('Wrong!', 'Algo salio mal!', 'error')
    })
}

onMounted(() => {
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.body.style.backgroundImage = `url(${imgDark})`
  } else {
    // Viewport is greater than 700 pixels wide
    document.body.style.backgroundImage = `url(${imgLight})`
  }
  console.log('the component is now mounted.')
  document.title = 'Login'
  // document.documentElement.style.setProperty('--animate-duration', '.9s');
})
</script>

<template>
  <div class="container">
    <div class="container-login">
      <div class="card-login p-3 mb-5 rounded">
        <div class="card animate__animated animate__face animate__delay-5s">
          <img :src="avatar" alt="..." class="card-img-login" width="150" />

          <div class="card-body">
            <h3 class="card-title">Welcome, let's get started!</h3>
            <form>
              <div class="form-group">
                <label>Email address</label>
                <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text input-icon">
                    <v-icon name="fa-user-alt" fill="#686868" scale="1.5" />
                  </span>
                  <input
                    id="username"
                    v-model.trim="form.username"
                    type="text"
                    name="username"
                    class="input"
                    placeholder="Type email"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Password </label>
                <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text input-icon">
                    <v-icon name="md-password" fill="#686868" scale="1.5" />
                  </span>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    name="password"
                    class="input"
                    autocomplete="on"
                    placeholder="Type email"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="d-grid gap-2">
                  <button type="button" class="btn btn-secondary" :disabled="!validateForm" @click="login">
                    {{ txt.BUTTON.login }}
                  </button>
                </div>
              </div>
              <div class="d-flex">
                <div class="p-2 flex-fill">
                  <RouterLink to="/app/recovery"
                    ><button type="button" class="form-control btn btn-link">Forgot your password ?</button></RouterLink
                  >
                </div>
                <div class="p-2 flex-fill">
                  <RouterLink to="/app/createUser">
                    <button type="button" class="form-control btn btn-outline-primary">Sign Up</button></RouterLink
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@import 'animate.css';
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');

/*   font-family: 'Roboto', sans-serif; */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  margin: 0 0 20px 0;
  padding: 0;
}

.container-login {
  margin: 0 auto;
  font-family: 'Open Sans', sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
}

.card {
  background: rgba(255, 255, 255, 0.6);
  color: #4e4e4e;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.774) 0%,
    rgba(246, 246, 246, 0.692) 47%,
    rgba(237, 237, 237, 0.589) 100%
  );

  padding: 40px;

  box-shadow: 0px 0px 40px 3px rgba(0, 0, 0, 0.24);

  border-radius: 20px 20px 20px 20px;

  border: 1px solid #b4b4b4;
}

.card-login {
  margin: 0 auto;
}

.card-img-login {
  margin: 0 auto;
  left: 50%;
  padding: 10px;
}

.card-title {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 3px;
  text-transform: capitalize;
}

.input-icon {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 5px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: solid grey 1px;
  background: none;
}

.input {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
}

.input:focus {
  border-bottom-style: dotted;
  outline: none;
}

@media (prefers-color-scheme: light) {
  .input {
    border-radius: 5px;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: solid grey 1px;
    /*background:rgba(246, 246, 246, 0.50);*/
    background: none;
    height: 50px;
    color: #4e4e4e;
  }
}

@media (prefers-color-scheme: dark) {
  .input {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: solid grey 1px;
    /*background:rgba(246, 246, 246, 0.50);*/
    background: none;
    height: 50px;
    color: #4e4e4e;
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    opacity: 1; /* Firefox */
  }
}

.div-rounded-circle {
  background-color: aliceblue;
  border-radius: 50%;
  padding: 20px;
}

button {
  text-transform: capitalize;
  font-size: 15px;
}

.no-overflow {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
