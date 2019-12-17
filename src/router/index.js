import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home';

import Venue from '../views/Venue';
import Game from '../views/Game';
import Find from '../views/Find';
import About from '../views/About';
import Search from '../views/Search';
import Detail from '../views/Detail';
import Order from '../views/Order';
import Login from '../views/Login';
import Register from '../views/Register';
import MyGame from '../views/MyGame';
import CreateGame from '../views/CreateGame';
import SelectVenue from '../views/SelectVenue';
import GameDetail from '../views/GameDetail';
import FriendMsgs from '../views/FriendMsgs';
import CreateFriendMsg from '../views/CreateFriendMsg';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/venue'
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
    component: About,
    meta:{
      requireAuth:true
    }
    
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/my_game',
    name: 'my_game',
    component: MyGame
  },
  {
    path: '/create_game',
    name: 'create_game',
    component: CreateGame
  },
  {
    path: '/select_venue',
    name: 'select_venue',
    component: SelectVenue
  },
  {
    path: '/game_detail',
    name: 'game_detail',
    component: GameDetail
  },
  {
    path: '/friend_msgs',
    name: 'friend_msgs',
    component: FriendMsgs
  },
  {
    path: '/create_friend_msg',
    name: 'create_friend_msg',
    component: CreateFriendMsg
  }
  
]

const router = new VueRouter({
  routes
})


// 路由钩子函数
router.beforeEach((to,from,next)=>{

  // 如果访问的是login,可以直接访问
  // 如果访问其他路由,token是否存在, 不存在,跳转到登录页;
 
  if(to.path == "/login")  return  next();
  
  let tokenStr = window.sessionStorage.getItem('token');

  if(to.meta.requireAuth && !tokenStr){
      return next("/login");
  }
  
  next();

})

export default router
