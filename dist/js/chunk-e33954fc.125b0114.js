(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e33954fc"],{"01f9c":function(t,a,s){"use strict";var e=s("acd1"),n=s.n(e);n.a},"2ecb":function(t,a,s){},"30d6":function(t,a,s){},5141:function(t,a,s){"use strict";var e=s("2ecb"),n=s.n(e);n.a},"5dfc":function(t,a,s){"use strict";var e=s("30d6"),n=s.n(e);n.a},7277:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("Alert"),s("Navbar"),s("router-view"),"CustomerProducts"===t.$route.name||"CustomerProduct"===t.$route.name?s("Cart"):t._e(),s("Footer")],1)},n=[],i=s("de1a"),r=s("d178"),o=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"cart-style",staticStyle:{position:"fixed",bottom:"5%",right:"1%"}},[s("button",{staticClass:"btn btn-cart",class:t.animateCss,attrs:{type:"button"},on:{click:function(a){return t.openCartModal()}}},[s("i",{staticClass:"fas fa-shopping-cart text-dark fa-3x"}),s("span",{staticClass:"badge badge-pill badge-danger bage-num"},[t._v(t._s(t.cartsQty))])])]),s("div",[s("div",{staticClass:"modal fade",attrs:{id:"cartModal",tabindex:"-1"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(0),t.carts.carts?s("div",{staticClass:"modal-body"},[0===t.carts.carts.length?s("p",{staticClass:"text-center text-danger"},[t._v("您還沒購買商品哦！")]):s("table",{staticClass:"table"},[s("tbody",t._l(t.carts.carts,(function(a){return s("tr",{key:a.id},[s("td",{staticClass:"align-middle p-0"},[s("button",{staticClass:"btn btn-sm p-0 text-danger",attrs:{type:"button",disabled:t.isDisabled===a.id},on:{click:function(s){return t.removeCart(a.id)}}},[t.filterLoadingItem===a.id?s("i",{staticClass:"fas fa-spinner fa-spin"}):s("i",{staticClass:"far fa-trash-alt"})])]),s("td",{staticClass:"align-middle"},[t._v(t._s(a.product.title))]),s("td",{staticClass:"align-middle text-right"},[t._v(t._s(a.qty)+"件")]),s("td",{staticClass:"align-middle text-right"},[t._v("NT "+t._s(t._f("currency")(a.total)))])])})),0),s("tfoot",[s("tr",[t._m(1),s("td",{staticClass:"text-right"},[s("strong",[t._v("NT "+t._s(t._f("currency")(t.carts.total)))])])])])]),t.carts.carts.length>0?s("button",{staticClass:"btn btn-primary btn-block",attrs:{type:"button"},on:{click:function(a){return t.goCheck()}}},[t._v("結帳去")]):s("button",{staticClass:"btn btn-light btn-block",attrs:{type:"button","data-dismiss":"modal"}},[t._v("繼續購物")])]):t._e()])])])])])},c=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"modal-header alert-primary",staticStyle:{"border-bottom":"0"}},[s("h5",{staticClass:"modal-title",attrs:{id:"exampleModalCenterTitle"}},[t._v("購物車清單")]),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("td",{staticClass:"text-right",attrs:{colspan:"3"}},[s("strong",[t._v("小計")])])}],l=s("1157"),u=s.n(l),d={data:function(){return{carts:[],cartsQty:0,filterLoadingItem:"",isDisabled:"",animateCss:{animated:!1,swing:!1}}},methods:{getCarts:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("dress_store","/cart");t.$http.get(a).then((function(a){console.log("購物車列表",a.data),a.data.success&&(t.carts=a.data.data,t.cartsQty=a.data.data.carts.length,t.animateCss.animated=!1,t.animateCss.swing=!1)}))},removeCart:function(t){var a=this;a.filterLoadingItem=t,a.isDisabled=t;var s="".concat("https://vue-course-api.hexschool.io","/api/").concat("dress_store","/cart/").concat(t);a.$http.delete(s).then((function(t){console.log("刪除購物車",t.data),t.data.success&&(a.$bus.$emit("messsage:push",t.data.message,"success"),a.getCarts(),a.filterLoadingItem="",a.isDisabled="")}))},openCartModal:function(){this.getCarts(),u()("#cartModal").modal("show")},uptadeCartsQty:function(){this.getCarts(),this.animateCss.animated=!0,this.animateCss.swing=!0},goCheck:function(){this.$router.push("/store/customer_check"),u()("#cartModal").modal("hide")}},created:function(){this.getCarts();var t=this;t.$bus.$on("cartsQty:update",(function(){t.uptadeCartsQty()}))}},f=d,m=(s("5141"),s("2877")),v=Object(m["a"])(f,o,c,!1,null,"640e96c0",null),b=v.exports,g=s("fd2d"),h={components:{Alert:i["a"],Navbar:r["a"],Cart:b,Footer:g["a"]}},p=h,C=Object(m["a"])(p,e,n,!1,null,null,null);a["default"]=C.exports},acd1:function(t,a,s){},bf2f:function(t,a,s){"use strict";var e=s("e893"),n=s.n(e);n.a},d178:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("header",{staticClass:"container-fluid"},[s("nav",{staticClass:"navbar navbar-expand-md navbar-dark"},[s("router-link",{staticClass:"navbar-brand font-weight-bolder logo-name",staticStyle:{border:"0"},attrs:{to:"/"}},[t._v("翠絲服飾")]),t._m(0),t._t("default",[s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[s("ul",{staticClass:"navbar-nav mr-auto"},[s("li",{staticClass:"nav-item active"},[s("router-link",{staticClass:"nav-link font-weight-bold",staticStyle:{border:"0"},attrs:{to:"/store/about"}},["About"===t.$route.name?s("i",{staticClass:"fas fa-map-marker-alt"}):t._e(),t._v("\n              關於翠絲")])],1),s("li",{staticClass:"nav-item active"},[s("router-link",{staticClass:"nav-link font-weight-bold",staticStyle:{border:"0"},attrs:{to:"/store/news"}},["News"===t.$route.name?s("i",{staticClass:"fas fa-map-marker-alt"}):t._e(),t._v("\n              最新消息")])],1),s("li",{staticClass:"nav-item active"},[s("router-link",{staticClass:"nav-link font-weight-bold",staticStyle:{border:"0"},attrs:{to:"/store/customer_products"}},["CustomerProducts"===t.$route.name?s("i",{staticClass:"fas fa-map-marker-alt"}):t._e(),t._v("\n              購物商城")])],1)])])])],2)])])},n=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[s("span",{staticClass:"navbar-toggler-icon"})])}],i={data:function(){return{keyword:""}}},r=i,o=(s("5dfc"),s("2877")),c=Object(o["a"])(r,e,n,!1,null,null,null);a["a"]=c.exports},de1a:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"message-alert"},t._l(t.messages,(function(a,e){return s("div",{key:e,staticClass:"alert alert-dismissible",class:"alert-"+a.status},[t._v("\n    "+t._s(a.message)+"\n    "),s("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(a){return t.removeMessage(e)}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])})),0)},n=[],i={data:function(){return{messages:[]}},methods:{updateMessage:function(t,a){var s=Math.floor(new Date/1e3);this.messages.push({message:t,status:a,timestamp:s}),this.removeMessageWithTiming(s)},removeMessage:function(t){this.messages.splice(t,1)},removeMessageWithTiming:function(t){var a=this;setTimeout((function(){a.messages.filter((function(s,e){if(s.timestamp===t)return a.messages.splice(e,1)}))}),5e3)}},created:function(){var t=this;t.$bus.$on("messsage:push",(function(a){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";t.updateMessage(a,s)}))}},r=i,o=(s("01f9c"),s("2877")),c=Object(o["a"])(r,e,n,!1,null,null,null);a["a"]=c.exports},e893:function(t,a,s){},fd2d:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("footer",{staticClass:"container-fluid py-3",staticStyle:{"background-color":"#f8f9fa"}},[s("div",{staticClass:"footer-text text-center"},[s("div",[s("a",{attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.goLogin()}}},[s("i",{staticClass:"fas fa-wrench"}),t._v("\n          管理者\n        ")]),t._m(0)]),s("div",{staticClass:"mt-1"},[t._v("Copyright © 2019 by Lu / 素材取自網路，僅作學習用途")])])])])},n=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("a",{staticClass:"ml-3",attrs:{href:"https://github.com/lulu7613",target:"_blank"}},[s("i",{staticClass:"fab fa-github"}),t._v("\n          GitHub\n        ")])}],i={methods:{goLogin:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/user/check");t.$http.post(a).then((function(a){console.log("Login 檢查登入狀態",a.data),a.data.success?t.$router.push("/admin/products"):t.$router.push("/login")}))}}},r=i,o=(s("bf2f"),s("2877")),c=Object(o["a"])(r,e,n,!1,null,"187d1649",null);a["a"]=c.exports}}]);
//# sourceMappingURL=chunk-e33954fc.125b0114.js.map