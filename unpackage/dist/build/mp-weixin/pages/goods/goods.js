(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods"],{"68d8":function(t,s,e){},"8d00":function(t,s,e){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var a=n(e("2860")),i=n(e("23ec")),o=n(e("34fd"));function n(t){return t&&t.__esModule?t:{default:t}}var c={components:{uniNumberBox:a.default,uniRate:i.default,uniLoadMore:o.default},data:function(){return{beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,id:"",proNum:1,evaImg:[],tuiList:[],guiList:[],swiperList:[],currentSwiper:0,anchorlist:[],selectAnchor:0,serviceClass:"",specClass:"",shareClass:"",goodsData:{},selectSpec:null,isKeep:!1,detail:"",goodsDetail:{},comment:[],goods_list:[],size_list:[],selected_size:"",totalList:[],loadingText:"正在加载...",showIcon:!1,status:"more",current_page:0,total:"",last_page:"1",limitgoods:"",info:{}}},onLoad:function(t){this.showBack=!1,this.id=t.id,this.goodsDetail=t},onReady:function(){this.calcAnchor()},onReachBottom:function(){this.current_page<this.last_page&&this.getRecommendList()},mounted:function(){var s=this;this.request({url:this.config.url+"goods/detail",data:{token:this.token,id:this.id},method:"post",success:function(t){if(1==t.data.code){s.goodsData=t.data.data,s.limitgoods=t.data.data.coud_buy;var e=s.goodsData.comment;e.length>0&&s.comment.push(e[0]),s.isKeep=s.goodsData.is_collect,s.guiList=s.goodsData.specs,s.swiperList=t.data.data.image.split("|");var a=t.data.data.content;s.detail=a.replace(/\<h2/gi,'<h2 style="font-size:18px;text-indent:2px;" '),s.detail=a.replace(/\<img/gi,'<img style="display:-webkit-box;width:100%!important;'),console.log(s.detail),s.goods_list=t.data.data.goods_list}}}),t.getStorage({key:"info",success:function(t){s.info=JSON.parse(t.data)}})},methods:{handleContact:function(t){},bindChange:function(t){this.proNum=t},addTitle:function(t){},addColor:function(t,s,e,a){var i=this;if(s.length>0){s.forEach(function(t){t.checked=!1}),e.checked=!0,this.$forceUpdate();var o=t.name+":"+e.name;t.checked=o;var n="";this.guiList.forEach(function(t){n+=";"+t.checked}),n=n.substr(1),console.log("all_check",n),this.goods_list.forEach(function(t){t.goods_spec==n&&(i.goodsData.price=t.price_selling,i.goodsData.number_stock=t.number_stock,i.selected_size=t.goods_spec)})}},getRecommendList:function(){var t=this;this.status="loading",this.request({url:this.config.url+"recommend",data:{token:this.token,page:Number(this.current_page)+1},method:"post",success:function(s){var e;t.totalList=s.data.data.data,e=t.totalList.length<10?t.totalList.length:10;for(var a=0;a<e;a++)t.tuiList.push(t.totalList[a]);t.current_page=s.data.data.current_page,t.last_page=s.data.data.last_page,t.total=s.data.data.data.total,t.status="more",t.current_page>=t.last_page&&(t.status="noMore")}})},cancel:function(){this.selected_size&&-1==this.selected_size.indexOf("undefined")?this.request({url:this.config.url+"goods/car",method:"post",data:{token:this.token,goods_id:this.id,goods_spec:this.selected_size,number:this.proNum},success:function(s){console.log("data",s),1==s.data.code?t.showToast({title:"加入成功",icon:"none"}):t.showToast({title:s.data.info,icon:"none"})}}):t.showToast({title:"请选中完整规格",icon:"none"})},gotui:function(s){t.navigateTo({url:"/pages/goods/goods?id="+s})},skipCart:function(){t.switchTab({url:"/pages/tabBar/cart"})},swiperChange:function(t){this.currentSwiper=t.detail.current},toMsg:function(){t.navigateTo({url:"../msg/msg"})},toChat:function(){t.navigateTo({url:"../msg/chat/chat?name=客服008"})},share:function(){this.shareClass="show"},hideShare:function(){var t=this;this.shareClass="hide",setTimeout(function(){t.shareClass="none"},150)},keep:function(){this.isKeep=!this.isKeep,this.request({url:this.config.url+"goods/collect",data:{token:this.token,goods_id:this.id},method:"post",success:function(t){console.log(t)}})},joinCart:function(){if(null==this.selectSpec)return this.showSpec(function(){t.showToast({title:"已加入购物车"})});t.showToast({title:"已加入购物车"})},buy:function(){if(1==this.goodsData.coud_buy&&this.goodsData.number_stock>0)if(this.selected_size&&-1==this.selected_size.indexOf("undefined")){var s=JSON.stringify(this.goodsDetail);s=this.goodsData,s.goods_spec=this.selected_size,s.goods_number=this.proNum,console.log("goodsdat",this.goodsData);var e={isCart:0};e.goods=s,t.setStorage({key:"cart",data:e,success:function(){}}),t.navigateTo({url:"/pages/order/confirmation?iscart=1"})}else t.showToast({title:"请选择完整规格",icon:"none"});else t.showToast({title:"此商品尚不能购买"})},toConfirmation:function(){},toRatings:function(){t.navigateTo({url:"ratings/ratings"})},showComments:function(){t.navigateTo({url:"ratings/ratings?id="+this.id})},setSelectSpec:function(t){this.selectSpec=t},sub:function(){this.goodsData.number<=1||this.goodsData.number--},add:function(){this.goodsData.number++},toAnchor:function(s){this.selectAnchor=s,t.pageScrollTo({scrollTop:this.anchorlist[s].top,duration:200})},calcAnchor:function(){var s=this;this.anchorlist=[{name:"主图",top:0},{name:"评价",top:0},{name:"详情",top:0}];var e=t.createSelectorQuery().select("#comments");e.boundingClientRect(function(e){var a=0,i=t.upx2px(100);s.anchorlist[1].top=e.top-i-a,s.anchorlist[2].top=e.bottom-i-a}).exec()},back:function(){t.navigateBack(1)},showService:function(){console.log("show"),this.serviceClass="show"},hideService:function(){var t=this;this.serviceClass="hide",setTimeout(function(){t.serviceClass="none"},200)},showSpec:function(t){console.log("show"),this.specClass="show",this.specCallback=t},specCallback:function(){},hideSpec:function(){var t=this;this.specClass="hide",this.selectSpec&&this.specCallback&&this.specCallback(),this.specCallback=!1,setTimeout(function(){t.specClass="none"},200)},discard:function(){}}};s.default=c}).call(this,e("543d")["default"])},"8f46":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{attrs:{classs:"container"}},[e("view",{staticClass:"status",style:{opacity:t.afterHeaderOpacity}}),e("view",{staticClass:"footer"},[e("view",{staticClass:"icons"},[e("view",{staticClass:"box",attrs:{eventid:"62af3366-0"},on:{tap:t.keep}},[e("view",{staticClass:"icon",class:[t.isKeep?"shoucangsel":"shoucang"]}),e("view",{staticClass:"text"},[t._v(t._s(t.isKeep?"已":"")+"收藏")])]),e("view",{staticClass:"box ",attrs:{eventid:"62af3366-1"},on:{click:t.skipCart}},[t._m(0),e("view",{staticClass:"text"},[t._v("购物车")])])]),e("view",{staticClass:"btn"},[e("view",{staticClass:"joinCart",attrs:{eventid:"62af3366-2"},on:{tap:t.joinCart}},[t._v("选择规格")])])]),e("view",{staticClass:"popup service",class:t.serviceClass,attrs:{eventid:"62af3366-5"},on:{touchmove:function(s){s.stopPropagation(),s.preventDefault(),t.discard(s)},tap:t.hideService}},[e("view",{staticClass:"mask"}),e("view",{staticClass:"layer",attrs:{eventid:"62af3366-4"},on:{tap:function(s){s.stopPropagation(),t.discard(s)}}},[e("view",{staticClass:"content"},t._l(t.goodsData.service,function(s,a){return e("view",{key:a,staticClass:"row"},[e("view",{staticClass:"title"},[t._v(t._s(s.name))]),e("view",{staticClass:"description"},[t._v(t._s(s.description))])])})),e("view",{staticClass:"btn"},[e("view",{staticClass:"button",attrs:{eventid:"62af3366-3"},on:{tap:t.hideService}},[t._v("完成")])])])]),e("view",{staticClass:"popup spec",class:t.specClass,attrs:{eventid:"62af3366-13"},on:{touchmove:function(s){s.stopPropagation(),s.preventDefault(),t.discard(s)},tap:t.hideSpec}},[e("view",{staticClass:"mask"}),e("view",{staticClass:"layer",attrs:{eventid:"62af3366-12"},on:{tap:function(s){s.stopPropagation(),t.discard(s)}}},[e("view",{staticClass:"content"},[e("view",{staticClass:"product-title"},[e("image",{attrs:{src:t.goodsData.logo}}),e("view",{staticClass:"product-mes"},[e("text",[t._v("￥"+t._s(t.goodsData.price))]),e("text",[t._v("库存:  "+t._s(t.goodsData.number_stock))])]),e("view",{staticClass:"hidden",attrs:{eventid:"62af3366-6"},on:{tap:t.hideSpec}},[t._v("x")])]),t._l(t.guiList,function(s,a){return e("view",{key:a,staticClass:"pro-content"},[e("h2",{attrs:{eventid:"62af3366-7-"+a},on:{click:function(s){t.addTitle(a)}}},[t._v(t._s(s.name))]),e("view",{staticClass:"product-color"},t._l(s.list,function(i,o){return e("text",{key:o,class:{checked:i.checked},attrs:{eventid:"62af3366-8-"+a+"-"+o},on:{click:function(e){t.addColor(s,s.list,i,o)}}},[t._v(t._s(i.name))])}))],1)}),e("view",{staticClass:"product-num"},[e("text",[t._v("数量")]),e("view",[e("uni-number-box",{attrs:{min:1,value:t.proNum,eventid:"62af3366-9",mpcomid:"62af3366-0"},on:{change:t.bindChange}})],1)])],2),e("view",{staticClass:"spec-btn"},[e("view",{staticClass:"cancelB",attrs:{eventid:"62af3366-10"},on:{click:function(s){t.cancel()}}},[t._v("加入购物车")]),e("view",{staticClass:"confirmB",attrs:{eventid:"62af3366-11"},on:{tap:function(s){t.buy()}}},[t._v(t._s(0==t.limitgoods?"预热中":"立即购买"))])])])]),e("view",{staticClass:"swiper-box"},[e("swiper",{attrs:{circular:"true",autoplay:"true",eventid:"62af3366-15"},on:{change:t.swiperChange}},t._l(t.swiperList,function(s,a){return e("swiper-item",{key:a,attrs:{mpcomid:"62af3366-1-"+a}},[e("image",{staticClass:"swiperimage",attrs:{src:s,eventid:"62af3366-14-"+a},on:{tap:function(e){t.toSwiper(s)}}})])})),e("view",{staticClass:"indicator"},[t._v(t._s(t.currentSwiper+1)+"/"+t._s(t.swiperList.length))])],1),e("view",{staticClass:"info-box goods-info"},[e("view",{staticClass:"title"},[t._v(t._s(t.goodsData.title))]),e("view",{staticClass:"product-info"},[e("view",{staticClass:"info"},[e("text",[t._v("￥"+t._s(t.goodsData.price))]),e("text",[t._v("￥"+t._s(t.goodsData.market_price))])]),e("view",{staticClass:"evaluate"},[e("view",{staticClass:"evaluate-num"},[t._v("销量"+t._s(t.goodsData.number_sales))]),e("view",{staticClass:"evaluate-good"},[t._v("好评"+t._s(t.goodsData.good_percent)+"%")])])])]),e("view",{staticClass:"info-box spec"},[e("view",{staticClass:"row"},[e("view",{staticClass:"add-color"},[t._v("库存")]),e("view",{staticClass:"resdius-num"},[t._v(t._s(t.goodsData.number_stock))])]),e("view",{staticClass:"row",attrs:{eventid:"62af3366-16"},on:{tap:function(s){t.showSpec(!1)}}},[e("view",{staticClass:"add-color"},[t._v("规格")]),e("view",{staticClass:"icon xiangyou"})])]),e("view",{staticClass:"info-box comments",attrs:{id:"comments"}},[e("view",{staticClass:"row"},[e("view",{staticClass:"text"},[t._v("评价 ("+t._s(t.goodsData.total_comment)+")")]),e("view",{staticClass:"arrow",attrs:{eventid:"62af3366-18"},on:{tap:t.toRatings}},[e("view",{staticClass:"show",attrs:{eventid:"62af3366-17"},on:{tap:function(s){t.showComments(t.goodsData.id)}}},[t._v("更多")])])]),t._l(t.comment,function(s,a){return e("view",{key:a,staticClass:"comment"},[e("view",{staticClass:"user-info"},[e("view",{staticClass:"comment-user-info"},[e("view",{staticClass:"people-icon"},[e("image",{staticClass:"people-icon",attrs:{src:t.info.headimg}})]),e("view",{staticClass:"star"},[e("view",{staticClass:"star-name"},[t._v(t._s(t.goodsData.comment[0].member.nickname))]),e("view",[e("uni-rate",{attrs:{size:"20",disabled:"true",value:t.goodsData.comment[0].comment_star,mpcomid:"62af3366-2-"+a}})],1)])]),e("view",{staticClass:"comment-time"},[t._v(t._s(t.goodsData.comment_time))])]),e("view",{staticClass:"content"},[t._v(t._s(t.goodsData.comment[0].comment_content))]),e("view",{staticClass:"product-icon"},t._l(t.evaImg,function(t,s){return e("view",{key:s,staticClass:"img"},[e("image",{attrs:{src:t}})])}))])})],2),e("view",{staticClass:"description"},[e("view",{staticClass:"title"},[t._v("商品详情")]),e("view",{staticClass:"product-detail"},[e("view",{staticClass:"product-dec",domProps:{innerHTML:t._s(t.detail)}})])]),e("view",{staticClass:"recomment"},[e("view",{staticClass:"recomment-title "},[t._v("推荐商品")]),e("view",{staticClass:"recomment-contain"},[t._l(t.tuiList,function(s,a){return e("view",{key:a,staticClass:"recomment-list",attrs:{eventid:"62af3366-19-"+a},on:{click:function(e){t.gotui(s.id)}}},[e("view",{staticClass:"recomment-list-left"},[e("image",{attrs:{src:s.logo}})]),e("view",{staticClass:"recomment-list-right"},[e("view",{staticClass:"product-name"},[t._v(t._s(s.title))]),e("view",{staticClass:"product-eval"},[1==s.is_hot?e("view",{staticClass:"hot-product"},[t._v("热销")]):t._e(),e("view",{staticClass:"evaluate-num"},[t._v(t._s(s.number_sales)+"人已购买")]),e("view",{staticClass:"evaluate-good"},[t._v(t._s(s.good_percent)+"%好评")])]),e("view",{staticClass:"product-info"},[e("view",{staticClass:"price"},[t._v("￥"+t._s(s.price))]),e("view",{staticClass:"slogan"},[t._v("￥"+t._s(s.market_price))])])])])}),e("uni-load-more",{attrs:{status:t.status,showIcon:t.showIcon,mpcomid:"62af3366-3"}})],2)]),e("button",{attrs:{"open-type":"contact",bindcontact:"handleContact"}},[e("view",{staticClass:"people-service"},[e("text",[t._v("咨询")]),e("text",[t._v("客服")])])])],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"icon"},[e("image",{attrs:{src:"../../static/img/category/cart.png"}})])}];e.d(s,"a",function(){return a}),e.d(s,"b",function(){return i})},"97b4":function(t,s,e){"use strict";e("d23f");var a=o(e("b0ce")),i=o(e("b68c"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},a2c0:function(t,s,e){"use strict";e.r(s);var a=e("8d00"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(s,t,function(){return a[t]})}(o);s["default"]=i.a},b68c:function(t,s,e){"use strict";e.r(s);var a=e("8f46"),i=e("a2c0");for(var o in i)"default"!==o&&function(t){e.d(s,t,function(){return i[t]})}(o);e("d1b0");var n=e("2877"),c=Object(n["a"])(i["default"],a["a"],a["b"],!1,null,null,null);s["default"]=c.exports},d1b0:function(t,s,e){"use strict";var a=e("68d8"),i=e.n(a);i.a}},[["97b4","common/runtime","common/vendor"]]]);