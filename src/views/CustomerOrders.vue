<template>
  <main class="container my-5">
    <loading :active.sync="isLoading"></loading>
    <h1 class="h2 text-center" style="color:#787878">
      <strong>結帳頁面</strong>
    </h1>
    <!-- 步驟提示 -->
    <div class="form-row mt-5">
      <div class="col-12 col-sm">
        <div
          class="alert alert-success text-center alert-radius"
          style="border-radius: 50px"
          role="alert"
        >1. 輸入訂單資料</div>
      </div>
      <div class="col-12 col-sm">
        <div
          class="alert alert-light text-center alert-radius"
          style="border-radius: 50px"
          role="alert"
        >2. 金流付款</div>
      </div>
      <div class="col-12 col-sm">
        <div
          class="alert alert-light text-center alert-radius"
          style="border-radius: 50px"
          role="alert"
        >3. 完成</div>
      </div>
    </div>

    <!-- 輸入訂單資料 -->
    <div class="row justify-content-center mt-5">
      <div class="col-md-9">
        <!-- 外層 -->
        <div class="input-group input-group-lg mb-1">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponCode" />
          <div class="input-group-append">
            <button class="btn btn-danger" type="button" @click="addCoupon()">套用優惠碼</button>
          </div>
        </div>
        <div class="text-warning mb-4">全館年終大優惠，輸入999，商品一律打9折</div>

        <!-- 收合表單 -->
        <div class="card">
          <div class="card-header d-flex justify-content-between" role="tab" id="headingOne">
            <button
              class="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >顯示購物車細節</button>
            <div
              class="align-self-center mb-0 h4 font-weight-bold"
            >
              <span class="h6" v-if="orders.final_total !== orders.total">( 已折扣 )</span>
              NT {{ orders.final_total | currency }}</div>
          </div>

          <!-- 收合內容 -->
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" style>
            <table class="table mt-3">
              <thead class="alert-primary">
                <th width="45"></th>
                <th width="80"></th>
                <th>商品名稱</th>
                <th width="60" class="text-right">數量</th>
                <th width="130" class="text-right">小計</th>
              </thead>
              <tbody>
                <tr v-for="item in orders.carts" :key="item.id">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
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
                    <router-link
                      :to="`/customer_product/${item.product.id}`"
                    >{{ item.product.title }}</router-link>
                    <div class="text-warning" v-if="item.coupon"><small>已套用優惠券</small></div>
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
                  <td class="text-right">
                    <strong>NT {{ orders.total | currency }}</strong>
                  </td>
                </tr>
                <tr v-if="orders.final_total !== orders.total">
                  <td colspan="4" class="text-right text-danger">
                    <strong>折扣價</strong>
                  </td>
                  <td class="text-right text-danger">
                    <strong>NT {{ orders.final_total | currency }}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 訂購人資訊 -->
    <div class="row justify-content-center mt-5">
      <form class="col-md-9" @submit.prevent="addCartOrder()">
        <h4 class="text-center alert-primary py-3">
          <strong>訂購人資訊</strong>
        </h4>
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
          />
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('name')}"
            placeholder="輸入姓名"
          />
          <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            name="usertel"
            id="usertel"
            v-model="form.user.tel"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('usertel')}"
            placeholder="請輸入電話"
          />
          <span class="text-danger" v-if="errors.has('usertel')">收件人電話不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('address')}"
            placeholder="請輸入地址"
          />
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right pb-4">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
      couponCode: '',
      form: {
        user: {}
      },
      isLoading: false,
      filterLoadingItem: false
    }
  },

  methods: {
    // 取得訂單
    getOrders () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/cart`
      vm.$http.get(api).then((response) => {
        console.log('結帳-輸入訂單資料', response.data)
        if (response.data.success) {
          vm.orders = response.data.data
          vm.isLoading = false
        }
      })
    },

    // 刪除某一筆購物車資料
    removeCart (id) {
      const vm = this
      vm.filterLoadingItem = id
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/cart/${id}`
      vm.$http.delete(api).then((response) => {
        console.log('刪除購物車', response.data)
        if (response.data.success) {
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
          vm.getOrders()
          this.$bus.$emit('cartsQty:update')
          vm.filterLoadingItem = ''
        }
      })
    },

    // 套用優惠券 /api/:api_path/coupon
    addCoupon () {
      const vm = this
      const coupon = {
        'code': vm.couponCode
      }
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/coupon`
      vm.$http.post(api, { data: coupon }).then((response) => {
        console.log('結帳-套用優惠券', response.data)
        if (response.data.success) {
          this.$bus.$emit('messsage:push', response.data.message, 'success')
          this.getOrders()
          this.couponCode = ''
        } else {
          this.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
      })
    },

    // 送出訂單 /api/:api_path/order
    addCartOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/order`

      // vee-validate 表單驗證
      this.$validator.validate().then((result) => {
        if (result) {
          vm.$http.post(api, { data: vm.form }).then((response) => {
            console.log('結帳-送出訂單', response.data)
            if (response.data.success) {
              this.$bus.$emit('cartsQty:update')
              vm.$router.push(`/customer_check/${response.data.orderId}`)
            }
          })
        }
      })
    }

  },

  created () {
    this.getOrders()
  }
}
</script>
