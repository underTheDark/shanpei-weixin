(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/category"],{"0223":function(t,e,s){"use strict";s.r(e);var i=s("378f"),a=s("8e7b");for(var o in a)"default"!==o&&function(t){s.d(e,t,function(){return a[t]})}(o);s("4b08");var n=s("2877"),c=Object(n["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},"378f":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("view",{staticClass:"status",style:{position:t.headerPosition}}),s("view",{staticClass:"header",style:{position:t.headerPosition}},[s("view",{staticClass:"addr"},[s("view",{staticClass:"icon location"}),t._v(t._s(t.city))]),s("view",{staticClass:"input-box"},[s("input",{attrs:{placeholder:"搜索商品名称","placeholder-style":"color:#c0c0c0;",eventid:"8a036190-0"},on:{tap:function(e){t.toSearch()}}}),s("view",{staticClass:"icon search"})])]),s("view",{staticClass:"place"}),s("view",{staticClass:"category-list"},[s("scroll-view",{staticClass:"left",attrs:{"scroll-y":"true"}},t._l(t.categoryList,function(e,i){return s("view",{key:i,staticClass:"row",class:[i==t.showCategoryIndex?"on":""],attrs:{eventid:"8a036190-1-"+i},on:{tap:function(s){t.showCategory(i,e.id)}}},[s("view",{staticClass:"text"},[t._v(t._s(e.title))])])})),s("scroll-view",{staticClass:"right",attrs:{"scroll-y":"true"}},[s("view",{staticClass:"category"},[s("view",{staticClass:"banner"},[t._v(t._s(t.mingcheng))]),s("view",{staticClass:"list"},t._l(t.categoryChild,function(e,i){return s("view",{key:i,staticClass:"box",attrs:{eventid:"8a036190-2-"+i},on:{click:function(s){t.goodsList(i,e)}}},[s("image",{attrs:{src:e.logo}}),s("view",{staticClass:"text"},[t._v(t._s(e.title))])])}))])])],1)])},a=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return a})},"45d6":function(t,e,s){"use strict";s("d23f");var i=o(s("b0ce")),a=o(s("0223"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},"4b08":function(t,e,s){"use strict";var i=s("8799"),a=s.n(i);a.a},8799:function(t,e,s){},"8e7b":function(t,e,s){"use strict";s.r(e);var i=s("a17e"),a=s.n(i);for(var o in i)"default"!==o&&function(t){s.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},a17e:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(s("0185"));function a(t){return t&&t.__esModule?t:{default:t}}var o={onLoad:function(){var t=this;this.amapPlugin=new i.default.AMapWX({key:"5b9b64be2413fc19c26683fcf0de890f"}),this.amapPlugin.getRegeo({success:function(e){t.city=e[0].regeocodeData.addressComponent.city.replace(/市/g,"")}}),this.showCategoryIndex=0,this.request({url:this.config.url+"category",data:{token:this.token},method:"post",success:function(e){console.log("cate",e),t.categoryList=e.data.data,t.mingcheng=t.categoryList[0].title,t.categoryChild=t.categoryList[0].children}})},data:function(){return{showCategoryIndex:0,headerPosition:"fixed",city:"北京",categoryList:[],mingcheng:"",categoryChild:[],first:"",goodsTitle:""}},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},methods:{goodsList:function(e,s){console.log(e,s),t.navigateTo({url:"/pages/goods/goods-list?id="+s.id+"&title="+this.mingcheng})},toMsg:function(){t.navigateTo({url:"../msg/msg"})},showCategory:function(t,e){this.showCategoryIndex=t,this.first=e,this.mingcheng=this.categoryList[t].title,this.categoryChild=this.categoryList[t].children},toSearch:function(){t.navigateTo({url:"/pages/search/search"})}},onShareAppMessage:function(){return{title:"快来看一看啊！",path:"/pages/tabBar/category"}}};e.default=o}).call(this,s("543d")["default"])}},[["45d6","common/runtime","common/vendor"]]]);