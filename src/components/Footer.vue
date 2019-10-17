<template>
  <div>
    <footer class="container-fluid py-3" style="background-color: #f8f9fa">
      <div class="footer-text text-center">
        <div>
          <a href="#" @click.prevent="goLogin()">
            <i class="fas fa-wrench"></i>
            管理者
          </a>
          <a href="https://github.com/lulu7613" target="_blank" class="ml-3">
            <i class="fab fa-github"></i>
            GitHub
          </a>
        </div>
        <div class="mt-1">Copyright © 2019 by Lu / 素材取自網路，僅作學習用途</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    // 進入管理者頁面 (進行登入驗證)
    goLogin () {
      // 檢查用戶是否仍持續登入 /api/user/check
      const vm = this
      const api = `${process.env.VUE_APP_PATH}/api/user/check`
      vm.$http.post(api).then((response) => {
        console.log('Login 檢查登入狀態', response.data)
        if (response.data.success) {
          vm.$router.push('/admin/products')
        } else {
          vm.$router.push('/login')
        }
      })
    }

  }
}
</script>

<style scoped>
.footer-text {
  font-size: 14px;
  letter-spacing: 0.1em;
  color: #333;
}

/* 帳戶及購物車 */
.btn-cart {
  position: relative;
}

.bage-num {
  position: absolute;
  top: 2px;
  right: 0;
}

.bage-text {
  position: absolute;
  top: -15px;
  left: 25%;
  font-size: 0.8rem;
}
</style>
