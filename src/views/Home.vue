<template>
  <div>
    <div class="container">
      <div class="mt-5" style="position: relative">
        <img class="img-fluid" src="../assets/img/homeBanner01.png" alt="homeBanner" />
      </div>
      <div class="mt-5">
        <div class="h1 font-weight-bolder text-center">歡迎光臨</div>
        <div class="lead font-weight-bolder text-center mt-3">
          有人說，T-Shirt 就像生活中的第二層皮膚，
          <br />上班、出遊、運動、多數場合，
          <br />不知道該穿什麼衣服時，
          <br />套一件 T-Shirt 就解決了。
        </div>
        <div class="lead font-weight-bolder text-center mt-3">
          翠絲認為，設計的靈感多來自日常生活，
          <br />食、衣、住、行、育、樂，
          <br />都可以成為設計一環。
          <br />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6 mb-5">
          <div class="card home-card-shadow">
            <div class="home-overlay cursor-point" @click="goPage('about')">
              <div class="home-overlay-title text-white text-center">了解更多</div>
              <img
                src="../assets/img/homeAbout.png"
                class="card-img-top home-card-img"
                alt="homeAbout"
              />
            </div>
            <div class="card-body">
              <h5 class="h2 font-weight-bolder text-center mb-3">關於翠絲</h5>
              <p class="card-text lead font-weight-bolder text-center" style="line-height: 2.2rem">
                我們成立於 2019 年 1 月，
                <br />秉持誠實至上的精神，
                <br />堅持給顧客最好的品質。
              </p>
              <router-link class="btn btn-lg btn-block btn-link px-0" to="/about">了解更多</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-5">
          <div class="card home-card-shadow">
            <div class="home-overlay cursor-point" @click="goPage('customer_products')">
              <div class="home-overlay-title text-white text-center">開始購物</div>
              <img src="../assets/img/homeBuy.png" class="card-img-top home-card-img" alt="homeBuy" />
            </div>
            <div class="card-body">
              <h5 class="h2 font-weight-bolder text-center mb-3">購物商城</h5>
              <p class="card-text lead font-weight-bolder text-center" style="line-height: 2.2rem">
                店內販售各種款式的 T-Shirt，
                <br />有搞怪、人物、文字...包羅萬象，應有盡有，
                <br />最潮最時尚的 T-Shirt，在這兒都找的到。
              </p>
              <router-link class="btn btn-lg btn-block btn-link px-0" to="/customer_products">開始購物</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="home-coupon-information p-5">
        <div class="h2 text-center font-weight-bolder text-white">全館年終大優惠</div>
        <div
          class="lead text-center font-weight-bolder text-white"
        >慶祝翠絲服飾成立快 1 年，優惠券碼輸入 999，全館商品有 9 折優惠！</div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6 mb-5">
          <div class="home-overlay cursor-point" @click="goProducts('清倉55折')">
            <div class="home-overlay-title text-white text-center">查看詳情</div>
            <img src="../assets/img/coupon03.png" class="img-fluid" alt="coupon03" />
          </div>
        </div>
        <div class="col-md-6 mb-5">
          <div class="home-overlay cursor-point" @click="goProducts('人氣精選')">
            <div class="home-overlay-title text-white text-center">查看詳情</div>
            <img src="../assets/img/coupon02.png" class="img-fluid" alt="coupon02" />
          </div>
        </div>
      </div>
      <div class="bg-primary p-4 mb-5">
        <div class="h5 text-center text-white mb-3">想知道更多我們的訊息？</div>
        <router-link to="/news" class="h2 d-block text-center font-weight-bolder text-white mb-4">
          <i class="fas fa-rss"></i>
          最新消息
        </router-link>
        <div class="h5 text-center text-white mb-3">輸入信箱，訂閱我們，隨時獲得第一手優惠訊息！</div>
        <form class="col-md-4 input-group mb-3 mx-auto home-subscript" @click="sub(email)">
          <input type="email" v-model="email" class="form-control bg-primary text-white" />
          <small class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</small>
          <div class="input-group-append">
            <span class="bg-primary text-white cursor-point mb-0 px-1">
              <i class="far fa-envelope fa-2x"></i>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      type: ''
    }
  },

  methods: {
    // 取得點選關於翠絲
    goPage (pathName) {
      this.$router.push(`/${pathName}`)
    },

    // 去購物商城
    goProducts (type) {
      this.type = type
      this.$router.push(`/customer_products`)
    },

    // 訂閱成功
    sub (email) {
      const vm = this
      if (email !== '') {
        vm.$store.dispatch('MESSAGE_UPDATE', { // vuex alertMessage
          message: '訂閱成功',
          status: 'success'
        })
      } else {
        vm.$bus.$emit('messsage:push', '要輸入您的 email 哦', 'danger')
        vm.$store.dispatch('MESSAGE_UPDATE', { // vuex alertMessage
          message: '要輸入您的 email 哦',
          status: 'danger'
        })
      }
    }
  },

  beforeDestroy () {
    this.$bus.$emit('getProductsType:type', this.type)
  }
}
</script>

<style>
.home-bgImg {
  background: url(../assets/img/homebg01.jpg) center center no-repeat;
  background-size: cover;
}

/* 首頁的卡片區(關於翠絲 和 購物商城) */
.home-card-shadow {
  box-shadow: rgba(0, 0, 0, 0.07) 0px 15px 30px 0px;
}

.home-overlay {
  position: relative;
  overflow: hidden;
}

.home-overlay-title {
  position: absolute;
  bottom: -360px;
  width: 100%;
  height: 360px;
  line-height: 360px;
  font-size: 2.5rem;
  background-color: rgba(52, 58, 64, 0.5);
}

.home-overlay:hover .home-overlay-title {
  bottom: 0;
  transition: all 0.5s;
}

/* coupon 區域 */
.home-coupon-information {
  background: url(../assets/img/couponBg02.png) center center no-repeat;
  background-attachment: fixed;
}

.home-coupon-left {
  background: url(../assets/img/coupon03.png) center center no-repeat;
  background-size: cover;
  height: 330px;
}

.home-coupon-right {
  background: url(../assets/img/coupon02.png) center center no-repeat;
  background-size: cover;
  height: 330px;
}

/* 訂閱 input */
.home-subscript input,
.home-subscript span {
  border: 0;
  border-radius: 0;
  border-bottom: 3px solid #fff;
}
</style>
