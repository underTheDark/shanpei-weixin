(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/credit/credit"],{2027:function(t,e,a){},"27fe":function(t,e,a){"use strict";a("d23f");var r=s(a("b0ce")),n=s(a("8277"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,r.default)(n.default))},"34f7":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(a("34fd"));function n(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{totalCredit:[],credit:{},loading:"more",current_page:1,last_page:"",status:"more"}},components:{uniLoadMore:r.default},onReachBottom:function(){this.current_page++,this.current_page>this.last_page||this.getList(this.current_page)},onLoad:function(){this.getList(this.current_page)},methods:{getList:function(t){var e=this;this.request({url:this.config.url+"member/score",data:{token:this.token,page:t},method:"POST",success:function(t){console.log("res",t),1==t.data.code&&(e.credit=t.data.data.score.toString(),e.totalCredit=e.totalCredit.concat(t.data.data.record.data),e.last_page=t.data.data.record.last_page,e.status="more",e.current_page>=e.last_page&&(e.status="noMore"))}})}}};e.default=s},"5eb5":function(t,e,a){"use strict";var r=a("2027"),n=a.n(r);n.a},8277:function(t,e,a){"use strict";a.r(e);var r=a("d9ec"),n=a("af70");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("5eb5");var i=a("2877"),c=Object(i["a"])(n["default"],r["a"],r["b"],!1,null,null,null);e["default"]=c.exports},af70:function(t,e,a){"use strict";a.r(e);var r=a("34f7"),n=a.n(r);for(var s in r)"default"!==s&&function(t){a.d(e,t,function(){return r[t]})}(s);e["default"]=n.a},d9ec:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"credit"},[a("view",{staticClass:"total-credit"},[a("text",[t._v("我的积分")]),a("text",[t._v(t._s(t.credit))])]),a("view",{staticClass:"credit-main"},[a("view",{staticClass:"credit-title"},[t._v("积分明细")]),t._l(t.totalCredit,function(e,r){return a("view",{key:r,staticClass:"credit-recode"},[a("view",{staticClass:"recode-left"},[a("text",[t._v("消费赠送")]),a("text",[t._v(t._s(e.create_at))])]),a("view",{staticClass:"recode-right"},[t._v("+"+t._s(e.score))])])}),a("uni-load-more",{attrs:{status:t.status,mpcomid:"dbad993c-0"}})],2)])},n=[];a.d(e,"a",function(){return r}),a.d(e,"b",function(){return n})}},[["27fe","common/runtime","common/vendor"]]]);