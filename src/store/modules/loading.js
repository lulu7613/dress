export default ({
  state: {
    isLoading: false, // vue-loading-overlay Loading 效果
    isfilterLoading: false, // font-awsome Loading 效果
    filterLoadingItem: ''
  },

  mutations: {
    // isLoading 狀態
    LOADING (state, payload) {
      state.isLoading = payload
    },

    // isfilterLoading 狀態
    FILTER_LOADING (state, payload) {
      state.isfilterLoading = payload
    },

    // filterLoadingItem 的 id
    FILTER_LOADING_ID (state, id) {
      state.filterLoadingItem = id
    }
  },

  getters: {
    isLoading: state => state.isLoading,
    isfilterLoading: state => state.isfilterLoading,
    filterLoadingItem: state => state.filterLoadingItem
  }
})
