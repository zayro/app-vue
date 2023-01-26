// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

/* var token = "eyJ0eXAiO.../// jwt token";
var decoded = jwt_decode(token);

console.log(decoded);
 */

export default class JwtService {
  /**
   * Obtine el token almacenado
   */
  getToken () {
    if (localStorage.getItem('accessToken')) {
      return localStorage.getItem('accessToken')
    } else {
      return null
    }
  }

  /**
   * Almacena el token almacenado
   */
  setToken (token) {
    localStorage.setItem('accessToken', token)
  }

  /**
   * Valida el tiempo del token almacenado
   */
  getTokenExpirationDate () {
    try {
      if (this.getToken() === null) {
        return null
      } else {
        const decoded = jwt_decode(this.getToken())

        if (decoded.exp === undefined) {
          return null
        }

        const date = new Date(0)
        date.setUTCSeconds(decoded.exp)

        console.info('Token decoded :: ', decoded)
        console.info('Token decoded.exp :: ', decoded.exp)
        console.info('Time Created Token :: ', new Date(decoded.iat * 1000).toLocaleString())
        console.info('Time Expire Token :: ', new Date(decoded.exp * 1000).toLocaleString())
        console.info('Time Actually :: ', new Date(Date.now()).toLocaleString())
        console.info('date.getTime()  >  new Date().getTime():: ', date.getTime(), new Date().getTime())
        return date
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Valida el tiempo del token almacenado
   */
  getTokenDecode () {
    try {
      if (this.getToken() === null) {
        return null
      } else {
        const decoded = jwt_decode(this.getToken())

        return decoded
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Valida el token ha caducado
   */
  isTokenExpired () {
    const date = this.getTokenExpirationDate()
    if (date === null || date === undefined || typeof date === 'undefined') {
      return true
    }

    const expired = date.valueOf() > new Date().valueOf()
    return !expired
  }

  /**
   * Valida el token almacenado
   */
  isTokenValid () {
    const date = this.getTokenExpirationDate()
    if (date === null || date === undefined || typeof date === 'undefined') {
      return false
    }
    return date.valueOf() > new Date().valueOf()
  }
}
