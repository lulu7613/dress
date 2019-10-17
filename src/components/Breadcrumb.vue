<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent h5">
        <li class="breadcrumb-item">
          <router-link to="/customer_products">商城購物</router-link>
          </li>
        <li class="breadcrumb-item" v-if="propsData.title">
          <span class="text-primary">{{ propsData.category }}</span>
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
  props: ['propsData']
}
</script>
