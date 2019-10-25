<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Navbar>
      <slot>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/admin/products">
                <i class="far fa-address-card"></i>
                產品列表
              </router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" to="/admin/orders">
                <i class="far fa-calendar-alt"></i>
                訂單列表
              </router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" to="/admin/coupons">
                <i class="fab fa-affiliatetheme"></i>
                優惠券
              </router-link>
            </li>
            <li class="nav-item active">
              <a href="#" class="nav-link" @click="signout()">
                <i class="fas fa-user-alt"></i>
                登出
              </a>
            </li>
          </ul>
        </div>
      </slot>
    </Navbar>
    <div class="container mt-5">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Alert from '../components/AlterMessage.vue'
import Footer from '../components/Footer.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
    Alert,
    Footer
  },

  computed: {
    ...mapGetters(['isLoading'])
  },

  methods: {
    // 登出帳號
    signout () {
      const vm = this
      const api = `${process.env.VUE_APP_PATH}/logout`
      this.$http.post(api).then((response) => {
        console.log('登出', response.data)
        if (response.data.success) {
          vm.$router.push('/customer_products')
        }
      })
    }
  }

}
</script>

<style>
body {
  font-size: 0.875rem;
}

/* .feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
} */

/*
 * Content
 */

[role="main"] {
  padding-top: 133px; /* Space for fixed navbar */
}

@media (min-width: 768px) {
  [role="main"] {
    padding-top: 48px; /* Space for fixed navbar */
  }
}
</style>
