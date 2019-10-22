<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Banner class="mb-5" />
    <div class="col-md-11 mx-auto mb-5">
      <div class="container-fluid">
        <div class="row">
          <!-- 列表 -->
          <div class="col-md-2 mb-4">
            <div class="nav flex-column nav-pills sticky-top">
              <a
                class="nav-link mb-2 active my-order-type"
                data-toggle="pill"
                href="#"
                @click.prevent="type = 'all'"
              >
                <i class="fas fa-angle-right" v-if="type === 'all'"></i>
                全部訂單
              </a>
              <a
                class="nav-link mb-2 my-order-type"
                data-toggle="pill"
                href="#"
                @click.prevent="type = 'paid'"
              >
                <i class="fas fa-angle-right" v-if="type === 'paid'"></i>
                已付款
              </a>
              <a
                class="nav-link mb-2 my-order-type"
                data-toggle="pill"
                href="#"
                @click.prevent="type = 'noPaid'"
              >
                <i class="fas fa-angle-right" v-if="type === 'noPaid'"></i>
                未付款
              </a>
              <div class="input-group mt-3">
                <input
                  type="text"
                  class="form-control"
                  style="border: 1px solid #4b9983"
                  placeholder="輸入序號"
                  v-model="keyword"
                  @keyup.enter="type = keyword"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button" @click="type = keyword">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 內容 -->
          <div class="col-md-10">
            <h1 class="h5 text-primary font-weight-bolder mb-3">
              <i class="fas fa-columns"></i>
              我的訂單
            </h1>

            <div class="table-responsive">
              <table class="table table-hover mb-5">
                <thead class="alert-light">
                  <th width="120">購買時間</th>
                  <th>序號</th>
                  <th>購買人</th>
                  <th width="120" class="text-right">結帳金額</th>
                  <th width="140" class="text-center">是否付款</th>
                  <th width="90" class="text-right">購買細項</th>
                </thead>
                <tbody>
                  <tr v-for="item in filterOrder" :key="item.id">
                    <td>{{ item.create_at | date }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.user.name }}</td>
                    <td class="text-right">{{ item.total | currency }}</td>
                    <td class="text-center">
                      <strong v-if="item.is_paid" class="text-success">已付款</strong>
                      <span v-if="!item.is_paid" class="text-muted">未付款</span>
                      <button
                        v-if="!item.is_paid"
                        class="btn btn-sm btn-info ml-1"
                        @click="goPay(item.id)"
                      >付款</button>
                    </td>
                    <td class="text-right">
                      <button class="btn btn-sm btn-primary" @click="openModal(item)">細項</button>
                    </td>
                  </tr>
                  <tr v-if="filterOrder.length ===0">
                    <td colspan="6" v-if="type === 'noPaid' && filterOrder.length ===0">恭喜！您的款項都付清了。</td>
                    <td colspan="6" v-if="type === 'paid' && filterOrder.length ===0">您的訂單都還未付款呢！</td>
                    <td
                      colspan="6"
                      v-if="type === keyword && filterOrder.length ===0"
                    >拍謝！搜尋不到您輸入的訂單。</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center">
              <button class="btn btn-primary btn-lg" @click="goHomePage()">
                <i class="fas fa-angle-right"></i>
                回購物商城
                <i class="fas fa-angle-left"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- orderDetial modal -->
    <div
      class="modal fade"
      id="orderDetialModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單明細</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-4">
                <ul class="myOrder-list pl-2">
                  <li class="mb-3 d-flex d-lg-block">
                    <div class="text-primary font-weight-bolder">序號</div>
                    <span class="ml-3 ml-lg-0" style="color: #444444">{{tempOrder.id}}</span>
                  </li>
                  <li class="mb-3 d-flex d-lg-block">
                    <div class="text-primary font-weight-bolder">購買時間</div>
                    <span class="ml-3 ml-lg-0" style="color: #444444">{{tempOrder.create_at | date}}</span>
                  </li>
                  <li class="mb-3 d-flex d-lg-block" v-if="tempOrder.user">
                    <div class="text-primary font-weight-bolder">購買人</div>
                    <span class="ml-3 ml-lg-0" style="color: #444444">{{tempOrder.user.name}}</span>
                  </li>
                  <li class="mb-3 d-flex d-lg-block">
                    <div class="text-info font-weight-bolder align-self-center">是否付款</div>
                    <strong v-if="tempOrder.is_paid" class="text-success align-self-center">已付款</strong>
                    <span v-if="!tempOrder.is_paid" class="text-muted align-self-center">未付款</span>
                    <button
                      v-if="!tempOrder.is_paid"
                      class="btn btn-sm btn-info ml-2"
                      @click="goPay(tempOrder.id)"
                    >付款</button>
                  </li>
                  <li class="mb-3 d-flex d-lg-block">
                    <div class="text-info font-weight-bolder">結帳金額</div>
                    <span
                      class="ml-3 ml-lg-0"
                      style="color: #444444"
                    >NT {{tempOrder.total | currency}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-8">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="alert-light">
                      <th width="80"></th>
                      <th>商品名稱</th>
                      <th width="60" class="text-center">數量</th>
                      <th width="90" class="text-right">小計</th>
                    </thead>
                    <tbody>
                      <tr v-for="item in tempOrder.products" :key="item.id">
                        <td>
                          <img
                            :src="item.product.imageUrl"
                            class="img-fluid"
                            :alt="item.product.imageUrl"
                          />
                        </td>
                        <td class="align-middle">
                          {{ item.product.title }}
                          <div class="text-info" v-if="item.coupon">
                            <small>已套用優惠券</small>
                          </div>
                        </td>
                        <td class="align-middle text-center">{{ item.qty }}件</td>
                        <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import $ from 'jquery'

export default {
  components: {
    Banner
  },

  data () {
    return {
      myOrders: [],
      tempOrder: [],
      type: 'all',
      keyword: '',
      isLoading: false
    }
  },

  computed: {
    filterOrder () {
      const vm = this
      let data = []
      if (vm.type === 'all') {
        data = vm.myOrders
      } else if (vm.type === 'paid') {
        data = vm.myOrders.filter(item => item.is_paid)
      } else if (vm.type === 'noPaid') {
        data = vm.myOrders.filter(item => !item.is_paid)
      } else {
        data = vm.myOrders.filter(item => {
          if (item.id === vm.keyword) {
            return true
          }
        })
      }
      return data
    }
  },

  methods: {
    // 取得商品列表 /api/:api_path/orders?page=:page
    getOrders (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/orders?page=${page}`
      vm.$http.get(api).then((response) => {
        console.log('我的訂單-取得訂單列表', response.data.orders)
        if (response.data.success) {
          let localData = JSON.parse(localStorage.getItem('dressMyOrder')) // localStorage
          // let arrC = arrA.filter(itemA => arrB.map(itemB => itemB.id).includes(itemA.id))
          vm.myOrders = response.data.orders.filter(itemA => {
            return localData.map(itemB => {
              return itemB.id
            }).includes(itemA.id)
          })
          vm.isLoading = false
        } else {
          vm.$router.push(`/customer_products`)
        }
      })
    },

    // 開啟 modla
    openModal (item) {
      $('#orderDetialModal').modal('show')
      this.tempOrder = item
    },

    // 前往付款頁面 ( customer_finish/:id )
    goPay (id) {
      $('#orderDetialModal').modal('hide')
      this.$router.push(`/customer_finish/${id}`)
    },

    // 回首頁
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

<style>
.my-order-type {
  border: 1px dashed #4b9983;
}

.my-order-type:hover {
  color: #eb6241;
  background-color: #fce6a9;
}

.myOrder-list {
  list-style-type: none;
}
</style>
