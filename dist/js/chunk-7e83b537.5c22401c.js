(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e83b537"],{1799:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("nav",{attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination"},[a("li",{staticClass:"page-item",class:{disabled:!t.propsPage.has_pre}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return t.updatePage(t.propsPage.current_page-1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.propsPage.total_pages,(function(e){return a("li",{key:e,staticClass:"page-item",class:{active:t.propsPage.current_page===e}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return t.updatePage(e)}}},[t._v(t._s(e))])])})),a("li",{staticClass:"page-item",class:{disabled:!t.propsPage.has_next}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return t.updatePage(t.propsPage.current_page+1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},s=[],n={props:["propsPage"],methods:{updatePage:function(t){this.$emit("emitPage",t)}}},i=n,l=a("2877"),d=Object(l["a"])(i,o,s,!1,null,null,null);e["a"]=d.exports},f329:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("div",{staticClass:"row my-3"},[a("div",{staticClass:"col-md-6"},[a("Page",{attrs:{propsPage:t.pagination},on:{postPage:t.getCoupons}})],1),a("div",{staticClass:"col-md-6 text-right"},[a("button",{staticClass:"btn btn-primary",on:{click:function(e){return t.openModal("new")}}},[t._v("新增優惠券")])])]),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-hover"},[t._m(0),a("tbody",t._l(t.coupons,(function(e){return a("tr",{key:e.id},[a("td",[t._v(t._s(e.title))]),a("td",[t._v(t._s(e.percent)+"%")]),a("td",[t._v(t._s(t._f("date")(e.due_date)))]),a("td",[e.is_enabled?a("span",{staticClass:"text-success"},[t._v("啟用")]):a("span",{staticClass:"text-secondary"},[t._v("不啟用")])]),a("td",[a("div",{staticClass:"btn-group",attrs:{role:"group","aria-label":"Basic example"}},[a("button",{staticClass:"btn btn-outline-primary btn-sm",attrs:{type:"button"},on:{click:function(a){return t.openModal("edit",e)}}},[t._v("編輯")]),a("button",{staticClass:"btn btn-outline-danger btn-sm",attrs:{type:"button"},on:{click:function(a){return t.openModal("delete",e)}}},[t._v("刪除")])])])])})),0)])]),a("div",{staticClass:"modal fade",attrs:{id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},["new"===t.modalType?a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("新增優惠券")]):a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("修改優惠券")]),t._m(1)]),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"title"}},[t._v("標題")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.title,expression:"tempCoupon.title"}],staticClass:"form-control",attrs:{type:"text",id:"title",placeholder:"請輸入標題"},domProps:{value:t.tempCoupon.title},on:{input:function(e){e.target.composing||t.$set(t.tempCoupon,"title",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"coupon_code"}},[t._v("優惠碼")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.code,expression:"tempCoupon.code"}],staticClass:"form-control",attrs:{type:"text",id:"coupon_code",placeholder:"請輸入優惠碼"},domProps:{value:t.tempCoupon.code},on:{input:function(e){e.target.composing||t.$set(t.tempCoupon,"code",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"due_date"}},[t._v("到期日")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.due_date,expression:"due_date"}],staticClass:"form-control",attrs:{type:"date",id:"due_date"},domProps:{value:t.due_date},on:{input:function(e){e.target.composing||(t.due_date=e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"price"}},[t._v("折扣百分比")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.percent,expression:"tempCoupon.percent"}],staticClass:"form-control",attrs:{type:"number",id:"price",placeholder:"請輸入折扣百分比"},domProps:{value:t.tempCoupon.percent},on:{input:function(e){e.target.composing||t.$set(t.tempCoupon,"percent",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("div",{staticClass:"form-check"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.is_enabled,expression:"tempCoupon.is_enabled"}],staticClass:"form-check-input",attrs:{type:"checkbox","true-value":1,"false-value":0,id:"is_enabled"},domProps:{checked:Array.isArray(t.tempCoupon.is_enabled)?t._i(t.tempCoupon.is_enabled,null)>-1:t._q(t.tempCoupon.is_enabled,1)},on:{change:function(e){var a=t.tempCoupon.is_enabled,o=e.target,s=o.checked?1:0;if(Array.isArray(a)){var n=null,i=t._i(a,n);o.checked?i<0&&t.$set(t.tempCoupon,"is_enabled",a.concat([n])):i>-1&&t.$set(t.tempCoupon,"is_enabled",a.slice(0,i).concat(a.slice(i+1)))}else t.$set(t.tempCoupon,"is_enabled",s)}}}),a("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v("是否啟用")])])])]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.updateCoupon()}}},[t._v("更新優惠券")])])])])]),a("div",{staticClass:"modal fade",attrs:{id:"delModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[a("div",{staticClass:"modal-header bg-danger text-white"},[t._m(2),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:function(e){return t.closeModal()}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),a("div",{staticClass:"modal-body"},[t._v("\n          是否刪除\n          "),a("strong",{staticClass:"text-danger"},[t._v(t._s(t.tempCoupon.title))]),t._v(" 優惠券(刪除後將無法恢復)。\n        ")]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"},on:{click:function(e){return t.closeModal()}}},[t._v("取消")]),a("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(e){return t.updateCoupon()}}},[t._v("確認刪除")])])])])])],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("th",[t._v("名稱")]),a("th",{attrs:{width:"130"}},[t._v("折扣百分比")]),a("th",{attrs:{width:"130"}},[t._v("到期日")]),a("th",{attrs:{width:"130"}},[t._v("是否啟用")]),a("th",{attrs:{width:"130"}},[t._v("編輯")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close","data-dismiss":"modal"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[a("span",[t._v("刪除產品")])])}],n=a("1799"),i=a("1157"),l=a.n(i),d={components:{Page:n["a"]},data:function(){return{isLoading:!1,coupons:[],tempCoupon:{},pagination:{},modalType:"new",due_date:""}},watch:{due_date:function(){var t=Math.floor(new Date(this.due_date)/1e3);this.tempCoupon.due_date=t}},methods:{getCoupons:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var a="".concat("https://vue-course-api.hexschool.io","/api/").concat("dress_store","/admin/coupons?page=").concat(e);this.$http.get(a).then((function(e){console.log("優惠券列表",e.data),t.isLoading=!1,t.coupons=e.data.coupons,t.pagination=e.data.pagination}))},openModal:function(t,e){var a=this;"new"===t?(a.modalType="new",a.tempCoupon={},l()("#couponModal").modal("show")):"edit"===t?(a.modalType="edit",a.tempCoupon=e,l()("#couponModal").modal("show")):"delete"===t&&(a.modalType="delete",a.tempCoupon=e,l()("#delModal").modal("show"))},updateCoupon:function(){var t=this,e=this,a="",o="";"new"===this.modalType?(a="".concat("https://vue-course-api.hexschool.io","/api/").concat("dress_store","/admin/coupon"),o="post"):"edit"===this.modalType?(a="".concat("https://vue-course-api.hexschool.io","/api/").concat("dress_store","/admin/coupon/").concat(this.tempCoupon.id),o="put"):"delete"===this.modalType&&(a="".concat("https://vue-course-api.hexschool.io","/api/").concat("dress_store","/admin/coupon/").concat(this.tempCoupon.id),o="delete"),e.$http[o](a,{data:e.tempCoupon}).then((function(e){console.log(t.modalType,e.data),t.getCoupons(),l()("#couponModal").modal("hide"),l()("#delModal").modal("hide")}))}},created:function(){this.getCoupons()}},r=d,c=a("2877"),p=Object(c["a"])(r,o,s,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-7e83b537.5c22401c.js.map