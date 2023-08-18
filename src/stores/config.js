import { defineStore } from 'pinia'
import { EncryptStorage } from 'encrypt-storage'

const SECRET_KEY_STORAGE = 'my secret key'

const encryptStorage = new EncryptStorage(SECRET_KEY_STORAGE, {})

const CryptStorage = {
  setItem (key, state) {
    return encryptStorage.setItem(key, state)
  },
  getItem (key) {
    return JSON.stringify(encryptStorage.getItem(key))
  }
}

/**
 * Conf User
 */

export const useConfigStoreRef = defineStore('conf', {
  state: () => ({ conf: {}, author: 'Marlon Zayro Arias Vargas', token: '' }),
  getters: {
    getPermissions: (state) => state?.conf?.permissions || {},
    getMenu: (state) => state?.conf?.menu || {},
    getInformation: (state) => state?.conf?.information || {},
    getToken: (state) => state?.token || null
  },
  actions: {
    setConfig (data) {
      // this.conf = { ...this.conf, data }
      this.conf = data
    },
    setToken (value) {
      this.token = value
    },

    resetAll () {
      this.conf = {}
      this.token = null
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: CryptStorage, paths: ['conf'] },
      { key: 'accessToken', storage: localStorage, paths: ['token'] },
      { key: 'author', storage: sessionStorage, paths: ['author'] }
    ]
    // strategies: [{ storage: localStorage, paths: ['conf', 'author',  'token'] }]
  }
})

/**
 * Conf App
 */

const AppDefault = {
  colorNavBackground: '#b0b0b0',
  colorNavText: '#4e4e4e',
  colorIconNav: '#4e4e4e',
  backgroundSidenav: '#ffffff',
  backgroundImageSidenav: '',
  colorSidenav: '#000000'
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
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
})

const defaultState = {
  foo: 'bar'
}

export const useFoo = defineStore('foo', {
  state: () => ({ ...defaultState }),
  actions: {
    reset () {
      Object.assign(this, defaultState)
    }
  }
})
