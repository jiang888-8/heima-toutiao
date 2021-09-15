import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Video from '@/views/Video'
import Qa from '@/views/Qa'
import Profile from '@/views/Profile'
import Search from '@/views/Search'
import Article from '@/views/Article'
import Users from '@/views/Users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,

    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/qa',
        component: Qa
      },
      {
        path: '/profile',
        component: Profile
      }
    ]

  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/article/:ArticleId',
    component: Article,
    props: true // 开启props传参
  },
  {
    path: '/users',
    component: Users
  }
]

const router = new VueRouter({
  routes
})

export default router
