<template>
  <div>
    <Alert />
    <Navbar v-if="$route.name !== 'Home'" />
    <!-- <Navbar /> -->
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

export default {
  components: {
    Alert,
    Navbar,
    Cart,
    Footer
  }
}
</script>
