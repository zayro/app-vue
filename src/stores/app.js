import { defineStore } from 'pinia'

import { LocalService } from '../services/secureStorage'

const localService = new LocalService()

let confDefault = {
  colorNavBackground: '#b0b0b0',
  colorNavText: '#4e4e4e',
  backgroundSidenav: '#ffffff',
  backgroundImageSidenav: '',
  colorSidenav: '#000000'
}

if (localService.getJsonValue('app')) {
  const localStorage = localService.getJsonValue('app')
  confDefault = localStorage
} else {
  localService.setJsonValue('app', {})
}

export const useAppStoreRef = defineStore('app', {
  state: () => ({ conf: confDefault }),
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
