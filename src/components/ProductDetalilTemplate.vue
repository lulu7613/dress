<template>
  <div class="row border-bottom" id="product-main">
    <div class="col-lg-6 text-center product-img mb-5">
      <img :src="propsData.imageUrl" alt="1101al.jpg" class="img-fluid" />
    </div>
    <div class="col-lg-5 mb-5" id="product-content-main">
      <div class="d-flex align-items-baseline">
        <h1 class="h3 font-weight-bolder mr-auto">{{ propsData.title }}</h1>
      </div>
      <span
        class="badge badge-secondary mb-2"
        v-if="propsData.category === '主題商品'"
      >{{ propsData.category }}</span>
      <span
        class="badge badge-warning mb-2"
        v-if="propsData.category === '人氣精選'"
      >{{ propsData.category }}</span>
      <span
        class="badge badge-success mb-2"
        v-if="propsData.category === '清倉55折'"
      >{{ propsData.category }}</span>
      <p>{{propsData.content}}</p>
      <div class="d-flex justify-content-end align-items-end">
        <del>
          <div class="h5" v-if="propsData.price">原價 NT${{propsData.origin_price}}</div>
        </del>
        <div class="h3 ml-auto text-danger" v-if="propsData.price">
          <small class="font-weight-bold">特價 NT$</small>
          <strong>{{ propsData.price }}</strong>
        </div>
        <div class="h3 ml-auto text-danger" v-if="!propsData.price">
          <small class="font-weight-bold">售價 $NT</small>
          <strong>{{propsData.origin_price}}</strong>
        </div>
      </div>

      <hr />

      <!-- <span class="text-muted mr-1">尺寸 :</span>
      <div class="btn-group btn-group-toggle">
        <label
          class="btn btn-outline-secondary"
          :class="{'active': propsData.description === 'S'}"
        >
          <input type="radio" name="buy-size" value="S" v-model="propsData.description" /> S
        </label>
        <label
          class="btn btn-outline-secondary"
          :class="{'active': propsData.description === 'M'}"
        >
          <input type="radio" name="buy-size" value="M" v-model="propsData.description" /> M
        </label>
        <label
          class="btn btn-outline-secondary"
          :class="{'active': propsData.description === 'L'}"
        >
          <input type="radio" name="buy-size" value="L" v-model="propsData.description" /> L
        </label>
        <label
          class="btn btn-outline-secondary"
          :class="{'active': propsData.description === 'XL'}"
        >
          <input type="radio" name="buy-size" value="XL" v-model="propsData.description" /> XL
        </label>
      </div>-->

      <div class="input-group mt-3">
        <select class="form-control mr-3" v-model="propsData.num">
          <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{propsData.unit}}</option>
        </select>
        <button class="btn btn-primary" @click="addCart(propsData.id, propsData.num)">
          <i class="fas fa-spinner fa-spin" v-if="filterLoadingItem === propsData.id"></i>
          加入購物車
        </button>
      </div>
      <div class="text-muted text-right text-nowrap mt-3" v-if="propsData.num >1">
        小計
        <strong>{{ propsData.num * propsData.price | currency }}</strong> 元
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['propsData'],

  data () {
    return {
      filterLoadingItem: ''
    }
  },

  methods: {
    // 加入購物車 /api/:api_path/cart
    addCart (id, qty = 1) {
      const vm = this
      vm.filterLoadingItem = id
      const postData = {
        'product_id': id,
        'qty': qty
      }
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/cart`
      vm.$http.post(api, { data: postData }).then((response) => {
        console.log('加入購物車(dital)', response.data)
        if (response.data.success) {
          vm.filterLoadingItem = ''
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
          vm.$bus.$emit('cartsQty:update')
        }
      })
    }
  }
}
</script>
