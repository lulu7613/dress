<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Banner class="mb-5" />
    <div class="mb-5">
      <div class="col-md-11 mx-auto">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-2 mb-4">
              <div class="nav flex-column nav-pills">
                <a
                  class="nav-link mb-2 active product-type"
                  data-toggle="pill"
                  href="#"
                  @click.prevent="getfilterProducts('all')"
                >
                  <i class="fas fa-angle-right" v-if="type === 'all'"></i>
                  全部商品
                </a>
                <a
                  class="nav-link mb-2 product-type"
                  data-toggle="pill"
                  href="#"
                  @click.prevent="getfilterProducts('topic')"
                >
                  <i class="fas fa-angle-right" v-if="type === 'topic'"></i>
                  主題商品
                </a>
                <a
                  class="nav-link mb-2 product-type"
                  data-toggle="pill"
                  href="#"
                  @click.prevent="getfilterProducts('hot')"
                >
                  <i class="fas fa-angle-right" v-if="type === 'hot'"></i>
                  人氣精選
                </a>
                <a
                  class="nav-link product-type"
                  data-toggle="pill"
                  href="#"
                  @click.prevent="getfilterProducts('discount')"
                >
                  <i class="fas fa-angle-right" v-if="type === 'discount'"></i>
                  清倉55折
                </a>
              </div>
            </div>
            <div class="col-md-10">
              <ProductTemplate :propsData="filterProducts" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import ProductTemplate from '../components/ProductTemplate.vue'

export default {
  components: {
    Banner,
    ProductTemplate
  },

  data () {
    return {
      Breadcrumb: {
        category: '全部商品'
      },
      products: [],
      type: 'all',
      filterProducts: [],
      isLoading: false

    }
  },

  methods: {
    // 取得全部商品列表
    getProdects () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/products/all`
      vm.$http.get(api).then((response) => {
        console.log('全部商品', response.data)
        if (response.data.success) {
          vm.type = 'all'
          vm.products = response.data.products
          vm.filterProducts = response.data.products
          vm.isLoading = false
        }
      })
    },

    // 篩選商品列表
    getfilterProducts (type) {
      const vm = this
      if (type === 'all') {
        vm.type = 'all'
        vm.filterProducts = []
        vm.filterProducts = vm.products
      } else if (type === 'topic') {
        vm.type = 'topic'
        vm.filterProducts = []
        vm.products.forEach((item) => {
          if (item.category === '主題商品') {
            vm.filterProducts.push(item)
          }
        })
      } else if (type === 'hot') {
        vm.type = 'hot'
        vm.filterProducts = []
        vm.products.forEach((item) => {
          if (item.category === '人氣精選') {
            vm.filterProducts.push(item)
          }
        })
      } else if (type === 'discount') {
        vm.type = 'discount'
        vm.filterProducts = []
        vm.products.forEach((item) => {
          if (item.category === '清倉55折') {
            vm.filterProducts.push(item)
          }
        })
      }
    }
  },

  created () {
    this.getProdects()
  }
}
</script>

<style>
.product-type {
  border: 1px dashed #0493aa;
}

.product-type:hover {
  color: #e26600;
  background-color: #fce6a9;
}
</style>
