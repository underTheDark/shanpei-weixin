<template>
	<view class="home">
		<!-- 状态栏 -->
		<!-- <view class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view> -->
		<!-- 顶部导航栏 -->
		<view class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<view class="addr">
				<view class="icon location"></view>
				{{ city }}
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input placeholder="搜索商品名称" placeholder-style="color:#c0c0c0;" @tap="toSearch()" />
				<view class="icon search"></view>
			</view>
			<!-- 右侧图标按钮 -->
			<view class="icon-btn">

				<view class="hongdian" v-if="msgList.length>0"></view>

				<view class="hongdian" v-show="msg"></view>

				<view class="icon tongzhi" @tap="toMsg"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="(swiper,index) in swiperList" :key="swiper.id" current="index">
						<image :src="swiper.cover" @tap="toSwiper(index)"></image>
					</swiper-item>

				</swiper>
				<view class="indicator">
					<view>{{currentSwiper + 1}} </view>
					<view> / {{swiperList.length}}</view>
				</view>
			</view>
		</view>
		<!-- 分类列表 -->
		<view class="category-list">
			<view class="category" v-for="(row, index) in categoryList" :key="index" @tap="toCategory(row)">
				<view class="img">
					<image :src="row.logo"></image>
				</view>
				<view class="text">{{ row.title }}</view>
			</view>
		</view>
		<view class="bj-color"></view>
		<!-- 广告图 -->
		<view class="banner" @click="skipGetgoods">
			<image :src="sendUrl"></image>
		</view>
		<!-- 活动区 -->
		<view class="promotion">
			<view class="promotion-head">
				<view class="promotion-head-left">
					<h2 class="title">限时抢购</h2>
					<view class="english">
						<text>FLASH</text>
						<text>SALES</text>
					</view>
				</view>
				<view class="promotion-head-right" @click="moreLimit">
					更多
				</view>
			</view>
			<view class="limit-list">
				<view class="limit-list-item" v-for="(row, index) in limitList" @tap="limitGoods(row)" :key="index">
					<!-- <view class="item-price">
						<view class="title">{{row.title}}</view>
						<text class="price">{{row.price}}元起</text>
						<text>{{row.market_price}}</text>
					</view> -->


					<view class="item-img">
						<image :src="row.cover" />
					</view>
				</view>
			</view>
		</view>
		<!-- 热销产品 -->
		<view class="hot promotion">
			<view class="promotion-head">
				<view class="promotion-head-left">
					<h2 class="title">热销产品</h2>
					<view class="english">
						<text>HOT-SALE</text>
						<text>PRODUCT</text>
					</view>
				</view>
				<view class="promotion-head-right" @click="moreLoad">
					更多
				</view>
			</view>
			<view class="hot-list">
				<view class="hot-list-item" v-for="(row, index) in hotList" @tap="toGoods(row)" :key="index">
					<view class="item-img">
						<image :src="row.logo" />
					</view>
					<view class="item-title">{{row.title}}</view>
					<view class="item-price">
						<text>￥{{row.price}}</text>
						<text>￥{{row.market_price}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="title">

				为你推荐

			</view>
			<view class="product-list">
				<view class="product" v-for="(product,index) in productList" :key="index" @tap="toGoods(product)">
					<image mode="widthFix" :src="product.logo"></image>
					<view class="name">{{ product.title }}</view>
					<view class="info">
						<view class="price">￥{{ product.price }}</view>
						<view class="slogan">￥{{ product.market_price }}</view>
					</view>
				</view>
			</view>
			<!-- <view class="loading-text" v-show="tishi">{{ loadingText }}</view> -->
		</view>

		<!-- <uni-load-more :status="more" :showIcon="showIcon"></uni-load-more> -->

		<uni-load-more :status="status" :showIcon="showIcon"></uni-load-more>

	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"


	//高德SDK
	import amap from '../../common/SDK/amap-wx.js';
	export default {
		components: {
			uniLoadMore
		},
		mounted() {
			
			this.init();

			uni.hideLoading();
			//系统消息
			this.request({
				url: this.config.url + "member/message",
				method: "POST",
				data: {
					token: this.token
				},
				success: (res) => {
					

					if (res.data.code == 1) {
						this.msgList = res.data.data.data
					}
				}
			})

		},

		data() {
			return {
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
				token1: "",
                sendUrl:"",  //寄件url
				current_page: 1,
				total: "",
				last_page: "1",
				tishi: false,
				hot: [],
				limit: [],
				home: false
			}
		},
		//分享页面 
		onShareAppMessage: function() {
			var that = this;
			return {
				title: '快来看一看啊！',
				path: '/pages/tabBar/home'
			}
		},

		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {

			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			this.current_page = 1
			this.productList = [];
			this.hotList = []
			this.limitList = []
			this.pulldown()

		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			// 调用获取推荐列表接口
			// 当前页小于最后一页才调用
			this.current_page++
			if (this.current_page > this.last_page) {
				return;
			} else {
				this.getRecommendList();
			}

		},
	
		onLoad() {

			this.pulldown()
		},
		methods: {
			//下拉加载
			pulldown() {

				uni.showLoading({
					title: '加载中'
				});
				uni.getStorage({
					key: "info",
					success: (res) => {

						var result = JSON.parse(res.data)

						this.token1 = result.token;
						this.first_load();
						this.getRecommendList()
					}
				})
			},
			//加载更多热销产品
			moreLoad() {
				uni.navigateTo({
					url: "/pages/goods/goods-list?hot=hot"
				})

			},
			//加载限时购商品
			moreLimit() {
				uni.navigateTo({
					url: "/pages/goods/goods-list?limit=limit"
				})

			},
			init() {
				uni.hideLoading();


			},
			first_load() {


				var amapPlugin = new amap.AMapWX({
					//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
					key: '5b9b64be2413fc19c26683fcf0de890f'
				});
				//定位地址
				amapPlugin.getRegeo({
					success: data => {
						//console.log (data,"位置")
						this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉
						this.init()
					},
					fail: data => {
						//console.log(data,"位置")
					}
				});

				//系统消息
				this.request({
					url: this.config.url + "member/message",
					method: "POST",
					data: {
						token: this.token1
					},
					success: (res) => {
						//console.log("mesg",res)

						if (res.data.code == 1) {
							this.msgList = res.data.data.data;
							if (res.data.data.data.length > 0) {
								this.msg = true;
							}
						}
					}
				})
				//主页数据
				this.request({
					url: this.config.url + 'home', //仅为示例，并非真实接口地址。
					data: {

					},
					method: "post",
					success: (res) => {
						//console.log("home", res);
						var num, len;
						if (res.data.code == 1) {
							//console.log(res)
							this.swiperList = res.data.data.banner;
							this.categoryList = res.data.data.cate;
                            this.sendUrl=res.data.data.jijian.cover;
							this.limit = res.data.data.limit_buy;
							this.hot = res.data.data.hot;
							this.home = true;
							if (this.limit.length < 4) {
								len = this.limit.length;
							} else {
								len = 4;
							}
							for (var i = 0; i < len; i++) {
								this.limitList.push(this.limit[i])

							}

							if (this.hot.length < 6) {
								num = this.hot.length;
							} else {
								num = 6;
							}
							for (var i = 0; i < num; i++) {
								this.hotList.push(this.hot[i])
								//	console.log(this.productList)
							}

						}

					}
				})


			},


			// 获取推荐列表
			getRecommendList() {
				this.status = "loading";
				// 首页为你推荐
				this.request({
					url: this.config.url + 'recommend', //仅为示例，并非真实接口地址。
					data: {
						token: this.token1,
						page: this.current_page,
					},
					method: "post",
					success: (res) => {
						var len;
						//console.log(this.current_page,"res.data", res.data);
						// 商品列表
						this.totalList = res.data.data.data;
						var page = res.data.data.current_page;
						//每页10 
						if (page == 1) {
							if (this.totalList.length < 10) {
								len = this.totalList.length;
							} else {
								len = 10;
							}
							for (var i = 0; i < len; i++) {
								this.productList.push(this.totalList[i])
								//	console.log(this.productList)
							}
						} else {
							this.productList.concat(res.data.data.data)
						}



						this.last_page = res.data.data.last_page;
						this.total = res.data.data.data.total;
						this.status = "more";
						if (this.current_page >= this.last_page) {
							this.status = "noMore";
						}
					}
				});

			},


			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '/pages/msg/msg'
				})
			},
			//搜索跳转
			toSearch() {
				uni.navigateTo({
					url: "/pages/search/search?"
				})

			},
			//轮播图跳转
			toSwiper(index) {
			    
                
				uni.navigateTo({
					url:"/pages/webview/webview?item="+index
				})
				
			},
			//分类跳转
			toCategory(e) {
				
				uni.navigateTo({
					url: "/pages/goods/goods-list?id=" + e.id + "&title=" + e.title
				})
			},
			//收货跳转
			skipGetgoods() {
				uni.navigateTo({
					url: "/pages/getgoods/getgoods"
				})
			},
			//商品跳转
			toGoods(e) {
				uni.navigateTo({
					url: "/pages/goods/goods?id=" + e.id
				})
			},
			//限时商品跳转
			limitGoods(e){
				uni.navigateTo({
					url: "/pages/goods/goods?id=" + e.id+"&limit=1"
				})
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			}
		}
	}
