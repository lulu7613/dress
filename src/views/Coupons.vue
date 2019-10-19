<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row my-3">
      <div class="col-md-6">
        <Page @postPage="getCoupons" :propsPage="pagination" />
      </div>
      <div class="col-md-6 text-right">
        <button class="btn btn-primary" @click="openModal('new')">新增優惠券</button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <th>名稱</th>
          <th width="130">折扣百分比</th>
          <th width="130">到期日</th>
          <th width="130">是否啟用</th>
          <th width="130">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ item.due_date | date }}</td>
            <td>
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span class="text-secondary" v-else>不啟用</span>
            </td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', item)"
                >編輯</button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', item)"
                >刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal 新增、編輯優惠券 -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" v-if="modalType === 'new'">新增優惠券</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>修改優惠券</h5>
            <button type="button" class="close" aria-label="Close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date" v-model="due_date" />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon()">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 刪除 -->
    <div
      class="modal fade"
      id="delModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              @click="closeModal()"
            >取消</button>
            <button type="button" class="btn btn-danger" @click="updateCoupon()">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '../components/Pagination.vue'
import $ from 'jquery'

export default {
  components: {
    Page
  },

  data () {
    return {
      isLoading: false, // vue-loading-overlay 插件開關
      coupons: [], // 接收 ajax 的訂單列表
      tempCoupon: {}, // 新增與修改存取
      pagination: {}, // 接收 ajax 的 page 資料，要 props 給 Pagination.vue
      modalType: 'new', // modal 判斷
      due_date: ''
    }
  },

  watch: {
    // 監聽 due_date ，將值轉為一串數字，存進 tempCoupon.due_date
    due_date () {
      const timestamp = Math.floor(new Date(this.due_date) / 1000)
      this.tempCoupon.due_date = timestamp
    }
  },

  methods: {
    // 接收 ajax 的資料，存放進 this.coupons
    // 接收子元件(Pagination 分頁元件) 傳來的頁數參數
    getCoupons (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/coupons?page=${page}`
      this.$http.get(api).then((response) => {
        console.log('優惠券列表', response.data)
        this.isLoading = false
        this.coupons = response.data.coupons
        this.pagination = response.data.pagination
      })
    },

    // 開啟 Modal (新增、修改、刪除)
    openModal (modalType, item) {
      const vm = this
      if (modalType === 'new') {
        vm.modalType = 'new'
        vm.tempCoupon = {}
        $('#couponModal').modal('show')
      } else if (modalType === 'edit') {
        vm.modalType = 'edit'
        vm.tempCoupon = item
        $('#couponModal').modal('show')
      } else if (modalType === 'delete') {
        vm.modalType = 'delete'
        vm.tempCoupon = item
        $('#delModal').modal('show')
      }
    },

    // 新增、修改、刪除，按下確認鍵
    updateCoupon () {
      const vm = this
      let api = ''
      let httpMethod = ''
      if (this.modalType === 'new') {
        api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/coupon`
        httpMethod = 'post'
      } else if (this.modalType === 'edit') {
        api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/coupon/${this.tempCoupon.id}`
        httpMethod = 'put'
      } else if (this.modalType === 'delete') {
        api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/coupon/${this.tempCoupon.id}`
        httpMethod = 'delete'
      }

      vm.$http[httpMethod](api, { 'data': vm.tempCoupon }).then((response) => {
        console.log(this.modalType, response.data)
        this.getCoupons()
        $('#couponModal').modal('hide')
        $('#delModal').modal('hide')
      })
    }
  },

  created () {
    this.getCoupons()
  }
}
</script>
