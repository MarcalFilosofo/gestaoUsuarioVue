import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import User from '../views/User.vue';

import axios from 'axios';

function adminAuth(to, from, next){
  if (localStorage.getItem('token') != undefined) {
    let req = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    
    axios.post('http://localhost:8081/validade', {}, req)
      .then(response => {

        next();
      }).catch(error => {
        localStorage.removeItem('token');
        next('/login');
      })
    
    next();
  } else {
    next('/login');
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/user',
    name: 'User',
    component: User,
    beforeEnter: adminAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
