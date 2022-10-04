import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/favs',
    name: 'favs',
    component: () => import('../views/FavsView.vue')
  },
  {
    path: '/pokemon/:name',
    name: 'pokemon',
    component: () => import('../views/PokemonView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
