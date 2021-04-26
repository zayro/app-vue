import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'



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
        component: Home,
        meta: {
            authRequired: 'true',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
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

    const permissions = localStorage.getItem("permissions")

    switch (namePermission) {

        case "home":
            return true

        case "users":
            return permissions.includes("View All Users")

        case "permissions":
            return permissions.includes("View All Permissions")

        case "roles":
            return permissions.includes("View All Roles")

        default:
            return true
    }
}

// GOOD
router.beforeEach((to, from, next) => {

    //A Logged-in user can't go to login page again
    if (to.name === 'login' && localStorage.getItem("accessToken")) {

        router.push({
            name: 'home'
        })

        //the route requires authentication
    } else if (to.meta.authRequired) {

        if (!localStorage.getItem("accessToken")) {

            //user not logged in, send them to login page
            router.push({
                name: 'login',
                query: {
                    to: to.name
                }
            })

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
