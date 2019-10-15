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
          component: () => import('./views/Dashboard/Dashboard.vue')
        },
        {
          path: '/posts',
          name: 'posts',
          component: () => import('./layout/BlankLayout.vue'),
          meta: { title: ['文章'] },
          children: [
            {
              path: 'edit',
              name: 'edit',
              meta: { title: ['文章', '编辑文章'] },
              props: true,
              component: () => import('./views/posts/EditPosts.vue')
            },
            {
              path: 'list',
              name: 'list',
              meta: { title: ['文章', '所有文章'] },
              component: () => import('./views/posts/ListPosts.vue')
            }
          ]
        },
        {
          path: '/comments',
          name: 'comments',
          component: () => import('./views/comments/ListComments.vue'),
          meta: { title: ['评论'] }
        },
        {
          path: '/options',
          name: 'options',
          component: () => import('./views/options/index.vue'),
          meta: { title: ['设定'] },
          children: [
            {
              path: 'profile',
              name: 'profile',
              component: () => import('./views/options/UserOptions/profile.vue'),
              meta: { title: ['设定', '个人设置'] }
            },
            {
              path: 'security',
              name: 'security',
              component: () => import('./views/options/UserOptions/security.vue'),
              meta: { title: ['设定', '安全设置'] }
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
