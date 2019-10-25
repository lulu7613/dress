export default ({
  state: {
    isLoading: false, // vue-loading-overlay Loading 效果
    isfilterLoading: false // font-awsome Loading 效果
  },

  mutations: {
    // isLoading 狀態
    LOADING (state, payload) {
      state.isLoading = payload
    },

    // isfilterLoading 狀態
    FILTER_LOADING (state, payload) {
      state.isfilterLoading = payload
    }
  },

  getters: {
    isLoading: state => state.isLoading,
    isfilterLoading: state => state.isfilterLoading
  }
})
