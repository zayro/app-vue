import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import swal from 'sweetalert'
import { constant } from '@/i18n/en'
import { http } from '@/services/http-axios'
import { useConfigStoreRef } from '@/stores/config'

export default {
  setup () {
    try {
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
            swal('Ingreso Exitoso!', 'Bienvenido App!', 'success')
            conf.setToken(response.data.token)
            router.push({ path: '/main/' })
          })
          .catch((error) => {
            console.log('🚧 - login - error:', error)
            swal('Wrong!', 'Algo salio mal!', 'error')
          })
      }

      return { login, validateForm, avatar, txt, title, form, conf }
    } catch (error) {
      console.log('🚧 - setup - error:', error)
    }
  }
}
