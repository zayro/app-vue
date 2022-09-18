import { constant } from '../../i18n/en'
import { http } from '../../services/http-axios'
import swal from 'sweetalert'
import { computed, ref } from 'vue'
import { useConfigStoreRef } from '@/stores/config'
import { useRouter } from 'vue-router'

export default {
  setup () {
    try {
      const txt = constant
      const title = 'Login User'
      const form = ref({ username: '', password: '' })
      const avatar = '/img/profile/avatar/user_256x256.png'
      const img = '/img/background/y-so-serious-white.png'

      const conf = useConfigStoreRef()
      const router = useRouter()
      // const route = useRoute()

      //check if both password and email have been set for enabling login button
      const validateForm = computed(() => {
        return form.value.username != '' && form.value.password != ''
      })

      const login = () => {
        const payload = {
          username: form.value.username,
          password: form.value.password
        }
        http
          .post('login', payload)
          .then((response) => {
            console.log(`:rocket: ~ .then ~ response`, response.data)
            swal('Good job!', 'You clicked the button!', 'success')
            conf.setConfig(response.data)
            router.push({ path: '/home' })
          })
          .catch((error) => {
            console.log(error)
            swal('Wrong!', 'You clicked the button!', 'error')
          })
      }

      return { login, validateForm, img, avatar, txt, title, form, conf }
    } catch (error) {
      console.log(`:rocket: ~ setup ~ error`, error)
    }
  },

  mounted () {
    console.log(`the component is now mounted.`)
    document.title = 'Login'
    document.body.style.backgroundImage = `url(${this.img})`
    document.body.style.display = ''
    document.body.style.placeItems = ''
    document.body.style.color = ''
  }
}
