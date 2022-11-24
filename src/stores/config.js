import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { LocalService } from '../services/secureStorage'

const instance = new LocalService()

export const useConfigStoreRef = defineStore('config', () => {
  // NOTE - BroadcastChannel

  let authChannel
  if ('BroadcastChannel' in self) {
    // BroadcastChannel API supported!
    authChannel = new BroadcastChannel('auth')
  }

  // NOTE -  State

  const conf = ref({})

  if (instance.getJsonValue('config')) {
    const localStorage = instance.getJsonValue('config')
    console.log('%c  auth Storage', 'color: yellow; font-size: 14px', localStorage)
    authChannel.postMessage(localStorage)
    conf.value = localStorage
  } else {
    console.log('%c new auth Storage', 'color: green; font-size: 14px', localStorage)
    instance.setJsonValue('config', {})
  }

  const count = ref(0)
  const auth = ref('Marlon Zayro Arias Vargas')

  // Getters
  const doubleCount = computed(() => count.value * 2)

  // Actios
  function increment () {
    count.value++
  }

  function setConfig (data) {
    const info = { ...conf.value, data }
    console.log(':rocket: ~ setConfig ~ info', info)
    conf.value = info
    instance.setJsonValue('config', info)
    authChannel.postMessage(info)
  }

  return { auth, conf, setConfig, count, doubleCount, increment }
})
