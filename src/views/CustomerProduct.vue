<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 麵包屑分頁 -->
    <Breadcrumb :propsData="tempProduct"/>
    <main class="container my-5 main">
      <!-- product 主要商品展示 -->
      <ProductDetailTemplate :propsData="tempProduct" />
      <!-- 同類型產品 -->
      <h6 class="my-3 pl-4">其他同款商品</h6>
      <ProductTemplate :propsData="sameCategoryProducts" @emit="changeProduct" />
    </main>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'
import ProductTemplate from '../components/ProductTemplate.vue'
import ProductDetailTemplate from '../components/ProductDetalilTemplate.vue'

export default {
  components: {
    Breadcrumb,
    ProductDetailTemplate,
    ProductTemplate
  },

  data () {
    return {
      itemId: '',
      products: [],
      sameCategoryProducts: [],
      tempProduct: {},

      isLoading: false
    }
  },

  methods: {
    // 取得商品列表
    getProducts () {
      const vm = this
      vm.isLoading = true
      vm.itemId = vm.$route.params.id
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/products/all`
      vm.axios.get(api).then((response) => {
        console.log('取得商品列表', response.data)
        if (response.data.success) {
          vm.products = response.data.products
          // 搜尋:
          // 1.相同 Category 商品
          vm.products.forEach((item) => {
            if (item.id === vm.itemId) {
              vm.tempProduct = item
              vm.tempProduct.num = 1
            }
          })
          // 2.相同 id 的商品 (不包括 tempProduct 本身)
          vm.products.forEach((item) => {
            if (item.id !== vm.tempProduct.id && item.category === vm.tempProduct.category) {
              vm.sameCategoryProducts.push(item)
            }
          })
          vm.isLoading = false
        }
      })
    },

    // 更換產品
    changeProduct (id) {
      const vm = this
      vm.itemId = id
      vm.sameCategoryProducts = []
      vm.tempProduct = {}
      // 搜尋:
      // 1.相同 Category 商品
      vm.products.forEach((item) => {
        if (item.id === vm.itemId) {
          vm.tempProduct = item
          vm.tempProduct.num = 1
        }
      })
      // 2.相同 id 的商品 (不包括 tempProduct 本身)
      vm.products.forEach((item) => {
        if (item.id !== vm.tempProduct.id && item.category === vm.tempProduct.category) {
          vm.sameCategoryProducts.push(item)
        }
      })
    }
  },

  created () {
    this.getProducts()
  },

  // 更新頁面時，回到頂端
  updated () {
    window.scroll(0, 0)
  }
}
</script>
