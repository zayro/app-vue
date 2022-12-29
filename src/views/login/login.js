import { constant } from '../../i18n/en'
import { http } from '../../services/http-axios'
import swal from 'sweetalert'
import { computed, ref } from 'vue'
import { useConfigStoreRef } from '@/stores/config'
import { useRouter } from 'vue-router'
import JwtService from '@/services/jwt'

export default {
  setup () {
    try {
      const jwt = new JwtService()
      const txt = constant
      const title = 'Login User'
      const form = ref({ username: '', password: '' })
      const avatar = '/img/profile/avatar/user_256x256.png'
      const imgDark = '/img/background/congruent_outline.png'
      const imgLight = '/img/background/y-so-serious-white.png'

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
            conf.setConfig(response.data)
            jwt.setToken(response.data.token)
            router.push({ path: '/home' })
          })
          .catch((error) => {
            console.log(error)
            swal('Wrong!', 'Somthing is Wrong!', 'error')
          })
      }

      return { login, validateForm, imgDark, imgLight, avatar, txt, title, form, conf }
    } catch (error) {
      console.log(':rocket: ~ setup ~ error', error)
    }
  },

  mounted () {
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'hidden'

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.style.backgroundImage = `url(${this.imgDark})`
    } else {
      // Viewport is greater than 700 pixels wide
      document.body.style.backgroundImage = `url(${this.imgLight})`
    }
    console.log('the component is now mounted.')
    document.title = 'Login'
    // document.documentElement.style.setProperty('--animate-duration', '.9s');
  }
}
