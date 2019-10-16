<template>
  <div>
    <header class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-dark">
        <router-link
          class="navbar-brand font-weight-bolder logo-name"
          to="/customer_products"
          style="border:0"
        >翠絲服飾</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <slot>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <router-link
                  class="nav-link font-weight-bold"
                  to="/customer_products_topic"
                  style="border:0"
                >主題商品</router-link>
              </li>
              <li class="nav-item active">
                <router-link
                  class="nav-link font-weight-bold"
                  to="/customer_products_hot"
                  style="border:0"
                >人氣精選</router-link>
              </li>
              <li class="nav-item active">
                <router-link
                  class="nav-link font-weight-bold"
                  to="/customer_products_discount"
                  style="border:0"
                >清倉55折</router-link>
              </li>
            </ul>

            <form class="form-inline my-2 my-lg-0" name="search">
              <input
                class="form-control mr-sm-2"
                type="text"
                placeholder="輸入產品關鍵字"
                aria-label="Search"
                v-model.trim="keyword"
                @keyup.enter="search()"
              />
              <button type="button" class="btn btn-success my-2 my-sm-0" @click="search()">搜尋</button>
            </form>
          </div>
        </slot>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },

  methods: {
    search () {
      const vm = this
      vm.$bus.$emit('search:array', vm.keyword)
      vm.$router.push(`/customer_products_search/${vm.keyword}`)
      vm.keyword = ''
    }
  }
}
</script>

<style>
header {
  background-image: url(../assets/img/header4.jpg);
}

.logo-name {
  font-size: 2rem;
}
</style>
