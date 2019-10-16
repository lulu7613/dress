<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row my-3">
      <div class="col-md-6">
        <Page :propsPage="pagination" @emitPage="getProducts"/>
      </div>
      <div class="col-md-6 text-right">
        <!-- 製作 model 效果 -->
        <button class="btn btn-primary" @click="openModal('new')">建立新的產品</button>
      </div>
    </div>

    <!-- 商品列表 -->
    <table class="table table-hover">
      <thead>
        <th width="55">編號</th>
        <th width="100">分類</th>
        <th>產品名稱</th>
        <th width="120" class="text-right">原價</th>
        <th width="120" class="text-right">售價</th>
        <th width="120" class="text-center">啟用狀態</th>
        <th width="120" class="text-center">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="item.id">
          <td>{{ index +1 }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-secondary">未啟用</span>
          </td>
          <td class="text-center">
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

    <!-- Modal 新增與修改 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="modalType === 'new'">新增產品</span>
              <span v-else>修改商品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="isfilterLoading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile()"
                  />
                </div>
                <img class="img-fluid" alt :src="tempProduct.imageUrl" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <!-- is_enabled 1=true 0=false -->
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      true-value="1"
                      false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct()">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 刪除 -->
    <div
      class="modal fade"
      id="delProductModal"
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="updateProduct()">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Page from '../components/Pagination.vue'

export default {
  components: {
    Page
  },

  data () {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      modalType: 'new', // 判別開啟的 Modal 是新建、編輯、刪除

      isLoading: false, // vue-loading-overlay Loading 效果
      isfilterLoading: false // font-awsome Loading 效果
    }
  },

  methods: {
    // 取得商品列表 /api/:api_path/admin/products?page=:page
    getProducts (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/products?page=${page}`
      vm.$http.get(api).then((response) => {
        console.log('getProducts()', response.data)
        vm.products = response.data.products
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },

    // 開啟 Modal (新建或編輯)
    openModal (modalType, item) {
      if (modalType === 'new') {
        this.modalType = 'new'
        this.tempProduct = {}
        $('#productModal').modal('show')
      } else if (modalType === 'edit') {
        this.modalType = 'edit'
        this.tempProduct = item
        $('#productModal').modal('show')
      } else {
        this.modalType = 'delete'
        this.tempProduct = item
        $('#delProductModal').modal('show')
      }
    },

    // 更新產品 (按下確認，判斷是新建、編輯、刪除)
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/product`
      let httpMethod = 'post'
      if (this.modalType === 'edit') {
        api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      } else if (this.modalType === 'delete') {
        api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'delete'
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(vm.modalType, response.data)
        if (response.data.success) {
          if (vm.modalType === 'delete') {
            $('#delProductModal').modal('hide')
          } else {
            $('#productModal').modal('hide')
          }
          vm.getProducts()
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
        } else {
          vm.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
      })
    },

    // 上傳圖片 使用 formdata
    uploadFile () {
      const vm = this
      vm.isfilterLoading = true
      const uploadFile = vm.$refs.files.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_ADMIN}/admin/upload`
      vm.$http.post(api, formData, {
        header: {
          type: 'multipart/form-data'
        }
      }).then((response) => {
        console.log('uploadFile', response.data)
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          vm.isfilterLoading = false
        } else {
          this.$bus.$emit('messsage:push', '上傳失敗', 'danger')
          vm.isfilterLoading = false
        }
      })
    }

  },

  created () {
    this.getProducts()
  }
}
</script>
