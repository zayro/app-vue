import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '../views/404/404.vue'

import app from '../views/login/appView.vue'
import defaultView from '../views/login/defaultView.vue'
import login from '../views/login/loginView.vue'
import recoveryPass from '../views/login/retorePassword.vue'
import sessionView from '../views/login/sessionView.vue'
import createUserView from '../views/login/createUserView.vue'

import MainView from '../views/Main/MainView.vue'
import Avatar from '../views/Main/Avatar/AvatarComponent.vue'
import Upload from '../views/Main/Avatar/uploadComponent.vue'
import Config from '../views/config/configView.vue'

import table from '../shared/tablePagination.vue'

import HomeView from '../views/Main/Home/HomeView.vue'

import Payment from '../views/Main/Payment/PaymentView.vue'
import Expenditure from '../views/Main/Expenditure/ExpenditureView.vue'
import reportPayment from '../views/Main/Report/reportPayment.vue'
import reportExpenditure from '../views/Main/Report/reportExpenditure.vue'
import reportApt from '../views/Main/Report/reportApt.vue'
import reportBalance from '../views/Main/Report/reportBalance.vue'
import reportGeneral from '../views/Main/Report/reportGeneral.vue'

import report from '../views/Main/Report/reportView.vue'

import InfoView from '../views/Main/Home/InfoView.vue'
import AboutView from '../views/Main/Home/AboutView.vue'

import { JwtDecodeToken } from '@/services/jwt'

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
      path: '/demo',
      name: 'demo',
      children: [
        {
          path: 'table',
          name: 'table',
          component: table
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
      path: '/main',
      name: 'main',
      component: MainView,
      meta: { transition: 'slide-right' },
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
          path: 'avatar',
          name: 'avatar',
          component: Avatar,
          meta: { transition: 'slide-right' }
        },
        {
          path: 'upload',
          name: 'upload',
          component: Upload,
          meta: { transition: 'slide-right' }
        },
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
      path: '/home',
      name: 'defaultVue',
      meta: { authRequired: true, transition: 'slide-left' },
      component: () => import('../views/Home/HomeView.vue'),
      // only authenticated users can create posts
      children: [
        {
          path: '',
          name: 'defaultVueInfo',
          meta: { authRequired: true },
          component: () => import('../views/Home/InfoView.vue')
        },
        {
          path: 'about',
          name: 'defaultVueAbout',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/Home/AboutView.vue')
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

// GOOD
router.beforeEach((to, from, next) => {
  try {
    const store = useConfigStoreRef()

    const instance = new JwtDecodeToken(store.token ? store.token : {})

    const { menu, information, permissions } = instance.getTokenDecode()

    store.setConfig({ menu, information, permissions })

    // A Logged-in user can't go to login page again

    const hasAccess = (namePermission) => {
      const permission = permissions

      switch (namePermission) {
        case 'home': {
          const valid = ['admin', 'user', 'developer', 'guest']
          const returnAccess = permission.filter((x) => valid.includes(x)).length > 0
          return returnAccess
          // return validHome.some((element) => permission.includes(element))
        }
        case 'info': {
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

    if (to.meta.authRequired) {
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
