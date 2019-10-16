import Vue from 'vue'

Vue.prototype.$bus = new Vue()

// AlterMessage
// this.$bus.$emit('messsage:push', message, status)
// message(string): 訊息內容
// status(string): bootstrap Alert 樣式

// Footer (update 購物車購買數字)
// this.$bus.$emit('cartsQty:update')

// CustomerProductsSearch (搜尋內容)
// vm.$bus.$emit('search:array', keyword)
// search(string): 搜尋的關鍵字
