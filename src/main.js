import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import axios from 'axios'
import vueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW' // 語言包
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css' // vue-loading-overlay CSS 套件
import store from './store'

import currency from './filters/currency' // 千分位與$設定 filters.js
import date from './filters/date'
import './bus' // eventBus

Vue.use(vueAxios, axios)
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh-TW', zhTW) // 啟用語言包
Vue.component('Loading', Loading) // 執行 vue-loading-overlay 套件，使用 Vue.use(Loading) 也可

Vue.filter('currency', currency) // 啟用 filters.js
Vue.filter('date', date)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
