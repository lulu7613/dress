<template>
  <main class="container my-5">
    <!-- 步驟提示 -->
    <div class="form-row mt-5">
      <div class="col-sm">
        <div class="alert alert-light text-center">
          <p class="h3 font-weight-bold">STEP 1</p>確認購物清單
        </div>
      </div>
      <div class="col-sm">
        <div class="alert alert-light text-center">
          <p class="h3 font-weight-bold">STEP 2</p>填寫訂單資料
        </div>
      </div>
      <div class="col-sm">
        <div class="alert alert-success text-center">
          <p class="h3 font-weight-bold">STEP 3</p>完成訂單！
        </div>
      </div>
    </div>

    <div class="mt-3 text-primary" style="font-size: 1.2rem" v-if="order.is_paid">
      <strong>{{ order.user.name }}</strong> 小姐/先生：
      <br />感謝您對
      <strong>翠絲服飾</strong> 的支持，以下是您的結帳明細，請妥善保管哦。
    </div>

    <form class="my-4 row" @submit.prevent="payOrder()">
      <div class="col-md-6">
        <h5 class="font-weight-bold mb-2">購買商品細節</h5>
        <table class="table">
          <thead class="alert-light">
            <th>品名</th>
            <th width="120" class="text-right">數量</th>
            <th width="150" class="text-right">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle text-right">{{ item.qty }}{{ item.product.unit }}</td>
              <td class="align-middle text-right">NT {{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">NT {{ order.total | currency }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="col-md-6">
        <h5 class="font-weight-bold mb-2">購買人資料</h5>
        <table class="table" v-if="order.user">
          <tbody>
            <tr>
              <th class="alert-light" width="120">訂單序號</th>
              <td>{{ order.id }}</td>
            </tr>
            <tr>
              <th class="alert-light" width="120">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th class="alert-light">姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th class="alert-light">收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th class="alert-light">收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th class="alert-light">留言</th>
              <td>{{ order.message }}</td>
            </tr>
            <tr>
              <th class="alert-light">付款狀態</th>
              <td>
                <span class="text-danger" v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">
                  付款完成
                  <i class="far fa-check-circle"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="!order.is_paid">
          <button class="btn btn-lg btn-danger">確認付款去</button>
        </div>
      </div>
    </form>
    <div class="text-center" v-if="order.is_paid">
      <router-link class="btn btn-primary btn-lg" to="/customer_products">
        <i class="fas fa-shopping-cart"></i>
        繼續購物
      </router-link>
      <router-link class="btn btn-primary btn-lg ml-5" to="/my_order">
        <i class="fas fa-columns"></i>
        我的訂單
      </router-link>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('Orders', ['order'])
  },

  methods: {
    // 取得單一筆結帳訂單
    getOrder () {
      const orderId = this.$route.params.orderId
      this.$store.dispatch('Orders/ORDER_SINGLE_GET', orderId)
    },

    // 結帳付款
    payOrder () {
      const orderId = this.$route.params.orderId
      this.$store.dispatch('Orders/ORDER_PAY', orderId)
    }
  },

  created () {
    this.getOrder()
  }
}
</script>
