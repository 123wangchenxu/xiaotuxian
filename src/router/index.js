import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/Layout.vue'
import Login from '@/views/Login/Login.vue'
import Category from '@/views/catogory/Category.vue'
import Home from '@/views/Home/Home.vue'
import SubCategory from '@/views/SubCategory/SubCategory.vue'
import ShopDetail from '@/views/Home/Components/ShopDetail.vue'
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
          path:'/category/:id',
          component:Category
        },
        {
          path:'/category/sub/:id',
          component:SubCategory
        },
        {
          path:'/detail/:id',
          component:ShopDetail
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
  scrollBehavior()
  {
    return{
      top:0
    }
  }
})

export default router
