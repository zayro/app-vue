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
import login from '../views/login/loginView.vue'
import recoveryPass from '../views/login/retorePassword.vue'
import sessionView from '../views/login/sessionView.vue'
import createUserView from '../views/login/createUserView.vue'
import MainView from '../views/Main/MainView.vue'
import HomeView from '../views/Main/Home/HomeView.vue'

/**
 * Molules
 */

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

/**
 * Services
 */

import { JwtDecodeToken } from '@/services/jwt'

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
      name: 'logiV1',
      component: loginView
    },
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
    {
      path: '/app',
      name: 'app',
      component: app,
      children: [
        {
          path: 'login',
          name: 'login',
          component: login
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
    {
      path: '/modulos',
      name: 'modulos',
      component: MainView,
      meta: { transition: 'slide-right' },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { authRequired: false, transition: 'slide-left' },
          // only authenticated users can create posts
          children: [
            {
              path: '',
              name: 'info',
              component: InfoView
              // meta: { authRequired: true }
            },
            {
              path: 'about',
              name: 'about',
              component: AboutView
            }
          ]
        },
        {
          path: 'edificio',
          name: 'edificio',
          component: HomeView,
          meta: { authRequired: false, transition: 'slide-left' },
          // only authenticated users can create posts
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
        }
      ]
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: { transition: 'slide-right' },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { authRequired: false, transition: 'slide-left' },
          // only authenticated users can create posts
          children: [
            {
              path: '',
              name: 'info',
              component: InfoView
              // meta: { authRequired: true }
            },
            {
              path: 'about',
              name: 'about',
              component: AboutView
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

router.beforeEach((to, from, next) => {
  console.log('🚧 - router.beforeEach - from:', from.name)
  console.log('🚧 - router.beforeEach - to:', to.name)
  try {
    const store = useConfigStoreRef()

    const instance = new JwtDecodeToken(store.token ? store.token : {})

    if (instance.getTokenDecode() && instance.getTokenDecode() !== null) {
      console.log(' connect to jwt ')
      const { menu, information, permissions } = instance.getTokenDecode()
      store.setConfig({ menu, information, permissions })
    } else {
      const permission = []
      console.log('no connect to jwt ', permission)
    }

    /*
     * SOCKET
     */

    // const username = information[0].username
    const room = to.name
    const client = {
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      platform: navigator.platform,
      geolocation: navigator.geolocation
    }
    console.log('🚧 - router.beforeEach - room:', room)
    console.log('🚧 - router.beforeEach - client:', client)

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

    console.group('conf')
    console.log('🚧 - store:', store.token)
    console.log('🚧 - store:', store.conf)
    console.groupEnd()

    console.group('Security')
    console.log('🚧 - router.beforeEach - to.meta.authRequired', to.meta.authRequired)
    console.log('🚧 - router.beforeEach - instance.isTokenValid()', instance.isTokenValid())
    console.log('🚧 - router.beforeEach - hasAccess(to.name)', hasAccess(to.name))
    console.groupEnd()

    console.log('router', to.name)

    if ((to.name === 'login' || to.name === 'default') && instance.isTokenValid()) {
      // router.push({ name: 'home' })
      next({
        name: 'sessionView',
        replace: true
      })

      // the route requires authentication
    }

    if (to.meta.authRequired === true) {
      console.log('------------------ authRequired ------------------ ', to.meta.authRequired)
      if (instance.isTokenValid() && hasAccess(to.name)) {
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

export default router
