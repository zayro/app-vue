import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'



Vue.use(VueRouter)

const routes = [{
    path: '*',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    component: Home,
    beforeEnter: (to, from, next) => {
      // ...
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    //name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/websocket',
    name: 'Websocket',
    component: () => import('../views/WebSocket.vue')
  },
]

const router = new VueRouter({
  routes
})


// GOOD
router.beforeEach((to, from, next) => {
  /*   if (to.name !== 'Login' && !isAuthenticated) next({
      name: 'Login'
    })
    else next() */
});


export default router