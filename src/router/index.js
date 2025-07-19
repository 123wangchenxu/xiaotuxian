import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/Layout.vue'
import Login from '@/views/Login/Login.vue'
import Category from '@/views/catogory/Category.vue'
import Home from '@/views/Home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect:'/home',
      children:
      [
        {
          path:'/category',
          component:Category
        },
          {
            path: '/home',
            component: Home
          }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})

export default router
