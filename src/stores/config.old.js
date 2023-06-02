import { defineStore } from 'pinia'

import { LocalService } from '@/services/EncryptStorage'
import JwtService from '@/services/jwt'

const jwt = new JwtService()
const localService = new LocalService()

/**
 * Conf User
 */

let confDefault = jwt.getTokenDecode() || {}
console.log('🚧 - confDefault:', confDefault)
console.log("🚧 - localService.getJsonValue('config'):", localService.getJsonValue('config'))
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

/**
 * Conf App
 */

let AppDefault = {
  colorNavBackground: '#b0b0b0',
  colorNavText: '#4e4e4e',
  backgroundSidenav: '#ffffff',
  backgroundImageSidenav: '',
  colorSidenav: '#000000'
}

if (localService.getJsonValue('app')) {
  const localStorage = localService.getJsonValue('app')
  AppDefault = localStorage
} else {
  localService.setJsonValue('app', {})
}

export const useAppStoreRef = defineStore('app', {
  state: () => ({ conf: AppDefault }),
  getters: {
    getBackgroundImageSidenav: (state) => state.conf.backgroundImageSidenav || '',
    getBackgroundSidenav: (state) => state.conf.backgroundSidenav || '',
    getColorSidenav: (state) => state.conf.colorSidenav || ''
  },
  actions: {
    setConfig (data) {
      console.log('🚧 - setConfig - data', data)
      this.conf = { ...this.conf, ...data }
      localService.setJsonValue('app', this.conf)
    }
  }
})
