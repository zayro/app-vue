import { defineStore } from 'pinia'

import { LocalService } from '@/services/secureStorage'
import JwtService from '@/services/jwt'

const jwt = new JwtService()
const localService = new LocalService()

let confDefault = jwt.getTokenDecode() || {}
console.log('🚧 - confDefault:', confDefault)

if (localService.getJsonValue('config')) {
  const localStorage = localService.getJsonValue('config')
  console.log('%c  auth Storage', 'color: yellow; font-size: 14px', localStorage)
  confDefault = localStorage
} else {
  console.log('%c new auth Storage', 'color: green; font-size: 14px', localStorage)
  localService.setJsonValue('config', {})
}

export const useConfigStoreRef = defineStore('config', {
  state: () => ({ conf: confDefault, author: 'Marlon Zayro Arias Vargas' }),
  getters: {
    getPermissions: (state) => state.conf.data.permissions || {},
    getMenu: (state) => state.conf.data.menu || {},
    getInformation: (state) => state.conf.data.information || {}
  },
  actions: {
    setConfig (data) {
      const info = { ...this.conf, data }
      this.conf = info
      localService.setJsonValue('config', info)
      console.log('🚧 - setConfig - info:', info)
    }
  }
})
