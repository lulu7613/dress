import axios from 'axios'

export default ({
  namespaced: true,

  getters: {
    products: state => state.products,
    getType: state => state.getType
  },

  state: {
    products: [],
    getType: ''
  },

  mutations: {
    PRODUCTS (state, date) {
      state.products = date
    },

    TYPE_GET (state, data) {
      const getType = new Set()
      data.filter(item => getType.add(item.category))
      state.getType = Array.from(getType)
    }
  },

  actions: {
    PRODUCTS_GET (context, type) {
      context.commit('LOADING', true, { root: true })
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/products/all`
      axios.get(api).then((response) => {
        console.log('全部商品', response.data)
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products)
          context.commit('TYPE_GET', response.data.products)
          context.commit('LOADING', false, { root: true })
        }
      })
    }
  }
})
