import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '../views/404/404.vue'

import app from '../views/login/appView.vue'

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

import InfoView from '@/views/init/InfoView.vue'
import AboutView from '@/views/init/AboutView.vue'

import { ROUTES_EDIFICIO } from '@/modules/Edificio/routeEdificio'

import { ROUTES_COMPONENTS } from '@/components/routeComponent'

// Usuario
import UsuarioDatos from '@/modules/Usuario/UsuarioDatos.vue'

// Admin
import UsuarioOnline from '@/modules/Admin/UsuariosOnline.vue'

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
    ROUTES_COMPONENTS,
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
        ROUTES_EDIFICIO,
        {
          path: 'admin',
          name: 'admin',
          children: [
            {
              path: 'online',
              name: 'online',
              component: UsuarioOnline,
              meta: { authRequired: true }
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
              meta: { authRequired: true }
            }
          ]
        }
      ]
    },
    // VUE
    {
      path: '/vue',
      name: 'mainVue',
      component: MainView,
      meta: { authRequired: true, transition: 'slide-left' },
      children: [
        {
          path: '',
          name: 'homeVue',
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
    // Main
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: { authRequired: true },
      children: [
        {
          path: '',
          name: 'HomeView',
          component: HomeView,
          meta: { authRequired: true }
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

export default router
