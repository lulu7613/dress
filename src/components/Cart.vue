<template>
  <div>
    <div class="cart-style" style="position: fixed; bottom:5%; right: 1%">
      <button type="button" class="btn btn-cart" :class="animateCss" @click="openCartModal()">
        <i class="fas fa-shopping-cart text-dark fa-3x"></i>
        <span class="badge badge-pill badge-danger bage-num">{{ cartsQty }}</span>
      </button>
    </div>

    <div>
      <!-- Cart Modal -->
      <div class="modal fade" id="cartModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header alert-primary" style="border-bottom:0">
              <h5 class="modal-title" id="exampleModalCenterTitle">購物車清單</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-if="carts.carts">
              <p class="text-center text-danger" v-if="carts.carts.length === 0">您還沒購買商品哦！</p>
              <table class="table" v-else>
                <tbody>
                  <tr v-for="item in carts.carts" :key="item.id">
                    <td class="align-middle p-0">
                      <button
                        type="button"
                        class="btn btn-sm p-0 text-danger"
                        :disabled="isDisabled === item.id"
                        @click="removeCart(item.id)"
                      >
                        <i class="fas fa-spinner fa-spin" v-if="filterLoadingItem === item.id"></i>
                        <i class="far fa-trash-alt" v-else></i>
                      </button>
                    </td>
                    <td class="align-middle">{{item.product.title}}</td>
                    <td class="align-middle text-right">{{item.qty}}件</td>
                    <td class="align-middle text-right">NT {{item.total | currency}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">
                      <strong>小計</strong>
                    </td>
                    <td class="text-right">
                      <strong>NT {{carts.total | currency}}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <button
                type="button"
                class="btn btn-primary btn-block"
                v-if="carts.carts.length >0"
                @click="goCheck()"
              >結帳去</button>
              <button type="button" class="btn btn-light btn-block" data-dismiss="modal" v-else>繼續購物</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('Cart', ['carts', 'cartsQty', 'animateCss', 'isDisabled']),
    ...mapGetters(['filterLoadingItem'])
  },

  methods: {
    // 取得購物車列表 /api/:api_path/cart
    ...mapActions('Cart', ['CART_GET']),

    // 刪除某一筆購物車資料
    removeCart (id) {
      this.$store.dispatch('Cart/CART_REMOVE', id)
    },

    // 開啟 cart Modal
    openCartModal () {
      this.CART_GET()
      $('#cartModal').modal('show')
    },

    // 進入結帳頁面 - 確認購物清單
    goCheck () {
      this.$router.push('/customer_check')
      $('#cartModal').modal('hide')
    }

  },

  created () {
    this.CART_GET()
  }
}
</script>

<style scoped>
.btn-cart {
  position: relative;
}

.bage-num {
  position: absolute;
  top: 2px;
  right: 0;
  font-size: 1rem;
}
</style>
