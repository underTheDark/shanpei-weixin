(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/order_list/order_list"],{1206:function(e,t,o){"use strict";var r=o("2f05"),s=o.n(r);s.a},"2f05":function(e,t,o){},"568c":function(e,t,o){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},s=[];o.d(t,"a",function(){return r}),o.d(t,"b",function(){return s})},"609f4":function(e,t,o){"use strict";o.r(t);var r=o("568c"),s=o("fbef");for(var i in s)"default"!==i&&function(e){o.d(t,e,function(){return s[e]})}(i);o("1206");var n=o("2877"),a=Object(n["a"])(s["default"],r["a"],r["b"],!1,null,null,null);t["default"]=a.exports},c4fe:function(e,t,o){"use strict";(function(e){var o;function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={data:function(){return{style4:"",desc:"",num:"",order:"",show_menu:!1,ishow:!1,selceted:"",headerPosition:"fixed",headerTop:"0px",typeText:{unpaid:"等待付款",back:"等待商家发货",unreceived:"商家已发货",received:"等待用户评价",completed:"交易已完成",refunds:"商品退货处理中",cancelled:"订单已取消"},orderType:["全部","待付款","待发货","待收货","已完成"],orderList:[],list:[],tabbarIndex:0,array:[{id:0,name:"我不想买了"},{id:1,name:"信息填写错误"},{id:2,name:"重新拍"},{id:3,name:"卖家缺货"},{id:4,name:"其他原因"}]}},onLoad:function(e){console.log("option: "+JSON.stringify(e)," at pages\\user\\order_list\\order_list.vue:147");var t=parseInt(e.tbIndex)+1;this.tabbarIndex=t},onShow:function(){var e=this;this.request({url:this.config.url+"member/order",method:"post",data:{token:this.token,type:this.tabbarIndex},success:function(t){1==t.data.code&&(e.orderList=t.data.data.data,e.orderList.forEach(function(e,t){var o=0;e.order_list.forEach(function(e){o+=e.number}),e.sum=o}))}})},mounted:function(){var e=this;this.request({url:this.config.url+"member/order",method:"post",data:{token:this.token,type:this.tabbarIndex},success:function(t){console.log("moun",t," at pages\\user\\order_list\\order_list.vue:196"),1==t.data.code&&(e.orderList=t.data.data.data,e.orderList.forEach(function(e,t){var o=0;e.order_list.forEach(function(e){o+=e.number}),e.sum=o}))}})},onPageScroll:function(e){},methods:(o={showType:function(e){this.tabbarIndex=e,this.list=this.orderList[e]},showcityfour:function(e,t){this.style4=e,this.desc=t},ToDetail:function(t){e.navigateTo({url:"../../detail/detail?id="+t})}},r(o,"showType",function(e){var t=this;console.log(e," at pages\\user\\order_list\\order_list.vue:235"),this.request({url:this.config.url+"member/order",method:"post",data:{token:this.token,type:e},success:function(e){console.log("moun",e," at pages\\user\\order_list\\order_list.vue:244"),1==e.data.code&&(t.orderList=e.data.data.data,t.orderList.forEach(function(e,t){var o=0;e.order_list.forEach(function(e){o+=e.number}),e.sum=o}))}}),this.tabbarIndex=e,this.list=this.orderList[e]}),r(o,"toPayment",function(t,o){var r=this;this.request({url:this.config.url+"order/pay",method:"POST",data:{token:this.token,order_no:t},success:function(t){if(console.log(t," at pages\\user\\order_list\\order_list.vue:274"),1==t.data.code){var s=t.data.data.data;e.requestPayment({provider:"wxpay",appid:s.appId,timeStamp:s.timeStamp,nonceStr:s.nonceStr,package:s.package,signType:s.signType,paySign:s.paySign,success:function(t){console.log("success:"+JSON.stringify(t)," at pages\\user\\order_list\\order_list.vue:286"),r.orderList.splice(o,1),e.showToast({title:"支付成功"})},fail:function(t){console.log("fail:"+JSON.stringify(t)," at pages\\user\\order_list\\order_list.vue:294"),e.showToast({title:"支付失败"})}})}else e.showToast({title:t.data.info})}})}),r(o,"cancelOrder",function(e,t){console.log(e,t," at pages\\user\\order_list\\order_list.vue:311"),this.show_menu=!0,this.num=t,this.order=e}),r(o,"cancel",function(){this.show_menu=!1}),r(o,"sure",function(){var t=this;this.desc?(this.show_menu=!1,this.request({url:this.config.url+"order/cancle",method:"POST",data:{token:this.token,order_no:this.order,cancle_desc:this.desc},success:function(o){console.log(o," at pages\\user\\order_list\\order_list.vue:336"),t.orderList.splice(t.index,1),1==o.data.code?e.showToast({title:"取消订单成功"}):e.showToast({title:"取消订单失败"})}})):e.showToast({title:"请选择退货原因",icon:"none"}),console.log(order,index," at pages\\user\\order_list\\order_list.vue:357"),this.ishow=!0}),r(o,"confirm",function(t,o){this.request({url:this.config.url+"order/confirm",method:"POST",data:{token:this.token,order_no:t},success:function(t){var r=JSON.stringify(o);console.log("确认收货",t," at pages\\user\\order_list\\order_list.vue:394"),e.navigateTo({url:"/pages/confirm/confirm?con="+r})}})}),r(o,"viewSend",function(t,o){this.request({url:this.config.url+"order/express",method:"POST",data:{order_no:t},success:function(t){if(console.log(t," at pages\\user\\order_list\\order_list.vue:411"),1==t.data.code){var r=JSON.stringify(o),s=JSON.stringify(t.data.data);e.navigateTo({url:"/pages/viewsend/viewsend?info="+s+"&goods="+r})}else e.showToast({title:t.data.info})}})}),r(o,"service",function(t){e.navigateTo({url:"/pages/serType/serType"}),e.setStorage({key:"regoods",data:t,success:function(){console.log("保存换货数据成功"," at pages\\user\\order_list\\order_list.vue:435")}})}),r(o,"deleteOrder",function(t,o){var r=this;this.request({url:this.config.url+"order/del",method:"POST",data:{token:this.token,order_no:t},success:function(t){console.log(t," at pages\\user\\order_list\\order_list.vue:449"),r.orderList.splice(o,1),1==t.data.code&&e.showToast({title:"删除订单成功"})}})}),r(o,"evalute",function(t){console.log("item",t," at pages\\user\\order_list\\order_list.vue:461");var o=JSON.stringify(t);e.navigateTo({url:"/pages/user/keep/sayFeel/sayFeel?eval="+o})}),o)};t.default=s}).call(this,o("6e42")["default"])},fbef:function(e,t,o){"use strict";o.r(t);var r=o("c4fe"),s=o.n(r);for(var i in r)"default"!==i&&function(e){o.d(t,e,function(){return r[e]})}(i);t["default"]=s.a}},[["4f87","common/runtime","common/vendor"]]]);