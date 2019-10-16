<template>
  <div class="container mt-3">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent h5">
        <li class="breadcrumb-item">
          <router-link to="/customer_products">首頁</router-link>
          </li>
        <li class="breadcrumb-item" v-if="propsData.title">
          <a href="#" @click.prevent="goPage(propsData.category)">{{ propsData.category }}</a>
        </li>
        <li class="breadcrumb-item active" v-if="!propsData.title">
          {{ propsData.category }}
        </li>
        <li class="breadcrumb-item active" v-if="propsData.title">
          {{ propsData.title }}
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['propsData'],

  methods: {
    goPage (value) {
      let name = ''
      if (value === '主題商品') {
        name = 'topic'
      } else if (value === '人氣精選') {
        name = 'hot'
      } else if (value === '清倉55折') {
        name = 'discount'
      }
      this.$router.push(`/customer_products_${name}`)
    }
  }
}
</script>
