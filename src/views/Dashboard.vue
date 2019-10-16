<template>
  <div>
    <Alert />
    <Navbar/>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Alert from '../components/AlterMessage.vue'

export default {
  components: {
    Navbar,
    Footer,
    Alert
  }
}
</script>
