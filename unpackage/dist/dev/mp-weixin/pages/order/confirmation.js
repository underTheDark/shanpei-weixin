(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/confirmation"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/order/confirmation.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =














































































{

  mounted: function mounted() {

  },
  computed: {
    totalmoney: function totalmoney() {
      var totalNum = Number(this.total) + Number(this.express);

      return totalNum;
    } },

  data: function data() {
    return {
      buyList: [], //订单列表
      goodsinfo: {},
      number: "", //购买商品总数量
      goodsPrice: 0.0, //商品合计价格
      sumPrice: 0.0, //用户付款价格
      address: 9, //地址是否显示
      addrList: {}, //选中地址信息
      goods: [],
      express: '',
      total: "", //商品总价格
      iscart: "",
      getgoods_name: false, //送货类型显示
      order_no: "", //订单编号
      orderType: "", //地址类型
      defaultAddr: "", //默认地址
      addrId: "" //默认地址id
    };
  },
  onLoad: function onLoad(option) {var _this = this;

    console.log("con", option);
    if (option.iscart) {
      //立即购买商品缓存
      uni.getStorage({
        key: "cart",
        success: function success(res) {
          console.log("liji", res);
          _this.iscart = res.data.isCart;
          if (res.data.isCart == 0) {
            var quick = {
              goods_id: res.data.goods.id,
              goods_number: res.data.goods.goods_number,
              goods_spec: res.data.goods.goods_spec };


            _this.goods.push(quick);

            //确认订单信息
            uni.request({
              url: _this.config.url + "order/sure",
              method: "post",
              data: {
                token: _this.token,
                goods: _this.goods },

              success: function success(res) {
                console.log("sure", res);
                if (res.data.code == 1) {
                  _this.buyList = res.data.data.goods; //商品列表
                  _this.express = res.data.data.express;
                  _this.total = res.data.data.total;
                  _this.number = res.data.data.number;
                  _this.orderType = res.data.data.order_type; //提交记录

                  //判断是否有默认地址
                  if (_this.orderType == 0) {
                    _this.address = false;
                  } else if (_this.orderType == 1) {
                    _this.getgoods_name == 1;
                    _this.address = true;
                    _this.addrList = res.data.data.address; //默认地址
                    _this.addrId = res.data.data.address.id; //默认地址id

                  } else if (_this.orderType == 2) {
                    _this.getgoods_name = 2;
                    _this.address = true;
                    _this.addrList = res.data.data.address; //默认地址

                    _this.addrId = res.data.data.address.id; //默认地址id
                  }
                }
              } });


          } else {

            //购物车购买商品缓存
            // var quick={goods_id:res.data.id,goods_number:res.data.goods_number,goods_spec:res.data.goods_spec}
            _this.goods = res.data.goods;
            //确认订单信息
            uni.request({
              url: _this.config.url + "order/sure",
              method: "post",
              data: {
                token: _this.token,
                goods: _this.goods },

              success: function success(res) {
                console.log("cart", res);
                if (res.data.code == 1) {
                  _this.buyList = res.data.data.goods; //商品列表
                  _this.express = res.data.data.express;
                  _this.total = res.data.data.total;
                  _this.number = res.data.data.number;
                  _this.orderType = res.data.data.order_type; //提交记录

                  //判断是否有默认地址
                  if (_this.orderType == 0) {
                    _this.address = false;
                  } else if (_this.orderType == 1) {
                    _this.getgoods_name = 1;
                    _this.address = true;
                    _this.addrList = res.data.data.address; //默认地址
                    _this.addrId = res.data.data.address.id; //默认地址id
                  } else if (_this.orderType == 2) {
                    _this.getgoods_name = 2;
                    _this.address = true;
                    _this.addrList = res.data.data.address; //默认地址
                    _this.addrId = res.data.data.address.id; //默认地址id
                  }
                }
              } });


          }



        } });


    } else {
      //获取收货地址缓存

      uni.getStorage({
        key: "address",
        success: function success(res) {

          var addr = JSON.parse(res.data);
          console.log("address", res, addr);
          if (addr.distance) {
            _this.addrId = addr.id;
            _this.getgoods_name = 1;
            _this.addrList = addr;
          } else {
            _this.addrId = addr.id;
            _this.addrList = addr;
            _this.getgoods_name = 2;
          }

        } });

      //获取商品缓存
      //立即购买商品缓存
      uni.getStorage({
        key: "cart",
        success: function success(res) {
          console.log("liji", res);
          _this.iscart = res.data.isCart;
          if (res.data.isCart == 0) {
            var quick = {
              goods_id: res.data.goods.id,
              goods_number: res.data.goods.goods_number,
              goods_spec: res.data.goods.goods_spec };


            _this.goods.push(quick);

            //确认订单信息
            uni.request({
              url: _this.config.url + "order/sure",
              method: "post",
              data: {
                token: _this.token,
                goods: _this.goods },

              success: function success(res) {
                console.log("sure", res);
                if (res.data.code == 1) {
                  _this.buyList = res.data.data.goods; //商品列表
                  _this.express = res.data.data.express;
                  _this.total = res.data.data.total;
                  _this.number = res.data.data.number;

                }
              } });


          } else {

            //购物车购买商品缓存
            // var quick={goods_id:res.data.id,goods_number:res.data.goods_number,goods_spec:res.data.goods_spec}
            _this.goods = res.data.goods;
            //确认订单信息
            uni.request({
              url: _this.config.url + "order/sure",
              method: "post",
              data: {
                token: _this.token,
                goods: _this.goods },

              success: function success(res) {
                console.log("cart", res);
                if (res.data.code == 1) {
                  _this.buyList = res.data.data.goods; //商品列表
                  _this.express = res.data.data.express;
                  _this.total = res.data.data.total;
                  _this.number = res.data.data.number;


                }
              } });


          }
        } });

    }

  },

  filters: {
    toFixed: function toFixed(x) {
      return parseFloat(x).toFixed(2);
    } },

  methods: {
    //选取送货方式
    sendType: function sendType() {
      uni.navigateTo({
        url: "/pages/sendType/sendType" });

    },


    clearOrder: function clearOrder() {var _this2 = this;
      uni.removeStorage({
        key: 'buylist',
        success: function success(res) {
          _this2.buylist = [];
          //console.log('remove buylist success');
        } });

    },
    toPay: function toPay() {var _this3 = this;
      //商品列表
      uni.request({
        url: this.config.url + "order/order",
        method: "post",
        data: {
          token: this.token,
          goods: this.goods,
          order_type: this.getgoods_name,
          address_id: this.addrId,
          from_car: this.iscart },

        success: function success(res) {
          console.log(res);
          if (res.data.code == 1) {
            _this3.order_no = res.data.data.order_no; //获取订单编号

            //调起支付接口
            uni.request({
              url: _this3.config.url + "order/pay",
              method: "POST",
              data: {
                token: _this3.token,
                order_no: _this3.order_no },

              success: function success(res) {
                console.log(res);
                if (res.data.code == 1) {
                  var pay = res.data.data.data;
                  uni.requestPayment({
                    provider: 'wxpay',
                    appid: pay.appId,
                    timeStamp: pay.timeStamp,
                    nonceStr: pay.nonceStr,
                    package: pay.package,
                    signType: pay.signType,
                    paySign: pay.paySign,
                    success: function success(res) {
                      console.log('success:' + JSON.stringify(res));
                      uni.navigateTo({
                        url: "/pages/user/order_list/order_list?tbIndex=" + 1 });


                    },
                    fail: function fail(err) {
                      console.log('fail:' + JSON.stringify(err));
                      uni.switchTab({


                        url: "/pages/tabBar/home" });

                      uni.showToast({
                        title: "支付失败" });

                    } });

                }
              } });

          } else if (res.data.code == 0) {
            uni.showToast({
              title: "提交订单失败",
              duration: 1000 });

          }
        } });



    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/order/confirmation.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=template&id=12d252e0&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/order/confirmation.vue?vue&type=template&id=12d252e0& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", { staticClass: "confirm" }, [
    _c("view", { staticClass: "send" }, [
      _c("view", { staticClass: "send-title" }, [_vm._v("配送方式")]),
      _c(
        "view",
        {
          staticClass: "send-type",
          attrs: { eventid: "529a0904-0" },
          on: {
            click: function($event) {
              _vm.sendType()
            }
          }
        },
        [
          _c("text", [_vm._v("已选")]),
          _c("text", [
            _vm._v(_vm._s(_vm.getgoods_name == 1 ? "自提" : "送货上门"))
          ]),
          _c("image", {
            staticClass: "right-jiantou",
            attrs: { src: "../../static/img/category/youce-jiantou.png" }
          })
        ]
      )
    ]),
    _c("view", { staticClass: "addr" }, [
      _c("view", { staticClass: "sendgoods-info" }, [_vm._v("配送信息")]),
      true
        ? _c("view", { staticClass: "sendgoods-addr" }, [
            _c("view", [
              _c(
                "text",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.getgoods_name == 1,
                      expression: "getgoods_name==1"
                    }
                  ],
                  staticClass: "getgoods-name"
                },
                [_vm._v(_vm._s(_vm.addrList.name))]
              ),
              _c("text", { staticClass: "getgoods-people" }, [
                _vm._v(
                  _vm._s(_vm.addrList.username) +
                    "    " +
                    _vm._s(_vm.addrList.phone)
                )
              ]),
              _c("text", { staticClass: "getgoods-addr" }, [
                _vm._v(
                  _vm._s(_vm.addrList.province_name) +
                    _vm._s(_vm.addrList.city_name) +
                    _vm._s(_vm.addrList.area_name) +
                    " " +
                    _vm._s(_vm.addrList.street_name) +
                    "\n\t\t\t\t\t\t" +
                    _vm._s(_vm.addrList.province) +
                    _vm._s(_vm.addrList.city) +
                    _vm._s(_vm.addrList.area) +
                    _vm._s(_vm.addrList.street) +
                    _vm._s(_vm.addrList.address)
                )
              ])
            ])
          ])
        : undefined
    ]),
    _c(
      "view",
      { staticClass: "buy-list" },
      [
        _vm._l(_vm.buyList, function(buy, buyIndex) {
          return _c("view", { key: buyIndex, staticClass: "row" }, [
            _c("view", { staticClass: "goods-info" }, [
              _c("view", { staticClass: "img" }, [
                _c("image", { attrs: { src: buy.goods_logo } })
              ]),
              _c("view", { staticClass: "info" }, [
                _c("view", { staticClass: "title" }, [
                  _vm._v(_vm._s(buy.goods_title))
                ]),
                _c("view", { staticClass: "spec" }, [
                  _c("text", [_vm._v(_vm._s(buy.goods_spec))])
                ]),
                _c("view", { staticClass: "price-number" }, [
                  _c("view", { staticClass: "price" }, [
                    _vm._v("￥" + _vm._s(buy.price_selling))
                  ]),
                  _c("view", { staticClass: "number" }, [
                    _vm._v("x" + _vm._s(buy.goods_number))
                  ])
                ])
              ])
            ])
          ])
        }),
        _c("view", { staticClass: "total-money" }, [
          _c("view", { staticClass: "send-money" }, [
            _c("text", [_vm._v("配送费")]),
            _c("text", [_vm._v("￥" + _vm._s(_vm.express))])
          ]),
          _c("view", { staticClass: "total-pay-money" }, [
            _c("text", [_vm._v("共" + _vm._s(_vm.number) + "件商品")]),
            _c("view", { staticClass: "pay-money" }, [
              _c("text", [_vm._v("合计：")]),
              _c("text", [_vm._v("￥" + _vm._s(_vm.total))])
            ])
          ])
        ])
      ],
      2
    ),
    _c("view", { staticClass: "footer" }, [
      _c("view", { staticClass: "settlement" }, [
        _c("view", { staticClass: "sum" }, [
          _vm._v("待支付:"),
          _c("view", { staticClass: "money" }, [
            _vm._v("￥" + _vm._s(_vm.totalmoney))
          ])
        ]),
        _c(
          "view",
          {
            staticClass: "btn",
            attrs: { eventid: "529a0904-1" },
            on: { tap: _vm.toPay }
          },
          [_vm._v("去结算")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\main.js?{\"page\":\"pages%2Forder%2Fconfirmation\"}":
/*!**********************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/main.js?{"page":"pages%2Forder%2Fconfirmation"} ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _confirmation = _interopRequireDefault(__webpack_require__(/*! ./pages/order/confirmation.vue */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_confirmation.default));

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue":
/*!***************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/order/confirmation.vue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _confirmation_vue_vue_type_template_id_12d252e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./confirmation.vue?vue&type=template&id=12d252e0& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=template&id=12d252e0&");
/* harmony import */ var _confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirmation.vue?vue&type=script&lang=js& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./confirmation.vue?vue&type=style&index=0&lang=scss& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _confirmation_vue_vue_type_template_id_12d252e0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _confirmation_vue_vue_type_template_id_12d252e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/order/confirmation.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/order/confirmation.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./confirmation.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/order/confirmation.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./confirmation.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=template&id=12d252e0&":
/*!**********************************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/order/confirmation.vue?vue&type=template&id=12d252e0& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_template_id_12d252e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./confirmation.vue?vue&type=template&id=12d252e0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\order\\confirmation.vue?vue&type=template&id=12d252e0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_template_id_12d252e0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_confirmation_vue_vue_type_template_id_12d252e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\main.js?{\"page\":\"pages%2Forder%2Fconfirmation\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/confirmation.js.map