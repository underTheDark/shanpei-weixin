(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/applyChange/applyChange"],{"0d75":function(e,t,s){"use strict";var o=s("ced3"),a=s.n(o);a.a},"2ee0":function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("view",{attrs:{id:"applyreturn"}},[s("view",{staticClass:"service-one"},[s("view",{staticClass:"order-num"},[e._v("订单编号："+e._s(e.goods.order_no))]),e._l(e.goods.order_list,function(t,o){return s("view",{key:o,staticClass:"list"},[s("view",{staticClass:"product"},[s("image",{attrs:{src:t.goods_logo}}),s("view",{staticClass:"product-right"},[s("view",{staticClass:"product-title"},[e._v(e._s(t.goods_item))]),s("view",{staticClass:"product-size"},[s("text",[e._v(e._s(t.goods_spec))])]),s("view",{staticClass:"product-price"},[s("text",[e._v(e._s(t.price_selling))]),s("text",[e._v(e._s(t.number))])])])]),s("view",{staticClass:"reselect"},[s("view",{staticClass:"select-left"},[e._v("重新选择商品信息")]),s("view",{staticClass:"select-right"},[s("text",[e._v(e._s(t.goods_spec))]),s("text",[e._v(e._s(t.number))]),s("image",{attrs:{src:t.goods_logo}})])])])})],2),s("view",{staticClass:"return-reason"},[s("view",{staticClass:"reason-title"},[e._v("退款原因")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.reason,expression:"reason"}],attrs:{placeholder:"请输入换货原因",eventid:"50be7376-0"},domProps:{value:e.reason},on:{input:function(t){t.target.composing||(e.reason=t.target.value)}}})]),e._m(0),s("view",{staticClass:"submit",attrs:{eventid:"50be7376-1"},on:{click:function(t){e.applyChange(e.goods.order_no)}}},[s("view",[e._v("提交")])])])},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("view",{staticClass:"upload-photo"},[s("view",{staticClass:"upload-title"},[e._v("上传凭证")]),s("view",{staticClass:"photo"},[s("image",{attrs:{src:"../../static/img/sayfeel/photo.png"}}),s("text",[e._v("添加图片")])])])}];s.d(t,"a",function(){return o}),s.d(t,"b",function(){return a})},"37de":function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={data:function(){return{goods:{},reason:""}},methods:{applyChange:function(t){e.request({url:this.config.url+"order/refund",method:"POST",data:{token:this.token,order_no:t,refund_type:2,refund_desc:this.reason,refund_covers:""},success:function(e){console.log("return",e)}})}},mounted:function(){var t=this;e.getStorage({key:"regoods",success:function(e){console.log("regoods",e),t.goods=e.regoods}})}};t.default=s}).call(this,s("543d")["default"])},cc6d:function(e,t,s){"use strict";s.r(t);var o=s("2ee0"),a=s("d5c8");for(var n in a)"default"!==n&&function(e){s.d(t,e,function(){return a[e]})}(n);s("0d75");var r=s("2877"),i=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=i.exports},ced3:function(e,t,s){},d5c8:function(e,t,s){"use strict";s.r(t);var o=s("37de"),a=s.n(o);for(var n in o)"default"!==n&&function(e){s.d(t,e,function(){return o[e]})}(n);t["default"]=a.a},db31:function(e,t,s){"use strict";s("9bb1");var o=n(s("b0ce")),a=n(s("cc6d"));function n(e){return e&&e.__esModule?e:{default:e}}Page((0,o.default)(a.default))}},[["db31","common/runtime","common/vendor"]]]);