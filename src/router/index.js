import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home';
import Search from '../views/Search';
import Find from '../views/Find';
import About from '../views/About';
import FriendMsgs from '../views/FriendMsgs';
import CreateFriendMsg from '../views/CreateFriendMsg';

const Venue = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/Venue');
const Detail = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/Detail');
const Order = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/Order');
const Login = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/Login');
const Register = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/Register');


const Game = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/Game');
const MyGame = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/MyGame');
const CreateGame = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/CreateGame');
const SelectVenue = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/SelectVenue');
const GameDetail = () => import(/* webpackChunkName: "venue_detail_order" */ '../views/GameDetail');

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
