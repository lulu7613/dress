<template>
  <div>
    <div class="container mb-5">
      <div class="news-banner my-5">
        <img class="img-fluid" src="../assets/img/newsBanner01.png" alt="newsBanner" />
      </div>
      <div>
        <h1 class="h5 text-primary font-weight-bolder mb-3">
          <i class="fas fa-rss"></i>
          最新消息
        </h1>
        <ul class="news-list pl-0" v-for="(item, index) in news" :key="index">
          <li class="border-bottom pb-2 mb-3">
            <p class="h3 text-info font-weight-bolder">{{item.year}}年 {{item.date}}</p>
            <p class="h5 font-weight-bolder" style="color: #444444">{{item.content}}</p>
          </li>
        </ul>
      </div>
      <h4 class="text-primary font-weight-bolder text-center mt-5">想更了解翠絲？點進來看看吧！</h4>
      <div class="my-4 text-center">
        <router-link class="btn btn-lg btn-primary" to="/store/about">
          <i class="fas fa-pencil-alt"></i>
          關於翠絲
        </router-link>
        <router-link class="btn btn-lg btn-info ml-5" to="/store/customer_products">
          <i class="fas fa-shopping-cart"></i>
          購物商城
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      news: [
        {
          year: '2019',
          date: '10/01',
          content: '慶祝翠絲服飾成立快 1 年，從今天起全館年終大優惠，輸入優惠券碼: 999，商品有 9 折優惠哦！'
        },
        {
          year: '2019',
          date: '08/08',
          content: '慶祝 88 父親節，翠絲服飾精選 4 件商品 55 折出清，要買要快哦！'
        },
        {
          year: '2019',
          date: '05/30',
          content: '全館人氣商品，從今起永久打 9 折！'
        },

        {
          year: '2019',
          date: '01/10',
          content: '主題商品區進新貨啦～～'
        },
        {
          year: '2019',
          date: '01/01',
          content: '大家期待已久的 "翠絲服飾" 開張啦！！'
        }
      ]
    }
  }
}
</script>

<style>
.news-list {
  list-style-type: none;
}
</style>
