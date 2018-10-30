import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Crawlers from '@/components/Crawler/Crawlers'
import CreateCrawler from '@/components/Crawler/CreateCrawler'
import EditCrawler from '@/components/Crawler/EditCrawler'
import Profile from '@/components/User/Profile'
import Login from '@/components/User/Login1'
import Signup from '@/components/User/Signup'
import Crawler from '@/components/Crawler/Crawler'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/crawlers',
      name: 'Crawlers',
      component: Crawlers
    },
    {
      path: '/new',
      name: 'Create Crawler',
      component: CreateCrawler,
      beforeEnter: AuthGuard
    },
    {
      path: '/edit',
      name: 'Edit Crawler',
      component: EditCrawler,
      beforeEnter: AuthGuard
    },
    {
      path: '/crawlers/:id',
      name: 'Crawler',
      props: true,
      component: Crawler
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history'
})
