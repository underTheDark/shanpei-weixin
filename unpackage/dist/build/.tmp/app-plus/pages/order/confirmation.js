(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/confirmation"],{"2a92":function(a,o,t){"use strict";var e=function(){var a=this,o=a.$createElement;a._self._c},d=[];t.d(o,"a",function(){return e}),t.d(o,"b",function(){return d})},"42ba":function(a,o,t){"use strict";var e=t("e514"),d=t.n(e);d.a},"83db":function(a,o,t){"use strict";(function(a){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t={mounted:function(){},computed:{totalmoney:function(){var a=Number(this.total)+Number(this.express);return a}},data:function(){return{buyList:[],goodsinfo:{},number:"",goodsPrice:0,sumPrice:0,address:9,addrList:{},goods:[],express:"",total:"",iscart:"",getgoods_name:!1,order_no:"",orderType:"",defaultAddr:"",addrId:""}},onLoad:function(o){var t=this;console.log("con",o," at pages\\order\\confirmation.vue:114"),o.iscart?a.getStorage({key:"cart",success:function(a){if(console.log("liji",a," at pages\\order\\confirmation.vue:120"),t.iscart=a.data.isCart,0==a.data.isCart){var o={goods_id:a.data.goods.id,goods_number:a.data.goods.goods_number,goods_spec:a.data.goods.goods_spec};t.goods.push(o),t.request({url:t.config.url+"order/sure",method:"post",data:{token:t.token,goods:t.goods},success:function(a){console.log("sure",a," at pages\\order\\confirmation.vue:140"),1==a.data.code&&(t.buyList=a.data.data.goods,t.express=a.data.data.express,t.total=a.data.data.total,t.number=a.data.data.number,t.orderType=a.data.data.order_type,0==t.orderType?t.address=!1:1==t.orderType?(t.getgoods_name=1,t.address=!0,t.addrList=a.data.data.address,t.addrId=a.data.data.address.id):2==t.orderType&&(t.getgoods_name=2,t.address=!0,t.addrList=a.data.data.address,t.addrId=a.data.data.address.id))}})}else t.goods=a.data.goods,t.request({url:t.config.url+"order/sure",method:"post",data:{token:t.token,goods:t.goods},success:function(a){console.log("cart",a," at pages\\order\\confirmation.vue:182"),1==a.data.code&&(t.buyList=a.data.data.goods,t.express=a.data.data.express,t.total=a.data.data.total,t.number=a.data.data.number,t.orderType=a.data.data.order_type,0==t.orderType?t.address=!1:1==t.orderType?(t.getgoods_name=1,t.address=!0,t.addrList=a.data.data.address,t.addrId=a.data.data.address.id):2==t.orderType&&(t.getgoods_name=2,t.address=!0,t.addrList=a.data.data.address,t.addrId=a.data.data.address.id))}})}}):(a.getStorage({key:"address",success:function(a){var o=JSON.parse(a.data);console.log("address",a,o," at pages\\order\\confirmation.vue:223"),o.distance?(t.addrId=o.id,t.getgoods_name=1,t.addrList=o):(t.addrId=o.id,t.addrList=o,t.getgoods_name=2)}}),a.getStorage({key:"cart",success:function(a){if(console.log("liji",a," at pages\\order\\confirmation.vue:241"),t.iscart=a.data.isCart,0==a.data.isCart){var o={goods_id:a.data.goods.id,goods_number:a.data.goods.goods_number,goods_spec:a.data.goods.goods_spec};t.goods.push(o),t.request({url:t.config.url+"order/sure",method:"post",data:{token:t.token,goods:t.goods},success:function(a){console.log("sure",a," at pages\\order\\confirmation.vue:261"),1==a.data.code&&(t.buyList=a.data.data.goods,t.express=a.data.data.express,t.total=a.data.data.total,t.number=a.data.data.number)}})}else t.goods=a.data.goods,t.request({url:t.config.url+"order/sure",method:"post",data:{token:t.token,goods:t.goods},success:function(a){console.log("cart",a," at pages\\order\\confirmation.vue:286"),1==a.data.code&&(t.buyList=a.data.data.goods,t.express=a.data.data.express,t.total=a.data.data.total,t.number=a.data.data.number)}})}}))},filters:{toFixed:function(a){return parseFloat(a).toFixed(2)}},methods:{sendType:function(){a.navigateTo({url:"/pages/sendType/sendType"})},clearOrder:function(){var o=this;a.removeStorage({key:"buylist",success:function(a){o.buylist=[]}})},toPay:function(){var o=this;this.request({url:this.config.url+"order/order",method:"post",data:{token:this.token,goods:this.goods,order_type:this.getgoods_name,address_id:this.addrId,from_car:this.iscart},success:function(t){console.log(t," at pages\\order\\confirmation.vue:341"),1==t.data.code?(o.order_no=t.data.data.order_no,o.request({url:o.config.url+"order/pay",method:"POST",data:{token:o.token,order_no:o.order_no},success:function(o){if(console.log(o," at pages\\order\\confirmation.vue:354"),1==o.data.code){var t=o.data.data.data;a.requestPayment({provider:"wxpay",appid:t.appId,timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign,success:function(o){console.log("success:"+JSON.stringify(o)," at pages\\order\\confirmation.vue:366"),a.navigateTo({url:"/pages/user/order_list/order_list?tbIndex=1"})},fail:function(o){console.log("fail:"+JSON.stringify(o)," at pages\\order\\confirmation.vue:373"),a.switchTab({url:"/pages/tabBar/home"}),a.showToast({title:"支付失败"})}})}else a.showToast({title:o.data.info,duration:1e3})}})):0==t.data.code&&a.showToast({title:t.data.info,duration:1e3})}})}}};o.default=t}).call(this,t("6e42")["default"])},b5eb:function(a,o,t){"use strict";t.r(o);var e=t("83db"),d=t.n(e);for(var s in e)"default"!==s&&function(a){t.d(o,a,function(){return e[a]})}(s);o["default"]=d.a},e514:function(a,o,t){},ff65:function(a,o,t){"use strict";t.r(o);var e=t("2a92"),d=t("b5eb");for(var s in d)"default"!==s&&function(a){t.d(o,a,function(){return d[a]})}(s);t("42ba");var r=t("2877"),n=Object(r["a"])(d["default"],e["a"],e["b"],!1,null,null,null);o["default"]=n.exports}},[["fb49","common/runtime","common/vendor"]]]);