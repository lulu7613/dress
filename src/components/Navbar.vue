<template>
  <div>
    <header class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-dark">
        <router-link
          class="navbar-brand font-weight-bolder logo-name"
          to="/"
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
                  to="/about"
                  style="border:0"
                >
                <i class="fas fa-map-marker-alt" v-if="$route.name === 'About'"></i>
                關於翠絲</router-link>
              </li>
              <li class="nav-item active">
                <router-link
                  class="nav-link font-weight-bold"
                  to="/news"
                  style="border:0"
                >
                <i class="fas fa-map-marker-alt" v-if="$route.name === 'News'"></i>
                最新消息</router-link>
              </li>
              <li class="nav-item active">
                <router-link
                  class="nav-link font-weight-bold"
                  to="/customer_products"
                  style="border:0"
                >
                <i class="fas fa-map-marker-alt" v-if="$route.name === 'CustomerProducts'"></i>
                購物商城</router-link>
              </li>
            </ul>
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
