<script setup>
import { computed, ref, reactive, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import swal from 'sweetalert'
import { constant } from '@/i18n/en'
import { http } from '@/services/http-axios'
import { useConfigStoreRef } from '@/stores/config'

const conf = inject('conf')

const txt = ref(constant)

const form = reactive({ username: '', password: '' })

const avatar = '/img/profile/avatar/user_256x256.png'

const storage = useConfigStoreRef()
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
      storage.setToken(response.data.token)
      router.push({ path: '/main/' })
    })
    .catch((error) => {
      console.log('🚧 - login - error:', error)
      swal('Wrong!', 'Algo salio mal!', 'error')
    })
}
const imgBody = conf.body.background.imgMain

onMounted(() => {
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'

  console.log('the component is now mounted.')
  document.title = 'Login'
  document.body.style.backgroundImage = `url(${imgBody})`
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
                  <button type="button" class="btn btn-primary" :disabled="!validateForm" @click="login">
                    {{ txt.BUTTON.login }}
                  </button>
                </div>
              </div>
              <div class="d-flex">
                <div class="p-2 flex-fill">
                  <RouterLink to="/app/recovery"
                    ><button type="button" class="form-control btn btn-link">
                      Forgot your password. ?
                    </button></RouterLink
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

<style scoped lang="scss">
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
  background: rgba(224, 224, 224, 0.6);
  color: #4e4e4e;

  padding: 40px;
  /* box-shadow: 0px 0px 40px 3px rgba(0, 0, 0, 0.24);*/
  filter: drop-shadow(2px 2px 4px rgba(230, 230, 230, 0.493));
  border-radius: 10px;
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

.input {
  padding: 14px;
  font-size: 14px;
  border-width: 1px;
  border-color: #e6e9f1;
  background-color: #fff;
  border-style: solid;
  border-radius: 5px;
  /* box-shadow: 0px 0px 3px rgba(66, 66, 66, 0.5); */
  /* text-shadow: 0px 0px 5px rgba(66, 66, 66, 0.75);*/
  /* filter: drop-shadow(1px 2px 4px grey); */
  transition: color 0.3s, border-color 0.3s;
  box-shadow: 0 0 4px rgba(20, 20, 43, 0.09);
  min-height: 45px;
  color: #4e4e4e;
  width: 100%;

  &:focus {
    outline: 1px solid #4566b9bd;
  }

  &:hover {
    border-color: #7d7e80b2;
    border-style: solid;
  }
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  opacity: 1; /* Firefox */
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
