(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/address/address"],{"122f":function(e,s,t){"use strict";t.r(s);var a=t("c3c0"),n=t("b927");for(var o in n)"default"!==o&&function(e){t.d(s,e,function(){return n[e]})}(o);t("59b4");var d=t("2877"),r=Object(d["a"])(n["default"],a["a"],a["b"],!1,null,null,null);s["default"]=r.exports},"59b4":function(e,s,t){"use strict";var a=t("f806"),n=t.n(a);n.a},b927:function(e,s,t){"use strict";t.r(s);var a=t("df7b"),n=t.n(a);for(var o in a)"default"!==o&&function(e){t.d(s,e,function(){return a[e]})}(o);s["default"]=n.a},c3c0:function(e,s,t){"use strict";var a=function(){var e=this,s=e.$createElement;e._self._c},n=[];t.d(s,"a",function(){return a}),t.d(s,"b",function(){return n})},df7b:function(e,s,t){"use strict";(function(e){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var t={onShow:function(){var e=this;this.request({url:this.config.url+"member/station",method:"post",data:{token:this.token},success:function(s){console.log(111111111," at pages\\user\\address\\address.vue:124"),e.selfList=s.data.data,e.selfLen=s.data.data.length,console.log(s,s.data.data.length,"zi"," at pages\\user\\address\\address.vue:127")}}),this.request({url:this.config.url+"member/address",method:"POST",data:{token:this.token},success:function(s){console.log(11111111221," at pages\\user\\address\\address.vue:139"),console.log(s,s.data.data.length,"wo"," at pages\\user\\address\\address.vue:140"),e.homeList=s.data.data,e.homeLen=s.data.data.length}})},mounted:function(){},data:function(){return{src1:"../../../static/img/address/y-duihao.png",src2:"../../../static/img/address/n-duihao.png",typeClass:"home",subState:1,isSelect:!1,homeList:[],selfList:[],homeLen:"",selfLen:""}},onLoad:function(e){"select"==e.type&&(this.isSelect=!0,console.log(11111," at pages\\user\\address\\address.vue:167"))},onReady:function(){console.log("ready"," at pages\\user\\address\\address.vue:171")},methods:{removeH:function(s,t){var a=this,n=this;e.showModal({title:"提示",content:"确定要删除收货地址",cancelText:"取消",confirmText:"确认",confirmColor:"#14CC21",success:function(e){var o=n.homeList;console.log("hoem",o," at pages\\user\\address\\address.vue:187"),a.homeList.splice(s,1),a.request({url:a.config.url+"address/del",data:{token:a.token,address_id:t},method:"post",success:function(e){e.data.code}})}})},removeS:function(s,t){var a=this;e.showModal({title:"提示",content:"确定要删除收货地址",cancelText:"取消",confirmText:"确认",confirmColor:"#14CC21",success:function(e){a.request({url:a.config.url+"station/del",data:{token:a.token,address_id:t},method:"post",success:function(e){if(1==e.data.code){var t=a.selfList;a.selfList=t.splice(s,1)}}})}})},switchType:function(e){this.typeClass=e,"home"==e?(this.subState=1,console.log("home",this.homeLen," at pages\\user\\address\\address.vue:244")):"self"==e&&(this.subState=2,console.log("se",this.selfLen," at pages\\user\\address\\address.vue:248"))},edit:function(s){var t=JSON.stringify(s);e.navigateTo({url:"/pages/user/address/edit/edit?type="+t})},clear:function(e){console.log(e," at pages\\user\\address\\address.vue:260")},add:function(){e.navigateTo({url:"edit/edit"})},select:function(s){this.isSelect&&e.setStorage({key:"selectAddress",data:s,success:function(){e.navigateBack()}})}}};s.default=t}).call(this,t("6e42")["default"])},f806:function(e,s,t){}},[["697d","common/runtime","common/vendor"]]]);