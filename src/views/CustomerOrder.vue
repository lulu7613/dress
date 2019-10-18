<template>
  <main class="container my-5">
    <loading :active.sync="isLoading"></loading>
    <!-- 步驟提示 -->
    <div class="form-row mt-5">
      <div class="col-sm">
        <div class="alert alert-light text-center">
          <p class="h3 font-weight-bold">STEP 1</p>確認購物清單
        </div>
      </div>
      <div class="col-sm">
        <div class="alert alert-success text-center">
          <p class="h3 font-weight-bold">STEP 2</p>填寫訂單資料
        </div>
      </div>
      <div class="col-sm">
        <div class="alert alert-light text-center">
          <p class="h3 font-weight-bold">STEP 3</p>完成訂單！
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <!-- 輸入訂單資料 -->
      <div class="col-md-5">
        <!-- 收合表單 -->
        <div class="card">
          <div
            class="card-header alert-primary d-flex justify-content-between"
            role="tab"
            id="headingOne"
          >
            <button
              class="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <strong>隱藏購物車細節</strong>
            </button>
            <div class="align-self-center mb-0 h4 font-weight-bold">
              <span class="h6" v-if="orders.final_total !== orders.total">( 已折扣 )</span>
              NT {{ orders.final_total | currency }}
            </div>
          </div>

          <!-- 收合內容 -->
          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" style>
            <table class="table">
              <thead class="alert-light">
                <th width="80"></th>
                <th>商品名稱</th>
                <th width="60" class="text-right">數量</th>
                <th width="130" class="text-right">小計</th>
              </thead>
              <tbody>
                <tr v-for="item in orders.carts" :key="item.id">
                  <td>
                    <img :src="item.product.imageUrl" class="img-fluid" alt />
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
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
                  <td colspan="3" class="text-right">
                    <strong>總計</strong>
                  </td>
                  <td class="text-right">
                    <del v-if="orders.final_total !== orders.total">NT {{ orders.total | currency }}</del>
                    <strong v-else>NT {{ orders.total | currency }}</strong>
                  </td>
                </tr>
                <tr v-if="orders.final_total !== orders.total">
                  <td colspan="3" class="text-right text-danger">
                    <strong>折扣價</strong>
                  </td>
                  <td class="text-right text-danger h5">
                    <strong>NT {{ orders.final_total | currency }}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <!-- 訂購人資訊 -->
      <form class="col-md-7" @submit.prevent="addCartOrder()">
        <h4 class="text-center alert-info py-3">
          <strong>填寫訂購人資料</strong>
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
        <div class="text-right d-flex mt-5">
          <button class="btn btn-lg btn-secondary mr-auto" @click="goHomePage()">取消訂單：回首頁</button>
          <button class="btn btn-lg btn-danger">下一步：送出訂單</button>
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
      filterLoadingItem: '',
      isDisabled: ''
    }
  },

  methods: {
    // 取得訂單
    getOrders () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/cart`
      vm.$http.get(api).then((response) => {
        console.log('填寫訂單資料-取得訂單', response.data)
        if (response.data.success) {
          if (response.data.data.carts.length === 0) {
            vm.$router.push('/customer_products')
            vm.isLoading = false
          } else {
            vm.orders = response.data.data
            vm.isLoading = false
          }
        }
      })
    },

    // 下一步: 送出訂單 /api/:api_path/order
    addCartOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/order`
      // vee-validate 表單驗證
      this.$validator.validate().then((result) => {
        if (result) {
          vm.$http.post(api, { data: vm.form }).then((response) => {
            console.log('填寫訂單資料-送出訂單', response.data)
            if (response.data.success) {
              this.$bus.$emit('cartsQty:update')
              vm.$router.push(`/customer_finish/${response.data.orderId}`)
            }
          })
        }
      })
    },

    // 上一步: 回首頁
    goHomePage () {
      this.$router.push('/customer_products')
      window.scroll(0, 0)
    }

  },

  created () {
    this.getOrders()
  }
}
</script>
