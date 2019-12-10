import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home';

import Venue from '../views/Venue';
import Game from '../views/Game';
import Find from '../views/Find';
import About from '../views/About';
import Search from '../views/Search';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/venue',
    name: 'venue',
    component: Venue
  },
  {
    path: '/game',
    name: 'game',
    component: Game
  },
  {
    path: '/find',
    name: 'find',
    component: Find
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
 
]

const router = new VueRouter({
  routes
})

export default router
