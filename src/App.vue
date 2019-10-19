<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/all';

body {
  font-family: 'Microsoft JhengHei', Helvetica,Arial, sans-serif
}

// 整體頁面的字體大小
html {
  font-size: 0.7rem;
}
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  html {
    font-size: 0.7rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  html {
    font-size: 1rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  html {
    font-size: 1rem;
  }
}

.bg-cover {
  background-size: cover;
}

/* outer-link 的 active 自訂樣式 */
.router-link-exact-active {
  border: 1px solid #fff;
}

</style>
