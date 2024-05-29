import { ref } from 'vue'
import swal from 'sweetalert'
import { http } from '@/services/http-axios'
import { useConfigStoreRef } from '@/stores/config'
import { useRouter } from 'vue-router'

export function useFetchUser () {
  const conf = useConfigStoreRef()
  const router = useRouter()
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchLogin (form) {
    isLoading.value = true
    try {
      const payload = {
        username: form.username,
        password: form.password
      }
      http
        .post('user/auth', payload)
        .then((response) => {
          console.log('🚧 - .then - response:', response)
          conf.setToken(response.data.access_token)
          console.log('🚧 - .then - response.data.token:', response.data.access_token)
          console.log(conf.token, 'getToken')
          router.push({ path: '/main/' })
          swal('Ingreso Exitoso!', 'Bienvenido App!', 'success')
        })
        .catch((error) => {
          console.log('🚧 - login - error:', error)
          swal('Wrong!', 'Algo salio mal!', 'error')
        })
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    fetchLogin
  }
}