</script>
<style lang="scss">
	page {
		position: relative;
	}

	@font-face {
		font-family: 'HMfont-home';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}

	.icon {
		font-family: 'HMfont-home' !important;
		font-size: 60upx;
		font-style: normal;
		color: #000000;

		&.yuyin {
			&:before {
				content: '\e64e';
			}
		}

		&.tongzhi {
			&:before {
				content: '\e729';
			}
		}

		&.search {
			&:before {
				content: '\e628';
			}
		}

		&.location {
			&:before {
				content: '\e611';
			}
		}

		&.xia {
			&:before {
				content: '\e689';
			}
		}
	}

	.home {}

	.hot .promotion-head-right {
		font-size: 24upx;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	.pullDown-effects {
		position: fixed;
		//top: calc(100upx - 36vw);
		top: 0;
		z-index: 9;
		width: 100%;
		height: 36vw;
		/*  #ifdef  APP-PLUS  */
		padding-top: var(--status-bar-height);

		/*  #endif  */
		image {
			width: 100%;
			height: 36vw;
		}
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;

		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				left: 20upx;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			input {
				padding-left: 70upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

		.icon-btn {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			position: relative;

			.hongdian {
				width: 10upx;
				height: 10upx;
				border-radius: 50%;
				background: red;
				position: absolute;
				top: 7upx;
				right: 30upx;
			}

			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 100%;
			height: 352upx;

			overflow: hidden;


			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 352upx;

				swiper-item {
					image {
						width: 100%;
						height: 352upx;
					}
				}
			}

			.indicator {
				position: absolute;
				bottom: 20upx;
				left: 20upx;
				width: 102upx;
				height: 46upx;
				background: rgba(0, 0, 0, 0.5);

				border-radius: 46upx;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;

				view: {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				view:nth-child(1) {
					color: #00C65D;
					font-size: 30upx;
					amrgin-right: 2upx;
				}

				view:nth-child(2) {
					color: white;
					font-size: 28upx;
					margin-left: 5upx;
				}
			}
		}
	}

	.category-list {
		width: 92%;
		margin: 0 4% 20upx;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.category {
			width: 20%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;

			.img {
				width: 100%;
				display: flex;
				justify-content: center;

				image {
					width: 9vw;
					height: 9vw;
				}
			}

			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}

	.bj-color {
		width: 100%;
		height: 20upx;
		background: rgba(247, 247, 247, 1);
	}

	.banner {
		width: 100%;
		margin: 43upx 0 58upx;

		image {
			width: 100%;
			height: 144upx;

			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
		}
	}

	// 活动区 
	.promotion {
		width: 92%;
		margin: 0 4%;

		.text {
			width: 100%;
			height: 60upx;
			font-size: 34upx;
			font-weight: 600;
			margin-top: -10upx;
		}

		.promotion-head {
			margin: 50upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.promotion-head-left {
				display: flex;
				align-items: center;
				justify-content: flex-start;

				.title {
					font-size: 44upx;
					font-family: PingFang-SC-Bold;
					font-weight: 700;
					color: rgba(16, 16, 16, 1);
					height: 100%;
				}

				.english {
					margin-left: 5upx;
					display: flex;
					flex-direction: column;
					-webkit-transform: scale(1);
					transform: scale(1);

					text {
						font-size: 14upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(85, 85, 85, 1);
					}
				}
			}

			.promotion-head-right {
				color: #999999;
				font-size: 24upx;
			}

		}

		.list {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.column {
				width: 43%;
				padding: 15upx 3%;
				background-color: #ebf9f9;
				border-radius: 10upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.top {
					width: 100%;
					height: 40upx;
					display: flex;
					align-items: center;
					margin-bottom: 5upx;

					.title {
						font-size: 30upx;
					}

					.countdown {
						margin-left: 20upx;
						display: flex;
						height: 40upx;
						display: flex;
						align-items: center;
						font-size: 20upx;

						view {
							height: 30upx;
							background-color: #f06c7a;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #fff;
							border-radius: 4upx;
							margin: 0 4upx;
							padding: 0 2upx;
						}
					}
				}

				.left {
					width: 50%;
					height: 18.86vw;
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;

					.ad {
						margin-top: 5upx;
						width: 100%;
						font-size: 22upx;
						color: #acb0b0;
					}

					.into {
						width: 100%;
						font-size: 24upx;
						color: #aaa;
						margin-bottom: 5upx;
					}
				}

				.right {
					width: 18.86vw;
					height: 18.86vw;

					image {
						width: 18.86vw;
						height: 18.86vw;
					}
				}
			}
		}
	}

	//热销
	.hot-list {
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.hot-list-item {
			width: 32%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			flex-wrap: wrap;
			padding: 0 10upx 20upx 0;

			.item-img {
				width: 224upx;
				height: 224upx;
				display: flex;
				justify-content: center;

				image {
					width: 100%;
					height: 100%;

				}
			}

			.item-title {
				margin: 20upx 0;
				font-size: 26upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(16, 16, 16, 1);
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.item-price {
				dispaly: flex;
				justify-content: flex-start;
				align-items: center;

				text:nth-child(1) {
					font-size: 26upx;
					color: rgba(255, 84, 31, 1);
					margin-right: 10upx;
					font-weight: 800;
				}

				text:nth-child(2) {
					font-size: 24upx;
					color: #999;
					text-decoration: line-through;
				}
			}
		}
	}

	// 限购产品
	.limit-list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.limit-list-item:nth-child(2n-1) {
			margin-right: 9upx;
		}

		.limit-list-item {
			width: 49%;
			height: 182upx;
			display: flex;
			padding-top: 28upx;

			border-radius: 20upx;
			flex-wrap: wrap;
			padding-bottom: 9upx;

			.item-img {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: flex-end;

				image {
					width: 100%;
					height: 100%;

				}
			}

			.item-price {
				display: flex;
				flex-direction: column;
				margin: 0 28upx 0 21upx;

				.title {
					font-size: 26upx;
					color: #B49966;
					width: 150upx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.price {
					color: #101010;
					font-size: 30upx;
					margin: 20upx 0;
				}

				image {
					width: 34upx;
					height: 34upx;
				}
			}
		}
	}


	.goods-list {
		// background-color: #f4f4f4;
		padding-top: 20upx;
		background: rgba(247, 247, 247, 1);

		.title {
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 800;
			color: rgba(16, 16, 16, 1);
			font-size: 30upx;
			margin: 0 0 20upx 0;
			background: url("../../static/img/category/title-bg.png") no-repeat center;
			background-color: white;

			image {
				width: 30upx;
				height: 30upx;
			}
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
						margin-left: 30upx;
						text-decoration: line-through;
					}
				}
			}
		}
	}
</style>
