<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-5" v-for="item in propsData" :key="item.id">
      <div class="card product-template">
        <img :src="item.imageUrl" class="card-img-top pt-3 px-3" :alt="item.title" />
        <div class="card-body">
          <span
            class="badge badge-secondary float-right ml-2"
            v-if="item.category === '主題商品'"
          >{{ item.category }}</span>
          <span
            class="badge badge-warning float-right ml-2"
            v-if="item.category === '人氣精選'"
          >{{ item.category }}</span>
          <span
            class="badge badge-success float-right ml-2"
            v-if="item.category === '清倉55折'"
          >{{ item.category }}</span>

          <h6 class="card-title">
            <a href="#" class="text-dark" @click="goToProductPage(item.id)">{{item.title}}</a>
          </h6>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h6 font-weight-bold" v-if="!item.price">NT{{item.origin_price | currency}}</div>
            <del v-if="item.price">
              <small>原價 NT{{item.origin_price | currency}}</small>
            </del>
            <div
              class="h6 text-danger font-weight-bold"
              v-if="item.price"
            >特價 NT{{item.price | currency}}</div>
          </div>
        </div>
        <div class="card-footer d-flex bg-white">
          <button type="button" class="btn btn-light btn-sm" @click="goToProductPage(item.id)">查看更多</button>
          <button
            type="button"
            class="btn btn-primary btn-sm ml-auto"
            :disabled="isDisabled === item.id"
            @click="addCart(item.id)"
          >
            <i class="fas fa-spinner fa-spin" v-if="filterLoadingItem === item.id"></i>
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['propsData'],

  data () {
    return {
      filterLoadingItem: '',
      isDisabled: ''
    }
  },

  methods: {
    // 點擊查看更多到商品細項元件 CustomerProduct/:id
    goToProductPage (id) {
      this.$router.push(`/customer_product/${id}`)
      this.$emit('emit', id)
    },

    // 加入購物車 (qty 為 1) /api/:api_path/cart
    addCart (id, qty = 1) {
      const vm = this
      vm.filterLoadingItem = id
      vm.isDisabled = id
      const postData = {
        'product_id': id,
        'qty': qty
      }
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/cart`
      vm.$http.post(api, { data: postData }).then((response) => {
        console.log('加入購物車(temp)', response.data)
        if (response.data.success) {
          vm.filterLoadingItem = ''
          vm.isDisabled = ''
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
          vm.$bus.$emit('cartsQty:update')
        }
      })
    }
  }
}
</script>

<style>
.product-template {
  transition: all .2s;
}

.product-template:hover {
  box-shadow: 1px 5px 5px rgba(102, 92, 92, 0.75);
  margin: 0 -5px -5px 0;
  transition: all .2s;
}
</style>
