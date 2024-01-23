import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '../views/404/404.vue'

import app from '../views/login/appView.vue'

import Config from '../views/config/configView.vue'

/**
 * Components
 */
import IndexComponent from '@/components/IndexComponent.vue'
import AvatarComponent from '@/components/AvatarComponent.vue'
import BackDropComponent from '@/components/BackDropComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import UploadComponent from '@/components/UploadComponent.vue'

// Components/Example
import TableComponent from '@/components/example/TableComponent.vue'

/**
 * Views
 */

import loginView from '../views/login/v1/loginView.vue'
import defaultView from '../views/login/defaultView.vue'
import loginV2 from '../views/login/v2/loginView.vue'
import recoveryPass from '../views/login/retorePassword.vue'
import sessionView from '../views/login/sessionView.vue'
import createUserView from '../views/login/createUserView.vue'
import MainView from '../views/Main/MainView.vue'
import HomeView from '../views/Main/Home/HomeView.vue'

/**
 * Molules
 */

import Modules from '@/modules/Modules.vue'

// Edificio
import Payment from '@/modules/Edificio/Payment/PaymentView.vue'
import Expenditure from '@/modules/Edificio/Expenditure/ExpenditureView.vue'
import reportPayment from '@/modules/Edificio/Report/reportPayment.vue'
import reportExpenditure from '@/modules/Edificio/Report/reportExpenditure.vue'
import reportApt from '@/modules/Edificio/Report/reportApt.vue'
import reportBalance from '@/modules/Edificio/Report/reportBalance.vue'
import reportGeneral from '@/modules/Edificio/Report/reportGeneral.vue'
import report from '@/modules/Edificio/Report/reportView.vue'
import InfoView from '@/views/Main/Home/InfoView.vue'
import AboutView from '@/views/Main/Home/AboutView.vue'

// Usuario
import UsuarioDatos from '@/modules/Usuario/UsuarioDatos.vue'
import UsuarioOnline from '@/modules/Admin/UsuariosOnline.vue'

/**
 * Services
 */

import { JwtDecodeToken } from '@/services/jwt'
import { ConnectWebSocket } from '@/services/websocket'

/**
 * Storage
 */

import { useConfigStoreRef } from '@/stores/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: defaultView
    },
    {
      path: '/login-v1',
      name: 'loginV1',
      component: loginView
    },
    {
      path: '/login-v2',
      name: 'loginV2',
      component: loginV2
    },
    // Components
    {
      path: '/components',
      name: 'components',
      component: IndexComponent,
      children: [
        {
          path: 'avatar',
          name: 'avatar',
          component: AvatarComponent,
          meta: { transition: 'slide-right' }
        },
        {
          path: 'backDrop',
          name: 'backDrop',
          component: BackDropComponent,
          meta: { transition: 'slide-right' }
        },

        {
          path: 'spinner',
          name: 'spinner',
          component: SpinnerComponent,
          meta: { transition: 'slide-right' }
        },

        {
          path: 'upload',
          name: 'upload',
          component: UploadComponent,
          meta: { transition: 'slide-right' }
        },
        {
          path: 'table',
          name: 'TableComponents',
          component: TableComponent,
          meta: { transition: 'slide-right' }
        },
        {
          path: 'card',
          name: 'CardComponent',
          component: CardComponent,
          meta: { transition: 'slide-right' }
        }
      ]
    },
    // App
    {
      path: '/app',
      name: 'app',
      component: app,
      children: [
        {
          path: 'login',
          name: 'login',
          component: loginV2
        },
        {
          path: 'recovery',
          name: 'recoveryPass',
          component: recoveryPass
        },
        {
          path: 'session',
          name: 'sessionView',
          component: sessionView
        },
        {
          path: 'createUser',
          name: 'createUserView',
          component: createUserView
        }
      ]
    },
    // Modulos
    {
      path: '/modulos',
      name: 'modulos',
      component: Modules,
      meta: { transition: 'slide-right' },
      children: [
        {
          path: 'edificio',
          name: 'edificio',
          children: [
            {
              path: 'config',
              name: 'config',
              component: Config,
              meta: { transition: 'slide-right' }
            },
            {
              path: 'addPayment',
              name: 'addPayment',
              component: Payment,
              meta: { transition: 'slide-right' }
            },
            {
              path: 'addExpenditure',
              name: 'addExpenditure',
              component: Expenditure,
              meta: { transition: 'slide-right' }
            },
            {
              path: 'reportPayment',
              name: 'reportPayment',
              component: reportPayment
            },
            {
              path: 'reportExpenditure',
              name: 'reportExpenditure',
              component: reportExpenditure
            },
            {
              path: 'reportGeneral',
              name: 'reportGeneral',
              component: reportGeneral
            },
            {
              path: 'reportApt',
              name: 'reportApt',
              component: reportApt
            },
            {
              path: 'reportBalance',
              name: 'reportBalance',
              component: reportBalance
            },

            {
              path: 'report',
              name: 'report',
              component: report,
              meta: { transition: 'slide-right' }
            }
          ]
        },
        {
          path: 'admin',
          name: 'admin',
          children: [
            {
              path: 'online',
              name: 'online',
              component: UsuarioOnline,
              meta: { transition: 'slide-right' }
            }
          ]
        },
        {
          path: 'usuario',
          name: 'usuario',
          children: [
            {
              path: 'agregar',
              name: 'agregar',
              component: UsuarioDatos,
              meta: { transition: 'slide-right' }
            }
          ]
        }
      ]
    },
    // Main
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: { authRequired: true, transition: 'slide-left' },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { authRequired: true, transition: 'slide-left' },
          // only authenticated users can create posts
          children: [
            {
              path: '',
              name: 'info',
              component: InfoView,
              meta: { authRequired: true }
            },
            {
              path: 'about',
              name: 'about',
              component: AboutView,
              meta: { authRequired: true }
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

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
      const { menu, information, permissions, username } = instance.getTokenDecode()

      console.log('🚧 - router.beforeEach - ws:', ws)
      if (ws === null) {
        ws = socket.connect(username)
      }

      store.setConfig({ menu, information, permissions })
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
        console.log('------------------ authRequired ------------------ ', to.meta.authRequired)

        try {
          ws.onopen = function () {
            console.log('[onopen] Conexión establecida')
          }

          if (ws.readyState === 1) {
            socket.updateUser({
              module: to.path
            })
          }

          ws.onmessage = function (event) {
            console.log('[onmessage] captura de mensajes', event.data)
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
