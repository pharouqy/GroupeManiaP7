import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import UpdatePoste from '../views/UpdatePoste.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/Login',
    component: Login,
  },
  {
    path: '/Register',
    component: Register,
  },
  {
    path: '/Profile',
    component: Profile,
  },
  {
    path: '/UpdatePoste/:idPost',
    component: UpdatePoste,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
