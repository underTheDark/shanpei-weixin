(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/collect/collect"],{"245c":function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("view",{staticClass:"collect"},[e("view",{staticClass:"list"},[e("view",{staticClass:"goods-list goods"},[0==t.goodsList.length?e("view",{staticClass:"tis"},[t._v("没有数据~")]):t._e(),t._l(t.goodsList,function(i,s){return e("view",{key:s,staticClass:"row"},[e("view",{staticClass:"menu",attrs:{eventid:"12794918-0-"+s},on:{tap:function(e){e.stopPropagation(),t.deleteGoods(s,i.goods_id)}}},[e("view",{staticClass:"icon shanchu"})]),e("view",{staticClass:"carrier",class:[t.theIndex==s?"open":t.oldIndex==s?"close":""],attrs:{eventid:"12794918-2-"+s},on:{touchstart:function(i){t.touchStart(s,i)},touchmove:function(i){t.touchMove(s,i)},touchend:function(i){t.touchEnd(s,i)}}},[e("view",{staticClass:"goods-info"},[e("view",{staticClass:"img"},[e("image",{attrs:{src:i.logo}})]),e("view",{staticClass:"info"},[e("view",{staticClass:"title",attrs:{eventid:"12794918-1-"+s},on:{tap:function(e){t.toGoods(i)}}},[t._v(t._s(i.title))]),e("view",{staticClass:"spec"},[t._v(t._s(i.number_sales)+"人已购买   "+t._s(i.good_percent)+"%好评")]),e("view",{staticClass:"price-number"},[e("view",{staticClass:"price"},[e("text",[t._v("￥"+t._s(i.price))]),e("text",[t._v("￥"+t._s(i.market_price))])])])])])])])})],2)])])},n=[];e.d(i,"a",function(){return s}),e.d(i,"b",function(){return n})},"321f":function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("view",{staticClass:"uni-swipe-action"},[e("view",{staticClass:"uni-swipe-action__container",class:{"uni-swipe-action--show":t.isShowBtn},style:{transform:t.transformX,"-webkit-transform":t.transformX},attrs:{eventid:"4c06183c-1"},on:{touchstart:t.touchStart,touchmove:t.touchMove,touchend:t.touchEnd,touchcancel:t.touchEnd,click:t.bindClickCont}},[e("view",{staticClass:"uni-swipe-action__content"},[t._t("default",null,{mpcomid:"4c06183c-0"})],2),e("view",{staticClass:"uni-swipe-action__btn-group",attrs:{id:t.elId}},t._l(t.options,function(i,s){return e("div",{key:s,staticClass:"uni-swipe-action--btn",style:{backgroundColor:i.style&&i.style.backgroundColor?i.style.backgroundColor:"#C7C6CD",color:i.style&&i.style.color?i.style.color:"#FFFFFF",fontSize:i.style&&i.style.fontSize?i.style.fontSize:"28upx"},attrs:{eventid:"4c06183c-0-"+s},on:{click:function(e){t.bindClickBtn(i,s)}}},[t._v(t._s(i.text))])}))]),t.isShowBtn?e("view",{staticClass:"uni-swipe-action__mask",attrs:{eventid:"4c06183c-2"},on:{click:t.close,touchmove:function(i){i.stopPropagation(),i.preventDefault(),t.close(i)}}}):t._e()])},n=[];e.d(i,"a",function(){return s}),e.d(i,"b",function(){return n})},"371f":function(t,i,e){},"3e94":function(t,i,e){"use strict";var s=e("371f"),n=e.n(s);n.a},"4d55":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={name:"uni-swipe-action",props:{isOpened:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},autoClose:{type:Boolean,default:!0},options:Array},watch:{isOpened:function(t,i){this.isShowBtn=!!t,this.endMove()}},data:function(){var t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{elId:t,isShowBtn:!1,transformX:"translateX(0px)"}},created:function(){this.direction="",this.startX=0,this.startY=0,this.btnGroupWidth=0,this.isMoving=!1},onReady:function(){this.getSize()},methods:{getSize:function(){var i=this;t.createSelectorQuery().in(this).select("#".concat(this.elId)).boundingClientRect().exec(function(t){i.btnGroupWidth=t[0].width}),!0===this.isOpened&&(this.isShowBtn=!0,this.endMove())},bindClickBtn:function(t,i){this.$emit("click",{text:t.text,style:t.style,index:i})},bindClickCont:function(t){this.isShowBtn&&!0===this.autoClose&&(this.isShowBtn=!1,this.endMove())},touchStart:function(t){this.startX=t.touches[0].pageX,this.startY=t.touches[0].pageY},touchMove:function(t){if("Y"!==this.direction&&!0!==this.disabled){var i=t.touches[0].pageY-this.startY,e=t.touches[0].pageX-this.startX;!this.isMoving&&Math.abs(i)>Math.abs(e)?this.direction="Y":(this.direction=e>0?"right":"left",this.isMoving=!0)}},touchEnd:function(t){this.isMoving=!1,"right"===this.direction||"left"===this.direction?("right"==this.direction?this.isShowBtn=!1:this.isShowBtn=!0,this.endMove()):this.direction=""},endMove:function(){"Y"!==this.direction&&!0!==this.disabled?(this.isShowBtn?(this.transformX="translateX(".concat(-this.btnGroupWidth,"px)"),this.$emit("opened")):(this.transformX="translateX(0px)",this.$emit("closed")),this.direction=""):this.direction=""},close:function(){this.isShowBtn=!1,this.endMove()}}};i.default=e}).call(this,e("543d")["default"])},"510f":function(t,i,e){"use strict";e.r(i);var s=e("321f"),n=e("ad07");for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);e("3e94");var c=e("2877"),a=Object(c["a"])(n["default"],s["a"],s["b"],!1,null,null,null);i["default"]=a.exports},"88c5":function(t,i,e){"use strict";e.r(i);var s=e("245c"),n=e("e00a");for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);e("c078");var c=e("2877"),a=Object(c["a"])(n["default"],s["a"],s["b"],!1,null,null,null);i["default"]=a.exports},ad07:function(t,i,e){"use strict";e.r(i);var s=e("4d55"),n=e.n(s);for(var o in s)"default"!==o&&function(t){e.d(i,t,function(){return s[t]})}(o);i["default"]=n.a},c078:function(t,i,e){"use strict";var s=e("e4d8"),n=e.n(s);n.a},cd15:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=n(e("510f"));function n(t){return t&&t.__esModule?t:{default:t}}var o={mounted:function(){var i=this;t.request({url:this.config.url+"member/collect",method:"post",data:{token:this.token},success:function(t){console.log(t),1==t.data.code&&(i.goodsList=t.data.data.data)}})},components:{uniSwipeAction:s.default},data:function(){return{options:[{text:"删除",style:{backgroundColor:"rgba(255,84,31,1)"}}],goodsList:[],theIndex:null,oldIndex:null,isStop:!1}},methods:{bindClick:function(i,e){var s=this;t.request({url:this.config.url+"goods/collect",method:"POST",data:{goods_id:e,token:this.token},success:function(t){console.log(t),1==t.data.code&&s.goodsList.splice(i,1)}}),console.log(i)},touchStart:function(t,i){i.touches.length>1?this.isStop=!0:(this.oldIndex=this.theIndex,this.theIndex=null,this.initXY=[i.touches[0].pageX,i.touches[0].pageY])},touchMove:function(t,i){var e=this;if(i.touches.length>1)this.isStop=!0;else{var s=i.touches[0].pageX-this.initXY[0],n=i.touches[0].pageY-this.initXY[1];this.isStop||Math.abs(s)<5||(Math.abs(n)>Math.abs(s)?this.isStop=!0:s<0?(this.theIndex=t,this.isStop=!0):s>0&&null!=this.theIndex&&this.oldIndex==this.theIndex&&(this.oldIndex=t,this.theIndex=null,this.isStop=!0,setTimeout(function(){e.oldIndex=null},150)))}},touchEnd:function(t,i){this.isStop=!1},deleteGoods:function(t,i){this.goodsList.splice(t,1),this.delCart(i)},delCart:function(i){console.log("id",i),t.request({url:this.config.url+"goods/collect",method:"POST",data:{token:this.token,goods_id:i},success:function(t){console.log("res",t)}})}}};i.default=o}).call(this,e("543d")["default"])},d0d2:function(t,i,e){"use strict";e("9bb1");var s=o(e("b0ce")),n=o(e("88c5"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(n.default))},e00a:function(t,i,e){"use strict";e.r(i);var s=e("cd15"),n=e.n(s);for(var o in s)"default"!==o&&function(t){e.d(i,t,function(){return s[t]})}(o);i["default"]=n.a},e4d8:function(t,i,e){}},[["d0d2","common/runtime","common/vendor"]]]);