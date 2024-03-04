<script setup>
import { onMounted } from 'vue'
import { constant } from '@/i18n/en'
import { useRouter } from 'vue-router'
import { useConfigStoreRef } from '@/stores/config'

const avatar = '/img/profile/avatar/user_256x256.png'

const txt = constant

const router = useRouter()
const store = useConfigStoreRef()

const clearSession = () => {
  // localStorage.clear()
  store.resetAll()
  router.push({ path: '/' })
}

const Continue = () => {
  router.push({ path: '/main' })
}

onMounted(() => {
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'

  console.log('the component is now mounted.')
  document.title = 'Session'
  // document.documentElement.style.setProperty('--animate-duration', '.9s');
})
</script>

<!-- <style scoped lang="css" src="./login.css" /> -->
<template>
  <div class="flex flex-column text-center py-6 px-4 border-round md:w-4 lg:w-6">
    <div class="text-center mb-5">
      <Avatar :image="avatar" class="mr-2" />
      <div class="text-900 text-3xl font-medium mb-3">{{ txt.COMPONENTS.session.title }}</div>
      <span class="text-600 font-medium line-height-3">Don't have an account?</span>
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
    </div>

    <div class="flex align-items-center justify-content-center gap-3 mb-3">
      <div class="flex w-full md:w-25rem">
        <Button
          type="button"
          label="Cerrar"
          severity="secondary"
          class="w-10 m-1"
          outlined
          @click="clearSession"
        ></Button>

        <Button type="button" label="Continuar" class="w-10 m-1" @click="Continue"></Button>
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
