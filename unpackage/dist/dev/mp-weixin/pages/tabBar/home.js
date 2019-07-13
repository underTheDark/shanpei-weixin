(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/tabBar/home"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/components/uni-load-more/uni-load-more.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default2 =


























{
  name: "uni-load-more",
  props: {
    status: {
      //上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
      type: String,
      default: 'more' },

    showIcon: {
      type: Boolean,
      default: true },

    color: {
      type: String,
      default: "#777777" },

    contentText: {
      type: Object,
      default: function _default() {
        return {
          contentdown: "上拉显示更多",
          contentrefresh: "正在加载...",
          contentnomore: "没有更多数据了" };

      } } },


  data: function data() {
    return {};
  } };exports.default = _default2;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/tabBar/home.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



















































































































































var _uniLoadMore = _interopRequireDefault(__webpack_require__(/*! @/components/uni-load-more/uni-load-more.vue */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue"));



var _amapWx = _interopRequireDefault(__webpack_require__(/*! ../../common/SDK/amap-wx.js */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\common\\SDK\\amap-wx.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{

  components: {
    uniLoadMore: _uniLoadMore.default },

  mounted: function mounted() {var _this = this;
    uni.hideLoading();

    // 轮播,热销
    uni.request({
      url: 'http://shanpei.wsstreet.net/index', //仅为示例，并非真实接口地址。
      data: {
        token: this.token },

      method: "post",
      success: function success(res) {
        console.log("hoem", res);
        _this.swiperList = res.data.data.banner;
        _this.categoryList = res.data.data.cate;
        _this.hotList = res.data.data.hot;
        _this.limitList = res.data.data.limit_buy;
      } });


    //系统消息
    uni.request({
      url: this.config.url + "member/message",
      method: "POST",
      data: {
        token: this.token },

      success: function success(res) {
        //console.log("mesg",res)
        if (res.data.data.data.length > 0) {
          _this.msg = true;
        }
        if (res.data.code == 1) {
          _this.msgList = res.data.data.data;
        }
      } });

  },

  data: function data() {var _ref;
    return _ref = {
      msg: "", //系统消息显示
      msgList: [], //系统信息列表
      showIcon: false,
      status: "more",

      afterHeaderOpacity: 1, //不透明度
      headerPosition: 'fixed',
      headerTop: null,
      statusTop: null,
      city: '北京',
      currentSwiper: 0,
      // 轮播图片
      swiperList: [],
      // 分类菜单
      categoryList: [],
      Promotion: [],
      // 热销产品
      hotList: [],
      //限制产品
      limitList: [],
      //猜你喜欢列表
      productList: [],
      totalList: [],
      loadingText: '正在加载...',

      current_page: "",
      total: "",
      last_page: "" }, _defineProperty(_ref, "current_page",

    0), _defineProperty(_ref, "total",
    ""), _defineProperty(_ref, "last_page",
    "1"), _defineProperty(_ref, "tishi",

    false), _ref;

  },
  onPageScroll: function onPageScroll(e) {
    //兼容iOS端下拉时顶部漂移
    this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
    this.headerTop = e.scrollTop >= 0 ? null : 0;
    this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
  },
  //下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
  onPullDownRefresh: function onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  //上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
  onReachBottom: function onReachBottom() {


    this.count++;
    console.log(count);

    // 调用获取推荐列表接口
    // 当前页小于最后一页才调用
    if (this.current_page < this.last_page) {
      this.getRecommendList();
    }

  },
  onReady: function onReady() {


  },
  onLoad: function onLoad() {var _this2 = this;
    uni.showLoading({
      title: '加载中' });

    console.log(22);
    var amapPlugin = new _amapWx.default.AMapWX({
      //高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
      key: '5b9b64be2413fc19c26683fcf0de890f' });

    //定位地址
    amapPlugin.getRegeo({
      success: function success(data) {
        //console.log(data)
        _this2.city = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉
      } });



  },
  methods: {
    // 获取推荐列表
    getRecommendList: function getRecommendList() {var _this3 = this;
      this.status = "loading";
      // 首页为你推荐
      uni.request({
        url: 'http://shanpei.wsstreet.net/recommend', //仅为示例，并非真实接口地址。
        data: {
          token: this.token,
          page: Number(this.current_page) + 1 },

        method: "post",
        success: function success(res) {
          var len;
          console.log("res.data", res.data);
          // 商品列表
          _this3.totalList = res.data.data.data;
          //每页10 
          if (_this3.totalList.length < 10) {
            len = _this3.totalList.length;
          } else {
            len = 10;
          }
          for (var i = 0; i < len; i++) {
            _this3.productList.push(_this3.totalList[i]);
            //	console.log(this.productList)
          }

          _this3.current_page = res.data.data.current_page;
          _this3.last_page = res.data.data.last_page;
          _this3.total = res.data.data.data.total;
          _this3.status = "more";
          if (_this3.current_page >= _this3.last_page) {
            _this3.status = "noMore";
          }
        } });


    },


    //消息列表
    toMsg: function toMsg() {
      uni.navigateTo({
        url: '/pages/msg/msg' });

    },
    //搜索跳转
    toSearch: function toSearch() {var _this4 = this;
      // 搜索推荐
      uni.request({
        url: 'http://shanpei.wsstreet.net/keyword', //仅为示例，并非真实接口地址。
        data: {
          token: this.token },


        method: "post",
        success: function success(res) {

          console.log(res);
          _this4.searchList = res.data.data;
        } });


    },
    //轮播图跳转
    toSwiper: function toSwiper(e, index) {

      //this.currentSwiper = index
    },
    //分类跳转
    toCategory: function toCategory(e) {

      uni.navigateTo({
        // url: '../goods/goods-list?cid=' + e.id + '&name=' + e.name
      });
    },
    //推荐商品跳转
    toPromotion: function toPromotion(e) {
      uni.showToast({});


    },
    //商品跳转
    toGoods: function toGoods(e) {
      uni.showToast({});


      uni.navigateTo({});


    },
    //轮播图指示器
    swiperChange: function swiperChange(event) {
      this.currentSwiper = event.detail.current;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/components/uni-load-more/uni-load-more.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/tabBar/home.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=template&id=7985cf95&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/components/uni-load-more/uni-load-more.vue?vue&type=template&id=7985cf95& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("view", { staticClass: "uni-load-more" }, [
    _c(
      "view",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.status === "loading" && _vm.showIcon,
            expression: "status === 'loading' && showIcon"
          }
        ],
        staticClass: "uni-load-more__img"
      },
      [
        _c("view", { staticClass: "load1" }, [
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } })
        ]),
        _c("view", { staticClass: "load2" }, [
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } })
        ]),
        _c("view", { staticClass: "load3" }, [
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } }),
          _c("view", { style: { background: _vm.color } })
        ])
      ]
    ),
    _c(
      "text",
      { staticClass: "uni-load-more__text", style: { color: _vm.color } },
      [
        _vm._v(
          _vm._s(
            _vm.status === "more"
              ? _vm.contentText.contentdown
              : _vm.status === "loading"
              ? _vm.contentText.contentrefresh
              : _vm.contentText.contentnomore
          )
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=template&id=89340614&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/tabBar/home.vue?vue&type=template&id=89340614& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "view",
    { staticClass: "home" },
    [
      _c("view", {
        staticClass: "status",
        style: {
          position: _vm.headerPosition,
          top: _vm.statusTop,
          opacity: _vm.afterHeaderOpacity
        }
      }),
      _c(
        "view",
        {
          staticClass: "header",
          style: {
            position: _vm.headerPosition,
            top: _vm.headerTop,
            opacity: _vm.afterHeaderOpacity
          }
        },
        [
          _c("view", { staticClass: "addr" }, [
            _c("view", { staticClass: "icon location" }),
            _vm._v(_vm._s(_vm.city))
          ]),
          _c("view", { staticClass: "input-box" }, [
            _c("input", {
              attrs: {
                placeholder: "搜索商品名称",
                "placeholder-style": "color:#c0c0c0;",
                eventid: "3cd742e8-0"
              },
              on: {
                tap: function($event) {
                  _vm.toSearch()
                }
              }
            }),
            _c("view", { staticClass: "icon search" })
          ]),
          _c("view", { staticClass: "icon-btn" }, [
            _c("view", { staticClass: "hongdian" }),
            _c("view", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.msg,
                  expression: "msg"
                }
              ],
              staticClass: "hongdian"
            }),
            _c("view", {
              staticClass: "icon tongzhi",
              attrs: { eventid: "3cd742e8-1" },
              on: { tap: _vm.toMsg }
            })
          ])
        ]
      ),
      _c("view", { staticClass: "place" }),
      _c("view", { staticClass: "swiper" }, [
        _c(
          "view",
          { staticClass: "swiper-box" },
          [
            _c(
              "swiper",
              {
                attrs: {
                  circular: "true",
                  autoplay: "true",
                  eventid: "3cd742e8-3"
                },
                on: { change: _vm.swiperChange }
              },
              _vm._l(_vm.swiperList, function(swiper, index) {
                return _c(
                  "swiper-item",
                  {
                    key: swiper.id,
                    attrs: { current: "index", mpcomid: "3cd742e8-0-" + index }
                  },
                  [
                    _c("image", {
                      attrs: {
                        src: swiper.cover,
                        eventid: "3cd742e8-2-" + index
                      },
                      on: {
                        tap: function($event) {
                          _vm.toSwiper(swiper, index)
                        }
                      }
                    })
                  ]
                )
              })
            ),
            _c("view", { staticClass: "indicator" }, [
              _c("view", [_vm._v(_vm._s(_vm.currentSwiper + 1))]),
              _c("view", [_vm._v("/ " + _vm._s(_vm.swiperList.length))])
            ])
          ],
          1
        )
      ]),
      _c(
        "view",
        { staticClass: "category-list" },
        _vm._l(_vm.categoryList, function(row, index) {
          return _c(
            "view",
            {
              key: index,
              staticClass: "category",
              attrs: { eventid: "3cd742e8-4-" + index },
              on: {
                tap: function($event) {
                  _vm.toCategory(row)
                }
              }
            },
            [
              _c("view", { staticClass: "img" }, [
                _c("image", { attrs: { src: row.logo } })
              ]),
              _c("view", { staticClass: "text" }, [_vm._v(_vm._s(row.title))])
            ]
          )
        })
      ),
      _c("view", { staticClass: "bj-color" }),
      _vm._m(0),
      _c("view", { staticClass: "promotion" }, [
        _c("view", { staticClass: "promotion-head" }, [
          _c(
            "view",
            { staticClass: "promotion-head-left" },
            [
              _c("h2", { staticClass: "title" }, [_vm._v("限时抢购")]),
              _vm._m(1)
            ],
            1
          ),
          _c("view", { staticClass: "promotion-head-right" })
        ]),
        _c(
          "view",
          { staticClass: "list" },
          _vm._l(_vm.Promotion, function(row, index) {
            return _c(
              "view",
              {
                key: index,
                staticClass: "column",
                attrs: { eventid: "3cd742e8-5-" + index },
                on: {
                  tap: function($event) {
                    _vm.toPromotion(row)
                  }
                }
              },
              [
                _c("view", { staticClass: "top" }, [
                  _c("view", { staticClass: "title" }, [
                    _vm._v(_vm._s(row.title))
                  ]),
                  row.countdown
                    ? _c("view", { staticClass: "countdown" }, [
                        _c("view", [_vm._v(_vm._s(row.countdown.h))]),
                        _vm._v(":"),
                        _c("view", [_vm._v(_vm._s(row.countdown.m))]),
                        _vm._v(":"),
                        _c("view", [_vm._v(_vm._s(row.countdown.s))])
                      ])
                    : _vm._e()
                ]),
                _c("view", { staticClass: "left" }, [
                  _c("view", { staticClass: "ad" }, [_vm._v(_vm._s(row.ad))]),
                  _c("view", { staticClass: "into" }, [_vm._v("点击进入")])
                ]),
                _c("view", { staticClass: "right" }, [
                  _c("image", { attrs: { src: row.img } })
                ])
              ]
            )
          })
        )
      ]),
      _c("view", { staticClass: "hot promotion" }, [
        _c("view", { staticClass: "promotion-head" }, [
          _c(
            "view",
            { staticClass: "promotion-head-left" },
            [
              _c("h2", { staticClass: "title" }, [_vm._v("热销产品")]),
              _vm._m(2)
            ],
            1
          ),
          _c("view", { staticClass: "promotion-head-right" }, [_vm._v("更多")])
        ]),
        _c(
          "view",
          { staticClass: "hot-list" },
          _vm._l(_vm.hotList, function(row, index) {
            return _c(
              "view",
              {
                key: index,
                staticClass: "hot-list-item",
                attrs: { eventid: "3cd742e8-6-" + index },
                on: {
                  tap: function($event) {
                    _vm.toPromotion(row)
                  }
                }
              },
              [
                _c("view", { staticClass: "item-img" }, [
                  _c("image", { attrs: { src: row.logo } })
                ]),
                _c("view", { staticClass: "item-title" }, [
                  _vm._v(_vm._s(row.title))
                ]),
                _c("view", { staticClass: "item-price" }, [
                  _c("text", [_vm._v(_vm._s(row.price))]),
                  _c("text", [_vm._v(_vm._s(row.market_price))])
                ])
              ]
            )
          })
        )
      ]),
      _c("view", { staticClass: "goods-list" }, [
        _c("view", { staticClass: "title" }, [_vm._v("为你推荐")]),
        _c(
          "view",
          { staticClass: "product-list" },
          _vm._l(_vm.productList, function(product, index) {
            return _c(
              "view",
              {
                key: index,
                staticClass: "product",
                attrs: { eventid: "3cd742e8-7-" + index },
                on: {
                  tap: function($event) {
                    _vm.toGoods(product)
                  }
                }
              },
              [
                _c("image", { attrs: { mode: "widthFix", src: product.logo } }),
                _c("view", { staticClass: "name" }, [
                  _vm._v(_vm._s(product.title))
                ]),
                _c("view", { staticClass: "info" }, [
                  _c("view", { staticClass: "price" }, [
                    _vm._v(_vm._s(product.price))
                  ]),
                  _c("view", { staticClass: "slogan" }, [
                    _vm._v(_vm._s(product.market_price))
                  ])
                ])
              ]
            )
          })
        )
      ]),
      _c("uni-load-more", {
        attrs: {
          status: _vm.status,
          showIcon: _vm.showIcon,
          mpcomid: "3cd742e8-1"
        }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "banner" }, [
      _c("image", { attrs: { src: "../../static/img/category/jijian.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "english" }, [
      _c("text", [_vm._v("FLASH")]),
      _c("text", [_vm._v("SALES")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "english" }, [
      _c("text", [_vm._v("HOT-SALE")]),
      _c("text", [_vm._v("PRODUCT")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue":
/*!*****************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/components/uni-load-more/uni-load-more.vue ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_load_more_vue_vue_type_template_id_7985cf95___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-load-more.vue?vue&type=template&id=7985cf95& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=template&id=7985cf95&");
/* harmony import */ var _uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-load-more.vue?vue&type=script&lang=js& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_load_more_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-load-more.vue?vue&type=style&index=0&lang=scss& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_load_more_vue_vue_type_template_id_7985cf95___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_load_more_vue_vue_type_template_id_7985cf95___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/components/uni-load-more/uni-load-more.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/components/uni-load-more/uni-load-more.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./uni-load-more.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/components/uni-load-more/uni-load-more.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./uni-load-more.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=template&id=7985cf95&":
/*!************************************************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/components/uni-load-more/uni-load-more.vue?vue&type=template&id=7985cf95& ***!
  \************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_template_id_7985cf95___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./uni-load-more.vue?vue&type=template&id=7985cf95& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\components\\uni-load-more\\uni-load-more.vue?vue&type=template&id=7985cf95&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_template_id_7985cf95___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_uni_load_more_vue_vue_type_template_id_7985cf95___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\main.js?{\"page\":\"pages%2FtabBar%2Fhome\"}":
/*!***************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/main.js?{"page":"pages%2FtabBar%2Fhome"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _home = _interopRequireDefault(__webpack_require__(/*! ./pages/tabBar/home.vue */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_home.default));

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue":
/*!********************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/tabBar/home.vue ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_vue_vue_type_template_id_89340614___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.vue?vue&type=template&id=89340614& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=template&id=89340614&");
/* harmony import */ var _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.vue?vue&type=script&lang=js& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _home_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.vue?vue&type=style&index=0&lang=scss& */ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _home_vue_vue_type_template_id_89340614___WEBPACK_IMPORTED_MODULE_0__["render"],
  _home_vue_vue_type_template_id_89340614___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/tabBar/home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/tabBar/home.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/tabBar/home.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./home.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=template&id=89340614&":
/*!***************************************************************************************************************!*\
  !*** C:/Users/惠普2/Desktop/shanpei-weixin/shanpei-weixin/pages/tabBar/home.vue?vue&type=template&id=89340614& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_89340614___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./home.vue?vue&type=template&id=89340614& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\pages\\tabBar\\home.vue?vue&type=template&id=89340614&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_89340614___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_1_0_20181030_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_89340614___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["C:\\Users\\惠普2\\Desktop\\shanpei-weixin\\shanpei-weixin\\main.js?{\"page\":\"pages%2FtabBar%2Fhome\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tabBar/home.js.map