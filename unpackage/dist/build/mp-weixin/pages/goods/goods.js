(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods"],{"0168":function(t,s,e){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var a=n(e("a800")),i=n(e("435c")),o=n(e("32fc"));function n(t){return t&&t.__esModule?t:{default:t}}var c={components:{uniNumberBox:a.default,uniRate:i.default,uniLoadMore:o.default},data:function(){return{beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,id:"",proNum:1,evaImg:[],tuiList:[],guiList:[],swiperList:[],currentSwiper:0,anchorlist:[],selectAnchor:0,serviceClass:"",specClass:"",shareClass:"",goodsData:{},selectSpec:null,isKeep:!1,detail:"",goodsDetail:{},comment:[],goods_list:[],size_list:[],selected_size:"",totalList:[],loadingText:"正在加载...",showIcon:!1,status:"more",current_page:0,total:"",last_page:"1"}},onLoad:function(t){this.showBack=!1,console.log(t),this.id=t.id,this.goodsDetail=t},onReady:function(){this.calcAnchor()},onPageScroll:function(t){this.selectAnchor=t.scrollTop>=this.anchorlist[2].top?2:t.scrollTop>=this.anchorlist[1].top?1:0;var s=375;t.scrollTop=t.scrollTop>s?375:t.scrollTop,this.afterHeaderOpacity=t.scrollTop*(1/s),this.beforeHeaderOpacity=1-this.afterHeaderOpacity,this.beforeHeaderzIndex=t.scrollTop>0?10:11,this.afterHeaderzIndex=t.scrollTop>0?11:10},onReachBottom:function(){this.current_page<this.last_page&&this.getRecommendList()},mounted:function(){var s=this;t.request({url:this.config.url+"goods/detail",data:{token:this.token,id:this.id},method:"post",success:function(t){console.log("goods",t,t.data.data.goods_list),1==t.data.code&&(s.goodsData=t.data.data,s.comment=s.goodsData.comment,s.isKeep=s.goodsData.is_collect,s.guiList=s.goodsData.specs,s.swiperList=t.data.data.image.split("|"),console.log(s.swiperList),s.detail=t.data.data.content,console.log(s.detail),s.goods_list=t.data.data.goods_list)}})},methods:{bindChange:function(t){this.proNum=t},addTitle:function(t){console.log(t)},addColor:function(t,s,e,a){var i=this;if(s.length>0){s.forEach(function(t){t.checked=!1}),e.checked=!0,this.$forceUpdate();var o=t.name+":"+e.name;t.checked=o;var n="";this.guiList.forEach(function(t){n+=";"+t.checked}),n=n.substr(1),console.log("all_check",n),this.goods_list.forEach(function(t){t.goods_spec==n&&(i.goodsData.price=t.price_selling,i.goodsData.number_stock=t.number_stock,i.selected_size=t.goods_spec)})}},getRecommendList:function(){var s=this;this.status="loading",t.request({url:this.config.url+"recommend",data:{token:this.token,page:Number(this.current_page)+1},method:"post",success:function(t){var e;s.totalList=t.data.data.data,e=s.totalList.length<10?s.totalList.length:10;for(var a=0;a<e;a++)s.tuiList.push(s.totalList[a]);s.current_page=t.data.data.current_page,s.last_page=t.data.data.last_page,s.total=t.data.data.data.total,s.status="more",s.current_page>=s.last_page&&(s.status="noMore")}})},cancel:function(){this.selected_size&&-1==this.selected_size.indexOf("undefined")?t.request({url:this.config.url+"goods/car",method:"post",data:{token:this.token,goods_id:this.id,goods_spec:this.selected_size,number:this.proNum},success:function(s){console.log("data",s),1==s.data.code?t.showToast({title:"加入成功",icon:"none"}):t.showToast({title:s.data.info,icon:"none"})}}):t.showToast({title:"请选中完整规格",icon:"none"})},gotui:function(s){t.navigateTo({url:"/pages/goods/goods?id="+s})},skipCart:function(){t.switchTab({url:"/pages/tabBar/cart"})},swiperChange:function(t){this.currentSwiper=t.detail.current},toMsg:function(){t.navigateTo({url:"../msg/msg"})},toChat:function(){t.navigateTo({url:"../msg/chat/chat?name=客服008"})},share:function(){this.shareClass="show"},hideShare:function(){var t=this;this.shareClass="hide",setTimeout(function(){t.shareClass="none"},150)},keep:function(){this.isKeep=!this.isKeep,t.request({url:this.config.url+"goods/collect",data:{token:this.token,goods_id:this.id},method:"post",success:function(t){console.log(t)}})},joinCart:function(){if(null==this.selectSpec)return this.showSpec(function(){t.showToast({title:"已加入购物车"})});t.showToast({title:"已加入购物车"})},buy:function(){if(this.selected_size&&-1==this.selected_size.indexOf("undefined")){var s=JSON.stringify(this.goodsDetail);s=this.goodsData,s.goods_spec=this.selected_size,s.goods_number=this.proNum;var e={isCart:0};e.goods=s,t.setStorage({key:"cart",data:e,success:function(){}}),t.navigateTo({url:"/pages/order/confirmation?iscart=1"})}else t.showToast({title:"请选择完整规格",icon:"none"})},toConfirmation:function(){},toRatings:function(){t.navigateTo({url:"ratings/ratings"})},showComments:function(t){},setSelectSpec:function(t){this.selectSpec=t},sub:function(){this.goodsData.number<=1||this.goodsData.number--},add:function(){this.goodsData.number++},toAnchor:function(s){this.selectAnchor=s,t.pageScrollTo({scrollTop:this.anchorlist[s].top,duration:200})},calcAnchor:function(){var s=this;this.anchorlist=[{name:"主图",top:0},{name:"评价",top:0},{name:"详情",top:0}];var e=t.createSelectorQuery().select("#comments");e.boundingClientRect(function(e){var a=0,i=t.upx2px(100);s.anchorlist[1].top=e.top-i-a,s.anchorlist[2].top=e.bottom-i-a}).exec()},back:function(){t.navigateBack(1)},showService:function(){console.log("show"),this.serviceClass="show"},hideService:function(){var t=this;this.serviceClass="hide",setTimeout(function(){t.serviceClass="none"},200)},showSpec:function(t){console.log("show"),this.specClass="show",this.specCallback=t},specCallback:function(){},hideSpec:function(){var t=this;this.specClass="hide",this.selectSpec&&this.specCallback&&this.specCallback(),this.specCallback=!1,setTimeout(function(){t.specClass="none"},200)},discard:function(){}}};s.default=c}).call(this,e("543d")["default"])},"059f":function(t,s,e){"use strict";var a=e("0ef1"),i=e.n(a);i.a},"0ef1":function(t,s,e){},"1fe6":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"uni-rate"},t._l(t.stars,function(s,a){return e("view",{key:a,staticClass:"uni-rate-icon",style:{marginLeft:t.margin+"px"},attrs:{eventid:"743ed0c2-0-"+a},on:{click:function(s){t.onClick(a)}}},[e("uni-icon",{attrs:{size:t.size,color:t.color,type:!1===t.isFill||"false"===t.isFill?"star":"star-filled",mpcomid:"743ed0c2-0-"+a}}),e("view",{staticClass:"uni-rate-icon-on",style:{width:s.activeWitch}},[e("uni-icon",{attrs:{size:t.size,color:t.activeColor,type:"star-filled",mpcomid:"743ed0c2-1-"+a}})],1)],1)}))},i=[];e.d(s,"a",function(){return a}),e.d(s,"b",function(){return i})},"2e87":function(t,s,e){"use strict";e.r(s);var a=e("0168"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(s,t,function(){return a[t]})}(o);s["default"]=i.a},3474:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{attrs:{classs:"container"}},[e("view",{staticClass:"status",style:{opacity:t.afterHeaderOpacity}}),e("view",{staticClass:"footer"},[e("view",{staticClass:"icons"},[e("view",{staticClass:"box",attrs:{eventid:"62af3366-0"},on:{tap:t.keep}},[e("view",{staticClass:"icon",class:[t.isKeep?"shoucangsel":"shoucang"]}),e("view",{staticClass:"text"},[t._v(t._s(t.isKeep?"已":"")+"收藏")])]),e("view",{staticClass:"box ",attrs:{eventid:"62af3366-1"},on:{click:t.skipCart}},[t._m(0),e("view",{staticClass:"text"},[t._v("购物车")])])]),e("view",{staticClass:"btn"},[e("view",{staticClass:"joinCart",attrs:{eventid:"62af3366-2"},on:{tap:t.joinCart}},[t._v("选择规格")])])]),e("view",{staticClass:"share",class:t.shareClass,attrs:{eventid:"62af3366-5"},on:{touchmove:function(s){s.stopPropagation(),s.preventDefault(),t.discard(s)},tap:t.hideShare}},[e("view",{staticClass:"mask"}),e("view",{staticClass:"layer",attrs:{eventid:"62af3366-4"},on:{tap:function(s){s.stopPropagation(),t.discard(s)}}},[e("view",{staticClass:"h1"},[t._v("分享")]),t._m(1),e("view",{staticClass:"btn",attrs:{eventid:"62af3366-3"},on:{tap:t.hideShare}},[t._v("取消")])])]),e("view",{staticClass:"popup service",class:t.serviceClass,attrs:{eventid:"62af3366-8"},on:{touchmove:function(s){s.stopPropagation(),s.preventDefault(),t.discard(s)},tap:t.hideService}},[e("view",{staticClass:"mask"}),e("view",{staticClass:"layer",attrs:{eventid:"62af3366-7"},on:{tap:function(s){s.stopPropagation(),t.discard(s)}}},[e("view",{staticClass:"content"},t._l(t.goodsData.service,function(s,a){return e("view",{key:a,staticClass:"row"},[e("view",{staticClass:"title"},[t._v(t._s(s.name))]),e("view",{staticClass:"description"},[t._v(t._s(s.description))])])})),e("view",{staticClass:"btn"},[e("view",{staticClass:"button",attrs:{eventid:"62af3366-6"},on:{tap:t.hideService}},[t._v("完成")])])])]),e("view",{staticClass:"popup spec",class:t.specClass,attrs:{eventid:"62af3366-16"},on:{touchmove:function(s){s.stopPropagation(),s.preventDefault(),t.discard(s)},tap:t.hideSpec}},[e("view",{staticClass:"mask"}),e("view",{staticClass:"layer",attrs:{eventid:"62af3366-15"},on:{tap:function(s){s.stopPropagation(),t.discard(s)}}},[e("view",{staticClass:"content"},[e("view",{staticClass:"product-title"},[e("image",{attrs:{src:t.goodsData.logo}}),e("view",{staticClass:"product-mes"},[e("text",[t._v(t._s(t.goodsData.price))]),e("text",[t._v(t._s(t.goodsData.number_stock))])]),e("view",{staticClass:"hidden",attrs:{eventid:"62af3366-9"},on:{tap:t.hideSpec}},[t._v("x")])]),t._l(t.guiList,function(s,a){return e("view",{key:a,staticClass:"pro-content"},[e("h2",{attrs:{eventid:"62af3366-10-"+a},on:{click:function(s){t.addTitle(a)}}},[t._v(t._s(s.name))]),e("view",{staticClass:"product-color"},t._l(s.list,function(i,o){return e("text",{key:o,class:{checked:i.checked},attrs:{eventid:"62af3366-11-"+a+"-"+o},on:{click:function(e){t.addColor(s,s.list,i,o)}}},[t._v(t._s(i.name))])}))],1)}),e("view",{staticClass:"product-num"},[e("text",[t._v("数量")]),e("view",[e("uni-number-box",{attrs:{min:1,value:t.proNum,eventid:"62af3366-12",mpcomid:"62af3366-0"},on:{change:t.bindChange}})],1)])],2),e("view",{staticClass:"spec-btn"},[e("view",{staticClass:"cancelB",attrs:{eventid:"62af3366-13"},on:{click:function(s){t.cancel()}}},[t._v("加入购物车")]),e("view",{staticClass:"confirmB",attrs:{eventid:"62af3366-14"},on:{tap:function(s){t.buy()}}},[t._v("立即购买")])])])]),e("view",{staticClass:"swiper-box"},[e("swiper",{attrs:{circular:"true",autoplay:"true",eventid:"62af3366-18"},on:{change:t.swiperChange}},t._l(t.swiperList,function(s,a){return e("swiper-item",{key:a,attrs:{mpcomid:"62af3366-1-"+a}},[e("image",{staticClass:"swiperimage",attrs:{src:s,eventid:"62af3366-17-"+a},on:{tap:function(e){t.toSwiper(s)}}})])})),e("view",{staticClass:"indicator"},[t._v(t._s(t.currentSwiper+1)+"/"+t._s(t.swiperList.length))])],1),e("view",{staticClass:"info-box goods-info"},[e("view",{staticClass:"title"},[t._v(t._s(t.goodsData.title))]),e("view",{staticClass:"product-info"},[e("view",{staticClass:"info"},[e("text",[t._v("￥"+t._s(t.goodsData.price))]),e("text",[t._v("￥"+t._s(t.goodsData.market_price))])]),e("view",{staticClass:"evaluate"},[e("view",{staticClass:"evaluate-num"},[t._v("销量"+t._s(t.goodsData.number_sales))]),e("view",{staticClass:"evaluate-good"},[t._v("好评"+t._s(t.goodsData.good_percent)+"%")])])])]),e("view",{staticClass:"info-box spec"},[e("view",{staticClass:"row"},[e("view",{staticClass:"add-color"},[t._v("库存")]),e("view",{staticClass:"resdius-num"},[t._v(t._s(t.goodsData.number_stock))])]),e("view",{staticClass:"row",attrs:{eventid:"62af3366-19"},on:{tap:function(s){t.showSpec(!1)}}},[e("view",{staticClass:"add-color"},[t._v("规格")]),e("view",{staticClass:"icon xiangyou"})])]),e("view",{staticClass:"info-box comments",attrs:{id:"comments"}},[e("view",{staticClass:"row"},[e("view",{staticClass:"text"},[t._v("评价 ("+t._s(t.goodsData.comment_num)+")")]),e("view",{staticClass:"arrow",attrs:{eventid:"62af3366-21"},on:{tap:t.toRatings}},[e("view",{staticClass:"show",attrs:{eventid:"62af3366-20"},on:{tap:function(s){t.showComments(t.goodsData.id)}}},[t._v("更多")])])]),t._l(t.comment,function(s,a){return e("view",{key:a,staticClass:"comment",attrs:{eventid:"62af3366-22-"+a},on:{tap:t.toRatings}},[e("view",{staticClass:"user-info"},[e("view",{staticClass:"comment-user-info"},[e("view",{staticClass:"people-icon"},[e("image",{staticClass:"people-icon",attrs:{src:t.goodsData.comment[0].member.heading}})]),e("view",{staticClass:"star"},[e("view",{staticClass:"star-name"},[t._v(t._s(t.goodsData.comment[0].member.nickname))]),e("view",[e("uni-rate",{attrs:{size:"20",disabled:"true",value:t.goodsData.comment[0].comment_star,mpcomid:"62af3366-2-"+a}})],1)])]),e("view",{staticClass:"comment-time"},[t._v(t._s(t.goodsData.comment.create_at))])]),e("view",{staticClass:"content"},[t._v(t._s(t.goodsData.comment[0].comment_content))]),e("view",{staticClass:"product-icon"},t._l(t.evaImg,function(t,s){return e("view",{key:s,staticClass:"img"},[e("image",{attrs:{src:t}})])}))])})],2),e("view",{staticClass:"description"},[e("view",{staticClass:"title"},[t._v("商品详情")]),e("view",{staticClass:"product-detail"},[t._m(2),e("view",{staticClass:"product-dec",domProps:{innerHTML:t._s(t.detail)}})])]),e("view",{staticClass:"recomment"},[e("view",{staticClass:"recomment-title "},[t._v("推荐商品")]),e("view",{staticClass:"recomment-contain"},[t._l(t.tuiList,function(s,a){return e("view",{key:a,staticClass:"recomment-list",attrs:{eventid:"62af3366-23-"+a},on:{click:function(e){t.gotui(s.id)}}},[e("view",{staticClass:"recomment-list-left"},[e("image",{attrs:{src:s.logo}})]),e("view",{staticClass:"recomment-list-right"},[e("view",{staticClass:"product-name"},[t._v(t._s(s.title))]),e("view",{staticClass:"product-eval"},[e("view",{directives:[{name:"show",rawName:"v-show",value:1==s.is_hot,expression:"tui.is_hot==1"}],staticClass:"hot-product"},[t._v("热销")]),e("view",{staticClass:"evaluate-num"},[t._v(t._s(s.number_sales)+"人已购买")]),e("view",{staticClass:"evaluate-good"},[t._v(t._s(s.good_percent)+"%好评")])]),e("view",{staticClass:"product-info"},[e("view",{staticClass:"price"},[t._v(t._s(s.price))]),e("view",{staticClass:"slogan"},[t._v(t._s(s.market_price))])])])])}),e("uni-load-more",{attrs:{status:t.status,showIcon:t.showIcon,mpcomid:"62af3366-3"}})],2)]),e("view",{staticClass:"people-service",attrs:{eventid:"62af3366-24"},on:{tap:t.toChat}},[e("text",[t._v("咨询")]),e("text",[t._v("客服")])])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"icon"},[e("image",{attrs:{src:"../../static/img/category/cart.png"}})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"list"},[e("view",{staticClass:"box"},[e("image",{attrs:{src:"../../static/img/share/wx.png"}}),e("view",{staticClass:"title"},[t._v("微信好友")])]),e("view",{staticClass:"box"},[e("image",{attrs:{src:"../../static/img/share/pyq.png"}}),e("view",{staticClass:"title"},[t._v("朋友圈")])]),e("view",{staticClass:"box"},[e("image",{attrs:{src:"../../static/img/share/wb.png"}}),e("view",{staticClass:"title"},[t._v("新浪微博")])]),e("view",{staticClass:"box"},[e("image",{attrs:{src:"../../static/img/share/qq.png"}}),e("view",{staticClass:"title"},[t._v("QQ")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",[e("text",[t._v("产品")]),e("text",[t._v("特点")])])}];e.d(s,"a",function(){return a}),e.d(s,"b",function(){return i})},4002:function(t,s,e){"use strict";var a=e("922c"),i=e.n(a);i.a},"435c":function(t,s,e){"use strict";e.r(s);var a=e("1fe6"),i=e("a1ca");for(var o in i)"default"!==o&&function(t){e.d(s,t,function(){return i[t]})}(o);e("4002");var n=e("2877"),c=Object(n["a"])(i["default"],a["a"],a["b"],!1,null,null,null);s["default"]=c.exports},"6bc3":function(t,s,e){"use strict";e.r(s);var a=e("3474"),i=e("2e87");for(var o in i)"default"!==o&&function(t){e.d(s,t,function(){return i[t]})}(o);e("059f");var n=e("2877"),c=Object(n["a"])(i["default"],a["a"],a["b"],!1,null,null,null);s["default"]=c.exports},"86d8":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var a=i(e("e304"));function i(t){return t&&t.__esModule?t:{default:t}}var o={name:"uni-rate",components:{uniIcon:a.default},props:{isFill:{type:[Boolean,String],default:!0},color:{type:String,default:"#ececec"},activeColor:{type:String,default:"#ffca3e"},size:{type:[Number,String],default:24},value:{type:[Number,String],default:0},max:{type:[Number,String],default:5},margin:{type:[Number,String],default:0},disabled:{type:[Boolean,String],default:!1}},data:function(){return console.log("data"),{maxSync:this.max,valueSync:this.value}},computed:{stars:function(){for(var t=Number(this.maxSync)?Number(this.maxSync):5,s=Number(this.valueSync)?Number(this.valueSync):0,e=[],a=Math.floor(s),i=Math.ceil(s),o=0;o<t;o++)a>o?e.push({activeWitch:"100%"}):i-1===o?e.push({activeWitch:100*(s-a)+"%"}):e.push({activeWitch:"0"});return e}},methods:{onClick:function(t){!0!==this.disabled&&"true"!==this.disabled&&(this.valueSync=t+1,this.$emit("change",{value:this.valueSync}))}}};s.default=o},"922c":function(t,s,e){},a1ca:function(t,s,e){"use strict";e.r(s);var a=e("86d8"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(s,t,function(){return a[t]})}(o);s["default"]=i.a},ef22:function(t,s,e){"use strict";e("9bb1");var a=o(e("b0ce")),i=o(e("6bc3"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))}},[["ef22","common/runtime","common/vendor"]]]);