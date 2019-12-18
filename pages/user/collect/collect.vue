<template>
	<view class="collect">
		<view class="list">
             <view class="place"></view>
			<view class="goods-list goods">
				<!-- <view class="tis" v-if="goodsList.length == 0">没有数据~</view> -->

				<view class="row" style="border-bottom:20upx solid #F7F7F7"  @tap="toGoods(row.goods_id)" v-for="(row,index) in goodsList" :key="index">
					<!-- 删除按钮 -->
					<view class="menu" @tap.stop="deleteGoods(index,row.goods_id)">
						<view class="icon shanchu"></view>
					</view>
					<!-- 商品 -->
					<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)"
					 @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">

						<!-- 商品信息 -->
						<view class="goods-info">
							<view class="img">
								<image :src="row.logo"></image>
							</view>
							<view class="info">
								<view class="title">{{row.title}}</view>
								<view class="spec">{{row.number_sales}}人已购买 &nbsp;&nbsp;{{row.good_percent}}%好评</view>
								<view class="price-number">
									<view class="price">
										<text>￥{{row.price}}</text>
										<text>￥{{row.market_price}}</text>
									</view>

								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";

	export default {
		
		components: {
			uniSwipeAction,
			uniLoadMore
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: "rgba(255,84,31,1)"
					}
				}],
				goodsList: [],
				//控制滑动效果
				theIndex: null,
				oldIndex: null,
				isStop: false,
				loading:"more",
				current_page:1 ,
				last_page:"",
				status: "more",
			}
		},
		methods: {
            //收藏
			requestColl(page){
				var _this = this;
				this.request({
				
					url: this.config.url + "member/collect",
					method: "post",
					data: {
						token: this.token,
				
					},
					success:(res) =>{
						console.log(res)
						if (res.data.code == 1) {
							_this.goodsList = res.data.data.data;
							this.last_page=res.data.data.last_page;
							this.status = "more";
							if (this.current_page >= this.last_page) {
								this.status = "noMore";
							}
						}
				
					}
				})
				
			},
			bindClick(options, id) {
				var _this = this;
				this.request({
					url: this.config.url + "goods/collect",
					method: "POST",
					data: {
						goods_id: id,
						token: this.token
					},
					success: function(res) {
						console.log(res)
						if (res.data.code == 1) {
							_this.goodsList.splice(options, 1)
						}
					}
				})
				
				// this.goodsList=this.goodsList.splice(options,2)
				// console.log(this.goodsList)
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			touchMove(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				if (this.isStop || Math.abs(moveX) < 5) {
					return;
				}
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if (moveX < 0) {
					this.theIndex = index;
					this.isStop = true;
				} else if (moveX > 0) {
					if (this.theIndex != null && this.oldIndex == this.theIndex) {
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(() => {
							this.oldIndex = null;
						}, 150)
					}
				}
			},
			touchEnd(index, $event) {
				//结束禁止触发效果
				this.isStop = false;
			},

			//删除收藏

			deleteGoods(index, goodsId) {
				this.goodsList.splice(index, 1)
				// let len = this.goodsList.length;
				// for (let i = 0; i < len; i++) {
				// 	if (id == this.goodsList[i].id) {
				// 		this.goodsList.splice(i, 1);
				// 		break;
				// 	}
				// }
				// this.goodsList.splice(this.goodsList.indexOf(id), 1);
				// this.sum();
				// this.oldIndex = null;
				// this.theIndex = null;
				// 删除购物车后台；
				this.delCart(goodsId);
			},
			toGoods(id){
				uni.navigateTo({
					url: "/pages/goods/goods?id=" + id
				})
			},
			// 删除购物车
			delCart(id) {
				console.log("id", id)
				this.request({
					url: this.config.url + "goods/collect",
					method: "POST",
					data: {
						token: this.token,
						goods_id: id,
					},

					success: function(res) {
						console.log("res", res);
					},
				})

			},
		},
		onReachBottom() {
				this.current_page++
			if (this.current_page > this.last_page) {
				return;
			} else {
				this.requestColl(this.current_page);
			}
		},
		onLoad() {
			this.requestColl(this.current_page)
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: "HMfont-home";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOEAAsAAAAAB7wAAAM1AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDAIJNATYCJAMQCwoABCAFhG0HPhu1BsiOw7jha84s8T+CgOyq6unevTlAeAkRhAhQBjj8eJfmMg/oB5whSgaFspy7AqbpwE3Py3/j9j+X07uGyFHr21lua9HYi9rUCzDeGtBYmw4o0AJJ0BvGLmiJxyEAC3yIQhSVPL9BF4U5TgBi7ChtQzfjQKFYWEdgrFiqEBsxoGurtMfAhuD74g8JQgcNg8ScWjf8xoPz7/nfD8iFpoV0eQi86XQAWwUSiAIUiJGVhgEaUSAKiYXau0kKoKOjwVRthd8PmExIBRvmWH95INCQIIyYqVYAJKGghO/5Dg4B3wtxaPD9QAoS4IOM1gEzYBbAMkT16iIQGPxsopS5ScAcK23LiaBDpzyk1aGLHtsvhVrL7adDD55016wPXnDfcr7T3lcE2TVcP2fNhZM7WeiEhVp44vx9C5vVD6+eEgaLTZvEot3HL1lawlnXLK3XnISDllbWwmrmGjlRLdxq2bpme1RAeqXtzWh6g0F//wCCnRiN2diwr2+Yse3iEs20g05Q5tT0BikOXwKf79vsoEvb6p6xjVhHP92nwDJmX+9hwsf26dXbPiNvZ/98x67/+5T+ev0aWxbXCwOX41zLxia+O73B6Y57fN1u6GvN+Zmbc8XITigTAcB0Rl6X8QB4hDgEpoXypZz2q37D5FVnVa9t1n/dUgHw8uKMq9BmWqjoJoP3zevM+zG8jmVKE5hKpRShw9WTFZW04D7TscAC+B0RcOD9FHLnzqkg0HFOQMMMb5DoBKGKGgUGLEkCIzq5YEEkpastcWQyDYQyByJYBkBgx2nQsOEaSOx4girqOzDgwj8wYickWNAiHLe0JESMsiicTLaQh84PBm6WKlst/TD9hXQV25wWBLQP4jJw435MXD58RynxFDPKT30golBxluAtOI3iOMOcs5Bc2fFF8sPd2OFVBO24WQJ9CmEIG4HwQAb4ARmFS0aK8qoL/cLnXyA0FTE23FBSZf+AYEqCzpF4YojrgN5J004lt/LKFD7RHDAVQYEMh8lIQErAICImJgOZWD0ohHARdhg5wJdzSKxVaXhX6c7y8uQN1wAWmLOU0IQUShiQo0fZTceadqaMdP2uXwEAAAAA') format('woff2');
	}

	.icon {
		font-family: "HMfont-home" !important;
		font-size: 60upx;
		font-style: normal;
		color: #000000;

		&.jia {
			&:before {
				content: "\e641";
			}
		}

		&.jian {
			&:before {
				content: "\e643";
			}
		}

		&.shanchu {
			&:before {
				content: "\e6a4";
			}
		}

	}

	page {
		position: relative;
	}

	.goods-list {
		width: 100%;
		padding: 20upx 0 120upx 0;


		.tis {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
		}

		.row {
			width: calc(100%);
			height: calc(22vw + 40upx);
			border-botom: 20upx solid #F7F7F7;
            box-shadow: 0 5upx 10upx #F7F7F7;

			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			

			.menu {
				.icon {
					color: #fff;
					// font-size: 25upx;
				}

				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}

			.carrier {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}

					100% {
						transform: translateX(-30%);
					}
				}

				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}

					100% {
						transform: translateX(0);
					}
				}

				&.open {
					animation: showMenu 0.25s linear both;
				}

				&.close {
					animation: closeMenu 0.15s linear both;
				}

				background-color: #fff;

				.checkbox-box {
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}

				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;

				.goods-info {
					width: 100%;
					display: flex;
					padding-right: 20upx;
					border-bottom: 20upx solid #cecece;
					padding: 60upx 0;

					.img {
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;

						image {
							width: 22vw;
							height: 22vw;
						}
					}

					.info {
						width: 100%;
						height: 23vw;
						overflow: hidden;
						display: flex;
						flex-wrap: wrap;
						position: relative;

						.title {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}

						.spec {
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}

						.price-number {
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 28upx;
							height: 60upx;

							.uni-numbox[data-v-5fc0e502] {
								width: 140upx;
								height: 50upx;
								display: flex;
								align-items: center;

							}

							.uni-numbox--disabled {
								line-height: 100%;
							}

							.uni-numbox__minus,
							.uni-numbox__plus {
								line-height: 100%;
							}

							.uni-numbox__value[data-v-5fc0e502] {
								display: flex;
								justify-content: center;
								align-items: center;
							}

							.price {
								font-size: 28upx;
								text:nth-child(1){
									color:#FF541F;
									margin-right:30upx;
								}
								text:nth-child(2){
									color:#999999;
									text-decoration: line-through;
								}
							}

							.number {
								display: flex;
								justify-content: center;
								margin-right: 3upx;


							}
						}
					}
				}
			}
		}

	}
</style>
