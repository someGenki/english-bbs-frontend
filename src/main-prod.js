import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'mavon-editor/dist/css/index.css'
Vue.use(MavonEditor)

import '@/assets/global.css';
import api from '@/request/api.js'
import http from '@/request/http.js'

Vue.prototype.$api = api;
Vue.prototype.$http = http;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
