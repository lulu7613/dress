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
          <ProductTemplate :propsData="propsData" />
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
        category: '清倉55折'
      },
      propsData: [],
      isLoading: false

    }
  },

  methods: {
    // 取得分類為 '清倉55折' 的商品列表
    getProdects () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/products/all`
      vm.$http.get(api).then((response) => {
        console.log('清倉55折', response.data)
        if (response.data.success) {
          response.data.products.forEach((item) => {
            if (item.category === '清倉55折') {
              vm.propsData.push(item)
            }
          })
          vm.isLoading = false
        }
      })
    }
  },

  created () {
    this.getProdects()
  }
}
</script>
