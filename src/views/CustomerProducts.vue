<template>
  <div>
    <Banner class="mb-5" />
    <!-- 商品區塊 -->
    <div class="col-md-11 mx-auto">
      <div class="container-fluid">
        <div class="row">
          <!-- 列表 -->
          <div class="col-lg-2 mb-4">
            <div class="nav flex-column sticky-top">
              <span
                class="nav-link mb-2 active products-type"
                :class="{'products-active': type === ''}"
                @click.prevent="type = ''"
              >
                <i class="fas fa-angle-right" v-if="type === 'all'"></i>
                全部商品
              </span>
              <span
                v-for="item in getType" :key="item"
                class="nav-link mb-2 active products-type"
                :class="{'products-active': type === item}"
                @click.prevent="type = item"
              >
                <i class="fas fa-angle-right" v-if="type === item"></i>
                {{item}}
              </span>

              <div class="input-group mt-2 mb-3">
                <input
                  type="text"
                  class="form-control"
                  style="border: 1px solid #4b9983"
                  placeholder="輸入關鍵字"
                  v-model="keyword"
                  @keyup.enter="type = 'search'"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click="type = 'search'"
                  >
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>

              <a
                class="nav-link mb-2 my-products animated slideInLeft"
                href="#"
                v-if="myFavorite.length > 0"
                @click.prevent="type = 'favorite'"
              >
                <i class="fas fa-heart"></i>
                我的最愛
              </a>
              <router-link
                class="nav-link my-products animated slideInLeft"
                to="/my_order"
                v-if="myOrder.length > 0"
              >
                <i class="fas fa-columns"></i>
                我的訂單
              </router-link>

              <!-- <div class="input-group mt-2 mb-3">
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
              </div> -->
              <!-- <a
                class="nav-link mb-2 my-products animated slideInLeft"
                href="#"
                v-if="myFavorite.length > 0"
                @click.prevent="getfilterProducts('favorite')"
              >
                <i class="fas fa-heart"></i>
                我的最愛
              </a>
              <router-link
                class="nav-link my-products animated slideInLeft"
                to="/my_order"
                v-if="myOrder.length > 0"
              >
                <i class="fas fa-columns"></i>
                我的訂單
              </router-link> -->
            </div>
          </div>
          <!-- <div class="col-lg-2 mb-4">
            <div class="nav flex-column sticky-top">
              <span
                class="nav-link mb-2 active products-type"
                :class="{'products-active': type === 'all'}"
                @click.prevent="getfilterProducts('all')"
              >
                <i class="fas fa-angle-right" v-if="type === 'all'"></i>
                全部商品
              </span>
              <span
                class="nav-link mb-2 products-type"
                :class="{'products-active': type === 'topic'}"
                @click.prevent="getfilterProducts('topic')"
              >
                <i class="fas fa-angle-right" v-if="type === 'topic'"></i>
                主題商品
              </span>
              <span
                class="nav-link mb-2 products-type"
                :class="{'products-active': type === 'hot'}"
                @click.prevent="getfilterProducts('hot')"
              >
                <i class="fas fa-angle-right" v-if="type === 'hot'"></i>
                人氣精選
              </span>
              <span
                class="nav-link products-type"
                :class="{'products-active': type === 'discount'}"
                @click.prevent="getfilterProducts('discount')"
              >
                <i class="fas fa-angle-right" v-if="type === 'discount'"></i>
                清倉55折
              </span>

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
                class="nav-link mb-2 my-products animated slideInLeft"
                href="#"
                v-if="myFavorite.length > 0"
                @click.prevent="getfilterProducts('favorite')"
              >
                <i class="fas fa-heart"></i>
                我的最愛
              </a>
              <router-link
                class="nav-link my-products animated slideInLeft"
                to="/my_order"
                v-if="myOrder.length > 0"
              >
                <i class="fas fa-columns"></i>
                我的訂單
              </router-link>
            </div>
          </div> -->
          <!-- 內容 -->
          <div class="col-lg-10">
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

import { mapGetters, mapActions } from 'vuex'

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
      type: '',
      myOrder: JSON.parse(localStorage.getItem('dressMyOrder')) || [],
      myFavorite: JSON.parse(localStorage.getItem('dressMyFavorite')) || [],
      keyword: ''
    }
  },

  computed: {
    ...mapGetters('Products', ['products', 'getType']),

    // 篩選商品列表
    filterProducts () {
      const vm = this
      let data = []
      if (vm.type === '') {
        vm.Breadcrumb.category = '全部商品'
        data = vm.products
      } else if (vm.type === 'search') {
        vm.Breadcrumb.category = `搜尋: ${vm.keyword}`
        vm.products.forEach((item) => {
          if (item.title.match(vm.keyword) || item.category.match(vm.keyword)) {
            data.push(item)
          }
        })
        vm.keyword = ''
      } else if (vm.type === 'favorite') {
        vm.type = 'favorite'
        vm.Breadcrumb.category = `我的最愛`
        data = vm.myFavorite
      } else {
        vm.Breadcrumb.category = vm.type
        vm.products.forEach((item) => {
          if (item.category === vm.type) {
            data.push(item)
          }
        })
      }
      return data
    }
  },

  methods: {
    // 取得全部商品列表
    ...mapActions('Products', ['PRODUCTS_GET']),
    // getProdects () {
    //   this.$store.dispatch('Products/PRODUCTS_GET')
    // },

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
    this.PRODUCTS_GET()

    // $on 自定義事件 (類似原生 JS 的 addEventListener)
    this.$bus.$on('getProductsType:type', (type) => {
      this.type = type
    })
  },

  beforeDestroy () {
    this.$bus.$off('getProductsType:type')
  }
}
</script>

<style>
.products-type {
  border: 1px dashed #4b9983;
  cursor: pointer;
  color: #4b9983
}

.products-active {
  background-color: #4b9983;
  color: #fff;
  z-index: 1040;
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
