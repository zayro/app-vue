<script setup>
import swal from 'sweetalert'
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { constant } from '@/i18n/en'
import { http } from '@/services/http-axios'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

const avatar = '/img/profile/avatar/user_256x256.png'

const schema = yup.object({
  email: yup.string().required().email().label('Email address'),
  username: yup.string().required().label('Username'),
  password: yup.string().required().min(6).label('Password'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required()
    .label('Password confirmation')
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit((values) => {
  console.log('Submitted with', values)
})

const form = reactive({ username: '', password: '', email: '', repeat: '' })

const txt = constant

const router = useRouter()

const goRouteLogin = () => {
  router.push({ name: 'default' })
}

const validateForm = computed(() => {
  return form.password !== '' && form.email !== ''
})

const create = () => {
  const payload = {
    username: form.username,
    password: form.password,
    email: form.email
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
  <div class="flex flex-column text-center py-6 px-4 border-round md:w-4 lg:w-6">
    <div class="text-center mb-5">
      <Avatar :image="avatar" class="mr-2" />
      <div class="text-900 text-3xl font-medium mb-3">Recovery Password</div>
      <span class="text-600 font-medium line-height-3">User</span>
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Let's get started</a>
    </div>
    <form id="createUser" name="createUser" autocomplete="on" @submit="onSubmit">
      <!-- Email -->

      <div class="flex flex-column align-items-center justify-content-center gap-2 mb-3">
        <IconField icon-position="left" class="w-full md:w-25rem">
          <InputIcon id="email" class="pi pi-envelope"> </InputIcon>
          <InputText
            v-model.trim="email"
            type="email"
            class="flex-auto w-full"
            placeholder="Email"
            variant="filled"
            aria-describedby="email-help"
          />
        </IconField>
        <small v-if="errors.email" id="email-help" class="p-error">{{ errors.email }}</small>
      </div>

      <!-- Password -->

      <div class="flex flex-column align-items-center justify-content-center gap-2 mb-3">
        <IconField icon-position="left" class="w-full md:w-25rem">
          <InputIcon class="z-2">
            <InputIcon class="pi pi-lock"> </InputIcon>
          </InputIcon>
          <Password v-model="password" placeholder="New Password" class="flex-auto w-full" variant="filled" toggle-mask>
            <template #header>
              <h6>Pick a password</h6>
            </template>
            <template #footer>
              <Divider />
              <p class="mt-2">Suggestions</p>
              <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </Password>
        </IconField>
        <small v-if="errors.password" id="email-help" class="p-error">{{ errors.password }}</small>
      </div>

      <!-- Repeat -->

      <div class="flex flex-column align-items-center justify-content-center gap-2 mb-3">
        <IconField icon-position="left" class="w-full md:w-25rem">
          <InputIcon class="z-2">
            <InputIcon class="pi pi-lock"> </InputIcon>
          </InputIcon>
          <Password
            v-model="passwordConfirm"
            class="w-full"
            placeholder="Repeat Password"
            variant="filled"
            :feedback="false"
            toggle-mask
          />
        </IconField>
        <small v-if="errors.passwordConfirm" id="email-help" class="p-error">{{ errors.passwordConfirm }}</small>
      </div>

      <div class="flex align-items-center justify-content-center gap-2 mb-3">
        <div class="flex w-full md:w-25rem">
          <Button type="submit" label="Sign Up" class="w-full"></Button>
        </div>
      </div>
    </form>
  </div>
</template>
<style>
.p-avatar {
  width: 120px;
  height: 120px;
}

.p-password-input {
  width: 25rem;
  padding-left: 2.5rem;
}

body {
  backdrop-filter: blur(2px);
}
</style>
