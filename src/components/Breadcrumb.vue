<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent h5">
        <li class="breadcrumb-item">
          <router-link class="font-weight-bolder" to="/customer_products">
            <i class="fas fa-shopping-cart"></i>
            購物商城
          </router-link>
          </li>
        <li class="breadcrumb-item font-weight-bolder" v-if="propsData.title">
          <span class="text-primary">{{ propsData.category }}</span>
        </li>
        <li class="breadcrumb-item active font-weight-bolder" v-if="!propsData.title">
          {{ propsData.category }}
        </li>
        <li class="breadcrumb-item active font-weight-bolder" v-if="propsData.title">
          {{ propsData.title }}
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['propsData']
}
</script>
