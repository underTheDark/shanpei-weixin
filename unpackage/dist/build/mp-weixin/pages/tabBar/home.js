(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/home"],{"0aad":function(t,e,i){"use strict";i("d23f");var a=o(i("b0ce")),s=o(i("fbec"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(s.default))},"1ab9":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(i("34fd")),s=o(i("0185"));function o(t){return t&&t.__esModule?t:{default:t}}var n={components:{uniLoadMore:a.default},mounted:function(){var e=this;this.init(),t.hideLoading(),this.request({url:this.config.url+"member/message",method:"POST",data:{token:this.token},success:function(t){1==t.data.code&&(e.msgList=t.data.data.data)}})},data:function(){return{msg:"",msgList:[],showIcon:!1,status:"more",afterHeaderOpacity:1,headerPosition:"fixed",headerTop:null,statusTop:null,city:"北京",currentSwiper:0,swiperList:[],categoryList:[],Promotion:[],hotList:[],limitList:[],productList:[],totalList:[],loadingText:"正在加载...",token1:"",sendUrl:"",current_page:1,total:"",last_page:"1",tishi:!1,hot:[],limit:[],home:!1}},onShareAppMessage:function(){return{title:"快来看一看啊！",path:"/pages/tabBar/home"}},onPageScroll:function(t){this.headerPosition=t.scrollTop>=0?"fixed":"absolute",this.headerTop=t.scrollTop>=0?null:0,this.statusTop=t.scrollTop>=0?null:-this.statusHeight+"px"},onPullDownRefresh:function(){setTimeout(function(){t.stopPullDownRefresh()},1e3),this.current_page=1,this.productList=[],this.hotList=[],this.limitList=[],this.pulldown()},onReachBottom:function(){this.current_page++,this.current_page>this.last_page||this.getRecommendList()},onLoad:function(){this.pulldown()},methods:{pulldown:function(){var e=this;t.showLoading({title:"加载中"}),t.getStorage({key:"info",success:function(t){var i=JSON.parse(t.data);e.token1=i.token,e.first_load(),e.getRecommendList()}})},moreLoad:function(){t.navigateTo({url:"/pages/goods/goods-list?hot=hot"})},moreLimit:function(){t.navigateTo({url:"/pages/goods/goods-list?limit=limit"})},init:function(){t.hideLoading()},first_load:function(){var t=this,e=new s.default.AMapWX({key:"5b9b64be2413fc19c26683fcf0de890f"});e.getRegeo({success:function(e){t.city=e[0].regeocodeData.addressComponent.city.replace(/市/g,""),t.init()},fail:function(t){}}),this.request({url:this.config.url+"member/message",method:"POST",data:{token:this.token1},success:function(e){1==e.data.code&&(t.msgList=e.data.data.data,e.data.data.data.length>0&&(t.msg=!0))}}),this.request({url:this.config.url+"home",data:{},method:"post",success:function(e){var i,a;if(1==e.data.code){t.swiperList=e.data.data.banner,t.categoryList=e.data.data.cate,t.sendUrl=e.data.data.jijian.cover,t.limit=e.data.data.limit_buy,t.hot=e.data.data.hot,t.home=!0,a=t.limit.length<4?t.limit.length:4;for(var s=0;s<a;s++)t.limitList.push(t.limit[s]);i=t.hot.length<6?t.hot.length:6;for(s=0;s<i;s++)t.hotList.push(t.hot[s])}}})},getRecommendList:function(){var t=this;this.status="loading",this.request({url:this.config.url+"recommend",data:{token:this.token1,page:this.current_page},method:"post",success:function(e){var i;t.totalList=e.data.data.data;var a=e.data.data.current_page;if(1==a){i=t.totalList.length<10?t.totalList.length:10;for(var s=0;s<i;s++)t.productList.push(t.totalList[s])}else t.productList.concat(e.data.data.data);t.last_page=e.data.data.last_page,t.total=e.data.data.data.total,t.status="more",t.current_page>=t.last_page&&(t.status="noMore")}})},toMsg:function(){t.navigateTo({url:"/pages/msg/msg"})},toSearch:function(){t.navigateTo({url:"/pages/search/search?"})},toSwiper:function(e){t.navigateTo({url:"/pages/webview/webview?item="+e})},toCategory:function(e){t.navigateTo({url:"/pages/goods/goods-list?id="+e.id+"&title="+e.title})},skipGetgoods:function(){t.navigateTo({url:"/pages/getgoods/getgoods"})},toGoods:function(e){t.navigateTo({url:"/pages/goods/goods?id="+e.id})},swiperChange:function(t){this.currentSwiper=t.detail.current}}};e.default=n}).call(this,i("543d")["default"])},2376:function(t,e,i){},"3e14":function(t,e,i){"use strict";var a=i("2376"),s=i.n(a);s.a},4330:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"home"},[i("view",{staticClass:"header",style:{position:t.headerPosition,top:t.headerTop,opacity:t.afterHeaderOpacity}},[i("view",{staticClass:"addr"},[i("view",{staticClass:"icon location"}),t._v(t._s(t.city))]),i("view",{staticClass:"input-box"},[i("input",{attrs:{placeholder:"搜索商品名称","placeholder-style":"color:#c0c0c0;",eventid:"0c1a97ce-0"},on:{tap:function(e){t.toSearch()}}}),i("view",{staticClass:"icon search"})]),i("view",{staticClass:"icon-btn"},[t.msgList.length>0?i("view",{staticClass:"hongdian"}):t._e(),i("view",{directives:[{name:"show",rawName:"v-show",value:t.msg,expression:"msg"}],staticClass:"hongdian"}),i("view",{staticClass:"icon tongzhi",attrs:{eventid:"0c1a97ce-1"},on:{tap:t.toMsg}})])]),i("view",{staticClass:"place"}),i("view",{staticClass:"swiper"},[i("view",{staticClass:"swiper-box"},[i("swiper",{attrs:{circular:"true",autoplay:"true",eventid:"0c1a97ce-3"},on:{change:t.swiperChange}},t._l(t.swiperList,function(e,a){return i("swiper-item",{key:e.id,attrs:{current:"index",mpcomid:"0c1a97ce-0-"+a}},[i("image",{attrs:{src:e.cover,eventid:"0c1a97ce-2-"+a},on:{tap:function(e){t.toSwiper(a)}}})])})),i("view",{staticClass:"indicator"},[i("view",[t._v(t._s(t.currentSwiper+1))]),i("view",[t._v("/ "+t._s(t.swiperList.length))])])],1)]),i("view",{staticClass:"category-list"},t._l(t.categoryList,function(e,a){return i("view",{key:a,staticClass:"category",attrs:{eventid:"0c1a97ce-4-"+a},on:{tap:function(i){t.toCategory(e)}}},[i("view",{staticClass:"img"},[i("image",{attrs:{src:e.logo}})]),i("view",{staticClass:"text"},[t._v(t._s(e.title))])])})),i("view",{staticClass:"bj-color"}),i("view",{staticClass:"banner",attrs:{eventid:"0c1a97ce-5"},on:{click:t.skipGetgoods}},[i("image",{attrs:{src:t.sendUrl}})]),i("view",{staticClass:"promotion"},[i("view",{staticClass:"promotion-head"},[i("view",{staticClass:"promotion-head-left"},[i("h2",{staticClass:"title"},[t._v("限时抢购")]),t._m(0)],1),i("view",{staticClass:"promotion-head-right",attrs:{eventid:"0c1a97ce-6"},on:{click:t.moreLimit}},[t._v("更多")])]),i("view",{staticClass:"limit-list"},t._l(t.limitList,function(e,a){return i("view",{key:a,staticClass:"limit-list-item",attrs:{eventid:"0c1a97ce-7-"+a},on:{tap:function(i){t.toGoods(e)}}},[i("view",{staticClass:"item-img"},[i("image",{attrs:{src:e.cover}})])])}))]),i("view",{staticClass:"hot promotion"},[i("view",{staticClass:"promotion-head"},[i("view",{staticClass:"promotion-head-left"},[i("h2",{staticClass:"title"},[t._v("热销产品")]),t._m(1)],1),i("view",{staticClass:"promotion-head-right",attrs:{eventid:"0c1a97ce-8"},on:{click:t.moreLoad}},[t._v("更多")])]),i("view",{staticClass:"hot-list"},t._l(t.hotList,function(e,a){return i("view",{key:a,staticClass:"hot-list-item",attrs:{eventid:"0c1a97ce-9-"+a},on:{tap:function(i){t.toGoods(e)}}},[i("view",{staticClass:"item-img"},[i("image",{attrs:{src:e.logo}})]),i("view",{staticClass:"item-title"},[t._v(t._s(e.title))]),i("view",{staticClass:"item-price"},[i("text",[t._v("￥"+t._s(e.price))]),i("text",[t._v("￥"+t._s(e.market_price))])])])}))]),i("view",{staticClass:"goods-list"},[i("view",{staticClass:"title"},[t._v("为你推荐")]),i("view",{staticClass:"product-list"},t._l(t.productList,function(e,a){return i("view",{key:a,staticClass:"product",attrs:{eventid:"0c1a97ce-10-"+a},on:{tap:function(i){t.toGoods(e)}}},[i("image",{attrs:{mode:"widthFix",src:e.logo}}),i("view",{staticClass:"name"},[t._v(t._s(e.title))]),i("view",{staticClass:"info"},[i("view",{staticClass:"price"},[t._v("￥"+t._s(e.price))]),i("view",{staticClass:"slogan"},[t._v("￥"+t._s(e.market_price))])])])}))]),i("uni-load-more",{attrs:{status:t.status,showIcon:t.showIcon,mpcomid:"0c1a97ce-1"}})],1)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"english"},[i("text",[t._v("FLASH")]),i("text",[t._v("SALES")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"english"},[i("text",[t._v("HOT-SALE")]),i("text",[t._v("PRODUCT")])])}];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},a4f5:function(t,e,i){"use strict";i.r(e);var a=i("1ab9"),s=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=s.a},fbec:function(t,e,i){"use strict";i.r(e);var a=i("4330"),s=i("a4f5");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("3e14");var n=i("2877"),c=Object(n["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports}},[["0aad","common/runtime","common/vendor"]]]);