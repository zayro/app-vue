import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import NotFound from '../views/404/404.vue'
import login from '../views/login/loginView.vue'
import recoveryPass from '../views/login/retorePassword.vue'
import sessionView from '../views/login/sessionView.vue'
import createUserView from '../views/login/createUserView.vue'

import CrudView from '../views/Crud/CrudView.vue'
import DataView from '../views/Crud/DataView.vue'

import MainView from '../views/Main/MainView.vue'

import InfoView from '../views/Home/InfoView.vue'

import JwtService from '../services/jwt'

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
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/recovery',
      name: 'recoveryPass',
      component: recoveryPass
    },
    {
      path: '/session',
      name: 'sessionView',
      component: sessionView
    },
    {
      path: '/createUser',
      name: 'createUserView',
      component: createUserView
    },
    {
      path: '/Crud',
      name: 'crud',
      component: CrudView
    },
    {
      path: '/data',
      name: 'data',
      component: DataView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView
    },

    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { authRequired: true },
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
  // const permission = JSON.parse(ls.get('vuex')).config.privileges.permissions;

  const permission = ['admin', 'user', 'developer', 'guest']

  switch (namePermission) {
    case 'home': {
      const validHome = ['admin', 'user', 'developer', 'guest']
      const returnAccess = permission.filter((x) => validHome.includes(x)).length > 0
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
