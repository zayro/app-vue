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
    .label('Password confirmation'),
  terms: yup.boolean().required().isTrue('You must agree to terms and conditions').label('terms agreement')
})

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema
})

const [username] = defineField('username')
const [email] = defineField('email')
const [password] = defineField('password')
const [passwordConfirm] = defineField('passwordConfirm')
const [terms] = defineField('terms')

// const form = reactive({ username: '', password: '', email: '', repeat: '' })

const router = useRouter()

const goRouteLogin = () => {
  router.push({ name: 'default' })
}

const create = (values) => {
  http
    .post('user/new', values)
    .then((response) => {
      console.log(':rocket: ~ .then ~ response', response.data)
      swal('Recovery Pass!', 'Su cuenta se ha creado!', 'success')

      router.push({ path: '/' })
    })
    .catch((error) => {
      console.log(error)
      swal('Wrong!', 'You clicked the button!', 'error')
    })
}

const onSubmit = handleSubmit((values) => {
  console.log('Submitted with', values)
  create(values)
})
</script>

<template>
  <div class="flex flex-column text-center py-6 px-4 border-round md:w-4 lg:w-6">
    <div class="text-center mb-5">
      <Avatar :image="avatar" class="mr-2" />
      <div class="text-900 text-3xl font-medium mb-3">Create New User</div>
      <span class="text-600 font-medium line-height-3">Register</span>
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="goRouteLogin()">Go back to Login</a>
    </div>
    <form id="createUser" name="createUser" autocomplete="on" @submit="onSubmit">
      <div class="flex flex-column align-items-center justify-content-center gap-2 mb-3">
        <IconField icon-position="left" class="w-full md:w-25rem">
          <InputIcon id="username" class="pi pi-user"> </InputIcon>
          <InputText
            v-model.trim="username"
            type="text"
            class="flex-auto w-full"
            placeholder="Username"
            variant="filled"
            aria-describedby="username-help"
          />
        </IconField>
        <small v-if="errors.username" aria-describedby="username-help" class="p-error">{{ errors.username }}</small>
      </div>

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
          <Password v-model="password" placeholder="Password" class="flex-auto w-full" variant="filled" toggle-mask>
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

      <!-- Termins -->

      <div class="flex align-items-center justify-content-center gap-2 mb-3">
        <Checkbox v-model="terms" :binary="true" />
        <label for="checkbox" class="text-900 font-medium"> I have read the</label>
        <a class="text-600 cursor-pointer hover:text-primary cursor-pointer">Terms and Conditions</a>
      </div>

      <div class="flex align-items-center justify-content-center gap-2 mb-3">
        <div class="flex w-full md:w-25rem">
          <Button type="submit" label="Sign Up" class="w-full"></Button>
        </div>
      </div>

      <div class="flex align-items-center justify-content-center gap-2 mb-3">
        <span class="font-medium text-600"
          >Already have an account?
          <a
            class="font-semibold cursor-pointer text-900 hover:text-primary transition-colors transition-duration-300"
            @click="goRouteLogin()"
          >
            Login
          </a>
        </span>
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
