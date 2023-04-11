<script setup>
import swal from 'sweetalert'

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { constant } from '@/i18n/en'
import { http } from '@/services/http-axios'

const form = ref({ username: '', password: '', email: '' })

const txt = constant

const router = useRouter()

const validateForm = computed(() => {
  return form.value.username !== '' && form.value.password !== '' && form.value.email != ''
})

const create = () => {
  const payload = {
    username: form.value.username,
    password: form.value.password,
    email: form.value.email
  }
  http
    .post('new/user', payload)
    .then((response) => {
      console.log(':rocket: ~ .then ~ response', response.data)
      swal('Good job!', 'You clicked the button!', 'success')

      router.push({ path: '/login' })
    })
    .catch((error) => {
      console.log(error)
      swal('Wrong!', 'You clicked the button!', 'error')
    })
}
</script>

<template>
  <div class="container no-overflow">
    <div class="container-login animate__animated animate__pulse animate__delay-5s">
      <div class="card-login p-3 mb-5 rounded">
        <div class="card">
          <div class="d-flex justify-content-start align-items-center">
            <RouterLink to="/app/login">
              <div>
                <v-icon name="md-keyboardbackspace" fill="#686868" title="Back Home" scale="2" />
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
            <form @submit="create">
              <div class="form-group">
                <label>Email address</label>
                <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text input-icon">
                    <v-icon name="md-email-round" fill="#686868" scale="1.5" />
                  </span>
                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    name="username"
                    class="input"
                    placeholder="Type email"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Username</label>
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
                    placeholder="Type username"
                    required
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
                    placeholder="Type password"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-secondary" :disabled="!validateForm">
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

<style scoped lang="css" src="./login.css" />
