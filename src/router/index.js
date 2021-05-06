import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'

import JwtService from '../services/jwt'

import {
    shutdown
} from '../services/clear'

const instance = new JwtService();


console.log('************', instance.getTokenExpirationDate());
console.log('************', instance.isTokenExpired());



import SecureLS from "secure-ls";
var ls = new SecureLS({
    encodingType: 'aes',
    isCompression: false
});

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

    return originalPush.call(this, location).catch(err => err)

}

const routes = [{
        path: '*',
        component: NotFound
    },
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            authRequired: 'true',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/page-not-authorized',
        name: 'page-not-authorized',
        component: NotFound,
        meta: {
            authRequired: false,
        },
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            authRequired: false,
        },
    },

    {
        path: '/websocket',
        name: 'Websocket',
        component: () => import('../views/WebSocket.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes
})


function hasAccess(namePermission) {

    const permission = JSON.parse(ls.get('vuex')).config.privileges.permissions;

    switch (namePermission) {

        case "home": {
            const validHome = ["admin", "user", "developer", "guest"]
            console.log(`:rocket: ~ file: index.js ~ line 86 ~ hasAccess ~ validHome`, validHome);

            return validHome.some(element => permission.includes(element))
        }
        default:
            return true
    }
}

// GOOD
router.beforeEach((to, from, next) => {

    //A Logged-in user can't go to login page again
    if (to.name === 'login' && instance.isTokenExpired()) {

        router.push({
            name: 'home'
        })

        //the route requires authentication
    } else if (to.meta.authRequired) {

        if (!instance.isTokenExpired()) {

            shutdown()


        } else {
            if (!hasAccess(to.name)) {
                router.push({
                    name: 'page-not-authorized'
                })
            }
        }
    }

    return next()
})

export default router
