<template>
  <div class="home-bgImg">
    <div class="home-banner">
      <div class="container-fluid pt-3 pt-lg-5">
        <div class="row justify-content-center">
          <div class="col-sm-5 col-md-6 mb-5 text-center text-md-right">
            <router-link to="/customer_products">
              <img class="logo img-fluid" src="../assets/img/logo01.png" alt="logo01.png" />
            </router-link>
          </div>
          <ul class="nav flex-column col-sm-7 col-md-6 text-center text-md-left align-self-center">
            <li class="nav-item">
              <router-link class="home-text px-5 text-info" to="/about">關於翠絲</router-link>
            </li>
            <li class="nav-item mt-4">
              <router-link class="home-text px-5 mt-4 text-primary" to="/news">最新消息</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <small class="fixed-bottom pb-2 pb-lg-4 pr-2 text-right">Copyright © 2019 by Lu / 素材取自網路，僅作學習用途</small>
  </div>
</template>

<style scoped>
.home-bgImg {
  background: url(../assets/img/homebg01.jpg) center center no-repeat;
  height: 100vh;
  background-size: cover;
}

.home-banner {
  background-color: rgba(201, 181, 139, 0.45);
  height: 100vh;
  position: relative;
}

.logo {
  max-width: 82%;
  transition: all 0.35s;
}

.logo:hover {
  max-width: 84%;
  transition: all 0.35s;
}

.home-text {
  font-size: 3.3rem;
  font-weight: bolder;
  text-decoration: none;
  background-color: rgba(244, 244, 244, 0.9);
  border-radius: 10px;
}

.home-text:hover {
  border: 6px #f7d466 solid;
  transition: all 0.2s;
}
</style>
