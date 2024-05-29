import router from '@/router/index'

/**
 * Services
 */

import { JwtDecodeToken } from '@/services/jwt'
import { ConnectWebSocket } from '@/services/websocket'

/**
 * Storage
 */

import { useConfigStoreRef } from '@/stores/config'

const socket = new ConnectWebSocket()

let ws = null

/**
 * Valid Auth
 */

router.beforeEach((to, from, next) => {
  try {
    const store = useConfigStoreRef()

    console.log('🚧 - router.beforeEach - store:  --->', store)

    const instance = new JwtDecodeToken(store.token ? store.token : null)

    if (instance.getTokenDecode() && instance.getTokenDecode() !== null) {
      console.groupCollapsed('token')
      console.log('Token decoded :: ', instance.getTokenDecode())
      console.groupEnd()
      const { permissions, username } = instance.getTokenDecode()

      if (ws === null) {
        ws = socket.connect(username)
      }

      store.setConfig({ username, permissions })
    }

    /*
     * SOCKET
     */

    const client = {
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      platform: navigator.platform,
      geolocation: navigator.geolocation
    }

    console.groupCollapsed('router')
    console.log('🚧 - router.beforeEach - from:', from.name)
    console.log('🚧 - router.beforeEach - to:', to.name)
    console.log('🚧 - router.path:', to.path)
    console.log('🚧 - Client - client:', client)
    console.groupEnd()

    /*
     * TOKEN AUTH
     */

    // A Logged-in user can't go to login page again

    const hasAccess = (namePermission) => {
      const permission = []

      switch (namePermission) {
        case 'homes': {
          const valid = ['admin', 'user', 'developer', 'guest']
          const returnAccess = permission.filter((x) => valid.includes(x)).length > 0
          return returnAccess
          // return validHome.some((element) => permission.includes(element))
        }
        case 'infos': {
          const validHome = ['admin', 'user', 'developer', 'guest']
          const returnAccess = permission.filter((x) => validHome.includes(x)).length > 0
          return returnAccess
          // return validHome.some((element) => permission.includes(element))
        }
        default:
          return true
      }
    }

    console.groupCollapsed('conf')
    console.log('🚧 - store:', store.token)
    console.log('🚧 - store:', store.conf)
    console.groupEnd()

    console.groupCollapsed('Security')
    console.log('router  ->', to.name)
    console.log('🚧 - router.beforeEach - to.meta.authRequired', to.meta.authRequired)
    console.log('🚧 - router.beforeEach - instance.getToken()', instance.getToken())
    console.log('🚧 - router.beforeEach - instance.isTokenExpired()', instance.isTokenExpired())
    console.log('🚧 - router.beforeEach - instance.getTokenExpirationDate()', instance.getTokenExpirationDate())
    console.log('🚧 - router.beforeEach - instance.isTokenValid()', instance.isTokenValid())
    console.log('🚧 - router.beforeEach - hasAccess(to.name)', hasAccess(to.name))
    console.groupEnd()

    /**
     *  Valida si tiene un token valido para que continue
     */
    if ((to.name === 'login' || to.name === 'default') && instance.isTokenValid()) {
      // router.push({ name: 'home' })
      next({
        name: 'sessionView',
        replace: true
      })
    }

    if (to.meta.authRequired === true) {
      if (instance.isTokenValid() && hasAccess(to.name)) {
        try {
          ws.onopen = function () {
            console.log('[onopen] Conexión establecida')
            const enviar = { module: to.path + '/' + to.name }
            console.log('socket -  updateUser', JSON.stringify(enviar))
            ws.send(JSON.stringify(enviar))
          }

          ws.onclose = function (e) {
            console.log('[onclose] se cierra conexion', e)
            setTimeout(function () {
              console.log('reconnect')
              this.connect()
            }, 1000)
          }

          ws.onerror = function (e) {
            console.log('[error]', e)
          }
        } catch (error) {
          console.error(error)
        }
        return next()
      } else {
        next({
          path: '/'
          // save the location we were at to come back later
          // query: { redirect: to.fullPath }
        })
      }
    }

    return next()
  } catch (e) {
    console.error(e)

    next({
      path: '/'
    })
  }
})

/**
 * load Module
 */

router.afterEach((to, from, next) => {
  console.log('🚧 - router.afterEach - from:', from)
  console.log('🚧 - router.afterEach - to:', to)
})

export default router
