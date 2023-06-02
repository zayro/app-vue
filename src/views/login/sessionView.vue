<script setup>
import { constant } from '@/i18n/en'
import { useRouter } from 'vue-router'
import { useConfigStoreRef } from '@/stores/config'

const txt = constant

const router = useRouter()
const store = useConfigStoreRef()

const clearSession = () => {
  // localStorage.clear()
  store.resetAll()
  router.push({ path: '/' })
}
</script>

<template>
  <div class="container animate__animated animate__pulse animate__delay-5s">
    <div class="container-login">
      <div class="card-login p-3 mb-5 rounded">
        <div class="card">
          <div class="d-flex justify-content-start align-items-center"></div>
          <div class="d-flex justify-content-center">
            <div class="div-rounded-circle">
              <v-icon name="fa-user-alt" fill="#686868" scale="5" />
            </div>
          </div>

          <div class="card-body">
            <h3 class="card-title">{{ txt.COMPONENTS.session.title }}</h3>
            <form>
              <hr />
              <div class="d-flex justify-content-around btn-space-wrapper">
                <RouterLink to="/main">
                  <button type="button" class="btn btn-primary btn-lg">CONTINUE</button>
                </RouterLink>
                <button type="button" class="btn btn-danger btn-lg" @click="clearSession()">CLOSE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css" src="./login.css" />
