<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import swal from 'sweetalert'

import { http } from '@/services/http-axios'
import { useConfigStoreRef } from '@/stores/config'

import imgBodyBackGround from '@/assets/img/background/pattern5_black.png'

const visible = ref(false)

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
      console.log('🚧 - .then - response:', response)
      conf.setToken(response.data.data.token)
      console.log('🚧 - .then - response.data.token:', response.data.data.token)
      console.log(conf.token, 'getToken')
      router.push({ path: '/main/' })
      swal('Ingreso Exitoso!', 'Bienvenido App!', 'success')
    })
    .catch((error) => {
      console.log('🚧 - login - error:', error)
      swal('Wrong!', 'Algo salio mal!', 'error')
    })
}

onMounted(() => {
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'

  document.body.style.backgroundImage = `url(${imgBodyBackGround})`

  console.log('the component is now mounted.')
  document.title = 'Login'
  // document.documentElement.style.setProperty('--animate-duration', '.9s');
})
</script>

<template>
  <div class="flex align-items-center justify-content-between flex-column h-screen">
    <div class="flex align-items-center justify-content-center h-full w-full">
      <div class="flex flex-column text-center py-6 px-4 border-round md:w-4 lg:w-6">
        <div class="text-center mb-5">
          <Avatar :image="avatar" class="mr-2" />
          <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span class="text-600 font-medium line-height-3">Don't have an account?</span>
          <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
        </div>

        <div class="flex align-items-center justify-content-center gap-3 mb-3">
          <IconField icon-position="left" class="w-full md:w-25rem">
            <InputIcon id="username" class="pi pi-user"> </InputIcon>
            <InputText
              v-model.trim="form.username"
              type="text"
              class="flex-auto w-full"
              placeholder="Username"
              variant="filled"
            />
          </IconField>
        </div>

        <div class="flex align-items-center justify-content-center gap-3 mb-3">
          <IconField icon-position="left" class="w-full md:w-25rem">
            <InputIcon class="pi pi-lock"> </InputIcon>
            <InputText
              v-model.trim="form.password"
              type="password"
              class="flex-auto w-full"
              placeholder="Password"
              variant="filled"
            />
          </IconField>
        </div>

        <div class="flex align-items-center justify-content-center gap-3 mb-3">
          <div class="flex w-full md:w-25rem">
            <Button type="button" label="Sign Up" class="w-full" :disabled="!validateForm" @click="login"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped="css">
.p-avatar {
  width: 120px;
  height: 120px;
}

body {
  backdrop-filter: blur(2px);
}
</style>
