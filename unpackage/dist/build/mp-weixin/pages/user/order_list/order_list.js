(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/order_list/order_list"],{"04de":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{show_menu:!1,selceted:"",headerPosition:"fixed",headerTop:"0px",typeText:{unpaid:"等待付款",back:"等待商家发货",unreceived:"商家已发货",received:"等待用户评价",completed:"交易已完成",refunds:"商品退货处理中",cancelled:"订单已取消"},orderType:["全部","待付款","待发货","待收货","已完成"],orderList:[],list:[],tabbarIndex:0,array:["我不想买了","信息填写错误，重新拍","卖家缺货","其他原因"]}},onLoad:function(t){console.log("option: "+JSON.stringify(t));var e=parseInt(t.tbIndex)+1;this.tabbarIndex=e},mounted:function(){var e=this;t.request({url:this.config.url+"member/order",method:"post",data:{token:this.token,type:this.tabbarIndex},success:function(t){1==t.data.code&&(e.orderList=t.data.data.data,e.orderList.forEach(function(t,e){var s=0;t.order_list.forEach(function(t){s+=t.number}),t.sum=s}))}})},onPageScroll:function(t){},methods:{ToDetail:function(e){t.navigateTo({url:"../../detail/detail?id="+e})},toPayment:function(e,s){var a=this;t.request({url:this.config.url+"order/pay",method:"POST",data:{token:this.token,order_no:e},success:function(e){if(console.log(e),1==e.data.code){var o=e.data.data.data;t.requestPayment({provider:"wxpay",appid:o.appId,timeStamp:o.timeStamp,nonceStr:o.nonceStr,package:o.package,signType:o.signType,paySign:o.paySign,success:function(e){console.log("success:"+JSON.stringify(e)),a.orderList.splice(s,1),t.showToast({title:"支付成功"})},fail:function(e){console.log("fail:"+JSON.stringify(e)),t.showToast({title:"支付失败"})}})}else t.showToast({title:e.data.info})}})},cancelOrder:function(t,e){console.log(t,e),this.show_menu=!0},confirm:function(e){t.request({url:this.config.url+"order/confirm",method:"POST",data:{token:this.token,order_no:e},success:function(t){console.log(t)}})},viewSend:function(){t.request({url:this.config.url+"order/express",method:"POST",data:{token:this.token,order_no:order},success:function(t){console.log(t)}})},service:function(e){t.navigateTo({url:"pages/serType/serType"}),t.setStorage({key:"regoods",data:e,success:function(){console.log("保存换货数据成功")}})},deleteOrder:function(e,s){var a=this;t.request({url:this.config.url+"order/del",method:"POST",data:{token:this.token,order_no:e},success:function(e){console.log(e),a.orderList.splice(s,1),1==e.data.code&&t.showToast({title:"删除订单成功"})}})}}};e.default=s}).call(this,s("543d")["default"])},"07ea":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("view",{staticClass:"order-list"},[s("view",{staticClass:"list"},[0==t.orderList.length?s("view",{staticClass:"onorder"},[s("image",{attrs:{src:"../../../static/img/noorder.png"}}),s("view",{staticClass:"text"},[t._v("没有相关订单")])]):t._e(),t._l(t.orderList,function(e,a){return s("view",{key:a,staticClass:"row",attrs:{eventid:"a0e8c0bc-7-"+a},on:{click:function(s){t.ToDetail(e.order_no)}}},[s("view",{staticClass:"type"},[s("text",{staticClass:"order-num"},[t._v("订单编号："+t._s(e.order_no))]),s("text",{staticClass:"order-status"},[t._v(t._s(0==e.status?"已取消":2==e.status?"待支付":3==e.status?"待发货":4==e.status?"代签收":5==e.status?"已完成":""))])]),s("view",{staticClass:"order-list"},t._l(e.order_list,function(e,a){return s("view",{key:a,staticClass:"order-info"},[s("view",{staticClass:"left"},[s("image",{attrs:{src:e.goods_logo}})]),s("view",{staticClass:"right"},[s("view",{staticClass:"name"},[t._v(t._s(e.goods_title))]),s("view",{staticClass:"price-number"},[s("view",{staticClass:"price"},[t._v("￥"+t._s(e.price_selling))]),s("view",{staticClass:"number"},[t._v("x"+t._s(e.number))])])])])})),s("view",{staticClass:"detail"},[s("view",{staticClass:"number"},[t._v("共"+t._s(e.sum)+"件商品")]),s("view",{staticClass:"sum"},[t._v("合计￥"),s("view",{staticClass:"price"},[t._v(t._s(e.price_total))])])]),s("view",{staticClass:"btns"},[2==e.status?s("block",[s("view",{staticClass:"default",attrs:{eventid:"a0e8c0bc-0-"+a},on:{click:t.openPopup}},[t._v("取消订单")]),s("view",{staticClass:"pay",attrs:{eventid:"a0e8c0bc-1-"+a},on:{tap:function(s){s.stopPropagation(),t.toPayment(e.order_no,a)}}},[t._v("去付款")])]):t._e(),4==e.status?s("block",[s("view",{staticClass:"default",attrs:{eventid:"a0e8c0bc-2-"+a},on:{click:function(s){s.stopPropagation(),t.viewSend(e.order_no)}}},[t._v("查看物流")]),s("view",{staticClass:"default",attrs:{eventid:"a0e8c0bc-3-"+a},on:{click:function(s){s.stopPropagation(),t.service(e)}}},[t._v("申请售后")]),s("view",{staticClass:"pay",attrs:{eventid:"a0e8c0bc-4-"+a},on:{click:function(s){s.stopPropagation(),t.confirm(e.order_no)}}},[t._v("确认收货")])]):t._e(),3==e.status?s("block"):t._e(),5==e.status?s("block",[s("view",{staticClass:"pay",attrs:{eventid:"a0e8c0bc-5-"+a},on:{click:function(e){e.stopPropagation(),t.evalute()}}},[t._v("去评价")])]):t._e(),0==e.status?s("block",[s("view",{staticClass:"default",attrs:{eventid:"a0e8c0bc-6-"+a},on:{click:function(s){s.stopPropagation(),t.deleteOrder(e.order_no,a)}}},[t._v("删除订单")])]):t._e()],1)])})],2)])])},o=[];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return o})},"1d9f":function(t,e,s){"use strict";s.r(e);var a=s("04de"),o=s.n(a);for(var i in a)"default"!==i&&function(t){s.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},c2cc:function(t,e,s){},ccac:function(t,e,s){"use strict";s.r(e);var a=s("07ea"),o=s("1d9f");for(var i in o)"default"!==i&&function(t){s.d(e,t,function(){return o[t]})}(i);s("deb3");var n=s("2877"),r=Object(n["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},deb3:function(t,e,s){"use strict";var a=s("c2cc"),o=s.n(a);o.a},e94a:function(t,e,s){"use strict";s("9bb1");var a=i(s("b0ce")),o=i(s("ccac"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(o.default))}},[["e94a","common/runtime","common/vendor"]]]);