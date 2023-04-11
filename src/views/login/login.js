import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import swal from 'sweetalert'
import { constant } from '@/i18n/en'
import { http } from '@/services/http-axios'
import { useConfigStoreRef } from '@/stores/config'
import JwtService from '@/services/jwt'

export default {
  setup () {
    try {
      const jwt = new JwtService()
      const txt = constant
      const title = 'Login User'
      const form = ref({ username: '', password: '' })

      const avatar = '/img/profile/avatar/user_256x256.png'

      const conf = useConfigStoreRef()
      const router = useRouter()

      // check if both password and email have been set for enabling login button
      const validateForm = computed(() => {
        return form.value.username !== '' && form.value.password !== ''
      })

      const login = () => {
        const payload = {
          username: form.value.username,
          password: form.value.password
        }
        http
          .post('login', payload)
          .then((response) => {
            swal('Good job!', 'Welcome to App!', 'success')
            jwt.setToken(response.data.token)
            conf.setConfig(jwt.getTokenDecode())
            console.log('🚧 - .then - jwt.getTokenDecode():', jwt.getTokenDecode())
            router.push({ path: '/home' })
          })
          .catch((error) => {
            console.log(error)
            swal('Wrong!', 'Somthing is Wrong!', 'error')
          })
      }

      return { login, validateForm, avatar, txt, title, form, conf }
    } catch (error) {
      console.log(':rocket: ~ setup ~ error', error)
    }
  }
}
