(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods"],{"34a1":function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var s=function(){return e.e("components/uni-number-box/uni-number-box").then(e.bind(null,"2860"))},a=function(){return e.e("components/uni-rate/uni-rate").then(e.bind(null,"23ec"))},i=function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"34fd"))},n={components:{uniNumberBox:s,uniRate:a,uniLoadMore:i},data:function(){return{beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,id:"",proNum:1,showBack:!0,evaImg:[],tuiList:[],guiList:[],swiperList:[],currentSwiper:0,anchorlist:[],selectAnchor:0,serviceClass:"",specClass:"",shareClass:"",goodsData:{},selectSpec:null,isKeep:!1,detail:"",goodsDetail:{},comment:[],goods_list:[],size_list:[],selected_size:"",totalList:[],loadingText:"正在加载...",showIcon:!1,status:"more",current_page:0,total:"",last_page:"1",limitgoods:""}},onLoad:function(t){this.id=t.id,this.goodsDetail=t},onReady:function(){this.calcAnchor()},onReachBottom:function(){this.current_page<this.last_page&&this.getRecommendList()},mounted:function(){var t=this;this.request({url:this.config.url+"goods/detail",data:{token:this.token,id:this.id},method:"post",success:function(o){if(console.log("goods",o,o.data.data.goods_list," at pages\\goods\\goods.vue:368"),1==o.data.code){t.goodsData=o.data.data,t.limitgoods=o.data.data.coud_buy,t.comment=t.goodsData.comment,t.isKeep=t.goodsData.is_collect,t.guiList=t.goodsData.specs,t.swiperList=o.data.data.image.split("|"),console.log(t.swiperList," at pages\\goods\\goods.vue:379");var e=o.data.data.content;t.detail=e.replace(/\<h2/gi,'<h2 style="font-size:30upx;text-indent:2upx;" '),t.detail=e.replace(/\<img/gi,'<img style="display:-webkit-box;width:100% !important;" '),console.log(t.detail," at pages\\goods\\goods.vue:384"),console.log(t.detail," at pages\\goods\\goods.vue:386"),t.goods_list=o.data.data.goods_list}}})},methods:{handleContact:function(t){console.log(t," at pages\\goods\\goods.vue:430")},bindChange:function(t){this.proNum=t},addTitle:function(t){console.log(t," at pages\\goods\\goods.vue:437")},addColor:function(t,o,e,s){var a=this;if(o.length>0){o.forEach(function(t){t.checked=!1}),e.checked=!0,this.$forceUpdate();var i=t.name+":"+e.name;t.checked=i;var n="";this.guiList.forEach(function(t){n+=";"+t.checked}),n=n.substr(1),console.log("all_check",n," at pages\\goods\\goods.vue:456"),this.goods_list.forEach(function(t){t.goods_spec==n&&(a.goodsData.price=t.price_selling,a.goodsData.number_stock=t.number_stock,a.selected_size=t.goods_spec)})}},getRecommendList:function(){var t=this;this.status="loading",this.request({url:this.config.url+"recommend",data:{token:this.token,page:Number(this.current_page)+1},method:"post",success:function(o){var e;console.log("res.data",o.data," at pages\\goods\\goods.vue:483"),t.totalList=o.data.data.data,e=t.totalList.length<10?t.totalList.length:10;for(var s=0;s<e;s++)t.tuiList.push(t.totalList[s]);t.current_page=o.data.data.current_page,t.last_page=o.data.data.last_page,t.total=o.data.data.data.total,t.status="more",t.current_page>=t.last_page&&(t.status="noMore")}})},cancel:function(){this.selected_size&&-1==this.selected_size.indexOf("undefined")?this.request({url:this.config.url+"goods/car",method:"post",data:{token:this.token,goods_id:this.id,goods_spec:this.selected_size,number:this.proNum},success:function(o){console.log("data",o," at pages\\goods\\goods.vue:522"),1==o.data.code?t.showToast({title:"加入成功",icon:"none"}):t.showToast({title:o.data.info,icon:"none"})}}):t.showToast({title:"请选中完整规格",icon:"none"})},gotui:function(o){t.navigateTo({url:"/pages/goods/goods?id="+o})},skipCart:function(){t.switchTab({url:"/pages/tabBar/cart"})},swiperChange:function(t){this.currentSwiper=t.detail.current},toMsg:function(){t.navigateTo({url:"../msg/msg"})},toChat:function(){t.navigateTo({url:"../msg/chat/chat?name=客服008"})},share:function(){this.shareClass="show"},hideShare:function(){var t=this;this.shareClass="hide",setTimeout(function(){t.shareClass="none"},150)},keep:function(){this.isKeep=!this.isKeep,this.request({url:this.config.url+"goods/collect",data:{token:this.token,goods_id:this.id},method:"post",success:function(t){console.log(t," at pages\\goods\\goods.vue:592")}})},joinCart:function(){if(null==this.selectSpec)return this.showSpec(function(){t.showToast({title:"已加入购物车"})});t.showToast({title:"已加入购物车"})},buy:function(){if(1==this.goodsData.coud_buy)if(this.selected_size&&-1==this.selected_size.indexOf("undefined")){var o=JSON.stringify(this.goodsDetail);o=this.goodsData,o.goods_spec=this.selected_size,o.goods_number=this.proNum,console.log("goodsdat",this.goodsData," at pages\\goods\\goods.vue:619");var e={isCart:0};e.goods=o,t.setStorage({key:"cart",data:e,success:function(){}}),t.navigateTo({url:"/pages/order/confirmation?iscart=1"})}else t.showToast({title:"请选择完整规格",icon:"none"});else t.showToast({title:"此商品尚不能购买"})},toConfirmation:function(){},toRatings:function(){t.navigateTo({url:"ratings/ratings"})},showComments:function(t){},setSelectSpec:function(t){this.selectSpec=t},sub:function(){this.goodsData.number<=1||this.goodsData.number--},add:function(){this.goodsData.number++},toAnchor:function(o){this.selectAnchor=o,t.pageScrollTo({scrollTop:this.anchorlist[o].top,duration:200})},calcAnchor:function(){var o=this;this.anchorlist=[{name:"主图",top:0},{name:"评价",top:0},{name:"详情",top:0}];var e=t.createSelectorQuery().select("#comments");e.boundingClientRect(function(e){var s=0;s=plus.navigator.getStatusbarHeight();var a=t.upx2px(100);o.anchorlist[1].top=e.top-a-s,o.anchorlist[2].top=e.bottom-a-s}).exec()},back:function(){t.navigateBack(1)},showService:function(){console.log("show"," at pages\\goods\\goods.vue:738"),this.serviceClass="show"},hideService:function(){var t=this;this.serviceClass="hide",setTimeout(function(){t.serviceClass="none"},200)},showSpec:function(t){console.log("show"," at pages\\goods\\goods.vue:750"),this.specClass="show",this.specCallback=t},specCallback:function(){},hideSpec:function(){var t=this;this.specClass="hide",this.selectSpec&&this.specCallback&&this.specCallback(),this.specCallback=!1,setTimeout(function(){t.specClass="none"},200)},discard:function(){}}};o.default=n}).call(this,e("6e42")["default"])},"68d8":function(t,o,e){},7224:function(t,o,e){"use strict";var s=function(){var t=this,o=t.$createElement;t._self._c},a=[];e.d(o,"a",function(){return s}),e.d(o,"b",function(){return a})},a2c0:function(t,o,e){"use strict";e.r(o);var s=e("34a1"),a=e.n(s);for(var i in s)"default"!==i&&function(t){e.d(o,t,function(){return s[t]})}(i);o["default"]=a.a},b68c:function(t,o,e){"use strict";e.r(o);var s=e("7224"),a=e("a2c0");for(var i in a)"default"!==i&&function(t){e.d(o,t,function(){return a[t]})}(i);e("d1b0");var n=e("2877"),c=Object(n["a"])(a["default"],s["a"],s["b"],!1,null,null,null);o["default"]=c.exports},d1b0:function(t,o,e){"use strict";var s=e("68d8"),a=e.n(s);a.a}},[["97b4","common/runtime","common/vendor"]]]);