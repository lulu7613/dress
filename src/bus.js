import Vue from 'vue'

Vue.prototype.$bus = new Vue()

// this.$bus.$emit('getProductsType:type', type)
// type(string): 商品類別
// 使用: Home 跟 CustomerProducts 之間
