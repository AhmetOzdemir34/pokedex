import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from '@firebase/auth';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/favs',
    name: 'favs',
    component: () => import('../views/FavsView.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/pokemon/:name',
    name: 'pokemon',
    component: () => import('../views/PokemonView.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* router.beforeEach((to, from, next)=>{
  if(to.matched.some((record)=> record.meta.requiresAuth)){
    if(getAuth().currentUser){
      next();
    }else{
      alert('You do not have access!');
      next('/login');
    }
  }else{
    next();
  }
}) */

export default router
