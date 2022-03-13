import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home/indexHome'),
        children:[
            {
                path: '/music',
                name: 'music',
                component: () => import('../views/Home/Screen/musicShow')
            },
            {
                path: '/info',
                name: 'info',
                component: () => import('../views/Home/UserInfo/userInfo')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/loginPage'),
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router