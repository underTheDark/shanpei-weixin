(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/msg/msg"],{"1d31":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{msgList:[]}},onPullDownRefresh:function(){setTimeout(function(){t.stopPullDownRefresh()},1e3)},onLoad:function(){},methods:{},mounted:function(){var n=this;t.request({url:this.config.url+"member/message",method:"POST",data:{token:this.token},success:function(t){console.log(t," at pages\\msg\\msg.vue:49"),1==t.data.code&&(n.msgList=t.data.data.data)}})}};n.default=e}).call(this,e("6e42")["default"])},"320b":function(t,n,e){},"4f37":function(t,n,e){"use strict";e.r(n);var u=e("5525"),o=e("fdd2");for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);e("8352");var s=e("2877"),r=Object(s["a"])(o["default"],u["a"],u["b"],!1,null,null,null);n["default"]=r.exports},5525:function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return o})},8352:function(t,n,e){"use strict";var u=e("320b"),o=e.n(u);o.a},fdd2:function(t,n,e){"use strict";e.r(n);var u=e("1d31"),o=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);n["default"]=o.a}},[["b953","common/runtime","common/vendor"]]]);