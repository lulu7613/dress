<template>
  <main class="my-5">
    <loading :active.sync="isLoading"></loading>
    <h1 class="h2 text-center" style="color:#787878">
      <strong>結帳頁面</strong>
    </h1>

    <!-- 步驟提示 -->
    <div class="container justify-content-center">
      <div class="form-row mt-5">
        <div class="col-12 col-sm">
          <div
            class="alert alert-light text-center alert-radius"
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
            class="alert alert-success text-center alert-radius"
            style="border-radius: 50px"
            role="alert"
          >3. 完成</div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center my-4">
      <div class="col-md-6">
        <strong>{{ order.user.name }}</strong> 小姐/先生:
        <br />感謝您對
        <strong>翠絲服飾</strong> 的支持，以下是您的結帳資訊。
      </div>
    </div>

    <div class="pb-4 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder()">
        <table class="table">
          <thead>
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

        <table class="table">
          <tbody>
            <tr>
              <th width="130">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: {}
      },
      isLoading: false
    }
  },

  created () {
    const vm = this
    vm.isLoading = true
    const orderId = this.$route.params.id
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/order/${orderId}`
    this.$http.get(api).then((response) => {
      console.log('結帳-金流付款', response.data)
      vm.order = response.data.order
      vm.order.is_paid = true
      vm.isLoading = false
    })
  }
}
</script>
