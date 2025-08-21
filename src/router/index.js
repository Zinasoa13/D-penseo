import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'

const routes = [
  { path: '/', redirect: '/login' },      // par défaut aller sur /login
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },     // ajouter la route vers Home
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
