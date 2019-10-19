<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 麵包屑分頁 -->
    <Breadcrumb class="container mt-3" :propsData="tempProduct" />
    <main class="container my-5 main">
      <!-- product 主要商品展示 -->
      <div class="row border-bottom" id="product-main">
        <div class="col-lg-6 text-center product-img mb-5">
          <img :src="tempProduct.imageUrl" alt="1101al.jpg" class="img-fluid" />
        </div>
        <div class="col-lg-5 mb-5" id="product-content-main">
          <div class="d-flex align-items-baseline">
            <h1 class="h3 font-weight-bolder mr-3">{{ tempProduct.title }}</h1>
            <span
              class="text-info"
              style="font-size: 1.1rem; cursor: pointer;"
              v-if="myFavorite.find(obj => obj.id === tempProduct.id)"
              @click.prevent="removeFavorite()"
            >
              <i class="fas fa-heart"></i>
              已加入最愛
            </span>
            <span
              class="text-primary"
              style="font-size: 1.1rem; cursor: pointer;"
              v-else
              @click.prevent="addFavorite()"
            >
              <i class="far fa-heart"></i>
              加入最愛
            </span>
          </div>
          <span
            class="badge badge-secondary mb-2"
            v-if="tempProduct.category === '主題商品'"
          >{{ tempProduct.category }}</span>
          <span
            class="badge badge-warning mb-2"
            v-if="tempProduct.category === '人氣精選'"
          >{{ tempProduct.category }}</span>
          <span
            class="badge badge-success mb-2"
            v-if="tempProduct.category === '清倉55折'"
          >{{ tempProduct.category }}</span>
          <p>{{tempProduct.content}}</p>
          <div class="d-flex justify-content-end align-items-end">
            <del>
              <div class="h5" v-if="tempProduct.price">原價 NT$ {{tempProduct.origin_price}}</div>
            </del>
            <div class="h3 ml-auto text-danger" v-if="tempProduct.price">
              <small class="font-weight-bold">特價 NT$</small>
              <strong>{{ tempProduct.price }}</strong>
            </div>
            <div class="h3 ml-auto text-danger" v-if="!tempProduct.price">
              <small class="font-weight-bold">售價 $NT</small>
              <strong>{{tempProduct.origin_price}}</strong>
            </div>
          </div>

          <hr />

          <div class="input-group mt-3">
            <select class="form-control mr-3" v-model="tempProduct.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{tempProduct.unit}}</option>
            </select>
            <button
              class="btn btn-primary"
              :disabled="isDisabled === tempProduct.id"
              @click="addCart(tempProduct.id, tempProduct.num)"
            >
              <i class="fas fa-spinner fa-spin" v-if="filterLoadingItem === tempProduct.id"></i>
              加入購物車
            </button>
          </div>
          <div class="text-muted text-right text-nowrap mt-3" v-if="tempProduct.num >1">
            小計
            <strong v-if="tempProduct.price">{{ tempProduct.num * tempProduct.price | currency }}元</strong>
            <strong v-else>{{ tempProduct.num * tempProduct.origin_price | currency }}元</strong>
          </div>
        </div>
      </div>
      <!-- 同類型產品 -->
      <h6 class="my-3 pl-4">其他同款商品</h6>
      <ProductTemplate
        :propsData="sameCategoryProducts"
        :propsFavorite="myFavorite"
        @emit="changeProduct"
        @emitFavoriteId="getFavorite"
      />
    </main>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'
import ProductTemplate from '../components/ProductTemplate.vue'

export default {
  components: {
    Breadcrumb,
    ProductTemplate
  },

  data () {
    return {
      itemId: '',
      products: [],
      sameCategoryProducts: [],
      tempProduct: {},
      isDisabled: '',

      myFavorite: JSON.parse(localStorage.getItem('dressMyFavorite')) || [],

      filterLoadingItem: '',
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
          // localStorage 判斷是否為我的最愛
          vm.myFavorite = JSON.parse(localStorage.getItem('dressMyFavorite')) || []
          vm.myFavorite.forEach(item => {
            if (item.id === vm.itemId) {
              vm.isFavorite = true
            } else {
              vm.isFavorite = false
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
    },

    // localStorage 加入我的最愛
    addFavorite () {
      const vm = this
      vm.myFavorite.push(vm.tempProduct)
      vm.$bus.$emit('messsage:push', '商品加入我的最愛囉～', 'success')
      localStorage.setItem('dressMyFavorite', JSON.stringify(vm.myFavorite))
    },

    // localStorage 移除我的最愛
    removeFavorite () {
      const vm = this
      vm.myFavorite.filter((item, index) => {
        if (item.id === vm.itemId) {
          return vm.myFavorite.splice(index, 1)
        }
      })
      vm.$bus.$emit('messsage:push', '商品從我的最愛移除！', 'danger')
      localStorage.setItem('dressMyFavorite', JSON.stringify(vm.myFavorite))
    },

    // 獲取 favorite 變化
    getFavorite () {
      const vm = this
      vm.myFavorite = JSON.parse(localStorage.getItem('dressMyFavorite')) || []
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
