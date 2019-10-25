export default ({
  state: {
    messages: [] // 屆時會傳入物件{}
  },

  mutations: {
    MESSAGE (state, { message, status, timestamp }) {
      state.messages.push({
        message, // 文字內容
        status, // bootstrap 的樣式 (如: alert-primary，status = primary，status)
        timestamp // 利用 timestamp 產生 id
      })
    },

    // 透過 alert 裡的 x 手動刪除
    MESSAGE_REMOVE (state, index) {
      state.messages.splice(index, 1)
    },

    // 設定 5 秒後自動移除自己
    MESSAGE_REMOVE_TIMING (state, timestamp) {
      state.messages.filter((item, index) => {
        if (item.timestamp === timestamp) {
          return state.messages.splice(index, 1)
        }
      })
    }
  },

  actions: {
    // 啟動 alertMessage
    MESSAGE_UPDATE (context, { message, status }) {
      console.log(message, status)
      const timestamp = Math.floor(new Date() / 1000) // 產生 id
      context.commit('MESSAGE', { message, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp) // 自動移除 alert
    },

    // 設定 5 秒後自動移除自己
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => { // setTimeout('要執行的代碼/function', '等待的毫秒數')
        // 尋找相符的 timestamp
        context.commit('MESSAGE_REMOVE_TIMING', timestamp)
      }, 5000)
    }
  },

  getters: {
    messages: state => state.messages
  }
})
