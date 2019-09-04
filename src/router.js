import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { title: ['概要'] },
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/manage',
          name: 'manage',
          component: () => import('./layout/BlankLayout.vue'),
          meta: { title: ['管理'] },
          children: [
            {
              path: 'edit',
              name: 'edit',
              meta: { title: ['管理', '编辑文章'] },
              props: true,
              component: () => import('./views/manage/EditPosts.vue')
            },
            {
              path: 'list',
              name: 'list',
              meta: { title: ['管理', '所有文章'] },
              component: () => import('./views/manage/ListPosts.vue')
            }
          ]
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      meta: { isPublic: true },
      component: () => import('@/views/user/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
