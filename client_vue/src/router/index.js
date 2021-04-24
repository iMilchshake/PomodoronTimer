import {createRouter, createWebHashHistory} from 'vue-router'
import Timer from "@/views/Timer";

const routes = [
    {
        path: '/',
        name: 'Timer',
        component: Timer
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings')
    },
    {
        path: '/stats',
        name: 'Statistics',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Statistics')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
