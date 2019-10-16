import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    { // 客戶端頁面
      path: '/',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: '/', // 全部商品 (index)
          name: 'CustomerProducts',
          component: () => import('./views/CustomerProducts.vue')
        },
        {
          path: 'customer_products_search/:keyword', // 搜尋
          name: 'CustomerProductsSearch',
          component: () => import('./views/CustomerProductsSearch.vue')
        },
        {
          path: 'customer_product/:id', // 單一商品細節
          name: 'CustomerProduct',
          component: () => import('./views/CustomerProduct.vue')
        },
        {
          path: 'customer_orders', // 結帳頁面 - 輸入訂購資料
          name: 'CustomerOrders',
          component: () => import('./views/CustomerOrders.vue')
        },
        {
          path: 'customer_check/:id', // 結帳頁面 - 金流付款 & 付款完成
          name: 'CustomerCheck',
          component: () => import('./views/CustomerCheck.vue')
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
