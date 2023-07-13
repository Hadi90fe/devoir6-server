import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddTortueView from '../views/AddTortueView.vue'
import TortueView from '../views/TortueView.vue'
import EditTortueView from '../views/EditTortueView.vue'
import AboutView from '../views/AboutView.vue'
//import EditTortueView from '../views/EditTortueView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'add',
    component: AddTortueView
  },
  {
    path: '/tortue/:id',
    name: 'tortue',
    component: TortueView
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditTortueView
  },
  {
    path: '/delete/:id',
    name: 'delete',
    component: EditTortueView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
