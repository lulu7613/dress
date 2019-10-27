<template>
  <main class="container my-5">
    <!-- 步驟提示 -->
    <div class="form-row my-5">
      <div class="col-sm">
        <div class="alert alert-success text-center">
          <p class="h3 font-weight-bold">STEP 1</p>確認購物清單
        </div>
      </div>
      <div class="col-sm">
        <div class="alert alert-light text-center">
          <p class="h3 font-weight-bold">STEP 2</p>填寫訂單資料
        </div>
      </div>
      <div class="col-sm">
        <div class="alert alert-light text-center">
          <p class="h3 font-weight-bold">STEP 3</p>完成訂單！
        </div>
      </div>
    </div>

    <!-- coupon -->
    <div class="input-group input-group-lg mb-1">
      <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponCode" />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addCoupon()">套用優惠碼</button>
      </div>
    </div>
    <div class="text-danger mb-4">全館年終大優惠，輸入999，商品一律打9折</div>

    <!-- 購物明細 -->
    <div v-if="cartsQty > 0">
      <table class="table mt-3">
        <thead class="alert-light">
          <th width="50"></th>
          <th width="120" class="text-center">圖片</th>
          <th>商品名稱</th>
          <th width="100" class="text-right">數量</th>
          <th width="180" class="text-right">小計</th>
        </thead>
        <tbody>
          <tr v-for="item in carts.carts" :key="item.id">
            <td class="align-middle">
              <button
                type="button"
                class="btn text-danger btn-lg"
                :disabled="isDisabled === item.id"
                @click="removeCart(item.id)"
              >
                <i class="fas fa-spinner fa-spin" v-if="filterLoadingItem === item.id"></i>
                <i class="far fa-trash-alt" v-else></i>
              </button>
            </td>
            <td>
              <img :src="item.product.imageUrl" class="img-fluid" alt />
            </td>
            <td class="align-middle">
              <router-link :to="`/customer_product/${item.product.id}`">{{ item.product.title }}</router-link>
              <div class="text-info" v-if="item.coupon">
                <small>已套用優惠券</small>
              </div>
            </td>
            <td class="align-middle text-right">{{ item.qty }}件</td>
            <td class="align-middle text-right">{{ item.final_total | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">
              <strong>總計</strong>
            </td>
            <td class="text-right h5">
              <del v-if="carts.final_total !== carts.total">NT {{ carts.total | currency }}</del>
              <strong v-else>NT {{ carts.total | currency }}</strong>
            </td>
          </tr>
          <tr v-if="carts.final_total !== carts.total">
            <td colspan="4" class="text-right text-danger h5">
              <strong>折扣價</strong>
            </td>
            <td class="text-right text-danger h4">
              <strong>NT {{ carts.final_total | currency }}</strong>
            </td>
          </tr>
        </tfoot>
      </table>

      <div class="text-right d-flex mt-5">
        <router-link class="btn btn-lg btn-secondary mr-auto" to="/customer_products">上一步：繼續購物</router-link>
        <button class="btn btn-lg btn-primary" @click="goOrder()">下一步：填寫資料</button>
      </div>
    </div>
    <div class="text-center" v-else>
      <p class="h5 mb-4">哎呀！購物車被清光了！要回去購物嗎？</p>
      <router-link class="btn btn-lg btn-primary" to="/customer_products">
        <i class="fas fa-angle-right"></i>
        回購物商城
        <i class="fas fa-angle-left"></i>
      </router-link>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      couponCode: ''
    }
  },

  computed: {
    ...mapGetters('Cart', ['carts', 'cartsQty', 'isDisabled']),
    ...mapGetters(['filterLoadingItem'])
  },

  methods: {
    // 取得購物車列表
    ...mapActions('Cart', ['CART_GET']),

    // 刪除某一筆購物車資料
    removeCart (id) {
      this.$store.dispatch('Cart/CART_REMOVE', id)
    },

    // 套用優惠券 /api/:api_path/coupon
    addCoupon () {
      const vm = this
      const coupon = {
        'code': vm.couponCode
      }
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/coupon`
      vm.$http.post(api, { data: coupon }).then((response) => {
        console.log('確認購物清單-套用優惠券', response.data)
        if (response.data.success) {
          vm.$store.dispatch('MESSAGE_UPDATE', { // vuex alertMessage
            message: response.data.message,
            status: 'success'
          })
          vm.ORDERS_GET()
          vm.couponCode = ''
        } else {
          vm.$store.dispatch('MESSAGE_UPDATE', { // vuex alertMessage
            message: response.data.message,
            status: 'danger'
          })
        }
      })
    },

    // 下一步 (去 customer_order)
    goOrder () {
      this.$router.push('/customer_order')
    }

  },

  created () {
    this.CART_GET()
  }
}
</script>
