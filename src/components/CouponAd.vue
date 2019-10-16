<template>
  <div>
    <img width="100%" class="img-fulid" src="../assets/img/coupon01.png" alt="coupon01" v-if="topic">
    <img width="100%" class="img-fulid mt-2" src="../assets/img/coupon02.png" alt="coupon02" v-if="hot">
    <img width="100%" class="img-fulid mt-2" src="../assets/img/coupon03.png" alt="coupon03" v-if="discount">
  </div>
</template>

<script>
export default {
  data () {
    return {
      topic: true,
      hot: true,
      discount: true
    }
  },

  created () {
    const vm = this
    if (vm.$route.name === 'CustomerProductsTopic') {
      vm.topic = true
      vm.hot = false
      vm.discount = false
    } else if (vm.$route.name === 'CustomerProductsHot') {
      vm.topic = false
      vm.hot = true
      vm.discount = false
    } else if (vm.$route.name === 'CustomerProductsDiscount') {
      vm.topic = false
      vm.hot = false
      vm.discount = true
    }
  }
}
</script>
