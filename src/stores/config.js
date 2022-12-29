import { defineStore } from 'pinia'

import { LocalService } from '../services/secureStorage'

const localService = new LocalService()

let confDefault = {}

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
    getPermissions: (state) => state.conf.data.payload.permissions || {},
    getMenu: (state) => state.conf.data.payload.menu || {},
    getInformation: (state) => state.conf.data.payload.information || {}
  },
  actions: {
    setConfig (data) {
      const info = { ...this.conf, data }
      this.conf = info
      localService.setJsonValue('config', info)
    }
  }
})
