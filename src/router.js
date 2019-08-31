import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
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
          component: () => import('./views/Manage.vue')
        },
        {
          path: '/manage/list',
          name: 'list',
          meta: { title: ['管理', '所有文章'] },
          component: () => import('./views/ListPosts.vue')
        }
      ]
    }
  ]
})
