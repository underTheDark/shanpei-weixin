(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods-list"],{6737:function(t,e,s){"use strict";s.r(e);var o=s("b58b"),i=s("f301");for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);s("dbfc");var r=s("2877"),n=Object(r["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=n.exports},"6a47":function(t,e,s){},"6d27":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={mounted:function(){var e=this;t.request({url:this.config.url+"goods/lists",data:{token:this.token,cate_id:this.key1,sort:1,asc:1,page:1},method:"post",success:function(t){console.log(t),e.goodsList=t.data.data.data}})},data:function(){return{goodsList:[],loadingText:"正在加载...",headerTop:"0px",headerPosition:"fixed",orderbyList:[{text:"综合",selected:!0,orderbyicon:!1,orderby:0},{text:"销量",selected:!1,orderbyicon:["sheng","jiang"],orderby:0},{text:"价格",selected:!1,orderbyicon:["sheng","jiang"],orderby:0}],orderby:"sheng",id:"",key1:"",cur_page:0,tol_page:1}},onLoad:function(e){console.log("option",e),t.setNavigationBarTitle({title:e.title}),this.key1=e.key},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onPullDownRefresh:function(){var e=this;setTimeout(function(){e.reload(),t.stopPullDownRefresh()},1e3)},onReachBottom:function(){if(this.cur_page=this.cur_page+1,t.showToast({title:"触发上拉加载"}),this.cur_page>=this.tol_page)return this.loadingText="到底了",!1;this.loadingText="正在加载..."},methods:{sortType:function(e){var s=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;t.request({url:this.config.url+"goods/lists",data:{token:this.token,cate_id:this.key1,sort:e,asc:o,page:this.cur_page},method:"post",success:function(t){console.log(t.data.data),s.goodsList=t.data.data.data,s.cur_page=t.data.data.data.current_page,s.tol_page=t.data.data.data.last_page}})},reload:function(){console.log("reload"),this.sortType(1)},toGoods:function(e){console.log(e);var s=e.id;t.navigateTo({url:"/pages/goods/goods?id="+s})},select:function(e){var s=this.orderbyList[e].text+"排序 ";if(this.orderbyList[e].orderbyicon){var o=0==this.orderbyList[e].orderby?"升序":"降序";this.orderbyList[e].selected&&(o=0==this.orderbyList[e].orderby?"降序":"升序",this.orderbyList[e].orderby=0==this.orderbyList[e].orderby?1:0),s+=o}this.orderbyList[e].selected=!0;for(var i=this.orderbyList.length,a=0;a<i;a++)a!=e&&(this.orderbyList[a].selected=!1);switch(t.showToast({title:s,icon:"none"}),e){case 0:this.sortType(1);break;case 1:this.orderbyList[e].orderby?this.sortType(2,2):this.sortType(2);break;case 2:this.orderbyList[e].orderby?this.sortType(3,2):this.sortType(3);break}}}};e.default=s}).call(this,s("543d")["default"])},7823:function(t,e,s){"use strict";s("9bb1");var o=a(s("b0ce")),i=a(s("6737"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,o.default)(i.default))},b58b:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("view",{staticClass:"header",style:{position:t.headerPosition,top:t.headerTop}},t._l(t.orderbyList,function(e,o){return s("view",{key:o,staticClass:"target",class:[e.selected?"on":""],attrs:{eventid:"aad862b6-0-"+o},on:{tap:function(e){t.select(o)}}},[t._v(t._s(e.text)),e.orderbyicon?s("view",{staticClass:"icon",class:e.orderbyicon[e.orderby]}):t._e()])})),s("view",{staticClass:"place"}),s("view",{staticClass:"goods-list"},[s("view",{staticClass:"product-list"},t._l(t.goodsList,function(e,o){return s("view",{key:e.goods_id,staticClass:"product",attrs:{eventid:"aad862b6-1-"+o},on:{tap:function(s){t.toGoods(e)}}},[s("image",{attrs:{src:e.logo}}),s("view",{staticClass:"name"},[t._v(t._s(e.title))]),s("view",{staticClass:"info"},[s("view",{staticClass:"price"},[t._v(t._s(e.price))]),s("view",{staticClass:"slogan"},[t._v(t._s(e.market_price))])]),s("view",{staticClass:"evaluate"},[s("view",{staticClass:"evaluate-num"},[t._v(t._s(e.comment_num)+"条评价")]),s("view",{staticClass:"evaluate-good"},[t._v(t._s(e.good_percent)+"%好评")])])])})),s("view",{staticClass:"loading-text"},[t._v(t._s(t.loadingText))])])])},i=[];s.d(e,"a",function(){return o}),s.d(e,"b",function(){return i})},dbfc:function(t,e,s){"use strict";var o=s("6a47"),i=s.n(o);i.a},f301:function(t,e,s){"use strict";s.r(e);var o=s("6d27"),i=s.n(o);for(var a in o)"default"!==a&&function(t){s.d(e,t,function(){return o[t]})}(a);e["default"]=i.a}},[["7823","common/runtime","common/vendor"]]]);