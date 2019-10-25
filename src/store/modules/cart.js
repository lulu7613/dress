import axios from 'axios'

export default ({
  namespaced: true, // 轉為區域變數

  state: {
    carts: [],
    cartsQty: 0,

    animateCss: {
      'animated': false,
      'swing': false
    },
    isDisabled: ''

  },

  mutations: {
    CART (state, data) {
      state.carts = data
    },

    QTY (state, qty) {
      state.cartsQty = qty
    },

    ANIMATE_CSS (state, payload) {
      state.animateCss.animated = payload
      state.animateCss.swing = payload
    },

    DISABLE (state, id) {
      state.isDisabled = id
    }

  },

  actions: {
    // 取得購物車列表
    CART_GET (context) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/cart`
      axios.get(api).then((response) => {
        console.log('購物車列表', response.data)
        if (response.data.success) {
          context.commit('CART', response.data.data)
          context.commit('QTY', response.data.data.carts.length)
          context.commit('ANIMATE_CSS', false)
        }
      })
    },

    // 加入購物車商品
    CART_ADD (context, { id, qty }) {
      // vm.filterLoadingItem = id
      // vm.isDisabled = id
      context.commit('FILTER_LOADING_ID', id, { root: true })
      context.commit('DISABLE', id)
      context.commit('ANIMATE_CSS', true)

      const postData = {
        'product_id': id,
        'qty': qty
      }
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/cart`
      axios.post(api, { data: postData }).then((response) => {
        console.log('加入購物車', response.data)
        if (response.data.success) {
          context.dispatch('MESSAGE_UPDATE', { // vuex alertMessage
            message: response.data.message,
            status: 'success'
          }, { root: true })
          context.dispatch('CART_GET')
          context.commit('FILTER_LOADING_ID', '', { root: true })
          context.commit('DISABLE', '')
        }
      })
    },

    // 刪除購物車商品
    CART_REMOVE (context, id) {
      context.commit('FILTER_LOADING_ID', id, { root: true })
      context.commit('DISABLE', id)
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/cart/${id}`
      axios.delete(api).then((response) => {
        console.log('刪除購物車', response.data)
        if (response.data.success) {
          context.dispatch('MESSAGE_UPDATE', { // vuex alertMessage
            message: response.data.message,
            status: 'danger'
          }, { root: true })
          context.dispatch('CART_GET')
          context.commit('FILTER_LOADING_ID', '', { root: true })
          context.commit('DISABLE', '')
        }
      })
    }
  },

  getters: {
    carts: state => state.carts,
    cartsQty: state => state.cartsQty,
    animateCss: state => state.animateCss,
    isDisabled: state => state.isDisabled
  }
})
