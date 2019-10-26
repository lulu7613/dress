<template>
  <div>
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
              <div
                class="h5"
                v-if="tempProduct.origin_price !== tempProduct.origin_price"
              >原價 NT$ {{tempProduct.origin_price}}</div>
            </del>
            <div class="h3 ml-auto text-danger" v-if="tempProduct.origin_price !== tempProduct.origin_price">
              <small class="font-weight-bold">特價 NT$</small>
              <strong>{{ tempProduct.price }}</strong>
            </div>
            <div class="h3 ml-auto text-danger" v-if="tempProduct.origin_price === tempProduct.origin_price">
              <small class="font-weight-bold">售價 $NT</small>
              <strong>{{tempProduct.origin_price}}</strong>
            </div>
          </div>

          <hr />

          <div class="input-group mt-3">
            <select class="form-control mr-3" v-model="buyNum">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{tempProduct.unit}}</option>
            </select>
            <button
              class="btn btn-primary"
              :disabled="isDisabled === tempProduct.id"
              @click="addCart(tempProduct.id, buyNum)"
            >
              <i class="fas fa-spinner fa-spin" v-if="filterLoadingItem === tempProduct.id"></i>
              加入購物車
            </button>
          </div>
          <div class="text-muted text-right text-nowrap mt-3" v-if="buyNum >1">
            小計
            <strong
              v-if="tempProduct.price > 0"
            >{{ buyNum * tempProduct.price | currency }}元</strong>
            <strong v-else>{{ buyNum * tempProduct.origin_price | currency }}元</strong>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Breadcrumb,
    ProductTemplate
  },

  data () {
    return {
      itemId: this.$route.params.id,
      buyNum: 1,
      myFavorite: JSON.parse(localStorage.getItem('dressMyFavorite')) || []
    }
  },

  computed: {
    ...mapGetters('Cart', ['isDisabled']),
    ...mapGetters('Products', ['products']),
    ...mapGetters(['filterLoadingItem']),

    // 搜尋相同 id 商品
    tempProduct () {
      let data = []
      return this.products.find((item) => {
        if (item.id === this.itemId) {
          data.push(item)
          return data
        }
      })
    },

    // 相同 category 的商品 (不包括 tempProduct 本身)
    sameCategoryProducts () {
      let data = []
      this.products.forEach((item) => {
        if (item.id !== this.tempProduct.id && item.category === this.tempProduct.category) {
          data.push(item)
        }
      })
      return data
    }
  },

  methods: {
    // 取得商品列表
    ...mapActions('Products', ['PRODUCTS_GET']),

    // 更換產品
    changeProduct (id) {
      const vm = this
      vm.itemId = id
    },

    // 加入購物車 /api/:api_path/cart
    addCart (id, qty) {
      this.$store.dispatch('Cart/CART_ADD', {
        id,
        qty
      })
    },

    // localStorage 加入我的最愛
    addFavorite () {
      const vm = this
      vm.myFavorite.push(vm.tempProduct)
      vm.$store.dispatch('MESSAGE_UPDATE', { // vuex alertMessage
        message: '商品加入我的最愛囉～',
        status: 'success'
      })
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
      vm.$store.dispatch('MESSAGE_UPDATE', { // vuex alertMessage
        message: '商品從我的最愛移除。',
        status: 'danger'
      })
      localStorage.setItem('dressMyFavorite', JSON.stringify(vm.myFavorite))
    },

    // 獲取 favorite 變化
    getFavorite () {
      const vm = this
      vm.myFavorite = JSON.parse(localStorage.getItem('dressMyFavorite')) || []
    }
  },

  created () {
    this.PRODUCTS_GET()
  }
}
</script>
