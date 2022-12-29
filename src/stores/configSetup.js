import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { LocalService } from '../services/secureStorage'

const localService = new LocalService()

export const useConfigStoreRef = defineStore('config', () => {
  // NOTE -  State
  const conf = ref({})
  const getAuth = ref('Marlon Zayro Arias Vargas')

  if (localService.getJsonValue('config')) {
    const localStorage = localService.getJsonValue('config')
    console.log('%c  auth Storage', 'color: yellow; font-size: 14px', localStorage)
    conf.value = localStorage
  } else {
    console.log('%c new auth Storage', 'color: green; font-size: 14px', localStorage)
    localService.setJsonValue('config', {})
  }

  // Getters
  const getPermissions = computed(() => conf.value.data.payload.permissions)
  const getMenu = computed(() => conf.value.data.payload.menu)
  const getInformation = computed(() => conf.value.data.payload.information)

  // Actios
  function setConfig (data) {
    const info = { ...conf.value, data }
    conf.value = info
    localService.setJsonValue('config', info)
  }

  return { setConfig, getAuth, conf, getPermissions, getInformation, getMenu }
})
