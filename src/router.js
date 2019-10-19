import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    { // 首頁
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    { // 客戶端頁面
      path: '/store',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        { // 關於翠絲
          path: 'about',
          name: 'About',
          component: () => import('./views/About.vue')
        },
        { // 最新消息
          path: 'news',
          name: 'News',
          component: () => import('./views/News.vue')
        },
        {
          path: 'customer_products', // 全部商品
          name: 'CustomerProducts',
          component: () => import('./views/CustomerProducts.vue')
        },
        {
          path: 'customer_product/:id', // 單一商品細節
          name: 'CustomerProduct',
          component: () => import('./views/CustomerProduct.vue')
        },
        {
          path: 'customer_check', // 結帳頁面 - 確認購物清單
          name: 'CustomerCheck',
          component: () => import('./views/CustomerCheck.vue')
        },
        {
          path: 'customer_order', // 結帳頁面 - 輸入訂購資料
          name: 'CustomerOrder',
          component: () => import('./views/CustomerOrder.vue')
        },
        {
          path: 'customer_finish/:orderId', // 結帳頁面 - 金流付款 & 付款完成
          name: 'CustomerFinish',
          component: () => import('./views/CustomerFinish.vue')
        },
        {
          path: 'my_order', // 我的訂單
          name: 'CustomerMyOrder',
          component: () => import('./views/CustomerMyOrder.vue')
        }

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    { // 管理者頁面
      path: '/admin',
      name: 'DashboardRoot',
      component: () => import('./views/DashboardRoot.vue'),
      children: [
        {
          path: 'products', // 產品管理
          name: 'Products',
          component: () => import('./views/Products.vue'),
          meta: { requiresAuth: true } // 導航守衛: 到達這頁面需要授權
        },
        {
          path: 'orders', // 訂單管理
          name: 'Orders',
          component: () => import('./views/Orders.vue'),
          meta: { requiresAuth: true } // 導航守衛: 到達這頁面需要授權
        },
        {
          path: 'orders', // 訂單管理
          name: 'Orders',
          component: () => import('./views/Orders.vue'),
          meta: { requiresAuth: true } // 導航守衛: 到達這頁面需要授權
        },
        {
          path: 'coupons', // 優惠券管理
          name: 'Coupons',
          component: () => import('./views/Coupons.vue'),
          meta: { requiresAuth: true } // 導航守衛: 到達這頁面需要授權
        }

      ]
    }
  ]
})
