import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import NotFound from '../views/404/404.vue'

import app from '../views/login/appView.vue'
import login from '../views/login/loginView.vue'
import recoveryPass from '../views/login/retorePassword.vue'
import sessionView from '../views/login/sessionView.vue'
import createUserView from '../views/login/createUserView.vue'

import MainView from '../views/Main/MainView.vue'
import Avatar from '../views/Main/Avatar/AvatarComponent.vue'
import Upload from '../views/Main/Avatar/uploadComponent.vue'
import Config from '../views/config/configView.vue'

import User from '../views/Main/User/UserView.vue'

import table from '../shared/tablePagination.vue'

import Payment from '../views/Main/Payment/PaymentView.vue'
import Expenditure from '../views/Main/Expenditure/ExpenditureView.vue'
import reportPayment from '../views/Main/Report/reportPayment.vue'
import reportExpenditure from '../views/Main/Report/reportExpenditure.vue'
import reportApt from '../views/Main/Report/reportApt.vue'
import reportBalance from '../views/Main/Report/reportBalance.vue'
import reportGeneral from '../views/Main/Report/reportGeneral.vue'

import report from '../views/Main/Report/reportView.vue'

import InfoView from '../views/Home/InfoView.vue'

import JwtService from '../services/jwt'

import { LocalService } from '../services/secureStorage'

const localService = new LocalService()

const instance = new JwtService()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: login
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

function hasAccess (namePermission) {
  // let permission = ['admin', 'user', 'developer', 'guest']
  let permission = ''

  if (localService.getJsonValue('config') && Object.keys(localService.getJsonValue('config')).length !== 0) {
    const getTokenDecode = instance.getTokenDecode()

    const localStorage = localService.getJsonValue('config')

    console.log('🚧 - hasAccess - permission', Object.keys(localStorage).length)

    // permission = localStorage.data.payload.permissions
    permission = getTokenDecode.permissions
    console.log('🚧 - hasAccess - permission', permission)
  }
  // const permission = JSON.parse(ls.get('vuex')).config.privileges.permissions;

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

// GOOD
router.beforeEach((to, from, next) => {
  // A Logged-in user can't go to login page again

  console.log('🚧 - router.beforeEach - hasAccess(to.name)', hasAccess(to.name))
  console.log('🚧 - router.beforeEach - to.meta.authRequired', to.meta.authRequired)
  console.log('🚧 - router.beforeEach - instance.isTokenValid()', instance.isTokenValid())

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
    if (instance.isTokenValid() && hasAccess(to.name)) {
      return next()
    } else {
      next({
        path: '/',
        // save the location we were at to come back later
        query: { redirect: to.fullPath }
      })
    }
  }

  return next()
})

export default router
