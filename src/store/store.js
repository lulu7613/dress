import Vue from 'vue'
import Vuex from 'vuex'

// 區域變數
import Cart from './modules/cart'

// 全域變數
import Loading from './modules/loading'
import AlertMessage from './modules/alertMessage'

Vue.use(Vuex)

export default new Vuex.Store({
  // 嚴謹模式
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    Loading,
    AlertMessage,
    Cart
  }
})
