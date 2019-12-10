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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

