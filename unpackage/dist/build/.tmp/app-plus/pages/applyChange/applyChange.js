(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/applyChange/applyChange"],{"3af6":function(e,n,t){},"43ff":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{goods:{},reason:""}},methods:{applyChange:function(e){this.request({url:this.config.url+"order/refund",method:"POST",data:{token:this.token,order_no:e,refund_type:2,refund_desc:this.reason,refund_covers:""},success:function(e){console.log("return",e," at pages\\applyChange\\applyChange.vue:68")}})}},mounted:function(){var n=this;e.getStorage({key:"regoods",success:function(e){console.log("regoods",e," at pages\\applyChange\\applyChange.vue:77"),n.goods=e.regoods}})},onLoad:function(e){this.goods=JSON.parse(e.info)}};n.default=t}).call(this,t("6e42")["default"])},"8ee9":function(e,n,t){"use strict";t.r(n);var o=t("43ff"),a=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,function(){return o[e]})}(u);n["default"]=a.a},b7db:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return a})},c2df:function(e,n,t){"use strict";var o=t("3af6"),a=t.n(o);a.a},e5e2:function(e,n,t){"use strict";t.r(n);var o=t("b7db"),a=t("8ee9");for(var u in a)"default"!==u&&function(e){t.d(n,e,function(){return a[e]})}(u);t("c2df");var r=t("2877"),s=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports}},[["6123","common/runtime","common/vendor"]]]);