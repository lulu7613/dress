<template>
  <div>
    <div class="container col-12 col-md-8 col-xl-4 mt-3 mt-md-5 p-5 border-primary border">
      <h1 class="h3 text-center font-weight-bold member-title mb-4">管理員登入</h1>
      <div class="form-group">
        <label for="Email">帳號</label>
        <input
          type="text"
          name="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="輸入電子信箱"
          v-model="user.username"
          v-validate="'required|email'"
          :class="{'is-invalid': errors.has('email')}"
        />
        <small class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</small>
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input
          type="password"
          name="password"
          class="form-control"
          id="password"
          placeholder="輸入密碼"
          v-model="user.password"
          v-validate="'required'"
          :class="{'is-invalid': errors.has('password')}"
        />
        <small class="form-text text-danger" v-if="errors.has('password')">請輸入密碼</small>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="remember" />
        <label class="form-check-label" for="remember">記住我</label>
      </div>
      <button type="button" class="btn btn-primary btn-block" @click="login()">Sign in</button>
      <router-link class="btn btn-light btn-block" to="/">回購物網</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }

    }
  },

  methods: {
    // 登入管理者帳號 /admin/signin
    login () {
      const vm = this
      // vee-validate 表單驗證
      this.$validator.validate().then((result) => {
        if (result) {
          // login API 送出
          const api = `${process.env.VUE_APP_PATH}/admin/signin`
          vm.$http.post(api, vm.user).then((response) => {
            console.log('login()', response.data)
            if (response.data.success) {
              vm.$router.push('/admin/products')
            } else {
              vm.$bus.$emit('messsage:push', response.data.message, 'danger')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.border {
  border-top: 5px solid #49947f !important;
}

.member-title {
  color: #333;
  letter-spacing: 0.2em;
}
</style>
