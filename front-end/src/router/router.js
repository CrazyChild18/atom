import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home/indexHome'),
        // meta: {
        //     requiresAuth: true
        // },

        children:[
            {
                path: '/music/',
                name: 'music',
                component: () => import('../views/Home/Screen/musicShow2'),
        //         meta: {
        //     requiresAuth: true
        // },
            },
            {
                path: '/info/:id',
                name: 'info',
                component: () => import('../views/Home/UserInfo/userInfo'),
                // meta: {
                //     requiresAuth: true
                // },

            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/loginPage'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Login/registerPage'),
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (token && to.name == 'Login') {
    // 用户已登录，但又去访问登录页面时不让他过去
    next({
      path: from.fullPath
    })
  } else {
    next()
  }
})

export default router