import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/global.css'

import axios from 'axios';
Vue.prototype.$http = axios;

// 导入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import "amfe-flexible";

Vue.config.productionTip = false

//let token = "ac02ov8r0t09rbmd4tsrgtr6o6";
//axios.defaults.headers.common['Authorization'] = 'Bearer '+token;

// 路由请求拦截器 
axios.interceptors.request.use(
  config => {
     let token = sessionStorage.getItem("token");
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = 'Bearer '+token;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

