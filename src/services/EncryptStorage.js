import { EncryptStorage } from 'encrypt-storage'

const SECRET_KEY_STORAGE = 'my secret key'

export class LocalService {
  // secureStorage = "demo"
  constructor () {
    this.secureStorage = new EncryptStorage(SECRET_KEY_STORAGE, {})
  }

  // Set the json data to local
  setJsonValueDefault (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // Set the json data to local
  getJsonValueDefault (key) {
    return JSON.parse(window.localStorage.getItem(key))
  }

  // Get the json value from local
  setJsonValue (key, value) {
    this.secureStorage.encryptValue(key, value)
  }

  // Clear the local
  getJsonValue (key) {
    return this.secureStorage.decryptValue(key) ? this.secureStorage.decryptValue(key) : false
  }

  clearAll () {
    return this.secureStorage.clear()
  }

  removeItem (item) {
    this.secureStorage.removeItem(item)
  }
}

export default LocalService
