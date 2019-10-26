<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Navbar />
    <router-view></router-view>
    <Cart v-if="$route.name === 'CustomerProducts' || $route.name === 'CustomerProduct'" />
    <Footer />
  </div>
</template>

<script>
import Alert from '../components/AlterMessage.vue'
import Navbar from '../components/Navbar.vue'
import Cart from '../components/Cart.vue'
import Footer from '../components/Footer.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    Alert,
    Navbar,
    Cart,
    Footer
  },

  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>
