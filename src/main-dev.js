import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
import animated from 'animate.css'
Vue.use(animated);
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import '@/assets/global.css';
import api from '@/request/api.js'
import http from '@/request/http.js'


Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
