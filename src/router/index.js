import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import AddService from '@/views/services/create/AddService.vue'
import MultiServiceDetails from '@/views/services/MultiServiceDetails.vue'
import ServiceOption from '@/views/services/create/ServiceOption.vue'
import CreateMultiple from '@/views/services/create/CreateMultiple.vue'
import MyServices from '@/views/services/MyServices.vue'
import Setting from '@/views/setting/Setting.vue'
import Notifications from '@/views/setting/Notifications.vue'
import Search from '@/views/Search.vue'
import ServiceDetails from  '@/views/services/ServiceDetails'
import ServiceDetailsMulti from  '@/views/services/ServiceDetailsMulti'
import { projectAuth } from '../firebase/config'

// Route Guards, ruquire user to be logged in to use any route we want
const requireAuth = (to, from, next) => {
  // Get the current user, if no user it will be null
  let user = projectAuth.currentUser

  // If no user login, route to login 
  if(!user){
    next({ name: 'Login' })
  }
  // Else, get to the next step
  else{
    next()
  }
}

// Routhes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/addservice',
    name: 'AddService',
    component: AddService,
    beforeEnter: requireAuth
  },
  {
    path: '/services/:id',
    name: 'ServiceDetails',
    component: ServiceDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/services/:fid/:id',
    name: 'ServiceDetailsMulti',
    component: ServiceDetailsMulti,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    beforeEnter: requireAuth,
  },
  {
    path: '/myservices',
    name: 'MyServices',
    component: MyServices,
    beforeEnter: requireAuth,
  },
  {
    path: '/createmultiple',
    name: 'CreateMultiple',
    component: CreateMultiple,
    beforeEnter: requireAuth
  },
  {
    path: '/option',
    name: 'ServiceOption',
    component: ServiceOption,
    beforeEnter: requireAuth
  },
  {
    path: '/mservices/:id',
    name: 'MultiServiceDetails',
    component: MultiServiceDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    beforeEnter: requireAuth
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
    beforeEnter: requireAuth
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
