<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Banner class="mb-5" />
    <!-- 商品區塊 -->
    <div class="col-md-11 mx-auto">
      <div class="container-fluid">
        <div class="row">
          <!-- 列表 -->
          <div class="col-md-2 mb-4">
            <div class="nav flex-column nav-pills sticky-top">
              <a
                class="nav-link mb-2 active products-type"
                data-toggle="pill"
                href="#"
                @click.prevent="getfilterProducts('all')"
              >
                <i class="fas fa-angle-right" v-if="type === 'all'"></i>
                全部商品
              </a>
              <a
                class="nav-link mb-2 products-type"
                data-toggle="pill"
                href="#"
                @click.prevent="getfilterProducts('topic')"
              >
                <i class="fas fa-angle-right" v-if="type === 'topic'"></i>
                主題商品
              </a>
              <a
                class="nav-link mb-2 products-type"
                data-toggle="pill"
                href="#"
                @click.prevent="getfilterProducts('hot')"
              >
                <i class="fas fa-angle-right" v-if="type === 'hot'"></i>
                人氣精選
              </a>
              <a
                class="nav-link products-type"
                data-toggle="pill"
                href="#"
                @click.prevent="getfilterProducts('discount')"
              >
                <i class="fas fa-angle-right" v-if="type === 'discount'"></i>
                清倉55折
              </a>

              <div class="input-group mt-2 mb-3">
                <input
                  type="text"
                  class="form-control"
                  style="border: 1px solid #4b9983"
                  placeholder="輸入關鍵字"
                  v-model="keyword"
                  @keyup.enter="getfilterProducts('search')"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click="getfilterProducts('search')"
                  >
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
              <a
                class="nav-link mb-2 my-products"
                href="#"
                v-if="myFavorite.length > 0"
                @click.prevent="getfilterProducts('favorite')"
              >
                <i class="fas fa-heart"></i>
                我的最愛
              </a>
              <router-link
                class="nav-link my-products"
                to="/store/my_order"
                v-if="myOrder.length > 0"
              >
                <i class="fas fa-columns"></i>
                我的訂單
              </router-link>
            </div>
          </div>
          <!-- 內容 -->
          <div class="col-md-10">
            <Breadcrumb class="pl-0" :propsData="Breadcrumb" />
            <ProductTemplate
              :propsData="filterProducts"
              :propsFavorite="myFavorite"
              @emitFavoriteId="getFavorite"
            />
            <p
              class="text-danger text-center"
              v-if="type === 'search' && filterProducts.length === 0"
            >哎呀！我們搜尋不到您輸入的關鍵字。</p>
            <p
              class="text-danger text-center"
              v-if="type === 'favorite' && filterProducts.length === 0"
            >您還沒有加入我的最愛商品，趕快去逛逛吧～</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import ProductTemplate from '../components/ProductTemplate.vue'

export default {
  components: {
    Banner,
    Breadcrumb,
    ProductTemplate
  },

  data () {
    return {
      Breadcrumb: {
        category: '全部商品'
      },
      products: [],
      type: '',
      filterProducts: [],
      myOrder: JSON.parse(localStorage.getItem('dressMyOrder')) || [],
      myFavorite: JSON.parse(localStorage.getItem('dressMyFavorite')) || [],
      keyword: '',
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
        vm.Breadcrumb.category = '全部商品'
        vm.filterProducts = []
        vm.filterProducts = vm.products
      } else if (type === 'topic') {
        vm.type = 'topic'
        vm.Breadcrumb.category = '主題商品'
        vm.filterProducts = []
        vm.products.forEach((item) => {
          if (item.category === '主題商品') {
            vm.filterProducts.push(item)
          }
        })
      } else if (type === 'hot') {
        vm.type = 'hot'
        vm.Breadcrumb.category = '人氣精選'
        vm.filterProducts = []
        vm.products.forEach((item) => {
          if (item.category === '人氣精選') {
            vm.filterProducts.push(item)
          }
        })
      } else if (type === 'discount') {
        vm.type = 'discount'
        vm.Breadcrumb.category = '清倉55折'
        vm.filterProducts = []
        vm.products.forEach((item) => {
          if (item.category === '清倉55折') {
            vm.filterProducts.push(item)
          }
        })
      } else if (type === 'search') {
        vm.type = 'search'
        vm.Breadcrumb.category = `搜尋: ${vm.keyword}`
        vm.filterProducts = []
        vm.products.forEach((item) => {
          if (item.title.match(vm.keyword) || item.category.match(vm.keyword)) {
            vm.filterProducts.push(item)
          }
        })
        vm.keyword = ''
      } else if (type === 'favorite') {
        vm.type = 'favorite'
        vm.Breadcrumb.category = `我的最愛`
        vm.filterProducts = vm.myFavorite
      }
    },

    // localStorage 獲取 favorite 變化
    getFavorite (itemId) {
      const vm = this
      vm.myFavorite = JSON.parse(localStorage.getItem('dressMyFavorite')) || []
      if (vm.type === 'favorite') {
        vm.filterProducts.filter((item, index) => {
          if (item.id === itemId) {
            vm.filterProducts.splice(index, 1)
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
.products-type {
  border: 1px dashed #4b9983;
}

.products-type:hover {
  color: #eb6241;
  background-color: #fce6a9;
}

.my-products {
  border: 1px dashed #eb6241;
  background-color: #eb6241;
  color: #fff;
  /* border: 1px dashed #eb6241;
  background-color: #fff;
  color: #eb6241; */
}

.my-products:hover {
  color: #fff;
  background-color: #e93406;
}
</style>
