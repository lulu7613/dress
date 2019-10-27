import axios from 'axios'

export default ({
  namespaced: true,

  getters: {
    orders: state => state.orders,
    myOrders: state => state.myOrders,
    ordersLen: state => state.ordersLen,
    order: state => state.order
  },

  state: {
    orders: [],
    myOrders: [],
    order: [],
    ordersLen: 0
  },

  mutations: {
    ORDERS (state, data) {
      let localData = JSON.parse(localStorage.getItem('dressMyOrder')) // localStorage
      // let arrC = arrA.filter(itemA => arrB.map(itemB => itemB.id).includes(itemA.id))
      state.orders = data
      state.myOrders = data.filter(itemA => {
        return localData.map(itemB => {
          return itemB.id
        }).includes(itemA.id)
      })
    },

    ORDER (state, data) {
      state.order = data
    },

    LENGTH (state, length) {
      state.ordersLen = length
    },

    PAY (state, payload) {
      state.order.is_paid = payload
    }
  },

  actions: {
    // 取得所有訂單
    ORDERS_GET (context, page) {
      context.commit('LOADING', true, { root: true })
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/orders?page=${page}`
      axios.get(api).then((response) => {
        console.log('我的訂單-取得訂單列表', response.data)
        if (response.data.success) {
          context.commit('ORDERS', response.data.orders)
          context.commit('LOADING', false, { root: true })
        }
      })
    },

    // 取得單一筆結帳訂單
    ORDER_SINGLE_GET (context, orderId) {
      context.commit('LOADING', true, { root: true })
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/order/${orderId}`
      axios.get(api).then((response) => {
        console.log('完成訂單-取得訂單', response)
        if (response.data.success) {
          context.commit('ORDER', response.data.order)
          context.commit('LOADING', false, { root: true })
        }
      })
    },

    // 結帳附款
    ORDER_PAY (context, orderId) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/pay/${orderId}`
      axios.post(api, orderId).then((response) => {
        console.log('完成訂單-結帳付款', response.data)
        if (response.data.success) {
          context.commit('PAY', true)
        }
      })
    }
  }
})
