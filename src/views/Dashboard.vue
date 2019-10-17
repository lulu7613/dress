<template>
  <div>
    <Alert />
    <Navbar />
    <router-view></router-view>
    <Cart />
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
