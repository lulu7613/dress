<template>
  <div>
    <Banner class="mb-4" />
    <div class="container-fluid">
      <loading :active.sync="isLoading"></loading>
      <div class="row mb-5">
        <div class="col-lg-3 mt-md-5">
          <CouponAd />
        </div>
        <div class="col-lg-9">
          <Breadcrumb class="mb-4" :propsData="Breadcrumb" />
          <p v-if="propsData.length ===0">搜尋不到商品</p>
          <ProductTemplate :propsData="propsData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import ProductTemplate from '../components/ProductTemplate.vue'
import CouponAd from '../components/CouponAd.vue'

export default {
  components: {
    Banner,
    Breadcrumb,
    ProductTemplate,
    CouponAd
  },

  data () {
    return {
      Breadcrumb: {
        category: ''
      },
      products: [],
      propsData: [],
      isLoading: false

    }
  },

  methods: {
    getSearch () {
      const vm = this
      vm.isLoading = true
      const keyword = vm.$route.params.keyword
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/products/all`
      vm.$http.get(api).then((response) => {
        console.log(`搜尋頁面`, response.data)
        if (response.data.success) {
          vm.products = response.data.products
          vm.Breadcrumb.category = `搜尋: ${keyword}`
          vm.products.forEach((item) => {
            if (item.title.match(keyword) || item.category.match(keyword)) {
              vm.propsData.push(item)
            }
          })
          vm.isLoading = false
          console.log(`關鍵字1: ${keyword}`, vm.propsData)
        }
      })
    }
  },

  created () {
    const vm = this
    if (vm.$route.name !== 'CusTomerProductsSearch') {
      vm.getSearch()
    }
    vm.$bus.$on('search:array', (keyword) => {
      vm.propsData = []
      vm.isLoading = true
      vm.Breadcrumb.category = `搜尋: ${keyword}`
      vm.products.forEach((item) => {
        if (item.title.match(keyword) || item.category.match(keyword)) {
          vm.propsData.push(item)
        }
      })
      vm.isLoading = false
      console.log(`關鍵字2: ${keyword}`, vm.propsData)
    })
  },

  beforeDestroy () {
    this.$bus.$off('search:array')
  }
}
</script>
